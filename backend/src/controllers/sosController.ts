import { Request, Response } from 'express';
import SOS from '../models/SOS';
import { computeExpiryDate } from '../utils/sosExpiry';
import { buildGeoNear } from '../utils/geolocation';

// POST /api/sos
export const createSOS = async (req: Request, res: Response) => {
  try {
    const seeker = req.user?.id;
    if (!seeker) return res.status(401).json({ message: 'Unauthorized' });

    const { description, urgency = 'medium', durationMinutes = 30, location } = req.body;
    if (!location || !location.lng || !location.lat) return res.status(400).json({ message: 'Location required' });

    const expiresAt = computeExpiryDate(Number(durationMinutes));

    const sos = new SOS({
      seeker,
      description,
      urgency,
      location: { type: 'Point', coordinates: [parseFloat(location.lng), parseFloat(location.lat)] },
      expiresAt
    });

    await sos.save();

    res.status(201).json(sos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/sos/active
export const getActiveSOS = async (req: Request, res: Response) => {
  try {
    const { lng, lat, max } = req.query;
    const q: any = { active: true };

    if (lng && lat) {
      const geo = buildGeoNear(parseFloat(lng as string), parseFloat(lat as string), max ? parseInt(max as string) : undefined);
      const pipeline = [geo, { $match: q }, { $limit: 100 }];
      const results = await SOS.aggregate(pipeline);
      return res.json(results);
    }

    const list = await SOS.find(q).limit(100);
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/sos/:id/complete
export const completeSOS = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const sos = await SOS.findByIdAndUpdate(id, { active: false }, { new: true });
    if (!sos) return res.status(404).json({ message: 'SOS not found' });
    res.json(sos);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
