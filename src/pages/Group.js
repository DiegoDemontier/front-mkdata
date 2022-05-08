import React from 'react';
import GroupTable from '../components/GroupTable';
import FormGroup from '../components/FormGroup';
import FormCustomer from '../components/FormCustomer';
import CustomerTable from '../components/CustomerTable';

export default function Group() {
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
      {grudCustomer()}
      {/* {grudGroup()} */}
    </div>
  );
};
