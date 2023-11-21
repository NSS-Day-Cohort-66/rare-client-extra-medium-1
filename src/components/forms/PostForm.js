import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../services/postService";
import { getCategories } from "../../services/categoryServices";
import { getTags } from "../../services/tagServices";


export const PostForm = () => {
  const [categoryLabel, setCategoryLabel] = useState([])
  const [tagLabels, setTagLabels] = useState([])
  const [post, setPost] = useState({
    title: "",
    image_url: "",
    content: "",
  });

  let navigate = useNavigate();

  useEffect(() => {
    getCategories().then((categoryArray) => {
      setCategoryLabel(categoryArray)
    })

    getTags().then((tagArray) => {
      setTagLabels(tagArray)
    })
  }, [])

  const updatePost = (e) => {
    const copy = { ...post };
    copy[e.target.id] = e.target.value;
    setPost(copy);
  };

  const handleSave = (evt) => {
    evt.preventDefault();

    const newPost = {
      title: post.title,
      image_url: post.image_url,
      content: post.content,
    };

    createPost(newPost).then(() => {
      navigate("/posts");
    });
  };

  return (
    <main className="post-form-parent">
      <form>
        <h1>New Post Form</h1>
        <div>
          <fieldset className="post-form-fieldset">
            <div>
              <label>New Post:</label>
              <input
                id="title"
                onChange={updatePost}
                type="text"
                placeholder=""
                value={post.title}
                required
              />
            </div>
            <div>
              <label>Image:</label>
              <input
                id="image_url"
                onChange={updatePost}
                type="text"
                placeholder=""
                value={post.image_url}
                required
              />
            </div>
            <div>
              <label>Content:</label>
              <textarea
                id="content"
                onChange={updatePost}
                placeholder=""
                value={post.content}
                required
              />
            </div>
            <fieldset>
              <div className="box-input">
                <div>Category:</div>
                <select
                className="input"
                  name="category_id"
                  onChange={updatePost}
                  value={post.category_id}
                >
                  <option value={0}>Please select a Category</option>
                  {categoryLabel.map((typeObj) => {
                    return (
                      <option key={typeObj.id} value={typeObj.id}>
                        {typeObj.label}
                      </option>
                    )
                  })}
                </select>
              </div>
            </fieldset>
            {/* <fieldset>
              <div className="box-input">
                <div>Tags:</div>
                <select
                className="input"
                  name="foodPriceId"
                  onChange={handleInputChange}
                  value={newPost.foodPriceId}
                >
                  <option value={0}>Please select a food price</option>
                  {tagLabels.map((priceObj) => {
                    return (
                      <option key={priceObj.id} value={priceObj.id}>
                        {priceObj.price}
                      </option>
                    )
                  })}
                </select>
              </div> */}
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
