import { BrowserRouter as Router, Route } from "react-router-dom";
import PostsList from "./components/PostsList";
import PostDetails from "./components/PostDetails";
import PostEdit from "./components/PostEdit";
import PostCreate from "./components/PostCreate";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={PostsList} />
        <Route exact path="/post/:id" component={PostDetails} />
        <Route path="/post/:id/edit" component={PostEdit} />
        <Route path="/posts/create" component={PostCreate} />
      </div>
    </Router>
  );
}

export default App;
