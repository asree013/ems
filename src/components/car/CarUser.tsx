'use client'
import * as React from 'react';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import BallotIcon from '@mui/icons-material/Ballot';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import { AspectRatio } from '@mui/joy';
import { Box, Card } from '@mui/material';
import { CarDetailContext, TCarDetailContent } from './CarDetail.context';
import CarUserItem from './CarUserItem';
import { ShipDetailContext, TShipDetailContext } from '@/app/vehicle/[vehicle]/ship/detail/ShipById.context';
import { HelicopterByIdDetailContext, THelicopterByIdDetail } from '../helicopter/helicopterDetail.context';

export default function CarUser() {
  const { carByid } = React.useContext<TCarDetailContent>(CarDetailContext)
  const { shipById, setShipById } = React.useContext<TShipDetailContext>(ShipDetailContext)
  const { halicoptorById, setHelicopterById } = React.useContext<THelicopterByIdDetail>(HelicopterByIdDetailContext)

  return (
    // <p>helicopter</p>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ borderRadius: 0, width: 600, minWidth: 300, padding: '20px' }}>
        <CardContent>
          <Typography level="title-lg">สมาชิก</Typography>
          <Divider>ผู้บังคับบัญชา</Divider>
        </CardContent>
        <Box>
          {
            carByid?.UserBelongCar?.length === 0 ? (
              <Typography>ไม่มีผู้บังคับบัญชา</Typography>
            ) : (
              Array.from(
                new Map(
                  carByid?.UserBelongCar?.map(r => [r.user_id, r])
                ).values()
              ).map((uniqueUser, i) => (
                <CarUserItem key={i} user_id={uniqueUser.user_id} keyValue={'commander'} />
              ))
            )
          }
          {
            shipById?.UserBelongShip?.length === 0 ?
              <Typography>ไม่มีผู้บังคะบบัญชา</Typography> :
              Array.from(
                new Map(
                  shipById?.UserBelongShip?.map((r) => [r.user_id, r])
                ).values()
              ).map((r, i) =>
                <CarUserItem key={i} user_id={r.user_id} keyValue={'commader'} />

              )
          }

          {
            halicoptorById?.UserBelongHelicopter?.length === 0 ?
              <Typography>ไม่มีผู้บังคะบบัญชา</Typography> :
              Array.from(new Map(halicoptorById?.UserBelongHelicopter?.map(r => [r.user_id, r])).values())
                .map((r, i) =>
                  <CarUserItem key={i} user_id={r.user_id} keyValue={'commader'} />
                )
          }

          <Box>
            <CardContent>
              <Divider>ทีมแพทย์</Divider>
            </CardContent>
            <Box>
              {
                carByid?.UserBelongCar?.length === 0 ?
                  <Typography>ไม่มีผู้บังคะบบัญชา</Typography> :
                  Array.from(
                    new Map(carByid?.UserBelongCar?.map(r => [r.user_id, r])).values()
                  ).map((r, i) =>
                    <CarUserItem key={i} user_id={r.user_id} keyValue={'career'} />
                  )
              }
              {
                shipById?.UserBelongShip?.length === 0 ?
                  <Typography>ไม่มีผู้บังคะบบัญชา</Typography> :
                  Array.from(new Map(shipById?.UserBelongShip?.map(r => [r.user_id, r])).values())
                    .map((r, i) =>
                      <CarUserItem key={i} user_id={r.user_id} keyValue={'career'} />
                    )
              }
              {
                halicoptorById?.UserBelongHelicopter?.length === 0 ?
                  <Typography>ไม่มีผู้บังคะบบัญชา</Typography> :
                  Array.from(new Map(halicoptorById?.UserBelongHelicopter?.map(r => [r.user_id, r])).values())
                    .map((r, i) =>
                      <CarUserItem key={i} user_id={r.user_id} keyValue={'career'} />
                    )
              }
            </Box>
          </Box>

          <Box>
            <CardContent>
              <Divider>สมาชิก</Divider>
            </CardContent>
            <Box>
              {carByid ?

                carByid?.UserBelongCar?.length === 0 ?
                  <Typography>ไม่มีผู้บังสมาชิกรถ</Typography> :
                  Array.from(new Map(carByid?.UserBelongCar?.map(r => [r.user_id, r])).values())
                    .map((r, i) =>
                      <CarUserItem key={i} user_id={r.user_id} keyValue={'staff'} />
                    )
                : null

              }
              {
                shipById?.UserBelongShip?.length === 0 ?
                  <Typography>ไม่มีผู้บังสมาชิก</Typography> :
                  Array.from(new Map(shipById?.UserBelongShip?.map(r => [r.user_id, r])).values())
                    .map((r, i) =>
                      <CarUserItem key={i} user_id={r.user_id} keyValue={'staff'} />
                    )
              }

              {
                halicoptorById?.UserBelongHelicopter?.length === 0 ?
                  <Typography>ไม่มีผู้บังสมาชิก</Typography> :
                  Array.from(new Map(halicoptorById?.UserBelongHelicopter?.map(r => [r.user_id, r])).values())
                    .map((r, i) =>
                      <CarUserItem key={i} user_id={r.user_id} keyValue={'staff'} />
                    )
              }
            </Box>
          </Box>
        </Box>


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
            marginTop: 2
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
    </Box>
  );
}