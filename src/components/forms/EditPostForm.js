import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../services/categoryServices";
import { editPost, getPostById } from "../../services/postServices";


export const EditPostForm = () => {
  const [categoryLabel, setCategoryLabel] = useState([])
  const [post, setPost] = useState({
    title: "",
    image_url: "",
    content: "",
    publication_date: new Date(),
    approved: true,
    category: 0
  });

  const { postId } = useParams()

  let navigate = useNavigate();

  useEffect(() => {
    getCategories().then((categoryArray) => {
      setCategoryLabel(categoryArray)
    })
  }, [])

  useEffect(() => {
    getPostById(postId).then((postObj) => {
      setPost(postObj)
    })
  }, [postId])

  const updatePost = (e) => {
    const copy = { ...post };
    copy[e.target.id] = e.target.value;
    setPost(copy);
  };

  const updateCategory = (e) => {
    const copy = { ...post };
    copy.category = e.target.value;
    setPost(copy);
  };
  
  const handleCancel = () => {
    navigate("/postLists");
  }; 
  
  const handleSave = (event) => {
    event.preventDefault()
  
    const updatedItem = {
      id: post.id, // Add this line
      title: post.title,
      image_url: post.image_url,
      content: post.content,
      approved: true,
      category: post.category.id
    }
  
    editPost(updatedItem).then(() => {
      navigate(`/postLists/${postId}`)
    })

  }
 

  return (
    <main className="post-form-parent">
      <form>
        <h1>Edit Post Form</h1>
        <div>
          <fieldset className="post-form-fieldset">
            <div>
              <label>Title:</label>
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
                maxLength={200}
              />Max Characters 200
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
                  name="category"
                  onChange={updateCategory}
                  value={post.category.id}
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
        </fieldset>
        </div>
        <button onClick={handleSave}>Edit Post</button>
        <button className="cancel-button" onClick={handleCancel}>Cancel</button>
      </form>
    </main>
  );
};
