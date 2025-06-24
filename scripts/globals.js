//----------------------------------------------<( add-loader-when-dom-loads )>-
document.addEventListener(`DOMContentLoaded`, start);

//-----------------------------------------<( easy-to-use-function-constants )>-
const fx = {
  //------------------------- query-selector
  $(sel, scope = document) {
    /**
     * @description This function is used instead of document.querySelector()
     * @param {string} sel
     * @param {Element} scope
     */

    return scope.querySelector(sel);
  },

  //------------------------- query-selectorall
  $$(sel, scope = document) {
    /**
     * @description This function can be used instead of document.querySelectorAll()
     * @param {string} sel
     * @param {Element} scope
     */

    return scope.querySelectorAll(sel);
  },

  //------------------------- stringify
  str(value) {
    /**
     * @description This function converts the value to a string type
     * @param {*} value
     */

    if (typeof value == `object`) return JSON.stringify(value);
    if (typeof value == `string`) return `${value}`;
    return value;
  },

  //------------------------- numify
  num(value) {
    /**
     * @description This funciton converts the value to a number if possible
     * @param {string} value
     */

    if (typeof value == `number`) return value;
    return Number(value);
  },

  //------------------------- indexer
  indexer(obj, value) {
    /**
     * @description This function returns the value of the index or key
     * @param {object} obj
     * @param {string, number} value
     */

    if (!obj || value < 0) return;

    return obj[value];
  },

  //------------------------- get-index
  getIndex(arr = [], value) {
    /**
     * @description This function returns the index of a value in the object
     * @param {array, object} arr
     * @param {number} value
     */

    if (!arr || !value || arr.indexOf(value) < 0) return;

    return arr.indexOf(value);
  },

  //------------------------- create-element-from-text
  text2el(text) {
    /**
     * @description Converts an HTML string into a proper DOM element.
     * @param {string} text - a single html element as string
     * @returns {HTMLElement}
     */
    const template = document.createElement(`template`);
    template.innerHTML = text.trim();

    return template.content.firstElementChild;
  },

  setInnerHTML(element) {
    element.innerHTML = element.getAttribute(`innerhtml`);
    return element;
  },

  //------------------------- remove-inner-html
  removeInnerHTML(element) {
    /**
     * @description This function removes inner html of an element
     * @param {element} element
     */

    element.innerHTML = ``;
    return;
  },

  //------------------------- create-kebab-case-of-a-text
  kebabCase(str = ``) {
    /**
     * @description Converts text into kebab case
     * @param {string} str
     * @returns Text having kebab case
     */
    return str
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  },

  //------------------------- create-camel-case-of-a-text
  camelCase(str = ``) {
    /**
     * @description Converts text into camel case
     * @param {string} str
     * @returns Text having camel case
     */
    return str
      .toLowerCase()
      .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
  },

  //------------------------- create-snake-case-of-a-text
  snakeCase(str = '') {
    /**
     * @description Converts text into snake case
     * @param {string} str
     * @returns Text having snake case
     */

    return str
      .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
      .replace(/[\s\-]+/g, '_')
      .toLowerCase();
  },

  //------------------------- create-pascal-case-of-a-text
  pascalCase(str = '') {
    /**
     * @description Converts text into pascal case
     * @param {string} str
     * @returns Text having pascal case
     */

    return str
      .toLowerCase()
      .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
      .replace(/^[a-z]/, (match) => match.toUpperCase());
  },
};

