import React, { useState } from "react"

const Searchbar = props => {
  const [search, setSearch] = useState("")
  const { onSearch } = props

  const onChangeHandler = e => {
    setSearch(e.target.value)
    if (e.target.value === 0) {
      onSearch(undefined)
    }
  }

  const onButtonClickHandler = () => {
    onSearch(search)
  }

  return (
    <div className="searchbar-container">
      <div className="searchbar">
        <input
          type="text"
          placeholder="Buscar Pokemon"
          onChange={onChangeHandler}
        />
      </div>
      <div className="searchbar-btn">
        <button onClick={onButtonClickHandler}>Buscar</button>
      </div>
    </div>
  )
}

export default Searchbar
