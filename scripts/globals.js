//-----------------------------------------<( easy-to-use-function-constants )>-
const fx = {
  checkers: {
    D(date) {
      return new Date(date).setHours(0, 0, 0, 0);
    },
    equal: (a, b) => a == b,
    notEqual: (a, b) => a != b,
    greater: (a, b) => a > b,
    greaterEqual: (a, b) => a >= b,
    less: (a, b) => a < b,
    lessEqual: (a, b) => a <= b,
    dateEqual: (a, b) => fx.equal(fx.D(a), fx.D(b)),
    dateNotEqual: (a, b) => fx.notEqual(fx.D(a), fx.D(b)),
    dateGreater: (a, b) => fx.greater(fx.D(a), fx.D(b)),
    dateGreaterEqual: (a, b) => fx.greaterEqual(fx.D(a), fx.D(b)),
    dateLess: (a, b) => fx.less(fx.D(a), fx.D(b)),
    dateLessEqual: (a, b) => fx.lessEqual(fx.D(a), fx.D(b)),
  },
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

    if (typeof value == 'object') return JSON.stringify(value);
    if (typeof value == 'string') return `${value}`;
    return value;
  },

  //------------------------- numify
  num(value) {
    /**
     * @description This funciton converts the value to a number if possible
     * @param {string} value
     */

    if (typeof value == 'number') return value;
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
    const template = document.createElement('template');
    template.innerHTML = text.trim();

    return template.content.firstElementChild;
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
  kebabCase(str = '') {
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
  camelCase(str = '') {
    /**
     * @description Converts text into camel case
     * @param {string} str
     * @returns Text having camel case
     */
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

  formatDate({ dateText, currentFormat, desiredFormat, isDefault = true, padding = true }) {
    const pad = (n) => (padding ? `${n}`.padStart(2, '0') : `${n}`);
    const map = {};

    const dateObj = isDefault
      ? new Date(dateText)
      : (() => {
          const parts = currentFormat.split(/[^A-Za-z]/);
          const values = dateText.split(/[^0-9]/).map(Number);

          for (let i = 0; i < parts.length; i++) {
            if (parts[i] === 'DD') map.DD = values[i];
            else if (parts[i] === 'MM') map.MM = values[i] - 1;
            else if (parts[i] === 'YYYY') map.YYYY = values[i];
          }

          return new Date(map.YYYY, map.MM, map.DD);
        })();

    const finalMap = {
      DD: pad(dateObj.getDate()),
      MM: pad(dateObj.getMonth() + 1),
      YYYY: dateObj.getFullYear(),
    };

    return desiredFormat.replace(/DD|MM|YYYY/g, (m) => finalMap[m]);
  },

  getDate({ prev = true, days }) {
    if (typeof days !== 'number') days = fx.num(days) || 0;

    let date = new Date();
    date.setDate(prev ? date.getDate() - days : date.getDate() + days);

    return date;
  },
};

//----------------------------------------------<( google-sheets-preferences )>-
const gsheet = {
  endpoint: `https://sheets.googleapis.com/v4/spreadsheets`,
  columnGroup: {
    'ORDER DETAILS': ['ID', 'Timestamp', 'Email', 'Month', 'Order Date', 'Order ID', 'POC'],
    'CUSTOMER DETAILS': ['Client Name', 'Contact Number', 'Alternate Contact Number'],
    'REQUIREMENTS': ['Requirement', 'CX Issue', 'CX Issue Status'],
    'AMOUNT': ['Total Amount (₹)', 'Prepaid Amount (₹)', 'Balance Amount (₹)', 'Remittance Amount (₹)', 'Mode of Payment', 'Sub Order Type', 'Order Type', 'Payment Status', 'Payment Timestamp'],
    'SHIPPING DETAILS': ['Address Line 1', 'Address Line 2', 'State', 'Pincode'],
    'LOGISTIC DETAILS': ['Order Confirmation Status', 'Delivery Type', 'Logistic Partner', 'Booking Company', 'ITL Error', 'Tracking Number', 'Tracking Status', 'Tracking Url', 'Dispatch Status'],
  },

  columnProps: {
    'ID': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'ID' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'text', name: 'ID', placeholder: 'ID' } } },
    },

    'Timestamp': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Timestamp' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'datetime-local', name: 'Timestamp' } } },
    },

    'Email': {
      view: { access: false, schema: { tag: 'a', attr: { title: 'Email' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'email', name: 'Email' } } },
    },

    'Month': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Month' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'text', name: 'Month' } } },
    },

    'Order Date': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Order Date' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'date', required: true, name: 'Order Date', value: fx.formatDate({ dateText: fx.getDate({ days: 1 }), desiredFormat: 'YYYY-MM-DD' }) } } },
    },

    'Order ID': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Order ID' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'text', name: 'Order ID' } } },
    },

    'POC': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'POC' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'text', list: 'poc', required: true, name: 'POC', autocomplete: 'on', placeholder: 'Select POC from Dropdown' } } },
    },

    'Client Name': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Client Name' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'text', required: true, name: 'Client Name', placeholder: 'Type Client Name' } } },
    },

    'Contact Number': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Contact Number' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'number', required: true, name: 'Contact Number' } } },
    },

    'Alternate Contact Number': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Alternative Contact Number', name: 'Alternate Contact Number' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'number' } } },
    },

    'Requirement': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Requirement' } } },
      edit: { access: false, schema: { tag: 'textarea', attr: { placeholder: 'Enter Requirement', name: 'Requirement' } } },
    },

    'Total Amount (₹)': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Total Amount (₹)' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'number', value: 0, required: true, name: 'Total Amount (₹)', onchange: 'getBalanceAmount(event)' } } },
    },

    'Prepaid Amount (₹)': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Prepaid Amount (₹)' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'number', value: 0, required: true, name: 'Prepaid Amount (₹)', onchange: 'getBalanceAmount(event)' } } },
    },

    'Balance Amount (₹)': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Balance Amount (₹)' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'number', value: 0, required: true, name: 'Balance Amount (₹)', disabled: true } } },
    },

    'Remittance Amount (₹)': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Remittance Amount (₹)' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'number', value: 0, required: true, name: 'Remittance Amount (₹)' } } },
    },

    'Mode of Payment': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Mode of Payment' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'text', list: 'mode-of-payment', required: true, name: 'Mode of Payment', autocomplete: 'on' } } },
    },

    'Sub Order Type': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Sub Order Type' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'text', list: 'sub-order-type', required: true, name: 'Sub Order Type', autocomplete: 'on' } } },
    },

    'Order Type': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Order Type' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'text', list: 'order-type', required: true, name: 'Order Type', autocomplete: 'on' } } },
    },

    'Payment Status': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Payment Status' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'text', list: 'payment-status', required: true, name: 'Payment Status', autocomplete: 'on' } } },
    },

    'Payment Timestamp': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Payment Timestamp' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'datetime-local', required: true, name: 'Payment Timestamp' } } },
    },

    'Address Line 1': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Address Line 1' } } },
      edit: { access: false, schema: { tag: 'textarea', attr: { placeholder: 'Address Line 1....', name: 'Address Line 1' } } },
    },

    'Address Line 2': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Address Line 2' } } },
      edit: { access: false, schema: { tag: 'textarea', attr: { placeholder: 'Address Line 2....', name: 'Address Line 2' } } },
    },

    'State': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'State' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'text', required: true, list: 'state', placeholder: 'State', name: 'State', autocomplete: 'on' } } },
    },

    'Pincode': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Pincode' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'number', placeholder: 'Pincode', required: true, name: 'Pincode' } } },
    },

    'CX Issue': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'CX Issue' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'text', list: 'cx-issue', required: true, placeholder: 'CX Issue', name: 'CX Issue', autocomplete: 'on' } } },
    },

    'CX Issue Status': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'CX Issue Status' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'text', list: 'cx-issue-status', required: true, placeholder: 'CX Issue Status', name: 'CX Issue Status', autocomplete: 'on' } } },
    },

    'Order Confirmation Status': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Order Confirmation Status' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'text', list: 'order-confirmation-status', required: true, placeholder: 'Order Confirmation Status', name: 'Order Confirmation Status', autocomplete: 'on' } } },
    },

    'Delivery Type': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Delivery Type' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'text', list: 'delivery-type', required: true, placeholder: 'Delivery Type', name: 'Delivery Type', autocomplete: 'on' } } },
    },

    'Logistic Partner': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Logistic Partner' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'text', list: 'logistic-partner', required: true, placeholder: 'Enter Logistic Partner', name: 'Logistic Partner', autocomplete: 'on' } } },
    },

    'Booking Company': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Booking Company' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'text', list: 'booking-company', required: true, placeholder: 'Enter Booking Company', name: 'Booking Company', autocomplete: 'on' } } },
    },

    'ITL Error': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'ITL Error' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'text', placeholder: 'Enter ITL Error', required: true, name: 'ITL Error' } } },
    },

    'Tracking Number': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Tracking Number' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'text', placeholder: 'Enter Tracking Number', required: true, name: 'Tracking Number' } } },
    },

    'Tracking Status': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Tracking Status' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'text', list: 'tracking-status', placeholder: 'Enter Tracking Status', required: true, name: 'Tracking Status', autocomplete: 'on' } } },
    },

    'Tracking Url': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Tracking Url' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'url', required: true, placeholder: `https://www.ithinklogistics.co.in/postship/tracking/...........`, name: 'Tracking Url' } } },
    },

    'Dispatch Status': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Dispatch Status' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'text', list: 'dispatch-status', placeholder: 'Enter Dispatch Status', required: true, name: 'Dispatch Status', autocomplete: 'on' } } },
    },

    'Transaction ID': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Transaction ID' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'text', placeholder: 'Enter Trasaction ID', required: true, name: 'Transaction ID' } } },
    },

    'Whatsapp  Status': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Whatsapp Status' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'text', list: 'whatsapp-status', required: true, name: 'Whatsapp  Status', autocomplete: 'on' } } },
    },

    'Remarks': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Remarks' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'text', placeholder: 'Your Remarks', name: 'Remarks' } } },
    },

    'Month Number': {
      view: { access: false, schema: { tag: 'span', attr: { title: 'Month Number' } } },
      edit: { access: false, schema: { tag: 'input', attr: { type: 'number', placeholder: new Date().getMonth() + 1 } } },
    },
  },

  filters: {
    'Orders': {
      notEqual: {
        ID: '',
      },
    },

    'Get Initial Confirmation': {
      equal: {
        'Delivery Type': '',
      },
      notEqual: {
        'Order Confirmation Status': 'To Check',
        'Dispatch Status': 'Cancelled',
        'Tracking Status': 'Cancelled',
      },
    },

    'Confirm Payments': {
      equal: {
        'Payment Status': '',
      },
      notEqual: {
        'Prepaid Amount (₹)': 0,
        'Tracking Status': 'Cancelled',
        'Dispatch Status': 'Cancelled',
      },
    },

    'Generate Orders': {
      equal: {
        'Order Confirmation Status': 'Good to Go',
        'Delivery Type': 'Regular Delivery',
        'Payment Status': 'Yes',
        'Tracking Number': '',
      },
      notEqual: {
        'Dispatch Status': 'Cancelled',
        'Tracking Status': 'Cancelled',
      },
    },

    'Raised Issues': {
      notEqual: {
        'CX Issue': '',
        'CX Issue Status': 'Closed',
      },
    },

    'COD': {
      equal: {
        'Order Type': 'COD',
      },
    },

    'Processed Orders': {
      equal: {
        'Dispatch Status': 'Yet to be Dispatched',
      },
      notEqual: {
        'Tracking Number': '',
      },
    },

    'My Orders': {},

    'Medisellers COD': {
      equal: {
        'Order Type': 'COD',
        'Booking Company': 'Mediseller India',
      },
      notEqual: {
        'Tracking Status': 'Cancelled',
        'Dispatch Status': 'Cancelled',
      },
    },

    'Medicare COD': {
      equal: {
        'Order Type': 'COD',
        'Booking Company': 'Medicare India',
      },
      notEqual: {
        'Tracking Status': 'Cancelled',
        'Dispatch Status': 'Cancelled',
      },
    },

    'Payment Not Received': {
      equal: {
        'Payment Status': 'No',
      },
      notEqual: {
        'Prepaid Amount (₹)': 0,
        'Tracking Status': 'Cancelled',
        'Dispatch Status': 'Cancelled',
      },
    },

    'Payment Received': {
      equal: {
        'Payment Status': 'Yes',
      },
      notEqual: {
        'Prepaid Amount (₹)': 0,
        'Tracking Status': 'Cancelled',
        'Dispatch Status': 'Cancelled',
      },
    },

    'Dispatch + Menifest': {
      equal: {
        'Dispatch Status': 'Yet to be Dispatched',
        'Tracking Status': 'Manifested',
      },
    },

    'T-1 Orders': {},

    'Dispatch + RTO': {
      equal: {
        'Dispatch Status': 'Dispatched',
        'Tracking Status': 'RTO In Transit',
      },
    },

    'RTO Delivered': {
      equal: {
        'Dispatch Status': 'Dispatched',
        'Tracking Status': 'RTO Delivered',
      },
    },

    'Pending Orders': {},

    'Unconfirmed Returns': {
      equal: {
        'Delivery Type': 'Regular Delivery',
        'Tracking Status': 'RTO Delivered',
      },
      notEqual: {
        'Tracking Number': '',
        'Dispatch Status': 'Returned',
      },
    },

    'To Check': {
      equal: {
        'Order Confirmation Status': 'To Check',
      },
      notEqual: {
        'Tracking Status': 'Cancelled',
        'Dispatch Status': 'Cancelled',
      },
    },

    'Payments': {},
  },

  async getData({ ssid, sheet, key }) {
    if (!ssid || !sheet || !key) {
      throw new Error('Missing required parameters: ssid, sheet, key');
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

//--------------------------------------------------------<( app-preferences )>-
const app = {
  favicon: fx.$('favicon').innerHTML,
  title: document.title,
  currentView: 'Orders',
  table: { tbody: undefined, pagination: { rpp: 50, totalPages: undefined, currentPage: 1 } },
  cta: {},

  icon: {
    'Add New Order': 'ph ph-user-circle-plus',
    'Create Order': 'ph ph-webhooks-logo',
    'Download': 'ph ph-cloud-arrow-down',
    'My Orders': 'ph ph-user',
    'Filter': 'ph ph-funnel',
    'Change Account': 'ph ph-buildings',
    'Change Email': 'ph ph-at',
    'Sync': 'ph ph-arrows-clockwise',
    'Medisellers COD': 'ph ph-money',
    'Medicare COD': 'ph ph-money-wavy',
    'Payment Not Received': 'ph ph-not-equals',
    'Payment Received': 'ph ph-equals',
    'Overview': 'ph ph-chart-bar',
    'Dispatch + Menifest': 'ph ph-truck',
    'T-1 Orders': 'ph ph-number-one',
    'Dispatch + RTO': 'ph ph-arrow-u-left-down',
    'RTO Delivered': 'ph ph-hand-arrow-down',
    'Pending Orders': 'ph ph-hourglass',
    'Unconfirmed Returns': 'ph ph-not-subset-of',
    'To Check': 'ph ph-list-checks',
    'Payments': 'ph ph-currency-dollar-simple',
    'Raise Issue': 'ph ph-warning',
    'See Followups': 'ph ph-chat',
    'Change Dispatch Status': 'ph ph-cube',
    'Add Remarks': 'ph ph-file-plus',
    'Order Confirmation Message': 'ph ph-whatsapp-logo',
    'Mark Resolved': 'ph ph-thumbs-up',
    'Payment Confirmation Yes': 'ph ph-check-circle',
    'Payment Confirmation No': 'ph ph-x-circle',
    'Edit Row': 'ph ph-pencil-simple-line',
    'Orders': 'fas fa-cart-shopping',
    'Get Initial Confirmation': 'fas fa-asterisk',
    'Confirm Payments': 'fas fa-credit-card',
    'Generate Orders': 'fas fa-face-smile-beam',
    'Raised Issues': 'fas fa-hand',
    'COD': 'fas fa-money-bill-1-wave',
    'Processed Orders': 'fas fa-microchip',
    'Toggle Sub Action': 'ph ph-arrow-right',
  },

  schema: {
    body: {
      header: {
        tag: 'header',
        sub: [
          {
            tag: 'section',
            attr: { class: 'header' },
            sub: [
              {
                tag: 'div',
                attr: { class: 'logo-holder' },
                sub: [
                  {
                    tag: 'a',
                    attr: { href: '/', title: document.title },
                    sub: [
                      {
                        tag: 'img',
                        attr: { class: 'logo-img', src: fx.$('favicon').innerHTML.trim() },
                      },
                    ],
                  },
                ],
              },
              {
                tag: 'div',
                attr: { class: 'header-action-holder', actionname: 'Primary Action|Secondary Action' },
                func: [setAction],
              },
            ],
          },
        ],
      },

      nav: {
        tag: 'nav',
        sub: [
          {
            tag: 'section',
            attr: { class: 'nav', actionname: 'View Action' },
            func: [setAction],
          },
        ],
      },

      main: {
        tag: 'main',
        attr: {
          class: 'main',
        },
        sub: [
          {
            tag: 'section',
            attr: {
              class: 'table-container',
            },
            sub: [
              {
                tag: 'table',
                attr: {
                  class: 'table',
                },
                sub: [
                  {
                    tag: 'thead',
                    attr: {
                      class: 'table-heading',
                    },
                    sub: [
                      {
                        tag: 'tr',
                        attr: { class: 'thead-row' },
                        func: [setTableHeaders],
                      },
                    ],
                  },
                  {
                    tag: 'tbody',
                    attr: {
                      class: 'table-body',
                    },
                  },
                ],
              },
            ],
          },
          {
            tag: 'section',
            attr: {
              class: 'extra-views',
            },
          },
          {
            tag: 'section',
            attr: {
              'id': 'dropdown',
              'hidden': true,
              'aria-hidden': true,
            },
            func: [setDropdowns],
          },
        ],
      },

      footer: {
        tag: 'footer',
        attr: {
          class: 'footer',
        },
        sub: [
          {
            tag: 'div',
            attr: {
              class: 'epp',
            },
            sub: [
              {
                tag: 'select',
                attr: {
                  id: 'entries-per-page',
                  name: 'entries-per-page',
                  title: 'Entries Per Page',
                  onchange: 'changeRPP(event)',
                },
                sub: [
                  {
                    tag: 'option',
                    text: 50,
                    attr: {
                      value: 50,
                      selected: true,
                    },
                  },
                  {
                    tag: 'option',
                    text: 100,
                    attr: {
                      value: 100,
                    },
                  },
                  {
                    tag: 'option',
                    text: 150,
                    attr: {
                      value: 150,
                    },
                  },
                  {
                    tag: 'option',
                    text: 200,
                    attr: {
                      value: 200,
                    },
                  },
                ],
              },
            ],
          },

          {
            tag: 'div',
            attr: {
              class: 'pagination',
            },
            sub: [
              {
                tag: 'i',
                attr: {
                  class: 'ph ph-caret-double-left',
                  onclick: 'firstPage(event)',
                },
              },
              {
                tag: 'i',
                attr: {
                  class: 'ph ph-caret-left',
                  onclick: 'prevPage(event)',
                },
              },
              {
                tag: 'div',
                attr: { class: 'inputs' },
                sub: [
                  {
                    tag: 'input',
                    attr: {
                      type: 'number',
                      class: 'page-input',
                      value: 1,
                      onchange: 'changePage(event)',
                    },
                  },
                  {
                    tag: 'input',
                    attr: {
                      type: 'number',
                      class: 'total-pages',
                      value: 1,
                      disabled: true,
                    },
                  },
                ],
              },
              {
                tag: 'i',
                attr: {
                  class: 'ph ph-caret-right',
                  onclick: 'nextPage(event)',
                },
              },
              {
                tag: 'i',
                attr: {
                  class: 'ph ph-caret-double-right',
                  onclick: 'lastPage(event)',
                },
              },
            ],
          },
          {
            tag: 'div',
            attr: {
              class: 'current-view',
            },
            sub: [
              {
                tag: 'i',
                attr: {
                  class: 'ph-fill ph-eye',
                },
              },
            ],
          },
        ],
      },
    },
    //prettier-ignore
    forms: {
      addNewOrderForm: {
        tag: 'form',
        attr: { class: 'add-new-order-form base-form', id: 'add-new-order-form' },
        onsubmit: 'gsheetAppend(event)',
        sub: [
          {
            tag: 'fieldset',
            attr: {  },
            sub: [
              { tag: 'legend', text: 'Add New Order Form', attr: { class: 'form-title' } },
              {
                tag: 'fieldset',
                sub: [
                  { tag: 'legend', text: 'Order Details' },
                  {
                    tag: 'div', attr: { class: 'input-holder' }, sub: [
                      { tag: 'label', text: 'Order Date', attr: { class: 'input-label' } },
                      gsheet.columnProps['Order Date'].edit.schema,
                    ]
                  },
                  {
                    tag: 'div', attr: { class: 'input-holder' }, sub: [
                      { tag: 'label', text: 'POC', attr: { class: 'input-label' } },
                      gsheet.columnProps['POC'].edit.schema
                    ]
                  },
                ],
              },
              {
                tag: 'fieldset',
                sub: [
                  { tag: 'legend', text: 'Customer Details' },
                  {
                    tag: 'div', attr: { class: 'input-holder' }, sub: [
                      { tag: 'label', text: 'Client Name', attr: { class: 'input-label' } },
                      gsheet.columnProps['Client Name'].edit.schema,
                    ]
                  },
                  {
                    tag: 'div', attr: { class: 'input-holder' }, sub: [
                      { tag: 'label', text: 'Contact Number', attr: { class: 'input-label' } },
                      gsheet.columnProps['Contact Number'].edit.schema,
                    ]
                  },
                  {
                    tag: 'div', attr: { class: 'input-holder' }, sub: [
                      { tag: 'label', text: 'Alternate Contact Number', attr: { class: 'input-label' } },
                      gsheet.columnProps['Alternate Contact Number'].edit.schema
                    ]
                  },
                ],
              },
              {
                tag: 'fieldset',
                sub: [
                  { tag: 'legend', text: 'Financial Details' },
                  {
                    tag: 'div', attr: { class: 'input-holder' }, sub: [
                      { tag: 'label', text: 'Total Amount (₹)', attr: { class: 'input-label' } },
                      gsheet.columnProps['Total Amount (₹)'].edit.schema,
                    
                    ]
                  },
                  {
                    tag: 'div', attr: { class: 'input-holder' }, sub: [
                      { tag: 'label', text: 'Prepaid Amount (₹)', attr: { class: 'input-label' } },
                      gsheet.columnProps['Prepaid Amount (₹)'].edit.schema,
                    ]
                  },
                  {
                    tag: 'div', attr: { class: 'input-holder' }, sub: [
                      { tag: 'label', text: 'Balance Amount (₹)', attr: { class: 'input-label' } },
                      gsheet.columnProps['Balance Amount (₹)'].edit.schema,
                    ]
                  },
                  {
                    tag: 'div', attr: { class: 'input-holder' }, sub: [
                      { tag: 'label', text: 'Mode of Payment', attr: { class: 'input-label' } },
                      gsheet.columnProps['Mode of Payment'].edit.schema,
                    ]
                  },
                ],
              },
              {
                tag: 'fieldset',
                sub: [
                  { tag: 'legend', text: 'Shipping Details' },
                  {
                    tag: 'div', attr: { class: 'input-holder' }, sub: [
                      { tag: 'label', text: 'Address Line 1', attr: { class: 'input-label' } },
                      gsheet.columnProps['Address Line 1'].edit.schema,
                    ]
                  },
                  {
                    tag: 'div', attr: { class: 'input-holder' }, sub: [
                      { tag: 'label', text: 'Address Line 2', attr: { class: 'input-label' } },
                      gsheet.columnProps['Address Line 2'].edit.schema,
                    ]
                  },
                  {
                    tag: 'div', attr: { class: 'input-holder' }, sub: [
                      { tag: 'label', text: 'State', attr: { class: 'input-label' } },
                      gsheet.columnProps['State'].edit.schema,
                    ]
                  },
                  {
                    tag: 'div', attr: { class: 'input-holder' }, sub: [
                      { tag: 'label', text: 'Pincode', attr: { class: 'input-label' } },
                      gsheet.columnProps['Pincode'].edit.schema,
                    
                    ]
                  },
                  
                ],
              },
            ],
          },
          {
            tag: 'div', attr: { class: 'form-btn-holder' },
            sub: [
              {tag: 'button', text: 'SUBMIT', attr: {class: 'submit-btn', type: 'submit'}},
              {tag: 'button', text: 'CANCEL' , attr: {class: 'cancel-btn', type: 'button', onclick: 'cancelForm(event)'}},
              {tag: 'button', text: 'RESET' , attr: {class: 'reset-btn', type: 'reset'}},
            ]
          }
        ],
      },
      cxIssueForm: {},
      paymentConfirmationForm: {},
      changeDispatchStatusForm: {},
      addRemarksForm: {},
      addNameForm: {
        tag: 'form',
        attr: {
          class: 'add-name-form base-form',
          id: 'add-name-form base-form',
          onsubmit: 'setName(event)',
        },
        sub: [
          {
            tag: 'fieldset',
            attr: {},
            sub: [
              {
                tag: 'legend',
                text: 'Add Name',
                attr: { id: 'form-heading' },
              },
              {
                tag: 'label',
                text: 'Your Name',
                attr: {},
              },
              {
                tag: 'input',
                attr: {
                  type: 'text',
                  list: 'poc-dropdown',
                  name: 'POC',
                  onchange: 'validateUsername(event)',
                },
              },
            ],
          },
          {
            tag: 'div',
            attr: { class: `` },
            sub: [
              {
                tag: 'button',
                text: 'ADD NAME',
                attr: {
                  type: 'submit',
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
        tag: 'div',
        attr: { class: 'loader-div' },
        sub: [
          {
            tag: 'div',
            attr: { class: 'loading-wave' },
            sub: [
              {
                tag: 'div',
                attr: { class: 'loading-bar' },
              },
              {
                tag: 'div',
                attr: { class: 'loading-bar' },
              },
              {
                tag: 'div',
                attr: { class: 'loading-bar' },
              },
              {
                tag: 'div',
                attr: { class: 'loading-bar' },
              },
            ],
          },
          {
            tag: 'div',
            attr: { class: 'progress-bar' },
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
    const doc = parser.parseFromString(htmlTxt, 'text/html');
    const tableRows = doc.querySelectorAll('table tbody tr');

    const headProp = {};
    const header = [];
    const data = [];

    for (let r = 0; r < tableRows.length; r++) {
      const isFirstRow = r === 0;
      const json = {};
      const columns = tableRows[r].cells;

      for (let c = 0; c < columns.length; c++) {
        const value = columns[c].textContent || '';

        if (isFirstRow) {
          if (!value) continue;

          const colnum = c + 1;

          header.push(value);
          headProp[value] ??= { index: colnum, label: gsheet.columnNumberToLabel(colnum) };
        } else {
          json[header[c]] = { value: value.trim(), edit: true, view: true, row: r + 2, columns: c + 1 };
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