//--------------------------------------------------------<( app-preferences )>-
const app = {
  favicon: document.title,
  title: document.app.textContent || document.title || document.app.innerHTML,
  schema: {
    body: {
      header: {},
      nav: {},
      main: {},
      footer: {},
    },
    forms: {
      addNewOrderForm: {},
      cxIssueForm: {},
      paymentConfirmationForm: {},
      changeDispatchStatusForm: {},
      addRemarksForm: {},
      addNameForm: {},
      addNewOrderForm: {},
    },
    loader: {
      main: {
        tag: `div`,
        attr: {
          class: `loader-div`,
        },
        sub: [
          {
            tag: `div`,
            attr: {
              class: `loading-wave`,
            },
            sub: [
              {
                tag: `div`,
                attr: {
                  class: `loading-bar`,
                },
              },
              {
                tag: `div`,
                attr: {
                  class: `loading-bar`,
                },
              },
              {
                tag: `div`,
                attr: {
                  class: `loading-bar`,
                },
              },
              {
                tag: `div`,
                attr: {
                  class: `loading-bar`,
                },
              },
            ],
          },
          {
            tag: `div`,
            attr: {
              class: `progress-bar`,
              style: `--progress-width: 0%`,
            },
          },
        ],
      },
    },
  },

  script: {
    props: {},
    //----------------------------------<( script-to-run-server-side-scripts )>-
    async run(fn, ...args) {
      return new Promise(promiseHelper);

      function promiseHelper(resolve, reject) {
        google.script.run
          .withSuccessHandler(resolve)
          .withFailureHandler(reject);
      }
    },
  },

  user: {
    props: {},
  },
};

//----------------------------------------------<( google-sheets-preferences )>-
const gsheet = {
  endpoint: `https://sheets.googleapis.com/v4/spreadsheets`,
  domesticOperationSheet: {
    ssid: `1yiwtuLvsXvzMEqsSqFThA3049O6Z0Ai6UOS_Jhidtj8`,
    requirement: [],
  },
  Database: {
    ssid: `1hBU53QGVKOE_Cz98m-f01E7q5Ly_nCO01KyiVlSNezg`,
  },

  schema: {},

  async getData({ ssid, sheet, key }) {
    if (!ssid || !sheet || !key) {
      throw new Error(`Missing required parameters: ssid, sheet, key`);
    }

    const url = `${gsheet.endpoint}/${ssid}/values/${sheet}?key=${key}`;
    const response = await fetch(url);
    const data = await response.json();

    return data;
  },
};

//--------------------------------------------------------<( itl-preferences )>-
const itl = {
  company: {
    cod: {},
    prepaid: {},
  },
  endpoints: {
    orderCreation: `https://my.ithinklogistics.com/api_v3/order/add.json`,
    orderDetail: `https://my.ithinklogistics.com/api_v3/order/get_details.json`,
    orderTracking: `https://api.ithinklogistics.com/api_v3/order/track.json`,
    printLabel: `https://my.ithinklogistics.com/api_v3/shipping/label.json`,
    printManifest: `https://my.ithinklogistics.com/api_v3/shipping/manifest.json`,
    printInvoice: `https://my.ithinklogistics.com/api_v3/shipping/invoice.json`,
    cancelOrder: `https://my.ithinklogistics.com/api_v3/order/cancel.json`,
    syncOrder: `https://my.ithinklogistics.com/api_v3/order/sync.json`,
    updatePayment: `https://my.ithinklogistics.com/api_v3/order/update-payment.json`,
    getAWB: `https://my.ithinklogistics.com/api_v3/order/get_awb.json`,
    checkPincode: `https://my.ithinklogistics.com/api_v3/pincode/check.json`,
    getState: `https://my.ithinklogistics.com/api_v3/state/get.json`,
    getCity: `https://my.ithinklogistics.com/api_v3/city/get.json`,
    addWarehouse: `https://my.ithinklogistics.com/api_v3/warehouse/add.json`,
    getWarehouse: `https://my.ithinklogistics.com/api_v3/warehouse/get.json`,
    getRate: `https://my.ithinklogistics.com/api_v3/rate/check.json`,
    getZoneRate: `https://my.ithinklogistics.com/api_v3/rate/zone_rate.json`,
    getRemittance: `https://my.ithinklogistics.com/api_v3/remittance/get.json`,
    getRemittenceDetails: `https://my.ithinklogistics.com/api_v3/remittance/get_details.json`,
    getStore: `https://my.ithinklogistics.com/api_v3/store/get.json`,
    storeOrderDetails: `https://my.ithinklogistics.com/api_v3/store/get-order-details.json`,
    storeOrderList: `https://my.ithinklogistics.com/api_v3/store/get-order-list.json`,
    addReattempt_rto: `https://my.ithinklogistics.com/api_v3/ndr/add-reattempt-rto.json`,
  },
};

console.log(document.title);
