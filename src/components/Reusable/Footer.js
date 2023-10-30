import Github from "../icons/Github";

export function Footer() {
  return (
    <div className="w-full min-h-32 text-white/80 px-12 md:px-16 ">
      <div className="flex flex-col md:flex-row gap-8 py-8">
        <div className="w-11/12 md:w-4/12">
          <h1 className="font-semibold text-xl mb-3">About Us</h1>
          <p className="text-xs">
            Store your files securely in the cloud and access them from any
            device.
          </p>
        </div>
        <div className="w-11/12 md:w-4/12">
          <h1 className="font-semibold text-xl mb-3">Contact Info</h1>
          <ul className="text-xs flex flex-col gap-y-4">
            <li>+234 90 3971 7514</li>
            <li>contact@suei.space</li>
            <li>Lagos, Nigeria</li>
          </ul>
        </div>
        <div>
          <h1 className="font-semibold text-xl mb-3">Social</h1>
          <div className="flex flex-col gap-3">
            <p className="text-xs">Leave us a star on Github</p>
            <Github />
          </div>
        </div>
      </div>
      <hr />
      <h3 className="w-full text-center text-xs py-3">
        Copyright &copy; 2023 All rights reserved | Cloud Wave
      </h3>
    </div>
  );
}
