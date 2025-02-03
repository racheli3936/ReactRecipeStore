import { useContext, useRef, useState } from "react"
import { currentContext } from "../types/user"
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField } from "@mui/material";
import axios from "axios";
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
const Update = () => {
  const [isClicked, setIsClicked] = useState(false)
  const context = useContext(currentContext)
  const lNameRef = useRef<HTMLInputElement>(null)
  const addressRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const [user, setUser] = useState({})
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.put('http://localhost:3000/api/user',
        {
          firstName: context?.currentUser.firstName,
          lastName: lNameRef.current?.value||context?.currentUser.lastName,
          email: emailRef.current?.value||context?.currentUser.email,
          address: addressRef.current?.value||context?.currentUser.address,
          phone: phoneRef.current?.value||context?.currentUser.phone
        }, {
        headers: {
          'user-id': context?.currentUser.id 
        }
      });
      setUser(res.data.user)
      context?.dispatch({ type: 'UPDATE', new_data: { id: context.currentUser.id, firstName: context.currentUser.firstName, lastName: lNameRef.current?.value || '', passward: context.currentUser.passward, email: emailRef.current?.value || '', address: addressRef.current?.value || '', phone: phoneRef.current?.value || '' } })
      setIsClicked(false)

    } catch (error) {

      console.error('Error fetching data:', error)
    }
  }
  return (
    <>
      {<Box
        position="absolute"
        top={70}
        left={40}
        borderColor={'pink'}
        borderRadius={'3px'}
        sx={{ padding: '16px' }}
      ><Button onClick={() => setIsClicked(true)}>update-details</Button>
      </Box>}
      <Modal
        open={isClicked}
        onClose={() => setIsClicked(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField type="text" inputRef={lNameRef} placeholder={context?.currentUser.lastName||'lastName'} />
          <TextField type="text" inputRef={addressRef} placeholder={context?.currentUser.address||'address'} />
          <TextField type="text" inputRef={emailRef} placeholder={context?.currentUser.email||'email'} />
          <TextField type="text" inputRef={phoneRef} placeholder={context?.currentUser.phone||'phone'} />
          <Button onClick={handleSubmit}>save</Button>
        </Box>
      </Modal>
    </>
  )
}
export default Update