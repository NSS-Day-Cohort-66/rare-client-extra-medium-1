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
      <div>
        <h1>Here are the Categories!</h1>
      </div>

      <div className="content">
        {sortedTags && sortedTags.length ? (
          sortedTags.map((tag) => (
            <div key={tag.id}>
              <div>
                <h4>{tag.label}</h4>
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
