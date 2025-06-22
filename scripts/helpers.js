/**
 * @description This consists all the helper functions
 */

//---------------------------------------------<( add-loader-helper-function()>-
function addLoader() {
  /**
   * @description This function toggles the loader div
   */
  const schema = {
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
    ],
  };
  const loader = schema2el(schema);
  document.body.append(loader);
}

//----------------------------------------------<( init-form-helper-function()>-
function initForm() {
  const userProps = script.run(`getUserProps`);
  console.log(userProps);
  const formNeeded = !(`username` in userProps) || !(`password` in userProps);
  const properties = [];

  if (formNeeded) {
    document.body.append(schema2el(docSchema.forms.initForm));
  }
}

//---------------------------------------<( get-script-props-helper-function()>-
async function verifyScriptProp() {
  const keyRequired = [`sheetKey`];
  try {
    const scriptProp = await script.run(`getScriptProps`);
    console.log(scriptProp);
  } catch (err) {
    console.log(err);
  }

  const scriptProp = script.run(`getScriptProps`);
  console.log(scriptProp);
  const found = true;

  for (key in keyRequired) {
    if (key in scriptProp) {
      props.user[key] ??= userProps[key];
    } else {
      const msg = `Property no found:- (${key})`;
      found = false;
      notify({ message: msg, type: `error` });
    }
  }

  if (found) verifyUserProp();
}

//---------------------------------------<( verify-user-prop-helper-function()>-
function verifyUserProp() {
  const keyRequired = [`gsKey`, `email`, `name`];
  const userProps = script.run(`getUserProps`);
  let verified = false;

  for (key of keyRequired) {
    if (key in userProps) {
      props.user[key] ??= userProps[key];
    }
    if (key == gsKey) setSheetKey();
    if (key == `email` || `name`) {
      setUserSession();
      break;
    }
  }
}

//------------------------------------------<( set-sheet-key-helper-function()>-
async function setSheetKey() {
  const ssid = sheet.Database.ssid;
  const masterKey = props.script.gsKey;
  const apiData = await sheet.getData(ssid, `api_keys`, masterKey);
  let found = false;

  for (const obj in apiData) {
    if (obj.user_email == props.user.email && obj.status == `active`) {
      if (script.run(`setUserProp`, `sheetKey`, obj.api_key)) {
        verifyUserProp();
        found = true;
      }

      break;
    }
  }

  if (!found) notify({ message: `add-key`, type: `error` });
  return found;
}

//---------------------------------------<( set-user-session-helper-function()>-
function setUserSession() {
  const userExtras = script.run(`getUserExtras`);
  for (key in userExtras) {
    props.user[key] ??= userExtras[key];
  }
}

//------------------------------------------------<( validate-password-event()>-
function validatePassword(e) {
  const target = e.currentTarget;
  const form = target.closest(`form`);
  const submitBtn = fx.$(`#submit`, form);
  const password = target.value;
  const username = fx.$(`.password`, form).value;
  let matched = false;

  for (employee of sheet.Database.Employees) {
    if (employee.Username == username) {
      if (employee.Password == password) {
        submitBtn.disabled = false;
        break;
      }
    }
  }

  if (!matched) {
    return notify({ message: `Check Username and Password`, type: `warn` });
  }
}

//------------------------------------------------<( validate-username-event()>-
function validateUsername(e) {
  const value = e.currentTarget.value;
  let matched = false;

  for (let employee of sheet.Database.Employees) {
    if (value == employee.Username) {
      break;
    }
  }

  if (!matched) {
    return notify({ message: `Check Username`, type: `warn` });
  }
}

//-------------------------------------------------<( init-form-submit-event()>-
function initFormSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
}

//---------------------------------------------<( set-routes-helper-function()>-
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
  notify({ message: `Good to Go`, type: `Info` });
  setTimeout(ghostSync, 300000);
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

  currentView.title = `${viewname == `Master` ? `Orders` : viewname} (${
    start + 1 + ` - ` + end + `/ ` + dataLength
  })`;
  totalPages.disabled = false;
  totalPages.value = total;
  totalPages.disabled = true;
}

//---------------------------------------------<( get-poc-dropdowns-function()>-
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

//---------------------------------------------<( ghost-sync-helper-function()>-
async function ghostSync() {
  /**
   * @description This function works in background to sync realtime data
   */

  const masterData = await sheet.getData(
    sheet[tool.name].ssid,
    `Master`,
    user.apiKey
  );
  distributeData(tool.name, `Master`, masterData);
  setTimeout(ghostSync, 5 * 60 * 1000);
}

//------------------------------------------------<( now-str-helper-function()>-
function nowStr() {
  const d = new Date();
  const pad = (n) => (n < 10 ? '0' + n : n);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
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

//-----------------------------------------<( payload-helper-helper-function()>-
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

//-------------------------------------------<( convert-date-helper-function()>-
function convertDate(date) {
  date = new Date(date);
  const day = String(date.getDate()).padStart(2, 0);
  const month = String(date.getMonth() + 1).padStart(2, 0);
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
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

//--------------------------------------------<( remove-form-helper-function()>-
function removeForm() {
  const form = fx.$(`.form-base`);
  form.remove();
}

//------------------------------------<( get-filter-actions-helper-function())>-
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

//-------------------------------------<( get-header-actions-helper-function()>-
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

//------------------------------------------<( action-access-helper-function()>-
function actionAccess({ type, action }) {
  const actionAccess = sheet.Database.action_access.jsonData().slice();
  return actionAccess.filter(filterAction);

  function filterAction(obj) {
    return (
      obj.tool_name == tool.name &&
      obj.action == action &&
      obj.type == type &&
      obj.access.includes(user.email)
    );
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

  if (
    !sheet ||
    !sheet.schema ||
    !sheet.schema.Action ||
    !sheet.Database ||
    !sheet.Database.column_access ||
    !user ||
    !user.email
  ) {
    notify({
      message: `Required context (sheet, user) is missing.`,
      type: `error`,
    });
  }

  const json = { rownum: rownum || 0 };
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
