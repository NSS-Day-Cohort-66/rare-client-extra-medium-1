import { useEffect, useState } from "react";
import "./pages.css";
import { getAllPosts, deletePost } from "../services/postServices";


export const MyPosts = ({ setToken, token }) => {
  const [myPosts, setMyPosts] = useState([]);
  const [postToDelete, setPostToDelete] = useState(null);
 
  const getAndSetMyPosts = async () => {
    try {
      const postsArray = await getAllPosts();
      const filteredArray = postsArray.filter((post) => post.is_owner === true);
      const sortedArray = filteredArray.sort((a, b) => {
        return new Date(b.publication_date) - new Date(a.publication_date);
      });
      setMyPosts(sortedArray);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
  };

  useEffect(() => {
    if (postToDelete) {
      const handleDeleteConfirmation = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");

        if (confirmDelete) {
          try {
            await deletePost(postToDelete.id);

            // Update the state immediately after successful deletion
            setMyPosts((prevPosts) =>
              prevPosts.filter((post) => post.id !== postToDelete.id)
            );
          } catch (error) {
            console.error("Error deleting post:", error);
          } finally {
            setPostToDelete(null);
          }
        }
      };

      handleDeleteConfirmation();
    }
  }, [postToDelete]);

  useEffect(() => {
    getAndSetMyPosts();
  }, [postToDelete]); // Fetch posts whenever postToDelete changes


  return (
    <>
      <div className="h1">Here are my Posts!</div>
      <div className="content">
        {myPosts && myPosts.length ? (
          myPosts.map((post) => (
            <div key={post.id}>
              <div className="post-item">
                <div className="top-post">
                  <h4 className="post-title">{post.title}</h4>
                  <h4 className="post-date">
                    Publication Date: {post.publication_date}
                  </h4>
                </div>
                <div className="middle_post">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    width="400px"
                  ></img>
                  <h4>Category: {post.category.label}</h4>
                  <h4>{post.content}</h4>
                </div>
                <div className="bottom_post">
                  <h4 className="post-author">
                    Author: {post.rare_user.user.username}
                  </h4>
                  <h4 className="post-reactions">
                    Reaction Count: {post.tags.length}
                  </h4>
                </div>
                <button onClick={() => handleDeleteClick(post)}>
                  Delete Post
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )} 
      </div>
    </>
  );
};
