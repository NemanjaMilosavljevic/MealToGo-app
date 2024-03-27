"use client";

import "./mainHeader.css";
import Link from "next/link";
import NavLink from "./navLink";
import Image from "next/image";
import logoImage from "@/public/images/icon.png";
import cartImage from "@/public/images/cart-icon.svg";
import searchImage from "@/public/images/search-icon.svg";
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
import Popup from "../modal/Popup";
import useTogglePopup from "@/hooks/useTogglePopup";

const MainHeader = ({ orders, totalPrice }) => {
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchedMeals, setSearchedMeals] = useState([]);
  const path = usePathname();
  const router = useRouter();

  const [role, setRole] = useState();
  const [session] = useClientSession(path);

  //toggle info
  const [showPopup, togglePopupInfoHandler] = useTogglePopup();

  //state for show search input
  const [searchInputIsVisible, setSearchInputIsVisible] = useState(false);

  const toggleSearchHandler = () => {
    setSearchInputIsVisible((prevState) => !prevState);
  };

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

  const registerHandler = async () => {
    router.push("/register");
  };

  useEffect(() => {
    if (!searchInput) {
      document.body.classList.remove("body-no-overflow");
      return;
    }

    //remove scrollbar from body whene search modal is active
    document.body.classList.add("body-no-overflow");

    searchMealsPerTitle(`%${searchInput}%`).then((res) =>
      setSearchedMeals(res)
    );
  }, [searchInput]);

  useEffect(() => {
    getRole(session?.user.email).then((role) => {
      setRole(role);
    });
  }, [session]);

  //reset search input if change route
  useEffect(() => {
    if (!searchInput) {
      return;
    }
    setSearchInput("");
  }, [path]);

  // close cart if its open and user go to other route
  useEffect(() => {
    if (!cartIsVisible) {
      return;
    }
    setCartIsVisible(false);
  }, [path]);

  return (
    <>
      {showPopup && <Popup togglePopupInfo={togglePopupInfoHandler} />}
      {searchInput && <SearchMeals searchedMeals={searchedMeals} />}
      <div className="position-relative text-white">
        <header className="container-fluid headerContainer">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid d-flex p-0">
              <Link href="/">
                <Image
                  src={logoImage}
                  alt="Meal to go logo image"
                  width={45}
                  height={45}
                />
              </Link>

              <button
                type="button"
                className="navbar-toggler"
                data-bs-toggle="collapse"
                data-bs-target="#nav-header"
                aria-controls="nav-header"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  height={20}
                  width={20}
                  className="navbar-toggler-icon"
                >
                  <path
                    fill="#ffffff"
                    d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
                  />
                </svg>
              </button>

              <div className="collapse navbar-collapse" id="nav-header">
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
                </ul>
              </div>
            </div>
          </nav>

          <div className="container-fluid text-white d-flex flex-row align-items-center justify-content-end p-0 second-header">
            <div className="mb-2 mb-lg-0 d-flex flex-row second-haeder-content">
              {searchInputIsVisible && (
                <div className="input-group input-group-sm me-2">
                  <input
                    className="form-control"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={searchInput}
                    onChange={searchPerTitle}
                  />
                </div>
              )}

              <Image
                src={searchImage}
                alt="Search icon"
                width={18}
                height={18}
                onClick={toggleSearchHandler}
                className="search-icon"
              />

              {!session && (
                <div className="mx-2 mx-sm-3 mt-2 login">
                  <NavLink href="/login">Log in</NavLink>
                </div>
              )}

              {session && (
                <div className="mx-0 mx-sm-2 logout" onClick={logoutHandler}>
                  Log out
                </div>
              )}

              {!session && (
                <div className="me-0 me-sm-3" onClick={registerHandler}>
                  <button className="btn register-btn">Register</button>
                </div>
              )}
            </div>

            {path !== "/order" && (
              <div className="position-relative">
                {cartIsVisible && (
                  <Cart
                    toggleCart={toggleCart}
                    orderedMeals={orders}
                    totalPrice={totalPrice}
                  />
                )}
                <Image
                  src={cartImage}
                  alt="Meal cart icon"
                  width={25}
                  height={25}
                  className="align-self-center mx-2 mt-2 myCart "
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
        </header>
      </div>
    </>
  );
};

export default MainHeader;
