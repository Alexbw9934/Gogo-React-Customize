import React from "react";
// import Pdf from "react-to-pdf";
// import _ from 'lodash';
// import { Button } from "reactstrap";
// import Template1 from '../../views/app/Template-html-1'
// import Template2 from '../../views/app/Template-html-2'
import { jsPDF as JSPdf } from "jspdf";
// import $ from "jquery";
import { renderToString } from "react-dom/server";




// const ref = React.createRef();

const App = (props)=> {
console.log('Print js',props);




 const Prints = () =>{
  return <div style={{display:'grid',marginLeft:10}} id="htmlContent">
  <div style={{color: '#0094ff',fontSize:'15px'}}>Hello</div>  
  <div style={{fontSize:'9px'}}>About this Code:</div>  
  <p style={{fontSize:'6px'}}>Demo of how to convert and Download HTML page to PDF file with CSS, using JavaScript and jQuery.</p>  
  <table style={{width:'55%',fontSize:'10px'}}>  
    <tbody>  
      <tr>  
        <th>Person</th>  
        <th>Contact</th>  
        <th>Country</th>  
      </tr>  
      <tr>  
        <td>John</td>  
        <td>+2345678910</td>  
        <td>Germany</td>  
      </tr>  
      <tr>  
        <td>Jacob</td>  
        <td>+1234567890</td>  
        <td>Mexico</td>  
      </tr>  
      <tr>  
        <td>Eleven</td>  
        <td>+91234567802</td>  
        <td>Austria</td>  
      </tr>  
    </tbody>  
  </table>    
</div>
 }

const generatePdf = () => {
  const doc = new JSPdf('p', 'mm', 'a4')
  const htmlToConvert= renderToString(<Prints />)
  doc.html(htmlToConvert, {
     callback:(doc1)=> {
               doc1.save();
               }
      });
  }

// const whichTemplate = () => {

//   if(_.get(props,'location.state.type')==="studentForm"){

// return <Template1 formRef ={ref}  formData={_.get(props,'location.state.detail')} />
  
// } 

//  return <Template2 formRef ={ref}  formData={_.get(props,'location.state.detail')} />
  
  
// }

  return (<>
 
  <div id="htmlContent">
    <h2 style={{color: '#0094ff'}}>Hello</h2>  
    <h3>About this Code:</h3>  
    <p>Demo of how to convert and Download HTML page to PDF file with CSS, using JavaScript and jQuery.</p>  
    <table>  
      <tbody>  
        <tr>  
          <th>Person</th>  
          <th>Contact</th>  
          <th>Country</th>  
        </tr>  
        <tr>  
          <td>John</td>  
          <td>+2345678910</td>  
          <td>Germany</td>  
        </tr>  
        <tr>  
          <td>Jacob</td>  
          <td>+1234567890</td>  
          <td>Mexico</td>  
        </tr>  
        <tr>  
          <td>Eleven</td>  
          <td>+91234567802</td>  
          <td>Austria</td>  
        </tr>  
      </tbody>  
    </table>    
  </div>
  <div id="editor" />
  <center>
    <p>
      <button type="button" onClick={()=>generatePdf()} id="generatePDF">generate PDF</button>
    </p>
   Ref:<a href="https://phpcoder.tech">phpcoder.tech</a>
  </center></>
  );
}

export default App



