'use client'
import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import HomeIcon from '@mui/icons-material/Home';
import { useParams, usePathname, useSearchParams } from 'next/navigation';

export default function BreadCrumb() {
  const path = usePathname();  
  const params = useParams()
  const [filterPath, setFilterPath] = React.useState<string[]>({} as string[])
  const [namePath, setNamePath] = React.useState<string>('')

  function handleClick(value: string) {
    if(value.toLocaleLowerCase() === 'history'){
      console.log(params.patient_id);
      
      window.location.href = `/patient/${params.patient_id}/history/${params.history_id}`
    }
    else{
      window.location.href = `/${value.toLocaleLowerCase()}`
    }
  }

  const onConvertPath = React.useCallback(() => {
    try {
      const filteredPath = path
        .split('/')
        .filter((segment) => !segment.match(/^[0-9a-fA-F-]{36}$/) && segment !== '');
      if (filteredPath.find(r => !r.includes("home"))) {
        
        setFilterPath(['Home'].concat(filteredPath))

        setNamePath(filteredPath[filteredPath.length - 1].toUpperCase())
      }
      else {
        console.log(filteredPath[0] = 'Home');
        setFilterPath(filteredPath)

        setNamePath(filteredPath[filteredPath.length - 1].toUpperCase())
      }
    } catch (error) {
      console.log(error);

    }
  }, [setNamePath, path])

  React.useEffect(() => {
    onConvertPath()

    return () => {
      onConvertPath
    }
  }, [onConvertPath])

  return (
    <div role="presentation" className='ml-4 mt-2'>
      <h1 className='mt-2 text-3xl font-bold text-blue-gd-from'>
        {namePath}
      </h1>
      <Breadcrumbs className='mt-2' aria-label="breadcrumb">
        {
          Array.isArray(filterPath) ?
            filterPath.map((r, i) => (
              <button
              disabled={i === filterPath.length - 1}
                type='button'
                onClick={() => handleClick(r)}
                key={i}
                style={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
              >
                {i === 0 ? <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" /> : null}
                {
                  i === filterPath.length - 1 ? <p className='text-black font-bold'>{r}</p>: <p>{r}</p>
                }
              </button>
            )) : null
        }

      </Breadcrumbs>
    </div>
  );
}
