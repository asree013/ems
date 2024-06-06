import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import ImageIcon from '@mui/icons-material/Image';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';

type Props = {
    src: string
    title: string
}

export default function MonitorPatietnImage({ src, title }: Props) {
    return (
        <Card variant="outlined" sx={{ width: '100%', marginTop: '4px', height: '200px' }}>
            <AspectRatio>
                {
                    src.length === 0 ?
                        <Paper elevation={3}>
                            <Typography>+</Typography>
                        </Paper> :
                        <CardMedia
                            component="img"
                            height="194"
                            image={src}
                            alt="Paella dish"
                        />
                }
            </AspectRatio>
            <Typography level="title-md">{title}</Typography>
            <Typography level="body-sm">{src ?? title.toLocaleLowerCase().includes('profile') ? 'no upload profile' : 'no upload id card'}</Typography>
        </Card>
    );
}
