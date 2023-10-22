'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import * as S from './style'

export const TransacoesCreate = ({ userId }) => {
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

  const onSumbmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8080/transacoes',
        { descricao, valor, tipo, data, categoria_id: categoria, user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${ localStorage.getItem('token') }`
          }
        }
      )
      setNotification({
        open: true,
        message: `Transação ${ descricao } criada com sucesso!`,
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
        <S.H1>Criar Transação</S.H1>
        <S.TextField name="descricao" onChange={ onChangeValue } label="Descrição" variant="outlined" color='primary' fullWidth />
        <S.TextField name="valor" onChange={ onChangeValue } label="Valor" variant="outlined" color='primary' fullWidth />
        <S.TextField name="tipo" onChange={ onChangeValue } label="Tipo" variant="outlined" color='primary' fullWidth />
        <S.TextField name="data" onChange={ onChangeValue } label="Data" variant="outlined" color='primary' fullWidth />
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

export default TransacoesCreate