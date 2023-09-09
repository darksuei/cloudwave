import Search from "../Reusable/Search";
import { Categories } from "../Reusable/utils";
import FavFiles from "./FavFiles";
import "../../index.css";

export default function FavMain() {
  return (
    <div className="w-full md:w-10/12 flex flex-col py-4 px-4 md:px-8 items-center relative">
      <Search />
      <Categories
        style={`flex flex-row gap-x-2.5 w-full md:w-10/12 scrollable`}
        elementWidth={"w-36"}
        title={
          <h2 className="font-extrabold py-4 text-blue-500 text-xl md:text-2xl">
            Favorites
          </h2>
        }
        checkFav={false}
        favs={true}
      />
      <FavFiles />
    </div>
  );
}
