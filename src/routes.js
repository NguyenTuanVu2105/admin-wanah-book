import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));
const Users = React.lazy(() => import('./views/Users/Users'));
const Books = React.lazy(() => import('./views/Books/Books'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/books', exact: true, name: 'Books', component: Books},
];

export default routes;
