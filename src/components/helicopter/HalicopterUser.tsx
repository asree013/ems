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
import { MissionDetailContext, TMissionDetailC } from '@/contexts/mission.detail.context';
import { Box, Card } from '@mui/material';
import { HelicopterByIdContext, THelicopterById } from '@/app/vehicle/[vehicle]/helicopter/detail/HelicopterById.context';
import HelicopterUserItem from './HelicopterUserItem';

export default function HelicopterUser() {
  const { halicoptorById } = React.useContext<THelicopterById>(HelicopterByIdContext)

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
            halicoptorById.UserBelongHelicopter.length === 0 ?
              <Typography>ไม่มีผู้บังคะบบัญชา</Typography> :
              halicoptorById.UserBelongHelicopter.map((r, i) =>
                <HelicopterUserItem key={i} user_id={r.user_id} keyValue={'commader'} />
              )
          }

          <Box>
            <CardContent>
              <Divider>ทีมแพทย์</Divider>
            </CardContent>
            <Box>
              {
                halicoptorById.UserBelongHelicopter.length === 0 ?
                  <Typography>ไม่มีผู้บังคะบบัญชา</Typography> :
                  halicoptorById.UserBelongHelicopter.map((r, i) =>
                    <HelicopterUserItem key={i} user_id={r.user_id} keyValue={'career'} />
                  )
              }
            </Box>
          </Box>

          <Box>
            <CardContent>
              <Divider>สมาชิก</Divider>
            </CardContent>
            <Box>
              {
                halicoptorById.UserBelongHelicopter.length === 0 ?
                  <Typography>ไม่มีผู้บังคะบบัญชา</Typography> :
                  halicoptorById.UserBelongHelicopter.map((r, i) =>
                    <HelicopterUserItem key={i} user_id={r.user_id} keyValue={'staff'} />
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