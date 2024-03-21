"use client";

import Image from "next/image";
import DeleteMealButton from "../orders/deleteMealButton";
import { updateMealToBeOnsale } from "@/lib/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from "@/util/util";
import "./admin.css";

const DashboardMeals = ({ meals }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setMealOnsale = (id, e) => {
    updateMealToBeOnsale(e.target.checked === true ? 1 : 0, id);
  };

  const editMealHandler = (id) => {
    router.push(
      `/admin/dashboard/edit-meal?${createQueryString(
        "mealId",
        id,
        searchParams
      )}`
    );
  };

  return (
    <table className="table table-orders">
      <thead>
        <tr>
          <th scope="col" style={{ width: "10%" }}>
            Item ID
          </th>
          <th scope="col" style={{ width: "50%" }}>
            MEAL
          </th>
          <th scope="col" style={{ width: "10%" }}>
            ONSALE
          </th>
          <th scope="col" style={{ width: "10%" }}>
            IMAGE
          </th>
          <th scope="col" style={{ width: "10%" }}>
            EDIT MEAL
          </th>
          <th scope="col" style={{ width: "10%" }}>
            DELETE MEAL
          </th>
        </tr>
      </thead>
      <tbody className="align-middle">
        {meals.map((meal) => {
          return (
            <tr key={meal.id} style={{ height: "100px" }}>
              <td scope="row">{meal.id}</td>
              <td>{meal.title}</td>
              <td>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="onsale"
                    name="onsale"
                    checked={meal.onsale === 0 ? false : true}
                    onChange={setMealOnsale.bind(null, meal.id)}
                  />
                </div>
              </td>
              <td>
                <Image
                  src={meal.image}
                  alt={meal.description}
                  width={200}
                  height={100}
                />
              </td>
              <td>
                <button
                  className="btn edit-button"
                  onClick={editMealHandler.bind(null, meal.id)}
                >
                  Edit
                </button>
              </td>

              <td>
                <div className="d-flex">
                  <DeleteMealButton id={meal.id} isAdmin={true} />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DashboardMeals;
