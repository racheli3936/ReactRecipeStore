import { Link } from "react-router-dom";
import './navBar.css'; 
import { useContext } from "react";
import { CurrentContext } from "../types/user";
const NavBar=()=>
{
    const context=useContext(CurrentContext) 
    return(
        <>
        <nav>
             <Link to='/'> Home </Link>|  
             <Link to='/allRecipes'> recipes-list </Link>
             {context?.currentUser.id!==''&&  <Link to='/allRecipes/addRecipe'>| add_recipe </Link>}
        </nav>
        </>
    )
}
export default NavBar