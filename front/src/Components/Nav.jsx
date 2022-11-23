import { NavLink } from "react-router-dom";

function Nav({status}) {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div className="container-fluid">
                            <span className="navbar-brand">Day lunch</span>
                            <div className="collapse navbar-collapse">
                                <div className="navbar-nav">
                                    {status === 3 || status ===1 ? <NavLink to="/" end className='nav-link active'>Home</NavLink> : null}
                                    {status === 3 || status ===1 ? <NavLink to="/meniu" className='nav-link active'>Meniu</NavLink> : null}
                                    {status === 3 || status ===1 ? <NavLink to="/orders" className='nav-link active'>Orders</NavLink> : null}
                                    {status === 1 ? <NavLink to="/login" className="nav-link">Login</NavLink> : null}
                                    {status === 1 ? <NavLink to="/register" className="nav-link">Register</NavLink> : null}
                                    {status !== 1 ? <NavLink to="/logout" className='nav-link active'>Logout</NavLink> : null}
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}
export default Nav;