/**
 * @description This consists all the helper functions
 */

//------------------------- toggle-loader-helper-function()
function toggleLoader() {
  /**
   * @description This function toggles the loader div
   */

  let extraViews = fx.$(`.extra-views`);
  let loaderDiv = fx.$(`.loader-div`);

  if (loaderDiv) {
    extraViews.innerHTML = ``;
  } else {
    extraViews.innerHTML = loader;
  }
}

//------------------------- distribute-data-helper-function()
function distributeData(ss, sheetname, data) {
  /**
   * @description This function distributes the data to be stored in variable accordingly
   * @param {string} ss
   * @param {string} sheetname
   * @param {array} data
   */

  data = data.slice(); //make-copy-of-data-so-that-original-will-be-safe
  if (!Array.isArray(data) || !data.length) {
    toggleNotification(`No Data Found`, 'error');
  }

  const access = sheet.Database.column_access;
  //------------------------- initialize-if-data-not-found
  sheet[ss] ??= {}; //level-1
  sheet[ss][sheetname] = {}; //level-2
  sheet[ss][sheetname].indexes = {}; //level-3
  sheet[ss][sheetname].jsonData = []; //level-3
  sheet[ss][sheetname].arrayData = data; //level-3

  let headers = data.shift(); //get-headers
  let rowNum = ss == tool.name && sheetname == `Master` ? data.length + 2 : 2; //get-row-number

  headers.forEach(function (header, index) {
    sheet[ss][sheetname].indexes[header] = index; //set-sheet-header-indexes
  });

  //------------------------- set-sheet-json-data
  if (ss == `Domestic Operation Sheet` && sheetname == `Master`) {
    data = data.reverse();
    const indexes = sheet[ss].Master.indexes; //get-master-index-json
    //------------------------- store-views-to-variables
    [
      `Medisellers COD`,
      `Medicare COD`,
      `Payment Not Received`,
      `Payment Received`,
      `Dispatch + Menifest`,
      `T-1 Orders`,
      `Dispatch + RTO`,
      `RTO Delivered`,
      `Pending Orders`,
      `Unconfirmed Returns`,
      `To Check`,
      `Get Initial Confirmation`,
      `Confirm Payments`,
      `Generate Orders`,
      `Raised Issues`,
      `COD`,
      `Processed Orders`,
    ].forEach(function (sn) {
      sheet[ss][sn] = {};
      sheet[ss][sn].jsonData = [];
      sheet[ss][sn].arrayData = [];
    });

    for (let row of data) {
      let json = { rowNo: rowNum-- };
      //------------------------- get-conditional-values
      const values = {
        orderConfirmationStatus: row[indexes[`Order Confirmation Status`]],
        deliveryType: row[indexes[`Delivery Type`]],
        instantDeliveryPartner: row[indexes[`Instant Delivery Partner`]],
        trackingStatus: row[indexes[`Tracking Status`]],
        trackingNumber: row[indexes[`Tracking Number`]],
        dispatchStatus: row[indexes[`Dispatch Status`]],
        orderType: row[indexes[`Order Type`]],
        isPaymentConfirmed: row[indexes[`Is Payment Confirmed`]],
        prepaidAmount: fx.num(row[indexes[`Prepaid Amount (If any) (INR)`]]),
        balanceAmount: fx.num(row[indexes[`Balance Amount (To be paid) (INR)`]]),
        remittanceAmount: fx.num(row[indexes[`Remittance Amount`]]),
        bookingCompany: row[indexes[`Booking Company`]],
        cxIssue: row[indexes[`CX Issue`]],
        cxIssueStatus: row[indexes[`CX Issue Status`]],
      };

      //------------------------- medicare-cod-conditionals
      if (
        values.orderType == `COD` &&
        values.bookingCompany == `Medicare India` &&
        (values.trackingStatus != `Cancelled` || values.dispatchStatus != `Cancelled`)
      ) {
        sheet[ss][`Medicare COD`].arrayData.push(row);
        sheet[ss][`Medicare COD`].jsonData.push(masterJson(row, headers, rowNum));
      }
      //------------------------- medisellers-cod-conditionals
      if (
        values.orderType == `COD` &&
        values.bookingCompany == `Mediseller India` &&
        (values.trackingStatus != `Cancelled` || values.dispatchStatus != `Cancelled`)
      ) {
        sheet[ss][`Medisellers COD`].arrayData.push(row);
        sheet[ss][`Medisellers COD`].jsonData.push(masterJson(row, headers, rowNum));
      }
      //------------------------- payment-not-received-conditionals
      if (
        values.prepaidAmount > 0 &&
        values.isPaymentConfirmed == `No` &&
        (values.dispatchStatus != `Cancelled` || values.trackingStatus != `Cancelled`)
      ) {
        sheet[ss][`Payment Not Received`].arrayData.push(row);
        sheet[ss][`Payment Not Received`].jsonData.push(masterJson(row, headers, rowNum));
      }
      //------------------------- payment-received-conditionals
      if (
        values.prepaidAmount > 0 &&
        values.isPaymentConfirmed == `Yes` &&
        (values.dispatchStatus != `Cancelled` || values.trackingStatus != `Cancelled`)
      ) {
        sheet[ss][`Payment Received`].arrayData.push(row);
        sheet[ss][`Payment Received`].jsonData.push(masterJson(row, headers, rowNum));
      }
      //------------------------- dispatch-+-manifest-conditionals
      if (
        values.dispatchStatus == `Dispatched` &&
        values.trackingStatus == `Manifested`
      ) {
        sheet[ss][`Dispatch + Menifest`].arrayData.push(row);
        sheet[ss][`Dispatch + Menifest`].jsonData.push(masterJson(row, headers, rowNum));
      }
      //------------------------- t-1-orders-conditionals
      {
      }
      //------------------------- dispatch-+-rto-conditionals
      if (
        values.dispatchStatus == `Dispatched` &&
        values.trackingStatus.includes(`RTO`)
      ) {
        sheet[ss][`Dispatch + RTO`].arrayData.push(row);
        sheet[ss][`Dispatch + RTO`].jsonData.push(masterJson(row, headers, rowNum));
      }
      //------------------------- rto-delivered-conditionals
      if (
        values.dispatchStatus == `Dispatched` &&
        values.trackingStatus == `RTO Delivered`
      ) {
        sheet[ss][`RTO Delivered`].arrayData.push(row);
        sheet[ss][`RTO Delivered`].jsonData.push(masterJson(row, headers, rowNum));
      }
      //------------------------- pending-orders-conditionals
      if (
        values.dispatchStatus == `Yet to be Dispatched` &&
        values.orderConfirmationStatus != `Good to Go` &&
        values.trackingNumber
      ) {
        sheet[ss][`Pending Orders`].arrayData.push(row);
        sheet[ss][`Pending Orders`].jsonData.push(masterJson(row, headers, rowNum));
      }
      //------------------------- unconfirmed-returns-conditionals
      if (
        values.dispatchStatus != `Returned` &&
        values.trackingStatus == `RTO Delivered`
      ) {
        sheet[ss][`Unconfirmed Returns`].arrayData.push(row);
        sheet[ss][`Unconfirmed Returns`].jsonData.push(masterJson(row, headers, rowNum));
      }
      //------------------------- to-check-conditionals
      if (
        values.orderConfirmationStatus == `To Check` &&
        (values.dispatchStatus != `Cancelled` || values.trackingStatus != `Cancelled`)
      ) {
        sheet[ss][`To Check`].arrayData.push(row);
        sheet[ss][`To Check`].jsonData.push(masterJson(row, headers, rowNum));
      }
      //------------------------- get-initial-confirmation-conditionals
      if (
        values.orderConfirmationStatus != `To Check` &&
        !values.deliveryType &&
        (values.dispatchStatus != `Cancelled` || values.trackingStatus != `Cancelled`)
      ) {
        sheet[ss][`Get Initial Confirmation`].arrayData.push(row);
        sheet[ss][`Get Initial Confirmation`].jsonData.push(
          masterJson(row, headers, rowNum)
        );
      }
      //------------------------- confirm-payments-conditionals
      if (
        values.prepaidAmount > 0 &&
        !values.isPaymentConfirmed &&
        (values.trackingStatus != `Cancelled` || values.dispatchStatus != `Cancelled`)
      ) {
        sheet[ss][`Confirm Payments`].arrayData.push(row);
        sheet[ss][`Confirm Payments`].jsonData.push(masterJson(row, headers, rowNum));
      }
      //------------------------- generate-orders-conditionals
      if (
        values.orderConfirmationStatus == `Good to Go` &&
        values.deliveryType == `Regular Delivery` &&
        values.isPaymentConfirmed == `Yes` &&
        !values.trackingNumber &&
        values.dispatchStatus != `Cancelled`
      ) {
        sheet[ss][`Generate Orders`].arrayData.push(row);
        sheet[ss][`Generate Orders`].jsonData.push(masterJson(row, headers, rowNum));
      }
      //------------------------- raised-issues-conditionals
      if (!values.cxIssue && values.cxIssueStatus != `Closed`) {
        sheet[ss][`Raised Issues`].arrayData.push(row);
        sheet[ss][`Raised Issues`].jsonData.push(masterJson(row, headers, rowNum));
      }
      //------------------------- cod-conditionals
      if (values[`orderType`] == `COD`) {
        sheet[ss].COD.arrayData.push(row);
        sheet[ss].COD.jsonData.push(viewsJson(row, headers, rowNum));
      }
      //------------------------- processed-orders-conditionals
      if (values.trackingNumber && values.dispatchStatus == `Yet to be Dispatched`) {
        sheet[ss][`Processed Orders`].arrayData.push(row);
        sheet[ss][`Processed Orders`].jsonData.push(masterJson(row, headers, rowNum));
      }

      for (let c = 0; c < row.length; c++) {
        json[headers[c]] ??= row[c];
      }

      sheet[ss].Master.jsonData.push(masterJson(row, headers, rowNum));
    }
  } else {
    for (let row of data) {
      let json = { rowNo: rowNum++ };

      for (let c = 0; c < row.length; c++) {
        json[headers[c]] ??= row[c];
      }

      sheet[ss][sheetname].jsonData.push(json);
    }
  }
}

