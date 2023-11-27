import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createComments } from "../../services/commentService";

export const CommentForm = () => {
  const [comment, setComment] = useState({
    content: "",
  });

  let navigate = useNavigate();

  const updateComment = (e) => {
    const copy = { ...comment };
    copy[e.target.id] = e.target.value;

    setComment(copy);
  };

  const handleSave = (evt) => {
    evt.preventDefault();

    const newComment = {
      content: comment.content,
    };
    createComments(newComment).then(() => {
      navigate("/comments");
    });
  };

  return (
    <main className="category-form-parent">
      <form>
        <h1>New Comment Form</h1>
        <div>
          <fieldset className="category-form-fieldset">
            <div>
              <label>New Comment:</label>
              <input
                id="content"
                onChange={updateComment}
                type="text"
                placeholder="..."
                value={comment.content}
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
  );
};
