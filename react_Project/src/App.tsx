import './App.css'
import MyRouter from './myRouter'
import { RouterProvider } from 'react-router-dom'
function App() {
  return (
    <>
      <RouterProvider router={MyRouter}/>
      </>
  )
}
export default App
