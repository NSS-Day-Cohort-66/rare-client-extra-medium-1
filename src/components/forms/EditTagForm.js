import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createTag, editTag, getTagsByID } from "../../services/tagServices";

export const EditTagForm = () => {
    const { tagId } = useParams()
  const [tag, setTag] = useState({
    label: ""
  })

  useEffect(() => {
    getTagsByID(tagId).then(tag => setTag(tag))
  }, [tagId])

  let navigate = useNavigate();

  const updateTag = (e) => {
    const copy = {...tag};
    copy[e.target.id] = e.target.value;

    setTag(copy);
  }

  const handleEditSave = (evt) => {
    evt.preventDefault();
    const copy = {...tag};
    editTag(copy).then(() => {
      navigate("/tags");
    });
  }


  return (
    <main className="category-form-parent">
      <form>
        <h1>Edit Tag Form</h1>
        <div>
          <fieldset className="category-form-fieldset">
            <div>
              <label>Edited Tag:</label>
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
              <button className="save-button" onClick={handleEditSave}>
                Save Edit
              </button>
            </div>
          </fieldset>
        </div>
      </form>
    </main>
  )
}

