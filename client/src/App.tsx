import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./config/theme.";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
function App() {



  const router = createBrowserRouter([
    { path: "/", element: <h1>HI USER</h1>, errorElement: "Error" },
    { path: "/register", element: <Register />, errorElement: "Error" },
    { path: "/login", element: <Login />, errorElement: "Error" },
    { path: "/reset", element: <Reset />, errorElement: "Error" },

  ])

  return (

    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>

  )
}

export default App
