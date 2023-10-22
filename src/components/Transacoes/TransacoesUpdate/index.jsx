'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import * as S from './style'

export const TransacoesUpdate = ({ userId, transacaoId }) => {
  const [ descricao, setDescricao ] = useState();
  const [ valor, setValor ] = useState();
  const [ tipo, setTipo ] = useState();
  const [ data, setData ] = useState();
  const [ categoria, setCategoria ] = useState({});
  const [ categorias, setCategorias ] = useState([]);

  const [ notification, setNotification ] = useState({
    open: false,
    message: '',
    severity: ''
  });

  const onChangeValue = (e) => {
    const { name, value } = e.target
    if (name === 'descricao') setDescricao(value)
    if (name === 'valor') setValor(value)
    if (name === 'tipo') setTipo(value)
    if (name === 'data') setData(value)
    if (name === 'categoria') setCategoria(value)
  }

  useEffect(() => {
    const getCategorias = async () => {
      const response = await axios.get('http://localhost:8080/categorias', {
        headers: {
          Authorization: `Bearer ${ localStorage.getItem('token') }`
        }
      })
      setCategorias(response.data.data)
      console.log(response.data.data)
    }

    getCategorias()
  }, [])

  useEffect(() => {
    const getTransacao = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/transacoes/${ transacaoId }`, {
          headers: {
            Authorization: `Bearer ${ localStorage.getItem('token') }`
          }
        })
        setDescricao(response.data.data.descricao)
        setValor(response.data.data.valor)
        setTipo(response.data.data.tipo)
        setData(response.data.data.data)
        setCategoria(response.data.data.categoria_id)
      }
      catch (error) {
        
      }
    }
    getTransacao()
  }, [ transacaoId ])

  const onSumbmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:8080/transacoes/${ transacaoId }`,
        { descricao, valor, tipo, data, categoria_id: categoria, user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${ localStorage.getItem('token') }`
          }
        }
      )
      setNotification({
        open: true,
        message: `Transação ${ descricao } atualizada com sucesso!`,
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
        <S.H1>Atualizar Transação</S.H1>
        <S.TextField name="descricao" onChange={ onChangeValue } label="Descrição" variant="outlined" color='primary' value={ descricao } fullWidth />
        <S.TextField name="valor" onChange={ onChangeValue } label="Valor" variant="outlined" color='primary' value={ valor } fullWidth />
        <S.TextField name="tipo" onChange={ onChangeValue } label="Tipo" variant="outlined" color='primary' value={ tipo } fullWidth />
        <S.TextField name="data" onChange={ onChangeValue } label="Data" variant="outlined" color='primary' value={ data } fullWidth />
        { categorias.length && <S.FormControl sx={{ m: 1, minWidth: 120 }}>
          <S.InputLabel id="demo-simple-select-helper-label">Categoria</S.InputLabel>
          <S.Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            name="categoria"
            value={ categoria }
            label="Categoria"
            onChange={ onChangeValue }
          >
            { categorias.map((categoria) => (
              <S.MenuItem key={ categoria.id } value={ categoria.id }>{ categoria.nome }</S.MenuItem>
            )) }
          </S.Select>
        </S.FormControl> }
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

export default TransacoesUpdate