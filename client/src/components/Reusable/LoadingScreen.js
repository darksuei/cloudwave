import "../../index.css";

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center fixed w-screen h-screen top-0 left-0 bg-black opacity-50 z-30">
      <div className="relative">
        <svg className="spinner" viewBox="0 0 50 50">
        <circle
            className="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="5"
        ></circle>
        </svg>
      </div>
    </div>

  );
}
