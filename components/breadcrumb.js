"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Breadcrumb = () => {
  const path = usePathname();
  const category = path.slice(1).split("/");

  return (
    <nav style={{ "--bs-breadcrumb-divider": "'>'" }} aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link href="/">&#8962;</Link>
        </li>
        {category.length === 1 && (
          <li className="breadcrumb-item active" aria-current="page">
            Menu
          </li>
        )}
        {category.length === 2 && (
          <>
            <li className="breadcrumb-item " aria-current="page">
              <Link href="/meals">Menu</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {category[1]}
            </li>
          </>
        )}
        {category.length === 3 && (
          <>
            <li className="breadcrumb-item " aria-current="page">
              <Link href="/meals">Menu</Link>
            </li>
            <li className="breadcrumb-item " aria-current="page">
              <Link href={`/meals/${category[1]}`}>{category[1]}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {category[2]}
            </li>
          </>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
