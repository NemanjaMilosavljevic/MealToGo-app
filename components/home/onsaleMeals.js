"use client";
import Image from "next/image";
import QuantityPicker from "../meals/quantityPicker";
import FavoriteMealIcon from "../meals/favoriteMealIcon";
import useTogglePopup from "@/hooks/useTogglePopup";
import InfoPopup from "../modal/Popup";
import "./onsaleMeals.css";

const OnsaleMeals = ({ onsaleMeals }) => {
  const [showPopup, togglePopupInfoHandler] = useTogglePopup();
  return (
    <div>
      {showPopup && <InfoPopup togglePopupInfo={togglePopupInfoHandler} />}
      <div
        id="carouselExampleInterval"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {onsaleMeals.map((meal, index) => {
            return (
              <div
                className={`mb-3 carousel-item ${index === 0 ? "active" : ""}`}
                data-bs-interval="3000"
                key={meal.id}
                id={meal.id}
              >
                <div className="card h-100">
                  <div className="position-relative">
                    <span className="position-absolute text-white discount">
                      +25% DISCOUNT
                    </span>
                    <ul className="position-absolute list-unstyled mt-3">
                      <li
                        className={`bg-meal-flag my-2 px-4 py-1 fw-bold ${
                          meal.vegan ? "" : "d-none"
                        }`}
                      >
                        <div>vegge</div>
                      </li>
                      <li
                        className={`bg-meal-flag my-2 px-4 py-1 fw-bold ${
                          meal.fasting ? "" : "d-none"
                        }`}
                      >
                        <div>fast</div>
                      </li>
                    </ul>
                    <FavoriteMealIcon
                      mealId={meal.id}
                      favorite={meal.favorite}
                      togglePopupInfo={togglePopupInfoHandler}
                    />
                    <Image
                      src={meal.image}
                      className="card-img-top"
                      alt={meal.description}
                      width={300}
                      height={450}
                    />
                  </div>
                  <div className="card-body meal-cart-bg text-light d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex justify-content-between gap-2 mealCardHeader">
                        <div className="card-title fs-4 text-break mealTitle">
                          {meal.title}
                        </div>
                        <div>
                          <div
                            className={`card-title ${
                              meal.onsale === 0 ? "fw-bolder fs-4" : ""
                            }  ${meal.onsale === 1 ? "discount-price" : ""}`}
                          >
                            &#8364;{meal.price}
                          </div>
                          {meal.onsale === 1 && (
                            <div className="card-title fw-bolder fs-5 text-warning">
                              <div>now &#8364;{0.75 * meal.price}</div>
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="card-text my-3 ps-1">{meal.description}</p>
                    </div>

                    <QuantityPicker
                      mealQuantity={meal.quantity}
                      id={meal.id}
                      togglePopupInfo={togglePopupInfoHandler}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default OnsaleMeals;
