"use client";

import "./mainHeader.css";
import Link from "next/link";
import NavLink from "./navLink";
import Image from "next/image";
import logoImage from "@/assets/images/icon.png";
import cartImage from "@/assets/images/cart-icon.svg";
import Cart from "./cart";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { searchMealsPerTitle } from "@/lib/actions";
import SearchMeals from "../searchMeals/searchMeals";

const MainHeader = ({ orders, totalPrice }) => {
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchedMeals, setSearchedMeals] = useState([]);
  const path = usePathname();

  const toggleCart = () => {
    setCartIsVisible((prevState) => !prevState);
  };

  const searchPerTitle = (e) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    if (!searchInput) {
      return;
    }

    searchMealsPerTitle(`%${searchInput}%`).then((res) =>
      setSearchedMeals(res)
    );
  }, [searchInput]);

  return (
    <>
      {searchInput && <SearchMeals searchedMeals={searchedMeals} />}
      <div className="position-relative">
        <header className="d-flex bg-light bg-opacity-25 container-fluid justify-content-between headerIndex">
          <Link href="/" className="m-3 ps-5">
            <Image src={logoImage} alt="logo image" width={70} height={70} />
          </Link>

          <nav className="navbar navbar-expand-lg navbar-light ms-5">
            <div className="container-fluid">
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav me-5 mb-2 mb-lg-0 ">
                  <li className="nav-item mx-5">
                    <NavLink href="/meals">MENU</NavLink>
                  </li>
                  <li className="nav-item mx-5">
                    <NavLink href="/order">MY ORDER</NavLink>
                  </li>
                  <li className="nav-item mx-5">
                    <NavLink href="/favorites">FAVORITES</NavLink>
                  </li>
                </ul>
                <div className="input-group ">
                  <input
                    className="form-control opacity-50"
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
                    alt="cart icon"
                    width={35}
                    height={35}
                    className="align-self-center opacity-50 ms-5 myCart"
                    onClick={toggleCart}
                  />
                  <span
                    className={`translate-middle badge rounded-pill customBadge ${
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
