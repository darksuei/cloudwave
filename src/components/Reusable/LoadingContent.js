import "../../index.css";

export function LoadingContent() {
  return (
    <section className="w-full h-full flex flex-col gap-2.5">
      <div className="h-14 w-full rounded-xl loading cursor-pointer shadow-sm noSelect"></div>
      <div className="h-14 w-full rounded-xl loading cursor-pointer shadow-sm noSelect"></div>
      <div className="h-14 w-full rounded-xl loading cursor-pointer shadow-sm noSelect"></div>
      <div className="h-14 w-full rounded-xl loading cursor-pointer shadow-sm noSelect"></div>
      <div className="h-14 w-full rounded-xl loading cursor-pointer shadow-sm noSelect"></div>
    </section>
  );
}
