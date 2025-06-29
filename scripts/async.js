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
    await setDropdowns();
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
  } catch (error) {
    console.log(`Error Occurred: ${error}`);
  }

  try {
    await removeLoader();
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
}

//----------------------------------------<( set-master-data-async-function()>-
async function setMasterData() {
  const data = await gviz.fetchGoogleSheetData(gviz.gvizUrl({ ssid: gsheet.domesticOperationSheet.ssid, sheet: 'Master' }));

  await setFilterViews(data.data);
}

//-----------------------------------------<( set-filter-data-async-function()>-
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

//----------------------------------------------<( add-loader-async-function()>-
async function addLoader(name = 'main') {
  const loader = schema2el(app.schema.loader[name]);

  document.body.append(loader);

  return loader;
}

//-------------------------------------------<( remove-loader-async-function()>-
async function removeLoader() {
  const loaderDiv = fx.$('.loader-div');
  loaderDiv.remove();
}

//-----------------------------------------<( create-document-async-function()>-
async function createDocument() {
  // prettier-ignore
  document.body.append(
    schema2el(app.schema.body.header),
    schema2el(app.schema.body.nav),
    schema2el(app.schema.body.main),
    schema2el(app.schema.body.footer)
  );
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
}

//---------------------------------------<( set-action-access-async-function )>-
async function setActionAccess() {
  const data = await gviz.fetchGoogleSheetData(gviz.gvizUrl({ ssid: gsheet.domesticOperationSheet.ssid, sheet: 'Action Access' }));
  let parentSchema = { tag: 'div', attr: { class: '', actionname: '' }, sub: [] };

  for (const json of data.data) {
    if (!json.view_access.value.includes(app.user.props.email)) continue;

    const class_ = `${fx.kebabCase(json.action.value)}-holder`;
    const schema = {
      tag: 'span',
      attr: { title: json.action.value },
      sub: [{ tag: 'i', class: app.icon[json.action.value] }],
    };

    json.call_access.value.includes(app.user.props.email) && (schema.attr.onclick ??= actionRouter);

    if (parentSchema.attr.class && parentSchema.attr.class != class_) {
      app.cta[json.action.value] ??= schema2el(parentSchema);
    }

    parentSchema.attr.class = class_;
    parentSchema.attr.actionname ??= json.type.value;
    parentSchema.sub.push(schema);
  }
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
}

//----------------------------------------<( create-dropdown-helper-function()>-
async function setDropdowns(element) {
  const masterData = await gviz.fetchGoogleSheetData(gviz.gvizUrl({ ssid: gsheet.domesticOperationSheet.ssid, sheet: 'Dropdowns' }));
  const employeeData = await app.script.run('getSheetData', { ssid: gsheet.database.ssid, sheetname: 'Employees' });

  // const data = { master: masterData.data.sort(dropdownSort), poc: employeeData.sort(pocSort) };

  for (const [type, json] of Object.entries({ master: masterData.data.sort(dropdownSort), poc: employeeData.sort(pocSort) })) {
    const schema = {
      tag: 'datalist',
      attr: { class: 'dropdown', id: '' },
      sub: [],
    };

    let currColumn = undefined;
    const isMaster = type == 'master';

    for (const obj of json) {
      if (isMaster) {
        if (!schema.attr.id) schema.attr.id = 'poc';

        const value = obj.POC.value;

        schema.sub.push({ tag: 'option', text: value, attr: { value: value } });
      } else {
        const value = obj.dropdown.value;

        if (currColumn == obj.column_name.value) {
          schema.sub.push({ tag: 'option', text: value, attr: { value: value } });
          continue;
        }

        schema.attr.id = fx.kebabCase(obj.column_name.value);
        currColumn = obj.column_name.value;

        element.append(schema2el(schema));
      }
    }

    element.append(schema2el(schema));
  }

  function dropdownSort(a, b) {
    return (a.column_name?.value || '').toLowerCase().localeCompare((b.column_name?.value || '').toLowerCase());
  }
  function pocSort(a, b) {
    return String(a.POC.value || '')
      .toLowerCase()
      .localeCompare(String(b.POC.value || '').toLowerCase());
  }
}
