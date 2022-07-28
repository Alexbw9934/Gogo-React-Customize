import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-blue.css';
import { Button } from 'reactstrap';

const Table = ({ location }) => {
  const [column, setColumn] = useState([]);
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState([]);
  const api = location.state.from;
  useEffect(() => {
    fetch(`https://94.130.236.116:10972${api}`).then((res) => res.json()).then((resp) => {
        setData(resp);
        setMsg(true);
        if (resp.length>0 && msg) {
          const obj = resp[0];
          const values = Object.keys(obj);
          const columnDefs = [];
          values.map((v) =>
            columnDefs.push({ field: v, filter: 'agNumberColumnFilter' })
          );
          setColumn(columnDefs);
        }
      })
      .catch(() => {
        console.log('network');
      });
      setColumn([]);
  }, [api]);
  
  
 

  return (
    <div className='card-body' style={{ backgroundColor: "#fff", borderRadius: ".75rem", boxShadow: "0 1px 15px rgb(0 0 0 / 4%)" }}>
      <div className='card-title'>
        <Button className='mb-3'>Add New</Button>
      </div>
      <div className=".ag-theme-alpine" style={{ margin: "auto", border: "none" }}>
        <AgGridReact rowData={data} enableCellChangeFlash="true" columnDefs={column} onGridReady={data} rowHeight={50} headerHeight={50}/>
      </div>
    </div>
  );
};

export default Table;
