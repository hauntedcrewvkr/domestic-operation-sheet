//---------------------------------------------------<( start-async-function()>-
async function start() {
  try {
    await addLoader();
  } catch (error) {}

  try {
    await setSpreadsheets();
  } catch (error) {
    console.log(`Error Occurred: ${error}`);
  }

  try {
    await setItl();
  } catch (error) {
    console.log(`Error Occurred: ${error}`);
  }

  try {
    await setProps();
  } catch (error) {
    console.log(`Error Occurred: ${error}`);
  }

  try {
    await setActionAccess();
  } catch (error) {
    console.log(`Error Occurred: ${error}`);
  }

  try {
    await setColumnAccess();
  } catch (error) {
    console.log(`Error Occurred: ${error}`);
  }

  try {
    await setMasterData();
  } catch (error) {
    console.log(`Error Occurred: ${error}`);
  }

  try {
    await createDocument();
  } catch (error) {
    console.log(`Error Occurred: ${error}`);
  }

  try {
    setInterval(setMasterData, 300000);
    changeLoaderProgress(100);
  } catch (error) {
    console.log(`Error Occurred: ${error}`);
  }

  try {
    // setTimeout(async () => await removeLoader(), 1000);
  } catch (error) {
    console.log(`Error Occurred: ${error}`);
  }
}

//---------------------------------------<( set-column-access-async-function()>-
async function setColumnAccess() {
  const data = await gviz.fetchGoogleSheetData(gviz.gvizUrl({ ssid: gsheet.domesticOperationSheet.ssid, sheet: 'Column Access' }));

  for (const json of data.data) {
    const columnProps = gsheet.columnProps;

    json.viewers.value.includes(app.user.props.email) && (columnProps[json.column_name.value].view.access = true);
    json.editors.value.includes(app.user.props.email) && (columnProps[json.column_name.value].edit.access = true);
  }

  changeLoaderProgress(62);
}

//-----------------------------------------<( set-master-data-async-function()>-
async function setMasterData() {
  const data = await gviz.fetchGoogleSheetData(gviz.gvizUrl({ ssid: gsheet.domesticOperationSheet.ssid, sheet: 'Master' }));

  gsheet.domesticOperationSheet.Master ??= {};
  gsheet.domesticOperationSheet.Master.headers ??= data.header;

  await setFilterViews(data.data.reverse());
  changeLoaderProgress(75);
}

//-----------------------------------------<( set-filter-data-async-function()>-
async function setFilterViews(data) {
  const views = Object.keys(gsheet.filters);
  const viewMap = {};

  for (const json of data) {
    for (const view of views) {
      if (filterCheck({ json, filter: gsheet.filters[view] })) {
        (viewMap[view] ??= []).push(json);
      }
    }
  }

  for (const view of views) {
    gsheet.domesticOperationSheet[view] = {
      ...(gsheet.domesticOperationSheet[view] || {}),
      data: viewMap[view] || [],
    };
  }
}

//----------------------------------------------<( add-loader-async-function()>-
async function addLoader(name = 'main') {
  const loader = schema2el(app.schema.loader[name]);
  document.body.append(loader);

  return loader;
}

//-------------------------------------------<( remove-loader-async-function()>-
async function removeLoader() {
  const loaderDiv = fx.$('.loader-div');

  fx.removeInnerHTML(loaderDiv);
  loaderDiv.remove();
}

//-----------------------------------------<( create-document-async-function()>-
async function createDocument() {
  // prettier-ignore
  document.body.append(
    schema2el(app.schema.body.header),
    schema2el(app.schema.body.nav),
    schema2el(app.schema.body.main),
    schema2el(app.schema.body.footer),
  );

  setTableRows();
  changeLoaderProgress(87);
}

//-------------------------------------------------<( set-itl-async-function()>-
async function setItl() {
  const data = await app.script.run('getSheetData', { ssid: gsheet.database.ssid, sheetname: 'ITL Reference' });

  for (row of data) {
    const orderType = fx.camelCase(row.order_type.value);
    itl.company[orderType].name ??= row.company.value;
    itl.company[orderType].accessToken ??= row.access_token.value;
    itl.company[orderType].secretKey ??= row.secret_key.value;
    itl.company[orderType].pickupAddressId ??= row.pickup_address_id.value;
    itl.company[orderType].returnAddressId ??= row.return_address_id.value;
  }

  changeLoaderProgress(25);
}

