import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTag } from "../../services/tagServices";

export const TagForm = () => {
  const [tag, setTag] = useState({
    label: ""
  })

  let navigate = useNavigate();

  const updateTag = (e) => {
    const copy = {...tag};
    copy[e.target.id] = e.target.value;

    setTag(copy);
  }

  const handleSave = (evt) => {
    evt.preventDefault();

    const newTag = {
      label: tag.label
    }
    createTag(newTag).then(() => {
      navigate("/tags");
    });
  }


  return (
    <main className="category-form-parent">
      <form>
        <h1>New Tag Form</h1>
        <div>
          <fieldset className="category-form-fieldset">
            <div>
              <label>New Tag:</label>
              <input
              id='label'
              onChange={updateTag}
              type="text"
              placeholder="..."
              value={tag.label}
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