//------------------------- views-json-helper-function()
function viewsJson(data, header, row) {
  /**
   * @description This function creates a JSON object from the data and header
   * @param {array} data
   * @param {array} header
   * @param {number} row
   */
  let json = { rowNo: row };
  for (let h = 0; h < header.length; h++) {
    if ([`string`, `number`].includes(typeof data[h])) {
      json[header[h]] ??= data[h];
    } else if (Array.isArray(data[h])) {
      json[header[h]] ??= data[h].join(``);
    } else {
      json[header[h]] ??= ``;
    }
  }

  return json;
}

function masterJson(data, header, row) {
  if (
    !sheet ||
    !sheet.schema ||
    !sheet.schema.Action ||
    !sheet.Database ||
    !sheet.Database.column_access ||
    !user ||
    !user.email
  ) {
    throw new Error('Required context (sheet, user) is missing.');
  }

  const json = { rownum: row || 0 };
  const actions = Object.keys(sheet.schema.Action);
  const accessMap = new Map(
    sheet.Database.column_access.jsonData.map((a) => [a.column_name, a])
  );

  for (const action of actions) {
    if (!json[action]) {
      json[action] = {
        value: sheet.schema.Action[action].props.append.cloneNode(true),
        edit: false,
        view: true,
      };
    }
  }

  for (let i = 0; i < header.length; i++) {
    const colName = header[i];
    const colValue = data[i];
    const colaccess = accessMap.get(colName);
    if (!colaccess) continue;

    const canEdit = colaccess.editors?.includes(user.email) || false;
    const canView = colaccess.viewers?.includes(user.email) || false;

    let value;
    if (typeof colValue === 'string' || typeof colValue === 'number') {
      value = colValue;
    } else if (Array.isArray(colValue)) {
      value = colValue.join(',');
    } else {
      value = '';
    }

    if (!json[colName]) {
      json[colName] = { value, edit: canEdit, view: canView };
    }
  }

  return json;
}

