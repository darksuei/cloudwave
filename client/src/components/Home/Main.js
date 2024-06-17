import { Categories, Search, Recent, DragDrop, Storage } from "../Reusable";

export function Main() {
  return (
    <div className='flex flex-col w-full md:w-7/12 py-4 items-center justify-center gap-y-5'>
      <Search />
      <DragDrop />
      <div className='block md:hidden w-full'>
        <Categories
          style={"flex flex-row space-x-2.5 overflow-x-scroll overflow-y-hidden md:overflow-hidden"}
          elementWidth={"w-36"}
          checkFav={false}
        />
      </div>
      <Recent title={"Recently Uploaded"} padding={"px-3"} headerPadding={"pl-3 md:pl-0"} />
      <div className='md:hidden w-11/12 h-fit p-2.5 bg-white rounded-2xl flex justify-center'>
        <Storage />
      </div>
    </div>
  );
}
