import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import InfoContext from '../context/infoContext';

export default function FormCustomer() {
  const { data, customers, setCustomers, editCustomer } = React.useContext(InfoContext);
  const [status, setStatus] = React.useState('');
  const [name, setName] = React.useState('');
  const [type, setType] = React.useState('');
  const [group, setGroup] = React.useState('');
  const [doc1, setDoc1] = React.useState({ nameDoc: '', dadoDoc: '' });
  const [doc2, setDoc2] = React.useState({ nameDoc: '', dadoDoc: '' });
  const arrayDoc = [
    {
      nomeDocumento: doc1.nameDoc,
      dadoDocumento: doc1.dadoDoc,
    },
    {
      nomeDocumento: doc2.nameDoc,
      dadoDocumento: doc2.dadoDoc,
    }
  ];
  const setCustomer = {
    nomeCliente: name,
    tipo: type,
    ativo: status,
    grupo: group,
    documentosCliente: arrayDoc.filter(e => e.dadoDocumento !== ''),
  }

  React.useEffect (() => {
    setName(editCustomer.nomeCliente);
    setStatus(editCustomer.ativo);
    setType(editCustomer.tipo);
    setGroup(editCustomer.grupo);
    setDoc1({ nameDoc: editCustomer.documentos[0]?.nomeDocumento || '',
       dadoDoc: editCustomer.documentos[0]?.documentosClientes.dadoDocumento || ''
      });
    setDoc2({ nameDoc: editCustomer.documentos[1]?.nomeDocumento || '',
      dadoDoc: editCustomer.documentos[1]?.documentosClientes.dadoDocumento || ''
     });
  } , [editCustomer]);

  const handleEdit = async () => {
    await axios
      .put(`http://localhost:3001/customers/${editCustomer.id}`, setCustomer)
      .then((res) => res.data)
      .catch((err) => err.response);
    
    const index = customers.findIndex(customer => customer.id === editCustomer.id);
    const newCustomer = { ...customers[index], ...setCustomer, grupo: { nome: group } };
    delete newCustomer.documentosCliente;
    setCustomers(prev => [...prev.slice(0, index), newCustomer, ...prev.slice(index + 1)]);
  }

  const handleSubmit = async () => {
    const customer = await axios
      .post('http://localhost:3001/customers', setCustomer)
      .then((res) => res.data)
      .catch((err) => err.response);
    
    setCustomers(prev => [
      ...prev, { 
        id: customer.id,
        ...setCustomer,
        grupo: { nome: setCustomer.grupo}
      }
    ]);
  };

  return (
    <div className="forms-customer">
      <TextField
        id="outlined-error"
        label="Nome do cliente"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Box sx={{ minWidth: 150 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value={true}>Ativo</MenuItem>
            <MenuItem value={false}>Desativado</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 150 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="tipo"
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value={'PJ'}>Pessoa Jurídica</MenuItem>
            <MenuItem value={'PF'}>Pessoa Física</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 150 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Grupo</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={group}
            label="grupo"
            onChange={(e) => setGroup(e.target.value)}
          >
            {data.map((e) => (
              <MenuItem 
                key={e.id}
                value={e.nome}
              >
                { e.nome }
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TextField 
        id="outlined-basic"
        label={type === 'PJ' ? "CNPJ": "CPF"}
        variant="outlined"
        value={doc1.dadoDoc}
        onChange={(e) => setDoc1({
          nameDoc: type === 'PJ' ? "CNPJ": "CPF",
          dadoDoc: e.target.value,
        })}
      />
      <TextField 
        id="outlined-basic"
        label={type === 'PJ' ? "IE": "RG"}
        variant="outlined"
        value={doc2.dadoDoc}
        onChange={(e) => setDoc2({
          nameDoc: type === 'PJ' ? "IE": "RG",
          dadoDoc: e.target.value,
        })}
      />
      <Button
        variant="outlined"
        size="large"
        onClick={editCustomer.nomeCliente.length > 0 ? handleEdit : handleSubmit}
      >
        {editCustomer.nomeCliente.length > 0 ? 'Salva' : 'Adicionar'}
      </Button>
    </div>
  );
}
