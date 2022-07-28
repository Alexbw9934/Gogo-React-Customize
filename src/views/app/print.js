import React from "react";
import Pdf from "react-to-pdf";
import _ from 'lodash';
import './style.css'

const ref = React.createRef();

const App = (props)=> {

    
  return (
    <div  >
      <Pdf  targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => <button type="button" onClick={toPdf}>Download</button>}
      </Pdf>
     
      <div className="row" ref={ref}>
      <div className="col-12">
      <div    style={{display:'flex',flexDirection:'column'}}>
      <div style={{display:'flex',flexDirection:'column',marginLeft:'45px',fontSize:30}}>
          <h1 style={{fontSize:30}}>First Name</h1><h2 style={{fontSize:25,color:'red'}}>{_.get(props,'formData.firstName')}</h2>  </div>
      <div style={{display:'flex',flexDirection:'column',marginLeft:'45px',fontSize:30}}>
       <h1 style={{fontSize:30}}>Last Name</h1><h2 style={{fontSize:25,color:'red'}}>{_.get(props,'formData.lastName')}</h2>  </div>
      <div style={{display:'flex',flexDirection:'column',marginLeft:'45px',fontSize:30}}>
       <h1 style={{fontSize:30}}>Age</h1><h2 style={{fontSize:25,color:'red'}}>{_.get(props,'formData.age')}</h2>  </div>
      </div></div>
      </div>
    </div>
  );
}

export default App



