import * as React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import StopCircleIcon from '@mui/icons-material/StopCircle';

type Props = {
    funOnOpen: (bool: boolean) => void
}
export default function StartChart({funOnOpen}: Props) {
    const [selected, setSelected] = React.useState(false);

    return (
        <ToggleButton
            color='success'
            value="check"
            selected={selected}
            onChange={() => {
                setSelected(!selected);
                funOnOpen(selected)
            }}
        >
            {
                selected ?
                    <StopCircleIcon fontSize='large'  color='error' />:
                    <PlayCircleOutlineIcon fontSize='large' color='success' /> 

            }
        </ToggleButton>
    );
}