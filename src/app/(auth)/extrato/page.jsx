'use client';

import axios from 'axios';
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { CategoriasCreate } from '../../../components/Categorias/CategoriasCreate'
import { MetasCreate } from '../../../components/Metas/MetasCreate'

export const ExtratoPage = () => {
    const [ user, setUser ] = useState({
        id: null
    });
    const [ openModalCategoria, setOpenModalCategoria ] = useState(false);
    const [ openModalMeta, setOpenModalMeta ] = useState(false);
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            window.location.href = '/login';
        }
        axios.get('http://localhost:8080/users/me', {
            headers: {
                'Authorization': `Bearer ${ token }`
            }
        }).then(response => {
            setUser(response.data.data);
        }).catch(_ => {
            window.location.href = '/login';
        })

    }, [])

    return (
        <>
            <div style={{ display: 'flex', gap: '15px' }}>
                <Button variant="contained" color="primary" type="submit">Nova Transação</Button>
                <Button variant="contained" color="primary" type="submit" onClick={() => setOpenModalCategoria(true)}>Nova Categoria</Button>
                <Button variant="contained" color="primary" type="submit" onClick={() => setOpenModalMeta(true)}>Nova Meta</Button>
            </div>
            <CategoriasCreate openModal={openModalCategoria} closeModal={setOpenModalCategoria} />
            <MetasCreate openModal={openModalMeta} closeModal={setOpenModalMeta} />
        </>
    )
}

export default ExtratoPage