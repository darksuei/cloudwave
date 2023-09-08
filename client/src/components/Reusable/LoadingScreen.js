import "../../index.css";

export default function LoadingScreen({ absolute }) {
  return (
    <div className={`flex items-center justify-center ${absolute ? 'absolute w-full h-full rounded-lg ' : 'fixed w-screen h-screen' } top-0 left-0 bg-black opacity-50 z-30`}>
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
