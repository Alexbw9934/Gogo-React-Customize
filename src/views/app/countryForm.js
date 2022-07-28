import React, { useEffect } from 'react';
import {Row} from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
// import { Link } from 'react-router-dom';
import { Form } from "react-formio"
import _ from 'lodash';
import http from '../../baseURL';


const JsonData ={
    "display": "form",
    "components": [
      {
        "label": "Id",
        "tableView": true,
        "validate": {
          "required": true
        },
        "key": "id",
        "type": "textfield",
        "input": true
      },
      {
        "label": "Name",
        "tableView": true,
        "validate": {
          "required": true
        },
        "key": "name",
        "type": "textfield",
        "input": true
      },
      {
        "label": "Country Code",
        "tableView": true,
        "validate": {
          "required": true
        },
        "key": "countryCode",
        "type": "textfield",
        "input": true
      },
      {
        "label": "Status",
        "widget": "choicesjs",
        "tableView": true,
        "data": {
          "values": [
            {
              "label": "Active",
              "value": "0"
            },
            {
              "label": "In Active",
              "value": "1"
            }
          ]
        },
        "validate": {
          "required": true
        },
        "key": "status",
        "type": "select",
        "input": true
      },
      {
        "label": "Submit",
        "tableView": false,
        "key": "submit",
        "type": "button",
        "input": true,
        "saveOnEnter": false
      }
    ]
  }

const View = ({ match }) => {
  console.log(match, 'matchurl');
  
  useEffect(() => {
    http
      .get(`/Views`)
      .then((response) => {
        console.log(response.data);
        // setDetailList(response.data, 'travel');
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onclickAction =(e)=>{
      const data ={..._.get(e,'data')}
      delete data.submit
    http
        .post('/Country', data)
        .then((response) => {
          console.log('CountryCountry', response.data);
          
          
        })
        .catch((error) => {
          console.log(error);
        });
  }
  return (
     <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.country-create" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
      <Colxx xxs="12" className="mb-4">
    <Form
    
    onSubmit ={(e)=>onclickAction(e)}
    // onCustomEvent={(e)=>onclickAction(e)}
      src={JsonData} />
</Colxx>
      </Row>
    </>
  );
};

export default View;
