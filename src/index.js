import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Post from "./Post.jsx";
import Navigation from "./Navigation.jsx";

ReactDOM.render(
  <HashRouter>
    <Navigation />
    <Route path="/" exact component={Home} />
    <Route path="/post/:id" exact component={Post} />
  </HashRouter>,
  document.querySelector("#root")
);
