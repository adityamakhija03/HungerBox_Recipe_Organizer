import Link from "next/link"
import DataManagement from "./components/DataManagement"

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Recipe Organizer</h1>
      <p className="text-xl text-gray-600 mb-8">Manage your recipes and plan your meals with ease</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Link
          href="/recipes"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <h2 className="text-2xl font-semibold text-green-600 mb-2">Manage Recipes</h2>
          <p className="text-gray-600">Add, edit, and organize your favorite recipes</p>
        </Link>
        <Link
          href="/meal-planner"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">Plan Meals</h2>
          <p className="text-gray-600">Create weekly meal plans with your recipes</p>
        </Link>
        <Link
          href="/shopping-list"
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <h2 className="text-2xl font-semibold text-purple-600 mb-2">Generate Shopping List</h2>
          <p className="text-gray-600">Get a consolidated list of ingredients for your meal plan</p>
        </Link>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Data Management</h2>
        <p className="text-gray-600 mb-4">Export your data to save it or import previously saved data</p>
        <DataManagement />
      </div>
    </div>
  )
}

