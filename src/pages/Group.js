import axios from 'axios';
import React from 'react';
import DenseTable from '../components/DenseTable';
import FormGroup from '../components/FormGroup';

export default function Group() {
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
  } , []);

  return (
    <div className="group">
      <FormGroup />
      <DenseTable
        data={data}
      />
    </div>
  );
};
