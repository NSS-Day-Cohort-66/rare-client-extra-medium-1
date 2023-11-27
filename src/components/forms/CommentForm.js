import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createComments } from "../../services/commentService";

export const CommentForm = ({ postId }) => {
  const [comment, setComment] = useState({
    post: postId,
    content: "",
    created_on: new Date(),
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
      post: comment.post,
      content: comment.content,
      created_on: comment.created_on,
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
