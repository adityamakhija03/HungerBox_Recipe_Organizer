"use client"

import type React from "react"

import { useRecipes } from "../context/RecipeContext"

export default function DataManagement() {
  const { recipes, mealPlan, addRecipe, updateMealPlan } = useRecipes()

  const handleExport = () => {
    const data = JSON.stringify({ recipes, mealPlan })
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "recipe_organizer_data.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string)
          if (data.recipes && data.mealPlan) {
            data.recipes.forEach((recipe: any) => addRecipe(recipe))
            Object.entries(data.mealPlan).forEach(([day, recipeIds]) => {
              updateMealPlan(day, recipeIds as string[])
            })
            alert("Data imported successfully!")
          } else {
            throw new Error("Invalid data format")
          }
        } catch (error) {
          alert("Error importing data. Please check the file format.")
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="flex space-x-4">
      <button onClick={handleExport} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Export Data
      </button>
      <label className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer">
        Import Data
        <input type="file" accept=".json" onChange={handleImport} className="hidden" />
      </label>
    </div>
  )
}

