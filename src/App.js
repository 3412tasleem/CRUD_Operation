import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import View from "./components/student/View";

// import Create from "../src/components/crud_folder/Create.js";
import List from "./components/student/List";
import Edit from "./components/student/Edit";
function App() {
  return (
    <>
      {/* <Create />{" "} */}
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/List" component={List} />
          <Route exact path="/view/:id" component={View} />
          <Route exact path="/edit/:id" component={Edit} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
