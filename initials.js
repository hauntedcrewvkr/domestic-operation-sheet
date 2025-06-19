/**
 * - Consist all the custom functions
 * - should be loaded first
 */
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

const tool = {
  name: `Domestic Operation Sheet`,
  logoSrc: `https://i.postimg.cc/hGGkfhm2/mediseller-Logo.png`,
  forms: {
    addNewOrderForm: fx.text2el(
      `<form class="add-new-order-form form-base">
        <header>
          <h2 class="add-order-form-header">Add New Order</h2>
        </header>
        <label for="orders-field">Order Details</label>
        <fieldset class="orders-field" id="orders-field">
          <label for="date-input">Date:</label>
          <input type="date" name="DATE" id="date-input" required />
          <label for="poc-select">POC:</label>
          <select name="POC" id="poc-select" required></select>
          <label for="requirement-input">Requirement:</label>
          <textarea name="Order Details" id="requirement-input" required></textarea>
        </fieldset>
        <label for="client-field">Customer Details</label>
        <fieldset class="client-field" id="client-field">
          <label for="name-input">Client Name:</label>
          <input type="text" name="Client Name" id="name-input" required/>
          <label for="contact-input">Contact Number:</label>
          <input type="number" name="Contact Number" id="contact-input" required/>
          <label for="alt-contact-input">Alt-Contact Number:</label>
          <input type="number" name="Alternate Contact Number" id="alt-contact-input" />
        </fieldset>
        <label for="financial-field">Financial Details</label>
        <fieldset class="financial-field" id="financial-field">
          <label for="total-amount-input">Total Amount:</label>
          <input type="number" value="0" name="Total Amount  (INR)" id="total-amount-input" required/>
          <label for="prepaid-amount-input">Prepaid Amount:</label>
          <input type="number" value="0" name="Prepaid Amount (If any) (INR)" id="prepaid-amount-input" required/>
          <label for="payment-mode-select">Mode of Payment:</label>
          <select name="Mode of payment" id="payment-mode-select" required></select>
        </fieldset>
        <label for="logistic-field">Logistic Details</label>
        <fieldset class="logistic-field" id="logistic-field">
          <label for="shipping-address-1-input">Address Line 1:</label>
          <input type="text" maxlength="100" name="Shipping Address" id="shipping-address-1-input" required/>
          <label for="shipping-address-2-input">Address Line 2:</label>
          <input type="text" maxlength="100" name="Shipping Address_2" id="shipping-address-2-input"/>
          <label for="state-select">State:</label>
          <select name="State" id="state-select" required></select>
          <label for="pincode-input">Pincode:</label>
          <input type="number" min="100000" max="999999" name="Pincode" id="pincode-input" required/>
        </fieldset>
        <div class="actions">
          <button type="submit" class="submit">Submit</button>
          <button type="button" class="cancel">Cancel</button>
        </div>
      </form>`
    ),

    cxIssueForm: fx.text2el(`
    <form class="cx-issue-form form-base">
      <header>
        <h2 class="raise-issue-heading">Raise Issue Form</h2>
      </header>
      <fieldset>
        <label for="cx-issue-select">CX Issue:</label>
        <select name="CX Issue" id="cx-issue-select">
        </select>
      </fieldset>
      <fieldset>
        <label for="cx-issue-remark-input"> Remarks: </label>
        <input type="text" name="CX Issue Remarks" id="cx-issue-remark-input"/>
      </fieldset>
      <div class="actions">
        <button type="submit" class="submit">Submit</button>
        <button type="button" class="cancel">Cancel</button>
      </div>
    </form>
    `),

    paymentConfirmForm: fx.text2el(`
    <form class="payment-yes-form form-base">
      <header>
        <h2 class="payment-yes-heading">Payment Confirmation Form</h2>
      </header>
      <fieldset>
        <label for="payment-yes-input">Payment Timestamp:</label>
        <input type="datetime-local" name="Payment Timestamp" id="payment-yes-input">
      </fieldset>
      <fieldset>
        <label for="payment-yes-remark">Remarks: </label>
        <input type="text" name="Remarks" id="payment-yes-remark"/>
      </fieldset>
      <div class="actions">
        <button type="submit" class="submit">Submit</button>
        <button type="button" class="cancel">Cancel</button>
      </div>
    </form>
    `),

    paymentUnconfirmForm: fx.text2el(`
    <form class="payment-no-form form-base">
      <header>
        <h2 class="payment-no-heading">Payment Confirmation Form</h2>
      </header>
      <fieldset>
        <label for="payment-no-remark">Remarks: </label>
        <input type="text" name="Remarks" id="payment-no-remark"/>
      </fieldset>
      <div class="actions">
        <button type="submit" class="submit">Submit</button>
        <button type="button" class="cancel">Cancel</button>
      </div>
    </form>
    `),

    changeDispatchStatusForm: fx.text2el(`
    <form class="change-dispatch-form form-base">
      <header>
        <h2 class="change-dispatch-heading">Change Dispatch Form</h2>
      </header>
      <fieldset>
        <label for="change-dispatch-select">Dispatch Status:</label>
        <select name="Dispatch Status" id="change-dispatch-select"></select>
      </fieldset>
      <div class="actions">
        <button type="submit" class="submit">Submit</button>
        <button type="button" class="cancel">Cancel</button>
      </div>
    </form>
    `),

    addRemarksForm: fx.text2el(`
    <form class="remarks-form form-base">
      <header>
        <h2 class="remarks-form-heading">Add Remarks</h2>
      </header>
      <fieldset>
        <label for="remarks-input">Remark: :</label>
        <input name="Remarks" id="remarks-input">
      </fieldset>
      <div class="actions">
        <button type="submit" class="submit">Submit</button>
        <button type="button" class="cancel">Cancel</button>
      </div>
    </form>
    `),
  },

  actions: {
    'Add New Order': {
      icon: fx.text2el(`<i class="ph ph-user-circle-plus"></i>`),
      event: {
        click: function (e) {
          e.stopPropagation();
          const extraViews = fx.$('.extra-views');
          const form = fx.text2el(tool.forms.addNewOrderForm);
          const pocSelect = fx.$(`#poc-select`, form);
          const mopSelect = fx.$(`#payment-mode-select`, form);
          const stateSelect = fx.$(`#state-select`, form);
          const pocDropdowns = getPocDropdowns();
          const mopDropdowns = getDropdowns(`Mode of payment`);
          const stateDropdowns = getDropdowns(`State`);

          pocDropdowns.forEach(function (dropdown) {
            pocSelect.append(dropdown);
          });
          mopDropdowns.forEach(function (dropdown) {
            mopSelect.append(dropdown);
          });
          stateDropdowns.forEach(function (dropdown) {
            stateSelect.append(dropdown);
          });

          extraViews.append(addOrderHtml);
        },
      },
    },
    'Create Order': {
      icon: fx.text2el(`<i class="ph ph-webhooks-logo"></i>`),
    },
    'Change Account': {
      icon: fx.text2el(`<i class="ph ph-buildings"></i>`),
    },
    'Sync': {
      icon: fx.text2el(`<i class="ph ph-arrows-clockwise"></i>`),
    },
    'Download': {
      icon: fx.text2el(`<i class="ph ph-cloud-arrow-down"></i>`),
    },
    'Orders': {
      icon: fx.text2el(`<i class="fas fa-cart-shopping"></i>`),
    },
    'Get Initial Confirmation': {
      icon: fx.text2el(`<i class="fas fa-asterisk"></i>`),
    },
    'Confirm Payments': {
      icon: fx.text2el(`<i class="fas fa-credit-card"></i>`),
    },
    'Generate Orders': {
      icon: fx.text2el(`<i class="fas fa-face-smile-beam"></i>`),
    },
    'Raised Issues': {
      icon: fx.text2el(`<i class="fas fa-hand"></i>`),
    },
    'COD': {
      icon: fx.text2el(`<i class="fas fa-money-bill-1-wave"></i>`),
    },
    'Processed Orders': {
      icon: fx.text2el(`<i class="fas fa-microchip"></i>`),
    },
    'Change Email': {
      icon: fx.text2el(`<i class="ph ph-at"></i>`),
    },
    'My Orders': {
      icon: fx.text2el(`<i class="ph ph-user"></i>`),
    },
    'Medisellers COD': {
      icon: fx.text2el(`<i class="ph ph-money"></i>`),
    },
    'Medicare COD': {
      icon: fx.text2el(`<i class="ph ph-money-wavy"></i>`),
    },
    'Payment Not Received': {
      icon: fx.text2el(`<i class="ph ph-not-equals"></i>`),
    },
    'Payment Received': {
      icon: fx.text2el(`<i class="ph ph-equals"></i>`),
    },
    'Overview': {
      icon: fx.text2el(`<i class="ph ph-chart-bar"></i>`),
    },
    'Dispatch + Menifest': {
      icon: fx.text2el(`<i class="ph ph-truck"></i>`),
    },
    'T-1 Orders': {
      icon: fx.text2el(`<i class="ph ph-number-one"></i>`),
    },
    'Dispatch + RTO': {
      icon: fx.text2el(`<i class="ph ph-arrow-u-left-down"></i>`),
    },
    'RTO Delivered': {
      icon: fx.text2el(`<i class="ph ph-hand-arrow-down"></i>`),
    },
    'Pending Orders': {
      icon: fx.text2el(`<i class="ph ph-hourglass"></i>`),
    },
    'Unconfirmed Returns': {
      icon: fx.text2el(`<i class="ph ph-not-subset-of"></i>`),
    },
    'To Check': {
      icon: fx.text2el(`<i class="ph ph-list-checks"></i>`),
    },
    'Payments': {
      icon: fx.text2el(`<i class="ph ph-currency-dollar-simple"></i>`),
    },
    'Toggle Sub Action': {
      icon: fx.text2el(`<i class="ph ph-arrow-right"></i>`),
    },
    'Raise Issue': {
      icon: fx.text2el(`<i class="ph ph-warning"></i>`),
    },
    'See Followups': {
      icon: fx.text2el(`<i class="ph ph-chat"></i>`),
    },
    'Change Dispatch Status': {
      icon: fx.text2el(`<i class="ph ph-cube"></i>`),
    },
    'Add Remarks': {
      icon: fx.text2el(`<i class="ph ph-file-plus"></i>`),
    },
    'Order Confirmation Message': {
      icon: fx.text2el(`<i class="ph ph-whatsapp-logo"></i>`),
    },
    'Mark Resolved': {
      icon: fx.text2el(`<i class="ph ph-thumbs-up"></i>`),
    },
    'Payment Confirmation Yes': {
      icon: fx.text2el(`<i class="ph ph-check-circle"></i>`),
    },
    'Payment Confirmation No': {
      icon: fx.text2el(`<i class="ph ph-x-circle"></i>`),
    },
    'Edit Row': {
      icon: fx.text2el(`<i class="ph ph-pencil-simple-line"></i>`),
    },
    'Filter': {
      icon: fx.text2el(`<i class="ph ph-funnel"></i>`),
    },
  },

  requirements: {
    'Database': [
      `view_access`,
      `action_access`,
      `column_access`,
      `Employees`,
      `dropdowns`,
      `domestic_html_views`,
      `whatsapp_templates`,
    ],
    'Domestic Operation Sheet': [`Master`, `Dispatch_Ref`, `Account_Setting`],
  },

  tableColumns: [
    `Order Details`,
    `Customer Details`,
    `Requirements`,
    `Amount`,
    `Shipping Details`,
    `Logistic Details`,
  ],
  //------------------------- get-the-loader-element
  get loader() {
    let loaderDiv = document.createElement(`div`);
    let loaderSpan = document.createElement(`span`);

    loaderDiv.classList.add(`loader-div`);
    loaderSpan.classList.add(`loader`);

    return loaderDiv.appendChild(loaderSpan);
  },
};

