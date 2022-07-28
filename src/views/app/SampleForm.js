import React, { useEffect } from 'react';
import {Row} from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
// import { Link } from 'react-router-dom';
import { Form } from "react-formio"
// import _ from 'lodash';
import http from '../../baseURL';


const JsonData ={
  "display": "form",
  "components": [
    {
      "label": "Tripe Name",
      "tableView": true,
      "key": "name",
      "type": "textfield",
      "input": true
    },
    {
      "label": "Date",
      "tableView": false,
      "datePicker": {
        "disableWeekends": false,
        "disableWeekdays": false
      },
      "enableMinDateInput": false,
      "enableMaxDateInput": false,
      "key": "date",
      "type": "datetime",
      "input": true,
      "widget": {
        "type": "calendar",
        "displayInTimezone": "viewer",
        "locale": "en",
        "useLocaleSettings": false,
        "allowInput": true,
        "mode": "single",
        "enableTime": true,
        "noCalendar": false,
        "format": "yyyy-MM-dd hh:mm a",
        "hourIncrement": 1,
        "minuteIncrement": 1,
        "time_24hr": false,
        "minDate": null,
        "disableWeekends": false,
        "disableWeekdays": false,
        "maxDate": null
      }
    },
    {
      "label": "Other Details",
      "tableView": true,
      "key": "otherDetails",
      "type": "textfield",
      "input": true
    },
    {
      "label": "Submit",
      "action": "event",
      "showValidations": false,
      "tableView": false,
      "key": "submit",
      "type": "button",
      "event": "tripForm",
      "input": true
    }
  ]
}

const View = ({ match,history }) => {
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

  const onclickAction =(e,type)=>{
    console.log('e,typee,type',e,type);
    history.push({
      pathname: '/app/pdf-controller',
      search: '',
      state: { detail: e.data, type: e.type }
    })
  }
  return (
     <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="Sample Form" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
      <Colxx xxs="12" className="mb-4">
    <Form
    
    
    onCustomEvent={(e)=>onclickAction(e)}
    form={{
      studentForm:(customEvent) => {
        console.log('customEvent',customEvent)
        
      },...JsonData}}
    //  studentForm={(e)=>onclickAction(e,'template1')}
    //  tripForm={(e)=>onclickAction(e,'template2')}
      src={JsonData} />
</Colxx>
      </Row>
    </>
  );
};

export default View;
