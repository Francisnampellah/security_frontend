import { useState } from 'react';
import { AuthService } from '../../services/authService';
import { Eye, Loader2, Shield } from "lucide-react";
import { useNotification } from '@/hooks/useNotification';


// OTP Verification Component
export const OtpVerification = ({ email, onSuccess }: { email: string; onSuccess: () => void }) => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { success, error: notificationError } = useNotification();
  const [resendCooldown, setResendCooldown] = useState(0);
  const [resendLoading, setResendLoading] = useState(false);

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setResendLoading(true);
    try {
      await AuthService.resendOtp(email);
      success('A new OTP has been sent to your email.');
      setResendCooldown(60);
      const interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err: any) {
      notificationError(err.response?.data?.message || 'Failed to resend OTP.');
    } finally {
      setResendLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // You need to implement AuthService.verifyOtp(email, otp)
      await AuthService.verifyOtp(email, otp);
      success('OTP verified successfully!');
      setLoading(false);
      onSuccess();
    } catch (err: any) {
      notificationError(err.response?.data?.message || 'OTP verification failed');
      setError(err.response?.data?.message || 'OTP verification failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#d6edfa] to-[#eaf6ff]">
      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-col items-center mb-6">
          <Shield className="w-10 h-10 text-blue-400 mb-2" />
          <span className="text-3xl font-bold text-blue-500 mb-1">VulnGuard</span>
          <span className="text-gray-600 text-lg">Enter the OTP sent to your email</span>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-5">
          <div>
            <label htmlFor="otp" className="block text-base font-medium text-gray-700 mb-1">OTP Code</label>
            <input
              id="otp"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 text-base"
            />
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-[#42a5ea] hover:bg-[#2196f3] text-white font-semibold py-3 rounded-md transition text-base"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : (
              "Verify OTP"
            )}
          </button>
          <div className="text-center text-sm text-gray-600">
            Didn't receive the code?{' '}
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendCooldown > 0 || resendLoading}
              className="text-blue-500 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              {resendLoading ? 'Sending...' : resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}; 