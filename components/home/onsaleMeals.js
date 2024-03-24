"use client";
import Image from "next/image";
import QuantityPicker from "../meals/quantityPicker";
import FavoriteMealIcon from "../meals/favoriteMealIcon";
import { useState } from "react";
import "./onsaleMeals.css";

const OnsaleMeals = ({ onsaleMeals }) => {
  //const [activeId, setActiveId] = useState();
  let scrollPosition = 0;

  const previousMealHandler = (e) => {
    let cardWidth =
      e.target.parentElement.previousSibling.firstElementChild.offsetWidth;

    if (scrollPosition > 0) {
      scrollPosition = scrollPosition - cardWidth;

      //e.target.parentElement.previousSibling.style.transform = `translateX(${scrollPosition}px)`;
      e.target.parentElement.previousSibling.scrollLeft = scrollPosition;
    }
  };

  const nextMealHandler = (e) => {
    let carouselWidth = e.target.closest("div").firstElementChild.scrollWidth;
    let cardWidth =
      e.target.closest("div").firstElementChild.firstElementChild.offsetWidth;

    if (scrollPosition < carouselWidth - cardWidth * 4) {
      scrollPosition = scrollPosition + cardWidth;

      /*      e.target.closest(
        "div"
      ).firstElementChild.style.width = `100% - ${cardWidth}`; */

      e.target.closest(
        "div"
      ).firstElementChild.style.transform = `translateX(-${scrollPosition}px)`;

      /*    e.target.closest(
        "div"
      ).firstElementChild.style.transform = `translateX(-${scrollPosition}px)`; */
      e.target.closest("div").firstElementChild.scrollLeft = scrollPosition;
    }
  };

  return (
    <div
      id="carouselExampleInterval"
      className="carousel"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {onsaleMeals.map((meal) => {
          return (
            <div
              className={`mb-3 carousel-item`}
              /* data-bs-interval="2000" */
              key={meal.id}
              id={meal.id}
            >
              <div className="card h-100">
                <div className="position-relative">
                  <ul className="position-absolute list-unstyled mt-3">
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
                  <FavoriteMealIcon
                    mealId={meal.id}
                    favorite={meal.favorite}
                    /*  togglePopupInfo={togglePopupInfoHandler} */
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
                      <div className="card-title fw-bolder fs-4">
                        &#8364;{meal.price}
                      </div>
                    </div>

                    <p className="card-text my-3 ps-1">{meal.description}</p>
                  </div>

                  <QuantityPicker
                    mealQuantity={meal.quantity}
                    id={meal.id}
                    /*    togglePopupInfo={togglePopupInfoHandler} */
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
        /*     data-bs-target="#carouselExampleInterval" */
        /*  data-bs-slide="prev" */
      >
        <span
          className="carousel-control-prev-icon"
          aria-hidden="true"
          onClick={previousMealHandler}
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        /*    data-bs-target="#carouselExampleInterval" */
        /*   data-bs-slide="next" */
      >
        <span
          className="carousel-control-next-icon"
          aria-hidden="true"
          onClick={nextMealHandler}
        ></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default OnsaleMeals;
