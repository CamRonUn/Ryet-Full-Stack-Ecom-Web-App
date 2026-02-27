import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import Header from './pages/header';
import HomePage from './pages/homepage/homepage';
import Catalog from './pages/Catalog/catalog'
import SearchCatalog from './pages/Catalog/Searchcatalog'
import Account from './pages/account/account'
import Register from './pages/account/Register'
import ProductPage from './pages/Product/product'
import {CurrencyProvider} from './util/currencyContext'
import CartPage from './pages/cart/cart'
import ViewProduct from './pages/account/ViewOrder'


const appRouter = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={ <Header />}>
    <Route index element={ <Navigate to="/home" replace /> } />
    <Route path="home" element={ <HomePage/> } />
    <Route path="catalog/:catagoryname" element={ <Catalog/> } />
    <Route path="/products/:searchterm" element={ <SearchCatalog/> } />
    <Route path="/products" element={ <SearchCatalog/> } />
    <Route path="/account" element={ <Account/>} />
    <Route path="/register" element ={ <Register/> } />
    <Route path="/Product/:productID" element={ <ProductPage/>} />
    <Route path="/Cart" element={ <CartPage/>} />
    <Route path="/Order/:OrderId" element={ <ViewProduct/> } />
  </Route>
)) 

function App() {
  
  return (
    <CurrencyProvider>
      <RouterProvider router={appRouter} />
    </CurrencyProvider>
  )
}

export default App
