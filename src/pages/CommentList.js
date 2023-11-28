import { useParams } from "react-router-dom";
import { getCommentsByPostId } from "../services/commentService";
import { useEffect, useState } from "react";
import "./pages.css";

export const CommentList = ({ setToken, token }) => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getCommentsByPostId(postId).then((data) => {
      setComments(data);
    });
  }, [postId]);

  return (
    <>
      <div className="h1">Here are the Comments!</div>
      <div className="content">
        {Array.isArray(comments) ? (
          comments.map((comment) => {
            return (
              <div className="card-item" key={comment.id}>
                <div>
                  <h3>{comment.content}</h3>
                </div>
              </div>
            );
          })
        ) : (
          <p>No comments to display.</p>
        )}
      </div>
    </>
  );
};
