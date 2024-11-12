'use client'

import React, { useState } from 'react'

import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Button } from '@mui/material';

type Props = {
    returnCurrent: (cur: number, limi: number) => void
}

export default function PaginationThemplete({ returnCurrent }: Props) {
    const [page, setPage] = useState<number>(1)
    const [limits, setLimits] = useState<number>(5)
    function handlerUpdatePage(e: React.MouseEvent<HTMLButtonElement | MouseEvent>) {
        const p = page +1
        setPage(p)
        returnCurrent(p, limits)
        
    }
    function handlerBackPage(e: React.MouseEvent<HTMLButtonElement | MouseEvent>) {
        const p = page === 1 ? page : page - 1
        setPage(p)
        returnCurrent(p, limits)
    }

    function handleChange(event: React.SyntheticEvent | null, newValue: string | null,) {
        if (newValue) {
            setLimits(parseInt(newValue))
            setPage(1)
            returnCurrent(1, parseInt(newValue))
        }
    };
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' , minWidth: 230, marginTop: 20, width: '100%', padding: 20}}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p>หน้า:{page}</p>
            </div>
            <div>
                {
                    page <= 1 ?
                        null :
                        <Button variant='outlined' type='button' onClick={handlerBackPage}><ArrowBackIcon /></Button>

                }
                <Button variant='contained' className='ml-1' type='button' onClick={handlerUpdatePage}>Next <ArrowForwardIcon /></Button>
            </div>
        </div>
    )
}
