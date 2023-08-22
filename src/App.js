import logo from './logo.svg';
import './App.css';

import { RouterProvider,createBrowserRouter } from "react-router-dom";
import SharePage from './Components/SharePage';
import MainHolder from './Compiler/MainHolder';
function App() {



    const router =createBrowserRouter([
    
      {
         path:'/',
         element:<MainHolder></MainHolder>,
        
      },
      {
        path:'/screenshot',
   element:<SharePage></SharePage>
      }
     

    ])

  return (
 <RouterProvider router={router}>

 

 </RouterProvider>
  );
}

export default App;
