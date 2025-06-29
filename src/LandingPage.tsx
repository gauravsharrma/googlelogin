import { auth, provider } from './firebase';
import { signInWithPopup } from 'firebase/auth';

export default function LandingPage() {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white text-gray-800 font-sans">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-600">🚀 AppStarter</h1>
        <div className="space-x-4">
          <button onClick={handleLogin} className="text-gray-700 hover:text-indigo-600">
            Login
          </button>
          <button
            onClick={handleLogin}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-20 gap-12">
        {/* Left Content */}
        <div className="max-w-xl space-y-6 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Build your ideas <br />
            <span className="text-indigo-600">without limits.</span>
          </h2>
          <p className="text-lg text-gray-600">
            Create, launch, and scale your app ideas with ease. Firebase + Google Auth included.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button
              onClick={handleLogin}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow"
            >
              Get Started
            </button>
            <button className="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg">
              Learn More
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="max-w-lg w-full">
          <img
            src="https://illustrations.popsy.co/white/responsive-design.svg"
            alt="Launch Illustration"
            className="w-full"
          />
        </div>
      </main>
    </div>
  );
}
