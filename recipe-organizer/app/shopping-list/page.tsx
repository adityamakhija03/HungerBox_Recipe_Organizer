"use client"

import { useRecipes } from "../context/RecipeContext"

export default function ShoppingList() {
  const { recipes, mealPlan } = useRecipes()

  const generateShoppingList = () => {
    const shoppingList: { [key: string]: { quantity: number; unit: string } } = {}

    Object.values(mealPlan).forEach((dayPlan) => {
      dayPlan.forEach((recipeId) => {
        const recipe = recipes.find((r) => r.id === recipeId)
        if (recipe) {
          recipe.ingredients.forEach((ingredient) => {
            const key = ingredient.name.toLowerCase()
            if (shoppingList[key]) {
              shoppingList[key].quantity += Number.parseFloat(ingredient.quantity) || 0
            } else {
              shoppingList[key] = {
                quantity: Number.parseFloat(ingredient.quantity) || 0,
                unit: ingredient.unit,
              }
            }
          })
        }
      })
    })

    return Object.entries(shoppingList).map(([name, { quantity, unit }]) => ({
      name,
      quantity: quantity.toFixed(2),
      unit,
    }))
  }

  const shoppingList = generateShoppingList()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Shopping List</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Ingredients to Buy:</h2>
        <ul className="space-y-2">
          {shoppingList.map((item, index) => (
            <li key={index} className="flex justify-between items-center border-b pb-2">
              <span className="capitalize">{item.name}</span>
              <span>
                {item.quantity} {item.unit}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

