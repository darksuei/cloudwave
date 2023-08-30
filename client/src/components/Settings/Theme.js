import { useState } from "react";

export default function Theme() {
  const [selectedTheme, setSelectedTheme] = useState('light');

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
  };
  
  return (
    <div className="w-full p-8 flex flex-col gap-y-6">
          <h1 className='text-blue-700 text-xl font-extrabold ml-4 md:ml-0'>Theme</h1>
          <div className="flex items-center flex-row w-11/12 md:w-6/12 justify-between text-md">
            <label className="mr-4">
              <input
                type="radio"
                name="theme"
                value="light"
                checked={selectedTheme === 'light'}
                onChange={() => handleThemeChange('light')}
              />
              <span className="ml-2 text-gray-700">Light Mode</span>
            </label>
            <label>
              <input
                type="radio"
                name="theme"
                value="dark"
                checked={selectedTheme === 'dark'}
                onChange={() => handleThemeChange('dark')}
              />
              <span className="ml-2 text-gray-700">Dark Mode</span>
            </label>
          </div>
    </div>
  )
}