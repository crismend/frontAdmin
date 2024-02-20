import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import NavBarComponent from './NavBarComponent';
import SideBarComponent from './SideBarComponent';


function Producto() {

    const [inventario, setInventario] = useState("");
    const [companies, setCompanies] = useState([]);
    const [products, setProducts] = useState([]);
  const [stock, setStock] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [productId, setProductId] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
    
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8080/api/inventory", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            companyId: companyId,
            productId: productId,
            stock:stock
        }),
      });
      let resJson = await res.json();
      if (res.status === 201) {
        setStock("");

        setMessage("Inventario creado");
      } else {
            setMessage("Error al crear inventario");
      }
    } catch (err) {
        //console.log(err);
        setMessage("Error al guardar inventario");
    }
  };

  useEffect(() => {
    const manejarEnvio = async () => {
        try {
            const resp = await fetch('http://localhost:8080/api/company');
            const comps = await resp.json();
            
            console.log(comps);
            setCompanies(comps);
        } catch(error) {
            console.log(error);
        }
    };
    manejarEnvio();
}, []);

useEffect(() => {
    const manejarEnvio = async () => {
        try {
            const resp = await fetch('http://localhost:8080/api/product');
            const prods = await resp.json();
            
            console.log(prods);
            setProducts(prods);
        } catch(error) {
            console.log(error);
        }
    };
    manejarEnvio();
}, []);

    return(
        <div className="containera">  
              <NavBarComponent/>
        <SideBarComponent/>
  
        <div className="row">
        <div className="message">{message ? <p>{message}</p> : null}</div>
        <form  onSubmit={handleSubmit}>
        <div className="form-group">
            <label for="categoryId">Seleccione un producto</label>
            <select className="form-control" id="productId" value={productId} onChange={(e) => setProductId(e.target.value)} >
            <option>Seleccione producto</option>
                {
            products.map(function(item, i){
            
            return(
                <option value={item.coding}>{item.nameprod}</option>
      
      
      )})} 
    </select>
    </div>

    <div className="form-group">
            <label for="categoryId">Seleccione una Empresa</label>
            <select className="form-control" id="companyId" value={companyId} onChange={(e) => setCompanyId(e.target.value)} >
            <option>Seleccione empresa</option>
                {
            companies.map(function(item, i){
            
            return(
                <option value={item.id}>{item.namecomp}</option>
      
      
      )})} 
    </select>
    </div>

    <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input type="text" className="form-control" id="stock" aria-describedby="stockHelp" placeholder="stock" value={stock} onChange={(e) => setStock(e.target.value)} /> 
    </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
      </div>
      
      );

    }

export default Producto;