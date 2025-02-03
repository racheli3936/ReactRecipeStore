import {  useState } from "react"
import Login from "./login"
import Update from "./update"
import LetterAvatars from "./avatar"
import LogUp from "./logUp"
import {  Outlet, useLocation } from "react-router-dom"
import { Box, Typography } from "@mui/material"
const Home = () => {
    const [IsOpen, setIsOpen] = useState(false)
    const location=useLocation()
    const isHomeRoute=location.pathname==='/'
    const handleSubmit = () => {
        setIsOpen(true)
    }
    return (
        <>
        <Outlet/>
           {isHomeRoute&&<Box
                sx={{
                    backgroundColor: '#f8f9fa',
                    color: '#333',
                    textAlign: 'center',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: 2,
                    margin: '20px'
                }}
            >
                <Typography variant="h4">
                    Recipes site of Israel
                </Typography>
                <img
                    src='src\assets\flamingo.jpg'
                    alt="Description of Image"
                    style={{
                        width: '100%',
                        height: '300px',
                        objectFit: 'cover', 
                        borderRadius: '8px',
                        marginTop: '20px'
                    }}
                />
            </Box>}
            {IsOpen == false && <Login IsOpen={handleSubmit} />}
            {IsOpen == false && <LogUp IsOpen={handleSubmit} />}
            {IsOpen && <Update />}
            {IsOpen && <LetterAvatars />}
        </>
    )
}
export default Home