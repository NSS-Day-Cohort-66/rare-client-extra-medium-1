import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../services/postServices";

export const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    getPostById(postId).then((post) => {
      setPost(post);
    });
  }, [postId]);

  return (
    <div className="card-item">
      {post ? (
            <div className="card-item" key={post.id}>
                <h4>
                  Title: {post.title}
                  <br />
                  Author: {post.rare_user.user.username}
                  <br />
                  Category: {post.category.label}
                </h4>
            </div>
        
        ) : (
          <p>No post found.</p>
        )}
    </div>
  );
}