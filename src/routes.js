import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const Books = React.lazy(() => import('./views/Books/Books'))
const Book = React.lazy(() => import('./views/Books/Book'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/books', exact: true, name: 'Books', component: Books},
  { path: '/books/:id', exact: true, name: 'Book', component: Book}
];

export default routes;
