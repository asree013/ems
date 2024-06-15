'use client'
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { ImageExan } from '@/models/exan.model';
import exanCss from './exan_id.module.css'
import { Fab, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TModalImageExan, ModalImageExanContext } from './page';


type Props = {
    data: ImageExan
    index: number
}

export default function ModalImageDetail({ data, index }: Props) {
    const theme = useTheme();

    const { previewImage, setPreviewImage } = React.useContext<TModalImageExan>(ModalImageExanContext)

    function onDeleteImageInArray() {
        setPreviewImage(previewImage.filter((r, i) => r.src !== data.src))
    }
    function onUpdateNameInArray(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        if (e) {
            e.preventDefault()
            // const find = previewImage.find(r => r.src = data.src)
            // if(!find){
            //     console.log('error');
            //     return 
            // }
            // else{
            //     find.name = e.target.value
            //     return find
            // }
            const find = previewImage.map(r => {
                if (r.src === data.src) {
                    r.name = e.target.value
                    return r
                }
                else {
                    return r
                }
            })
            setPreviewImage(find)

        }
    }
    return (
        <>
            <Card sx={{ display: 'flex', marginTop: '10px' }}>
                <CardMedia
                    component="img"
                    image={data.src}
                    alt={data.src}
                    className={exanCss.image}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1' }}>
                        <Typography component="div" variant="h5">
                            อธิบายเบื่องต้น
                        </Typography>
                        <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={(e) => onUpdateNameInArray(e)} />
                        <Fab color='error' style={{ margin: '0 8px' }} onClick={onDeleteImageInArray}>
                            <DeleteIcon color='inherit' />
                        </Fab>
                    </CardContent>
                </Box>
            </Card>
        </>
    );
}
