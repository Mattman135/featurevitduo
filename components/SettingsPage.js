import React, { useState } from "react"
import data from "./data.json"
import Item from "./item"

const SettingsPage = () => {
  const [searchData, setSearchData] = useState(data)
  const searchItem = (query) => {
    if (!query) {
      setSearchData(data)
      return
    }
    query = query.toLowerCase()

    const finalResult = []
    data.forEach((item) => {
      if (
        item.name.toLowerCase().indexOf(query) !== -1 ||
        item.tags.includes(query)
      ) {
        finalResult.push(item)
      }
    })
    setSearchData(finalResult)
  }
  return (
    <div>
      <p className="title"> Technologies</p>
      <div className="search-container">
        <input
          type="search"
          onChange={(e) => searchItem(e.target.value)}
          placeholder="Search Technologies"
        />
      </div>

      <div className="item-container">
        {searchData.map((item) => (
          <Item {...item} key={item.name} />
        ))}
      </div>
    </div>
  )
}

export default SettingsPage
