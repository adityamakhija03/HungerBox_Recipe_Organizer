import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import { RecipeProvider } from "./context/RecipeContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Recipe Organizer",
  description: "Manage recipes and generate meal plans",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecipeProvider>
          <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
            <nav className="bg-white shadow-lg">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center">
                      <span className="text-2xl font-bold text-green-600">Recipe Organizer</span>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                      <Link
                        href="/"
                        className="border-transparent text-gray-500 hover:border-green-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      >
                        Home
                      </Link>
                      <Link
                        href="/recipes"
                        className="border-transparent text-gray-500 hover:border-green-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      >
                        Recipes
                      </Link>
                      <Link
                        href="/meal-planner"
                        className="border-transparent text-gray-500 hover:border-green-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      >
                        Meal Planner
                      </Link>
                      <Link
                        href="/shopping-list"
                        className="border-transparent text-gray-500 hover:border-green-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      >
                        Shopping List
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
          </div>
        </RecipeProvider>
      </body>
    </html>
  )
}



import './globals.css'