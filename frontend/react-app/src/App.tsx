import PostList from "./components/posts/PostList"
import { Link } from "react-router-dom"

function App() {
  return (
    <>
      <div style={{ margin: "auto", width:"1000px"}}>
        <PostList />
      </div>
    </>
  );
}

export default App;
