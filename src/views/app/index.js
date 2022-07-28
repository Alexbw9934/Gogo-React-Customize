import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
// import http from '../../baseURL';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const Gogo = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './gogo')
);
const SecondMenu = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './second-menu')
);
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './blank-page')
);
const ParentMenu = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './parentMenu')
);
const FormMenu = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './FormMenu')
);
const View = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './SampleForm')
);
const ViewForm = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './ViewForm')
);
const FormBuilderForm = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './form-builder')
);

const ViewTable = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './view-table')
);

const ViewType = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './view-types')
);

const PdfController = React.lazy(() =>
  import(
    /* webpackChunkName: "viwes-blank-page" */ '../../controllers/print-pdf'
  )
);

const CountryCreate = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './countryForm')
);
const ListView = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ '../../components/ListView')
);

const App = ({ match }) => {
  // const [detailList, setDetailList] = useState([]);
  // useEffect(() => {
  //   http
  //     .get(`/menu`)
  //     .then((response) => {
  //       console.log(response.data);
  //       let obj = {};
  //       const arr = response.data.map((data) => {
  //         obj = {
  //           ...obj,
  //           id: `${data.name}`,
  //           icon: 'iconsminds-bucket',
  //           label: `menu.${data.name}`,
  //           to: `/${data.listViewAPI}`,
  //         };
  //         return obj
  //       });
  //       console.log(arr, 'arrrrrrr');
  //       localStorage.setItem('detailMenu', response.data);
  //       setDetailList(response.data, 'travel');
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/gogo`} />
            <Route
              path={`${match.url}/gogo`}
              render={(props) => <Gogo {...props} />}
            />
            <Route
              path={`${match.url}/second-menu`}
              render={(props) => <SecondMenu {...props} />}
            />
            {/* <ProtectedRoute
                    path={`${match.url}/second-menu`}
                    component={SecondMenu}
                    roles={[UserRole.Admin]}
            /> */}
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />
            <Route
              path={`${match.url}/parent-menu`}
              exact
              render={(props) => <ParentMenu {...props} />}
            />
            <Route
              path={`${match.url}/parent-menu/form-menu`}
              render={(props) => <FormMenu {...props} />}
            />
            <Route
              path={`${match.url}/sample-form`}
              exact
              render={(props) => <View {...props} />}
            />
            <Route
              path={`${match.url}/view/view-form`}
              render={(props) => <ViewForm {...props} />}
            />
            <Route
              path={`${match.url}/form-builder`}
              render={(props) => <FormBuilderForm {...props} />}
            />
            <Route
              path={`${match.url}/view-table`}
              render={(props) => <ViewTable {...props} />}
            />
            <Route
              path={`${match.url}/view-type`}
              render={(props) => <ViewType {...props} />}
            />
            <Route
              path={`${match.url}/pdf-controller`}
              render={(props) => <PdfController {...props} />}
            />
            <Route
              path={`${match.url}/country-create`}
              render={(props) => <CountryCreate {...props} />}
            />
            <Route
              path={`${match.url}/list-view`}
              render={(props) => <ListView {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
