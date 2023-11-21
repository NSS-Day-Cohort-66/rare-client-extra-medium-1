import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { Home } from "../pages/Home"
import { CategoryList } from "../pages/CategoryList"
import { PostList } from "../pages/PostList"
import { TagList } from "../pages/TagList"
import { CategoryForm } from "../components/forms/CategoryForm"
import { PostDetail } from "../pages/PostDetail"
import { MyPosts } from "../pages/MyPosts";
import { TagList } from "../pages/TagList";
import { CategoryForm } from "../components/forms/CategoryForm";
import { TagForm } from "../components/forms/TagForm"
import { PostForm } from "../components/forms/PostForm";

export const ApplicationViews = ({ token, setToken }) => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route element={<Authorized token={token} />}>
          {/* Add Routes here */}
          <Route path="/" element={<Home setToken={setToken} />} />
          <Route
            path="/categories"
            element={<CategoryList token={token} setToken={setToken} />}
          />
          <Route
            path="/postLists"
            element={<PostList token={token} setToken={setToken} />}
          />
        <Route path="/postLists/:postId" element={<PostDetail token={token} setToken={setToken} />} />
          <Route
            path="/create-post"
            element={<PostForm token={token} setToken={setToken} />}
          />
          <Route
            path="/myPosts"
            element={<MyPosts token={token} setToken={setToken} />}
          />
          <Route
            path="/tags"
            element={<TagList token={token} setToken={setToken} />}
          />
          <Route
            path="/create-category"
            element={<CategoryForm token={token} setToken={setToken} />}
          />
          <Route path="/create-tag" element={<TagForm token={token} setToken={setToken} />} />
      </Route>
      </Routes>
    </>
  );
};
