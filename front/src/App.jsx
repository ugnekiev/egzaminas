import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
// PACKAGES
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
// COMPONENTS
// import RegisterPage from './Components/register/Main';
// import Home from "./Components/home/Main";
import Nav from "./Components/Nav";
// import Containers from "./Components/Containers/Main";
// CONTEXT
import DataContext from "./Contexts/DataContexts";
// AUTH
import { login, logout, authConfig } from './Functions/auth';
import Meniu from "./Components/Meniu/Main";
import Orders from "./Components/Orders/Main"

function App() {
  const [roleChange, setRoleChange] = useState(Date.now());

  return (
    <DataContext.Provider value={{}}>
      <BrowserRouter>
        <ShowNav roleChange={roleChange}/>
        <Routes>
          <Route path="/" element={<RequireAuth role="user">Home</RequireAuth>}></Route>
          <Route path="/meniu" element={<RequireAuth role="admin"><Meniu /></RequireAuth>}></Route>
          <Route path="/orders" element={<RequireAuth role="admin"><Orders /></RequireAuth>}></Route>
          <Route path="/login" element={<LoginPage setRoleChange={setRoleChange}/>} />
          <Route path="/logout" element={<LogoutPage setRoleChange={setRoleChange}/>} />
          {/* <Route path="/register" element={<RegisterPage setRoleChange={setRoleChange} />} /> */}
        </Routes>
      </BrowserRouter>
    </DataContext.Provider>
  );
}

function ShowNav({roleChange}) {
  const [status, setStatus] = useState(1);
  useEffect(() => {
    axios.get('http://localhost:3003/login-check?role=admin', authConfig())
      .then(res => {
        setStatus(res.data.status);
      })
  }, [roleChange]);
  return <Nav status={status} />
}

function RequireAuth({ children, role }) {
  const [view, setView] = useState(<h2>Please wait...</h2>);

  useEffect(() => {
    axios.get('http://localhost:3003/login-check?role=' + role, authConfig())
      .then(res => {
        if ('ok' === res.data.msg) {
          setView(children);
        }
        else if (res.data.status === 2) {
          setView(<h2>Unauthorize...</h2>)
        }
        else {
          setView(<Navigate to="/login" replace />);
        }
      })

  }, [children, role]);

  return view;
}


function LoginPage({ setRoleChange }) {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const doLogin = () => {
    axios.post('http://localhost:3003/login', { user, pass })
      .then(res => {
        setRoleChange(Date.now());
        if ('ok' === res.data.msg) {
          login(res.data.key);
          navigate('/', { replace: true });
        }
      })
      .catch(() => {
      })
  }
  return (


    <div className="container">
      <div className="row justify-content-center">
        <div className="col col-lg-4 col-md-12">
          <div className="card m-4">
            <h5 className="card-header">Login</h5>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">name</label>
                <input type="text" className="form-control" value={user} onChange={e => setUser(e.target.value)} />
              </div>
              <div className="mb-3">
                <label className="form-label">password</label>
                <input type="password" className="form-control" value={pass} onChange={e => setPass(e.target.value)} />
              </div>
              <button onClick={doLogin} type="button" className="btn btn-outline-success">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

function LogoutPage({ setRoleChange }) {
  useEffect(() => {
    logout();
    setRoleChange(Date.now());
  }, [setRoleChange]);

  return (
    <Navigate to="/login" replace />
  )
}

export default App;