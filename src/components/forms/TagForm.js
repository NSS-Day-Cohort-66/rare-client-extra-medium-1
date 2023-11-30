import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTag } from "../../services/tagServices";
import "./forms.css";

export const TagForm = () => {
  const [tag, setTag] = useState({
    label: "",
  });

  let navigate = useNavigate();

  const updateTag = (e) => {
    const copy = { ...tag };
    copy[e.target.id] = e.target.value;

    setTag(copy);
  };

  const handleSave = (evt) => {
    evt.preventDefault();

    const newTag = {
      label: tag.label,
    };
    createTag(newTag).then(() => {
      navigate("/tags");
    });
  };

  return (
    <main className="form-parent">
      <form className="form-and-header">
        <div className="h1-div">
          <h1>New Tag Form</h1>
        </div>
        <div className="form-container">
          <fieldset className="form-fieldset">
            <div className="form-field">
              <label>New Tag:</label>
              <input
                className="input-field"
                id="label"
                onChange={updateTag}
                type="text"
                placeholder="Tag Name"
                value={tag.label}
                required
              />
            </div>
          </fieldset>
          <div className="button-div">
            <button className="save-button" onClick={handleSave}>
              Submit Tag
            </button>
            <button className="cancel-button" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};
