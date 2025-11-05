import { Request, Response } from 'express';
import Service from '../models/Service';
import User from '../models/User';
import cloudinary from '../config/cloudinary';
import multer from 'multer';
import mongoose from 'mongoose';
import { buildGeoNear } from '../utils/geolocation';

/**
 * NOTE: File upload uses multer to get file in req.file then cloudinary.uploader.upload
 * We provide a simple upload flow; frontends should send multipart/form-data with file field 'image'.
 */

// Create service - POST /api/services
export const createService = async (req: Request, res: Response) => {
  try {
    const providerId = req.user?.id;
    if (!providerId) return res.status(401).json({ message: 'Unauthorized' });

    const { title, description, hashtags = [], category, rate, location } = req.body;

    const loc = location
      ? { type: 'Point', coordinates: [parseFloat(location.lng), parseFloat(location.lat)] }
      : { type: 'Point', coordinates: [0, 0] };

    const service = new Service({
      title,
      description,
      provider: providerId,
      hashtags: Array.isArray(hashtags) ? hashtags : (hashtags || '').split(',').map((h: string) => h.trim()),
      location: loc,
      category,
      rate,
      available: true
    });

    // if file present, upload to cloudinary
    if ((req as any).file) {
      const upload = await cloudinary.uploader.upload((req as any).file.path, { folder: 'doora/services' });
      // we might store upload.secure_url in a future field; leaving as a sample log
      (service as any).image = upload.secure_url;
    }

    await service.save();

    // increment provider metrics
    await User.findByIdAndUpdate(providerId, { $inc: { 'metrics.skillsShared': 1 } });

    res.status(201).json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/services - optional hashtag filter ?hashtags=cleaning,plumbing
export const getServices = async (req: Request, res: Response) => {
  try {
    const { hashtags, limit = '50', skip = '0' } = req.query;
    const q: any = {};
    if (hashtags) {
      const list = (hashtags as string).split(',').map((h) => h.trim());
      q.hashtags = { $all: list };
    }

    const services = await Service.find(q).limit(parseInt(limit as string)).skip(parseInt(skip as string)).populate('provider', 'name badges metrics');
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/services/nearby?lng=...&lat=...&max=5000
export const getNearbyServices = async (req: Request, res: Response) => {
  try {
    const lng = parseFloat(req.query.lng as string);
    const lat = parseFloat(req.query.lat as string);
    const max = req.query.max ? parseInt(req.query.max as string) : undefined;

    if (Number.isNaN(lng) || Number.isNaN(lat)) return res.status(400).json({ message: 'lng and lat required' });

    // Use aggregate with $geoNear
    const geo = buildGeoNear(lng, lat, max);
    const pipeline = [geo, { $limit: 100 }, { $lookup: { from: 'users', localField: 'provider', foreignField: '_id', as: 'providerInfo' } }, { $unwind: '$providerInfo' }];

    const results = await Service.aggregate(pipeline);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/services/search?q=...&sort=rating|distance
export const searchServices = async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;
    const sort = req.query.sort as string;
    const lng = req.query.lng ? parseFloat(req.query.lng as string) : undefined;
    const lat = req.query.lat ? parseFloat(req.query.lat as string) : undefined;

    const filter: any = {};
    if (q) {
      filter.$or = [{ title: new RegExp(q, 'i') }, { description: new RegExp(q, 'i') }, { hashtags: new RegExp(q, 'i') }];
    }

    let services;
    if (sort === 'distance' && typeof lng === 'number' && typeof lat === 'number') {
      const geo = buildGeoNear(lng, lat);
      const pipeline = [geo, { $match: filter }, { $lookup: { from: 'users', localField: 'provider', foreignField: '_id', as: 'providerInfo' } }, { $unwind: '$providerInfo' }];
      services = await Service.aggregate(pipeline);
    } else {
      services = await Service.find(filter).populate('provider', 'name metrics badges');
    }

    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
