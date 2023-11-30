import { useState } from "react";
import { createCategory } from "../../services/categoryServices";
import { useNavigate } from "react-router-dom";
import "./forms.css";

export const CategoryForm = () => {
  const [category, setCategory] = useState({
    label: "",
  });

  let navigate = useNavigate();

  const updateCategory = (e) => {
    const copy = { ...category };
    copy[e.target.id] = e.target.value;

    setCategory(copy);
  };

  const handleSave = (evt) => {
    evt.preventDefault();

    const newCategory = {
      label: category.label,
    };
    createCategory(newCategory).then(() => {
      navigate("/categories");
    });
  };

  return (
    <main className="form-parent">
      <form className="form-and-header">
        <div className="h1-div">
          <h1>New Category Form</h1>
        </div>
        <div className="form-container">
          <fieldset className="form-fieldset">
            <div className="form-field">
              <label>New Category:</label>
              <input
                className="input-field"
                id="label"
                onChange={updateCategory}
                type="text"
                placeholder="Category Name"
                value={category.label}
                required
              />
            </div>
          </fieldset>
            <div className="button-div">
              <button className="save-button" onClick={handleSave}>
                Submit Category
              </button>
            </div>
        </div>
      </form>
    </main>
  );
};
