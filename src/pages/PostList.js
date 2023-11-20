import { useEffect, useState } from "react";
import { getAllPosts } from "../services/postServices";

export const PostList = ({ setToken, token }) => {
  const [posts, setPosts] = useState({});

  const getAndSetPosts = () => {
    getAllPosts().then((postsArray) => {
      // Filter posts with a publication date in the past
      const filteredPosts = postsArray.filter(
        (post) => new Date(post.publication_date) < new Date()
      );

      // Sort the filtered posts by publication date in descending order
      const sortedPosts = filteredPosts.sort(
        (a, b) => new Date(b.publication_date) - new Date(a.publication_date)
      );

      setPosts(sortedPosts);
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
                  Author: {post.rare_user.user.username}
                  <br />
                  Category: {post.category.label}
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
