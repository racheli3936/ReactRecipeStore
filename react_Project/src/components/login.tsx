import { FormEvent, useContext, useRef, useState } from "react"
import { currentContext } from "../types/user"
import axios from "axios"
import { Box, Button, Modal, TextField } from "@mui/material"
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
const Login = ({ IsOpen }: { IsOpen: Function }) => {
  const [isClicked, setIsClicked] = useState(false)
  const context = useContext(currentContext)
  const fNameRef = useRef<HTMLInputElement>(null)
  const passwardREf = useRef<HTMLInputElement>(null)
  const [user, setUser] = useState({})
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3000/api/user/login',
        {
          firstName: fNameRef.current?.value,
          password: passwardREf.current?.value
        })
      setUser(res.data.user)
      IsOpen()
      context?.dispatch({ type: 'CREATE', new_data: { id: res.data.user.id, firstName: fNameRef.current?.value || '', lastName: '', passward: passwardREf.current?.value || '', email: '', address: '', phone: '' } })
    }
    catch (e) {
      if (e.status === 401) {
        alert("email or passward isnt valid")
      }
    }
  }
  return (
    <>
      <Button style={{ position: 'absolute', top: 70, left: 10, color: 'black', backgroundColor: 'pink' }} onClick={() => setIsClicked(true)}>login </Button>
      <Modal
        open={isClicked}
        onClose={() => setIsClicked(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField type="text" inputRef={fNameRef} placeholder="firstName" />
          <TextField type="password" inputRef={passwardREf} placeholder="passward" />
          <Button onClick={handleSubmit}>log-in</Button>
        </Box>
      </Modal>
    </>
  )
}
export default Login