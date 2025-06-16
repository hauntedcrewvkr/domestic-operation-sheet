//-======================== custom=variables
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
    console.log(text);
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
};

const tool = {
  name: `Domestic Operation Sheet`,
  logoSrc: `https://i.postimg.cc/hGGkfhm2/mediseller-Logo.png`,
  forms: {
    addNewOrderForm: `
    <form class="add-new-order-form form-base">
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
    </form>
    `,

    cxIssueForm: `
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
    `,

    paymentConfirmForm: `
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
    `,

    paymentUnconfirmForm: `
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
    `,

    changeDispatchStatusForm: `
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
    `,

    addRemarksForm: `
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
    `,
  },
  icons: {
    'Add New Order': `<i class="ph ph-user-circle-plus" title="Add Order"></i>`,
    'Create Order': `<i class="ph ph-webhooks-logo" title="Create Orders"></i>`,
    'Change Account': `<i class="ph ph-buildings"></i>`,
    'Sync': `<i class="ph ph-arrows-clockwise"></i>`,
    'Download': `<i class="ph ph-cloud-arrow-down"></i>`,
    'Orders': `<i class="fas fa-cart-shopping"></i>`,
    'Get Initial Confirmation': `<i class="fas fa-asterisk"></i>`,
    'Confirm Payments': `<i class="fas fa-credit-card"></i>`,
    'Generate Orders': `<i class="fas fa-face-smile-beam"></i>`,
    'Raised Issues': `<i class="fas fa-hand"></i>`,
    'COD': `<i class="fas fa-money-bill-1-wave"></i>`,
    'Processed Orders': `<i class="fas fa-microchip"></i>`,
    'Change Email': `<i class="ph ph-at"></i>`,
    'My Orders': `<i class="ph ph-user"></i>`,
    'Medisellers COD': `<i class="ph ph-money"></i>`,
    'Medicare COD': `<i class="ph ph-money-wavy"></i>`,
    'Payment Not Received': `<i class="ph ph-not-equals"></i>`,
    'Payment Received': `<i class="ph ph-equals"></i>`,
    'Overview': `<i class="ph ph-chart-bar"></i>`,
    'Dispatch + Menifest': `<i class="ph ph-truck"></i>`,
    'T-1 Orders': `<i class="ph ph-number-one"></i>`,
    'Dispatch + RTO': `<i class="ph ph-arrow-u-left-down"></i>`,
    'RTO Delivered': `<i class="ph ph-hand-arrow-down"></i>`,
    'Pending Orders': `<i class="ph ph-hourglass"></i>`,
    'Unconfirmed Returns': `<i class="ph ph-not-subset-of"></i>`,
    'To Check': `<i class="ph ph-list-checks"></i>`,
    'Payments': `<i class="ph ph-currency-dollar-simple"></i>`,
    'Raise Issue': `<i class="ph ph-warning raise-issue-action sa-icon"></i>`,
    'See Followups': `<i class="ph ph-chat see-followups-action sa-icon"></i>`,
    'Change Dispatch Status': `<i class="ph ph-cube change-dispatch-status-action sa-icon"></i>`,
    'Add Remarks': `<i class="ph ph-file-plus add-remarks-action sa-icon"></i>`,
    'Order Confirmation Message': `<i class="ph ph-whatsapp-logo send-order-confirmation-message-action sa-icon"></i>`,
    'Mark Resolved': `<i class="ph ph-thumbs-up mark-resolved-action sa-icon"></i>`,
    'Payment Confirmation Yes': `<i class="ph ph-check-circle payment-confirmed-action sa-icon"></i>`,
    'Payment Confirmation No': `<i class="ph ph-x-circle payment-unconfirmed-action sa-icon"></i>`,
    'Edit Row': `<i class="ph ph-pencil-simple-line edit-row-action sa-icon"></i>`,
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

tool.doc = {
  header: `
    <header class="header">
      <div class="logo" title="Medisellers India">
        <img class="logo-img" src="${tool.logoSrc}" alt="Logo" />
        <span class="logo-name">${tool.name}</span>
      </div>
      <div class="logo-pr-div"></div>
      <div class="pr-actions">
        <span class="pr-icon primary-action-filter-span" title="Filter">
          <i class="ph ph-funnel" title="Primary Filter"></i>
          <div class="pr-filter-options hidden"></div>
        </span>
      </div>
    </header>
    `,

  nav: `
    <nav class="view-nav"></nav>
    `,

  main: `
    <main class="main">
      <div class="table-container">
        <table class="table">
          <thead class="thead">
            <tr class="table-headings">
              <th colname="Actions" class="action-th">
                <i class="ph-fill ph-sliders-horizontal"></i>
              </th>
            </tr>
          </thead><tbody class="tbody"></tbody>
        </table>
      </div>
      <section class="extra-views">
        <div class="info msg-div hide">
          <span class="ph-fill ph-info alert-span"></span>
          <span class="msg-span">Info: Good to Go</span>
        </div>
      </section>
    </main>
    `,

  footer: `
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
    `,
};

const sheet = {
  'baseUrl': `https://sheets.googleapis.com/v4/spreadsheets`, //for-api-endpoint
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
