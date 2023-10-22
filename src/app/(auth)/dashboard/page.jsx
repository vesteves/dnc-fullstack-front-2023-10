'use client';

import axios from 'axios';
import { useEffect, useState } from "react"; 
// import { CategoriasCreate } from "../../../components/Categorias/CategoriasCreate"
// import { CategoriasUpdate } from "../../../components/Categorias/CategoriasUpdate"
// import { MetasCreate } from "../../../components/Metas/MetasCreate"
// import { MetasUpdate } from "../../../components/Metas/MetasUpdate"
// import { TransacoesCreate } from "../../../components/Transacoes/TransacoesCreate"
import { TransacoesUpdate } from "../../../components/Transacoes/TransacoesUpdate"

export const DashboardPage = () => {
  const [ user, setUser ] = useState({
    id: null
  });

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
    <div>
      <h1>Dashboard</h1>
      {/* <CategoriasCreate userId={ user.id } /> */}
      {/* <CategoriasUpdate userId={ user.id } categoriaId={ 1 } /> */}
      {/* <MetasCreate userId={ user.id } /> */}
      {/* <MetasUpdate userId={ user.id } metaId={ 2 } /> */}
      {/* <TransacoesCreate userId={ user.id } /> */}
      <TransacoesUpdate userId={ user.id } transacaoId={ 4 } />
    </div>
  );
}

export default DashboardPage;