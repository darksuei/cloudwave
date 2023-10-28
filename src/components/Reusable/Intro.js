export function Intro() {
  return (
    <div className="flex flex-col-reverse md:flex-row w-full h-screen items-center justify-center gap-y-1 md:gap-y-5">
      <div className="w-full md:w-6/12 flex flex-col justify-center items-center gap-y-1 md:gap-y-5 h-8/12 md:h-screen">
        <div className="p-5 w-10/12 flex flex-col gap-y-6 md:gap-y-7">
          <h1 className="text-white text-2xl md:text-5xl font-black">
            All your files in one safe place
          </h1>
          <p className="text-xs md:text-sm text-white">
            <span className="hidden md:inline">
              Free file storage for everyone.
            </span>{" "}
            Store your files securely in the cloud and access them from any
            device.
          </p>
        </div>
        <div className="w-10/12 px-4">
          <a href="/login">
            <button
              className="border border-white py-3 px-6 text-white hover:bg-blue-600 hover:border-blue-600 text-xs md:text-md"
              onClick={() => (window.location.href = "/login")}
              type="button"
            >
              Start Uploading ✨
            </button>
          </a>
        </div>
      </div>
      <div className="w-7/12 md:w-6/12 text-white flex items-center justify-center h-4/12 md:h-screen">
        <nav className="absolute top-5 right-8">
          <ul className="flex flex-row gap-6">
            <li>
              <a href="/login" className="hover:text-blue-500">
                Login
              </a>
            </li>
            <li>
              <a href="/signup" className="hover:text-blue-500">
                Register
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
