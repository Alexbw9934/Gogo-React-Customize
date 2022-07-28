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
import _ from 'lodash';
import { useLocation } from 'react-router-dom';
import http from '../../baseURL';

const selectData = [
  { label: 'Active', value: 'active', key: 0 },
  { label: 'In Active', value: 'inActive', key: 1 },
];
const FormMenu = ({ match, history }) => {
  const location = useLocation();
  const [data, setData] = useState({
    name: '',
    parentMenuId: 0,
    sequence: 0,
    webIcon: '',
    listViewId: 0,
    formViewId: 0,
    listViewAPI: '',
    formViewAPI: '',
    active: true,
    pagePath: '/app/list-view',
    id: 0,
  });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedViewOptions, setSelectedViewOptions] = useState([]);
  const [selectedViewOptions1, setSelectedViewOptions1] = useState([]);
  const [selectedViewOptionsData, setSelectedViewOptionsData] = useState([]);

  const [selectedMenuOptions, setSelectedMenuOptions] = useState([]);
  const [selectedMenuOptionsData, setSelectedMenuOptionsData] = useState([]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const useQuery = () => {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  };
  const query = useQuery();
  const submitHandle = (e) => {
    e.preventDefault();
    const details = {
      ...data,
      parentMenuId: selectedMenuOptions.value,
      listViewId: _.get(selectedViewOptions, 'value'),
      menu: 'test',
    };
    if (query.get('id')) {
      const id = query.get('id');
      http
        .put(`/Menu/${id}`, details)
        .then((response) => {
          console.log(response.data);
          setData({
            name: '',
            parentMenuId: 0,
            sequence: 0,
            webIcon: '',
            listViewId: 0,
            formViewId: 0,
            listViewAPI: '',
            formViewAPI: '',
            active: true,
          });
          setSelectedMenuOptions([]);
          setSelectedOptions([]);
          setSelectedViewOptions([]);
          setSelectedViewOptions1([]);
          history.push('/app/parent-menu');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      http
        .post('/Menu', details)
        .then((response) => {
          console.log(response.data);
          setData({
            name: '',
            parentMenuId: 0,
            sequence: 0,
            webIcon: '',
            listViewId: 0,
            formViewId: 0,
            listViewAPI: '',
            formViewAPI: '',
            active: true,
          });
          setSelectedMenuOptions([]);
          setSelectedOptions([]);
          setSelectedViewOptions([]);
          setSelectedViewOptions1([]);
          history.push('/app/parent-menu');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getViewList = (val, val1) => {
    http
      .get(`/Views`)
      .then((response) => {
        const datas = [];
        console.log('Views', response.data);
        if (_.size(_.get(response, 'data')) > 0) {
          _.map(_.get(response, 'data', []), (value) => {
            datas.push({
              label: _.get(value, 'name'),
              value: _.get(value, 'id'),
            });
            console.log('valval', val);
            if (_.get(value, 'id') === val) {
              console.log('filtersdsd', {
                label: _.get(value, 'name'),
                value: _.get(value, 'id'),
              });
              setSelectedViewOptions([
                {
                  label: _.get(value, 'name'),
                  value: _.get(value, 'id'),
                },
              ]);
            }

            if (_.get(value, 'id') === val1) {
              console.log('filtersdsd', {
                label: _.get(value, 'name'),
                value: _.get(value, 'id'),
              });
              setSelectedViewOptions1([
                {
                  label: _.get(value, 'name'),
                  value: _.get(value, 'id'),
                },
              ]);
            }
          });
          setSelectedViewOptionsData(datas);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getMenuList = () => {
    http
      .get(`/Menu`)
      .then((response) => {
        const datas = response.data.map((item) => {
          return {
            label: item.name,
            value: item.id,
          };
        });
        setSelectedMenuOptionsData(datas);
        // if(_.size(_.get(response,'data'))>0){
        //   _.map(_.get(response,'data',[]),(value)=>{
        //       datas.push({
        //           label:_.get(value,'name'),
        //           value:_.get(value,'id'),
        //       })
        //       if(_.get(value,'parentMenuId') ===val){
        //       //   console.log('filtersdsd',{
        //       //     label:_.get(value,'name'),
        //       //     value:_.get(value,'id'),
        //       // });
        //         setSelectedMenuOptions([{
        //           label:_.get(value,'name'),
        //           value:_.get(value,'id'),
        //       }])
        //       }

        //   })
        //   setSelectedMenuOptionsData(datas)
        // }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const id = query.get('id');
    console.log(id, '##########');
    if (query.get('id')) {
      http
        .get(`/Menu/${query.get('id')}`)
        .then((response) => {
          setData(response.data);
          //   getViewList(_.get(response,'data.listViewId'),_.get(response,'data.formViewId'))
          // getMenuList(_.get(response,'data.parentMenuId'))
          // if (_.get(response,'data.active')===true) {
          //   setSelectedOptions([{ label: 'Active', value: 'active', key: 0 }])
          // }else{
          //   setSelectedOptions([{ label: 'In Active', value: 'inActive', key: 1 }])
          // }
          // setSelectedMenuOptions(response.data.parentMenuId)
        })
        .catch((error) => {
          console.log(error);
        });

      http
        .get(`/Menu`)
        .then((response) => {
          const datas = response.data.filter((item) => String(item.id) !== id);
          const lists = datas.map((a) => {
            return {
              label: a.name,
              value: a.id,
            };
          });
          setSelectedMenuOptionsData(lists);

          const editMenu = response.data.filter(
            (item) => String(item.id) === id
          );
          const parent = response.data.filter(
            (item) => item.id === editMenu[0].parentMenuId
          );
          if (parent !== [{}]) {
            setSelectedMenuOptions({
              label: parent[0].name,
              value: parent[0].id,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      getViewList();
      getMenuList();
    }
  }, []);

  useEffect(() => {
    console.log(location.state);
    if (location.state != null) {
      const id = location.state.from;
      http
        .get(`/Menu/${id}`)
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
                      <Label>Menu Name </Label>
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
                      <Label>Parent Menu </Label>
                      <Select
                        value={selectedMenuOptions}
                        onChange={(val) => {
                          console.log(val, '111111');
                          setSelectedMenuOptions(val);
                        }}
                        options={selectedMenuOptionsData}
                      />
                    </FormGroup>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="6" className="mb-6">
                    <FormGroup>
                      <Label>Sequence </Label>
                      <Input
                        type="text"
                        name="sequence"
                        value={data.sequence || ''}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="6" className="mb-6">
                    <FormGroup>
                      <Label>Web Icon </Label>
                      <Input
                        type="text"
                        name="webIcon"
                        value={data.webIcon || ''}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Colxx>
                </Row>
                <Row>
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
                  <Colxx xxs="6" className="mb-6">
                    <FormGroup>
                      <Label>List View Id </Label>
                      <Select
                        value={selectedViewOptions}
                        onChange={(val) => setSelectedViewOptions(val)}
                        options={selectedViewOptionsData}
                      />
                    </FormGroup>
                  </Colxx>
                  {/* <Colxx xxs="6" className="mb-6">
                    <FormGroup>
                      <Label>Icon </Label>
                      <Input
                        type="text"
                        name="icon"
                        value={data.icon || ''}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Colxx> */}
                </Row>
                <Row>
                  <Colxx xxs="6" className="mb-6">
                    <FormGroup>
                      <Label>Form View Id </Label>
                      <Select
                        value={selectedViewOptions1}
                        onChange={(val) => setSelectedViewOptions1(val)}
                        options={selectedViewOptionsData}
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="6" className="mb-6">
                    <FormGroup>
                      <Label>List View API String </Label>
                      <Input
                        type="text"
                        name="listViewAPI"
                        value={data.listViewAPI || ''}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="6" className="mb-6">
                    <FormGroup>
                      <Label>Form View API String </Label>
                      <Input
                        type="text"
                        name="formViewAPI"
                        value={data.formViewAPI || ''}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Colxx>
                  <Colxx xxs="6" className="mb-6">
                    <FormGroup>
                      <Label> Menu ID </Label>
                      <Input
                        type="text"
                        name="id"
                        value={data.id || ''}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Colxx>
                </Row>
                <Row>
                  <Colxx xxs="6" className="mb-6">
                    <FormGroup>
                      <Label>Page Path </Label>
                      <Input
                        type="text"
                        name="pagePath"
                        disabled
                        value={data.pagePath || ''}
                        onChange={handleChange}
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

export default FormMenu;
