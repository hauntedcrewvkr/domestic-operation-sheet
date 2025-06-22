const cdnUrl = `https://cdn.jsdelivr.net/gh`;
const baseUrl = `${cdnUrl}/hauntedcrewvkr`;

function schema2el(schema = {}) {
  const parent = document.createElement(schema.tag);

  if (schema.attr) {
    for (let keyval of Object.entries(schema.attr)) {
      parent.setAttribute(...keyval);
    }
  }

  if (Array.isArray(schema.func)) {
    for (let fx of schema.func) {
      fx(parent);
    }
  }

  if (Array.isArray(schema.sub)) {
    for (let subschema of schema.sub) {
      parent.appendChild(schema2el(subschema));
    }
  }

  return parent;
}

function loadCDN() {
  const url = `${baseUrl}/domestic-operation-sheet@v1.7`;
  const schema = [
    {
      tag: `link`,
      attr: {
        rel: `preconnect`,
        href: `https://fonts.googleapis.com`,
      },
    },
    {
      tag: `link`,
      attr: {
        rel: `preconnect`,
        href: `https://fonts.gstatic.com`,
        crossorigin: `anonymous`,
      },
    },
    {
      tag: `link`,
      attr: {
        rel: `stylesheet`,
        href: `https://fonts.googleapis.com/css2?family=Maven+Pro:wght@400..900&display=swap`,
      },
    },
    {
      tag: `link`,
      attr: {
        rel: `stylesheet`,
        type: `text/css`,
        href: `https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css`,
      },
    },
    {
      tag: `link`,
      attr: {
        rel: `stylesheet`,
        type: `text/css`,
        href: `https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/fill/style.css`,
      },
    },
    {
      tag: `link`,
      attr: {
        rel: `stylesheet`,
        href: `${baseUrl}/styles/styles.css`,
        type: `text/css`,
        crossorigin: `anonymous`,
      },
    },
    {
      tag: `link`,
      attr: {
        rel: `stylesheet`,
        href: `${url}/styles/styles.css`,
        type: `text/css`,
        crossorigin: `anonymous`,
      },
    },
    {
      tag: `script`,
      attr: {
        src: `${url}/scripts/initials.js`,
        type: `text/javascript`,
        crossorigin: `anonymous`,
        defer: true,
      },
    },
    {
      tag: `script`,
      attr: {
        src: `${url}/scripts/schema.js`,
        type: `text/javascript`,
        crossorigin: `anonymous`,
        defer: true,
      },
    },
    {
      tag: `script`,
      attr: {
        src: `${url}/scripts/helpers.js`,
        type: `text/javascript`,
        crossorigin: `anonymous`,
        defer: true,
      },
    },
    {
      tag: `script`,
      attr: {
        src: `${url}/scripts/event.js`,
        type: `text/javascript`,
        crossorigin: `anonymous`,
        defer: true,
      },
    },
    {
      tag: `script`,
      attr: {
        src: `${url}/scripts/main.js`,
        type: `text/javascript`,
        crossorigin: `anonymous`,
        defer: true,
      },
    },
    {
      tag: `script`,
      attr: {
        src: `${url}/scripts/script.js`,
        type: `text/javascript`,
        crossorigin: `anonymous`,
        defer: true,
      },
    },
  ];

  for (const obj of schema) {
    document.head.append(schema2el(obj));
    console.log(obj);
  }
}
