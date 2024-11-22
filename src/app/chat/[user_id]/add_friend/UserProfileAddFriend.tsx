import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Users } from '@/models/users.model';
import { Communicates } from '@/models/communicate.model';
import { findCommunicateByUserId, joinCommunicationByCommunicateId } from '@/services/communication.service';
import { toast } from '@/services/alert.service';
import { timeOutJwt } from '@/services/timeout.service';
import Loadding from '@/components/Loadding';

type Props = {
  data: Communicates
}

export default function UserProfileAddFriend({ data }: Props) {
  const [communicateByUserId, setCommunicateByUserId] = React.useState<Communicates>({} as Communicates)
  const [load, setLoad] = React.useState<boolean>(false)

  const onFeedCommunicateByUserId = React.useCallback(async () => {
    try {
      const restul = await findCommunicateByUserId(data.communication_id)
      setCommunicateByUserId(restul.data)
    } catch (error: any) {
      toast(error.message, 'error')
      timeOutJwt(error)
    }
  }, [setCommunicateByUserId])

  async function onAddFriend() {
    setLoad(true)
    try {
      toast('เพิ่มเพื่อแล้ว', 'success')
      const result = await joinCommunicationByCommunicateId(data.communication_id)
      console.log(result.data);

    } catch (error: any) {
      toast(error.message, 'error')
      timeOutJwt(error)
    } finally {
      setLoad(false)
    }
  }

  React.useEffect(() => {
    onFeedCommunicateByUserId()
  }, [onFeedCommunicateByUserId])
  return (
    <>
      <Box
        sx={{
          width: '100%',
          position: 'relative',
          marginTop: 2,
          overflow: { xs: 'clip', sm: 'clip' },
        }}
      >
        <Box
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
        />
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
          <AspectRatio flex ratio="1" maxHeight={70} sx={{ minWidth: 142, minHeight: 140, objectFit: 'contain' }}>
            <img
              src={data.owner.image}
              srcSet={data.owner.image}
              loading="lazy"
              alt=""
            />
          </AspectRatio>
          <CardContent>
            <Typography sx={{ fontSize: 'xl', fontWeight: 'lg' }}>
              {data.owner.first_name} {data.owner.last_name}
            </Typography>
            <Typography
              level="body-sm"
              textColor="text.tertiary"
              sx={{ fontWeight: 'lg' }}
            >
              {data.owner.career}
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
              <div>
                <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
                  Articles
                </Typography>
                <Typography sx={{ fontWeight: 'lg' }}>34</Typography>
              </div>
              <div>
                <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
                  เพื่อนทั้งหมด
                </Typography>
                <Typography sx={{ fontWeight: 'lg' }}>{communicateByUserId.Joiner?.length ?? 0} คน</Typography>
              </div>
              <div>
                <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
                  Rating
                </Typography>
                <Typography sx={{ fontWeight: 'lg' }}>
                  {
                    communicateByUserId?.owner?.DriverCar.mission_id ?
                      communicateByUserId.owner.DriverCar.number : null
                  }
                  {
                    communicateByUserId?.owner?.DriverHelicopter.mission_id ?
                      communicateByUserId.owner.DriverHelicopter.number : null
                  }
                  {
                    communicateByUserId?.owner?.DriverShip.mission_id ?
                      communicateByUserId.owner.DriverHelicopter.number : null
                  }
                </Typography>
              </div>
            </Sheet>
            <Box sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
              <Button variant="outlined" color="neutral">
                พูดคุย
              </Button>
              <Button onClick={onAddFriend} variant="solid" color="primary">
                เพิ่มเป็นเพื่อน
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {
        load?
        <Loadding />:
        null
      }
    </>
  );
}
