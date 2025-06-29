import { useState } from 'react';
import { auth, provider } from './firebase';
import { signInWithPopup, signOut, User } from 'firebase/auth';

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {!user ? (
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700"
        >
          Sign in with Google
        </button>
      ) : (
        <div className="bg-white p-8 rounded shadow text-center">
          <img src={user.photoURL || ''} alt="profile" className="w-16 h-16 rounded-full mx-auto mb-4" />
          <h2 className="text-lg font-bold">{user.displayName}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