//------------------------- set-routes-helper-function()
function setRoutes() {
  /**
   * @description This function set all the function to be run in serial
   */
  createDocument();
  document.body.append(createDataLists());
  getTableRows();
  doc.setThead = true;
  fx.$(`.loader-init-div`)?.remove();
  fx.$(`.loader-div`)?.remove();
  toggleNotification(`Good to Go`, `info`);
  setTimeout(ghostSync, 5 * 60 * 1000);
}

//------------------------- get-table-rows-helper-function()
function getTableRows(pagenum = 1, viewname = `Master`) {
  /**
   * @description This function create and set the rows to the table
   * @param {number} pagenum
   * @param {string} viewname
   */

  if (typeof pagenum != `number`) pagenum = fx.num(pagenum);
  if (typeof viewname != `string`) viewname = fx.str(viewname);
  if (viewname == `Orders`) viewname = `Master`;

  const currentView = fx.$(`.current-view`);
  const totalPages = fx.$(`footer .total-pages`);
  let data = sheet[tool.name][viewname].jsonData;
  const dataLength = data.length;
  const rpp = fx.num(fx.$(`#entries-per-page`)?.value) || 50;
  const total = Math.ceil(data.length / rpp);
  const end = Math.min(rpp * pagenum, data.length);
  const start = Math.max(0, end - rpp);

  data = data.slice(start, end);
  const tableBody = fx.$(`.table-body`);
  fx.removeInnerHTML(tableBody);
  for (row of data) {
    tableBody.append(doc.setTr(row));
  }

  currentView.title = `${viewname == `Master` ? `Orders` : viewname} (${
    start + 1 + ` - ` + end + `/ ` + dataLength
  })`;
  totalPages.disabled = false;
  totalPages.value = total;
  totalPages.disabled = true;
}

