import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import Header from './pages/header';
import HomePage from './pages/homepage/homepage';
import Catalog from './pages/Catalog/catalog'
import SearchCatalog from './pages/Catalog/Searchcatalog'


const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={ <Header />}>
    <Route index element={ <Navigate to="/home" replace /> } />
    <Route path="home" element={ <HomePage/> } />
    <Route path="catalog/:catagoryname" element={ <Catalog/> } />
    <Route path="/products/:searchterm" element={ <SearchCatalog/> } />
    <Route path="/products" element={ <SearchCatalog/> } />
  </Route>
)) 

function App() {
  
  return (

    <RouterProvider router={appRouter} />
  )
}

export default App
