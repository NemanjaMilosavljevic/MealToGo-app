"use client";

import "./admin.css";
import DeleteUserButton from "./deleteUserButton";
import { updateUserToAdmin } from "@/lib/actions";

const DashboardUsers = ({ users }) => {
  const setUserAsAdmin = (id, e) => {
    updateUserToAdmin(e.target.checked === true ? "admin" : "viewer", id);
  };
  return (
    <table className="table table-orders">
      <thead>
        <tr>
          <th scope="col" style={{ width: "10%" }}>
            User ID
          </th>
          <th scope="col" style={{ width: "40%" }}>
            EMAIL
          </th>
          <th scope="col" style={{ width: "30%" }}>
            SET USER AS ADMIN
          </th>
          <th scope="col" style={{ width: "20%" }}>
            DELETE USER
          </th>
        </tr>
      </thead>
      <tbody className="align-middle">
        {users.map((user) => {
          return (
            <tr key={user.id} style={{ height: "100px" }}>
              <td scope="row">{user.id}</td>

              <td>{user.email}</td>

              <td>
                <div className="form-check ms-5">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="role"
                    name="role"
                    checked={user.role === "admin" ? true : false}
                    onChange={setUserAsAdmin.bind(null, user.id)}
                  />
                </div>
              </td>

              <td>
                <div className="d-flex">
                  <DeleteUserButton id={user.id} />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DashboardUsers;
