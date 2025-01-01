'use client'
import React, { useContext } from 'react'

import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';
import Face from '@mui/icons-material/Face';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';

import { MissionDetailContext, TMissionDetailC } from '../../../../contexts/mission.detail.context'

export default function MissionDetail() {
    const { mission, setMission } = useContext<TMissionDetailC>(MissionDetailContext)
    return (
        <>
            <Card
                variant="outlined"
                sx={{
                    '--Card-radius': (theme) => theme.vars.radius.xs,
                }}
                className='max-w-[480px] min-w-[250px]'
            >
                <CardContent orientation="horizontal" sx={{ alignItems: 'center', gap: 1 }}>
                    <Box
                        sx={{
                            position: 'relative',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                m: '-2px',
                                borderRadius: '50%',
                                background:
                                    'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                            },
                        }}
                    >
                    </Box>
                    <Typography fontWeight="lg">{mission.title}</Typography>
                    <IconButton variant="plain" color="neutral" size="sm" sx={{ ml: 'auto' }}>
                        <MoreHoriz />
                    </IconButton>
                </CardContent>
                <CardOverflow>
                    <AspectRatio>
                        <img src={mission.image} alt="" loading="lazy" />
                    </AspectRatio>
                </CardOverflow>
                <div className='p-3'> 
                    <p className='text-md font-bold'>รายละเอียดภารกิจ</p>
                    <p className='ml-2'>{mission.description}</p>
                </div>
            </Card>
        </>
    )
}
