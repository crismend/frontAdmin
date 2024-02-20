import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import NavBarComponent from './NavBarComponent';
import SideBarComponent from './SideBarComponent';
import { useParams } from "react-router-dom";


function ProductoUpdate() {

    const [producto, setProducto] = useState("");
    const [categories, setCategories] = useState([]);
    const [coding, setCoding] = useState("");
  const [nameprod, setNameprod] = useState("");
  const [features, setFeatures] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const changeHandler = (e) => {
    setNameprod(e.target.value)
    console.log(nameprod)
  }


    
  let getProducto = async (e) => {
    //e.preventDefault();

    try {
      let res = await fetch(`http://localhost:8080/api/product/${params.idProducto}`,{
        method: "GET"
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setCoding(resJson.conding);
        setNameprod(resJson.nameProd);
        setFeatures(resJson.features);
        setCategoryId(resJson.category_id);
        setMessage("Producto obtenido");
      } else {
            setMessage("Error al modificar producto");
      }
    } catch (err) {
        //console.log(err);
        setMessage("Error al guardar producto");
    }
  };

  getProducto();

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8080/api/product", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            coding: coding,
            nameprod: nameprod,
            features: features,
            categoryId: categoryId
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setMessage("Producto modificado");
      } else {
            setMessage("Some error occured");
      }
    } catch (err) {
        //console.log(err);
        setMessage("Error al modificar el producto");
      //console.log(err);
    }
  };

  useEffect(() => {
    const manejarEnvio = async () => {
        try {
            const resp = await fetch('http://localhost:8080/api/category');
            const cats = await resp.json();
            
            console.log(cats);
            setCategories(cats);
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
          <input type="hidden" className="form-control" id="coding" aria-describedby="codingHelp" value={coding} onChange={(e) => setCoding(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="nameprod">Nombre</label>
          <input type="text" className="form-control" id="nameprod" aria-describedby="nameprodHelp" placeholder="nombre" value={nameprod} onChange={(e) => setNameprod(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="features">Caracteristicas</label>
          <input type="text" className="form-control" id="features" aria-describedby="featuresHelp" placeholder="caracteristicas" value={features} onChange={(e) => setFeatures(e.target.value)} />
        </div>
        <div className="form-group">
            <label for="categoryId">Seleccione una categoria</label>
            <select className="form-control" id="categoryId" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} >
            <option>Seleccione categoria</option>
                {
            categories.map(function(item, i){
                var selected = (item.category_id === categoryId) ? ' selected' : '';
            
            return(
                <option value={item.id}>{item.namecat}</option>
      
      
      )})} 
    </select>
  </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
      </div>
      
      );

    }

export default ProductoUpdate;