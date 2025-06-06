import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/router.jsx"; // Ensure the path is correct
import "./index.css";
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
