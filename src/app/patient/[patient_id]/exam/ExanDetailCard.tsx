import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { ImageExan } from '@/models/exan.model';

const Image = styled('img')({
  width: '80%',
  height: '23rem',
  objectFit: 'cover',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

type Props = {
  loading: boolean;
  data: ImageExan;
};

export function ExanDetailCard({ data, loading }: Props) {
  return (
    <>
      <div style={{ marginTop: '20px' }}>
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
              <Typography>{data.name}</Typography>
            )}
          </Box>
        </Box>
        {loading ? (
          <Skeleton variant="rectangular" width="100%">
            <div style={{ paddingTop: '57%' }} />
          </Skeleton>
        ) : (
          <Image src={data.src} alt={data.name} />
        )}
      </div>
    </>
  );
}
