import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';
import NavBarComponent from './NavBarComponent';
import SideBarComponent from './SideBarComponent';


function Empresas(){
    const [empresas, setEmpresas] = useState([]);

    useEffect(() => {
        const manejarEnvio = async () => {
            try {
                const resp = await fetch('http://localhost:8080/api/company');
                const emps = await resp.json();
                
                console.log(emps);
                setEmpresas(emps);
            } catch(error) {
                console.log(error);
            }
        };
        manejarEnvio();
    }, []);

    console.log(window.roleu);
    const role = window.roleu;
    let button;
    if(role === "ADMIN"){
        button =  <Link style={{ textDecoration: 'none', color:'black' }} 
        to={{
            pathname: `/empresa`
        }}
        >
        Nueva Empresa
    </Link>;
    }
    return(
        <div className="containera">  
              <NavBarComponent/>
        <SideBarComponent/>
  
        <div className="row">
        {button}
        <table className="table table-dark">
  <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">nit</th>
      <th scope="col">nombre</th>
      <th scope="col">direccion</th>
      <th scope="col">telefono</th>
      <th scope="col">acciones</th>
    </tr>
  </thead>
  <tbody>

            {
        empresas.map(function(item, i){
            
            return(
            <tr>
                <td>{item.id}</td>
                <td>{item.nit}</td>
                <td>{item.namecomp}</td>
                <td>{item.address}</td>
                <td>{item.phone}</td>
                <td>
                <Link style={{ textDecoration: 'none', color:'white' }} 
                                        to={{
                                            pathname: `/empresa/${item.id}`,
                                            state: { item },
                                        }}
                                        >
                                        Ver Empresa
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

export default Empresas;