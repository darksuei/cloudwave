import Storage from "../Reusable/Storage";
import { Categories } from "../Reusable/utils";

export default function RightSideBar() {
  return (
    <div className=" hidden md:flex flex-col bg-white rounded-3xl w-3/12 my-5 items-center p-5 mr-3 gap-y-4 h-fit">
      <Storage />
      <Categories
        style={"flex flex-col items-center justify-center gap-y-2.5"}
        title={<h2 className="font-semibold p-2 text-blue-500">Categories</h2>}
        checkFav={false}
      />
    </div>
  );
}
