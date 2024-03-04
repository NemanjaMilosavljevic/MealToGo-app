"use client";

import Link from "next/link";
import NavLink from "./navLink";
import Image from "next/image";
import logoImage from "@/assets/images/icon.png";
import searchImage from "@/assets/images/search-icon.svg";
import cartImage from "@/assets/images/cart-icon.svg";

const MainHeader = () => {
  return (
    <header className="d-flex bg-light bg-opacity-25 container-fluid justify-content-between">
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
                <NavLink href="/order">YOUR ORDER</NavLink>
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
              />

              <Image
                src={searchImage}
                alt="search icon"
                width={30}
                height={30}
                className="align-self-center opacity-50"
              />
            </div>
          </div>
          <div className="collapse navbar-collapse">
            <Image
              src={cartImage}
              alt="cart icon"
              width={30}
              height={30}
              className="align-self-center opacity-50 ms-5"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MainHeader;
