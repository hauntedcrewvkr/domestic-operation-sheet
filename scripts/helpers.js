/**
 * @description This consists all the helper functions
 */

//--------------------------------------------------<( start-helper-function()>-
async function start() {
  const functions = [addLoader, setSpreadsheets, setItl, getScriptProps, getUserProps, setMasterData, setColumnAccess, createDocument, () => setInterval(setMasterData, 600000), removeLoader];

  try {
    for (const fn of functions) {
      await fn();
    }
  } catch (err) {
    console.error('Error in sequence:', err);
  }
}

//------------------------------------------------------<( set-column-access )>-
async function setColumnAccess() {
  const data = await gviz.fetchGoogleSheetData(gviz.gvizUrl({ ssid: gsheet.domesticOperationSheet.ssid, sheet: 'Column Access' }));

  for (const json of data.data) {
    if (json.viewers.value.includes(app.user.props.email)) columnProps[json.column_name.value].view.access = true;
    if (json.editors.value.includes(app.user.props.email)) columnProps[json.column_name.value].edit.access = true;
  }
}

//----------------------------------------<( set-master-data-helper-function()>-
async function setMasterData() {
  const url = gviz.gvizUrl({ ssid: gsheet.domesticOperationSheet.ssid, sheet: `Master` });

  const data = await gviz.fetchGoogleSheetData(url);

  gsheet.domesticOperationSheet.master ??= {};
  gsheet.domesticOperationSheet.master.data ??= data.data;
  gsheet.domesticOperationSheet.master.header ??= data.header;

  await setFilterViews(data.data);
}

//----------------------------------------<( set-filter-data-helper-function()>-
async function setFilterViews(data) {
  const views = Object.keys(gsheet.filters);

  for (const json of data) {
    for (const view of views) {
      if (!gsheet.domesticOperationSheet[view]) gsheet.domesticOperationSheet[view] = {};
      if (!gsheet.domesticOperationSheet[view].data) gsheet.domesticOperationSheet[view].data = [];

      if (filterCheck({ json, filter: gsheet.filters[view] })) {
        gsheet.domesticOperationSheet[view].data.push(json);
      }
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
  element.append(
    schema2el({
      tag: `th`,
      sub: [
        { tag: `i`, attr: { class: `ph ph-magnifying-glass` } },
        { tag: `input`, att: { type: `text` } },
      ],
    })
  );

  for (const [group, columns] of Object.entries(gsheet.columnGroup)) {
    if (Array.isArray(columns) && columns.length > 0) {
      element.append(
        schema2el({
          tag: `th`,
          sub: [
            {
              tag: 'div',
              attr: { class: 'th-holder' },
              sub: [
                { tag: `i`, attr: { class: `ph ph-sort-ascending` } },
                { tag: `span`, text: group },
              ],
            },
          ],
        })
      );
    }
  }
}

function setTableRows(element, props = { page: 1, view: `Orders`, rpp: 50 }) {
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

    tdContainer.innerHTML && element.append(tr);
    start++;
  }
}
