'use client'
import * as React from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import homeCss from './home.module.css'

export default function CameraCar() {
  return (
    <Box
      component="ul"
      sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}
    >
      <div className={homeCss.bodyCamera}>
        <Card component="li" sx={{ width: 250, flexGrow: 1 }}>
          <CardCover>
            <video
              src="https://st4.depositphotos.com/1579158/41887/v/600/depositphotos_418877760-stock-video-drive-car-city-night.mp4"
              width="100%"
              height="auto"
              controls
              autoPlay
              loop
              muted
            ></video>
          </CardCover>
          <CardContent>
            <Typography
              level="body-lg"
              fontWeight="lg"
              textColor="#fff"
              mt={{ xs: 12, sm: 18 }}
            >
              กล้องหน้ารถ
            </Typography>
          </CardContent>
        </Card>


        <Card component="li" sx={{ width: 250, flexGrow: 1 }}>
          <CardCover>
            <video
              autoPlay
              loop
              muted
              poster="https://i.ytimg.com/vi/w6geNk3QnBQ/maxresdefault.jpg"
            >
              <source
                src="https://i.ytimg.com/vi/w6geNk3QnBQ/maxresdefault.jpg"
                type="video/mp4"
              />
            </video>
          </CardCover>
          <CardContent>
            <Typography
              level="body-lg"
              fontWeight="lg"
              textColor="#fff"
              mt={{ xs: 12, sm: 18 }}
            >
              กล้องห้องคนขับ
            </Typography>
          </CardContent>
        </Card>

        <Card component="li" sx={{ width: 250, flexGrow: 1 }}>
          <CardCover>
            <video
              autoPlay
              loop
              muted
              poster="https://i.ytimg.com/vi/w6geNk3QnBQ/maxresdefault.jpg"
            >
              <source
                src="https://i.ytimg.com/vi/w6geNk3QnBQ/maxresdefault.jpg"
                type="video/mp4"
              />
            </video>
          </CardCover>
          <CardContent>
            <Typography
              level="body-lg"
              fontWeight="lg"
              textColor="#fff"
              mt={{ xs: 12, sm: 18 }}
            >
              กล้องหลังรถ
            </Typography>
          </CardContent>
        </Card>
        <Card component="li" sx={{ width: 250, flexGrow: 1 }}>
          <CardCover>
            <video
              autoPlay
              loop
              muted
              poster="https://i.ytimg.com/vi/w6geNk3QnBQ/maxresdefault.jpg"
            >
              <source
                src="https://i.ytimg.com/vi/w6geNk3QnBQ/maxresdefault.jpg"
                type="video/mp4"
              />
            </video>
          </CardCover>
          <CardContent>
            <Typography
              level="body-lg"
              fontWeight="lg"
              textColor="#fff"
              mt={{ xs: 12, sm: 18 }}
            >
              กล้องผู้ป่วย1
            </Typography>
          </CardContent>
        </Card>
        <Card component="li" sx={{ width: 250, flexGrow: 1 }}>
          <CardCover>
            <video
              autoPlay
              loop
              muted
              poster="https://i.ytimg.com/vi/w6geNk3QnBQ/maxresdefault.jpg"
            >
              <source
                src="https://i.ytimg.com/vi/w6geNk3QnBQ/maxresdefault.jpg"
                type="video/mp4"
              />
            </video>
          </CardCover>
          <CardContent>
            <Typography
              level="body-lg"
              fontWeight="lg"
              textColor="#fff"
              mt={{ xs: 12, sm: 18 }}
            >
              กล้องผู้ป่วย2
            </Typography>
          </CardContent>
        </Card>
        <Card component="li" sx={{ width: 250, flexGrow: 1 }}>
          <CardCover>
            <video
              autoPlay
              loop
              muted
              poster="https://i.ytimg.com/vi/w6geNk3QnBQ/maxresdefault.jpg"
            >
              <source
                src="https://i.ytimg.com/vi/w6geNk3QnBQ/maxresdefault.jpg"
                type="video/mp4"
              />
            </video>
          </CardCover>
          <CardContent>
            <Typography
              level="body-lg"
              fontWeight="lg"
              textColor="#fff"
              mt={{ xs: 12, sm: 18 }}
            >
              กล้องผู้ป่วย3
            </Typography>
          </CardContent>
        </Card>
        {/* <Card component="li" sx={{ width: 250, flexGrow: 1 }}>
        <CardCover>
          <video
            autoPlay
            loop
            muted
            poster="https://i.ytimg.com/vi/w6geNk3QnBQ/maxresdefault.jpg"
          >
            <source
              src="https://i.ytimg.com/vi/w6geNk3QnBQ/maxresdefault.jpg"
              type="video/mp4"
            />
          </video>
        </CardCover>
        <CardContent>
          <Typography
            level="body-lg"
            fontWeight="lg"
            textColor="#fff"
            mt={{ xs: 12, sm: 18 }}
          >
            กล้องผู้ป่วย4
          </Typography>
        </CardContent>
      </Card> */}
      </div>
    </Box>
  );
}
