'use client'
import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import Loadding from './Loadding';

type Props = {
  item: TBreadCrumd[]
}

export type TBreadCrumd = {
  labe: string
  path: string
}

export default function BreadCrumb({ item }: Props) {

  const [load, setLoad] = React.useState<boolean>(false)

  function handleClick(value: TBreadCrumd) {
    setLoad(true)
    window.location.href = value.path
  }

  return (
    <>
      <div role="presentation" className='ml-4 mt-2'>
        <h1 className='mt-2 text-2xl font-bold text-blue-gd-from'>
          {item[item.length - 1].labe}
        </h1>
        <Breadcrumbs className='mt-2' aria-label="breadcrumb">
          {
            Array.isArray(item) ?
              item.map((r, i) => (
                <button
                  disabled={i === item.length - 1}
                  type='button'
                  onClick={() => handleClick(r)}
                  key={i}
                  style={{ display: 'flex', alignItems: 'center' }}
                  color="inherit"
                  className='text-[10px] lg:text-lg md:text-md'
                >
                  {i === 0 ? <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" /> : null}
                  {
                    i === item.length - 1 ? <p className='text-black font-bold'>{r.labe}</p> : <p className='hover:text-blue-gd-from font-medium'>{r.labe}</p>
                  }
                </button>
              )) : null
          }

        </Breadcrumbs>
      </div>

      {
        load?
        <Loadding />: null
      }
    </>
  );
}
