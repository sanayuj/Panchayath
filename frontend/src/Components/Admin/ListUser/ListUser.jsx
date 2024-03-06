import React, { useEffect, useState } from "react";
import "./ListUser.css";
import { fetchSpecificUserComplaint, toogleBlock, userList } from "../../../Services/adminApi";
function ListUser() {
  const [userDetails, setUserDetails] = useState([]);

  const toggleBlock = async (userId, index) => {
    const { data } = await toogleBlock(userId);
    setUserDetails((prevUsers) =>
      prevUsers.map((user, i) =>
        i === index ? { ...user, blockStatus: !user.blockStatus } : user
      )
    );
  };




  useEffect(() => {
    userList()
      .then((res) => {
        setUserDetails(res.data.userDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  return (
    <div className="mainDivUserList">
      <table className="table my-4">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Si.no</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {userDetails.map((value, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{value.username}</td>
              <td>{value.email}</td>
              <td>
                <button
                  className={
                    value?.blockStatus ? "btn btn-primary" : "btn btn-secondary"
                  }
                  onClick={() => toggleBlock(value._id, index)}
                >
                  {value?.blockStatus ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListUser;
