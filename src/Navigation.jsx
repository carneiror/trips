import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
        <div class="container">
          <a class="navbar-brand" href="index.html">
            Trips
          </a>
          <button
            class="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <header class="masthead">
        <div class="overlay"></div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-md-10 mx-auto">
              <div class="post-heading">
                <h1>Man must explore, and this is exploration at its greatest</h1>
                <h2 class="subheading">Problems look mighty small from 150 miles up</h2>
                <span class="meta">Posted on August 24, 2019</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
