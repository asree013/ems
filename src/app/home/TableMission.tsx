import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Missions } from '@/models/mission.model';
import TablePagination from '@mui/material/TablePagination';

type Props = {
    data: Missions[]
}

function handleChangePage() {

}

function handleChangeRowsPerPage() {

}

export default function AccessibleTable({ data }: Props) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <TableHead >
                    <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        data.length > 0 ?
                            data.map(r =>
                                <TableRow key={r.id}>
                                    <TableCell component="th" scope="row">
                                        {r.image}
                                    </TableCell>
                                    <TableCell align="right">{r.titel}</TableCell>
                                    <TableCell align="right">{r.status}</TableCell>
                                    <TableCell align="right">{r._count.Users}</TableCell>
                                    <TableCell align="right">{r.create_date}</TableCell>
                                </TableRow>
                            ) :
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    no data
                                </TableCell>
                                <TableCell align="right">no data</TableCell>
                                <TableCell align="right">no data</TableCell>
                                <TableCell align="right">no data</TableCell>
                                <TableCell align="right">no data</TableCell>
                            </TableRow>
                    }
                </TableBody>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={10}
                    rowsPerPage={10}
                    page={1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Table>
        </TableContainer>
    );
}
