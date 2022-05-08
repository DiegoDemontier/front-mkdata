import axios from 'axios';
import React from 'react';
import InfoContext from './infoContext';

export default function InfoProvider({ children }) {
  const [data, setData] = React.useState([]);

  React.useEffect (() => {
    const requestStudent = async () => {
      const request = await axios
        .get(`http://localhost:3001/groups`)
        .then((res) => res.data)
        .catch((err) => {
          return [];
        });
        setData(request);
    };
  requestStudent();
  } , [data]);

  const contextValues = {
    data,
    setData,
  };

  return (
    <InfoContext.Provider value={ contextValues }>
      { children }
    </InfoContext.Provider>
  );
}