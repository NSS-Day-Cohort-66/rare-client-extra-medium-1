import { useState, useEffect } from "react";
import { getCategoryById, editCategory } from "../../services/categoryServices";
import { useNavigate, useParams } from "react-router-dom";

export const CategoryEdit = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState({
    label: "",
  });

  useEffect(() => {
    getCategoryById(categoryId).then((categoryData) =>
      setCategory(categoryData)
    );
  }, [categoryId]);

  let navigate = useNavigate();

  const updateCategoryLocal = (e) => {
    const copy = { ...category };
    copy[e.target.id] = e.target.value;
    setCategory(copy);
  };

  const handleSave = (evt) => {
    evt.preventDefault();
    const copy = { ...category };
    editCategory(copy).then(() => {
      navigate("/categories");
    });
  };

  const handleCancel = () => {
    navigate("/categories");
  };

  return (
    <main className="form-parent">
      <form className="form-and-header">
        <div className="h1-div">
          <h1>Edit Category</h1>
        </div>
        <div className="form-container">
          <fieldset className="form-fieldset">
            <div className="form-field">
              <label>Edit Category:</label>
              <input
                className="input-field"
                id="label"
                onChange={updateCategoryLocal}
                type="text"
                placeholder="..."
                value={category.label}
                required
              />
            </div>
          </fieldset>
            <div className="button-div">
              <button className="cancel-button" onClick={handleSave}>
                Save
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
            </div>
        </div>
      </form>
    </main>
  );
};
