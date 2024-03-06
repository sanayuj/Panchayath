import React, { useEffect ,useState} from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { adminHeader } from "../../../Services/adminApi";
import { useDispatch } from "react-redux";
import { setAdminDetails } from "../../../Features/setAdmin";
function Header() {
  const dispatch = useDispatch();
  const [admin,setAdmin]=useState()
  useEffect(() => {
    adminHeader()
      .then((res) => {
        setAdmin(res.data.adminDetails)
        dispatch(setAdminDetails(res.data.adminDetails));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <nav className="navbar bg-body-tertiary ">
        <div className="container-fluid mx-5">
          <Link className="navbar-brand mx-3" to="/admin/">
            Panchayath <span>Admin</span>
          </Link>
          {admin ? (
            <span >
              <Link className="text-danger text-decoration-none">Logout</Link>
            </span>
          ) : null}
        </div>
      </nav>
    </div>
  );
}

export default Header;
