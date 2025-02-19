# Recipe Organizer with Meal Planning

## Overview
The Recipe Organizer with Meal Planning is a web application built with Next.js, designed to help users manage their recipes and create weekly meal plans efficiently. It allows users to add, edit, search, and categorize recipes while also generating an automated shopping list based on their meal plan.

## Features
### 1. Add Recipes
- Input recipe name, ingredients (with quantities), cooking steps, and category (e.g., "Breakfast", "Dinner").
- Assign dietary tags (e.g., "Vegetarian", "Gluten-Free").

### 2. Plan Meals
- Assign recipes to specific days of the week (e.g., "Monday: Omelette").
- Auto-generate a shopping list for the week by aggregating required ingredients.

### 3. Manage Recipes
- Search/filter recipes by category, dietary tags, or ingredient.
- Edit or delete recipes by ID.

### 4. Save and Load Data
- Export recipes and meal plans to a file format (JSON/CSV) for easy access and backup.
- Reload saved data when restarting the application.

## Requirements
- Utilize Next.js for frontend development.
- Implement input validation (e.g., numeric quantities, valid dietary tags).
- Prevent duplicate recipe entries (same name and ingredients).
- Handle errors gracefully (e.g., invalid day or recipe ID during meal planning).

## Example Use Case
1. A user adds a "Vegetarian Chili" recipe with ingredients like beans and tomatoes.
2. They also add a "Quinoa Salad" recipe with ingredients like quinoa and veggies.
3. They assign both recipes to their meal plan for the week.
4. The system generates a shopping list aggregating all required ingredients.
5. The user saves their data and later reloads it to make adjustments.

## Future Enhancements
The system is designed to be extendable, with potential features such as:
- Calorie tracking for meal plans.
- Portion scaling for different serving sizes.
- Adding image URLs for recipes.

## Getting Started
### Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```sh
   cd recipe-organizer
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

### Usage
1. Start the development server:
   ```sh
   npm run dev
   ```
2. Open your browser and visit `http://localhost:3000`.
3. Follow the UI to add, manage, and plan meals.

## Contributing
Feel free to contribute by submitting issues or feature requests. Fork the repository and submit a pull request with improvements.

## License
This project is licensed under the MIT License.

