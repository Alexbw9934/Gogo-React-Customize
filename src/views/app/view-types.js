import React, { useEffect, useState } from 'react';
import { Card, CardBody, Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import {  Table, Button, Form, Input } from 'antd';
import _ from 'lodash';
import http from '../../baseURL';
import './style.css'

const View = ({ match }) => {
  console.log(match, 'matchurl');
  const [form] = Form.useForm();

//   const [detailList, setDetailList] = useState([]);
  const [detailTableList, setDetailTableList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);
  const [editId, seteditId] = useState('');
  
 

  const setTableData =(data)=>{
   const final = []
    _.map(_.reverse(data),(value,index)=>{
    
        final.push({
            sr_no:index+1,
            id:_.get(value,'id'),
            name:_.get(value,'name'),
            type:_.get(value,'viewTypeId'),
        })
    })
    setDetailTableList(final)
}

const fechList =()=>{
    http
    .get(`/ViewType`)
    .then((response) => {
      console.log('response that', response);
      setTableData(response.data)
      setPageLoading(false)
    })
    .catch((error) => {
      console.log(error);
      setPageLoading(false)
    });
  }
  useEffect(() => {
    setPageLoading(true)
    fechList()
  }, []);

  



  const submitHandle = (data) => {
    if (editId) {
      const id = editId
      http
        .put(`/ViewType/${id}`, data)
        .then((response) => {
          console.log(response.data);
          form.resetFields()
          fechList()
          seteditId('')
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      http
        .post('/ViewType', data)
        .then((response) => {
          console.log(response.data);
          form.resetFields()
          fechList()
          seteditId('')
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const renderAction =(value,data)=>{
      console.log('itemsitems',value,data);
    return  <div><Button type='primary' onClick={()=>{seteditId(_.get(data,'id')); form.setFieldsValue({
        ...data
    })}} className="btn-lg mr-3">Edit</Button> 
    {/* <Button type='default'  className="btn-lg">Delete</Button> */}
     </div>
}
  const columns = [
    {
      title: 'S. No.',
      dataIndex: 'sr_no',
      key: 'sr_no',
    },
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
        title: 'Action',
        dataIndex: 'x',
        key: 'x',
        render: (items,data) =>renderAction(items,data),
      },
     
  ];
  
  const onReset = () => {
    form.resetFields();
  };
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.view-type" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
            <Card>
            <CardBody className="mb-4">

<Form layout='vertical' form={form} name="control-hooks" onFinish={submitHandle}>
<Form.Item name="id" label="Id" rules={[{ required: true }]}>
<Input style={{width:'250px'}}/>
</Form.Item>
<Form.Item name="name" label="Name" rules={[{ required: true }]}>
<Input style={{width:'250px'}} />
</Form.Item>
<Form.Item style={{alignItems:'center',display:'flex'}}>
<Button type="primary" htmlType="submit">
{editId?'Update': 'Add'}
</Button>
<Button style={{marginLeft:43}} htmlType="button" onClick={onReset}>
Reset
</Button>

</Form.Item>
</Form>


</CardBody>
            </Card>
          <Card className="mb-4">
        
            <CardBody>

              <Table
              rowClassName="row-style"
              onRow={(record) => {
                return {
                  onClick: () => {seteditId(_.get(record,'id'))}, // click row
                };
              }}
              loading={pageLoading}  dataSource={detailTableList} columns={columns} pagination={{
                 defaultCurrent:1,
                 current:page,
                 style:{marginBottom:'23px',display:'flex',alignItems:'center'},
                 
                 position:['bottomCenter'],
                 pageSize:5,
                 hideOnSinglePage:true,
                 onChange:(page1) => setPage(page1),
                 
              }} />;
              
             
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default View;
