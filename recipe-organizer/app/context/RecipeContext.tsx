"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Ingredient = {
  name: string
  quantity: string
  unit: string
}

type Recipe = {
  id: string
  name: string
  ingredients: Ingredient[]
  steps: string[]
  category: string
  dietaryTags: string[]
}

type MealPlan = {
  [key: string]: string[]
}

type RecipeContextType = {
  recipes: Recipe[]
  addRecipe: (recipe: Recipe) => void
  editRecipe: (id: string, updatedRecipe: Recipe) => void
  deleteRecipe: (id: string) => void
  mealPlan: MealPlan
  updateMealPlan: (day: string, recipeIds: string[]) => void
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined)

export const useRecipes = () => {
  const context = useContext(RecipeContext)
  if (!context) {
    throw new Error("useRecipes must be used within a RecipeProvider")
  }
  return context
}

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [mealPlan, setMealPlan] = useState<MealPlan>({})

  useEffect(() => {
    const storedRecipes = localStorage.getItem("recipes")
    const storedMealPlan = localStorage.getItem("mealPlan")
    if (storedRecipes) setRecipes(JSON.parse(storedRecipes))
    if (storedMealPlan) setMealPlan(JSON.parse(storedMealPlan))
  }, [])

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes))
  }, [recipes])

  useEffect(() => {
    localStorage.setItem("mealPlan", JSON.stringify(mealPlan))
  }, [mealPlan])

  const addRecipe = (recipe: Recipe) => {
    setRecipes([...recipes, recipe])
  }

  const editRecipe = (id: string, updatedRecipe: Recipe) => {
    setRecipes(recipes.map((recipe) => (recipe.id === id ? updatedRecipe : recipe)))
  }

  const deleteRecipe = (id: string) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id))
  }

  const updateMealPlan = (day: string, recipeIds: string[]) => {
    setMealPlan({ ...mealPlan, [day]: recipeIds })
  }

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, editRecipe, deleteRecipe, mealPlan, updateMealPlan }}>
      {children}
    </RecipeContext.Provider>
  )
}

