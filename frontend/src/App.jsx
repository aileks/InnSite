import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { restoreUser } from './store/session';
import Navigation from './components/Navigation';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <div
            style={{
              marginTop: '20vh',
            }}
          >
            <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>
              Welcome!
            </h1>

            <h2 style={{ textAlign: 'center', marginTop: '10px' }}>
              We&apos;re still under construction...
              <br />
              <img
                style={{ marginTop: '10px' }}
                src='https://media1.tenor.com/m/XPRG-4ujVMIAAAAd/cat-work-in-progress.gif'
                alt=''
              />
            </h2>
          </div>
        ),
      },
    ],
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
