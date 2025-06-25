/**
 * @description This consists all the helper functions
 */

//--------------------------------------------------<( start-helper-function()>-
function start() {
  let loader = getLoader();
  document.body.append(loader);
  setSpreadsheets();
  setItl();
  getScriptProps();
  getUserProps();
  createDocument();
  loader.remove();
}

//----------------------------------------<( create-document-helper-function()>-
function createDocument() {
  const header = schema2el(app.schema.body.header);
  const nav = schema2el(app.schema.body.nav);
  const main = schema2el(app.schema.body.main);
  const footer = schema2el(app.schema.body.footer);

  document.body.append(header, nav, main, footer);
}

//------------------------------------------------<( set-itl-helper-function()>-
async function setItl() {
  const data = await app.script.run(`getSheetData`, { ssid: gsheet.database.ssid, sheetname: `ITL Reference` });

  for (const row of data) {
    const orderType = fx.camelCase(row.order_type.value);
    itl.company[orderType].name ??= row.company.value;
    itl.company[orderType].accessToken ??= row.access_token.value;
    itl.company[orderType].secretKey ??= row.secret_key.value;
    itl.company[orderType].pickupAddressId ??= row.pickup_address_id.value;
    itl.company[orderType].returnAddressId ??= row.return_address_id.value;
  }
}

//------------------------------------<( set-primary-actions-helper-function()>-
async function setPrimaryActions(element) {
  const url = gviz.gvizUrl({ ssid: gsheet.database.ssid, sheet: `action_access` });
  const data = await gviz.fetchGoogleSheetData(url);

  gsheet.database.action_access.data ??= data.data;
  gsheet.database.action_access.headers ??= data.header;

  for (const row in data.data) {
    if (row.type.value == `Primary Action` && row.access.value.includes(app.user.props.email)) {
      const schema = {
        tag: `li`,
        attr: { title: row.action.value },
        func: getIcon,
      };

      element.append(schema2el(schema));
    }
  }
}

//----------------------------------<( set-secondary-actions-helper-function()>-
async function setSecondaryActions(element) {
  const url = gviz.gvizUrl({ ssid: gsheet.database.ssid, sheet: `action_access` });
  const data = await gviz.fetchGoogleSheetData(url);

  gsheet.database.action_access.data ??= data.data;
  gsheet.database.action_access.headers ??= data.header;

  for (const row in data.data) {
    if (row.type.value == `Secondary Action` && row.access.value.includes(app.user.props.email)) {
      const schema = {
        tag: `li`,
        attr: { title: row.action.value },
        fun: getIcon,
      };

      element.append(schema2el(schema));
    }
  }
}