//------------------------- create-sub-actions-function()
function subActions() {
  /**
   * @description This function returns the sub-action-ul
   */
  const access = sheet.Database.action_access.jsonData;
  let subAction = document.createElement(`ul`);
  let toggle_sa = document.createElement(`li`);
  let togleIcon = document.createElement(`i`);
  toggle_sa.classList.add(`sub-action`);
  togleIcon.classList.add(`ph`, `ph-arrow-right`);
  toggle_sa.append(togleIcon);
  subAction.append(toggle_sa);

  for (let acc of access) {
    if (
      acc.tool_name == tool.name &&
      acc.type == `Sub Action` &&
      acc.access.includes(user.email)
    ) {
      const subaction = fx.text2el(acc.script);
      subaction.classList.add(`hidden`);
      subAction.append(subaction);
    }
  }

  function toggleSubAction(e) {
    e.stopPropagation();
    const ul = e.target.closest(`ul`);
    const list = fx.$$(`li:not(:first-child)`, ul);

    for (let li of list) {
      li.classList.toggle(`hidden`);
      toggle_sa.classList.toggle(`back`);
    }
  }

  toggle_sa.addEventListener(`click`, toggleSubAction);
  return subAction;
}

//------------------------- get-dropdowns-helper-function()
function getDropdowns(colname) {
  /**
   * @description This function returns the dropdowns for the given column name
   * @param {string} colname
   */

  const dropdownData = sheet.Database.dropdowns.jsonData.slice();
  const selectedOption = document.createElement(`option`);
  let dropdowns = [];
  selectedOption.value = ``;
  selectedOption.textContent = `Select ${colname}`;
  selectedOption.disabled = true;
  selectedOption.selected = true;
  dropdowns.push(selectedOption);

  for (let dropdown of dropdownData) {
    if (dropdown.tool_name != tool.name || dropdown.column_name != colname) continue;
    let option = document.createElement(`option`);
    option.value = dropdown.value;
    option.textContent = dropdown.value;
    dropdowns.push(option);
  }

  return dropdowns;
}

//------------------------- get-poc-dropdowns-function()
function getPocDropdowns() {
  /**
   * @description This function returns the POC options
   */

  const employeesData = sheet.Database.Employees.jsonData.slice();
  const selectedOption = document.createElement(`option`);
  let dropdowns = [];
  selectedOption.value = ``;
  selectedOption.textContent = `Select POC`;
  selectedOption.disabled = true;
  selectedOption.selected = true;
  dropdowns.push(selectedOption);

  for (let employee of employeesData) {
    let option = document.createElement(`option`);
    let name = employee.Name;

    option.value = name;
    option.textContent = name;
    dropdowns.push(option);
  }

  return dropdowns;
}

//------------------------- ghost-sync-helper-function()
async function ghostSync() {
  /**
   * @description This function works in background to sync realtime data
   */

  const masterData = await sheet.getData(sheet[tool.name].ssid, `Master`, user.apiKey);
  distributeData(tool.name, `Master`, masterData);
  setTimeout(ghostSync, 5 * 60 * 1000);
}

