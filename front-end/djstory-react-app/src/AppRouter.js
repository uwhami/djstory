import React from "react";
import "./index.css";
import App from "./App";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright ⓒ "}
      fsoftwareengineer, {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

class AppRouter extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/Login" element={<Login />}></Route>
              <Route path="/" element={<App />}></Route>
            </Routes>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </BrowserRouter>
      </div>
    );
  }
}

export default AppRouter;
