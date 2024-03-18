"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import "./breadcrumb.css";

const Breadcrumb = () => {
  const path = usePathname();
  const category = path.slice(1).split("/");

  return (
    <nav
      style={{ "--bs-breadcrumb-divider": "''" }}
      aria-label="breadcrumb"
      className="breadCont"
    >
      <ol className="breadcrumb m-0">
        <li className="breadcrumb-item">
          <Link href="/" className="breadItem">
            &#8962;
          </Link>
        </li>
        {category.length === 1 && (
          <li
            className="breadcrumb-item active breadItem --bs-breadcrumb-divider"
            aria-current="page"
          >
            menu
          </li>
        )}
        {category.length === 2 && (
          <>
            <li
              className="breadcrumb-item breadItem --bs-breadcrumb-divider"
              aria-current="page"
            >
              <Link href="/meals" className="breadItem">
                menu
              </Link>
            </li>
            <li
              className="breadcrumb-item active --bs-breadcrumb-divider"
              aria-current="page"
            >
              {category[1]}
            </li>
          </>
        )}
        {category.length === 3 && (
          <>
            <li
              className="breadcrumb-item breadItem --bs-breadcrumb-divider"
              aria-current="page"
            >
              <Link href="/meals" className="breadItem">
                menu
              </Link>
            </li>
            <li
              className="breadcrumb-item --bs-breadcrumb-divider"
              aria-current="page"
            >
              <Link href={`/meals/${category[1]}`} className="breadItem">
                {category[1]}
              </Link>
            </li>
            <li
              className="breadcrumb-item active breadItem --bs-breadcrumb-divider"
              aria-current="page"
            >
              {category[2]}
            </li>
          </>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
