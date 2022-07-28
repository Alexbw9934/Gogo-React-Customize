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
import Select from 'react-select';
import { useLocation } from 'react-router-dom';
import http from '../../baseURL';

const selectData = [
  { label: 'Active', value: 'active', key: 0 },
  { label: 'In Active', value: 'inActive', key: 1 },
];
const ViewForm = ({ match }) => {
  const location = useLocation();
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
  };
  const submitHandle = (e) => {
    e.preventDefault();
    if (location.state) {
      const id = location.state.from;
      http
        .put(`/Views/${id}`, data)
        .then((response) => {
          console.log(response.data);
          setData({
            name: '',
    viewTypeId: 0,
    architecture: '',
    active: true,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      http
        .post('/Views', data)
        .then((response) => {
          console.log(response.data);
          setData({
            name: '',
    viewTypeId: 0,
    architecture: '',
    active: true,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    console.log(location.state);
    if (location.state) {
      const id = location.state.from;
      http
        .get(`/Views/${id}`)
        .then((response) => {
          console.log(response.data);
          setData(response.data, 'travel');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.form-menu" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <Card className="mb-4">
            <CardBody>
              <Form onSubmit={submitHandle}>
                <Row>
                  <Colxx xxs="6" className="mb-6">
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
                  <Colxx xxs="6" className="mb-6">
                    <FormGroup>
                      <Label>View Type Id </Label>
                      <Input
                        type="number"
                        name="viewTypeId"
                        value={data.viewTypeId || ''}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="6" className="mb-6">
                    <FormGroup>
                      <Label>Architecture </Label>
                      <Input
                        type="text"
                        name="architecture"
                        value={data.architecture || ''}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="6" className="mb-6">
                    <FormGroup>
                      <Label>Active </Label>
                      <Select
                        value={selectedOptions}
                        onChange={(val) => setSelectedOptions(val)}
                        options={selectData}
                      />
                    </FormGroup>
                  </Colxx>
                </Row>
                <FormGroup className="text-center">
                  <Button color="primary" className="btn-lg mt-3" type="submit">
                    Save
                  </Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default ViewForm;
