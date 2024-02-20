import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarComponent from './NavBarComponent';
import SideBarComponent from './SideBarComponent';
import { useParams } from "react-router-dom";


function EmpresaUpdate() {

    const [id, setId] = useState("");
  const [nit, setNit] = useState("");
  const [namecomp, setNamecomp] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const changeHandler = (e) => {
    //setNit(e.target.value)
    console.log(nit)
  }


    
  let getEmpresa = async (e) => {
    //e.preventDefault();

    try {
      let res = await fetch(`http://localhost:8080/api/company/${params.idEmpresa}`,{
        method: "GET"
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setId(resJson.id);
        setNit(resJson.nit);
        setNamecomp(resJson.namecomp);
        setAddress(resJson.address);
        setPhone(resJson.phone);
        setMessage("Empresa obtenida");
      } else {
            setMessage("Error al modificar empresa");
      }
    } catch (err) {
        //console.log(err);
        setMessage("Error al guardar empresa");
    }
  };

  getEmpresa();

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8080/api/company", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            id: id,
            nit: nit,
            namecomp: namecomp,
            address: address,
            phone: phone
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setMessage("Empresa modificada");
      } else {
            setMessage("Some error occured");
      }
    } catch (err) {
        //console.log(err);
        setMessage("Error al modificar la empresa");
      //console.log(err);
    }
  };

  function onTodoChange(value){
    console.log(value);
    //setNit("");
    setNit(value);
  }

    return(
        <div className="containera">  
              <NavBarComponent/>
        <SideBarComponent/>
  
        <div className="row">
        <div className="message">{message ? <p>{message}</p> : null}</div>
        <form  onSubmit={handleSubmit}>
        <div className="form-group">
          <input type="hidden" className="form-control" id="id" aria-describedby="idHelp" value={id} onChange={(e) => setId(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="nit">NIT</label>
          <input type="text" className="form-control" id="nit" value={nit} onChange={e => onTodoChange(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="nit">Nombre</label>
          <input type="text" className="form-control" id="nombre" aria-describedby="nombreHelp" placeholder="nombre" value={namecomp} onChange={(e) => setNamecomp(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="nit">Dirección</label>
          <input type="text" className="form-control" id="address" aria-describedby="addressHelp" placeholder="dirección" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="nit">Teléfono</label>
          <input type="text" className="form-control" id="phone" aria-describedby="phoneHelp" placeholder="teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      </div>
      </div>
      
      );

    }

export default EmpresaUpdate;