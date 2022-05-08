import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import InfoContext from '../context/infoContext';

export default function FormGroup() {
  const { data, setData, editData } = React.useContext(InfoContext);
  const [status, setStatus] = React.useState('');
  const [nameGroup, setNameGroup] = React.useState('');

  React.useEffect (() => {
    setStatus(editData.status);
    setNameGroup(editData.nameGroup);
  } , [editData]);

  const handleSubmit = async () => {
    const group = await axios
      .post('http://localhost:3001/groups', { nome: nameGroup, ativo: status })
      .then((res) => res.data)
      .catch((err) => err.response);
    setData(prev => [...prev, group]);
  }

  const handleEdit = async () => {
    await axios
      .put(`http://localhost:3001/groups/${editData.id}`, { nome: nameGroup, ativo: status })
      .then((res) => res.data)
      .catch((err) => err.response);
    
    const index = data.findIndex(group => group.id === editData.id);
    const newGroup = { ...data[index], nome: nameGroup, ativo: status };
    setData(prev => [...prev.slice(0, index), newGroup, ...prev.slice(index + 1)]);
  }

  return (
    <div className="forms-group">
      <TextField 
            id="outlined-basic"
            label="Nome do grupo"
            variant="outlined"
            value={nameGroup}
            onChange={(e) => setNameGroup(e.target.value)}
          />
      <Box sx={{ minWidth: 150 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="ativo"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value={true}>Ativo</MenuItem>
            <MenuItem value={false}>Desativado</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Button
        variant="outlined"
        size="large"
        onClick={ 
          editData.nameGroup.length > 0 ? handleEdit : handleSubmit
        }
      >
        {editData.nameGroup.length > 0 ? 'Salva' : 'Adicionar'}
      </Button>
    </div>
  );
}
