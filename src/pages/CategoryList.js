import { useEffect, useState } from "react";
import { getCategories } from "../services/categoryServices";

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
      <div>
        <h1>Here are the Categories!</h1>
      </div>

      <div className="content">
        {categories && categories.length ? (
          categories.map((category) => (
            <div key={category.id}>
              <div>
                <h4>{category.label}</h4>
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