const doc = {
  schema: {
    input: {
      'text': {
        tag: null,
        attr: {},
      },

      'password': {
        tag: null,
        attr: {},
      },

      'email': {
        tag: `a`,
        func(tag) {
          tag.href = `tel:${tag.textContent}`;
          tag.target = `_blank`;
        },
      },
      'search': {
        tag: null,
        attr: {},
      },
      'tel': {
        tag: `a`,
        func(tag) {
          tag.href = `tel:${tag.textContent}`;
          tag.target = `_blank`;
        },
      },
      'url': {
        tag: null,
        attr: {},
        func(tag) {
          tag.href = `tel:${tag.textContent}`;
          tag.target = `_blank`;
        },
      },
      'number': {
        tag: null,
        attr: {},
      },
      'range': {
        tag: null,
        attr: {},
      },
      'date': {
        tag: null,
        attr: {},
      },
      'month': {
        tag: null,
        attr: {},
      },
      'week': {
        tag: null,
        attr: {},
      },
      'time': {
        tag: null,
        attr: {},
      },
      'datetime-local': {
        tag: null,
        attr: {},
      },
      'color': {
        tag: null,
        attr: {},
      },
      'checkbox': {
        tag: null,
        attr: {},
      },
      'radio': {
        tag: null,
        attr: {},
      },
      'file': {
        tag: null,
        attr: {},
      },
      'submit': {
        tag: null,
        attr: {},
      },
      'reset': {
        tag: null,
        attr: {},
      },
      'button': {
        tag: `button`,
        attr: {},
        func(el) {},
      },
      'hidden': {
        tag: null,
        attr: {},
      },
      'image': {
        tag: null,
        attr: {},
      },
    },

    textarea: {
      textarea: {
        tag: `div`,
        attr: {},
      },
    },
  },

  header: fx.text2el(`
    <header class="header">
      <div class="logo" title="Domestic Operation Sheet">
        <img class="logo-img" src="${tool.logoSrc}" alt="Logo" />
      </div>
      <div class="primary-actions"></div>
    </header>
    `),

  nav: fx.text2el(`
    <nav class="view-nav"></nav>
    `),

  main: fx.text2el(`
    <main class="main">
      <section class="table-container">
        <table class="table">
          <thead class="table-heading"></thead>
          <tbody class="table-body"></tbody>
        </table>
      </section>
      <section class="extra-views"></section>
    </main>
    `),

  datalist: fx.text2el(`<section id="dropdowns" hidden aria-hidden="true"></section>`),

  footer: fx.text2el(`
    <footer class="footer">
      <div class="epp">
        <select id="entries-per-page" name="entries-per-page" title="Entries Per Page">
          <option value="50" selected="true">50</option>
          <option value="100">100</option>
          <option value="150">150</option>
          <option value="200">200</option>
        </select>
      </div>
      <div class="pagination">
        <i class="ph ph-caret-double-left"></i>
        <i class="ph ph-caret-left"></i>
        <input type="number" class="page-input" value="1" />
        <input type="number" class="total-pages" value="1" disabled />
        <i class="ph ph-caret-right"></i>
        <i class="ph ph-caret-double-right"></i>
      </div>
      <div class="current-view"><i class="ph-fill ph-eye"></i></div>
    </footer>
    `),

  actions: {
    'Add New Order': {
      icon: fx.text2el(`<i class="ph ph-user-circle-plus"></i>`),
      event: {
        click: function (e) {
          e.stopPropagation();
          const extraViews = fx.$('.extra-views');
          const form = fx.text2el(tool.forms.addNewOrderForm);
          const pocSelect = fx.$(`#poc-select`, form);
          const mopSelect = fx.$(`#payment-mode-select`, form);
          const stateSelect = fx.$(`#state-select`, form);
          const pocDropdowns = getPocDropdowns();
          const mopDropdowns = getDropdowns(`Mode of payment`);
          const stateDropdowns = getDropdowns(`State`);

          pocDropdowns.forEach(function (dropdown) {
            pocSelect.append(dropdown);
          });
          mopDropdowns.forEach(function (dropdown) {
            mopSelect.append(dropdown);
          });
          stateDropdowns.forEach(function (dropdown) {
            stateSelect.append(dropdown);
          });

          extraViews.append(addOrderHtml);
        },
      },
    },
    'Create Order': {
      icon: fx.text2el(`<i class="ph ph-webhooks-logo"></i>`),
    },
    'Change Account': {
      icon: fx.text2el(`<i class="ph ph-buildings"></i>`),
    },
    'Sync': {
      icon: fx.text2el(`<i class="ph ph-arrows-clockwise"></i>`),
    },
    'Download': {
      icon: fx.text2el(`<i class="ph ph-cloud-arrow-down"></i>`),
    },
    'Orders': {
      icon: fx.text2el(`<i class="fas fa-cart-shopping"></i>`),
    },
    'Get Initial Confirmation': {
      icon: fx.text2el(`<i class="fas fa-asterisk"></i>`),
    },
    'Confirm Payments': {
      icon: fx.text2el(`<i class="fas fa-credit-card"></i>`),
    },
    'Generate Orders': {
      icon: fx.text2el(`<i class="fas fa-face-smile-beam"></i>`),
    },
    'Raised Issues': {
      icon: fx.text2el(`<i class="fas fa-hand"></i>`),
    },
    'COD': {
      icon: fx.text2el(`<i class="fas fa-money-bill-1-wave"></i>`),
    },
    'Processed Orders': {
      icon: fx.text2el(`<i class="fas fa-microchip"></i>`),
    },
    'Change Email': {
      icon: fx.text2el(`<i class="ph ph-at"></i>`),
    },
    'My Orders': {
      icon: fx.text2el(`<i class="ph ph-user"></i>`),
    },
    'Medisellers COD': {
      icon: fx.text2el(`<i class="ph ph-money"></i>`),
    },
    'Medicare COD': {
      icon: fx.text2el(`<i class="ph ph-money-wavy"></i>`),
    },
    'Payment Not Received': {
      icon: fx.text2el(`<i class="ph ph-not-equals"></i>`),
    },
    'Payment Received': {
      icon: fx.text2el(`<i class="ph ph-equals"></i>`),
    },
    'Overview': {
      icon: fx.text2el(`<i class="ph ph-chart-bar"></i>`),
    },
    'Dispatch + Menifest': {
      icon: fx.text2el(`<i class="ph ph-truck"></i>`),
    },
    'T-1 Orders': {
      icon: fx.text2el(`<i class="ph ph-number-one"></i>`),
    },
    'Dispatch + RTO': {
      icon: fx.text2el(`<i class="ph ph-arrow-u-left-down"></i>`),
    },
    'RTO Delivered': {
      icon: fx.text2el(`<i class="ph ph-hand-arrow-down"></i>`),
    },
    'Pending Orders': {
      icon: fx.text2el(`<i class="ph ph-hourglass"></i>`),
    },
    'Unconfirmed Returns': {
      icon: fx.text2el(`<i class="ph ph-not-subset-of"></i>`),
    },
    'To Check': {
      icon: fx.text2el(`<i class="ph ph-list-checks"></i>`),
    },
    'Payments': {
      icon: fx.text2el(`<i class="ph ph-currency-dollar-simple"></i>`),
    },
    'Toggle Sub Action': {
      icon: fx.text2el(`<i class="ph ph-arrow-right"></i>`),
    },
    'Raise Issue': {
      icon: fx.text2el(`<i class="ph ph-warning"></i>`),
    },
    'See Followups': {
      icon: fx.text2el(`<i class="ph ph-chat"></i>`),
    },
    'Change Dispatch Status': {
      icon: fx.text2el(`<i class="ph ph-cube"></i>`),
    },
    'Add Remarks': {
      icon: fx.text2el(`<i class="ph ph-file-plus"></i>`),
    },
    'Order Confirmation Message': {
      icon: fx.text2el(`<i class="ph ph-whatsapp-logo"></i>`),
    },
    'Mark Resolved': {
      icon: fx.text2el(`<i class="ph ph-thumbs-up"></i>`),
    },
    'Payment Confirmation Yes': {
      icon: fx.text2el(`<i class="ph ph-check-circle"></i>`),
    },
    'Payment Confirmation No': {
      icon: fx.text2el(`<i class="ph ph-x-circle"></i>`),
    },
    'Edit Row': {
      icon: fx.text2el(`<i class="ph ph-pencil-simple-line"></i>`),
    },
    'Filter': {
      icon: fx.text2el(`<i class="ph ph-funnel"></i>`),
    },
    'Actions': {
      icon: fx.text2el(`<i class="ph ph-sliders-horizontal"></i>`),
    },
  },

  set setThead(_) {
    const schemas = sheet.schema;
    const tableHeading = fx.$(`.table-heading`);

    for (let schema in schemas) {
      const textfield = document.createElement(`fieldset`);
      const legend = document.createElement(`legend`);

      if (schema == `Action`) {
        legend.append(doc.actions.Actions.icon);
      } else {
        legend.append(schema);
      }

      textfield.append(legend);
      tableHeading.append(textfield);
    }
  },

  setTr(obj = {}, type = ``) {
    const sheetSchema = sheet.schema;
    const docSchemas = doc.schema;
    const rowForm = document.createElement(`form`);

    rowForm.setAttribute(`rownum`, obj.rownum);

    for (let header in sheetSchema) {
      const headerProp = sheetSchema[header];
      const fieldset = document.createElement(`fieldset`);
      const viewDiv = document.createElement(`div`);
      viewDiv.classList.add(`view`);
      const editDiv = document.createElement(`div`);
      editDiv.classList.add(`edit`, `hidden`);
      fieldset.append(viewDiv);
      fieldset.append(editDiv);

      for (column in headerProp) {
        const colProp = headerProp[column];
        const colTag = colProp.tag;
        const colAttr = colProp.attr;
        const colTypeAttr = colAttr.type;

        if (obj[column].view) {
          const el = document.createElement(docSchemas[colTag][colTypeAttr].tag);
          el.append(obj[column].value);
          console.log(obj[column].value);
          viewDiv.append(el);
        }

        if (obj[column].edit) {
          const label = document.createElement(`label`);
          label.textContent = column;
          const el = document.createElement(colTag);
          el.name = column;
          el.value = obj[column].value;

          for (attr in colAttr) {
            el.setAttribute(attr, colAttr[attr]);
          }

          if (`func` in colProp) {
            colProp.func(el);
          }

          if (`event` in colProp) {
            for (e in colProp.event) {
              el.addEventListener(e, colProp.event[e]);
            }
          }
          editDiv.append(label, el);
        }
      }

      rowForm.append(fieldset);
    }

    return rowForm;
  },
};

