import React from 'react';
import Table from '../../ListView';

const Menu1 = () => {
  const api = 'posts';
  return (
    <>
      <Table api={api} />
    </>
  );
};

export default Menu1;
