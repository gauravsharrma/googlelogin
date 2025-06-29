import { useEffect, useState } from 'react';
import { auth, provider } from './firebase';
import { signInWithPopup, signOut, User, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      {!user ? (
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Sign in with Google
        </button>
      ) : (
        <div className="bg-white p-6 rounded shadow">
          <img src={user.photoURL || ''} alt="profile" className="w-16 h-16 rounded-full mx-auto" />
          <h2 className="text-lg font-bold mt-4">{user.displayName}</h2>
          <p className="text-gray-600">{user.email}</p>
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
