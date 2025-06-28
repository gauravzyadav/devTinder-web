import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"

import Body from "./components/Body"
import LandingPage from "./components/LandingPage"
import Feed from "./components/Feed"
import Login from "./components/Login"
import Profile from "./components/Profile"
import Connections from "./components/Connections"
import Request from "./components/Request"
//import Chat from "./components/Chat"

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          {/* Landing page without Body layout (has its own navbar) */}
          <Route path="/" element={<LandingPage />} />

          {/* All other routes with Body layout */}
          <Route path="/" element={<Body />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connections" element={<Connections />} />
            <Route path="/requests" element={<Request />} />  
            {/* <Route path="/chat/:targetUserId" element={<Chat />} />   */}
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
