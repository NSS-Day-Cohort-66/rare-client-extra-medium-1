import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById } from "../services/postServices";
import { getTags } from "../services/tagServices";

export const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState(new Set());
  const navigate = useNavigate();
  const manageTags = useRef();

  useEffect(() => {
    getTags().then((tagsArray) => setTags(tagsArray));
  }, []);

  useEffect(() => {
    getPostById(postId).then((post) => {
      setPost(post);
      if (post.tags) {
        setSelectedTags(new Set(post.tags.map((tag) => tag.id)));
      }
    });
  }, [postId, tags]);

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
    getTags().then((tagsArray) => setTags(tagsArray));
    manageTags.current.close();
    // navigate(0)
  };

  const handleManageTags = () => {
    if (manageTags.current) {
      manageTags.current.showModal();
    }
  };

  const handleCloseTags = () => {
    if (manageTags.current) {
      manageTags.current.close();
    }
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
              <br />
              Tags:{" "}
              {post.tags.map((tag) => (
                <li>{tag.label}</li>
              ))}
            </h4>
          </div>
        ) : (
          <p>No post found.</p>
        )}
      </div>
      {post?.is_owner ? (
        <div className="manage-tags-div">
          <button className="manage-tags-button" onClick={handleManageTags}>
            Manage Tags
          </button>
        </div>
      ) : (
        ""
      )}
      <dialog className="manage-tags" ref={manageTags}>
        <div className="tag-container">
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
          <button className="save-tag-btn" onClick={handleCloseTags}>
            Close
          </button>
        </div>
      </dialog>
      <div className="btn-div" key={postId}>
        <button onClick={() => navigate(`/create-comment/${postId}`)}>
          Add New Comment
        </button>
      </div>
    </>
  );
};
