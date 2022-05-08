import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InfoContext from '../context/infoContext';
import { Button } from '@mui/material';
import axios from 'axios';

export default function CustomerTable() {
  const { customers, setEditCustomer, editCustomer } = React.useContext(InfoContext);
  const [ toogle, setToogle ] = React.useState(true);

  const handleEdit = (group) => {
    setToogle(prev => !prev);
    if (toogle) {
      setEditCustomer({
        id: group.id,
        nomeCliente: group.nomeCliente,
        tipo: group.tipo,
        ativo: group.ativo,
        grupo: group.grupo.nome,
        documentos: group.documentos,
      });
    } else {
      setEditCustomer({
        id: '',
        nomeCliente: '',
        tipo: '',
        ativo: '',
        grupo: '',
        documentos: [],
      });
    }
  }

  const handleDelete = async (id) => {
    /* await axios
      .delete(`http://localhost:3001/customer/${id}`)
      .then((res) => res.data)
      .catch((err) => err.response);
    
    const index = data.filter(group => group.id !== id);
    setData(index); */
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Tipo</TableCell>
            <TableCell align="right">Grupo</TableCell>
            <TableCell align="right">Editar</TableCell>
            <TableCell align="right">Deletar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.nomeCliente}
              </TableCell>
              <TableCell align="right">{row.ativo ? 'Ativo': 'Desativado'}</TableCell>
              <TableCell align="right">{row.tipo}</TableCell>
              <TableCell align="right">{row.grupo.nome}</TableCell>
              <TableCell align="right">
              <Button
                variant="outlined"
                size="small"
                onClick={ () => handleEdit(row) }
              >
                Editar
              </Button>
              </TableCell>
              <TableCell align="right">
              <Button
                variant="outlined"
                size="small"
                onClick={ () => handleDelete(row.id) }
              >
                Deletar
              </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
