///======================== custom=variables
const fx = {
  ///------------------------ query-selector
  $(sel, scope = document) {
    /**
     * @description This function is used instead of document.querySelector()
     * @param {string} sel
     * @param {Element} scope
     */

    return scope.querySelector(sel);
  },

  ///------------------------ query-selectorall
  $$(sel, scope = document) {
    /**
     * @description This function can be used instead of document.querySelectorAll()
     * @param {string} sel
     * @param {Element} scope
     */

    return scope.querySelectorAll(sel);
  },

  ///------------------------ stringify
  str(value) {
    /**
     * @description This function converts the value to a string type
     * @param {*} value
     */

    if (typeof value == `object`) return JSON.stringify(value);
    if (typeof value == `string`) return `${value}`;
    return value;
  },

  ///------------------------ numify
  num(value) {
    /**
     * @description This funciton converts the value to a number if possible
     * @param {string} value
     */

    if (typeof value == `number`) return value;
    return Number(value);
  },

  ///------------------------ indexer
  indexer(obj, value) {
    /**
     * @description This function returns the value of the index or key
     * @param {object} obj
     * @param {string, number} value
     */

    if (!obj || value < 0) return;

    return obj[value];
  },

  ///------------------------ get-index
  getIndex(arr = [], value) {
    /**
     * @description This function returns the index of a value in the object
     * @param {array, object} arr
     * @param {number} value
     */

    if (!arr || !value || arr.indexOf(value) < 0) return;

    return arr.indexOf(value);
  },

  ///------------------------ create-element-from-text
  text2el(text) {
    /**
     * @description This function create an html element from the text
     * @param {string} text
     */

    text = text.trim();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, `text/html`);

    return doc.body.firstChild;
  },

  text2elfull(text) {
    const parser = new DOMParser();
    return parser.parseFromString(text, "text/html");
  },

  ///------------------------ remove-inner-html
  removeInnerHTML(element) {
    /**
     * @description This function removes inner html of an element
     * @param {element} element
     */

    element.innerHTML = ``;
    return;
  },
};

const tool = {
  name: `Domestic Operation Sheet`,
  ///------------------------ get-the-loader-element
  get loader() {
    ///------------------------ loader-div
    let loaderDiv = document.createElement(`div`);
    loaderDiv.classList.add(`loader-div`);

    ///------------------------ loader-span
    let loaderSpan = document.createElement(`span`);
    loaderSpan.classList.add(`loader`);

    return loaderDiv.appendChild(loaderSpan);
  },
};

const sheet = {
  baseUrl: `https://sheets.googleapis.com/v4/spreadsheets`, //for-api-endpoint
  "Domestic Operation Sheet": {
    ssid: `1yiwtuLvsXvzMEqsSqFThA3049O6Z0Ai6UOS_Jhidtj8`, //domestic-spreadsheet-id
  },
  Database: {
    ssid: `18eSZsnft1RrkX5w6N8mBzDPBUfOsTrlMPvtREiKrQRM`, //database-spreadsheet-id
  },

  ///------------------------ getData
  getData: async function (spreadsheetId, sheetName, apiKey) {
    let endpoint = `${sheet.baseUrl}/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;

    return fetch(endpoint)
      ?.then((response) => response.json())
      ?.then((json) => json?.values || []);
  },
};

const script = {
  run(fn, ...args) {
    google.script.run
      .withSuccessHandler(script.success)
      .withFailureHandler(script.failure)
      [fn](...args);
  },

  success(response) {
    return response;
  },
  failure(error) {
    return error;
  },
};

const user = {
  email: `medimetrics.medisellers@gmail.com`,
  apiKey: `AIzaSyC7MMdF_EAL2yDqZSKyaXv_vWiQmvigzhM`,
  company: {
    COD: {
      name: `Mediseller India`,
      accessToken: `8b7d414a83935fbb5de43b2771efe4f9`,
      secretKey: `996314f5922b3e3ca3dd1ca1a9aec2e1`,
      pickupAddressId: 74386,
      returnAddressId: 33337,
    },
    Prepaid: {
      name: `Medicare India`,
      accessToken: `b6676bd52d7c7c18408371b2a7d8f9d5`,
      secretKey: `535c5bbff7039a8e130f356bc90887d5`,
      pickupAddressId: 74387,
      returnAddressId: 37564,
    },
  },
};

function filterAndActions() {
  let actionSelect = fx.$(`.pr-action-select`);
  let actions = data.action_access.slice();
  const headers = actions.shift();
  const toolName_index = headers.indexOf(`tool_name`);
  const access_index = headers.indexOf(`access`);
  const script_index = headers.indexOf(`script`);

  for (a of actions) {
    let tooName = fx.indexer(a, toolName_index);
    let access = fx.indexer(a, access_index);
    let cond_ = tooName == tool.name && access.includes(user.email);

    if (cond_) {
      const script = fx.indexer(a, script_index);
      actionSelect.insertAdjacentHTML(`beforeend`, script);
    }
  }
}
