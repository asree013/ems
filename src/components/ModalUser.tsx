'use client'
import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { Fragment, useCallback, useContext, useEffect } from 'react';
import { OpenModalUserContext, TOpenModalUser } from '@/contexts/modalUser.context';
import ModalUserImage from './ModalUserImage';
import modalUser from './styles/ModalUser.module.css'
import { TUserContexts, UsersContexts } from '@/contexts/users.context';
import { findUsers } from '@/services/user.service';
import { TMissionC, MissionContext } from '@/contexts/missions.context';

export default function ModalUser() {
  const { openUser, setOpenUser,missionId, setMissionId } = useContext<TOpenModalUser>(OpenModalUserContext)
  const { users, setUsers } = useContext<TUserContexts>(UsersContexts)
  return (
    <Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={openUser}
        onClose={() => {
          setOpenUser(false)
        }}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '5px' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 700,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            This is the modal title
          </Typography>
          <Typography className={modalUser.userContent} id="modal-desc" textColor="text.tertiary" component={'div'}>
            {
              !users ?
                <p>No user</p>:
                users.map(r =>
                  <ModalUserImage data={r} key={r.id} />
                )
            }

          </Typography>
        </Sheet>
      </Modal>
    </Fragment>
  );
}
