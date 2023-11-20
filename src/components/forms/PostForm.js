import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/postServices";

export const PostForm = () => {
  const [post, setPost] = useState({})

  let navigate = useNavigate();

  const updateCategory = (e) => {
    const copy = {...post};
    copy[e.target.id] = e.target.value;

    setPost(copy);
  }

  const handleSave = (evt) => {
    evt.preventDefault();

    const newPost = {
      label: post.label
    }
    createPost(newPost).then(() => {
      navigate("/posts");
    });
  }


  return (
    <main className="post-form-parent">
      <form>
        <h1>New Post Form</h1>
        <div>
          <fieldset className="post-form-fieldset">
            <div>
              <label>New Post:</label>
              <input
              id='title'
              onChange={updateCategory}
              type="text"
              placeholder=""
              value={post.title}
              required
              />
            </div>
            <div>
              <label>Image:</label>
              <input
              id='image_url'
              onChange={updateCategory}
              type="text"
              placeholder=""
              value={post.image_url}
              required
              />
            </div>
            <div>
              <label>Image:</label>
              <input
              id='content'
              onChange={updateCategory}
              type="textarea"
              placeholder=""
              value={post.content}
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

