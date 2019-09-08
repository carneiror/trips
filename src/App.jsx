import React from "react";

export default () => {
  const list = window.index.map(({ date, title, filename }) => {
    return (
      <li>
        {date}: <a href={filename + ".html"}>{title}</a>
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
