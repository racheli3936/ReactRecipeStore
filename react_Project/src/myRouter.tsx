import { createBrowserRouter } from "react-router-dom"
import AppLayout from "./components/appLayout"
import AddRecipe from "./components/recipes/addRecipe"
import AllRecipes from "./components/recipes/allRecipes"

const MyRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <>main error</>,
        children: [
            {
                path: 'allRecipes', element: <AllRecipes />,
                children: [{
                    path: 'addRecipe', element: <AddRecipe />
                }]
            }
        ]
    }
])

export default MyRouter
