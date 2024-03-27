import DeleteMealButton from "./deleteMealButton";
import QuantityPicker from "./quantityPicker";
import "./orderCard.css";

const OrderCart = ({ orderedMeals }) => {
  return (
    <div className="table-responsive">
      <table className="table table-orders">
        <thead>
          <tr>
            <th scope="col" style={{ width: "10%" }} className="table-haeder">
              ID
            </th>
            <th scope="col" style={{ width: "50%" }} className="table-haeder">
              MEAL
            </th>
            <th scope="col" style={{ width: "10%" }} className="table-haeder">
              PRICE
            </th>
            <th scope="col" style={{ width: "10%" }} className="table-haeder">
              AMOUNT
            </th>
            <th scope="col" style={{ width: "10%" }} className="table-haeder">
              TOTAL
            </th>
            <th scope="col" style={{ width: "10%" }} className="table-haeder">
              DELETE
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
                  <div className="fs-5">
                    &#8364;
                    {(meal.onsale === 1 ? 0.75 * meal.price : meal.price) *
                      meal.quantity}
                  </div>
                </td>
                <td>
                  <DeleteMealButton id={meal.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderCart;
