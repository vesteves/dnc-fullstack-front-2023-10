'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import * as S from './style'

export const MetasUpdate = ({ userId, metaId }) => {
  const [ descricao, setDescricao ] = useState();
  const [ valor, setValor ] = useState();

  const [ notification, setNotification ] = useState({
    open: false,
    message: '',
    severity: ''
  });

  const onChangeValue = (e) => {
    const { name, value } = e.target
    if (name === 'descricao') setDescricao(value)
    if (name === 'valor') setValor(value)
  }

  useEffect(() => {
    const getMeta = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/metas/${ metaId }`, {
          headers: {
            Authorization: `Bearer ${ localStorage.getItem('token') }`
          }
        })
        setDescricao(response.data.data.descricao)
        setValor(response.data.data.valor)
      }
      catch (error) {
        
      }
    }
    getMeta()
  }, [ metaId ])

  const onSumbmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:8080/metas/${ metaId }`,
        { descricao, valor, user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${ localStorage.getItem('token') }`
          }
        }
      )
      setNotification({
        open: true,
        message: `Meta ${ descricao } atualizada com sucesso!`,
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
        <S.TextField name="descricao" onChange={ onChangeValue } label="Descrição" variant="outlined" color='primary' value={ descricao } fullWidth />
        <S.TextField name="valor" onChange={ onChangeValue } label="Valor" variant="outlined" color='primary' value={ valor } fullWidth />
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

export default MetasUpdate