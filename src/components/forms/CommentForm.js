import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createComments } from "../../services/commentService";

export const CommentForm = () => {
  const { postId } = useParams();
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
      navigate(`/postList/${comment.post}/commentList`);
    });
  };

  return (
    <main className="form-parent">
      <form className="form-and-header">
        <div className="h1-div">
          <h1>New Comment Form</h1>
        </div>
        <div className="form-container">
          <fieldset className="form-fieldset">
            <div className="form-field">
              <label>New Comment:</label>
              <input
                className="input-field"
                id="content"
                onChange={updateComment}
                type="text"
                placeholder="Comment here"
                value={comment.content}
                required
              />
            </div>
          </fieldset>
            <div className="button-div">
              <button className="cancel-button" onClick={handleSave}>
                submit
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
