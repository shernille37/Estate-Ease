import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";

import "./index.css";
import "photoswipe/dist/photoswipe.css";

import { Provider } from "react-redux";
import store from "./store.js";

// Screens
import HomeScreen from "./screens/HomeScreen.jsx";
import PropertiesScreen from "./screens/PropertyListScreen.jsx";
import PropertyScreen from "./screens/PropertyScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import MessageScreen from "./screens/MessageScreen.jsx";

import PrivateRoute from "./components/wrappers/PrivateRoute.jsx";
import SavedPropertiesScreen from "./screens/SavedPropertyScreen.jsx";
import AddPropertyScreen from "./screens/AddPropertyScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import EditPropertyScreen from "./screens/EditPropertyScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/properties" element={<PropertiesScreen />} />
      <Route path="/properties/:id" element={<PropertyScreen />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/bookmarks" element={<SavedPropertiesScreen />} />
        <Route path="/properties/add" element={<AddPropertyScreen />} />
        <Route path="/properties/:id/edit" element={<EditPropertyScreen />} />
        <Route path="/messages" element={<MessageScreen />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
