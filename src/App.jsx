import { RouterProvider } from "react-router-dom"
import routes from "./routes/routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <>
      <ToastContainer autoClose={1000} />
      <RouterProvider router={routes} />
    </>
  )
}

export default App;
