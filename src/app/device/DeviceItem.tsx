import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Fab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';

type Props = {
  deviceItem: Device
  index: number
}

export default function AlignItemsList({ deviceItem, index }: Props) {
  const router = useRouter()
  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginTop: '10px' }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Fab>
            {index + 1}
          </Fab>
        </ListItemAvatar>
        <ListItemText
          primary={'Device ID: ' + deviceItem.device_id}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >

              </Typography>
              Status: {deviceItem.is_active}
            </React.Fragment>
          }
        />
        <div onClick={() => router.push(`/device/${deviceItem.id}`)}>
          <EditIcon style={{ background: 'black', color: 'white', borderRadius: '50%', fontSize: '2.5rem', padding: '5px' }} />
        </div>
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}