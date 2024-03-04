import Image from "next/image";
import "./Meals.css";

const Meals = ({ meals }) => {
  console.log("meals", meals);
  return (
    <div className="container">
      <div className="row row-cols-4 my-3">
        {meals.map((meal) => {
          return (
            <div className="mb-5" key={meal.id}>
              <div className="card h-100">
                <div className="position-relative">
                  <ul className="position-absolute list-unstyled">
                    <li
                      className={`bg-meal-flag my-2 px-3 fw-bold ${
                        meal.vegan ? "" : "d-none"
                      }`}
                    >
                      <div>vegge</div>
                    </li>
                    <li
                      className={`bg-meal-flag my-2 px-3 fw-bold ${
                        meal.fasting ? "" : "d-none"
                      }`}
                    >
                      <div>fast</div>
                    </li>
                  </ul>
                  <Image
                    src={meal.image}
                    className="card-img-top"
                    alt={meal.description}
                    width={300}
                    height={300}
                  />
                </div>
                <div className="card-body meal-cart-bg text-light d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between border-bottom border-success gap-2">
                      <div className="card-title fs-4 text-break">
                        {meal.title}
                      </div>
                      <div className="card-title fw-bolder fs-3">
                        &#8364;{meal.price}
                      </div>
                    </div>

                    <p className="card-text mt-3 ps-1">{meal.description}</p>
                  </div>

                  <div className="d-flex justify-content-between mb-3">
                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="btn btn-outline-success text-white"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-success rounded-3 text-white"
                      >
                        1
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-success text-white"
                      >
                        +
                      </button>
                    </div>
                    <button type="button" className="btn btn-success btn-sm">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Meals;
