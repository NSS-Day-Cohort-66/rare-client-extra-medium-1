export const getComments = () => {
  return fetch(`http://localhost:8000/comments`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export const createComments = (comment) => {
  return fetch(`http://localhost:8000/comments`, {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("auth_token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  }).then((res) => res.json());
};

export const deleteComment = (commentId) => {
  return fetch(`http://localhost:8000/comments/${commentId}`, 
  {
      method: "DELETE",
      headers: {
          Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
  })
}