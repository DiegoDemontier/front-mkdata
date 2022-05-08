import axios from 'axios';
import React from 'react';
import InfoContext from './infoContext';

export default function InfoProvider({ children }) {
  const [data, setData] = React.useState([]);
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

  const contextValues = {
    data,
    setData,
    editData,
    setEditData,
  };

  return (
    <InfoContext.Provider value={ contextValues }>
      { children }
    </InfoContext.Provider>
  );
}