import { useEffect, useState } from "react";
import { getCategories } from "../services/categoryServices";
import "./pages.css"

export const CategoryList = ({ setToken, token }) => {
  const [categories, setCategories] = useState([]);

  const getAndSetCategories = () => {
    getCategories().then((categoriesArray) => {
      setCategories(categoriesArray);
    });
  };

  useEffect(() => {
    getAndSetCategories();
  }, []);

  return (
    <>
      <div className="h1">
        Here are the Categories!
      </div>

      <div className="content">
        {categories && categories.length ? (
          categories
            .slice() // Create a copy of the array to avoid modifying the original
            .sort((a, b) => a.label.localeCompare(b.label)) // Sort alphabetically
            .map((category) => (
              <div className="card-item" key={category.id}>
                <div>
                  <h3>{category.label}</h3>
                  <button>Edit</button>
                  <button>Delete</button>
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
