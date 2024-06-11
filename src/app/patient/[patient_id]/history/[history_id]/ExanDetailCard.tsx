import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

const Image = styled('img')({
    width: '80%',
    height: '23rem',
    objectFit: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column"
});

export function ExanDetailCard(props: { loading?: boolean }) {
    const { loading = false } = props;

    return (
        <>
            <div style={{marginTop: '20px'}}>
                <Box sx={{ display: 'flex', alignItems: 'center'}}>
                    <Box sx={{ margin: 1 }}>
                        {loading ? (
                            <Skeleton variant="circular">
                                <Avatar />
                            </Skeleton>
                        ) : (
                            <Avatar src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg" />
                        )}
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        {loading ? (
                            <Skeleton width="100%">
                                <Typography>.</Typography>
                            </Skeleton>
                        ) : (
                            <Typography>Ted</Typography>
                        )}
                    </Box>
                </Box>
                {loading ? (
                    <Skeleton variant="rectangular" width="100%">
                        <div style={{ paddingTop: '57%' }} />
                    </Skeleton>
                ) : (
                    <Image
                        src="https://f.ptcdn.info/343/058/000/pb19uc5bsAgvzJGFf85-o.jpg"
                        alt=""
                    />
                )}
            </div>
            <div style={{marginTop: '20px'}}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ margin: 1 }}>
                        {loading ? (
                            <Skeleton variant="circular">
                                <Avatar />
                            </Skeleton>
                        ) : (
                            <Avatar src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg" />
                        )}
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        {loading ? (
                            <Skeleton width="100%">
                                <Typography>.</Typography>
                            </Skeleton>
                        ) : (
                            <Typography>Ted</Typography>
                        )}
                    </Box>
                </Box>
                {loading ? (
                    <Skeleton variant="rectangular" width="100%">
                        <div style={{ paddingTop: '57%' }} />
                    </Skeleton>
                ) : (
                    <Image
                        src="https://www.jeban.com/userfiles/thumbs/topics/600x315/129969.jpg"
                        alt=""
                    />
                )}
            </div>
            <div style={{marginTop: '20px'}}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ margin: 1 }}>
                        {loading ? (
                            <Skeleton variant="circular">
                                <Avatar />
                            </Skeleton>
                        ) : (
                            <Avatar src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg" />
                        )}
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        {loading ? (
                            <Skeleton width="100%">
                                <Typography>.</Typography>
                            </Skeleton>
                        ) : (
                            <Typography>Ted</Typography>
                        )}
                    </Box>
                </Box>
                {loading ? (
                    <Skeleton variant="rectangular" width="100%">
                        <div style={{ paddingTop: '57%' }} />
                    </Skeleton>
                ) : (
                    <Image
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfVrhFCYjt0xAQnmfz692R7AGHIhnKP0LDdg&s"
                        alt=""
                    />
                )}
            </div>
        </>
    );
}


