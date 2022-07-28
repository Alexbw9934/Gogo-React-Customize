import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    CardBody,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
} from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { useLocation, useParams } from 'react-router-dom';
import Select from 'react-select';
import _ from 'lodash'
import { FormBuilder, Components } from "react-formio"
import http from '../../baseURL';
import components from "./form-builder-fields";
import './form-builder-fields/style.css'

// const selectData = [
//     { label: 'Active', value: 'active', key: 0 },
//     { label: 'In Active', value: 'inActive', key: 1 },
//   ];

const ViewForm = (props) => {
  const {match} = props
  console.log('rposdsd',localStorage.getItem('arch'));
  const location = useLocation();
  const [ViewResponse, setViewResponse] = useState({})
  const [ViewDetails, setViewDetails] = useState({})
//   const [architecture, setArchitecture] = useState({})
const { id } = useParams();
const useQuery = ()=> {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const query = useQuery();

  const [data, setData] = useState({
    name: '',
    viewTypeId: 0,
    architecture: '',
    active: true,
  });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleChange = (e) => {
   
    console.log(e.target);
    setData({ ...data, [e.target.name]: e.target.value });

    const jsonarse = JSON.parse(localStorage.getItem('arch'))
    console.log('json_parse',jsonarse);
    if(localStorage.getItem('arch')){
      setViewDetails({architecture: localStorage.getItem('arch')})
    }
    
  };
  const submitHandle = (e) => {
    e.preventDefault();

    console.log('e',{...data,architectures:localStorage.getItem('arch')},location.state);
    if (query.get('id')) {
      // const id = location.state.from;
      http
        .put(`/Views/${query.get('id')}`, {...data,architecture:localStorage.getItem('arch')})
        .then((response) => {
          console.log(response.data);
          setData({
            name: '',
    viewTypeId: 0,
    architecture: '',
    active: true,
          });
          props.history.push('/app/view-table')
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      http
        .post('/Views', {...data,architecture:localStorage.getItem('arch')})
        .then((response) => {
          console.log(response.data);
          setData({
            name: '',
    viewTypeId: 0,
    architecture: '',
    active: true,
          });
          props.history.push('/app/view-table')

        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const viewSelect =(val)=>{
    http
    .get(`/Views`)
    .then((response) => {
      const datas =[]
        console.log('Views', response.data);
if(_.size(_.get(response,'data'))>0){
    _.map(_.get(response,'data',[]),(value)=>{
        datas.push({
            label:_.get(value,'name'),
            value:_.get(value,'id'),
        })
        if(_.get(value,'viewTypeId') ===val){
          console.log('filtersdsd',{
            label:_.get(value,'name'),
            value:_.get(value,'id'),
        });
          setSelectedOptions([{
            label:_.get(value,'name'),
            value:_.get(value,'id'),
        }])
        }
    })
    setViewResponse(datas)
    

}

      
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    
    console.log("its id come",id,query.get('id'));
    if (query.get('id')) {
     
      http
        .get(`/Views/${query.get('id')}`)
        .then((response) => {
          console.log('view aapi resmpis', response.data);
          setViewDetails(response.data)
          setData(response.data)
          localStorage.setItem('arch',_.get(response,'data.architecture'))
          setSelectedOptions(_.get(response,'data.viewTypeId'))
          viewSelect(_.get(response,'data.viewTypeId'))
        })
        .catch((error) => {
          console.log(error);
        });
    }else{
      viewSelect()
    }

    
  }, []);

//   const callToForm=()=>{
//     const localArch = localStorage.getItem('arch')
//     console.log('localArchlocalArchlocalArch',localArch);
//     if(_.get(ViewDetails,'architecture')){
// return JSON.parse(_.get(ViewDetails,'architecture'))
//     } 
//      if(localArch){
//       return JSON.parse(localArch)
//     }
    
//     return { display: "form" , components: [] }
    
    
//   }
  

  Components.setComponents(components);

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.form-builder" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
          
            <CardBody>
            <Form onSubmit={submitHandle}>
                <Row style={{marginBottom:'23px',borderBottom:'4px solid grey'}}> 
                  <Colxx xxs="4" className="mb-4">
                    <FormGroup>
                      <Label>Name </Label>
                      <Input
                        type="text"
                        name="name"
                        value={data.name || ''}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="4" className="mb-4">
                    <FormGroup>
                      <Label>View Type Id </Label>
                      <Select
                        value={selectedOptions}
                        onChange={(val) => setSelectedOptions(val)}
                        options={ViewResponse}
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="4" className="mb-4">
                <FormGroup className="text-center">
                  <Button color="primary" className="btn-lg mt-3" type="submit">
                    Save
                  </Button>
                </FormGroup></Colxx>
                </Row>
                
              </Form>
            <FormBuilder
                    onChange={schema => localStorage.setItem('arch',JSON.stringify(schema))}
            
                    form={_.get(ViewDetails,'architecture')? JSON.parse(_.get(ViewDetails,'architecture')): { display: "form" , components: [] }}
        options={{
            noDefaultSubmitButton:true,
            builder: {
                basic: {
                  components: {
                    toggleCustomComp: true
                  }
                },
                advanced: false
              }
        }}
      />
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default ViewForm;