//---------------------------------------<( set-spreadsheets-helper-function()>-
async function setSpreadsheets() {
  const data = await app.script.run(`getSpreadsheets`);

  for (const row of data) {
    const spreadsheet = fx.camelCase(row.spreadsheet_name.value);
    gsheet[spreadsheet] = {};
    gsheet[spreadsheet].ssid = row.id.value;
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

  if (schema.attr) {
    for (const [key, val] of Object.entries(schema.attr)) {
      el.setAttribute(key, val);
    }
  }

  if (schema.sub && Array.isArray(schema.sub)) {
    for (const childSchema of schema.sub) {
      const childEl = schema2el(childSchema); // recursion
      el.appendChild(childEl);
    }
  }

  return el;
}

//---------------------------------------------<( get-loader-helper-function()>-
function getLoader(loader = `main`) {
  return schema2el(app.schema.loader[loader]);
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

//----------------------------------------<( create-datalist-helper-function()>-
function createDatalist(element) {
  if (!fx.$(`#dropdowns`)) {
    const dropdownContainer = schema2el(app.schema.datalist);
    element.append(dropdownContainer);
  }

  return fx.$(`#dropdowns`);
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
  let data = gsheet?.database?.action_access?.data || undefined;
  if (!data) {
    const url = gviz.gvizUrl({ ssid: gsheet.database.ssid, sheet: `action_access` });
    const sheetData = gviz.fetchGoogleSheetData(url);

    data = sheetData.data;
    gsheet.database.action_access.data = sheetData.data;
    gsheet.database.action_access.header = sheetData.header;
  }

  for (row of data) {
    if (row.access.value.contains(user.email) && row.type.value == `View Action`) {
      const schema = {
        tag: `li`,
        attr: { title: row.action.value },
        func: getIcon,
      };

      element.append(schema2el(schema));
    }
  }
}

//-----------------------------------------------<( get-icon-helper-function()>-
function getIcon(element) {
  const icons = {
    'Add New Order': `ph ph-user-circle-plus`,
    'Create Order': `ph ph-webhooks-logo`,
    'Download': `ph ph-cloud-arrow-down`,
    'My Orders': `ph ph-user`,
    'Filter': `ph ph-funnel`,
    'Change Account': `ph ph-buildings`,
    'Change Email': `ph ph-at`,
    'Sync': `ph ph-arrows-clockwise`,
    'Medisellers COD': `ph ph-money`,
    'Medicare COD': `ph ph-money-wavy`,
    'Payment Not Received': `ph ph-not-equals`,
    'Payment Received': `ph ph-equals`,
    'Overview': `ph ph-chart-bar`,
    'Dispatch + Menifest': `ph ph-truck`,
    'T-1 Orders': `ph ph-number-one`,
    'Dispatch + RTO': `ph ph-arrow-u-left-down`,
    'RTO Delivered': `ph ph-hand-arrow-down`,
    'Pending Orders': `ph ph-hourglass`,
    'Unconfirmed Returns': `ph ph-not-subset-of`,
    'To Check': `ph ph-list-checks`,
    'Payments': `ph ph-currency-dollar-simple`,
    'Toggle Sub Action': `ph ph-arrow-right`,
    'Raise Issue': `ph ph-warning`,
    'See Followups': `ph ph-chat`,
    'Change Dispatch Status': `ph ph-cube`,
    'Add Remarks': `ph ph-file-plus`,
    'Order Confirmation Message': `ph ph-whatsapp-logo`,
    'Mark Resolved': `ph ph-thumbs-up`,
    'Payment Confirmation Yes': `ph ph-check-circle`,
    'Payment Confirmation No': `ph ph-x-circle`,
    'Edit Row': `ph ph-pencil-simple-line`,
    'Orders': `fas fa-cart-shopping`,
    'Get Initial Confirmation': `fas fa-asterisk`,
    'Confirm Payments': `fas fa-credit-card`,
    'Generate Orders': `fas fa-face-smile-beam`,
    'Raised Issues': `fas fa-hand`,
    'COD': `fas fa-money-bill-1-wave`,
    'Processed Orders': `fas fa-microchip`,
  };
  const schema = {
    tag: `i`,
    attr: { class: icons[element.title] },
  };

  element.append(schema2el(schema));
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

//---------------------------------------------<( ghost-sync-helper-function()>-
async function ghostSync() {
  /**
   * @description This function works in background to sync realtime data
   */

  const masterData = await sheet.getData(sheet[tool.name].ssid, `Master`, user.apiKey);
  distributeData(tool.name, `Master`, masterData);
  setTimeout(ghostSync, 5 * 60 * 1000);
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

//--------------------------------------------<( update-data-helper-function()>-
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

//------------------------------------<( get-filter-actions-helper-function())>-
function getFilterActions() {
  const data = sheet.Database.action_access.jsonData.slice();
  const list = document.createElement(`ul`);

  for (let json of data) {
    if (json.tool_name == tool.name && json.type == `Filter Action` && json.access.includes(user.email)) {
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

//-------------------------------------<( get-header-actions-helper-function()>-
function getHeaderActions(condition = ``) {
  const data = sheet.Database.action_access.jsonData.slice();
  const arr = [];

  for (let json of data) {
    if (json.tool_name == tool.name && json.type == condition && json.access.includes(user.email)) {
      const span = document.createElement(`span`);
      span.classList.add(`pr-icon`);
      span.title = json.action;
      span.append(fx.text2el(json.script));

      arr.push(span);
    }
  }

  return arr;
}

//------------------------------------------<( action-access-helper-function()>-
function actionAccess({ type, action }) {
  const actionAccess = sheet.Database.action_access.jsonData().slice();
  return actionAccess.filter(filterAction);

  function filterAction(obj) {
    return obj.tool_name == tool.name && obj.action == action && obj.type == type && obj.access.includes(user.email);
  }
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

//-----------------------------------------<( distribut-data-helper-function()>-
function distributeData({ ss, sheetname, data = [] }) {
  if (!ss || !sheetname || data.length == 0) {
    notify({ message: `No Data Found`, type: `error` });
  }

  data = data.slice();

  !(ss in sheet) && (sheet[ss] = {});
  !(sheetname in sheet[ss]) && (sheet[ss][sheetname] = {});

  sheet[ss][sheetname].jsonData ??= [];
  sheet[ss][sheetname].arrayData ??= data;

  const headers = data.shift();
  const indexes = Object.fromEntries(
    headers.map(function (head, index) {
      return [head, index + 1];
    })
  );

  data = data.reverse();

  sheet[ss][sheetname].indexes = indexes;

  data.forEach(dataAction);

  function dataAction(row, index) {
    const json = toJson({ data: row, header: headers, rownum: index + 2 });
    sheet[ss][sheetname].jsonData.unshift(json);

    if (ss == `Domestic Operation Sheet` && sheetname == `Master`) {
      const json = filterJson({
        data: row,
        header: headers,
        rownum: index + 2,
      });

      for (filter in sheet.filters) {
        !(filter in sheet[ss]) && (sheet[ss][filter] = {});

        sheet[ss][filter].arrayData ??= [];
        sheet[ss][filter].jsonData ??= [];

        const filterObj = sheet.filters[filter];
        const passed = checkFilterCondition({ obj: json, filter: filterObj });

        if (passed) {
          sheet[ss][filter].arrayData.unshift(row);
          sheet[ss][filter].jsonData.unshift(json);
        }
      }
    }
  }
}

//---------------------------------<( check-filter-condition-helper-function()>-
function checkFilterCondition({ obj = {}, filter = {} }) {
  let bool = true;

  for (const colname in filter.equal) {
    if (bool == false) break;
    bool = filter.equal[colname] == obj[colname].value;
  }

  for (const colname in filter.notEqual) {
    if (bool == false) break;
    bool = filter.equal[colname] != obj[colname].value;
  }

  return bool;
}

//------------------------------------------------<( to-json-helper-function()>-
function toJson({ data, header, rownum }) {
  if (data.length == 0 || header.length == 0) {
    notify({ message: `Data Error`, type: `error` });
  }

  const json = { rownum: rownum };

  header.forEach(function (head, index) {
    json[head] ??= data[index];
  });

  return json;
}

//--------------------------------------------<( filter-json-helper-function()>-
function filterJson({ data, header, rownum }) {
  if (data.length == 0 || header.length == 0 || !rownum) {
    notify({ message: `Data Error`, type: `error` });
  }

  if (!sheet || !sheet.schema || !sheet.schema.Action || !sheet.Database || !sheet.Database.column_access || !user || !user.email) {
    notify({
      message: `Required context (sheet, user) is missing.`,
      type: `error`,
    });
  }

  const json = { rownum: rownum || 0 };
  const actions = Object.keys(sheet.schema.Action);
  const accessMap = new Map(sheet.Database.column_access.jsonData.map((a) => [a.column_name, a]));

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
