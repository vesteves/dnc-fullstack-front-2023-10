'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import * as S from './style'

export const CategoriasUpdate = ({ categoriaId }) => {
  const [ nome, setNome ] = useState();
  const [ userId, setUserId ] = useState();

  const [ notification, setNotification ] = useState({
    open: false,
    message: '',
    severity: ''
  });

  const onChangeValue = (e) => {
    const { name, value } = e.target
    if (name === 'nome') setNome(value)
  }

  useEffect(() => {
    const getCategoria = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:8080/categorias/${ categoriaId }`, {
          headers: {
            Authorization: `Bearer ${ token }`
          }
        })
        setNome(response.data.data.nome)
        setUserId(response.data.data.user_id)
      }
      catch (error) {
        setNotification({
          open: true,
          message: error.response.data.message,
          severity: 'error'
        })
      }
    }

    getCategoria()
  }, [ categoriaId ])

  const onSumbmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.put(`http://localhost:8080/categorias/${ categoriaId }`, { nome, user_id: userId }, {
        headers: {
          Authorization: `Bearer ${ token }`
        }
      })
      setNotification({
        open: true,
        message: `Categoria ${ nome } atualizada com sucesso!`,
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
        <S.H1>Atualizar Categoria</S.H1>
        <S.TextField name="nome" onChange={ onChangeValue } label="Nome" variant="outlined" value={ nome } color='primary' fullWidth />
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

export default CategoriasUpdate