/**
 * - Consist all the custom functions
 * - should be loaded first
 */

const tool = {
  name: `Domestic Operation Sheet`,
  logoSrc: `https://i.postimg.cc/hGGkfhm2/mediseller-Logo.png`,
  favicon: `https://i.postimg.cc/hGGkfhm2/mediseller-Logo.png`,
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
    'Database': [`view_access`, `action_access`, `column_access`, `Employees`, `dropdowns`, `domestic_html_views`, `whatsapp_templates`],
    'Domestic Operation Sheet': [`Master`, `Dispatch_Ref`, `Account_Setting`],
  },

  tableColumns: [`Order Details`, `Customer Details`, `Requirements`, `Amount`, `Shipping Details`, `Logistic Details`],
};

const doc = {
  schema: {
    header: {
      tag: `header`,
      attr: {
        class: `header`,
      },
      sub: [
        {
          tag: `div`,
          attr: {
            class: `logo`,
            title: tool.name,
          },
          sub: {
            tag: `img`,
            attr: {
              class: `logo-img`,
              src: tool.favicon,
              alt: `Logo`,
            },
          },
        },
        {
          tag: `div`,
          attr: {
            class: `primary-actions`,
          },
        },
      ],
    },

    nav: {
      tag: `nav`,
      attr: {
        class: `view-nav`,
      },
      func: function () {},
    },

    main: {
      tag: `main`,
      attr: {
        class: `main`,
      },
      sub: [
        {
          tag: `section`,
          attr: {
            class: `table-container`,
          },
          sub: {
            tag: `table`,
            attr: {
              class: `table`,
            },
            sub: [
              {
                tag: `thead`,
                attr: {
                  class: `table-heading`,
                },
              },
              {
                tag: `tbody`,
                attr: {
                  class: `table-body`,
                },
              },
            ],
          },
        },
        {
          tag: `section`,
          attr: {
            class: `extra-views`,
          },
        },
        {
          tag: `section`,
          attr: {
            'id': `dropdown`,
            'hidden': true,
            'aria-hidden': true,
          },
        },
      ],
    },

    footer: {
      tag: `footer`,
      attr: {
        class: `footer`,
      },
      sub: [
        {
          tag: `div`,
          attr: {
            class: `epp`,
          },
          sub: [
            {
              tag: `select`,
              attr: {
                id: `entries-per-page`,
                name: `entries-per-page`,
                title: `Entries Per Page`,
              },
              sub: [
                {
                  tag: `option`,
                  attr: {
                    value: 50,
                    selected: true,
                  },
                  func(el) {
                    el.innerHTML = 50;
                  },
                },
                {
                  tag: `option`,
                  attr: {
                    value: 100,
                  },
                  func(el) {
                    el.innerHTML = 100;
                  },
                },
                {
                  tag: `option`,
                  attr: {
                    value: 150,
                  },
                  func(el) {
                    el.innerHTML = 150;
                  },
                },
                {
                  tag: `option`,
                  attr: {
                    value: 200,
                  },
                  func(el) {
                    el.innerHTML = 200;
                  },
                },
              ],
            },
          ],
        },

        {
          tag: `div`,
          attr: {
            class: `pagination`,
          },
          sub: [
            {
              tag: `i`,
              attr: {
                class: `ph ph-caret-double-left`,
              },
            },
            {
              tag: `i`,
              attr: {
                class: `ph ph-caret-left`,
              },
            },
            {
              tag: `input`,
              attr: {
                type: `number`,
                class: `page-input`,
                value: 1,
              },
            },
            {
              tag: `input`,
              attr: {
                type: `number`,
                class: `total-pages`,
                value: 1,
                disabled: true,
              },
            },
            {
              tag: `i`,
              attr: {
                class: `ph ph-caret-right`,
              },
            },
            {
              tag: `i`,
              attr: {
                class: `ph ph-caret-double-right`,
              },
            },
          ],
        },
        {
          tag: `div`,
          attr: {
            class: `current-view`,
          },
          sub: [
            {
              tag: `i`,
              attr: {
                class: `ph-fill ph-eye`,
              },
            },
          ],
        },
      ],
    },

    form: {
      addNewOrder: {
        tag: `form`,
        attr: {
          class: `add-new-order-form form-base`,
        },
        sub: [
          {
            tag: `fieldset`,
            attr: {},
            sub: [
              {
                tag: `legend`,
                attr: {
                  class: `add-order-form-header`,
                },
                func(el) {
                  el.append(`Add New Order`);
                },
              },
              {
                tag: `fieldset`,
                attr: {},
                sub: [
                  {
                    tag: `legend`,
                    attr: {},
                    func(el) {
                      el.innerHTML = `Order Details`;
                    },
                  },
                  {
                    tag: `label`,
                    attr: {
                      for: `date-input`,
                    },
                    func(el) {
                      el.innerHTML = `Date:`;
                    },
                  },
                  {
                    tag: `input`,
                    attr: {
                      type: `date`,
                      name: `DATE`,
                      id: `date-input`,
                      required: true,
                    },
                    func(el) {
                      const today = new Date();
                      today.setDate(today.getDate() - 1);
                      const yyyy = today.getFullYear();
                      const mm = fx.str(today.getMonth() + 1).padStart(2, `0`);
                      const dd = fx.str(today.getDate()).padStart(2, `0`);

                      el.value = `${yyyy}-${mm}-${dd}`;
                    },
                  },
                  {
                    tag: `label`,
                    attr: {
                      for: `poc-input`,
                    },
                    func(el) {
                      el.innerHTML = `POC:`;
                    },
                  },
                  {
                    tag: `input`,
                    attr: {
                      name: `POC`,
                      id: `poc-input`,
                      required: true,
                      list: `poc`,
                    },
                  },
                  {
                    tag: `label`,
                    attr: {
                      for: `requirement-input`,
                    },
                    func(el) {
                      el.innerHTML = `Requirement:`;
                    },
                  },
                  {
                    tag: `textarea`,
                    attr: {
                      name: `Order Details`,
                      id: `requirement-input`,
                      required: true,
                    },
                  },
                ],
              },
            ],
          },
          {
            tag: `fieldset`,
            attr: {
              class: `client-field`,
              id: `client-field`,
            },
            sub: [
              {
                tag: `legend`,
                attr: {},
                func(el) {
                  el.innerHTML = `Customer Details`;
                },
              },
              {
                tag: `label`,
                attr: {
                  for: `name-input`,
                },
                func(el) {
                  el.innerHTML = `Client Name:`;
                },
              },
              {
                tag: `input`,
                attr: {
                  type: `text`,
                  name: `Client Name`,
                  id: `name-input`,
                  required: true,
                },
              },
              {
                tag: `label`,
                attr: {
                  for: `contact-input`,
                },
                func(el) {
                  el.innerHTML = `Contact Number:`;
                },
              },
              {
                tag: `input`,
                attr: {
                  type: `number`,
                  name: `Contact Number`,
                  id: `contact-input`,
                  required: true,
                },
              },
              {
                tag: `label`,
                attr: {
                  for: `alt-contact-input`,
                },
                func(el) {
                  el.innerHTML = `Alt-Contact Number:`;
                },
              },
              {
                tag: `input`,
                attr: {
                  type: `number`,
                  name: `Alternate Contact Number`,
                  id: `alt-contact-input`,
                },
              },
            ],
          },
          {
            tag: `fieldset`,
            attr: {
              class: `financial-field`,
              id: `financial-field`,
            },
            sub: [
              {
                tag: `legend`,
                attr: {},
                func(el) {
                  el.innerHTML = `Financial Details`;
                },
              },
              {
                tag: `label`,
                attr: {
                  for: `total-amount-input`,
                },
                func(el) {
                  el.innerHTML = `Total Amount:`;
                },
              },
              {
                tag: `input`,
                attr: {
                  type: `number`,
                  value: 0,
                  name: `Total Amount  (INR)`,
                  id: `total-amount-input`,
                  required: true,
                },
              },
              {
                tag: `label`,
                attr: {
                  for: `prepaid-amount-input`,
                },
                func(el) {
                  el.innerHTML = `Prepaid Amount:`;
                },
              },
              {
                tag: `input`,
                attr: {
                  type: `number`,
                  value: 0,
                  name: `Prepaid Amount (If any) (INR)`,
                  id: `prepaid-amount-input`,
                  required: true,
                },
              },
              {
                tag: `label`,
                attr: {
                  for: `payment-mode-select`,
                },
                func(el) {
                  el.innerHTML = `Mode of Payment:`;
                },
              },
              {
                tag: `input`,
                attr: {
                  name: `Mode of payment`,
                  id: `payment-mode-select`,
                  required: true,
                },
              },
            ],
          },
          {
            tag: `fieldset`,
            attr: {
              class: `logistic-field`,
              id: `logistic-field`,
            },
            sub: [
              {
                tag: `legend`,
                attr: {},
                func(el) {
                  el.innerHTML = `Logistic Details`;
                },
              },
              {
                tag: `label`,
                attr: {
                  for: `shipping-address-1-input`,
                },
                func(el) {
                  el.innerHTML = `Address Line 1:`;
                },
              },
              {
                tag: `input`,
                attr: {
                  type: `text`,
                  maxlength: 100,
                  name: `Shipping Address`,
                  id: `shipping-address-1-input`,
                  required: true,
                },
              },
              {
                tag: `label`,
                attr: {
                  for: `shipping-address-2-input`,
                },
                func(el) {
                  el.innerHTML = `Address Line 2:`;
                },
              },
              {
                tag: `input`,
                attr: {
                  type: `text`,
                  maxlength: 100,
                  name: `Shipping Address_2`,
                  id: `shipping-address-2-input`,
                },
              },
              {
                tag: `label`,
                attr: {
                  for: `state-select`,
                },
                func(el) {
                  el.innerHTML = `State:`;
                },
              },
              {
                tag: `input`,
                attr: {
                  name: `State`,
                  id: `state-select`,
                  required: true,
                },
              },
              {
                tag: `input`,
                attr: {
                  type: `number`,
                  min: 100000,
                  max: 999999,
                  name: `Pincode`,
                  id: `pincode-input`,
                  required: true,
                },
              },
            ],
          },
          {
            tag: `div`,
            attr: {
              class: `actions`,
            },
            sub: [
              {
                tag: `button`,
                attr: {
                  type: `submit`,
                  class: `submit`,
                },
                func(el) {
                  el.innerHTML = `Submit`;
                },
              },
              {
                tag: `button`,
                attr: {
                  type: `button`,
                  class: `cancel`,
                },
                func(el) {
                  el.innerHTML = `Cancel`;
                },
              },
            ],
          },
        ],
      },

      cxIssue: {
        tag: `form`,
        attr: {
          class: `cx-issue-form form-base`,
        },
        sub: [
          {
            tag: `fieldset`,
            attr: {},
            sub: [
              {
                tag: `legend`,
                attr: {},
                func(el) {
                  el.innerHTML = `Raise Issue Form`;
                },
              },
              {
                tag: `label`,
                attr: {
                  for: `cx-issue-select`,
                },
                func(el) {
                  el.innerHTML = `CX Issue:`;
                },
              },
              {
                tag: `input`,
                attr: {
                  name: `CX Issue`,
                  id: `cx-issue-select`,
                },
              },
              {
                tag: `label`,
                attr: {
                  for: `cx-issue-remark-input`,
                },
                func(el) {
                  el.innerHTML = `Remarks:`;
                },
              },
              {
                tag: `input`,
                attr: {
                  type: `text`,
                  name: `CX Issue Remarks`,
                  id: `cx-issue-remark-input`,
                },
              },
            ],
          },
          {
            tag: `div`,
            attr: {
              class: `actions`,
            },
            sub: [
              {
                tag: `button`,
                attr: {
                  type: `submit`,
                  class: `submit`,
                },
                func(el) {
                  el.innerHTML = `Submit`;
                },
              },
              {
                tag: `button`,
                attr: {
                  type: `button`,
                  class: `cancel`,
                },
                func(el) {
                  el.innerHTML = `Cancel`;
                },
              },
            ],
          },
        ],
      },

      paymentConfirm: {
        tag: `form`,
        attr: {
          class: `payment-yes-form form-base`,
        },
        sub: [
          {
            tag: `fieldset`,
            attr: {},
            sub: [
              {
                tag: `legend`,
                attr: {},
                func(el) {
                  el.innerHTML = `Payment Confirmation Form`;
                },
              },
              {
                tag: `label`,
                attr: {
                  for: `payment-yes-input`,
                },
                func(el) {
                  el.innerHTML = `Payment Timestamp:`;
                },
              },
              {
                tag: `input`,
                attr: {
                  type: `datetime-local`,
                  name: `Payment Timestamp`,
                  id: `payment-yes-input`,
                },
              },
              {
                tag: `label`,
                attr: {
                  for: `payment-yes-remark`,
                },
                func(el) {
                  el.innerHTML = `Remarks:`;
                },
              },
              {
                tag: `input`,
                attr: {
                  type: `text`,
                  name: `Remarks`,
                  id: `payment-yes-remark`,
                },
              },
            ],
          },
          {
            tag: `div`,
            attr: {
              class: `actions`,
            },
            sub: [
              {
                tag: `button`,
                attr: {
                  type: `submit`,
                  class: `submit`,
                },
                func(el) {
                  el.innerHTML = `Submit`;
                },
              },
              {
                tag: `button`,
                attr: {
                  type: `button`,
                  class: `cancel`,
                },
                func(el) {
                  el.innerHTML = `Cancel`;
                },
              },
            ],
          },
        ],
      },

      paymentUnconfirm: {
        tag: `form`,
        attr: {
          class: `payment-yes-form form-base`,
        },
        sub: [
          {
            tag: `fieldset`,
            attr: {},
            sub: [
              {
                tag: `legend`,
                attr: {},
                func(el) {
                  el.innerHTML = `Payment Confirmation Form`;
                },
              },
              {
                tag: `label`,
                attr: {
                  for: `payment-no-remark`,
                },
                func(el) {
                  el.innerHTML = `Remarks:`;
                },
              },
              {
                tag: `input`,
                attr: {
                  type: `text`,
                  name: `Remarks`,
                  id: `payment-no-remark`,
                },
              },
            ],
          },
          {
            tag: `div`,
            attr: {
              class: `actions`,
            },
            sub: [
              {
                tag: `button`,
                attr: {
                  type: `submit`,
                  class: `submit`,
                },
                func(el) {
                  el.innerHTML = `Submit`;
                },
              },
              {
                tag: `button`,
                attr: {
                  type: `button`,
                  class: `cancel`,
                },
                func(el) {
                  el.innerHTML = `Cancel`;
                },
              },
            ],
          },
        ],
      },

      changeDispatchStatus: {
        tag: `form`,
        attr: {
          class: `change-dispatch-form form-base`,
        },
        sub: [
          {
            tag: `fieldset`,
            attr: {},
            sub: [
              {
                tag: `legend`,
                attr: {},
                func(el) {
                  el.innerHTML = `Change Dispatch Form`;
                },
              },
              {
                tag: `label`,
                attr: {
                  for: `change-dispatch-select`,
                },
                func(el) {
                  el.innerHTML = `Dispatch Status:`;
                },
              },
              {
                tag: `input`,
                attr: {
                  type: `text`,
                  name: `Dispatch Status`,
                  id: `change-dispatch-select`,
                },
              },
            ],
          },
          {
            tag: `div`,
            attr: {
              class: `actions`,
            },
            sub: [
              {
                tag: `button`,
                attr: {
                  type: `submit`,
                  class: `submit`,
                },
                func(el) {
                  el.innerHTML = `Submit`;
                },
              },
              {
                tag: `button`,
                attr: {
                  type: `button`,
                  class: `cancel`,
                },
                func(el) {
                  el.innerHTML = `Cancel`;
                },
              },
            ],
          },
        ],
      },

      addRemarks: {
        tag: `form`,
        attr: {
          class: `remarks-form form-base`,
        },
        sub: [
          {
            tag: `fieldset`,
            attr: {},
            sub: [
              {
                tag: `legend`,
                attr: {},
                func(el) {
                  el.innerHTML = `Add Remarks`;
                },
              },
              {
                tag: `label`,
                attr: {
                  for: `remarks-input`,
                },
                func(el) {
                  el.innerHTML = `Remarks:`;
                },
              },
              {
                tag: `input`,
                attr: {
                  type: `text`,
                  name: `Remarks`,
                  id: `remarks-input`,
                },
              },
            ],
          },
          {
            tag: `div`,
            attr: {
              class: `actions`,
            },
            sub: [
              {
                tag: `button`,
                attr: {
                  type: `submit`,
                  class: `submit`,
                },
                func(el) {
                  el.innerHTML = `Submit`;
                },
              },
              {
                tag: `button`,
                attr: {
                  type: `button`,
                  class: `cancel`,
                },
                func(el) {
                  el.innerHTML = `Cancel`;
                },
              },
            ],
          },
        ],
      },
    },
  },

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

  datalist: fx.text2el(`<section id="dropdowns" hidden aria-hidden="true"></section>`),

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
    const row = document.createElement(`tr`);

    for (let schema in schemas) {
      const th = document.createElement(`th`);

      if (schema == `Action`) {
        th.append(doc.actions.Actions.icon);
      } else {
        th.append(schema);
      }

      row.append(th);
    }

    tableHeading.append(row);
  },

  setTr(obj = {}) {
    const sheetSchema = sheet.schema;
    const docSchemas = doc.schema;
    const tr = document.createElement(`tr`);
    tr.setAttribute(`rownum`, obj.rownum);

    for (let header in sheetSchema) {
      const headerProp = sheetSchema[header];
      const td = document.createElement(`td`);
      const div = document.createElement(`div`);
      const ul = document.createElement(`ul`);
      div.append(ul);
      td.append(div);

      for (column in headerProp) {
        const colProp = headerProp[column];
        const colTag = colProp.tag;
        const colAttr = colProp.attr;
        const colTypeAttr = colAttr.type;

        if (obj[column].view) {
          const li = document.createElement(docSchemas[colTag][colTypeAttr].tag);
          li.append(obj[column].value);
          li.title = column;
          ul.append(li);
        }
      }
      tr.append(td);
    }

    return tr;
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
        edit: {
          tag: `input`,
          attr: {
            type: `button`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
          sub: {
            tag: `i`,
            attr: {
              class: `ph ph-arrow-right`,
            },
          },
        },
      },

      'Raise Issue': {
        edit: {
          tag: `input`,
          attr: {
            type: `button`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
          sub: {
            tag: `i`,
            attr: {
              class: `ph ph-warning`,
            },
          },
        },
      },

      'See Followups': {
        edit: {
          tag: `input`,
          attr: {
            type: `button`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
          sub: {
            tag: `i`,
            attr: {
              class: `ph ph-chat`,
            },
          },
        },
      },

      'Change Dispatch Status': {
        edit: {
          tag: `input`,
          attr: {
            type: `button`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
          sub: {
            tag: `i`,
            attr: {
              class: `ph ph-cube`,
            },
          },
        },
      },

      'Add Remarks': {
        edit: {
          tag: `input`,
          attr: {
            type: `button`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
          sub: {
            tag: `i`,
            attr: {
              class: `ph ph-file-plus`,
            },
          },
        },
      },

      'Order Confirmation Message': {
        edit: {
          tag: `input`,
          attr: {
            type: `button`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
          sub: {
            tag: `i`,
            attr: {
              class: `ph ph-whatsapp-logo`,
            },
          },
        },
      },

      'Mark Resolved': {
        edit: {
          tag: `input`,
          attr: {
            type: `button`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
          sub: {
            tag: `i`,
            attr: {
              class: `ph ph-thumbs-up`,
            },
          },
        },
      },

      'Payment Confirmation Yes': {
        edit: {
          tag: `input`,
          attr: {
            type: `button`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
          sub: {
            tag: `i`,
            attr: {
              class: `ph ph-check-circle`,
            },
          },
        },
      },

      'Payment Confirmation No': {
        edit: {
          tag: `input`,
          attr: {
            type: `button`,
          },
          event: {},
        },
        view: {
          tag: `li`,
          attr: {},
          sub: {
            tag: `i`,
            attr: {
              class: `ph ph-x-circle`,
            },
          },
        },
      },

      'Edit Row': {
        edit: {
          tag: `input`,
          attr: {
            type: `button`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
          sub: {
            tag: `i`,
            attr: {
              class: `ph ph-pencil-simple-line`,
            },
          },
        },
      },
    },

    'Order Details': {
      'ID': {
        edit: {
          tag: `input`,
          attr: { type: `text` },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'Timestamp': {
        edit: {
          tag: `input`,
          attr: { type: `datetime-local` },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'Email': {
        edit: {
          tag: `input`,
          attr: { type: `email` },
        },
        view: {
          tag: `li`,
          attr: {},
          sub: {
            tag: `a`,
            attr: {},
          },
        },
      },

      'MONTH': {
        edit: {
          tag: `input`,
          attr: {
            type: `text`,
            list: `month`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'DATE': {
        edit: {
          tag: `input`,
          attr: { type: `date` },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'Order No': {
        edit: {
          tag: `input`,
          attr: { type: `text` },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'POC': {
        edit: {
          tag: `input`,
          attr: {
            type: `text`,
            list: `poc`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },
    },

    'Customer Details': {
      'Client Name': {
        edit: {
          tag: `input`,
          attr: {
            type: `text`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'Contact Number': {
        edit: {
          tag: `input`,
          attr: { type: `tel` },
        },
        view: {
          tag: `li`,
          attr: {},
          sub: {
            tag: `a`,
            attr: {},
          },
        },
      },

      'Alternate Contact Number': {
        edit: {
          tag: `input`,
          attr: { type: `tel` },
        },
        view: {
          tag: `li`,
          attr: {},
          sub: {
            tag: `a`,
            attr: {},
          },
        },
      },
    },

    'Requirements': {
      'Order Details': {
        edit: {
          tag: `textarea`,
          attr: {
            type: `textarea`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },
    },

    'Amount': {
      'Total Amount  (INR)': {
        edit: {
          tag: `input`,
          attr: {
            type: `number`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'Prepaid Amount (If any) (INR)': {
        edit: {
          tag: `input`,
          attr: {
            type: `number`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'Balance Amount (To be paid) (INR)': {
        edit: {
          tag: `input`,
          attr: {
            type: `number`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'Remittance Amount': {
        edit: {
          tag: `input`,
          attr: {
            type: `number`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'Mode of payment': {
        edit: {
          tag: `input`,
          attr: {
            type: `text`,
            list: `mode-of-payment`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'Order Type Status': {
        edit: {
          tag: `input`,
          attr: {
            type: `text`,
            list: `order-type-status`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'Order Type': {
        edit: {
          tag: `input`,
          attr: {
            type: `text`,
            list: `order-type`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'Is Payment Confirmed': {
        edit: {
          tag: `input`,
          attr: {
            type: `text`,
            list: `is-payment-confirmed`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'Payment Timestamp': {
        edit: {
          tag: `input`,
          attr: {
            type: `datetime-local`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'Payment Confirmation Timestamp': {
        edit: {
          tag: `input`,
          attr: {
            type: `datetime-local`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },
    },

    'Shipping Details': {
      'Shipping Address': {
        edit: {
          tag: `textarea`,
          attr: {},
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'Shipping Address_2': {
        edit: {
          tag: `textarea`,
          attr: {},
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'State': {
        edit: {
          tag: `input`,
          attr: {
            type: `text`,
            list: `state`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'Pincode': {
        edit: {
          tag: `input`,
          attr: {
            type: `number`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },
    },

    'Logistic Details': {
      'Order Confirmation Status': {
        edit: {
          tag: `input`,
          attr: {
            type: `text`,
            list: `order-confirmation-status`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'Delivery Type': {
        edit: {
          tag: `input`,
          attr: {
            type: `text`,
            list: `delivery-type`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'Instant Delivery Partner': {
        edit: {
          tag: `input`,
          attr: {
            type: `text`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'Tracking Status': {
        edit: {
          tag: `input`,
          attr: {
            type: `text`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'Tracking Number': {
        edit: {
          tag: `input`,
          attr: {
            type: `text`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'Order Creation Error Type': {
        edit: {
          tag: `textarea`,
          attr: {},
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'Logistic Name': {
        edit: {
          tag: `input`,
          attr: {
            type: `text`,
            list: `logistic-name`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'Tracking Url': {
        edit: {
          tag: `input`,
          attr: {
            type: `text`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
          sub: {
            tag: `a`,
            attr: {},
          },
        },
      },

      'Dispatch Status': {
        edit: {
          tag: `input`,
          attr: {
            type: `text`,
            list: `dispatch-status`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'Booking Company': {
        edit: {
          tag: `input`,
          attr: {
            type: `text`,
            list: `booking-company`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'CX Issue': {
        edit: {
          tag: `input`,
          attr: {
            type: `text`,
            list: `cx-issue`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'CX Issue Remarks': {
        edit: {
          tag: `input`,
          attr: {
            type: `text`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },

      'CX Issue Status': {
        edit: {
          tag: `input`,
          attr: {
            type: `text`,
            list: `cx-issue-status`,
          },
        },
        view: {
          tag: `li`,
          attr: {},
        },
      },
    },
  },

  'filters': {
    'Orders': {
      equal: {},
      notEqual: {
        ID: ``,
      },
    },

    'Get Initial Confirmation': {
      equal: {
        'Delivery Type': ``,
      },
      notEqual: {
        'Order Confirmation Status': `To Check`,
        'Dispatch Status': `Cancelled`,
        'Tracking Status': `Cancelled`,
      },
    },

    'Confirm Payments': {
      equal: {
        'Is Payment Confirmed': ``,
      },
      notEqual: {
        'Prepaid Amount (If any) (INR)': 0,
        'Tracking Status': `Cancelled`,
        'Dispatch Status': `Cancelled`,
      },
    },

    'Generate Orders': {
      equal: {
        'Order Confirmation Status': `Good to Go`,
        'Delivery Type': `Regular Delivery`,
        'Is Payment Confirmed': `Yes`,
        'Tracking Number': '',
      },
      notEqual: {
        'Dispatch Status': `Cancelled`,
        'Tracking Status': `Cancelled`,
      },
    },

    'Raised Issues': {
      equal: {},
      notEqual: {
        'CX Issue': ``,
        'CX Issue Status': `Closed`,
      },
    },

    'COD': {
      equal: {
        'Order Type': `COD`,
      },
      notEqual: {},
    },

    'Processed Orders': {
      equal: {
        'Dispatch Status': `Yet to be Dispatched`,
      },
      notEqual: {
        'Tracking Number': ``,
      },
    },

    'My Orders': {
      equal: {},
      notEqual: {},
    },

    'Medisellers COD': {
      equal: {
        'Order Type': `COD`,
        'Booking Company': `Mediseller India`,
      },
      notEqual: {
        'Tracking Status': `Cancelled`,
        'Dispatch Status': `Cancelled`,
      },
    },

    'Medicare COD': {
      equal: {
        'Order Type': `COD`,
        'Booking Company': `Medicare India`,
      },
      notEqual: {
        'Tracking Status': `Cancelled`,
        'Dispatch Status': `Cancelled`,
      },
    },

    'Payment Not Received': {
      equal: {
        'Is Payment Confirmed': `No`,
      },
      notEqual: {
        'Prepaid Amount (If any) (INR)': 0,
        'Tracking Status': `Cancelled`,
        'Dispatch Status': `Cancelled`,
      },
    },

    'Payment Received': {
      equal: {
        'Is Payment Confirmed': `Yes`,
      },
      notEqual: {
        'Prepaid Amount (If any) (INR)': 0,
        'Tracking Status': `Cancelled`,
        'Dispatch Status': `Cancelled`,
      },
    },

    'Overview': {
      equal: {},
      notEqual: {},
    },

    'Dispatch + Menifest': {
      equal: {
        'Dispatch Status': `Yet to be Dispatched`,
        'Tracking Status': `Manifested`,
      },
      notEqual: {},
    },

    'T-1 Orders': {
      equal: {},
      notEqual: {},
    },

    'Dispatch + RTO': {
      equal: {
        'Dispatch Status': `Dispatched`,
        'Tracking Status': `RTO In Transit`,
      },
      notEqual: {},
    },

    'RTO Delivered': {
      equal: {
        'Dispatch Status': `Dispatched`,
        'Tracking Status': `RTO Delivered`,
      },
      notEqual: {},
    },

    'Pending Orders': {
      equal: {},
      notEqual: {},
    },

    'Unconfirmed Returns': {
      equal: {
        'Delivery Type': `Regular Delivery`,
        'Tracking Status': `RTO Delivered`,
      },
      notEqual: {
        'Tracking Number': ``,
        'Dispatch Status': `Returned`,
      },
    },

    'To Check': {
      equal: {
        'Order Confirmation Status': `To Check`,
      },
      notEqual: {
        'Tracking Status': `Cancelled`,
        'Dispatch Status': `Cancelled`,
      },
    },

    'Payments': {
      equal: {},
      notEqual: {},
    },
  },
};

const script = {
  async run(fn, ...args) {
    return new Promise(promiseHelper);

    function promiseHelper(resolve, reject) {
      google.script.run
        .withSuccessHandler(resolve)
        .withFailureHandler(reject)
        [fn](...args);
    }
  },
};

const storage = {
  script: {
    set: ({ key, value }) => script.run(`setScriptProperty`, key, value),
    get: ({ key }) => script.run(`getScriptProperty`, key),
    delete: ({ key }) => script.run(`deleteScriptProperty`, key),
  },

  user: {
    set: ({ key, value }) => script.run(`setUserProperty`, key, value),
    get: ({ key }) => script.run(`getUserProperty`, key),
    delete: ({ key }) => script.run(`deleteUserProperty`, key),
  },

  local: {
    set: ({ key, value }) => localStorage.setItem(key, value),
    get: ({ key }) => localStorage.getItem(key),
    delete: ({ key }) => localStorage.removeItem(key),
  },

  session: {
    set: ({ key, value }) => sessionStorage.setItem(key, value),
    get: ({ key }) => sessionStorage.getItem(key),
    delete: ({ key }) => sessionStorage.removeItem(key),
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
