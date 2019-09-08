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
