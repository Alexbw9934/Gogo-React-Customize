import React from "react";
import _ from 'lodash';
import './style.css'

const App = (props)=> {

    
  return (
    <div className="row" ref={_.get(props,'formRef')}>
   
    <div className="w3-container" style={{height:'197px'}}>
      <h1>Admission Form</h1>
      <table className="w3-table">
        <tr>
          <th>Class</th>
          <th>RollNo</th>
          <th>Other Details</th>
        </tr>
        <tr style={{height:'96%'}}>
          <td>{_.get(props,'formData.name')}</td>
          <td>{_.get(props,'formData.rollNo')}</td>
          <td>{_.get(props,'formData.otherDetails')}</td>
        </tr>
        
      </table>
    </div>
    
          </div>
    
    
  );
}

export default App



