import React, { useContext } from "react"
import FavoriteContext from "../contexts/favoritesContext"

const Navbar = () => {
  const { favoritePokemons } = useContext(FavoriteContext)
  const logoImg =
    "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
  return (
    <nav>
      <div>
        <img className="nav-img" src={logoImg} alt="Pokemon-Logo" />
      </div>
      <div>{favoritePokemons.length}❤️</div>
    </nav>
  )
}

export default Navbar
