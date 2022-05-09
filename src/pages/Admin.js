import React from 'react';
import GroupTable from '../components/GroupTable';
import FormGroup from '../components/FormGroup';
import FormCustomer from '../components/FormCustomer';
import CustomerTable from '../components/CustomerTable';
import Header from '../components/Header';

export default function Admin() {
  const [toogle, setToogle] = React.useState(false);

  const grudGroup = () => {
    return (
      <div className="group">
        <FormGroup />
        <GroupTable />
      </div>
    )
  }

  const grudCustomer = () => {
    return (
      <div className="customer">
        <FormCustomer />
        <CustomerTable />
      </div>
    )
  }
  return (
    <div>
      <Header
        title={toogle ? "Tabela de Grupos": "Tabela de Clientes"}
        subTitles={toogle ? "Ir tabela de Clientes": "Ir tabela de Grupos"}
        setToogle={setToogle}
      />
      {toogle ? grudGroup() : grudCustomer()}
    </div>
  );
};
