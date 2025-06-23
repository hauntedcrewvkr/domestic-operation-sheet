const cdnUrl = `https://cdn.jsdelivr.net/gh`;
const baseUrl = `${cdnUrl}/hauntedcrewvkr`;

function schema2el(schema = {}) {
  const el = document.createElement(schema.tag);
  if (schema.attr) {
    for (const [key, val] of Object.entries(schema.attr)) {
      el.setAttribute(key, val);
    }
  }
  return el;
}

function loadScriptsSequentially(scripts, index = 0) {
  if (index >= scripts.length) {
    console.log('All scripts loaded in order.');
    verifyScriptProp();
    return;
  }

  const scriptInfo = scripts[index];
  const scriptEl = document.createElement('script');

  for (const [key, val] of Object.entries(scriptInfo.attr)) {
    if (key !== 'defer') {
      scriptEl.setAttribute(key, val);
    }
  }

  scriptEl.onload = () => {
    console.log(`✅ Loaded script: ${scriptInfo.attr.src}`);
    loadScriptsSequentially(scripts, index + 1);
  };

  scriptEl.onerror = () => {
    console.error(`Failed to load script: ${scriptInfo.attr.src}`);
    loadScriptsSequentially(scripts, index + 1);
  };

  document.head.appendChild(scriptEl);
}

function loadCDN() {
  const url = `${baseUrl}/domestic-operation-sheet@v2.2.1`;
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
        href: `${url}/styles/style.css`,
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
      },
    },
    {
      tag: `script`,
      attr: {
        src: `${url}/scripts/schema.js`,
        type: `text/javascript`,
        crossorigin: `anonymous`,
      },
    },
    {
      tag: `script`,
      attr: {
        src: `${url}/scripts/helpers.js`,
        type: `text/javascript`,
        crossorigin: `anonymous`,
      },
    },
    {
      tag: `script`,
      attr: {
        src: `${url}/scripts/event.js`,
        type: `text/javascript`,
        crossorigin: `anonymous`,
      },
    },
    {
      tag: `script`,
      attr: {
        src: `${url}/scripts/main.js`,
        type: `text/javascript`,
        crossorigin: `anonymous`,
      },
    },
    {
      tag: `script`,
      attr: {
        src: `${url}/scripts/script.js`,
        type: `text/javascript`,
        crossorigin: `anonymous`,
      },
    },
  ];

  for (const obj of schema) {
    if (obj.tag === 'link') {
      document.head.appendChild(schema2el(obj));
    }
  }

  const scripts = schema.filter((obj) => obj.tag === 'script');
  loadScriptsSequentially(scripts);
}

document.addEventListener('DOMContentLoaded', loadCDN);
