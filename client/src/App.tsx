import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./config/theme.";
import Home from "./pages/Home";
import Login from "./pages/Login";
function App() {



  const router = createBrowserRouter([
    { path: "/", element: <Home />, errorElement: "Error" },
    { path: "/login", element: <Login />, errorElement: "Error" },

  ])

  return (

    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>

  )
}

export default App
