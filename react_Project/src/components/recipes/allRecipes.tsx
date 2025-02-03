import { useEffect, useState } from "react";
import RecipesStore, { RecipeType } from "../../store/RecipesStore";
import { observer } from "mobx-react-lite";
import { Box, Typography } from "@mui/material";
import OneRecipe from "./oneRecipe";
import { Outlet } from "react-router-dom";

const AllRecipes = observer(() => {
    const [currentRecipe, setCurrentRecipe] = useState<RecipeType | null>(null)
    useEffect(() => {
        const fetchRecipes = async () => {
            await RecipesStore.getAllRecipes();
        };
        fetchRecipes();
    }, []);
    const handleClick = (recipe: RecipeType) => {
        setCurrentRecipe(recipe);
    };
    return (
        <>
            < Outlet />
            <Box display="flex" height="100vh">
                <Box flex={1} padding={8} style={{ overflowY: 'auto' }}>
                    <Typography variant="h4" style={{ color: "pink" }}>All Recipes</Typography>
                    <div style={{ border: '3px solid pink' }}>
                        {RecipesStore.list.map((recipe) => (
                            <div style={{ textDecoration: 'underLine', }} onClick={() => handleClick(recipe)} key={recipe.id}>
                                {recipe.title}
                            </div>
                        ))}
                    </div>
                </Box>
                <Box flex={1} padding={13} style={{ overflowY: 'auto' }}>
                    <OneRecipe message={currentRecipe} />
                </Box>
                <img
                    src='src\assets\perach.png'
                    alt="Description of Image"
                    style={{
                        width: '100%', 
                        height: 'auto',
                        position: 'absolute', 
                        bottom: 0,
                        left: 0,
                        zIndex: -100
                    }}
                />
            </Box>
        </>
    );
});

export default AllRecipes;
