import React from "react";

export default () => {
  const list = window.index.map(({ date, title, filename, image }) => {
    return (
      <section>
        <a href={filename}>
          <img src={image} />
          <h2>{title}</h2>
          <i>{date}</i>
        </a>
      </section>
    );
  });

  return (
    <>
      <div>This will be an awesome application... one day</div>
      <ul>{list}</ul>
    </>
  );
};
