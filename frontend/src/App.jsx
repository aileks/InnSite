import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { restoreUser } from './store/session';
import Navigation from './components/Navigation';
import Index from './components/Index';
import NotFound from './components/404';
import SingleInn from './components/SingleInn';
import InnForm from './components/InnForm';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Index />,
      },
      {
        path: 'inns/:id',
        element: <SingleInn />,
      },
      {
        path: 'inns/new',
        element: <InnForm />
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '*',
    element: (
      <div
        style={{
          marginTop: '20vh',
          width: '100vw',
        }}
      >
        <h1 style={{ textAlign: 'center', margin: '10px 0' }}>
          Something went wrong...
        </h1>

        <h2 style={{ textAlign: 'center' }}>
          Page not found
          <br />
          <img
            style={{ marginTop: '10px' }}
            src='https://media1.tenor.com/m/KfTzPr3nyowAAAAd/what-que.gif'
            alt=''
          />
        </h2>
      </div>
    ),
  },
]);

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
