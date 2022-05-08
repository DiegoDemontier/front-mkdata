import React from 'react';
import GroupTable from '../components/GroupTable';
import FormGroup from '../components/FormGroup';
import FormCustomer from '../components/FormCustomer';

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
      <FormCustomer />
    )
  }
  return (
    <div>
      {grudCustomer()}
      {/* {grudGroup()} */}
    </div>
  );
};
