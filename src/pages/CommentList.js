import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./pages.css";
import { getComments } from "../services/commentService";

export const CommentList = ({ setToken, token }) => {
  //   const { postId } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments().then((data) => {
      setComments(data);
    });
  }, []);

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
