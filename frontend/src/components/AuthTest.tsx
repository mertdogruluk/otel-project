// Authentication Test Component
// This component demonstrates authentication functionality

'use client';

import React, { useState, useEffect } from 'react';
import { useLogin, useLogout, useVerifyToken } from '@/hooks/useAPI';
import { tokenManager, userManager, authHelpers } from '@/utils/auth';

const AuthTest: React.FC = () => {
  const [email, setEmail] = useState('admin@otel.com');
  const [password, setPassword] = useState('admin123');
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const { mutate: login, loading: loginLoading, error: loginError } = useLogin();
  const { mutate: logout, loading: logoutLoading } = useLogout();
  const { data: tokenData, loading: verifyLoading } = useVerifyToken();

  // Check authentication status
  useEffect(() => {
    setIsClient(true);
    
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const currentUser = userManager.getUser();
        const loggedIn = authHelpers.isLoggedIn();
        setUser(currentUser);
        setIsLoggedIn(loggedIn);
      }
    };

    checkAuth();
    
    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = () => {
      checkAuth();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const result = await login({ email, password });
      
      // Backend response: { success: true, data: { token, user } }
      if (result?.success && result?.data?.token) {
        const { token, user } = result.data;
        
        if (typeof window !== 'undefined') {
          localStorage.setItem("token", token);
          tokenManager.setToken(token);
          userManager.setUser(user);
        }
        setUser(user);
        setIsLoggedIn(true);
        console.log('Login successful:', result);
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Error will be displayed by the loginError from the hook
    }
  };

  const handleLogout = async () => {
    try {
      await logout({});
      authHelpers.clearAuth();
      setUser(null);
      setIsLoggedIn(false);
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Show loading state until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Authentication Test</h1>
        <div className="p-4">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Authentication Test</h1>
      
      {/* Authentication Status */}
      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Authentication Status</h2>
        <div className="space-y-2">
          <p><strong>Logged In:</strong> {isLoggedIn ? '✅ Yes' : '❌ No'}</p>
          <p><strong>Has Token:</strong> {isClient && (!!localStorage.getItem("token") || tokenManager.hasToken()) ? '✅ Yes' : '❌ No'}</p>
          <p><strong>User Data:</strong> {user ? '✅ Available' : '❌ Not Available'}</p>
          {user && (
            <div className="mt-2 p-2 bg-gray-50 rounded">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
            </div>
          )}
        </div>
      </div>

      {/* Login Form */}
      {!isLoggedIn ? (
        <div className="mb-6 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Login</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="admin@otel.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="admin123"
              />
            </div>
            <button
              onClick={handleLogin}
              disabled={loginLoading}
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loginLoading ? 'Logging in...' : 'Login'}
            </button>
            {loginError && (
              <p className="text-red-500 text-sm">{loginError}</p>
            )}
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Logout</h2>
          <button
            onClick={handleLogout}
            disabled={logoutLoading}
            className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-gray-400"
          >
            {logoutLoading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      )}

      {/* Role Checks */}
      {isLoggedIn && isClient && (
        <div className="mb-6 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Role Checks</h2>
          <div className="space-y-2">
            <p><strong>Is Admin:</strong> {authHelpers.isAdmin() ? '✅ Yes' : '❌ No'}</p>
            <p><strong>Is Hotel Owner:</strong> {authHelpers.isHotelOwner() ? '✅ Yes' : '❌ No'}</p>
            <p><strong>Is Support:</strong> {authHelpers.isSupport() ? '✅ Yes' : '❌ No'}</p>
            <p><strong>Is User:</strong> {authHelpers.isUser() ? '✅ Yes' : '❌ No'}</p>
          </div>
        </div>
      )}

      {/* Token Verification */}
      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-3">Token Verification</h2>
        {verifyLoading ? (
          <p>Verifying token...</p>
        ) : tokenData ? (
          <div className="p-2 bg-green-50 rounded">
            <p className="text-green-700">✅ Token is valid</p>
            <pre className="text-xs mt-2 overflow-auto">
              {JSON.stringify(tokenData, null, 2)}
            </pre>
          </div>
        ) : (
          <p className="text-gray-500">No token verification data</p>
        )}
      </div>

      {/* Demo Credentials */}
      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Demo Credentials</h3>
        <div className="text-sm space-y-1">
          <p><strong>Admin:</strong> admin@otel.com / admin123</p>
          <p><strong>Hotel Owner:</strong> owner@otel.com / owner123</p>
          <p><strong>User:</strong> user@otel.com / user123</p>
        </div>
      </div>
    </div>
  );
};

export default AuthTest;
