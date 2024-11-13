import * as React from 'react';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

type Props = {
    onRetunFindHalicopter: () => void
    onRetunFindAll: () => void
    onRetunFindCar: () => void
    onRetunFindShip: () => void
}

export default function TabPatient({onRetunFindAll, onRetunFindCar, onRetunFindHalicopter, onRetunFindShip}: Props) {
  return (
    <Select
      placeholder="ขัดกรองผู้ป่วย"
      indicator={<KeyboardArrowDown />}
      sx={{
        width: 326,
        marginTop: '10px',
        [`& .${selectClasses.indicator}`]: {
          transition: '0.2s',
          [`&.${selectClasses.expanded}`]: {
            transform: 'rotate(-180deg)',
          },
        },
      }}
    >
      <Option onClick={onRetunFindAll} value="dog">ทั้งหมด</Option>
      <Option onClick={onRetunFindCar} value="cat">รถรับส่ง</Option>
      <Option onClick={onRetunFindShip} value="fish">เรือรับส่ง</Option>
      <Option onClick={onRetunFindHalicopter} value="bird">ฮ. รับส่ง</Option>
    </Select>
  );
}