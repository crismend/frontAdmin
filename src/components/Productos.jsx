import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import NavBarComponent from './NavBarComponent';
import SideBarComponent from './SideBarComponent';


function Productos(){
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const manejarEnvio = async () => {
            try {
                const resp = await fetch('http://localhost:8080/api/product');
                const emps = await resp.json();
                
                console.log(emps);
                setProductos(emps);
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
        <Link style={{ textDecoration: 'none', color:'black' }} 
                                        to={{
                                            pathname: `/producto`
                                        }}
                                        >
                                        Nuevo Producto
                                    </Link>
        <table className="table table-dark">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">nombre</th>
      <th scope="col">caracteristicas</th>
      <th scope="col">accion</th>
    </tr>
  </thead>
  <tbody>

            {
        productos.map(function(item, i){
            
            return(
            <tr>
                <td>{item.coding}</td>
                <td>{item.nameProd}</td>
                <td>{item.features}</td>
                <td>
                <Link style={{ textDecoration: 'none', color:'white' }} 
                                        to={{
                                            pathname: `/producto/${item.coding}`,
                                            state: { item },
                                        }}
                                        >
                                        Ver Producto
                                    </Link>
                </td>

            </tr>
            
        )})} 
         </tbody>
</table>
        </div>
        </div>
      
        
    )

}

export default Productos;