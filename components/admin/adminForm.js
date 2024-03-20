"use client";

import { createMeal } from "@/lib/actions";
import { useFormState } from "react-dom";
import AdminFormButton from "./adminFormButton";
import "./admin.css";

const AdminForm = () => {
  const [state, formAction] = useFormState(createMeal, { errorMessage: null });

  return (
    <div className="container-fluid w-50 admin-form">
      <h1 className="text-center mb-5">Add new meal</h1>
      <form className="row g-3" action={formAction}>
        <div className="col-md-6">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            placeholder="Meal title"
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            placeholder="Meal price"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            name="description"
            placeholder="Meal description"
            required
          ></textarea>
        </div>

        <div className="col-md-4">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            className="form-select"
            name="category"
            required
          >
            <option value="">Category</option>
            <option value="breakfast">Breakfast</option>
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
          <select id="subcategory" className="form-select" name="subcategory">
            <option value="">Subcategory</option>
            <option value="barbeque">Barbeque</option>
            <option value="pasta">Pasta</option>
            <option value="pizza">Pizza</option>
          </select>
        </div>

        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="vegan"
              name="vegan"
            />
            <label className="form-check-label" htmlFor="vegan">
              Vegan
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="fasting"
              name="fasting"
            />
            <label className="form-check-label" htmlFor="fasting">
              Fasting
            </label>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Upload image
          </label>
          <input
            className="form-control"
            type="file"
            id="image"
            name="image"
            required
          />
        </div>

        <div className="d-flex justify-content-end">
          <AdminFormButton />
          {state.errorMessage && (
            <p className="ms-5 mt-2 text-danger">{state.errorMessage}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default AdminForm;
