import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./pages.css";
import { getComments } from "../services/commentService";

export const CommentList = ({ setToken, token }) => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments().then((data) => {
      const filteredComments = data.filter(
        (comment) => comment.post.id === parseInt(postId)
      );
      setComments(filteredComments);
    });
  }, [postId]);
  return (
    <>
      <div className="h1">Here are the Comments!</div>
      <div className="content">
        {comments.map((comment) => {
          return (
            <div className="card-item" key={comment.id}>
              <div>
                <h3>{comment.content}</h3>
                <h3>{comment.created_on}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
