import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardTitle, Row, Table } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { Link } from 'react-router-dom';
import http from '../../baseURL';

const ParentMenu = ({ match }) => {
  console.log(match, 'matchurl');
  const [detailList, setDetailList] = useState([]);
  useEffect(() => {
    http
      .get(`/menu`)
      .then((response) => {
        console.log(response.data);
        setDetailList(response.data, 'travel');
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
                <Link to={`${match.url}/form-menu`}>
                  <Button>Add new</Button>
                </Link>
              </CardTitle>
              <Table striped>
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th>Menu Name </th>
                    <th>Parent Menu</th>
                    <th>Sequence</th>
                    <th>Icon</th>
                    <th>Active</th>
                  </tr>
                </thead>
                <tbody>
                  {detailList.length > 0 ? (
                    detailList.map((data, i) => {
                      const parentMenuArr =  detailList.filter((item) => item.id === data.parentMenuId);
                      const parentMenu = parentMenuArr.map((fItem) => {
                        return fItem.name;
                      })
                      return (
                        <tr key={data.id}>
                          <th scope="row">{i + 1}</th>
                          <td>{data.name}</td>
                          <td>{parentMenu}</td>
                          <td>{data.sequence}</td>
                          <td>{data.icon}</td>
                          <td>
                            <Link
                              to={`${match.url}/form-menu?id=${data.id}`}
                              state={{ from: `${data.id}` }}
                            >
                              {' '}
                              <Button color="primary" className="btn-lg mr-3">
                                Edit
                              </Button>
                            </Link>
                            <Button color="danger" className="btn-lg">
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td>Loading...</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default ParentMenu;
