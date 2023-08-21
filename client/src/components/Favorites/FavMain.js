import Search from "../Reusable/Search"
import { Categories } from "../Reusable/utils"
import FavFiles from "./FavFiles"
import {useContext} from "react"
import { FavoritesContext } from "../../Contexts/FavoritesContext"

export default function FavMain(){
    const {favoriteCategory} = useContext(FavoritesContext)
    return(
        <div className="w-10/12 flex flex-col p-8 items-center relative">
            <Search />
            <Categories
            style={'flex flex-row gap-x-2.5'}
            elementWidth={'w-36'}
            title={<h2 className='font-extrabold py-4 text-blue-500 text-2xl'>Favorites</h2>}
            checkFav={false}
            favs={favoriteCategory}  />
            <FavFiles />
        </div>
    )
}