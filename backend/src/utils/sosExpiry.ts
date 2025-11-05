// Helper to compute expiresAt date from now given duration in minutes
export const computeExpiryDate = (minutesFromNow: number) => {
  return new Date(Date.now() + minutesFromNow * 60 * 1000);
};
