'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import * as S from './style'

export const MetasUpdate = ({ metaId }) => {
  const [ descricao, setDescricao ] = useState();
  const [ valor, setValor ] = useState();
  const [ dataMeta, setDataMeta ] = useState();
  const [ userId, setUserId ] = useState();

  const [ notification, setNotification ] = useState({
    open: false,
    message: '',
    severity: ''
  });

  const onChangeValue = (e) => {
    const { name, value } = e.target
    if (name === 'descricao') setDescricao(value)
    if (name === 'valor') setValor(value)
    if (name === 'dataMeta') setDataMeta(value)
  }

  useEffect(() => {
    const getMeta = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`http://localhost:8080/metas/${ metaId }`, {
          headers: {
            Authorization: `Bearer ${ token }`
          }
        })
        setDescricao(response.data.data.descricao)
        setValor(response.data.data.valor)
        setDataMeta(response.data.data.data)
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

    getMeta()
  }, [ metaId ])

  const onSumbmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.put(`http://localhost:8080/metas/${ metaId }`, {
        descricao,
        valor,
        data: dataMeta,
        user_id: userId
      }, {
        headers: {
          Authorization: `Bearer ${ token }`
        }
      })
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
        <S.H1>Atualizar Meta</S.H1>
        <S.TextField name="descricao" onChange={ onChangeValue } label="Descrição" variant="outlined" value={ descricao } color='primary' fullWidth />
        <S.TextField name="valor" onChange={ onChangeValue } label="Valor" variant="outlined" value={ valor } color='primary' fullWidth />
        <S.TextField name="dataMeta" onChange={ onChangeValue } label="Data" variant="outlined" value={ dataMeta } color='primary' fullWidth />
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