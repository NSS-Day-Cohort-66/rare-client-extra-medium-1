import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./pages.css";
import { getComments } from "../services/commentService";
import { getPostByPostId } from "../services/postServices";

export const CommentList = ({ setToken, token }) => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState({});

  useEffect(() => {
    getPostByPostId(postId).then((data) => {
      setPost(data);
    });
  }, [postId]);

  useEffect(() => {
    getComments().then((data) => {
      console.log(data);
      const filteredComments = [
        ...data.filter((comment) => comment.post.id === parseInt(postId)),
      ];

      filteredComments.sort(
        (a, b) => new Date(b.created_on) - new Date(a.created_on)
      );
      setComments(filteredComments);
      console.log(filteredComments);
    });
  }, [postId]);
  return (
    <>
      <div className="h1">{post.title}</div>
      <Link
        style={{ textDecoration: "none", color: "rgb(79, 17, 146)" }}
        post={post}
        key={post.id}
        to={`/postLists/${post.id}`}
      >
        <div>Go Back to Post</div>
      </Link>
      <div className="content">
        {comments.length === 0 ? (
          <p>No comments to display.</p>
        ) : (
          comments.map((comment) => {
            return (
              <div className="card-item" key={comment.id}>
                <div>
                  <h3>{comment.content}</h3>
                  <h3>Author: {comment.author?.user?.username}</h3>
                  <h3>{comment.created_on}</h3>
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};
