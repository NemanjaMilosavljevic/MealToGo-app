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
      {showPopup && <InfoPopup togglePopupInfo={togglePopupInfoHandler} />}
      {searchInput && <SearchMeals searchedMeals={searchedMeals} />}
      <div className="position-relative text-white">
        <header className="d-flex container-fluid justify-content-between headerContainer">
          <div className="d-flex align-items-center gap-3 py-1">
            <Link href="/" className="mt-1 ps-5">
              <Image
                src={logoImage}
                alt="Meal to go logo image"
                width={45}
                height={45}
              />
            </Link>

            <nav className="navbar navbar-expand-lg">
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
                  </ul>
                </div>
              </div>
            </nav>
          </div>

          <nav className="navbar navbar-expand-lg ms-5">
            <div className="container-fluid text-white">
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav mb-2 mb-lg-0 ">
                  {searchInputIsVisible && (
                    <div className="input-group me-3">
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
                    <li className="nav-item mx-3">
                      <NavLink href="/login">Log in</NavLink>
                    </li>
                  )}

                  {session && (
                    <li
                      className="nav-item mx-3 logout"
                      onClick={logoutHandler}
                    >
                      Log out
                    </li>
                  )}

                  {!session && (
                    <li className="nav-item me-4" onClick={registerHandler}>
                      <button className="btn register-btn">Register</button>
                    </li>
                  )}
                </ul>
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
