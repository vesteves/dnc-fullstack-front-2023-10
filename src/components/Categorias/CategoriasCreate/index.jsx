'use client'
import { useState } from 'react'
import axios from 'axios'
import * as S from './style'

export const CategoriasCreate = ({ userId }) => {
  const [ nome, setNome ] = useState();

  const [ notification, setNotification ] = useState({
    open: false,
    message: '',
    severity: ''
  });

  const onChangeValue = (e) => {
    const { name, value } = e.target
    if (name === 'nome') setNome(value)
  }

  const onSumbmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8080/categorias',
        { nome, user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${ localStorage.getItem('token') }`
          }
        }
      )
      setNotification({
        open: true,
        message: `Categoria ${ nome } criada com sucesso!`,
        severity: 'success'
      
      })
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
      <S.Form onSubmit={ onSumbmit }>
        <S.H1>Criar Categoria</S.H1>
        <S.TextField name="nome" onChange={ onChangeValue } label="Nome" variant="outlined" color='primary' fullWidth />
        <S.Button variant="contained" color="success" type="submit">Enviar</S.Button>
      </S.Form>

      <S.Snackbar open={ notification.open } autoHideDuration={ 3000 } onClose={ handleClose }>
        <S.Alert onClose={ handleClose } severity={ notification.severity } variant="filled" sx={{ width: '100%' }}>
          { notification.message }
        </S.Alert>
      </S.Snackbar>
    </>
  )
}

export default CategoriasCreate