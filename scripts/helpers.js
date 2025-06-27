/**
 * @description This consists all the helper functions
 */

//--------------------------------------------------<( start-helper-function()>-
async function start() {
  const functions = [addLoader, setSpreadsheets, setItl, getScriptProps, getUserProps, setMasterData, createDocument, () => setInterval(setMasterData, 600000), removeLoader];

  try {
    for (const fn of functions) {
      await fn();
    }
    console.log(`All Functions Completed`);
  } catch (err) {
    console.error('Error in sequence:', err);
  }
}

//----------------------------------------<( set-master-data-helper-function()>-
async function setMasterData() {
  const url = gviz.gvizUrl({ ssid: gsheet.domesticOperationSheet.ssid, sheet: `Master` });

  gviz.fetchGoogleSheetData(url).then(function (data) {
    console.log(data);
    gsheet.domesticOperationSheet.master ??= {};
    gsheet.domesticOperationSheet.master.data ??= data.data;
    gsheet.domesticOperationSheet.master.header ??= data.header;

    setFilterViews(data.data).then(function () {
      return;
    });
  });
}

//----------------------------------------<( set-filter-data-helper-function()>-
async function setFilterViews(data) {
  const views = Object.keys(gsheet.filters);

  for (const json of data) {
    for (const view of views) {
      if (!gsheet.domesticOperationSheet[view]) gsheet.domesticOperationSheet[view] = {};
      if (!gsheet.domesticOperationSheet[view].data) gsheet.domesticOperationSheet[view].data = [];

      filterCheck({ json: json, filter: gsheet.filters[view] }) && gsheet.domesticOperationSheet[view].data.push(json);
    }
  }
}

//-------------------------------------------<( filter-check-helper-function()>-
function filterCheck({ json, filter }) {
  const operators = fx.checkers;

  for (const [operator, obj] of Object.entries(filter)) {
    for (const [column, value] of Object.entries(obj)) {
      if (!operators[operator](json[column].value, value)) return false;
    }
  }

  return true;
}

//----------------------------------------<( add-main-loader-helper-function()>-
function addLoader(name = `main`) {
  const loader = schema2el(app.schema.loader[name]);
  document.body.append(loader);
  return loader;
}

//------------------------------------------<( remove-loader-helper-function()>-
function removeLoader() {
  const loaderDiv = fx.$(`.loader-div`);
  loaderDiv.remove();
}

//----------------------------------------<( create-document-helper-function()>-
async function createDocument() {
  const header = schema2el(app.schema.body.header);
  const nav = schema2el(app.schema.body.nav);
  const main = schema2el(app.schema.body.main);
  const footer = schema2el(app.schema.body.footer);

  document.body.append(header, nav, main, footer);
}

//------------------------------------------------<( set-itl-helper-function()>-
async function setItl() {
  app.script.run(`getSheetData`, { ssid: gsheet.database.ssid, sheetname: `ITL Reference` }).then(function (data) {
    for (row of data) {
      const orderType = fx.camelCase(row.order_type.value);
      itl.company[orderType].name ??= row.company.value;
      itl.company[orderType].accessToken ??= row.access_token.value;
      itl.company[orderType].secretKey ??= row.secret_key.value;
      itl.company[orderType].pickupAddressId ??= row.pickup_address_id.value;
      itl.company[orderType].returnAddressId ??= row.return_address_id.value;
    }
  });
}

//------------------------------------<( set-primary-actions-helper-function()>-
function setPrimaryActions(element) {
  const url = gviz.gvizUrl({ ssid: gsheet.domesticOperationSheet.ssid, sheet: `Action Access` });

  gviz.fetchGoogleSheetData(url).then(function (data) {
    gsheet.database.actionAccess ??= {};
    gsheet.database.actionAccess.data ??= data.data;
    gsheet.database.actionAccess.headers ??= data.header;

    for (const row of data.data) {
      if (row.type.value == `Primary Action` && row.access.value.includes(app.user.props.email)) {
        element.append(schema2el({ tag: `li`, attr: { title: row.action.value }, func: [getIcon] }));
      }
    }
  });
}

//----------------------------------<( set-secondary-actions-helper-function()>-
function setSecondaryActions(element) {
  const url = gviz.gvizUrl({ ssid: gsheet.domesticOperationSheet.ssid, sheet: `Action Access` });

  gviz.fetchGoogleSheetData(url).then(function (data) {
    gsheet.domesticOperationSheet.ActionAccess ??= {};
    gsheet.domesticOperationSheet.ActionAccess.data ??= data.data;
    gsheet.domesticOperationSheet.ActionAccess.headers ??= data.header;

    for (const row of data.data) {
      if (row.type.value == `Secondary Action` && row.access.value.includes(app.user.props.email)) {
        element.append(schema2el({ tag: `li`, attr: { title: row.action.value }, func: [getIcon] }));
      }
    }
  });
}

