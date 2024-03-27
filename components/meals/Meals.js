"use client";

import Image from "next/image";
import FavoriteMealIcon from "./favoriteMealIcon";
import "./Meals.css";
import QuantityPicker from "./quantityPicker";
import InfoPopup from "../modal/Popup";
import useTogglePopup from "@/hooks/useTogglePopup";
import Heading from "./heading";

const Meals = ({ meals, searchModal, favMealPage }) => {
  const [showPopup, togglePopupInfoHandler] = useTogglePopup();

  return (
    <div
      className={`d-flex justify-content-md-end ${
        searchModal || favMealPage ? "justify-content-md-center" : ""
      } justify-content-center w-100 mt-5`}
    >
      {showPopup && <InfoPopup togglePopupInfo={togglePopupInfoHandler} />}
      <div className="meal-wrapper">
        <Heading hasMeals={meals.length > 0} searchModal={searchModal} />
        <div className="row row-cols-1  row-cols-md-2 row-cols-xl-3 row-cols-xxl-4">
          {meals.map((meal) => {
            return (
              <div className="mb-3" key={meal.id}>
                <div className="card h-100">
                  <div className="position-relative">
                    {meal.onsale === 1 && (
                      <span className="position-absolute text-white discount">
                        +25% DISCOUNT
                      </span>
                    )}
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
                      height={220}
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
      </div>
    </div>
  );
};

export default Meals;
