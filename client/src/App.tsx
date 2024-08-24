import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./config/theme.";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {



  const router = createBrowserRouter([
    { path: "/register", element: <Register />, errorElement: "Error" },
    { path: "/login", element: <Login />, errorElement: "Error" },

  ])

  return (

    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>

  )
}

export default App
