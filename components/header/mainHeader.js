"use client";

import "./mainHeader.css";
import Link from "next/link";
import NavLink from "./navLink";
import Image from "next/image";
import logoImage from "@/assets/images/icon.png";
import cartImage from "@/assets/images/cart-icon.svg";
import Cart from "./cart";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  searchMealsPerTitle,
  getRole,
  clearOrdersFromCard,
} from "@/lib/actions";
import SearchMeals from "../searchMeals/searchMeals";
import { signOut } from "next-auth/react";
import useClientSession from "@/hooks/useClientSession";
import InfoPopup from "../info/infoPopup";
import useTogglePopup from "@/hooks/useTogglePopup";

const MainHeader = ({ orders, totalPrice }) => {
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchedMeals, setSearchedMeals] = useState([]);
  const path = usePathname();
  const router = useRouter();

  const [role, setRole] = useState();
  const [session] = useClientSession(path);

  //toggle info popup
  const [showPopup, togglePopupInfoHandler] = useTogglePopup();

  const toggleCart = () => {
    if (!session) {
      togglePopupInfoHandler(1);
      return;
    }

    setCartIsVisible((prevState) => !prevState);
  };

  const searchPerTitle = (e) => {
    setSearchInput(e.target.value);
  };

  const logoutHandler = async () => {
    clearOrdersFromCard();
    const data = await signOut({ callbackUrl: "/login", redirect: false });
    router.push(data.url);
  };

  useEffect(() => {
    if (!searchInput) {
      return;
    }

    searchMealsPerTitle(`%${searchInput}%`).then((res) =>
      setSearchedMeals(res)
    );
  }, [searchInput]);

  useEffect(() => {
    getRole(session?.user.email).then((role) => {
      setRole(role);
    });
  }, [session]);

  useEffect(() => {
    if (!searchInput) {
      return;
    }
    setSearchInput("");
  }, [path]);

  return (
    <>
      {showPopup && <InfoPopup togglePopupInfo={togglePopupInfoHandler} />}
      {searchInput && <SearchMeals searchedMeals={searchedMeals} />}
      <div className="position-relative text-white">
        <header className="d-flex container-fluid justify-content-between headerContainer">
          <Link href="/" className="mt-1 ps-5">
            <Image
              src={logoImage}
              alt="Meal to go logo image"
              width={45}
              height={45}
            />
          </Link>

          <nav className="navbar navbar-expand-lg ms-5">
            <div className="container-fluid text-white">
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-5 mb-2 mb-lg-0 ">
                  <li className="nav-item mx-3">
                    <NavLink href="/meals">Menu</NavLink>
                  </li>
                  {session && (
                    <li className="nav-item mx-3">
                      <NavLink href="/order">Order</NavLink>
                    </li>
                  )}
                  {session && (
                    <li className="nav-item mx-3">
                      <NavLink href="/favorites">Favorites</NavLink>
                    </li>
                  )}

                  {role === "admin" && (
                    <li className="nav-item admin dropdown">
                      <span
                        className="dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Admin
                      </span>
                      <ul className="dropdown-menu">
                        <li>
                          <NavLink
                            className="dropdown-item"
                            href="/admin/create-meal"
                          >
                            Create meal
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            className="dropdown-item"
                            href="/admin/dashboard"
                          >
                            Edit
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                  )}

                  {!session && (
                    <li className="nav-item mx-3">
                      <NavLink href="/login">Login</NavLink>
                    </li>
                  )}

                  {session && (
                    <li
                      className="nav-item mx-3 logout"
                      onClick={logoutHandler}
                    >
                      Logout
                    </li>
                  )}
                </ul>
                <div className="input-group">
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchInput}
                    onChange={searchPerTitle}
                  />
                </div>
              </div>
              {path !== "/order" && (
                <div className="collapse navbar-collapse">
                  <Image
                    src={cartImage}
                    alt="Meal cart icon"
                    width={25}
                    height={25}
                    className="align-self-center ms-2 mt-2 myCart"
                    onClick={toggleCart}
                  />
                  <span
                    className={`translate-middle badge rounded-pill customBadge mt-1 ${
                      orders.length === 0 ? "bg-empty" : "bg-danger"
                    }`}
                  >
                    {orders.length}
                  </span>
                </div>
              )}
            </div>
          </nav>
        </header>
        {cartIsVisible && (
          <Cart
            toggleCart={toggleCart}
            orderedMeals={orders}
            totalPrice={totalPrice}
          />
        )}
      </div>
    </>
  );
};

export default MainHeader;
