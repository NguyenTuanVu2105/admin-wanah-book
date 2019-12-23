import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));
const Users = React.lazy(() => import('./views/Users/Users'));
const Books = React.lazy(() => import('./views/Books/Books'));
const Authors = React.lazy(() => import('./views/Books/Authors/Authors'));
const Categories = React.lazy(() => import('./views/Books/Categories/Categories'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/books', exact: true, name: 'Books', component: Books},
  { path: '/authors', exact: true, name: 'Authors', component: Authors},
  { path: '/categories', exact: true, name: 'Categories', component: Categories},
];

export default routes;
