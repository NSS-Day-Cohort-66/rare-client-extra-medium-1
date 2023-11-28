import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./pages.css";
import { getComments } from "../services/commentService";

export const CommentList = ({ setToken, token }) => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments().then((data) => {
      console.log("postId:", postId); // Log the postId
      console.log("data:", data); // Log the fetched data
      const filteredComments = data.filter(
        (comment) => comment.post.id === postId
      );
      console.log("filteredComments:", filteredComments);
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
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
