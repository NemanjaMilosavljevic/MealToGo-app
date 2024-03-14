import Link from "next/link";
import { usePathname } from "next/navigation";
import "./navLink.css";

const NavLink = ({ href, children }) => {
  const path = usePathname();
  return (
    <Link
      className={`nav-link ${path.startsWith(href) ? `activePage` : ""}`}
      aria-current="page"
      href={href}
    >
      {children}
    </Link>
  );
};

export default NavLink;
