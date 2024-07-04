'use client'
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
import { useContext } from 'react';
import { MissionContext, MissionContexts, TMissionC, TMissionCs } from '@/contexts/missions.context';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Typography } from '@mui/material';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { OpenModalUserContext, TOpenModalUser } from '@/contexts/modalUser.context';

function handleChangePage() {
  // Implement pagination logic here
}

function handleChangeRowsPerPage() {
  // Implement rows per page logic here
}
const ITEM_HEIGHT = 48;

export default function AccessibleTable() {
  const { missions, setMissions } = useContext<TMissionCs>(MissionContexts);
  const [selectedMissionId, setSelectedMissionId] = React.useState<string | null>(null);
  const [anchorElMap, setAnchorElMap] = React.useState<{ [key: string]: HTMLElement | null }>({});

  const handleClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setSelectedMissionId(id);
    setAnchorElMap(prev => ({ ...prev, [id]: event.currentTarget }));
  };

  const handleClose = (id: string) => {
    setAnchorElMap(prev => ({ ...prev, [id]: null }));
    setSelectedMissionId(null);
  };

  const { openUser, setOpenUser, missionId, setMissionId } = useContext<TOpenModalUser>(OpenModalUserContext);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead >
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">User</TableCell>
            <TableCell align="right">Create Mission</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            missions.length > 0 ?
              missions.map((r, i) =>
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    <img style={{ width: '9rem', height: '9rem' }} src={r.image} alt="" />
                  </TableCell>
                  <TableCell align="right">{r.titel}</TableCell>
                  <TableCell align="right">{r.status}</TableCell>
                  <TableCell align="right">{r._count.Users}</TableCell>
                  <TableCell align="right">{r.create_date}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="more"
                      id={`long-button-${r.id}`}
                      aria-controls={anchorElMap[r.id] ? `long-menu-${r.id}` : undefined}
                      aria-expanded={anchorElMap[r.id] ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={(event) => handleClick(event, r.id)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id={`long-menu-${r.id}`}
                      MenuListProps={{
                        'aria-labelledby': `long-button-${r.id}`,
                      }}
                      anchorEl={anchorElMap[r.id]}
                      open={Boolean(anchorElMap[r.id])}
                      onClose={() => handleClose(r.id)}
                      PaperProps={{
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: '20ch',
                        },
                      }}
                    >
                      <MenuItem onClick={() => {
                        setOpenUser(true);
                        setMissionId(r);
                        handleClose(r.id);
                      }}>
                        <ListItemIcon>
                          <PersonAddIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit">Add User</Typography>
                      </MenuItem>
                      <MenuItem>
                        <ListItemIcon>
                          <PendingActionsIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit">Edit Status</Typography>
                      </MenuItem>
                      <MenuItem>
                        <ListItemIcon>
                          <EditCalendarIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit">Edit Mission</Typography>
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ) :
              <TableRow >
                <TableCell component="th" scope="row">
                  No data
                </TableCell>
                <TableCell align="right">No data</TableCell>
                <TableCell align="right">No data</TableCell>
                <TableCell align="right">No data</TableCell>
                <TableCell align="right">No data</TableCell>
              </TableRow>
          }
        </TableBody>
        {/* <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={missions.length}
          rowsPerPage={10}
          page={0}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Table>
    </TableContainer>
  );
}
