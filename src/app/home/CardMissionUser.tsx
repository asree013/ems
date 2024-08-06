'use client'
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import { useContext } from 'react';
import { CurrentMissionContext, TCurrentMission } from '@/contexts/currentMission.context';
import { getLatLng, haversines } from '@/services/sum_lat_long.service';
import { LocateContext, TLocateC } from '@/contexts/locate.context';

export default function CardMissionUser() {
    const { missionUser, setMissionUser } = useContext<TCurrentMission>(CurrentMissionContext)
    const { userLocate, setUserLocate } = useContext<TLocateC>(LocateContext)


    return (
        <>
            {
                missionUser.length > 0 ?
                    missionUser.map(r =>
                        <Card
                            key={r.id}
                            variant="outlined"
                            orientation="horizontal"
                            sx={{
                                width: '100%',
                                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                            }}
                        >
                            <AspectRatio ratio="1" sx={{ width: 90 }}>
                                <img
                                    src={r.image}
                                    srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
                                    loading="lazy"
                                    alt=""
                                />
                            </AspectRatio>
                            <CardContent>
                                <Typography level="title-lg" id="card-description">
                                    {r.title}
                                </Typography>
                                <Typography level="body-sm" aria-describedby="card-description" mb={1}>
                                    <Link
                                        overlay
                                        underline="none"
                                        href="#interactive-card"
                                        sx={{ color: 'text.tertiary' }}
                                    >
                                        {r.status}
                                    </Link>
                                </Typography>
                                <Chip
                                    variant="outlined"
                                    color="primary"
                                    size="sm"
                                    sx={{ pointerEvents: 'none' }}
                                >
                                    {
                                        'ห่างจากที่เกิดเหตุ ' + haversines(Number(userLocate.lat), Number(userLocate.long), Number(r.lat), Number(r.long)).toFixed(2) + " km"
                                    }
                                </Chip>
                            </CardContent>
                        </Card>

                    ) :
                    <h1>ไม่มี ภารกิจ</h1>
            }
        </>
    );
}