//---------------------------------------<( set-spreadsheets-helper-function()>-
async function setSpreadsheets() {
  const data = await app.script.run(`getSpreadsheets`);

  for (const row of data) {
    const spreadsheet = fx.camelCase(row.spreadsheet.value);
    gsheet[spreadsheet] = {};
    gsheet[spreadsheet].ssid = row.ssid.value;
  }

  gsheet.database.spreadsheets ??= {};
  gsheet.database.spreadsheets.data ??= data;
}

//--------------------------------------------<( add-shimmer-helper-function()>-
function addShimmerEffect(element) {
  element.classList.add('shimmer');
}

//-----------------------------------------<( remove-shimmer-helper-function()>-
function removeShimmerEffect(element) {
  element.classList.remove('shimmer');
}

//----------------------------------------------<( schema2el-helper-function()>-
function schema2el(schema = {}) {
  const el = document.createElement(schema.tag);

  if (schema.text) el.textContent = schema.text;

  if (schema.attr) {
    for (const [key, val] of Object.entries(schema.attr)) el.setAttribute(key, val);
  }

  if (schema.func && schema.func.length > 0) {
    for (const fx of schema.func) fx(el);
  }

  if (schema.sub && Array.isArray(schema.sub)) {
    for (const childSchema of schema.sub) el.appendChild(schema2el(childSchema));
  }

  return el;
}

//--------------------------------<( change-loader-progress-herlper-function()>-
function changeLoaderProgress(progress) {
  /**
   * @description Update progress bar width using CSS variable
   * @param {number} progress - 0 to 100
   */
  progress = Math.max(0, Math.min(100, progress));
  const styleVariables = document.documentElement.style;
  styleVariables.setProperty(`--progress-width`, `${progress}%`);
}

//---------------------------------------<( get-script-props-helper-function()>-
async function getScriptProps() {
  const scriptProp = await app.script.run(`getScriptProps`);

  for (const prop in scriptProp) {
    app.script.props[prop] ??= scriptProp[prop];
  }
}

//---------------------------------------<( verify-user-prop-helper-function()>-
async function getUserProps() {
  const userProps = await app.script.run(`getUserProps`);

  for (const prop in userProps) {
    app.user.props[prop] ??= userProps[prop];
  }

  const userExtraProps = await app.script.run(`getUserExtraProps`);

  for (const prop in userExtraProps) {
    app.user.props[prop] ??= userExtraProps[prop];
  }
}

//----------------------------------------------------------<( add-name-form()>-
function addNameForm() {
  const form = schema2el(app.schema.forms.addNameForm);
  document.body.append(form);
}

//----------------------------------------<( create-dropdown-helper-function()>-
function createDropdown({ data = [], name }) {
  const dropdownContainer = fx.$(`#dropdowns`);
  const dlSchema = { tag: `datalist`, attr: { id: name, class: name } };
  const datalist = fx.$(`#${name}`) || schema2el(dlSchema);

  for (const item of data) {
    if (fx.$(`option[value="${item}"]`, datalist)) continue;

    const schema = { tag: `option`, attr: { value: item } };
    const option = schema2el(schema);

    datalist.append(option);
  }

  dropdownContainer.append(datalist);
}

//---------------------------------------<( set-view-actions-helper-function()>-
function setViewActions(element) {
  const url = gviz.gvizUrl({ ssid: gsheet.domesticOperationSheet.ssid, sheet: `Action Access` });

  gviz.fetchGoogleSheetData(url).then(function (data) {
    gsheet.domesticOperationSheet.actionAccess ??= {};
    gsheet.domesticOperationSheet.actionAccess.data ??= data.data;
    gsheet.domesticOperationSheet.actionAccess.header ??= data.header;

    for (row of data.data) {
      if (row.access.value.includes(app.user.props.email) && row.type.value == `View Action`) {
        element.append(schema2el({ tag: `li`, attr: { title: row.action.value }, func: [getIcon] }));
      }
    }
  });
}

//-----------------------------------------------<( get-icon-helper-function()>-
function getIcon(element) {
  element.append(schema2el({ tag: `i`, attr: { class: app.icons[element.title] } }));
}

