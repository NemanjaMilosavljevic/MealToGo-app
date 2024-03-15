const AdminPage = () => {
  return (
    <div className="container-fluid w-50 my-3">
      <form className="row g-3">
        <div className="col-md-6">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input type="text" className="form-control" id="title" required />
        </div>

        <div className="col-md-6">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input type="number" className="form-control" id="price" required />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            required
          ></textarea>
        </div>

        <div className="col-md-4">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select id="category" className="form-select" required>
            <option selected aria-readonly>
              Category
            </option>
            <option value="buttonreakfast">Breakfast</option>
            <option value="main-dishes">Main dish</option>
            <option value="salads">Salads</option>
            <option value="desserts">Desserts</option>
            <option value="side-dishes">Side dish</option>
          </select>
        </div>

        <div className="col-md-4">
          <label htmlFor="subcategory" className="form-label">
            Subcategory
          </label>
          <select id="subcategory" className="form-select" required>
            <option selected aria-readonly>
              Subcategory
            </option>
            <option value="barbeque">Barbeque</option>
            <option value="pasta">Pasta</option>
            <option value="pizza">Pizza</option>
          </select>
        </div>

        <div className="col-12">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="vegan" />
            <label className="form-check-label" htmlFor="vegan">
              Vegan
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="fasting" />
            <label className="form-check-label" htmlFor="fasting">
              Fasting
            </label>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="fileImage" className="form-label">
            Upload image
          </label>
          <input className="form-control" type="file" id="fileImage" required />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Create meal
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPage;
