import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
