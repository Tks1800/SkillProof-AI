export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#070B1A] flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        <div className="text-center mb-10">

          <h1 className="text-4xl font-extrabold text-white">
            VAIVO
            <span className="text-cyan-400">AI</span>
          </h1>

          <p className="text-gray-400 mt-3">
            AI Powered Hiring Platform
          </p>

        </div>

        <div
          className="
          bg-white/5
          border
          border-white/10
          backdrop-blur-xl
          rounded-3xl
          p-8
          shadow-2xl
        "
        >
          {children}
        </div>

      </div>

    </div>
  );
}