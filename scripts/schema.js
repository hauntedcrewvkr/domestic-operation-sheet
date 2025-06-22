const docSchema = {
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

  forms: {
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

    initForm: {
      tag: `form`,
      attr: {
        class: `login-form`,
        onsubmit: `initFormSubmit(event)`,
      },
      sub: [
        {
          tag: `fieldset`,
          attr: {},
          sub: [
            {
              tag: `legend`,
              attr: {},
            },
            {
              tag: `fieldset`,
              attr: {},
              sub: [
                {
                  tag: `legend`,
                  attr: {},
                },
                {
                  tag: `label`,
                  text: `USERNAME:`,
                  attr: {},
                },
                {
                  tag: `input`,
                  attr: {
                    type: `text`,
                    value: props.user.username || ``,
                    name: `username`,
                    id: `username`,
                    onchange: `validateUsername(event)`,
                  },
                },
                {
                  tag: `label`,
                  text: `PASSWORD:`,
                  attr: {},
                },
                {
                  tag: `input`,
                  attr: {
                    type: `password`,
                    name: `password`,
                    id: `password`,
                    onchange: `validatePassword(event)`,
                  },
                },
              ],
            },
            {
              tag: `div`,
              attr: {},
              sub: [
                {
                  tag: `button`,
                  text: `SUBMIT`,
                  attr: {
                    class: `submit-btn`,
                    id: `submit-btn`,
                    type: `submit`,
                    disabled: true,
                  },
                },
                {
                  tag: `button`,
                  text: `RESET`,
                  attr: {
                    class: `submit-btn`,
                    id: `submit-btn`,
                    type: `reset`,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  },
};

const sheetSchema = {
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
};

console.log(`schema linked`);
