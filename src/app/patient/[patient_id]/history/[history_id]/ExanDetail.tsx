'use client'
import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { TypeOpenExanContext, OpenExanImage, TypeElIDContext, ElIdExanImage, TypeExanContext, ExanContextBody } from './page';
import { ExanDetailCard } from './ExanDetailCard';
import { ExanShows, ImageExan } from '@/models/exan.model';
import { useParams, useRouter } from 'next/navigation';

const drawerBleeding = 56;

type Props = {
  window?: () => Window;
}

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'fixed',
  top: 8,
  left: 'calc(50% - 15px)',
}));

export default function ExanDetail({ window }: Props) { // Default value for exan
  const windows = window;
  const patient_id = useParams().patient_id
  const router = useRouter()
  const { open, setOpen } = React.useContext<TypeOpenExanContext>(OpenExanImage);
  const { el_id, setEl_id } = React.useContext<TypeElIDContext>(ElIdExanImage);
  const { exan, setExan } = React.useContext<TypeExanContext>(ExanContextBody)
  const [exByElId, setExByElId] = React.useState<ExanShows>({} as ExanShows);
  const [imageExan, setImageExan] = React.useState<ImageExan[]>({} as ImageExan[])

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const container = windows !== undefined ? () => windows().document.body : undefined;

  const onChangeEelementId = React.useCallback(async () => {
    try {
      // const find = exan.filter(r => r.element_id.includes(el_id))
      if (open) {

        // console.log('exan; ', exan);
        const e = Boolean(exan.filter(r => r.element_id.includes(el_id)))
        if (e === false) {
          return
        }
        else {
          const e = (exan.find(r => r.element_id.includes(el_id)))
          if (e) {
            console.log(e);

            setExByElId(e)
            setImageExan(e.ImageExan)
          }
        }

      }


    } catch (error) {
      console.log(error);
    }
  }, [open]);

  React.useEffect(() => {
    onChangeEelementId();
    return () => {
      onChangeEelementId();
    }
  }, [onChangeEelementId]);

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: 'text.secondary' }}>51 results</Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'scroll',
          }}
        >
          <Button variant='contained' color='primary' onClick={() => {
            router.push(`/patient/${patient_id}/history/${exByElId.History.id}/${exByElId.id}?el_id=${el_id}`)
          }}>add Exan</Button>
          {
            imageExan.length > 0 ?
              imageExan.map(r =>

                <div key={r.id}>
                  <ExanDetailCard data={r} loading={false} />

                </div>
              ) :
              null
          }
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}
