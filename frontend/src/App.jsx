import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './components/LoginForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Welcome!</h1>,
  },
  {
    path: '/login',
    element: <LoginForm />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
