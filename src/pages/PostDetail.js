import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../services/postServices";
import { getTags } from "../services/tagServices";

export const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(postId).then((post) => {
      setPost(post);
      if (post.tags) {
        setSelectedTags(new Set(post.tags.map((tag) => tag.id)));
      }
    });

    getTags().then((tagsArray) => setTags(tagsArray));
  }, [postId]);

  const handleSelectedTag = (tag) => {
    const copy = new Set(selectedTags);
    copy.has(tag.id) ? copy.delete(tag.id) : copy.add(tag.id);
    setSelectedTags(copy);
  };

  const saveNewTags = async (event) => {
    event.preventDefault();
    const postCopy = { ...post };
    postCopy.tags = Array.from(selectedTags);

    const updatedPost = {
      category: postCopy.category.id,
      title: postCopy.title,
      image_url: postCopy.image_url,
      content: postCopy.content,
      approved: postCopy.approved,
      tags: postCopy.tags,
    };
    // debugger
    await fetch(`http://localhost:8000/posts/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    });
    navigate(-1);
  };

  return (
    <>
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
      <div className="tag-container" key={tags.id}>
        {tags
          ? tags.map((tag) => (
              <div>
                <input
                  type="checkbox"
                  checked={selectedTags.has(tag.id)}
                  onChange={() => handleSelectedTag(tag)}
                />
                {tag.label}
              </div>
            ))
          : "No tags found"}
      </div>
      <div className="btn-div">
        <button className="save-tag-btn" onClick={saveNewTags}>
          Save Tag Selection
        </button>
      </div>
      <div className="btn-div" key={postId}>
        <button onClick={() => navigate(`/create-comment/${postId}`)}>
          Add New Comment
        </button>
      </div>
    </>
  );
};
