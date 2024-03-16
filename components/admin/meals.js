"use client";
import NavLink from "../header/navLink";
import "./admin.css";

const Meals = () => {
  return (
    <div className="p-5 border border-danger border-2 rounded-pill bg-light mt-3 adminCard">
      <NavLink href="/admin/dashboard/meals">Meals</NavLink>
    </div>
  );
};

export default Meals;
