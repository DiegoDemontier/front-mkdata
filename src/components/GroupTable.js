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

export default function GroupTable() {
  const { data, setEditData, setData } = React.useContext(InfoContext);
  const [ toogle, setToogle ] = React.useState(true);

  const handleEdit = (group) => {
    setToogle(prev => !prev);
    if (toogle) {
      setEditData({
        id: group.id,
        status: group.ativo,
        nameGroup: group.nome,
      });
    } else {
      setEditData({
        id: '',
        status: '',
        nameGroup: '',
      });
    }
  }

  const handleDelete = async (id) => {
    await axios
      .delete(`https://crud-mkdata.herokuapp.com/groups/${id}`)
      .then((res) => res.data)
      .catch((err) => err.response);
    
    const getGroup = data.filter(group => group.id !== id);
    setData(getGroup);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Editar</TableCell>
            <TableCell align="right">Deletar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.nome}
              </TableCell>
              <TableCell align="right">{row.ativo ? 'Ativo': 'Desativado'}</TableCell>
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
