import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../layout/layout";
import Home from "pages/Home/Home";
import Post from "pages/Post/Post";
import Advertising from "pages/Advertising/Advertising";

const AppRoute = () => {
  return (
    <Router>
      {/* <MyComponent> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/:id" element={<Post />} />
          <Route path="/Advertising" element={<Advertising />} />
        </Route>
      </Routes>
      
      {/* </MyComponent> */}
    </Router>
  );
};

export default AppRoute;