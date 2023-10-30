import { useEffect, useState } from 'react'
import axios from 'axios'
import { compareAsc, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import * as S from './style'

export const TransacoesList = () => {
    const [ transacoes, setTransacoes ] = useState([]);
    const [ transacoesTable, setTransacoesTable ] = useState([]);
    const [ tipo, setTipo ] = useState('Todas');
    const [ anos, setAnos ] = useState(['todos']);
    const [ ano, setAno ] = useState('todos');

    useEffect(() => {
        const getTransacoes = async () => {
            try {
                const token = localStorage.getItem('token')
                const response = await axios.get('http://localhost:8080/transacoes', {
                    headers: {
                    Authorization: `Bearer ${ token }`
                    }
                })
                const anos = response.data.data
                    .map((transacao) => new Date(transacao.data).getFullYear())
                    .filter((ano, index, anos) => anos.indexOf(ano) === index)
                    .sort((a, b) => a - b);
                setAnos([
                    'todos',
                    ...anos
                ])

                setTransacoes(response.data.data)
                setTransacoesTable(response.data.data) 
            }
            catch (error) {
                setNotification({
                    open: true,
                    message: error.response.data.message,
                    severity: 'error'
                })
            }

        }
        getTransacoes()
    }, [])

    useEffect(() => {
        if (ano === 'todos') {
            if (tipo === 'Todas') {
                setTransacoesTable(transacoes)
            }
            if (tipo === 'Receitas') {
                const receitas = transacoes.filter(transacao => transacao.tipo === 'Receita')
                setTransacoesTable(receitas)
            }
            if (tipo === 'Despesas') {
                const despesas = transacoes.filter(transacao => transacao.tipo === 'Despesa')
                setTransacoesTable(despesas)
            }
        }
        else {
            if (tipo === 'Todas') {
                const todas = transacoes.filter(transacao => new Date(transacao.data).getFullYear() === Number(ano))
                setTransacoesTable(todas)
            }
            if (tipo === 'Receitas') {
                const receitas = transacoes.filter(transacao => transacao.tipo === 'Receita' && new Date(transacao.data).getFullYear() === Number(ano))
                setTransacoesTable(receitas)
            }
            if (tipo === 'Despesas') {
                const despesas = transacoes.filter(transacao => transacao.tipo === 'Despesa' && new Date(transacao.data).getFullYear() === Number(ano))
                setTransacoesTable(despesas)
            }
        }
    }, [ tipo, transacoes, ano ])

    const onChangeValue = (e) => {
        const { name, value } = e.target
        if (name === 'ano') setAno(value)
      }

    return (
        <> 
            <div style={{ display: 'flex', gap: '15px', margin: '30px 0' }}>
                <div onClick={() => setTipo('Todas')} >Todas transações</div>
                <div onClick={() => setTipo('Receitas')}>Receitas</div>
                <div onClick={() => setTipo('Despesas')}>Despesas</div>
            </div>
            <S.FormControl >
                <S.InputLabel id="ano_select">Anos</S.InputLabel>
                <S.Select
                    labelId="anos"
                    id="ano_select"
                    name="ano"
                    label="Anos"
                    value={ ano }
                    onChange={ onChangeValue }
                >
                    { anos.map(anoDisponivel => <S.MenuItem key={ anoDisponivel } value={ anoDisponivel }>{ anoDisponivel }</S.MenuItem>) }
                </S.Select>
            </S.FormControl>
            <S.TableContainer component={ S.Paper }>
                <S.Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <S.TableHead>
                    <S.TableRow>
                        <S.TableCell>Descrição</S.TableCell>
                        <S.TableCell align="right">Transação</S.TableCell>
                        <S.TableCell align="right">Data</S.TableCell>
                        <S.TableCell align="right">Situação</S.TableCell>
                        <S.TableCell align="right">Valor</S.TableCell>
                    </S.TableRow>
                    </S.TableHead>
                    <S.TableBody>
                    {transacoesTable.map((transacao) => (
                        <S.TableRow
                        key={transacao.descricao}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <S.TableCell component="th" scope="row">
                            {transacao.descricao}
                        </S.TableCell>
                        <S.TableCell align="right">{ transacao.tipo }</S.TableCell>
                        <S.TableCell align="right">{ format(new Date(transacao.data), 'd MMM, yyyy', { locale: ptBR }) }</S.TableCell>
                        <S.TableCell align="right">{ compareAsc(new Date(), new Date(transacao.data)) === 1 ? 'Realizada' : 'Planejada' }</S.TableCell>
                        <S.TableCell align="right">R$ { transacao.valor / 100 }</S.TableCell>
                        </S.TableRow>
                    ))}
                    </S.TableBody>
                </S.Table>
            </S.TableContainer>
        </>        
    )
}

export default TransacoesList