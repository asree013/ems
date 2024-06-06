'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import PatientList from './PatientList';
import { Patients } from '@/models/patient';
import './patient.css'
import { findPatientAll } from '@/services/paitent.service';
import { Card, Fab } from '@mui/material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Loadding from '@/components/Loadding';
import { NIL } from 'uuid';


const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
});

type Props = {
    order_tranfer_id?: string
}

export default function PatientItem({ order_tranfer_id }: Props) {
    const pathname = usePathname().includes('patient')
    const router = useRouter()

    const [patient, setPatient] = React.useState<Patients[]>({} as Patients[])
    const [isload, setIsload] = React.useState(false)


    React.useEffect(() => {
        async function feedPateint() {
            setIsload(true)
            try {
                const result = await findPatientAll()
                setPatient(result.data)
            } catch (error) {
                console.log(error);

            } finally {
                setIsload(false)
            }
        }

        feedPateint()


    }, [])

    return (
        <>
            {
                isload === true ?
                    <Loadding /> :
                    <React.Fragment>
                        <CssBaseline />
                        <div className="patient_list">
                            {
                                patient.length > 0 ?
                                    patient.map(r =>
                                        <PatientList order_tranfer_id={order_tranfer_id} patient={r} />
                                    ) :
                                    <div onClick={() => router.push('/patient/'+ NIL)}>
                                        <Card variant="outlined" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '10px', cursor: 'pointer' }}>
                                            <Typography variant="body1" color="initial">
                                                No Patient Click to add Patient
                                            </Typography>
                                            <Typography variant="h1" color="initial">
                                                +
                                            </Typography>
                                        </Card>
                                    </div>
                            }
                        </div>
                        <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, background: '#2c387e' }}>
                            <Toolbar>
                                {
                                    pathname ?
                                        <Typography variant='h5'>
                                            Patient List
                                        </Typography> :
                                        <Typography variant='h5'>
                                            Add Patient in Monitor
                                        </Typography>
                                }
                                <StyledFab style={{ background: '#f50057', color: 'whiteSmoke' }} aria-label="add" onClick={() => router.push('/patient/' + NIL)}>
                                    <AddIcon />
                                </StyledFab>
                                <Box sx={{ flexGrow: 1 }} />
                                <IconButton color="inherit">
                                    <SearchIcon />
                                </IconButton>
                                <IconButton color="inherit">
                                    <MoreIcon />
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                    </React.Fragment>
            }
        </>
    );
}