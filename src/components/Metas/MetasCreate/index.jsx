'use client'
import { forwardRef, useEffect, useState } from 'react'
import axios from 'axios'
import * as S from './style'

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { NumericFormat } from 'react-number-format';

const NumericFormatCustom = forwardRef(function NumericFormatCustom(
  props,
  ref,
) {
  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      valueIsNumericString
      prefix="R$ "
    />
  );
});

export const MetasCreate = ({ openModal, closeModal }) => {
  const [ descricao, setDescricao ] = useState();
  const [ valor, setValor ] = useState();
  const [ dataMeta, setDataMeta ] = useState();

  const [ notification, setNotification ] = useState({
    open: false,
    message: '',
    severity: ''
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if(openModal) {
      setOpen(true);
    }
  }, [openModal])

  const handleCloseModal = () => {
    setOpen(false);
    closeModal(false);
  };

  const onChangeValue = (e) => {
    const { name, value } = e.target
    if (name === 'descricao') setDescricao(value)
    if (name === 'valor') setValor(value)
    if (name === 'dataMeta') setDataMeta(value)
  }

  const onSumbmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:8080/metas', { descricao, valor: valor * 100, data: dataMeta }, {
        headers: {
          Authorization: `Bearer ${ token }`
        }
      })
      setNotification({
        open: true,
        message: `Meta ${ descricao } criada com sucesso!`,
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
        <DialogTitle>Nova Meta</DialogTitle>
        <DialogContent>
          <S.Form onSubmit={ onSumbmit }>
          <S.TextField name="descricao" onChange={ onChangeValue } label="Descrição" variant="outlined" color='primary' fullWidth />
          <S.TextField name="valor" onChange={ onChangeValue } label="Valor" variant="outlined" color='primary' fullWidth />
          <S.TextField
            label="Valor"
            name="valor"
            onChange={ onChangeValue }
            id="formatted-numberformat-input"
            InputProps={{
              inputComponent: NumericFormatCustom,
            }}
            variant="outlined"
            fullWidth
          />
          <S.TextField name="dataMeta" onChange={ onChangeValue } label="Data" variant="outlined" color='primary' fullWidth />
          </S.Form>
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
          <S.Button variant="contained" color="success" type="submit" onClick={onSumbmit}>Salvar</S.Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default MetasCreate