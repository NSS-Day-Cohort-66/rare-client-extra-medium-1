import { useEffect, useState } from "react";
import { getTags } from "../services/tagServices";

export const TagList = ({ setToken, token }) => {
  const [tags, setTags] = useState([]);
  const [sortedTags, setSortedTags] = useState([])

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

  return (
    <>
      <div className="h1">
        Here are the Tags!
      </div>

      <div className="content">
        {sortedTags && sortedTags.length ? (
          sortedTags.map((tag) => (
            <div className="card-item" key={tag.id}>
              <div>
                <h3>{tag.label}</h3>
                <button>Edit</button>
                <button>Delete</button>
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