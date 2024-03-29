import React, { Suspense } from 'react';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import * as router from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

const DefaultLayout = (props) => {

  const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  const signOut = (e) => {
    e.preventDefault()
    props.history.push('/login')
  }

  return (
    <div className="app">
      <AppHeader fixed>
        <Suspense  fallback={loading()}>
          <DefaultHeader onLogout={e=>signOut(e)}/>
        </Suspense>
      </AppHeader>
      <div className="app-body">
        <AppSidebar fixed display="lg">
          <AppSidebarHeader style={{textAlign:'left'}}> 
          <Link to="/" style={{textDecoration: 'none', color: "white"}}>
            <img src={'../../assets/img/avatars/6.jpg'} width="40" hieght="40" className="img-avatar" alt="admin@bootstrapmaster.com" />
            <strong style={{marginLeft: "15px"}}>Ngọc Trinh</strong>
          </Link>
            </AppSidebarHeader>
          <AppSidebarForm />
          
          <Suspense>
          <AppSidebarNav navConfig={navigation} {...props} router={router}/>
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>
        <main className="main">
          <AppBreadcrumb appRoutes={routes} router={router}/>
          <Container fluid>
            <Suspense fallback={loading()}>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={props => (
                        <route.component {...props} />
                      )} />
                  ) : (null);
                })}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Suspense>
          </Container>
        </main>
      </div>
      <AppFooter>
        <Suspense fallback={loading()}>
          <DefaultFooter />
        </Suspense>
      </AppFooter>
    </div>
  );
}

export default DefaultLayout;
