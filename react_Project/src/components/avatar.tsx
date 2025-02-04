import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { green } from '@mui/material/colors';
import { useContext } from 'react';
import { CurrentContext } from '../types/user';
import { Box } from '@mui/material';
const LetterAvatars = () => {
  const context = useContext(CurrentContext)
  let f: string = ''
  if (context) {
    f = context.currentUser.firstName[0]
    if (context.currentUser.lastName)
      f += context.currentUser.lastName[0]
  }
  return (
    <Stack direction="row" spacing={2}>
      <Box
        position="absolute"
        top={0}
        left={0}
        zIndex={2000}
        sx={{ padding: '16px' }}
      >
        <Avatar sx={{ bgcolor: green[400], border: '1px solid white' }} >{f}</Avatar>
      </Box>
    </Stack>
  );
}
export default LetterAvatars