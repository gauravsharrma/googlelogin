import { useEffect, useState } from 'react';
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-sm w-full text-center">
        {!user ? (
          <>
            <h1 className="text-2xl font-semibold mb-6 text-gray-800">Welcome 👋</h1>
            <button
              onClick={handleLogin}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
            >
              Sign in with Google
            </button>
          </>
        ) : (
          <>
            <img
              src={user.photoURL || ''}
              alt="profile"
              className="w-20 h-20 rounded-full mx-auto shadow mb-4"
            />
            <h2 className="text-xl font-bold text-gray-800">{user.displayName}</h2>
            <p className="text-gray-500">{user.email}</p>
            <button
              onClick={handleLogout}
              className="mt-6 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded transition"
            >
              Sign out
            </button>
          </>
        )}
      </div>
    </div>
  );
}
