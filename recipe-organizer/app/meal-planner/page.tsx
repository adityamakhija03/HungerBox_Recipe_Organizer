"use client"

import { useState } from "react"
import { useRecipes } from "../context/RecipeContext"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function MealPlanner() {
  const { recipes, mealPlan, updateMealPlan } = useRecipes()
  const [selectedDay, setSelectedDay] = useState(days[0])

  const handleAddRecipeToDay = (recipeId: string) => {
    const currentDayPlan = mealPlan[selectedDay] || []
    updateMealPlan(selectedDay, [...currentDayPlan, recipeId])
  }

  const handleRemoveRecipeFromDay = (recipeId: string) => {
    const currentDayPlan = mealPlan[selectedDay] || []
    updateMealPlan(
      selectedDay,
      currentDayPlan.filter((id) => id !== recipeId),
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Meal Planner</h1>
      <div className="flex space-x-4 mb-4">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded ${
              selectedDay === day ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Available Recipes</h2>
          <div className="space-y-2">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
                <span>{recipe.name}</span>
                <button
                  onClick={() => handleAddRecipeToDay(recipe.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Add to {selectedDay}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Meal Plan for {selectedDay}</h2>
          <div className="space-y-2">
            {(mealPlan[selectedDay] || []).map((recipeId) => {
              const recipe = recipes.find((r) => r.id === recipeId)
              return recipe ? (
                <div key={recipe.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
                  <span>{recipe.name}</span>
                  <button
                    onClick={() => handleRemoveRecipeFromDay(recipe.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              ) : null
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

