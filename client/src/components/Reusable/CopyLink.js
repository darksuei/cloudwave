import React, { useState } from "react";

const CopyLinkBox = ({ mylink }) => {
  const [link, setLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    const textField = document.createElement("textarea");
    textField.innerText = link;
    document.body.appendChild(textField);
    textField.select();
    navigator.clipboard.writeText(mylink).then(() => {
      textField.remove();
      setCopied(true);
    })
  };

  return (
    <div className="flex flex-row items-center border justify-between rounded-md">
      <input
        type="text"
        value={mylink}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Enter a link..."
        className="px-3 py-2 w-full text-sm font-medium text-slate-500 outline-none"
        readonly
      />
      <button
        onClick={handleCopyClick}
        className="bg-slate-300 text-white px-4 py-2 hover:bg-white hover:text-slate-200 hover:border cursor-pointer"
      >
        {copied ? (
          <span className="text-xs font-black">Copied</span>
        ) : (
          <i className="fas fa-copy"></i>
        )}
      </button>
    </div>
  );
};

export default CopyLinkBox;
