"use client";

import { usePathname } from "next/navigation";

const Heading = ({ hasMeals, searchModal }) => {
  const path = usePathname();
  return (
    <>
      {hasMeals && (
        <h1 className="text-center text-white my-5">
          {path.startsWith("/meals") && !searchModal
            ? "Add meal to your cart"
            : path.startsWith("/favorites") && !searchModal
            ? "Your favorite meals"
            : ""}
        </h1>
      )}
    </>
  );
};

export default Heading;