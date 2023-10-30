'use client';

import axios from 'axios';
import { useEffect, useState } from "react";
import { Chart } from '../../../components/Chart';

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
      <div style={{ marginLeft: '80px' }}>
        <Chart />
      </div>
    </div>
  );
}

export default DashboardPage;