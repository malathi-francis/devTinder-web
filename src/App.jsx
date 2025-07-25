import { BrowserRouter, Routes, Route, Router } from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import Profile from"./components/Profile"
import Connections from "./components/connections"
import Requests from "./components/Requests"
import Premium from "./components/Premium"
import Chat from "./components/Chat"

function App() {
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body />}>
        <Route path="/login" element={<Login />}/>
        <Route path="/" element={<Feed />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/connections" element={<Connections />}/>
        <Route path="/requests" element={<Requests />}/>
        <Route path="/premium" element={<Premium/>}/>
        <Route path="/chat/:targetUserId" element={<Chat/>}/>

      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
