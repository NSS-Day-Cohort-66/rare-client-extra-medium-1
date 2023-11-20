import { useState } from "react";
import { createCategory } from "../../services/categoryServices";
import { useNavigate } from "react-router-dom";

export const CategoryForm = () => {
  const [category, setCategory] = useState({
    label: ""
  })

  let navigate = useNavigate();

  const updateCategory = (e) => {
    const copy = {...category};
    copy[e.target.id] = e.target.value;

    setCategory(copy);
  }

  const handleSave = (evt) => {
    evt.preventDefault();

    const newCategory = {
      label: category.label
    }
    createCategory(newCategory).then(() => {
      navigate("/categories");
    });
  }


  return (
    <main className="category-form-parent">
      <form>
        <h1>New Category Form</h1>
        <div>
          <fieldset className="category-form-fieldset">
            <div>
              <label>New Category:</label>
              <input
              id='label'
              onChange={updateCategory}
              type="text"
              placeholder="..."
              value={category.label}
              required
              />
            </div>
            <div>
              <button className="save-button" onClick={handleSave}>
                submit
              </button>
            </div>
          </fieldset>
        </div>
      </form>
    </main>
  )
}

