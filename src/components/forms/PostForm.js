import { useState } from "react";
import { createCategory } from "../../services/categoryServices";
import { useNavigate } from "react-router-dom";

export const CategoryForm = () => {
  const [post, setPost] = useState({})

  let navigate = useNavigate();

  const updateCategory = (e) => {
    const copy = {...post};
    copy[e.target.id] = e.target.value;

    setPost(copy);
  }

  const handleSave = (evt) => {
    evt.preventDefault();

    const newCategory = {
      label: post.label
    }
    createCategory(newCategory).then(() => {
      navigate("/posts");
    });
  }


  return (
    <main className="post-form-parent">
      <form>
        <h1>New Category Form</h1>
        <div>
          <fieldset className="post-form-fieldset">
            <div>
              <label>New Category:</label>
              <input
              id='label'
              onChange={updateCategory}
              type="text"
              placeholder=""
              value={post.label}
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

