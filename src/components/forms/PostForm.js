import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../../services/categoryServices";
import { getTags } from "../../services/tagServices";


export const PostForm = () => {
  const [categoryLabel, setCategoryLabel] = useState([])
  const [chosenTags, updateChosen] = useState(new Set())
  const [tagLabels, setTagLabels] = useState([])
  const [post, setPost] = useState({
    title: "",
    image_url: "",
    content: "",
    publication_date: new Date(),
    approved: true,
    category: 0
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

  const updateCategory = (e) => {
    const copy = { ...post };
    copy.category = e.target.value;
    setPost(copy);
  };

  const handleTagChosen = (c) => {
    const copy = new Set(chosenTags)
    copy.has(c.id) ? copy.delete(c.id) : copy.add(c.id)
    updateChosen(copy)
  }

  const postPost = async (evt) => {
    evt.preventDefault();
  
    // Retrieve the token from localStorage
    const authToken = localStorage.getItem("auth_token");
  
    // Check if the token is present
    if (!authToken) {
      console.error("Rock token not found in localStorage");
      return;
    }
  
    try {
      // Send a POST request to create a new post
      const response = await fetch("http://localhost:8000/posts", {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("auth_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...post, tags: Array.from(chosenTags) }),
      });
  
      if (!response.ok) {
        console.error("Error posting post:", response.statusText);
        return;
      }
  
      // Parse the response to get the newly created post's ID
      const createdPost = await response.json();
      const postId = createdPost.id;
  
      // Navigate to the detail page of the created post
      navigate(`/postLists/${postId}`);
    } catch (error) {
      console.error("Error posting post:", error);
    }
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
                placeholder="https://example.com"
                value={post.content}
                required
                maxLength={200}
              />Max Characters 200
            </div>
            <fieldset>
              <div className="box-input">
                <div>Category:</div>
                <select
                className="input"
                  name="category"
                  onChange={updateCategory}
                  value={post.category}
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
            <fieldset>
              <div className="form-group">
                <div>Tag:</div>
                {/* Map through categories and render checkboxes */}
                {tagLabels.map((c) => (
                  <div key={c.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={chosenTags.has(c.id)}
                        onChange={() => handleTagChosen(c)}
                      />
                      {c.label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
        </fieldset>
        </div>
        <button onClick={postPost}>Add Post</button>
      </form>
    </main>
  );
};