//---------------------------------------<( set-action-access-async-function )>-
async function setActionAccess() {
  let data;

  try {
    data = await gviz.fetchGoogleSheetData(gviz.gvizUrl({ ssid: gsheet.domesticOperationSheet.ssid, sheet: 'Action Access' }));
  } catch (error) {
    console.error('Error fetching Google Sheet data:', error);
    return;
  }

  const sortedRows = data.data.filter((row) => row.view_access.value.includes(app.user.props.email)).sort((a, b) => String(a.type.value?.toLowerCase().trim() || '').localeCompare(String(b.type.value?.toLowerCase().trim() || '')));

  let currentType = undefined;
  let parentSchema = null;

  for (const row of sortedRows) {
    if (!row.view_access.value.includes(app.user.props.email)) continue;

    const type = row.type.value;
    const action = row.action.value;
    const subType = row.sub_type.value;

    const schema = { tag: 'span', attr: { title: action, class: 'icon', onclick: subType == 'view' ? 'viewRouter(event)' : `${fx.camelCase(action)}(event)` }, sub: [{ tag: 'i', attr: { class: app.icon[action] } }] };

    if (currentType !== type) {
      if (parentSchema && currentType) app.cta[currentType] ??= schema2el(parentSchema);

      parentSchema = { tag: 'div', attr: { class: fx.kebabCase(type) + '-holder' }, sub: [schema] };
      currentType = type;
    } else {
      parentSchema.sub.push(schema);
    }
  }

  if (parentSchema && currentType) {
    app.cta[currentType] ??= schema2el(parentSchema);
  }

  changeLoaderProgress(50);
}

//---------------------------------------<( set-spreadsheets-async-function()>-
async function setSpreadsheets() {
  const data = await app.script.run('getSpreadsheets');

  for (const row of data) {
    const spreadsheet = fx.camelCase(row.spreadsheet.value);
    gsheet[spreadsheet] = {};
    gsheet[spreadsheet].ssid = row.ssid.value;
  }

  gsheet.database.spreadsheets ??= {};
  gsheet.database.spreadsheets.data ??= data;

  changeLoaderProgress(12);
}

//-----------------------------------------------<( set-props-async-function()>-
async function setProps() {
  const scriptProps = await app.script.run('getAllProps');

  for (const [role, propArr] of Object.entries(scriptProps)) {
    if (propArr.length < 2) {
      app[role].props = propArr[0] || {};
    } else {
      for (const props of propArr) {
        for (const [prop, propVal] of Object.entries(props)) {
          app[role].props[prop] ??= propVal;
        }
      }
    }
  }

  changeLoaderProgress(37);
}

//----------------------------------------<( create-dropdown-helper-function()>-
async function setDropdowns(element) {
  let masterData, employeeData;

  try {
    masterData = await gviz.fetchGoogleSheetData(gviz.gvizUrl({ ssid: gsheet.domesticOperationSheet.ssid, sheet: 'Dropdowns' }));

    employeeData = await app.script.run('getSheetData', {
      ssid: gsheet.database.ssid,
      sheetname: 'Employees',
    });
  } catch (error) {
    console.error('Error:', error);
    return;
  }

  const datasets = {
    master: masterData.data.sort(dropdownSort),
    poc: employeeData.sort(pocSort),
  };

  for (const [type, json] of Object.entries(datasets)) {
    const isMaster = type === 'master';

    if (!isMaster) {
      const schema = {
        tag: 'datalist',
        attr: { class: 'dropdown', id: 'poc' },
        sub: employeeData.map((obj) => {
          const value = obj.POC.value;
          return { tag: 'option', text: value, attr: { value } };
        }),
      };
      element.append(schema2el(schema));
      continue;
    }

    // for master
    let currentColumn = '';
    let schema = null;

    for (const obj of json) {
      const column = obj.column_name.value;
      const value = obj.dropdown.value;

      if (column !== currentColumn) {
        if (schema) {
          element.append(schema2el(schema));
        }

        currentColumn = column;
        schema = { tag: 'datalist', attr: { class: 'dropdown', id: fx.kebabCase(column) }, sub: [] };
      }

      schema.sub.push({ tag: 'option', text: value, attr: { value } });
    }

    if (schema) {
      element.append(schema2el(schema));
    }
  }

  function dropdownSort(a, b) {
    return String(a.column_name.value || '')
      .toLowerCase()
      .localeCompare(String(b.column_name.value || '').toLowerCase());
  }

  function pocSort(a, b) {
    return String(a.POC.value || '')
      .toLowerCase()
      .localeCompare(String(b.POC.value || '').toLowerCase());
  }
}
