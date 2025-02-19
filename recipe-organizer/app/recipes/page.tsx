"use client"

import { useState } from "react"
import { useRecipes } from "../context/RecipeContext"
import { v4 as uuidv4 } from "uuid"

export default function Recipes() {
  const { recipes, addRecipe, editRecipe, deleteRecipe } = useRecipes()
  const [isAdding, setIsAdding] = useState(false)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("")
  const [filterTag, setFilterTag] = useState("")

  const [newRecipe, setNewRecipe] = useState({
    id: "",
    name: "",
    ingredients: [{ name: "", quantity: "", unit: "" }],
    steps: [""],
    category: "",
    dietaryTags: [],
  })

  const handleAddRecipe = () => {
    if (newRecipe.name && newRecipe.ingredients.length > 0 && newRecipe.steps.length > 0) {
      addRecipe({ ...newRecipe, id: uuidv4() })
      setNewRecipe({
        id: "",
        name: "",
        ingredients: [{ name: "", quantity: "", unit: "" }],
        steps: [""],
        category: "",
        dietaryTags: [],
      })
      setIsAdding(false)
    }
  }

  const handleEditRecipe = (id: string) => {
    const recipeToEdit = recipes.find((recipe) => recipe.id === id)
    if (recipeToEdit) {
      setNewRecipe(recipeToEdit)
      setIsEditing(id)
    }
  }

  const handleUpdateRecipe = () => {
    if (isEditing) {
      editRecipe(isEditing, newRecipe)
      setIsEditing(null)
      setNewRecipe({
        id: "",
        name: "",
        ingredients: [{ name: "", quantity: "", unit: "" }],
        steps: [""],
        category: "",
        dietaryTags: [],
      })
    }
  }

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterCategory === "" || recipe.category === filterCategory) &&
      (filterTag === "" || recipe.dietaryTags.includes(filterTag)),
  )

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Recipes</h1>
      <div className="flex space-x-4">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 flex-grow"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">All Categories</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
        </select>
        <select value={filterTag} onChange={(e) => setFilterTag(e.target.value)} className="border rounded p-2">
          <option value="">All Tags</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Vegan">Vegan</option>
          <option value="Gluten-Free">Gluten-Free</option>
          <option value="Dairy-Free">Dairy-Free</option>
        </select>
      </div>
      <button
        onClick={() => setIsAdding(true)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add New Recipe
      </button>
      {isAdding && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Add New Recipe</h2>
          <input
            type="text"
            placeholder="Recipe Name"
            value={newRecipe.name}
            onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
            className="border rounded p-2 w-full mb-2"
          />
          <select
            value={newRecipe.category}
            onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}
            className="border rounded p-2 w-full mb-2"
          >
            <option value="">Select Category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
          </select>
          <div className="mb-2">
            <h3 className="font-bold">Ingredients:</h3>
            {newRecipe.ingredients.map((ingredient, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  placeholder="Ingredient"
                  value={ingredient.name}
                  onChange={(e) => {
                    const updatedIngredients = [...newRecipe.ingredients]
                    updatedIngredients[index].name = e.target.value
                    setNewRecipe({ ...newRecipe, ingredients: updatedIngredients })
                  }}
                  className="border rounded p-2 flex-grow"
                />
                <input
                  type="text"
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onChange={(e) => {
                    const updatedIngredients = [...newRecipe.ingredients]
                    updatedIngredients[index].quantity = e.target.value
                    setNewRecipe({ ...newRecipe, ingredients: updatedIngredients })
                  }}
                  className="border rounded p-2 w-20"
                />
                <input
                  type="text"
                  placeholder="Unit"
                  value={ingredient.unit}
                  onChange={(e) => {
                    const updatedIngredients = [...newRecipe.ingredients]
                    updatedIngredients[index].unit = e.target.value
                    setNewRecipe({ ...newRecipe, ingredients: updatedIngredients })
                  }}
                  className="border rounded p-2 w-20"
                />
                <button
                  onClick={() => {
                    const updatedIngredients = newRecipe.ingredients.filter((_, i) => i !== index)
                    setNewRecipe({ ...newRecipe, ingredients: updatedIngredients })
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                setNewRecipe({
                  ...newRecipe,
                  ingredients: [...newRecipe.ingredients, { name: "", quantity: "", unit: "" }],
                })
              }
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              Add Ingredient
            </button>
          </div>
          <div className="mb-2">
            <h3 className="font-bold">Steps:</h3>
            {newRecipe.steps.map((step, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  placeholder={`Step ${index + 1}`}
                  value={step}
                  onChange={(e) => {
                    const updatedSteps = [...newRecipe.steps]
                    updatedSteps[index] = e.target.value
                    setNewRecipe({ ...newRecipe, steps: updatedSteps })
                  }}
                  className="border rounded p-2 flex-grow"
                />
                <button
                  onClick={() => {
                    const updatedSteps = newRecipe.steps.filter((_, i) => i !== index)
                    setNewRecipe({ ...newRecipe, steps: updatedSteps })
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => setNewRecipe({ ...newRecipe, steps: [...newRecipe.steps, ""] })}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            >
              Add Step
            </button>
          </div>
          <div className="mb-2">
            <h3 className="font-bold">Dietary Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"].map((tag) => (
                <label key={tag} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={newRecipe.dietaryTags.includes(tag)}
                    onChange={(e) => {
                      const updatedTags = e.target.checked
                        ? [...newRecipe.dietaryTags, tag]
                        : newRecipe.dietaryTags.filter((t) => t !== tag)
                      setNewRecipe({ ...newRecipe, dietaryTags: updatedTags })
                    }}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">{tag}</span>
                </label>
              ))}
            </div>
          </div>
          <button onClick={handleAddRecipe} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Save Recipe
          </button>
        </div>
      )}
      {isEditing && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Edit Recipe</h2>
          {/* Add the same form fields as in the Add Recipe section, but populate with the recipe being edited */}
          <button onClick={handleUpdateRecipe} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Update Recipe
          </button>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">{recipe.name}</h2>
            <p className="text-gray-600 mb-2">Category: {recipe.category}</p>
            <p className="text-gray-600 mb-2">Tags: {recipe.dietaryTags.join(", ")}</p>
            <h3 className="font-bold mt-4">Ingredients:</h3>
            <ul className="list-disc list-inside mb-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.quantity} {ingredient.unit} {ingredient.name}
                </li>
              ))}
            </ul>
            <h3 className="font-bold mt-4">Steps:</h3>
            <ol className="list-decimal list-inside mb-4">
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditRecipe(recipe.id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteRecipe(recipe.id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

