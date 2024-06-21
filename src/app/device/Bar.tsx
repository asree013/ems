'use client';
import * as React from 'react';
import { Paper, IconButton, Divider, InputBase, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { NIL } from 'uuid';
import { useRouter } from 'next/navigation';
import Loadding from '@/components/Loadding';

interface Props {
  nameBar: string;
  nameToCreate: string;
  returnString: (value: string) => void;
}

export default function Bar({ nameBar, nameToCreate, returnString }: Props) {
  const [isLoadding, setIsLoadding] = React.useState<boolean>(false);
  const router = useRouter();
  const [str, setStr] = React.useState<string>('');

  return (
    <>
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '50%',
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={nameBar}
          inputProps={{ 'aria-label': nameBar }}
          onChange={(e) => {
            setStr(e.target.value);
            returnString(e.target.value);
          }}
        />
        <IconButton
          type="button"
          sx={{ p: '10px' }}
          aria-label="search"
          onClick={(e) => returnString(str)}
        >
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.7 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
          <DocumentScannerIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.7 }} orientation="vertical" />
        <Button
          variant="text"
          onClick={() => {
            setIsLoadding(true);
            try {
              router.push(`${nameToCreate}/${NIL}`);
              setIsLoadding(false);
            } catch (error) {
              setIsLoadding(false);
            }
          }}
        >
          create
        </Button>
      </Paper>
    </>
  );
}
