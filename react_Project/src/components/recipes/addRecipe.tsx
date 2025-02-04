import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import RecipesStore, {  RecipeType } from "../../store/RecipesStore";
import { array, object, string } from "yup";
import { useContext, useEffect, useState } from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import { CurrentContext } from "../../types/user";
import { yupResolver } from "@hookform/resolvers/yup";
import { Outlet, useNavigate } from "react-router-dom";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const schema = object({
    title: string().required('recipe name is require'),
    description: string(),
    ingredients: array()
    .of(string().required('Ingredient is required'))
    .required('Ingredients list is required') 
    .min(1, 'At least one ingredient is required'), 
    instructions:string().required('instructions is require').min(3,'instuctions must be at least 3 letters')
})
const AddRecipe=()=>{
    const context=useContext(CurrentContext);
    const [click,setClick]=useState(false)
    const navigate=useNavigate()
    const onSubmit: SubmitHandler<Partial<RecipeType>> = (data) => {
        RecipesStore.addRecipe(data)  
        setClick(false)
        reset()
        navigate('/allRecipes')
    }
    useEffect(() => {
        setClick(false)
        RecipesStore.setAuthorId(context?.currentUser.id);
    }, [context]);
    const { register, handleSubmit,reset,control, watch, formState: { errors }
    } = useForm({ resolver: yupResolver(schema) })
    const { fields, append, remove } = useFieldArray({
        control,
        name: "ingredients" 
    });
    return(
        <>
         <Button style={{ position: 'absolute',top: 70, right: 10 ,color:'black',backgroundColor:'pink'}} onClick={()=>setClick(true)}>add recipe </Button>
        <Modal
          open={click}
          onClose={() => setClick(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div> <TextField {...register('title')} placeholder="title" />
                {errors.title && <span>{errors.title.message}</span>}</div>
            <div><TextField {...register('description')} placeholder="description" />
                {errors.description && <span>{errors.description.message}</span>}</div>
                <div>
                    {fields.map((item, index) => (
                        <div key={item.id}>
                            <TextField
                                {...register(`ingredients.${index}`)} // Register input for ingredients
                                placeholder="Ingredient"
                            />
                            <Button type="button" onClick={() => remove(index)}>Remove</Button>
                        </div>
                    ))}
                    <button type="button" onClick={() => append('')}>Add Ingredient</button>
                    {errors.ingredients && <span>{errors.ingredients.message}</span>}
                </div>
                <div><TextField multiline {...register('instructions')} placeholder="instructions" />
                {errors.instructions && <span>{errors.instructions.message}</span>}</div>
            <Button type="submit">Save</Button>
        </form>
          </Box>
        </Modal>
        <Outlet/> 
</>)
}
export default AddRecipe