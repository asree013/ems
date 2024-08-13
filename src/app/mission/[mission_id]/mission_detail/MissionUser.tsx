'use client'
import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import BallotIcon from '@mui/icons-material/Ballot';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import { AspectRatio } from '@mui/joy';
import { MissionDetailContext, TMissionDetailC } from '@/contexts/mission.detail.context';
import { Box } from '@mui/material';

export default function MissionUser() {
    const { mission, setMission } = React.useContext<TMissionDetailC>(MissionDetailContext)
    return (
        <Card sx={{ borderRadius: 0, width: 300, maxWidth: '100%' }}>
            <CardContent>
                <Typography level="title-lg">สมาชิก</Typography>
                <Typography level="body-xs">ผู้บังคับบัญชา</Typography>
            </CardContent>
            <Box>
                {
                    mission.Users.length === 0 ?
                        <Typography>ไม่มีผู้บังคะบบัญชา</Typography> :
                        mission.Users.map((r, i) => {
                            if (!r.Responsibilities) {
                                if (r.role.toLocaleLowerCase().includes('admin' || 'rootadmin')) {
                                    return (
                                        <Card
                                            key={i}
                                            orientation="horizontal"
                                            size="sm"
                                            sx={{ bgcolor: 'background.surface', borderRadius: 0, mb: 1 }}
                                        >
                                            <CardOverflow>
                                                <AspectRatio
                                                    ratio="1"
                                                    sx={{ minWidth: 90, '& img[data-first-child]': { p: 1.5 } }}
                                                >
                                                    <img
                                                        src={r.image}
                                                        srcSet={r.image}
                                                        loading="lazy"
                                                        alt=""
                                                    />
                                                </AspectRatio>
                                            </CardOverflow>
                                            <CardContent>
                                                <Typography level="title-md">{r.first_name} {r.last_name}</Typography>
                                                <Typography level="body-sm">{r.career ? r.career : 'ผู้บังคะบบัญชา'}</Typography>
                                                <Typography level="body-sm">{r.phone_number ? r.phone_number : 'ไมมีเบอร์ติดต่อ'}</Typography>
                                            </CardContent>
                                        </Card>
                                    )
                                }

                            }
                            else {
                                return null
                            }
                        })
                }
            </Box>

            <CardContent>
                <Typography level="body-xs">ทีมแพทย์</Typography>
            </CardContent>
            {
                mission.Users.length === 0 ?
                    <Typography>ไม่มีทีมแพทย์</Typography> :
                    mission.Users.map((r, i) => {
                        if (!r.Responsibilities) {
                            if (r.role.toLocaleLowerCase().includes('user') && r.career.toLocaleLowerCase().includes('medical')) {
                                return (
                                    <Card
                                        key={i}
                                        orientation="horizontal"
                                        size="sm"
                                        sx={{ bgcolor: 'background.surface', borderRadius: 0, mb: 1 }}
                                    >
                                        <CardOverflow>
                                            <AspectRatio
                                                ratio="1"
                                                sx={{ minWidth: 90, '& img[data-first-child]': { p: 1.5 } }}
                                            >
                                                <img
                                                    src={r.image}
                                                    srcSet={r.image}
                                                    loading="lazy"
                                                    alt=""
                                                />
                                            </AspectRatio>
                                        </CardOverflow>
                                        <CardContent>
                                            <Typography level="title-md">{r.first_name} {r.last_name}</Typography>
                                            <Typography level="body-sm">{r.career}</Typography>
                                            <Typography level="body-sm">{r.phone_number ? r.phone_number : 'ไมมีเบอร์ติดต่อ'}</Typography>
                                        </CardContent>
                                    </Card>
                                )
                            }

                        }
                        else {
                            if (r.Responsibilities.role.toLocaleLowerCase().includes('staff')) {
                                return (
                                    <Card
                                        key={i}
                                        orientation="horizontal"
                                        size="sm"
                                        sx={{ bgcolor: 'background.surface', borderRadius: 0, mb: 1 }}
                                    >
                                        <CardOverflow>
                                            <AspectRatio
                                                ratio="1"
                                                sx={{ minWidth: 90, '& img[data-first-child]': { p: 1.5 } }}
                                            >
                                                <img
                                                    src={r.image}
                                                    srcSet={r.image}
                                                    loading="lazy"
                                                    alt=""
                                                />
                                            </AspectRatio>
                                        </CardOverflow>
                                        <CardContent>
                                            <Typography level="title-md">{r.first_name} {r.last_name}</Typography>
                                            <Typography level="body-sm">{r.career}</Typography>
                                            <Typography level="body-sm">{r.phone_number ? r.phone_number : 'ไมมีเบอร์ติดต่อ'}</Typography>
                                        </CardContent>
                                    </Card>
                                )
                            }
                        }
                    })
            }

            <CardContent>
                <Typography level="body-xs">สมาชิก</Typography>
            </CardContent>
            {
                mission.Users.length === 0 ?
                    <Typography>ไม่มีสมาชิก</Typography> :
                    mission.Users.map((r, i) => {
                        if (!r.Responsibilities) {
                            if (r.role.toLocaleLowerCase().includes('user') && r.career.toLocaleLowerCase() !== 'medical') {
                                return (
                                    <Card
                                        key={i}
                                        orientation="horizontal"
                                        size="sm"
                                        sx={{ bgcolor: 'background.surface', borderRadius: 0, mb: 1 }}
                                    >
                                        <CardOverflow>
                                            <AspectRatio
                                                ratio="1"
                                                sx={{ minWidth: 90, '& img[data-first-child]': { p: 1.5 } }}
                                            >
                                                <img
                                                    src={r.image}
                                                    srcSet={r.image}
                                                    loading="lazy"
                                                    alt=""
                                                />
                                            </AspectRatio>
                                        </CardOverflow>
                                        <CardContent>
                                            <Typography level="title-md">{r.first_name} {r.last_name}</Typography>
                                            <Typography level="body-sm">{r.career}</Typography>
                                            <Typography level="body-sm">{r.phone_number ? r.phone_number : 'ไมมีเบอร์ติดต่อ'}</Typography>
                                        </CardContent>
                                    </Card>
                                )
                            }

                        }
                        else {
                            if (r.Responsibilities.role.toLocaleLowerCase().includes('staff') && r.career.toLocaleLowerCase() !== 'medical') {
                                return (
                                    <Card
                                        key={i}
                                        orientation="horizontal"
                                        size="sm"
                                        sx={{ bgcolor: 'background.surface', borderRadius: 0, mb: 1 }}
                                    >
                                        <CardOverflow>
                                            <AspectRatio
                                                ratio="1"
                                                sx={{ minWidth: 90, '& img[data-first-child]': { p: 1.5 } }}
                                            >
                                                <img
                                                    src={r.image}
                                                    srcSet={r.image}
                                                    loading="lazy"
                                                    alt=""
                                                />
                                            </AspectRatio>
                                        </CardOverflow>
                                        <CardContent>
                                            <Typography level="title-md">{r.first_name} {r.last_name}</Typography>
                                            <Typography level="body-sm">{r.career}</Typography>
                                            <Typography level="body-sm">{r.phone_number ? r.phone_number : 'ไมมีเบอร์ติดต่อ'}</Typography>
                                        </CardContent>
                                    </Card>
                                )
                            }
                        }
                    })
            }


            <CardOverflow
                variant="soft"
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                    justifyContent: 'space-around',
                    py: 1,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Typography startDecorator={<BallotIcon color="error" />} level="title-sm">
                    13
                </Typography>
                <Divider orientation="vertical" />
                <Typography startDecorator={<CommentOutlinedIcon />} level="title-sm">
                    9
                </Typography>
                <Divider orientation="vertical" />
                <Typography startDecorator={<InboxOutlinedIcon />} level="title-sm">
                    32
                </Typography>
            </CardOverflow>
        </Card>
    );
}