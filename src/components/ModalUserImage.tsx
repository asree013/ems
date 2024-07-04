'use client'
import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Users } from '@/models/users.model';
import { joinMissionByAdmin } from '@/services/mission.service';
import { OpenModalUserContext, TOpenModalUser } from '@/contexts/modalUser.context';
import { useContext } from 'react';
import { toast } from '@/services/alert.service';
import {haversines} from '@/services/sum_lat_long.service'

type Props = {
    data: Users
}

export default function ModalUserImage({data}: Props) {

    const {missionId, setMissionId} = useContext<TOpenModalUser>(OpenModalUserContext)
    console.log('lat: ====> ' ,missionId);
    console.log('long: ====> ' ,missionId.long);
      
    async function onAddUserInMission() {
        try {
            const result = await joinMissionByAdmin(missionId.id, data.id)
            console.log(result.data);
            toast('Added Users', 'success')
        } catch (error) {
            console.log(error);
            
        }
    }

    return (
        <Box
            sx={{
                width: '98%',
                position: 'relative',
                overflow: { xs: 'auto', sm: 'initial' },
                marginTop: '5px'
            }}
        >
            {/* <Box
                sx={{
                    position: 'absolute',
                    display: 'block',
                    width: '1px',
                    bgcolor: 'warning.300',
                    left: '500px',
                    top: '-24px',
                    bottom: '-24px',
                    '&::before': {
                        top: '4px',
                        content: '"vertical"',
                        display: 'block',
                        position: 'absolute',
                        right: '0.5rem',
                        color: 'text.tertiary',
                        fontSize: 'sm',
                        fontWeight: 'lg',
                    },
                    '&::after': {
                        top: '4px',
                        content: '"horizontal"',
                        display: 'block',
                        position: 'absolute',
                        left: '0.5rem',
                        color: 'text.tertiary',
                        fontSize: 'sm',
                        fontWeight: 'lg',
                    },
                }}
            /> */}
            <Card
                orientation="horizontal"
                sx={{
                    width: '100%',
                    flexWrap: 'wrap',
                    [`& > *`]: {
                        '--stack-point': '500px',
                        minWidth:
                            'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
                    },
                    // make the card resizable for demo
                    overflow: 'auto',
                    resize: 'horizontal',
                }}
            >
                <AspectRatio flex ratio="1" maxHeight={150} sx={{ minWidth: 150 }}>
                    <img
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
                        srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
                        loading="lazy"
                        alt=""
                    />
                </AspectRatio>
                <CardContent>
                    <Typography fontSize="xl" fontWeight="lg">
                        {data.first_name} {data.last_name}
                    </Typography>
                    <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
                        {'ระยะทางจากที่เกิดเหตุ: ' + haversines(Number(missionId.lat), Number(missionId.long), Number(data.LocationActive[0]?.lat), Number(data.LocationActive[0]?.long)).toFixed(2) + " km."}
                    </Typography>
                    <Sheet
                        sx={{
                            bgcolor: 'background.level1',
                            borderRadius: 'sm',
                            p: 1.5,
                            my: 1.5,
                            display: 'flex',
                            gap: 2,
                            '& > div': { flex: 1 },
                        }}
                    >
                        <div onClick={onAddUserInMission}>
                            <Typography level="body-xs" fontWeight="lg">
                                Articles
                            </Typography>
                            <Typography fontWeight="lg">34</Typography>
                        </div>
                        <div>
                            <Typography level="body-xs" fontWeight="lg">
                                Add in Mission
                            </Typography>
                            <Typography fontWeight="lg">980</Typography>
                        </div>
                        <div>
                            <Typography level="body-xs" fontWeight="lg">
                                Rating
                            </Typography>
                            <Typography fontWeight="lg">8.9</Typography>
                        </div>
                    </Sheet>
                    <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
                        <Button variant="outlined" color="neutral">
                            Chat
                        </Button>
                        <Button variant="solid" color="primary" onClick={onAddUserInMission}>
                            Add in Mission
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
