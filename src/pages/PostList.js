import { useEffect, useState } from "react";
import { getAllPosts } from "../services/postServices";

export const PostList = ({ setToken, token }) => {
  const [posts, setPosts] = useState([]);

  const getAndSetPosts = () => {
    getAllPosts().then((postsArray) => {
      setPosts(postsArray);
    });
  };

  useEffect(() => {
    getAndSetPosts();
  }, []);

  return (
    <>
      <div>
        <h1>Here are the Posts!</h1>
      </div>

      <div className="content">
        {posts && posts.length ? (
          posts.map((post) => (
            <div key={post.id}>
              <div>
                <h4>
                  Title: {post.title}
                  <br />
                  Author: {post.author}
                  <br />
                  Category: {post.category}
                </h4>
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