const sheet = {
  'baseUrl': `https://sheets.googleapis.com/v4/spreadsheets`,
  'Domestic Operation Sheet': {
    ssid: `1yiwtuLvsXvzMEqsSqFThA3049O6Z0Ai6UOS_Jhidtj8`, //domestic-spreadsheet-id
  },

  'Database': {
    ssid: `18eSZsnft1RrkX5w6N8mBzDPBUfOsTrlMPvtREiKrQRM`, //database-spreadsheet-id
  },

  //------------------------- getData
  'getData': async function (spreadsheetId, sheetName, apiKey) {
    let endpoint = `${sheet.baseUrl}/${spreadsheetId}/values/${sheetName}?key=${apiKey}`;

    return fetch(endpoint)
      ?.then((response) => response.json())
      ?.then((json) => json?.values || []);
  },

  'schema': {
    'Action': {
      'Toggle Sub Action': {
        tag: `input`,
        attr: {
          type: `button`,
        },
        props: {
          append: fx.text2el(`<i class="ph ph-arrow-right"></i>`),
        },
      },

      'Raise Issue': {
        tag: `input`,
        attr: {
          type: `button`,
        },
        props: {
          append: fx.text2el(`<i class="ph ph-warning"></i>`),
        },
      },

      'See Followups': {
        tag: `input`,
        attr: {
          type: `button`,
        },
        props: {
          append: fx.text2el(`<i class="ph ph-chat"></i>`),
        },
      },

      'Change Dispatch Status': {
        tag: `input`,
        attr: {
          type: `button`,
        },
        props: {
          append: fx.text2el(`<i class="ph ph-cube"></i>`),
        },
      },

      'Add Remarks': {
        tag: `input`,
        attr: {
          type: `button`,
        },
        props: {
          append: fx.text2el(`<i class="ph ph-file-plus"></i>`),
        },
      },

      'Order Confirmation Message': {
        tag: `input`,
        attr: {
          type: `button`,
        },
        props: {
          append: fx.text2el(`<i class="ph ph-whatsapp-logo"></i>`),
        },
      },

      'Mark Resolved': {
        tag: `input`,
        attr: {
          type: `button`,
        },
        props: {
          append: fx.text2el(`<i class="ph ph-thumbs-up"></i>`),
        },
      },

      'Payment Confirmation Yes': {
        tag: `input`,
        attr: {
          type: `button`,
        },
        props: {
          append: fx.text2el(`<i class="ph ph-check-circle"></i>`),
        },
      },

      'Payment Confirmation No': {
        tag: `input`,
        attr: {
          type: `button`,
        },
        event: {},
        props: {
          append: fx.text2el(`<i class="ph ph-x-circle"></i>`),
        },
      },

      'Edit Row': {
        tag: `input`,
        attr: {
          type: `button`,
        },
        props: {
          append: fx.text2el(`<i class="ph ph-pencil-simple-line"></i>`),
        },
      },
    },

    'Order Details': {
      'ID': {
        tag: `input`,
        attr: { type: `text` },
      },

      'Timestamp': {
        tag: `input`,
        attr: { type: `datetime-local` },
      },

      'Email': {
        tag: `input`,
        attr: { type: `email` },
      },

      'MONTH': {
        tag: `input`,
        attr: {
          type: `text`,
          list: `month`,
        },
      },

      'DATE': {
        tag: `input`,
        attr: { type: `date` },
      },

      'Order No': {
        tag: `input`,
        attr: { type: `text` },
      },

      'POC': {
        tag: `input`,
        attr: {
          type: `text`,
          list: `poc`,
        },
      },
    },

    'Customer Details': {
      'Client Name': {
        tag: `input`,
        attr: {
          type: `text`,
        },
      },

      'Contact Number': {
        tag: `input`,
        attr: { type: `tel` },
      },

      'Alternate Contact Number': {
        tag: `input`,
        attr: { type: `tel` },
      },
    },

    'Requirements': {
      'Order Details': {
        tag: `textarea`,
        attr: {
          type: `textarea`,
        },
      },
    },

    'Amount': {
      'Total Amount  (INR)': {
        tag: `input`,
        attr: {
          type: `number`,
        },
      },

      'Prepaid Amount (If any) (INR)': {
        tag: `input`,
        attr: {
          type: `number`,
        },
      },

      'Balance Amount (To be paid) (INR)': {
        tag: `input`,
        attr: {
          type: `number`,
        },
      },

      'Remittance Amount': {
        tag: `input`,
        attr: {
          type: `number`,
        },
      },

      'Mode of payment': {
        tag: `input`,
        attr: {
          type: `text`,
          list: `mode-of-payment`,
        },
      },

      'Order Type Status': {
        tag: `input`,
        attr: {
          type: `text`,
          list: `order-type-status`,
        },
      },

      'Order Type': {
        tag: `input`,
        attr: {
          type: `text`,
          list: `order-type`,
        },
      },

      'Is Payment Confirmed': {
        tag: `input`,
        attr: {
          type: `text`,
          list: `is-payment-confirmed`,
        },
      },

      'Payment Timestamp': {
        tag: `input`,
        attr: {
          type: `datetime-local`,
        },
      },

      'Payment Confirmation Timestamp': {
        tag: `input`,
        attr: {
          type: `datetime-local`,
        },
      },
    },

    'Shipping Details': {
      'Shipping Address': {
        tag: `textarea`,
        attr: {
          type: `textarea`,
        },
      },

      'Shipping Address_2': {
        tag: `textarea`,
        attr: {
          type: `textarea`,
        },
      },

      'State': {
        tag: `input`,
        attr: {
          type: `text`,
          list: `state`,
        },
      },

      'Pincode': {
        tag: `input`,
        attr: {
          type: `number`,
        },
      },
    },

    'Logistic Details': {
      'Order Confirmation Status': {
        tag: `input`,
        attr: {
          type: `text`,
          list: `order-confirmation-status`,
        },
      },

      'Delivery Type': {
        tag: `input`,
        attr: {
          type: `text`,
          list: `delivery-type`,
        },
      },

      'Instant Delivery Partner': {
        tag: `input`,
        attr: {
          type: `text`,
        },
      },

      'Tracking Status': {
        tag: `input`,
        attr: {
          type: `text`,
        },
      },

      'Tracking Number': {
        tag: `input`,
        attr: {
          type: `text`,
        },
      },

      'Order Creation Error Type': {
        tag: `textarea`,
        attr: {
          type: `textarea`,
        },
      },

      'Logistic Name': {
        tag: `input`,
        attr: {
          type: `text`,
          list: `logistic-name`,
        },
      },

      'Tracking Url': {
        tag: `input`,
        attr: {
          type: `text`,
        },
      },

      'Dispatch Status': {
        tag: `input`,
        attr: {
          type: `text`,
          list: `dispatch-status`,
        },
      },

      'Booking Company': {
        tag: `input`,
        attr: {
          type: `text`,
          list: `booking-company`,
        },
      },

      'CX Issue': {
        tag: `input`,
        attr: {
          type: `text`,
          list: `cx-issue`,
        },
      },

      'CX Issue Remarks': {
        tag: `input`,
        attr: {
          type: `text`,
        },
      },

      'CX Issue Status': {
        tag: `input`,
        attr: {
          type: `text`,
          list: `cx-issue-status`,
        },
      },
    },
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
