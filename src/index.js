import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router, 
  Routes, 
  Route
} from 'react-router-dom';
import Products from './components/Productos';
import Product from './components/Producto';
import Empresas from './components/Empresas';
import Empresa from './components/Empresa';
import EmpresaUpdate from './components/EmpresaUpdate';
import Productos from './components/Productos';
import Producto from './components/Producto';
import ProductoUpdate from './components/ProductoUpdate';
import Inventarios from './components/Inventarios';
import Inventario from './components/Inventario';
import InventarioUpdate from './components/InventarioUpdate';

import 'bootstrap/dist/css/bootstrap.css';
import Login from './components/Login';
//import 'bootstrap/dist/css/bootstrap.css';



ReactDOM.render(

  <React.StrictMode>


    <Router>

      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/empresas" element={<Empresas />} />
        <Route path="/empresa" element={<Empresa />} />
        <Route exact path="/empresa/:idEmpresa" element={<EmpresaUpdate />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto" element={<Producto />} />
        <Route exact path="/producto/:idProducto" element={<ProductoUpdate />} />
        <Route path="/inventarios" element={<Inventarios />} />
        <Route path="/inventario" element={<Inventario />} />
        <Route exact path="/inventario/:idInventario" element={<InventarioUpdate />} />
      </Routes>

    </Router>

  </React.StrictMode>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
