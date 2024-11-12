'use client'
import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Box, Card, IconButton } from '@mui/material';
import { toast } from '@/services/alert.service';
import { findTypeShipAll } from '@/services/ship.service';
import { TypeShips } from '@/models/ship.model';
import CardTravelIcon from '@mui/icons-material/CardTravel';

type Props = {
    onReturnIdTypeShip: (id: string, name: string) => void
}

export default function ModalTypeShipt({onReturnIdTypeShip}: Props) {
    const [typeShip, setTypeShip] = React.useState<TypeShips[]>({} as TypeShips[])
    const [open, setOpen] = React.useState<boolean>(false);
    const [page, setPage] = React.useState<number>(0)

    const onFeedTypeShip = React.useCallback(async () => {
        try {
            const result = await findTypeShipAll(page, 10)
            setTypeShip(result.data)
        } catch (error: any) {
            toast(error.message, 'error')
        }
    }, [setTypeShip])

    React.useEffect(() => {
        onFeedTypeShip()
    }, [onFeedTypeShip])
    return (
        <React.Fragment>
            <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
                เลือกประเภทเรือ
            </Button>
            <Modal
                aria-labelledby="close-modal-title"
                open={open}
                onClose={(_event: React.MouseEvent<HTMLButtonElement>, reason: string) => {
                    setOpen(false);
                }}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Sheet variant="outlined" sx={{ minWidth: 300, borderRadius: 'md', p: 3 }}>
                    <ModalClose variant="outlined" />
                    <Typography
                        component="h2"
                        id="close-modal-title"
                        level="h4"
                        textColor="inherit"
                        sx={{ fontWeight: 'lg' }}
                    >
                        ประเภทของเรือ
                    </Typography>
                    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', padding: 2 }}>
                        {
                            Object.keys(typeShip).length === 0 ?
                                null :
                                typeShip.map((r, i) =>
                                    <Card key={i} elevation={4}>
                                        <List component="nav" aria-label="main mailbox folders">
                                            <ListItemButton
                                                onClick={(event) => { 
                                                    onReturnIdTypeShip(r.id, r.name_type)
                                                    setOpen(false)
                                                }}
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'start',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                                                    <CardTravelIcon />
                                                    <ListItemText sx={{marginLeft: 2, fontSize: '1.2rem', fontWeight: 600}} primary={r.name_type} />
                                                </Box>
                                                <ListItemText primary={r.description} />
                                            </ListItemButton>
                                        </List>
                                    </Card>
                                )
                        }
                    </Box>
                </Sheet>
            </Modal>
        </React.Fragment>
    );
}
