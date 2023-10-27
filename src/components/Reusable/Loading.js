import "../../index.css";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full relative">
      <svg className="spinner-abs" viewBox="0 0 50 50">
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
  );
}
