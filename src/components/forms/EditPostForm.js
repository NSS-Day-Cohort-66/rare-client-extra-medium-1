import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategories } from "../../services/categoryServices";
import { editPost, getPostById } from "../../services/postServices";


export const EditPostForm = () => {
  const [categoryLabel, setCategoryLabel] = useState([])
  const [post, setPost] = useState({});

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

//   const postPost = async (evt) => {
//     evt.preventDefault();
  
//     // Retrieve the token from localStorage
//     const authToken = localStorage.getItem("auth_token");
  
//     // Check if the token is present
//     if (!authToken) {
//       console.error("Rock token not found in localStorage");
//       return;
//     }
  
//     try {
//       // Send a POST request to create a new post
//       const response = await fetch("http://localhost:8000/posts", {
//         method: "PUT",
//         headers: {
//           Authorization: `Token ${localStorage.getItem("auth_token")}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ...post, }),
//       });
  
//       if (!response.ok) {
//         console.error("Error posting post:", response.statusText);
//         return;
//       }
  
//       // Parse the response to get the newly created post's ID
//       const createdPost = await response.json();
//       const postId = createdPost.id;
  
//       // Navigate to the detail page of the created post
//       navigate(`/postLists/${postId}`);
//     } catch (error) {
//       console.error("Error posting post:", error);
//     }
//   };
const handleSave = (event) => {
    event.preventDefault()

    const updatedItem = {
        title: post.title,
        image_url: post.image_url,
        content: post.content,
        approved: true,
        category: post.category,
        tags: post.tags
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
        </fieldset>
        </div>
        <button onClick={handleSave}>Edit Post</button>
      </form>
    </main>
  );
};
