///------------------------ escape-btn-event
document.addEventListener(`keydown`, function (event) {
  if (event.key === `Escape`) {
    const detailsView = fx.$$(`.details`);
    detailsView.forEach(function (d) {
      d.classList.remove(`details`);
    });
    fx.$(`.extra-views`).innerHTML = ``;
  }
});

///------------------------ add-new-order-event-listener
function addNewOrder(e) {
  e.stopPropagation();
  const extraViews = fx.$(`.extra-views`);
  const htmlViews = sheet.Database.domestic_html_views.jsonData.slice();
  const addOrderView = htmlViews[0].add_new_order_form;
  const addOrderHtml = fx.text2el(addOrderView);
  const pocDropdowns = getPocDropdowns();
  const mopDropdowns = getDropdowns(`Mode of payment`);
  const stateDropdowns = getDropdowns(`State`);
  const pocSelect = fx.$(`#poc-select`, addOrderHtml);
  const mopSelect = fx.$(`#payment-mode-select`, addOrderHtml);
  const stateSelect = fx.$(`#state-select`, addOrderHtml);

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
}

///------------------------ create-order-event-listener
function createOrder() {}

function executeFilterAndAction() {}

///------------------------ change-company-event-listener
function changeCompany() {}

///------------------------ change-email-event-listener
function changeEmail() {}

///------------------------ sync-data-event-listener
function syncData() {
  location.reload();
}

///------------------------ see-details-event-listener
function seeDetails(e) {
  const target = e.target.closest(`tr`);
  const extraViews = fx.$(`.extra-views`);
  const tableDatas = fx.$$(`td`, target);
  const detailsForm = document.createElement(`form`);
  const formHeader = document.createElement(`h2`);

  detailsForm.id = `details-form`;
  detailsForm.classList.add(`details-form`, `form-base`);
  formHeader.innerText = `Details`;
  detailsForm.append(formHeader);

  tableDatas.forEach(function (td, index) {
    if (index == 0) {
      let subactions = fx.$(`ul`, td).cloneNode(true);
      subactions.classList.add(`detail-actions`);
      detailsForm.append(subactions);
      return;
    }
    const label = document.createElement(`label`);
    const textfield = document.createElement(`textfield`);
    let _class = td.classList[0];
    let _name = _class.replaceAll(`-dt`, ``).toUpperCase();
    let _li = fx.$$(`li`, td);

    label.textContent = _name;

    _li.forEach(function (li) {
      const label = document.createElement(`label`);
      const span = document.createElement(`span`);
      let labelname = li.title;
      let value = li.innerHTML;

      label.textContent = labelname;
      span.innerHTML = value;
      textfield.append(label, span);
    });
    detailsForm.append(label, textfield);
  });

  extraViews.append(detailsForm);
}

///------------------------ raise-issue-event-listener
function raiseIssue(e) {
  e.stopPropagation();
  const extraViews = fx.$(`.extra-views`);
  const htmlViews = sheet.Database.domestic_html_views.jsonData.slice();
  const cxIssueView = htmlViews[0].cx_issue_form;
  const cxIssueHtml = fx.text2el(cxIssueView);
  const cxDropdowns = getDropdowns(`CX Issue`);

  cxDropdowns.forEach(function (option) {
    const select = fx.$(`#cx-issue-select`, cxIssueHtml);
    select.appendChild(option);
  });

  extraViews.append(cxIssueHtml);
}

///------------------------ change-dispatch-status-event-listener
function changeDispatchStatus(e) {
  e.stopPropagation();
  const extraViews = fx.$(`.extra-views`);
  const htmlViews = sheet.Database.domestic_html_views.jsonData.slice();
  const changeDispatchStatusView = htmlViews[0].change_dispatch_status_form;
  const changeDispatchStatusHtml = fx.text2el(changeDispatchStatusView);
  const dropdowns = getDropdowns(`Dispatch Status`);

  dropdowns.forEach(function (option) {
    const select = fx.$(`#change-dispatch-select`, changeDispatchStatusHtml);
    select.appendChild(option);
  });

  extraViews.append(changeDispatchStatusHtml);
}

///------------------------ add-remarks-event-listener
function addRemarks(e) {
  e.stopPropagation();
  const extraViews = fx.$(`.extra-views`);
  const htmlViews = sheet.Database.domestic_html_views.jsonData.slice();
  const addRemarksView = htmlViews[0].add_remarks_form;
  const addRemarksHtml = fx.text2el(addRemarksView);

  extraViews.append(addRemarksHtml);
}

///------------------------ payment-confirm-event-listener
function paymentConfirm(e) {
  e.stopPropagation();
  const extraViews = fx.$(`.extra-views`);
  const htmlViews = sheet.Database.domestic_html_views.jsonData.slice();
  const paymentConfirmView = htmlViews[0].payment_confirmation_yes_form;
  const paymentConfirmHtml = fx.text2el(paymentConfirmView);

  extraViews.append(paymentConfirmHtml);
}

