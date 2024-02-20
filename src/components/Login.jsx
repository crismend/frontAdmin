import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {

    const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
    
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            username: username,
            pass: pass
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        window.roleu = resJson.roleu
        setUsername("");
        setPass("");
        setMessage("User created successfully");
        navigate('/empresas');
      } else {
            setMessage("Some error occured");
      }
    } catch (err) {
        //console.log(err);
        setMessage("No autorizado");
        if (err['status'] === 401) {
            setMessage("No autorizado");
            console.log(err);
            //this.props.history.push('/');
        };
      //console.log(err);
    }
  };

    return(<section>
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
      
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card bg-dark text-white">
            <div className="card-body p-5 text-center">
            <div className="message">{message ? <p>{message}</p> : null}</div>
              <div className="mb-md-5 mt-md-4 pb-5">
  
                <h2 className="fw-bold mb-2 text-uppercase">The</h2>
                <p className="text-white-50 mb-5">Ingrese su usuario y password</p>
  
                <form onSubmit={handleSubmit}>

                <div className="form-outline form-white mb-4">
                  <input type="text" id="username" className="form-control form-control-lg" value={username} onChange={(e) => setUsername(e.target.value)}/>
                  <label className="form-label" htmlFor="username">Usuario</label>
                </div>
  
                <div className="form-outline form-white mb-4">
                  <input type="password" id="pass" className="form-control form-control-lg" value={pass} onChange={(e) => setPass(e.target.value)}/>
                  <label className="form-label" htmlFor="pass">Password</label>
                </div>
  
                <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                
                </form>
              </div>

  
            </div>
          </div>
        </div>
      </div>
    </div>
   
  </section>
      
        
    );

}

export default Login;