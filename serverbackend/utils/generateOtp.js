// Generates a secure 6-digit OTP as string
export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
