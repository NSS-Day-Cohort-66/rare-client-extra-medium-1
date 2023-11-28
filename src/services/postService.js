export const getMyPosts = () => {
  return fetch(`http://localhost:8000/posts?owner=current`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
