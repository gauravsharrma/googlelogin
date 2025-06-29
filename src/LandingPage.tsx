export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-gray-800 font-sans">
      {/* Top Navbar */}
      <header className="flex justify-between items-center px-6 py-4 shadow-sm bg-white">
        <h1 className="text-2xl font-bold text-indigo-600">myAppName</h1>
        <div className="space-x-4">
          <button className="text-gray-700 hover:text-indigo-600">Login</button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow">
            Sign up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-24 gap-12">
        {/* Left Side: Words */}
        <div className="max-w-xl space-y-6 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Turn your ideas <br /> into <span className="text-indigo-600">real apps</span>
          </h2>
          <p className="text-lg text-gray-600">
            A fun platform to build and launch your own web apps. Simple, clean, and powered by Firebase + Google login!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg shadow">
              Get Started
            </button>
            <button className="bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side: Picture */}
        <div className="max-w-lg w-full">
          <img
            src="https://illustrations.popsy.co/gray/app-launch.svg"
            alt="App Launch"
            className="w-full"
          />
        </div>
      </main>
    </div>
  );
}
