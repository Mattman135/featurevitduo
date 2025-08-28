import React, { useState } from "react"
import { supabase } from "../lib/supabaseClient"

const SettingsPage = () => {
  const [foodName, setFoodName] = useState("")
  const [foodData, setFoodData] = useState(null)
  const [nutrients, setNutrients] = useState(null)

  const handleSearch = async () => {
    setNutrients(null) // Clear previous nutrients
    // Fetch FoodID from food_name table
    const { data: food_name_data } = await supabase
      .from("food_name")
      .select("FoodID")
      .ilike("FoodDescription", `%${foodName}%`)

    if (food_name_data && food_name_data.length > 0) {
      const foodId = food_name_data[0].FoodID

      // Fetch NutrientIDs from nutrient_amount table
      const { data: nutrient_amount_data } = await supabase
        .from("nutrient_amount")
        .select("NutrientID")
        .eq("FoodID", foodId)

      if (nutrient_amount_data && nutrient_amount_data.length > 0) {
        const nutrientNamePromises = nutrient_amount_data.map(async (item) => {
          // Fetch NutrientName from nutrient_name table for each NutrientID
          const { data: nutrient_name_data } = await supabase
            .from("nutrient_name")
            .select("NutrientName")
            .eq("NutrientID", item.NutrientID)

          return nutrient_name_data[0]?.NutrientName || "Unknown"
        })

        const resolvedNutrientNames = await Promise.all(nutrientNamePromises)
        setNutrients(resolvedNutrientNames.filter(Boolean)) // Store only the names
      }
    }
  }

  return (
    <div className="flex flex-col">
      <input
        className="input"
        type="text"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
        placeholder="Enter food name"
      />
      <button className="btn" onClick={handleSearch}>
        Search
      </button>
      {foodData && foodData.length > 0 && (
        <div>
          <h3>Food Details:</h3>
          <pre>{JSON.stringify(foodData, null, 2)}</pre>
        </div>
      )}
      {nutrients && nutrients.length > 0 && (
        <div>
          <h3>Nutrient Names:</h3>
          <ul>
            {nutrients.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SettingsPage
