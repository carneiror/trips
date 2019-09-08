import React from "react";
import ReactDOM from "react-dom";

const App = () => {
  const list = window.index.map(({ date, title }) => {
    return (
      <li>
        {date}: {title}
      </li>
    );
  });

  return (
    <>
      <div>This will be an awesome application... one day</div>
      <ul>{list}</ul>
    </>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