///------------------------ payment-unconfirm-event-listener
function paymentUnconfirm(e) {
  e.stopPropagation();
  const extraViews = fx.$(`.extra-views`);
  const htmlViews = sheet.Database.domestic_html_views.jsonData.slice();
  const paymentUnconfirmView = htmlViews[0].payment_confirmation_no_form;
  const paymentUnconfirmHtml = fx.text2el(paymentUnconfirmView);

  extraViews.append(paymentUnconfirmHtml);
}

///------------------------ initial-confirmation-event-listener
function initialConfirmation(e) {
  let master = DATA.Master.slice();
  let headers = master.shift();
  let orderConf_index = headers.indexOf(`Order Confirmation Status`);
  let deliveryType_index = headers.indexOf(`Delivery Type`);
  let dispatchStatus_index = headers.indexOf(`Dispatch Status`);
  DATA.initialConfirmation ??= [];
  DATA.initialConfirmation.push(headers);

  for (let row of master) {
    const orderConf = fx.indexer(row, orderConf_index);
    const deliveryType = fx.indexer(row, deliveryType_index);
    const disptachStatus = fx.indexer(row, dispatchStatus_index);
    const cond1 = orderConf != `To Check` && !deliveryType;
    const cond2 = disptachStatus != `Cancelled`;

    if (cond1 && cond2) DATA.initialConfirmation.push(row);
  }

  createTableRows(1);
}

///------------------------ fist-page-event
function firstPage(e) {
  const currentView = fx.$(`.current-view`);
  const pageInput = fx.$(`.page-input`);
  if (pageInput.value == 1) return;
  const viewname = currentView.innerHTML.split(` (`)[0];
  pageInput.value = 1;

  getTableRows(1, viewname);
}

///------------------------ go-back-event
function goBack(e) {
  const currentView = fx.$(`.current-view`);
  const pageInput = fx.$(`.page-input`);
  const inputValue = fx.num(pageInput.value);
  if (inputValue == 1) return;
  const viewname = currentView.innerHTML.split(` (`)[0];
  pageInput.value = inputValue - 1;
  getTableRows(inputValue - 1, viewname);
}

///------------------------ epp-select-event
function eppSelect(e) {
  const currentView = fx.$(`.current-view`);
  const pagenum = fx.$(`.page-input`).value;
  const viewname = currentView.innerHTML.split(` (`)[0];
  getTableRows(pagenum, viewname);
}

///------------------------ page-input-event
function pageInputE(e) {
  const currentView = fx.$(`.current-view`);
  const pagenum = fx.num(e.target.value);
  const viewname = currentView.innerHTML.split(` (`)[0];
  getTableRows(pagenum, viewname);
}

///------------------------ next-page-event
function nextPage(e) {
  const currentView = fx.$(`.current-view`);
  const lastPage = fx.num(fx.$(`.total-pages`).value);
  const pageInput = fx.$(`.page-input`);
  const inputValue = fx.num(pageInput.value);

  if (lastPage == inputValue) return;

  const viewname = currentView.innerHTML.split(` (`)[0];
  pageInput.value = inputValue + 1;
  getTableRows(inputValue + 1, viewname);
}

///------------------------ last-page-event
function lastPage(e) {
  const currentView = fx.$(`.current-view`);
  const lastPage = fx.$(`.total-pages`).value;
  const pageInput = fx.$(`.page-input`);
  const inputValue = fx.num(pageInput.value);
  if (lastPage == inputValue) return;
  const viewname = currentView.innerHTML.split(` (`)[0];
  pageInput.value = lastPage;

  getTableRows(lastPage, viewname);
}

///------------------------ generate-orders-event
function createOrder(e) {
  const data = sheet[tool.name]["Generate Orders"].jsonData;
  const orderOutput = [];
  const companies = {};

  data.forEach(function (row, index) {
    const company = row["Booking Company"];

    if (!companies[company]) companies[company] = [];
    companies[company].push(row);

    if (companies[company].length === 10) {
      orderOutput.push(
        responseAdjust(fetchApi(companies[company], company), data)
      );

      companies[company] = [];
    }

    if (index === data.length - 1) {
      Object.entries(companies).forEach(function ([compName, orders]) {
        if (orders.length > 0) {
          orderOutput.push(
            responseAdjust(fetchApi(companies[company], company), data)
          );
        }
      });
    }
  });
}

function responseAdjust(results = [], data = []) {
  const indexes = sheet[tool.name].Master.indexes;
  let arr = [];

  results.forEach(function (result) {
    const row = data.find((r) => r[`ID`] == result.id);
    console.log(row);

    arr.push({
      row_number: row?.rowNum || null,
      indexes: {
        tracking_status: indexes[`Tracking Status`],
        tracking_number: indexes[`Tracking Number`],
        order_creation_error_type: indexes[`Order Creation Error Type`],
        logistic_name: indexes[`Logistic Name`],
        tracking_url: indexes[`Tracking Url`],
        dispatch_status: indexes[`Dispatch Status`],
        booking_company: indexes[`Booking Company`],
      },
      tracking_status: result.tracking_status,
      tracking_number: result.tracking_number,
      order_creation_error_type: result.order_creation_error_type,
      logistic_name: result.logistic_name,
      tracking_url: result.tracking_url,
      dispatch_status: result.dispatch_status,
      booking_company: result.booking_company,
    });
  });

  return arr;
}

