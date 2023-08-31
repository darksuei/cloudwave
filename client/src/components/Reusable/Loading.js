import "../../index.css";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-full relative">
      {/* <div className="animate-spin rounded-full border-t-4 border-r-2 border-blue-700 border-opacity-50 h-14 w-14"></div> */}
      <svg class="spinner" viewBox="0 0 50 50">
        <circle
          class="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke-width="5"
        ></circle>
      </svg>
    </div>
  );
}
