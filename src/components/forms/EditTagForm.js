import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTag, editTag, getTagsByID } from "../../services/tagServices";

export const EditTagForm = () => {
  const { tagId } = useParams();
  const [tag, setTag] = useState({
    label: "",
  });

  useEffect(() => {
    getTagsByID(tagId).then((tag) => setTag(tag));
  }, [tagId]);

  let navigate = useNavigate();

  const updateTag = (e) => {
    const copy = { ...tag };
    copy[e.target.id] = e.target.value;

    setTag(copy);
  };

  const handleEditSave = (evt) => {
    evt.preventDefault();
    const copy = { ...tag };
    editTag(copy).then(() => {
      navigate("/tags");
    });
  };

  return (
    <main className="form-parent">
      <form className="form-and-header">
        <div className="h1-div">
          <h1>Edit Tag Form</h1>
        </div>
        <div className="form-container">
          <fieldset className="form-fieldset">
            <div className="form-field">
              <label>Edited Tag:</label>
              <input
                className="input-field"
                id="label"
                onChange={updateTag}
                type="text"
                placeholder="New Tag Name"
                value={tag.label}
                required
              />
            </div>
          </fieldset>
          <div className="button-div">
            <button className="cancel-button" onClick={handleEditSave}>
              Save Edit
            </button>
            <button className="cancel-button" onClick={() => navigate("/tags")}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};
