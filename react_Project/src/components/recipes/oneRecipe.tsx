import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { RecipeType } from '../../store/RecipesStore';
const OneRecipe = ({ message }: { message: RecipeType | null }) => {
    return (
        <Box >
            <Card variant="outlined">
                <CardContent style={{ border: '2px solid pink' }}>
                    {message ? (
                        <>
                            <Typography gutterBottom variant="h5" component="div">
                                {message.title}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                                {message.description}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Ingredients:</strong>
                                <ul style={{textAlign:'left'}}>
                                    {message.ingredients.map((ingredient) => (
                                        <li key={ingredient}>{ingredient}</li> // Assuming ingredient is unique
                                    ))}
                                </ul>
                                <strong>Instructions:</strong>
                                <div>{message.instructions}</div>
                            </Typography>
                        </>
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            No recipe selected.
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}
export default OneRecipe;