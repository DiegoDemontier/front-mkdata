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
  const { data, setData, editData } = React.useContext(InfoContext);
  const [status, setStatus] = React.useState('');
  const [name, setName] = React.useState('');
  const [type, setType] = React.useState('');
  const [group, setGroup] = React.useState('');
  const [doc1, setDoc1] = React.useState({ nameDoc: '', dadoDoc: '' });
  const [doc2, setDoc2] = React.useState({ nameDoc: '', dadoDoc: '' });

  const field = (label, value, setValue) => {
    return (
      <TextField 
        id="outlined-basic"
        label={label}
        variant="outlined"
        value={value.dadoDoc}
        onChange={(e) => setValue({
          nameDoc: label,
          dadoDoc: e.target.value,
        })}
      />
    )
  }

  const handleClick = () => {
    const arrayDoc = [
      {
        nomeDocumento: doc1.nameDoc,
        dadoDocumento: doc1.dadoDoc,
      },
      {
        nomeDocumento: doc2.nameDoc,
        dadoDocumento: doc2.dadoDoc,
      }
    ]

    const setData = {
      nomeCliente: name,
      tipo: type,
      ativo: status,
      grupo: group,
      documentosCliente: arrayDoc.filter(e => e.dadoDocumento !== ''),
    }
    console.log(name && setData);
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
            <MenuItem value={'pj'}>Pessoa Jurídica</MenuItem>
            <MenuItem value={'pf'}>Pessoa Física</MenuItem>
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
      {type === 'pj' ? field("CNPJ", doc1.dadoDoc, setDoc1) : field("CPF", doc1.dadoDoc, setDoc1)}
      {type === 'pj' ? field("IE", doc2.dadoDoc, setDoc2) : field("RG", doc2.dadoDoc, setDoc2)}
      <Button
        variant="outlined"
        size="large"
        onClick={handleClick}
      >
        Salvar
      </Button>
    </div>
  );
}
