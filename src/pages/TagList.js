import { useEffect, useState } from "react";
import { deleteTag, getTags } from "../services/tagServices.js";
import { useNavigate } from "react-router-dom";

export const TagList = ({ setToken, token }) => {
  const [tags, setTags] = useState([]);
  const [sortedTags, setSortedTags] = useState([])

  let navigate = useNavigate();

  const getAndSetTags = () => {
    getTags().then((categoriesArray) => {
      setTags(categoriesArray);
    });
  };
  
  useEffect(() => {
      getAndSetTags();
    }, []);
    
    useEffect(() => {
      const sorted = [...tags].sort((a, b) => a.label.localeCompare(b.label));
      setSortedTags(sorted);
    }, [tags]);

    const handleDelete = (tagId) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this tag?"
      );
      if (confirmDelete) {
        deleteTag(tagId).then(() => {
          getAndSetTags();
        });
      }
    };

  return (
    <>
      <div className="page-title">Tags</div>
      <button className="btn-div" onClick={ () => navigate("/create-tag")}>ADD NEW TAG</button>
      <div className="content">
        {sortedTags && sortedTags.length ? (
          sortedTags.map((tag) => (
            <div className="card-item" key={tag.id}>
              <div>
                <h3>{tag.label}</h3>
                <button>Edit</button>
                <button onClick={() => handleDelete(tag.id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No Tags found.</p>
        )}
      </div>
    </>
  );
};
