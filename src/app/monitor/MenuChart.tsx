'use client';
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility';
import { Fab } from '@mui/material';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import { useRouter } from 'next/navigation';
import { OrderTranfer } from '@/models/order_tranfer.model';
import { Patients } from '@/models/patient';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import SubtitlesOffIcon from '@mui/icons-material/SubtitlesOff';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Loadding from '@/components/Loadding';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import HistoryIcon from '@mui/icons-material/History';


const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

interface Propotys {
  orderTranfer: OrderTranfer
  patient: Patients
  returnOnDelete: (id: string) => void
  returnOnUpdate: (id: string, status: string) => void
}

export default function MenuChart({ orderTranfer, patient, returnOnDelete, returnOnUpdate }: Propotys) {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isLoad, setIsLoad] = React.useState(false)
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null)
  };

  return (
    <>
      {
        isLoad ?
          <Loadding /> :
          null
      }

      <div>
        <Fab variant="extended"
          color='secondary'
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <MenuOpenIcon sx={{ m: 0 }} fontSize='medium' />
        </Fab>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            'aria-labelledby': 'demo-customized-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {
            !orderTranfer.patient_id ?
              <div>
                <MenuItem onClick={() => {
                  router.push(`/monitor/${orderTranfer.id}/add-monitor`)
                  setAnchorEl(null)
                  setIsLoad(true)
                }} disableRipple>
                  <AssignmentIndIcon style={{ background: 'blue', color: 'white' }} />
                  Add Patient
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
              </div>
              : <div>
                <MenuItem onClick={() => {
                  router.push(`/monitor/${orderTranfer.id}`)
                  setIsLoad(true)
                  setAnchorEl(null)
                }} disableRipple>
                  <SettingsAccessibilityIcon />
                  Detail
                </MenuItem>
                <MenuItem onClick={() => {
                  router.push(`/patient/${patient.id}/history`)
                  setIsLoad(true)
                  setAnchorEl(null)
                }} disableRipple>
                  <HistoryIcon />
                  History
                </MenuItem>
                <MenuItem onClick={() => {
                  router.push(`/patient/${patient.id}`)
                  setAnchorEl(null)
                  setIsLoad(true)
                }} disableRipple>
                  <AssignmentIndIcon />
                  Patient
                </MenuItem>
                <MenuItem onClick={() => {
                  router.push(`/patient/${patient.id}`)
                  setIsLoad(true)
                  setAnchorEl(null)
                }} disableRipple>
                  <BorderColorIcon />
                  Edit Status
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
              </div>
          }
          {
            !orderTranfer.patient_id ?
              <MenuItem onClick={() => {
                setIsLoad(true)
                returnOnUpdate(orderTranfer.id, '')
              }} disableRipple>
                <SubtitlesOffIcon />
                Close
              </MenuItem> :
              <div>
                <MenuItem onClick={() => {
                  returnOnUpdate(orderTranfer.id, '')
                  setIsLoad(true)
                }} disableRipple>
                  <SubtitlesOffIcon />
                  Close
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={() => {
                  setIsLoad(true)
                  returnOnUpdate(orderTranfer.id, 'Completed')
                }} disableRipple>
                  <FactCheckIcon />
                  Success Case
                </MenuItem>
              </div>
          }

        </StyledMenu>
      </div>

    </>
  );
}
