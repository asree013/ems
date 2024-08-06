'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/navigation';
import style from './Device_id.module.css';
import Loadding from '../../../components/Loadding';
import { createDevice, editDeviceById } from '../../../services/device.service';

type Props = {
  result?: Device;
};

export default function FromDevice({ result }: Props) {
  const router = useRouter();
  const [str, setStr] = React.useState<string>('');
  const [brand, setBrand] = React.useState<string>('');
  const [isLoad, setIsLoad] = React.useState<boolean>(false);

  async function onSubmitCreateDevice(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    setIsLoad(true);
    try {
      const d = {} as Device;
      d.device_id = str;
      d.brand = brand
      await createDevice(d);
      router.back();
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  const handleChange = (event: SelectChangeEvent<string>) => {
    setBrand(event.target.value);
  };

  async function onSubmitEditDevice(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    setIsLoad(true);
    try {
      if (result) {
        const d = {} as Device;
        d.device_id = str;
        await editDeviceById(result.id, d);
        router.back();
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }
  if (result) {
    return (
      <>
        {isLoad ? (
          <Loadding />
        ) : (
          <form
            onSubmit={(e) => onSubmitEditDevice(e)}
            className={style.container}
          >
            <Card variant="outlined">
              <Box sx={{ p: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography gutterBottom variant="h5" component="div">
                    Edit Device
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    from
                  </Typography>
                </Stack>
                <TextField
                  defaultValue={result.device_id}
                  onChange={(e) => setStr(e.target.value)}
                  style={{ width: '100%' }}
                  id="filled-basic"
                  label="Device_id"
                  required
                />
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Button
                  type="submit"
                  style={{ background: '#2196f3', width: '100%' }}
                  variant="contained"
                  color="primary"
                >
                  Edit Device
                </Button>
              </Box>
            </Card>
          </form>
        )}
      </>
    );
  } else {
    return (
      <>
        {isLoad ? (
          <Loadding />
        ) : (
          <form
            onSubmit={(e) => onSubmitCreateDevice(e)}
            className={style.container}
          >
            <Card variant="outlined">
              <Box sx={{ p: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography gutterBottom variant="h5" component="div">
                    Create Device
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    from
                  </Typography>
                </Stack>
                <TextField
                  onChange={(e) => setStr(e.target.value)}
                  style={{ width: '100%' }}
                  id="filled-basic"
                  label="Device_id"
                  variant="filled"
                  required
                />
                <FormControl fullWidth className='mt-3'>
                  <InputLabel id="demo-simple-select-label">เลือกยี่ห้อ</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="เลือกยี่ห้อ"
                    onChange={handleChange}
                  >
                    <MenuItem value={'witleaf'}>witleaf</MenuItem>
                    <MenuItem value={'midray'}>midray</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Divider />
              <Box sx={{ p: 2 }}>
                <Button
                  type="submit"
                  style={{ background: '#2196f3', width: '100%' }}
                  variant="contained"
                  color="primary"
                >
                  Create Device
                </Button>
              </Box>
            </Card>
          </form>
        )}
      </>
    );
  }
}
