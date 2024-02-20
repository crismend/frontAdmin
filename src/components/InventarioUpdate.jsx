import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import NavBarComponent from './NavBarComponent';
import SideBarComponent from './SideBarComponent';
import { useParams } from "react-router-dom";


function InventarioUpdate() {

    const [inventario, setInventario] = useState("");
    const [products, setProducts] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [stock, setStock] = useState("");
  const [productId, setProductId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const changeHandler = (e) => {
    setStock(e.target.value);
    console.log(stock)
  }


    
  let getInventario = async (e) => {
    //e.preventDefault();

    try {
      let res = await fetch(`http://localhost:8080/api/inventory/${params.idInventario}`,{
        method: "GET"
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setProductId(resJson.product_id);
        setCompanyId(resJson.company_id);
        setStock(resJson.stock);
        setMessage("Inventario obtenido");
      } else {
            setMessage("Error al modificar inventario");
      }
    } catch (err) {
        //console.log(err);
        setMessage("Error al guardar inventario");
    }
  };

  getInventario();

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8080/api/inventory/", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            companyId: companyId,
            productId: productId,
            stock: stock
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setMessage("inventario modificado");
      } else {
            setMessage("Some error occured");
      }
    } catch (err) {
        //console.log(err);
        setMessage("Error al modificar el inventario");
      //console.log(err);
    }
  };

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

    return(
        <div className="containera">  
              <NavBarComponent/>
        <SideBarComponent/>
  
        <div className="row">
        <div className="message">{message ? <p>{message}</p> : null}</div>
        <form  onSubmit={handleSubmit}>
        <div className="form-group">
            <label for="productId">Seleccione un producto</label>
            <select className="form-control" id="productId" value={productId} onChange={(e) => setProductId(e.target.value)} >
            <option>Seleccione producto</option>
                {
            products.map(function(item, i){
                var selected = (item.product_id === productId) ? ' selected' : '';
            
            return(
                <option value={item.coding}>{item.nameProd}</option>
      
      
      )})} 
    </select>
  </div>

  <div className="form-group">
            <label for="productId">Seleccione una empresa</label>
            <select className="form-control" id="companyId" value={companyId} onChange={(e) => setCompanyId(e.target.value)} >
            <option>Seleccione empresa</option>
                {
            companies.map(function(item, i){
                var selected = (item.company_id === companyId) ? ' selected' : '';
            
            return(
                <option value={item.id}>{item.namecomp}</option>
      
      
      )})} 
    </select>
  </div>


        <div className="form-group">
          <input type="hidden" className="form-control" id="coding" aria-describedby="productIdHelp" value={productId} onChange={(e) => setProductId(e.target.value)}/>
        </div>
        <div className="form-group">
          <input type="hidden" className="form-control" id="companyId" aria-describedby="companyIdHelp" value={companyId} onChange={(e) => setCompanyId(e.target.value)}/>
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

export default InventarioUpdate;