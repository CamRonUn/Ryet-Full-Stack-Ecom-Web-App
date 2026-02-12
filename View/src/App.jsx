import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Header from './pages/header';
import HomePage from './pages/homepage'


const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={ <Header />}>
    <Route path="/home" element={ <HomePage/> }></Route>
  </Route>
)) 

function App() {
  
  return (
    <RouterProvider router={appRouter} />
  )
}

export default App
