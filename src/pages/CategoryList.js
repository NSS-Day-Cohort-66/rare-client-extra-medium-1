import { useEffect, useState } from "react";
import { deleteCategory, getCategories } from "../services/categoryServices.js";
import "./pages.css";
import { useNavigate } from "react-router-dom";

export const CategoryList = ({ setToken, token }) => {
  const [categories, setCategories] = useState([]);

  let navigate = useNavigate();

  const getAndSetCategories = () => {
    getCategories().then((categoriesArray) => {
      setCategories(categoriesArray);
    });
  };

  useEffect(() => {
    getAndSetCategories();
  }, []);

  const handleUpdate = (categoryId) => {
    navigate(`/categories/${categoryId}/edit`);
  };

  const handleDelete = (categoryId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmDelete) {
      deleteCategory(categoryId).then(() => {
        getAndSetCategories();
      });
    }
  };

  return (
    <>
      <div className="page-title">Categories</div>
      <button className="btn-div" onClick={() => navigate("/create-category")}>
        ADD NEW CATEGORY
      </button>
      <div className="content">
        {categories && categories.length ? (
          categories
            .slice() // Create a copy of the array to avoid modifying the original
            .sort((a, b) => a.label.localeCompare(b.label)) // Sort alphabetically
            .map((category) => (
              <div className="category-item" key={category.id}>
                <div className="card-label">{category.label}</div>
                <div className="cat-btn-div">
                  <button onClick={() => handleUpdate(category.id)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(category.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))
        ) : (
          <p>No categories found.</p>
        )}
      </div>
    </>
  );
};
