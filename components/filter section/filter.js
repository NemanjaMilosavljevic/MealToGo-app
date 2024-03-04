import "./filter.css";

const Filter = () => {
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
              <label htmlFor="range">Price</label>
              <input
                type="range"
                name="range"
                id="range"
                className="form-range"
                min="50"
                max="100"
                step="1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
