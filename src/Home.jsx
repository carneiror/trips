import React from "react";
import { Link } from "react-router-dom";

const links = window.index.map((state, index) => {
  const to = {
    pathname: `/post/${state.filename}`,
    state
  };
  const summary = `${state.summary.substring(0, 60)}...`;

  return (
    <>
      <div class="col-sm" style={{ "margin-bottom": "30px", "max-width": "33%" }}>
        <div class="card" style={{ width: "100%" }}>
          <Link to={to}>
            <img src={state.image} class="card-img-top" />
            <div class="card-body">
              <h5 class="card-title">{state.title}</h5>
              <p class="card-text">{summary}</p>
            </div>
          </Link>
        </div>
      </div>
      {(index + 1) % 3 === 0 && <div class="w-100"></div>}
    </>
  );
});

export default () => {
  return (
    <>
      <article>
        <div class="container">
          <div class="row">{links}</div>
        </div>
      </article>
    </>
  );
};