function fetchApi(data = [], company) {
  const url = `https://my.ithinklogistics.com/api_v3/order/add.json`;
  const arr = [];

  const pickupAddressId = Object.values(user.company).find(function (c) {
    return c.name == company;
  })?.pickupAddressId;

  const returnAddressId = Object.values(user.company).find(function (c) {
    return c.name == company;
  })?.returnAddressId;

  const accessToken = Object.values(user.company).find(function (c) {
    return c.name == company;
  })?.accessToken;

  const secretKey = Object.values(user.company).find(function (c) {
    return c.name == company;
  })?.secretKey;

  const payload = {
    data: {
      shipments: [],
      pickup_address_id: `${pickupAddressId}`,
      access_token: `${accessToken}`,
      secret_key: `${secretKey}`,
      logistics: ``,
      s_type: ``,
      order_type: `forward`,
    },
  };

  for (row of data) {
    payload.data.shipments.push(payloadHelper(row, returnAddressId));
  }

  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
    body: JSON.stringify(payload),
  };

  const baseTrack = `https://www.ithinklogistics.co.in/postship/tracking/`;

  const result = fetch(url, option)
    .then((response) => response.json())
    .then(function (json) {
      if (json.status == `success`) {
        Object.keys(json.data).forEach(function (key) {
          arr.push({
            id: json?.data[key]?.refnum,
            tracking_status: json?.data[key]?.waybill ? `Manifested` : ``,
            tracking_number: json?.data[key]?.waybill || ``,
            order_creation_error_type: json?.data[key]?.remark || ``,
            logistic_name: json?.data[key]?.logistic_name || ``,
            tracking_url: json?.data[key]?.waybill
              ? baseTrack + json?.data[key]?.waybill
              : ``,
            dispatch_status: json?.data[key]?.waybill
              ? `Yet to be Dispatched`
              : ``,
            booking_company: company,
          });
        });
      } else {
        arr.push({
          id: ``,
          tracking_status: ``,
          tracking_number: ``,
          order_creation_error_type: json.html_message || ``,
          logistic_name: ``,
          tracking_url: ``,
          dispatch_status: ``,
          booking_company: company,
        });

        console.log(json.html_message);
      }
    });

  return arr;
}

function payloadHelper(data = {}, returnAddressId = ``) {
  return {
    waybill: ``,
    order: data[`ID`],
    sub_order: ``,
    order_date: convertDate(data[`DATE`]),
    total_amount:
      data[`Order Type`] == `COD`
        ? data[`Balance Amount (To be paid) (INR)`]
        : data[`Total Amount  (INR)`],
    name: data[`Client Name`],
    company_name: ``,
    add: data[`Shipping Address`],
    add2: data[`Shipping Address_2`],
    add3: ``,
    pin: data[`Pincode`],
    city: ``,
    state: data[`State`],
    country: `INDIA`,
    phone: data[`Contact Number`],
    alt_phone: data[`Alternate Contact Number`],
    email: ``,
    is_billing_same_as_shipping: `yes`,
    billing_name: ``,
    billing_company_name: ``,
    billing_add: ``,
    billing_add2: ``,
    billing_add3: ``,
    billing_pin: ``,
    billing_city: ``,
    billing_state: ``,
    billing_country: ``,
    billing_phone: ``,
    billing_alt_phone: ``,
    billing_email: ``,
    products: [
      {
        product_name: `HEALTHCARE HERBAL PRODUCTS`,
        product_sku: ``,
        product_quantity: 1,
        product_price:
          data[`Order Type`] == `COD`
            ? data[`Balance Amount (To be paid) (INR)`]
            : data[`Total Amount  (INR)`],
        product_tax_rate: ``,
        product_hsn_code: ``,
        product_discount: ``,
        product_img_url: ``,
      },
    ],
    shipment_length: 10,
    shipment_width: 8,
    shipment_height: 6,
    weight: 0.5,
    shipping_charges: ``,
    giftwrap_charges: ``,
    transaction_charges: ``,
    total_discount: ``,
    first_attemp_discount: ``,
    cod_charges: ``,
    advance_amount: ``,
    cod_amount: data[`Balance Amount (To be paid) (INR)`],
    payment_mode: data[`Order Type`],
    reseller_name: ``,
    eway_bill_number: ``,
    gst_number: ``,
    what3words: ``,
    return_address_id: returnAddressId,
    api_source: ``,
    store_id: ``,
  };
}

function convertDate(date) {
  date = new Date(date);
  const day = String(date.getDate()).padStart(2, 0);
  const month = String(date.getMonth() + 1).padStart(2, 0);
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
