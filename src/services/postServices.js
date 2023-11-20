export const getAllPosts = () => {
    return fetch(`http://localhost:8000/posts`,
    {
        method: "GET",
        headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json"
        }
      }).then((res) => res.json())
      .then((posts) => {
        // Filter and order the posts
        const filteredPosts = posts.filter(
          (post) =>
            post.approved && new Date(post.publicationDate) < new Date()
        );
  
        // Sort the posts by publication date in descending order
        const sortedPosts = filteredPosts.sort(
          (a, b) => new Date(b.publicationDate) - new Date(a.publicationDate)
        );
  
        return sortedPosts;
      });
  };
  