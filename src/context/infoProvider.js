import axios from 'axios';
import React from 'react';
import InfoContext from './infoContext';

export default function InfoProvider({ children }) {
  const [data, setData] = React.useState([]);
  const [customers, setCustomers] = React.useState([]);
  const [editCustomer, setEditCustomer] = React.useState({
    id: '',
    nomeCliente: '',
    tipo: '',
    ativo: '',
    grupo: '',
    documentos: [],
  });
  const [editData, setEditData] = React.useState({
    id: '',
    status: '',
    nameGroup: '',
  });

  React.useEffect (() => {
    const requestGroups = async () => {
      const request = await axios
        .get(`http://localhost:3001/groups`)
        .then((res) => res.data)
        .catch((err) => (err) => err.response);
        setData(request);
    };
    requestGroups();
  } , []);

  React.useEffect (() => {
    const requestGroups = async () => {
      const request = await axios
        .get(`http://localhost:3001/customers`)
        .then((res) => res.data)
        .catch((err) => (err) => err.response);
        setCustomers(request);
    };
    requestGroups();
  } , []);

  const contextValues = {
    data,
    setData,
    editData,
    setEditData,
    customers,
    setCustomers,
    setEditCustomer,
    editCustomer,
  };

  return (
    <InfoContext.Provider value={ contextValues }>
      { children }
    </InfoContext.Provider>
  );
}