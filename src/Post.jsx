import React, { useState, useEffect } from "react";

export default ({ match }) => {
  const [data, setData] = useState({
    __html: ""
  });

  useEffect(() => {
    async function fetchData(url) {
      const result = await fetch(url);
      const text = await result.text();

      setData({
        __html: text
      });
    }

    fetchData(match.params.id);
  }, [match.params.id]);

  return (
    <>
      <article>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 col-md-10 mx-auto" dangerouslySetInnerHTML={data} />
          </div>
        </div>
      </article>
    </>
  );
};
