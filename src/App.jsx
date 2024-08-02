import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

function App() {
  return (
    <main className="font-inter">
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
