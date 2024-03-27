"use client";

import { createMeal, editMeal } from "@/lib/actions";
import { useFormState } from "react-dom";
import AdminFormButton from "./adminFormButton";
import { useState } from "react";
import "./admin.css";

const AdminForm = ({ editMode, editingMeal }) => {
  const [state, formAction] = useFormState(createMeal, { errorMessage: null });

  const [title, setTitle] = useState(editMode ? editingMeal.title : "");
  const [price, setPrice] = useState(editMode ? editingMeal.price : "");
  const [description, setDescription] = useState(
    editMode ? editingMeal.description : ""
  );
  const [category, setCategory] = useState(
    editMode ? editingMeal.category : ""
  );
  const [subcategory, setSubcategory] = useState(
    editMode ? editingMeal.subcategory : ""
  );
  const [isVegan, setIsVegan] = useState(
    editMode ? (editingMeal.vegan === 1 ? true : false) : false
  );
  const [isFasting, setIsFasting] = useState(
    editMode ? (editingMeal.fasting === 1 ? true : false) : false
  );

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const priceHandler = (e) => {
    setPrice(e.target.value);
  };

  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  };

  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const subcategoryHandler = (e) => {
    setSubcategory(e.target.value);
  };

  const veganHandler = (e) => {
    setIsVegan(e.target.checked ? true : false);
  };

  const fastingHandler = (e) => {
    setIsFasting(e.target.checked ? true : false);
  };

  return (
    <div className="container-fluid admin-form">
      <h1 className="text-center mb-5">
        {editMode ? "Edit meal" : "Add new meal"}
      </h1>
      <form
        className="row justify-content-center g-3"
        action={editMode ? editMeal.bind(null, editingMeal.id) : formAction}
      >
        <div className="col-8 col-lg-6">
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
            value={title}
            onChange={titleHandler}
          />
        </div>

        <div className="col-8 col-lg-6">
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
            value={price}
            onChange={priceHandler}
          />
        </div>

        <div className="mb-3 col-8 col-lg-12">
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
            value={description}
            onChange={descriptionHandler}
          ></textarea>
        </div>

        <div className="col-8 col-lg-6">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            id="category"
            className="form-select"
            name="category"
            required
            value={category}
            onChange={categoryHandler}
          >
            <option value="">Category</option>
            <option value="breakfast">Breakfast</option>
            <option value="main-dishes">Main dish</option>
            <option value="salads">Salads</option>
            <option value="desserts">Desserts</option>
            <option value="side-dishes">Side dish</option>
          </select>
        </div>

        <div className="col-8 col-lg-6">
          <label htmlFor="subcategory" className="form-label">
            Subcategory
          </label>
          <select
            id="subcategory"
            className="form-select"
            name="subcategory"
            value={subcategory}
            onChange={subcategoryHandler}
          >
            <option value="">Subcategory</option>
            <option value="barbeque">Barbeque</option>
            <option value="pasta">Pasta</option>
            <option value="pizza">Pizza</option>
          </select>
        </div>

        <div className="col-8 col-lg-12">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="vegan"
              name="vegan"
              checked={isVegan}
              onChange={veganHandler}
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
              checked={isFasting}
              onChange={fastingHandler}
            />
            <label className="form-check-label" htmlFor="fasting">
              Fasting
            </label>
          </div>
        </div>

        <div className="mb-3 col-8 col-lg-12">
          <label htmlFor="image" className="form-label">
            {editMode ? "Edit image" : "Upload image"}
          </label>
          <input
            className="form-control"
            type="file"
            id="image"
            name="image"
            required={editMode ? false : true}
          />
        </div>

        <div className="d-flex justify-content-end">
          {state.errorMessage && (
            <p className="me-3 mt-2 text-danger error-text">
              {state.errorMessage}
            </p>
          )}
          <AdminFormButton editMode={editMode} />
        </div>
      </form>
    </div>
  );
};

export default AdminForm;
