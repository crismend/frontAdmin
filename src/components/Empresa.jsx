import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBarComponent from './NavBarComponent';
import SideBarComponent from './SideBarComponent';


function Empresa() {
    

    const [empresa, setEmpresa] = useState("");
  const [nit, setNit] = useState("");
  const [namecomp, setNamecomp] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

    
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8080/api/company", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            nit: nit,
            namecomp: namecomp,
            address: address,
            phone: phone
        }),
      });
      let resJson = await res.json();
      if (res.status === 201) {
        setNit("");
        setNamecomp("");
        setAddress("");
        setPhone("");

        setMessage("Empresa creada");
      } else {
            setMessage("Error al crear la empresa");
      }
    } catch (err) {
        //console.log(err);
        setMessage("Error al guardar empresa");
    }
  };

    return(
        <div className="containera">  
              <NavBarComponent/>
        <SideBarComponent/>
  
        <div className="row">
        <div className="message">{message ? <p>{message}</p> : null}</div>
        <form  onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="nit">NIT</label>
          <input type="text" className="form-control" id="nit" aria-describedby="nnitHelp" placeholder="nit" value={nit} onChange={(e) => setNit(e.target.value)} />
          </div>
        <div class="form-group">
          <label for="namecomp">Nombre</label>
          <input type="text" className="form-control" id="namecomp" aria-describedby="namecompHelp" placeholder="nombre" value={namecomp} onChange={(e) => setNamecomp(e.target.value)} />
        </div>
        <div class="form-group">
          <label for="nit">Dirección</label>
          <input type="text" className="form-control" id="address" aria-describedby="addressHelp" placeholder="dirección" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div class="form-group">
          <label for="nit">Teléfono</label>
          <input type="text" className="form-control" id="phone" aria-describedby="phoneHelp" placeholder="teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      </div>
      </div>
      
      );

      function formFieldDataChanged(e){
        const updatedField = e.dataField;
        const newValue = e.value;
        // Event handling commands go here
    }

    }

export default Empresa;