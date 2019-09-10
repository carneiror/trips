import React from "react";
import { Link } from "react-router-dom";

const links = window.index.map(state => {
  const to = {
    pathname: `/post/${state.filename}`,
    state
  };

  return (
    <li class="list-group-item">
      <Link className="nav-link" to={to}>
        {state.title}
      </Link>
    </li>
  );
});

export default () => {
  return (
    <>
      <article>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-md-10 mx-auto">
              <ul class="list-group">{links}</ul>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};
