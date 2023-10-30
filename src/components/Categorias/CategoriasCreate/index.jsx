'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import * as S from './style'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';


export const CategoriasCreate = ({ openModal, closeModal }) => {
  const [ nome, setNome ] = useState();

  const [ notification, setNotification ] = useState({
    open: false,
    message: '',
    severity: ''
  });

  const [ open, setOpen ] = useState(false);

  useEffect(() => {
    if(openModal) {
      setOpen(true);
    }
  }, [ openModal ])

  const handleCloseModal = () => {
    setOpen(false);
    closeModal(false);
  };

  const onChangeValue = (e) => {
    const { name, value } = e.target
    if (name === 'nome') setNome(value)
  }

  const onSumbmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:8080/categorias', { nome }, {
        headers: {
          Authorization: `Bearer ${ token }`
        }
      })
      setNotification({
        open: true,
        message: `Categoria ${ nome } criada com sucesso!`,
        severity: 'success'
      })
      handleCloseModal()
    }
    catch (error) {
      setNotification({
        open: true,
        message: error.response.data.error,
        severity: 'error'
      })
    }
  }

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotification({
      open: false,
      message: '',
      severity: ''
    })
  }

  return (
    <>
      <S.Snackbar open={ notification.open } autoHideDuration={ 3000 } onClose={ handleClose }>
        <S.Alert onClose={ handleClose } severity={ notification.severity } variant="filled" sx={{ width: '100%' }}>
          { notification.message }
        </S.Alert>
      </S.Snackbar>

      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Nova Categoria</DialogTitle>
        <DialogContent>
          <S.Form onSubmit={ onSumbmit }>
            <S.TextField name="nome" onChange={ onChangeValue } label="Nome" variant="outlined" color='primary' fullWidth />
          </S.Form>
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
          <S.Button variant="contained" color="success" type="submit" onClick={ onSumbmit }>Salvar</S.Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CategoriasCreate