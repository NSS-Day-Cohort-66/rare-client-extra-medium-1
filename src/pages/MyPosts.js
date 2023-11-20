import { useEffect, useState } from "react";
import "./pages.css";
import { getAllPosts } from "../services/postServices";

export const MyPosts = ({ setToken, token }) => {
  const [myPosts, setMyPosts] = useState([]);

  const getAndSetMyPosts = () => {
    getAllPosts().then((postsArray) => {
      const filteredArray = postsArray.filter((post) => post.is_owner === true);
      const sortedArray = filteredArray.sort((a, b) => {
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
