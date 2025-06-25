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
    console.log(str);
    return str.toLowerCase().replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
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

  convertDate({ date, format = `dd-mm-yyyy` }) {
    const delimiters = format[format.indexOf(`dd`) + 1];
    const options = { year: `numeric`, month: `2-digit`, day: `2-digit` };
    const formattedDate = new Intl.DateTimeFormat(`en-US`, options).format(new Date(date));
    return formattedDate;
  },
};

//--------------------------------------------------------<( app-preferences )>-
const app = {
  favicon: document.favicon,
  title: document.title,
  schema: {
    body: {
      header: {},
      nav: {},
      main: {},
      footer: {},
    },
    datalist: { tag: `section`, func: [], attr: { id: `dropdowns`, class: `dropdowns` } },
    forms: {
      addNewOrderForm: {},
      cxIssueForm: {},
      paymentConfirmationForm: {},
      changeDispatchStatusForm: {},
      addRemarksForm: {},
      addNewOrderForm: {},
      addNameForm: {
        tag: `form`,
        attr: {
          class: `add-name-form base-form`,
          id: `add-name-form base-form`,
          onsubmit: `setName(event)`,
        },
        sub: [
          {
            tag: `fieldset`,
            attr: {},
            sub: [
              {
                tag: `legend`,
                text: `Add Name`,
                attr: { id: `form-heading` },
              },
              {
                tag: `label`,
                text: `Your Name`,
                attr: {},
              },
              {
                tag: `input`,
                attr: {
                  type: `text`,
                  list: `poc-dropdown`,
                  name: `POC`,
                  onchange: `validateUsername()`,
                },
              },
            ],
          },
          {
            tag: `div`,
            attr: { class: `` },
            sub: [
              {
                tag: `button`,
                text: `ADD NAME`,
                attr: {
                  type: `submit`,
                  disabled: true,
                },
              },
            ],
          },
        ],
      },
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
          .withFailureHandler(reject)
          [fn](...args);
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
  schema: {},

  async getData({ ssid, sheet, key }) {
    console.log([ssid, sheet, key]);
    if (!ssid || !sheet || !key) {
      throw new Error(`Missing required parameters: ssid, sheet, key`);
    }

    const url = `${gsheet.endpoint}/${ssid}/values/${sheet}?key=${key}`;
    const response = await fetch(url);
    const data = await response.json();

    return data;
  },

  columnNumberToLabel(columnNumber) {
    if (columnNumber < 1) return '';

    const chars = [];

    while (columnNumber > 0) {
      columnNumber--;
      chars.push(String.fromCharCode(65 + (columnNumber % 26)));
      columnNumber = Math.floor(columnNumber / 26);
    }

    return chars.reverse().join('');
  },

  columnLabelToNumber(label) {
    /**
     * @description ........... Convert Google Sheets-style column label
     * @param {string} label .. Column label (case-insensitive)
     * @returns {number} ...... Column number
     */
    label = label.toUpperCase();
    let result = 0;

    for (let i = 0; i < label.length; i++) {
      result = result * 26 + (label.charCodeAt(i) - 64);
    }

    return result;
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

//----------------------------------------<( google-visualization-references )>-
const gviz = {
  async fetchGoogleSheetData(url) {
    const response = await fetch(url);
    const htmlTxt = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlTxt, `text/html`);
    const tableRows = doc.querySelectorAll(`table tbody tr`);

    const headProp = {};
    const header = [];
    const data = [];

    for (let r = 0; r < tableRows.length; r++) {
      const isFirstRow = r === 0;
      const json = {};
      const columns = tableRows[r].cells;

      for (let c = 0; c < columns.length; c++) {
        const value = columns[c].textContent;

        if (isFirstRow) {
          if (!value) continue;

          const colnum = c + 1;

          header.push(value);
          headProp[value] ??= { index: colnum, label: columnNumberToLabel(colnum) };
        } else {
          json[header[c]] = { value: value, edit: true, view: true };
        }
      }

      if (!isFirstRow) data.push(json);
    }

    return { data: data, header: headProp };
  },

  gvizUrl({ ssid, sheet, query, type = 'html', headers = 1, range, tqxParams = {} }) {
    /**
     * @description helper function to create gviz url
     *
     * @param {Object} config .................. Configuration object
     * @param {string} config.ssid ............. Required: Google Spreadsheet ID
     * @param {string} [config.sheet] .......... Optional: Specific sheet name (case-sensitive)
     * @param {string} [config.query] .......... Optional: SQL-like query string (SELECT A, B WHERE ...)
     * @param {string} [config.type] ........... Optional: Output type for `tqx=out:<type>`
     *                                           Supported: "json", "html", "csv", "tsv-excel", "table"
     * @param {number} [config.headers=1] ...... Optional: Treat first row as column headers? (1 = Yes, 0 = No)
     * @param {string} [config.range]     ...... Optional: A1-style cell range (e.g., "A1:D100")
     *                                           Note: May be ignored if `query` is present
     * @param {Object} [config.tqxParams] ...... Optional: Extra `tqx` options (as key-value pairs)
     *                                         - Supported keys:
     *                                           reqId: number (request tracking)
     *                                           responseHandler: string (JSONP callback)
     *                                           sig: string (version hash)
     *                                           ex: { reqId: 123, responseHandler: "myCallback" }
     *
     * @returns {string} Fully constructed Google GViz query URL
     */

    let url = `https://docs.google.com/spreadsheets/d/${ssid}/gviz/tq?tqx=out:${type}&headers=${headers}`;

    if (sheet) url += `&sheet=${encodeURIComponent(sheet)}`;
    if (query) url += `&tq=${encodeURIComponent(query)}`;
    if (range) url += `&range=${encodeURIComponent(range)}`;

    for (const [key, value] of Object.entries(tqxParams)) {
      url += `&tqx=${key}:${encodeURIComponent(value)}`;
    }

    return url;
  },
};
