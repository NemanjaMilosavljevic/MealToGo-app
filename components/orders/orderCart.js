import DeleteMealButton from "./deleteMealButton";
import QuantityPicker from "./quantityPicker";
import "./orderCard.css";

const OrderCart = ({ orderedMeals }) => {
  return (
    <table className="table table-orders">
      <thead>
        <tr>
          <th scope="col" style={{ width: "10%" }}>
            Item ID
          </th>
          <th scope="col" style={{ width: "60%" }}>
            MEAL
          </th>
          <th scope="col" style={{ width: "10%" }}>
            PRICE
          </th>
          <th scope="col" style={{ width: "10%" }}>
            AMOUNT
          </th>
          <th scope="col" style={{ width: "10%" }}>
            TOTAL PRICE
          </th>
        </tr>
      </thead>
      <tbody className="align-middle">
        {orderedMeals.map((meal) => {
          return (
            <tr key={meal.id} style={{ height: "100px" }}>
              <td scope="row">{meal.id}</td>
              <td>{meal.title}</td>
              <td>&#8364;{meal.price}</td>
              <td>
                <QuantityPicker mealQuantity={meal.quantity} id={meal.id} />
              </td>
              <td>
                <div className="d-flex gap-5">
                  <div className="fs-5">
                    &#8364;
                    {(meal.onsale === 1 ? 0.75 * meal.price : meal.price) *
                      meal.quantity}
                  </div>
                  <div className="d-flex">
                    <DeleteMealButton id={meal.id} />
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default OrderCart;
