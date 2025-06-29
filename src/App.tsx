import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  auth,
  provider
} from './firebase';
import {
  signInWithPopup,
  signOut,
  User,
  onAuthStateChanged,
  getRedirectResult,
  signInWithRedirect
} from 'firebase/auth';

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) setUser(result.user);
      })
      .catch((error) => console.error('Redirect login error:', error));

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch {
      await signInWithRedirect(auth, provider);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-8 max-w-md w-full text-center"
      >
        {!user ? (
          <>
            <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-800">Welcome 👋</h1>
            <button
              onClick={handleLogin}
              className="w-full bg-indigo-600 hover:bg-indigo-700 focus-visible:ring focus-visible:ring-indigo-300 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Sign in with Google
            </button>
          </>
        ) : (
          <>
            <img
              src={user.photoURL || ''}
              alt="profile"
              className="w-24 h-24 rounded-full mx-auto shadow mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800">{user.displayName}</h2>
            <p className="text-gray-500 mb-4 break-all">{user.email}</p>
            <button
              onClick={handleLogout}
              className="mt-2 bg-gray-100 hover:bg-gray-200 focus-visible:ring focus-visible:ring-indigo-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Sign out
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
