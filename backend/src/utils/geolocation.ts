// Helper for building a geoNear query
export const buildGeoNear = (lng: number, lat: number, maxDistanceMeters?: number) => {
  const query: any = {
    $geoNear: {
      near: {
        type: 'Point',
        coordinates: [lng, lat]
      },
      spherical: true,
      distanceField: 'distance'
    }
  };
  if (typeof maxDistanceMeters === 'number') {
    query.$geoNear.maxDistance = maxDistanceMeters;
  }
  return query;
};
