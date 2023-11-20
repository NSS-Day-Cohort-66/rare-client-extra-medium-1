const fetchPostsFromAPI = async (showAll) => {
  let url = "http://localhost:8000/posts";

  if (showAll !== true) {
    url = "http://localhost:8000/posts?owner=current";
  }
  const response = await fetch(url, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("rock_token")).token
      }`,
    },
  });
  const posts = await response.json();
  setPostsState(posts);
};
