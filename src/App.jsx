import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

import Body from "./components/Body";
import Landing from "./components/LandingPage";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Request from "./components/Request";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          {/* Shared layout with NavBar & Footer */}
          {/* <Route path="/" element={<Landing />} /> */}
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/feed" element={<Feed />} /> */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Request />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
