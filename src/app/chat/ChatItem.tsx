'use client'
import { Button, ToggleButton } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MessageIcon from '@mui/icons-material/Message';

const HomeBody = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
`

const ButtonOpenChat = styled(ToggleButton)`
    z-index: 4;
`

export default function ChatItem() {
    const [selected, setSelected] = React.useState(true);
    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <>
            <HomeBody>
                <ToggleButton
                    sx={{ borderRadius: '2rem',position: 'absolute', bottom: 86, right: 16  }}
                    value={''}
                    selected={selected}
                    size='large'
                    onChange={(e) => {
                        setSelected(!selected)
                        setOpen(!open)
                    }}
                    color='warning'
                >
                    {
                        open ?
                            <ArrowUpwardIcon fontSize='large' color='inherit' /> :
                            <MessageIcon fontSize='large' color='inherit' />
                    }
                </ToggleButton>
            </HomeBody>
        </>
    )
}
