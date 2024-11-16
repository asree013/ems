'use client'
import * as React from 'react';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { useSearchParams } from 'next/navigation';

type Props = {
  onRetunFindHalicopter: () => void
  onRetunFindAll: () => void
  onRetunFindCar: () => void
  onRetunFindShip: () => void
  onSetValue: (value: string) => void
  onReturnNone: () => void
}

export default function TabPatient({ onRetunFindAll, onRetunFindCar, onRetunFindHalicopter, onRetunFindShip, onSetValue, onReturnNone }: Props) {
  const key = useSearchParams().get('key')
  const [value, setValue] = React.useState<string>('')
  if (key) {
    return null
  }
  else {
    return (
      <Select
        placeholder="ขัดกรองผู้ป่วย"
        indicator={<KeyboardArrowDown />}
        defaultValue={value?? ''}
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
        <Option onClick={(e) => {
          onReturnNone()
          setValue('none')
          onSetValue('none')
        }} value="none">ยังไม่ได้ขึ้นยานพาหนะ</Option>
        <Option onClick={(e) => {
          onRetunFindAll()
          setValue('all')
          onSetValue('all')
        }} value="all">ทั้งหมด</Option>
        <Option onClick={(e) => {
          onRetunFindCar()
          setValue('car')
          onSetValue('car')
        }} value="car">รถรับส่ง</Option>
        <Option onClick={(e) => {
          onRetunFindShip()
          setValue('ship')
          onSetValue('ship')
        }} value="ship">เรือรับส่ง</Option>
        <Option onClick={(e) => {
          onRetunFindHalicopter()
          setValue('helicopter')
          onSetValue('helicopter')
        }} value="helicopter">ฮ. รับส่ง</Option>
      </Select>
    );
  }
}