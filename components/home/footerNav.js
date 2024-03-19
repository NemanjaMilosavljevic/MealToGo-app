"use client";

import NavLink from "../header/navLink";
import useClientSession from "@/hooks/useClientSession";
import { usePathname } from "next/navigation";

const FooterNav = () => {
  const path = usePathname();
  const [session] = useClientSession(path);
  return (
    <ul className="list-unstyled">
      <li>
        <NavLink href="/meals">Menu</NavLink>
      </li>
      {session && (
        <li>
          <NavLink href="/order">Order</NavLink>
        </li>
      )}
      {session && (
        <li>
          <NavLink href="/favorites">Favorites</NavLink>
        </li>
      )}
      <li>
        <NavLink href="#about">About us</NavLink>
      </li>
    </ul>
  );
};

export default FooterNav;
