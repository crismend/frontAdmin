import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import NavBarComponent from './NavBarComponent';
import SideBarComponent from './SideBarComponent';


function Inventarios(){
    const [inventarios, setInventarios] = useState([]);

    useEffect(() => {
        const manejarEnvio = async () => {
            try {
                const resp = await fetch('http://localhost:8080/api/inventory');
                const invs = await resp.json();
                
                console.log(invs);
                setInventarios(invs);
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
                                            pathname: `/inventario`
                                        }}
                                        >
                                        Nuevo Inventario
                                    </Link>
        <table className="table table-dark">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">nombre</th>
      <th scope="col">empresa</th>
      <th scope="col">stock</th>
      <th scope="col">accion</th>
    </tr>
  </thead>
  <tbody>

            {
        inventarios.map(function(item, i){
            
            return(
            <tr>
                <td>{item.id}</td>
                <td>{item.nameprod}</td>
                <td>{item.namecomp}</td>
                <td>{item.stock}</td>
                <td>
                <Link style={{ textDecoration: 'none', color:'white' }} 
                                        to={{
                                            pathname: `/inventario/${item.id}`,
                                            state: { item },
                                        }}
                                        >
                                        Ver Inventario
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

export default Inventarios;