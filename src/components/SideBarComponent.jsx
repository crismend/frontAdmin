import React from "react";
import {Link} from 'react-router-dom';

const SideBarComponent=()=>{
    const role = window.roleu
    let buttona;
    let buttonb;
    if(role === "ADMIN"){
        buttona =  <Link style={{ textDecoration: 'none', color:'white' }}  to="/productos">Productos</Link>;
        buttonb = <Link style={{ textDecoration: 'none', color:'white' }}  to="/inventarios">Inventarios</Link>;
    }
    return(
        <div className="sidebar">
            <ul>
                <li>
                    <ul><Link style={{ textDecoration: 'none', color:'white' }}  to="/empresas">Empresas</Link></ul>
                    <ul>{buttona}</ul>
                    <ul>{buttonb}</ul>
                </li>
            </ul>
        </div>
    )
}

export default SideBarComponent;