//-----------------------------------------<( get-table-rows-helper-function()>-
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

  currentView.title = `${viewname == `Master` ? `Orders` : viewname} (${start + 1 + ` - ` + end + `/ ` + dataLength})`;
  totalPages.disabled = false;
  totalPages.value = total;
  totalPages.disabled = true;
}

//---------------------------------------<( get-order-number-helper-function()>-
function getOrderNo(condition) {
  let data = sheet[tool.name].Master.jsonData.slice();
  let orders = data.filter(function (value) {
    return value.DATE == condition;
  });
  return orders.length + 1;
}

//--------------------------------------------<( append-data-helper-function()>-
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

//----------------------------------------<( response-adjust-helper-function()>-
function responseAdjust(results = [], data = []) {
  const indexes = sheet[tool.name].Master.indexes;
  let arr = [];

  results.forEach(function (result) {
    const row = data.find((r) => r[`ID`] == result.id);

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

//----------------------------------------------<( fetch-api-helper-function()>-
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
            tracking_url: json?.data[key]?.waybill ? baseTrack + json?.data[key]?.waybill : ``,
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

//-----------------------------------------<( payload-helper-helper-function()>-
function payloadHelper(data = {}, returnAddressId = ``) {
  return {
    waybill: ``,
    order: data[`ID`],
    sub_order: ``,
    order_date: convertDate(data[`DATE`]),
    total_amount: data[`Order Type`] == `COD` ? data[`Balance Amount (To be paid) (INR)`] : data[`Total Amount  (INR)`],
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
        product_price: data[`Order Type`] == `COD` ? data[`Balance Amount (To be paid) (INR)`] : data[`Total Amount  (INR)`],
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

//-------------------------------------------------<( notify-helper-function()>-
function notify({ message, type }) {
  if (![`info`, `warn`, `error`].includes(type)) return;

  const icon = {
    info: `ph-fill ph-info alert-span`,
    warn: `ph-fill ph-warning-circle alert-span`,
    error: `ph-fill ph-x-circle alert-span`,
  };

  const schema = {
    tag: `div`,
    attr: { class: type },
    func: [removeElement, toggleVisibility],
    sub: [
      {
        tag: `i`,
        attr: { class: icon[type] },
      },
      {
        tag: `i`,
        attr: { class: ``, innerhtml: message },
      },
    ],
  };

  function toggleVisibility(element) {
    function toggle() {
      element.classList.toggle(`hide`);
      element.classList.toggle(`show`);
      element.classList.toggle(`show-alert`);
    }

    toggle();
    setTimeout(toggle, 5000);
  }
  return schema2el({ schema: schema });
}

//-----------------------------------------<( remove-element-helper-function()>-
function removeElement({ element, urgent = false }) {
  if (urgent) element.remove();
  if (!urgent) setTimeout(() => element.remove(), 500);
}

function setTableHeaders(element) {
  // prettier-ignore
  element.append(schema2el({ tag: `th`, sub: [{ tag: `i`, attr: { class: `ph ph-magnifying-glass` } }, { tag: `input`, att: { type: `text` } }] }));

  for (const [group, columns] of Object.entries(gsheet.columnGroup)) {
    if (Array.isArray(columns) && columns.length > 0) {
      //prettier-ignore
      element.append(schema2el({ tag: `th`, sub: [ { tag: `i`, attr: { class: `ph ph-sort-ascending` } }, { tag: `span`, text: group } ] }));
    }
  }
}

function setTableRows(element, props = { page: 1, view: `Orders`, rpp: 50 }) {
  console.log(gsheet.domesticOperationSheet[props.view]);
  console.log(gsheet.domesticOperationSheet[props.view]);
  const data = gsheet.domesticOperationSheet[props.view].data;
  let start = props.page > 0 ? props.rpp * (props.page - 1) : 0;
  const end = Math.min(start + props.rpp, data.length);

  while (start < end) {
    const tr = schema2el({ tag: `tr`, attr: { class: `table-row`, onclick: `seeDetails(event)`, rowNum: start + 2 } });

    for (const [group, columns] of Object.entries(gsheet.columnGroup)) {
      const td = schema2el({ tag: `td`, sub: [{ tag: `div` }] });
      const tdContainer = fx.$(`div`, td);

      for (const column of columns) {
        if (gsheet.columnProps[column].view.access) {
          const el = schema2el(gsheet.columnProps[column].view.schema);
          el.textContent = data[start][column].value;

          tdContainer.append(el);
        }
      }

      tr.append(td);
    }

    element.append(tr);
    start++;
  }
}
