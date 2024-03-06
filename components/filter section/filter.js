"use client";

import "./filter.css";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { setPriceRange, createQueryString } from "@/util/util";

const Filter = ({ minPrice, maxPrice }) => {
  const router = useRouter();
  const path = usePathname();
  const searchParams = useSearchParams();

  const setQueryParams = (e) => {
    if (e.target.checked) {
      router.push(
        `${path}?${createQueryString(
          e.target.name,
          e.target.name === "price"
            ? setPriceRange(minPrice, e.target.value)
            : e.target.checked,
          searchParams
        )}`
      );

      return;
    }

    router.push(
      `${path}?${createQueryString(
        e.target.name,
        e.target.name === "price"
          ? setPriceRange(minPrice, e.target.value)
          : e.target.checked,
        searchParams
      )}`
    );
  };

  return (
    <div className="accordion mt-1 w-100" id="accordionPanelsStayOpenExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseOne"
            aria-expanded="true"
            aria-controls="panelsStayOpen-collapseOne"
          >
            Vegge
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseOne"
          className="accordion-collapse collapse show"
          aria-labelledby="panelsStayOpen-headingOne"
        >
          <div className="accordion-body">
            <div className="form-check">
              <input
                type="checkbox"
                name="vegge"
                id="vegge"
                className="form-check-input"
                onChange={setQueryParams}
              />
              <label htmlFor="vegge" className="form-check-label">
                vegge
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="accordion-item">
        <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseTwo"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseTwo"
          >
            Fasting meal
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="panelsStayOpen-headingTwo"
        >
          <div className="accordion-body">
            <div className="form-check">
              <input
                type="checkbox"
                name="fasting"
                id="fasting"
                className="form-check-input"
                onChange={setQueryParams}
              />
              <label htmlFor="fasting" className="form-check-label">
                fast
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="accordion-item">
        <h2 className="accordion-header" id="panelsStayOpen-headingThree">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#panelsStayOpen-collapseThree"
            aria-expanded="false"
            aria-controls="panelsStayOpen-collapseThree"
          >
            Price
          </button>
        </h2>
        <div
          id="panelsStayOpen-collapseThree"
          className="accordion-collapse collapse"
          aria-labelledby="panelsStayOpen-headingThree"
        >
          <div className="accordion-body">
            <div className="form-check">
              <input
                type="range"
                name="price"
                id="price"
                className="form-range rangeInput"
                min={minPrice}
                max={maxPrice}
                defaultValue={maxPrice}
                step="1"
                onChange={setQueryParams}
              />

              <div className="d-flex flex-row justify-content-between">
                <span>&#8364;{minPrice}</span>
                <span>&#8364;{maxPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
