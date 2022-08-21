import React, { useState, useEffect } from "react"
import "./App.css"
import Navbar from "../src/components/Navbar"
import Searchbar from "./components/Searchbar"
import Pokedex from "./components/Pokedex"
import { getPokemonData, getPokemons } from "./api"
import { FavoriteProvider } from "./contexts/favoritesContext"

const favoriteKey = "f"
function App() {
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [pokemons, setPokemons] = useState([])

  const itensPerPage = 27

  const fetchPokemons = async () => {
    try {
      setLoading(true)
      const data = await getPokemons(itensPerPage, itensPerPage * page)
      const promises = data.results.map(async pokemon => {
        return await getPokemonData(pokemon.url)
      })
      const results = await Promise.all(promises)
      setPokemons(results)
      setLoading(false)
      setTotalPages(Math.ceil(data.count / itensPerPage))
    } catch (err) {
      console.log(err)
    }
  }

  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoriteKey)) || []
    setFavorites(pokemons)
  }

  useEffect(() => {
    loadFavoritePokemons()
  }, [])

  useEffect(() => {
    fetchPokemons()
  }, [page])

  const updateFavoritePokemons = name => {
    const updatedFavorites = [...favorites]
    const favoriteIndex = favorites.indexOf(name)
    console.log(favoriteIndex)
    if (favoriteIndex >= 0) {
      updatedFavorites.splice(favoriteIndex, 1)
    } else {
      updatedFavorites.push(name)
    }
    window.localStorage.setItem(favoriteKey, JSON.stringify(updatedFavorites))
    setFavorites(updatedFavorites)
  }

  const onSearchHandler = async pokemon => {
    if (!pokemon) {
      console.log(pokemon)
      return fetchPokemons()
    }

    setLoading(true)
    setNotFound(false)
    const result = await onSearchHandler(pokemon)
    console.log(result)
    if (!result) {
      setLoading(false)
      setNotFound(true)
    } else {
      setPokemons([result])
    }
    setLoading(false)
  }

  return (
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        updateFavoritePokemons: updateFavoritePokemons
      }}
    >
      <div>
        <Navbar />
        <Searchbar onSearch={onSearchHandler} />
        <Pokedex
          pokemons={pokemons}
          loading={loading}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>
    </FavoriteProvider>
  )
}

export default App
