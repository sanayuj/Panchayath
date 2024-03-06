import React, { useEffect,useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllCertificate, userHeader } from "../../../Services/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../../Features/setUser";

function Header() {
  const [certificate, setCertificate] = useState([]);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    userHeader()
      .then((res) => {
        if (res.data.status) {
          dispatch(setUserDetails(res.data.userDetails));
        }
      })
      .catch((err) => {
        console.log(err);
      });
    fetchAllCertificate().then((res) => {
      setCertificate(res.data.certificate);
    });
  }, []);
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <Link class="navbar-brand" to={"/"}>
            <img
              className="govLogo"
              src="https://gad.kerala.gov.in/sites/default/files/inline-images/kerala%20final%20emblem_0.jpg"
            ></img>
            <span className="mx-2">Ente panchayath</span>
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link" to={"/viewProjects"}>
                  Projects
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to={"/payment"}>
                  Bill payment
                </Link>
              </li>

              <li class="nav-item dropdown">
                <Link
                  class="nav-link dropdown-toggle"
                  to={""}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Certificates
                </Link>
                <ul class="dropdown-menu">
                  {certificate.map((value, index) => (
                    <li key={index}>
                      <Link class="dropdown-item" to={`/showRequirement/${value._id}`}>
                        {value.certificateName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            
              <li class="nav-item">
                <Link class="nav-link" to={"/certStatus"}>
                  Status
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to={"/complaint"}>
                  Complaint
                </Link>
              </li>
            </ul>
          </div>
          {user ? (
            <button
              className="logoutBtn"
              onClick={() => {
                localStorage.removeItem("jwt");
                dispatch(setUserDetails(""));
                navigate("/login");
              }}
            >
              Logout
            </button>
          ) : (
            <button className="loginBtn" onClick={() => navigate("/login")}>
              Login
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
