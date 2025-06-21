const cdns = (function () {
  const cdnArr = [
    {
      url: `https://unpkg.com/react@18/umd/react.development.js`,
      type: `script`,
      attr: {
        crossorigin: ``,
      },
    },
    {
      url: `https://unpkg.com/react-dom@18/umd/react-dom.development.js`,
      type: `script`,
      attr: {
        crossorigin: ``,
      },
    },
    {
      url: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css`,
      type: `link`,
      attr: {
        rel: `stylesheet`,
        integrity: `sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==`,
        crossorigin: `anonymous`,
        referrerpolicy: `no-referrer`,
      },
    },
    {
      url: `https://fonts.googleapis.com`,
      type: `link`,
      attr: {
        rel: `preconnect`,
      },
    },
    {
      url: `https://fonts.gstatic.com`,
      type: `link`,
      attr: {
        rel: `preconnect`,
        crossorigin: ``,
      },
    },
    {
      url: `https://fonts.googleapis.com/css2?family=Carme&display=swap`,
      type: `link`,
      attr: {
        rel: `stylesheet`,
      },
    },
    {
      url: `https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap`,
      type: `link`,
      attr: {
        rel: `stylesheet`,
      },
    },
    {
      url: `https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap`,
      type: `link`,
      attr: {
        rel: `stylesheet`,
      },
    },
  ];

  function loadCDN({ url, type, attr }) {
    return new Promise((resolve, reject) => {
      const element = document.createElement(type);

      if (type === `script`) {
        element.src = url;
        element.onload = resolve;
        element.onerror = reject;
      } else if (type === `link`) {
        element.href = url;
        resolve();
      }

      Object.keys(attr)?.forEach((key) => element.setAttribute(key, attr[key]));
      document.head.appendChild(element);
    });
  }

  Promise.all(cdnArr.map(loadCDN))
    .then(() => {
      console.log("React Loaded");
      if (typeof React !== "undefined" && typeof ReactDOM !== "undefined") {
        console.log("React and ReactDOM Loaded");

        const mainScript = document.createElement("script");
        mainScript.type = "module";
        mainScript.src = "main.js";
        document.body.appendChild(mainScript);
      } else {
        console.error("React or ReactDOM not loaded");
      }
    })
    .catch((err) => console.error("CDN Load Error:", err));
})();
