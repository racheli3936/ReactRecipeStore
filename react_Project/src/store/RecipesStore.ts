import axios from "axios"
import { makeAutoObservable } from "mobx"
export type RecipeType = {
    id: string,
    title: string,
    description: string,
    authorId: string,
    ingredients: string[],
    instructions: string
}
class RecipesStore {
    authorId: string | undefined
    list: RecipeType[] = []
    constructor() {
        makeAutoObservable(this)
    }
    setAuthorId(id: string) {
        this.authorId = id
    }
    async addRecipe(recipe: Partial<RecipeType>) {
        try {
            const res = await axios.post('http://localhost:3000/api/recipes',
                {
                    title: recipe.title,
                    description: recipe.description,
                    ingredients: recipe.ingredients,
                    instructions: recipe.instructions,
                }, {
                headers: {
                    'user-id': this.authorId
                }
            });
        } catch (error) {

            console.error('Error fetching data:', error);
        }
    }
    async getAllRecipes() {
        try {

            const res = await axios.get('http://localhost:3000/api/recipes');
            this.list = res.data

        }
        catch (error) {
            alert("i catch get")
            if (error.status === 401) {
                alert("email or passward isnt valid")
            }
            console.error('Error fetching recipes:', error)
        }
    }
}
export default new RecipesStore()