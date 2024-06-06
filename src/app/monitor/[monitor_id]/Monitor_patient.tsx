import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import './monitor_id.css';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

type Props = {
    icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
    txt: string;
    seconTxt?: string | number
}

export default function MonitorPatient({ icon: Icon, txt, seconTxt }: Props) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
       <ListItem>
        <ListItemAvatar>
          <Avatar>
            <Icon fontSize='small' />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={txt} secondary={seconTxt? seconTxt : null} sx={{ 
            '& .MuiListItemText-primary': { color: 'black' },
            '& .MuiListItemText-secondary': { color: 'black' },
            fontSize: '12px'
          }} />
      </ListItem>
    </List>
  );
}
