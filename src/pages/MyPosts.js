import { useEffect, useState } from "react";
import { getMyPosts } from "../services/postService";

export const MyPosts = ({ setToken, token }) => {
  const [myPosts, setMyPosts] = useState([]);

  const getAndSetMyPosts = () => {
    getMyPosts().then((postsArray) => {
      const sortedArray = postsArray.sort((a, b) => {
        return new Date(b.publication_date) - new Date(a.publication_date);
      });
      setMyPosts(sortedArray);
    });
  };

  useEffect(() => {
    getAndSetMyPosts();
  }, []);

  return (
    <>
      <div>
        <h1>Here are my posts!</h1>
      </div>

      <div className="content">
        {myPosts && myPosts.length ? (
          myPosts.map((post) => (
            <div key={post.id}>
              <div>
                <h4>{post.title}</h4>
                <h4>Publication Date: {post.publication_date}</h4>
                <img src={post.image_url} alt={post.title} width="400px"></img>
                <h4>{post.content}</h4>
                <h4>Author: {post.rare_user.user.username}</h4>
                <h4>Reaction Count: {post.tags.length}</h4>
                <h4>Category: {post.category.label}</h4>
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