//------------------------- now-str-helper-function()
function nowStr() {
  const d = new Date();
  const pad = (n) => (n < 10 ? '0' + n : n);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

//------------------------- get-order-number-helper-function()
function getOrderNo(condition) {
  let data = sheet[tool.name].Master.jsonData.slice();
  let orders = data.filter(function (value) {
    return value.DATE == condition;
  });
  return orders.length + 1;
}

//------------------------- append-data-helper-function()
function appendData(object = {}) {
  const indexes = sheet[tool.name].Master.indexes;
  let data = { type: `append`, data: [] };

  for (let key in object) {
    data.data.push({
      index: indexes[key] + 1,
      value: object[key],
    });
  }

  data.data = data.data
    .sort(function (a, b) {
      return a.index - b.index;
    })
    .map(function (value) {
      return value.value;
    });

  script.run(toSheet, data, tool.name, `Master`);
}

//------------------------- response-adjust-helper-function()
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

//------------------------- fetch-api-helper-function()
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
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
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
            dispatch_status: json?.data[key]?.waybill ? `Yet to be Dispatched` : ``,
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

//------------------------- payload-helper-helper-function()
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

//------------------------- convert-date-helper-function()
function convertDate(date) {
  date = new Date(date);
  const day = String(date.getDate()).padStart(2, 0);
  const month = String(date.getMonth() + 1).padStart(2, 0);
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
//------------------------- update-data-helper-function()
function updateData(object = {}, rownumber = 0) {
  const indexes = sheet[tool.name].Master.indexes;
  let data = { type: `update`, row: rownumber, data: [] };

  for (let key in object) {
    data.data.push({
      index: indexes[key] + 1,
      value: object[key],
    });
  }

  script.run(toSheet, data, tool.name, `Master`);
}

//------------------------- remove-form-helper-function()
function removeForm() {
  const form = fx.$(`.form-base`);
  form.remove();
}

function getFilterActions() {
  const data = sheet.Database.action_access.jsonData.slice();
  const list = document.createElement(`ul`);

  for (let json of data) {
    if (
      json.tool_name == tool.name &&
      json.type == `Filter Action` &&
      json.access.includes(user.email)
    ) {
      const li = document.createElement(`li`);
      li.title = json.action;

      li.addEventListener(`click`, function (e) {
        getTableRows(1, li.title);
      });

      li.append(fx.text2el(json.script), json.action);
      list.append(li);
    }
  }

  return list;
}

function getHeaderActions(condition = ``) {
  const data = sheet.Database.action_access.jsonData.slice();
  const arr = [];

  for (let json of data) {
    if (
      json.tool_name == tool.name &&
      json.type == condition &&
      json.access.includes(user.email)
    ) {
      const span = document.createElement(`span`);
      span.classList.add(`pr-icon`);
      span.title = json.action;
      span.append(fx.text2el(json.script));

      arr.push(span);
    }
  }

  return arr;
}

function toggleNotification(message = ``, type = ``) {
  if (![`info`, `warn`, `error`].includes(type)) return;

  const extraViews = fx.$(`.extra-views`);
  const alertDiv = document.createElement(`div`);
  const infoSpan = document.createElement(`span`);
  const msgSpan = document.createElement(`span`);
  const icons = {
    info: [`ph-fill`, `ph-info`, `alert-span`],
    warn: [`ph-fill`, `ph-warning-circle`, `alert-span`],
    error: [`ph-fill`, `ph-x-circle`, `alert-span`],
  };

  alertDiv.classList.add(type, `msg-div`, `hide`);
  infoSpan.classList.add(...icons[type]);
  msgSpan.classList.add(`msg-span`);

  if (type == `info`) msgSpan.textContent = `Info: ${message}`;
  if (type == `warn`) msgSpan.textContent = `Warning: ${message}`;
  if (type == `error`) msgSpan.textContent = `Error: ${message}`;

  alertDiv.append(infoSpan, msgSpan);
  extraViews.append(alertDiv);

  function toggleVisibility() {
    alertDiv.classList.toggle(`hide`);
    alertDiv.classList.toggle(`show`);
    alertDiv.classList.toggle(`show-alert`);
  }

  toggleVisibility();
  setTimeout(toggleVisibility, 5000);
}
