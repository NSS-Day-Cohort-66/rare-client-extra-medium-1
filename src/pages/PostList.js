import { useEffect, useState } from "react";
import { getAllPosts } from "../services/postServices";
import { Link, useNavigate } from "react-router-dom";

export const PostList = ({ setToken, token }) => {
  const [posts, setPosts] = useState({});

  const navigate = useNavigate();

  const getAndSetPosts = () => {
    getAllPosts().then((postsArray) => {
      const filteredPosts = postsArray.filter(
        (post) => new Date(post.publication_date) < new Date()
      );

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
      <div className="h1">Here are the Posts!</div>
      <button className="btn-div" onClick={() => navigate("/create-post")}>
        NEW POST
      </button>
      <div>
        {posts && posts.length ? (
          posts.map((post) => (
            <div className="card-item" key={post.id}>
              <Link to={`/postLists/${post.id}`}>
                <div className="post-details">
                  <div className="post-title">
                  Title: {post.title}
                  </div>
                  <div className="post-author"> 
                  Author: {post.rare_user.user.username}
                  </div>
                  <div className="post-category">
                  Category: {post.category.label}
                  </div>
                  <div>
                  Tags:{" "}
                  </div>
                  <div className="tag-div"> 
                    {post.tags.map((tag) => (
                      <div className="tag-label" key={tag.id}>
                        {tag.label}
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </>
  );
};
