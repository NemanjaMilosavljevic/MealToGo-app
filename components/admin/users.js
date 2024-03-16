"use client";
import NavLink from "../header/navLink";
import "./admin.css";

const Users = () => {
  return (
    <div className="p-5 border border-danger border-2 rounded-pill bg-light mt-3 adminCard">
      <NavLink href="/admin/dashboard/users">Users</NavLink>
    </div>
  );
};

export default Users;
