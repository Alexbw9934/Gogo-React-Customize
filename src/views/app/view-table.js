import React, { useEffect, useState } from 'react';
import { CardTitle, Card, CardBody, Row,Button } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { Link } from 'react-router-dom';
import {  Table } from 'antd';
import _ from 'lodash';
import http from '../../baseURL';
import './style.css'

const View = ({ match,history }) => {
  console.log(match, 'matchurl');
//   const [detailList, setDetailList] = useState([]);
  const [detailTableList, setDetailTableList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);
  

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
  useEffect(() => {
    setPageLoading(true)
    http
      .get(`/Views`)
      .then((response) => {
        console.log('response that', response);
        setTableData(response.data)
        setPageLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setPageLoading(false)
      });
  }, []);



 
  
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
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
     
  ];
  
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.parent-menu" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <CardTitle>
                <Link to="/app/form-builder">
                  <Button>Add new</Button>
                </Link>
              </CardTitle>

              <Table
              rowClassName="row-style"
              onRow={(record) => {
                return {
                  onClick: () => {history.push(`/app/form-builder?id=${_.get(record,'id')}`)}, // click row
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
