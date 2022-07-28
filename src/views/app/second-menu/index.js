import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Second = React.lazy(() =>
  import(/* webpackChunkName: "second" */ './second')
);
const Menu1 = React.lazy(() =>
  import(/* webpackChunkName: "second" */ '../../../Addons/menu1/view')
);
const Menu2 = React.lazy(() =>
  import(/* webpackChunkName: "second" */ '../../../Addons/menu2/view')
);

const SecondMenu = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/second`} />
      <Route
        path={`${match.url}/second`}
        render={(props) => <Second {...props} />}
      />
      <Route
        path={`${match.url}/menu1`}
        render={(props) => <Menu1 {...props} />}
      />
      <Route
        path={`${match.url}/menu2`}
        render={(props) => <Menu2 {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default SecondMenu;
