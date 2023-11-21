import { useEffect, useState } from "react";
import { getAllPosts } from "../services/postServices";
import { Link, useNavigate } from "react-router-dom";

export const PostList = ({ setToken, token }) => {
  const [posts, setPosts] = useState({});

  const navigate = useNavigate()

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
      <div className="h1">
        Here are the Posts!
      </div>

      <div>
        {posts && posts.length ? (
          posts.map((post) => (
            <div className="card-item" key={post.id}>
              <Link to={`/postLists/${post.id}`}>
                <h4>
                  Title: {post.title}
                  <br />
                  Author: {post.rare_user.user.username}
                  <br />
                  Category: {post.category.label}
                  <br />
                  Tags: <div className="tag-div">
                    {post.tags.map(tag => 
                    <div className="tag-label">{tag.label}</div>
                  )}
                    </div>
                </h4>
              </Link>
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
        <button onClick={ () => navigate("/create-post")}>NEW POST</button>
      </div>
    </>
  );
};
