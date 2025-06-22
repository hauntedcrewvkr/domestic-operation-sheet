function createDocument() {
  schema2el({ schema: doc.schema.header });
  schema2el({ schema: doc.schema.nav });
  schema2el({ schema: doc.schema.main });
  schema2el({ schema: doc.schema.footer });
}

function getActions(type) {
  /**
   * @description This function creates the list of actions of the type mentioned
   * @param {"First Visible Action", "Second Visible Action", "Filter Action", "Sub Action"} type
   * @returns List item
   */

  const actionAccess = sheet.Database.action_access.jsonData;
  const ul = document.createElement(`ul`);

  ul.setAttribute(`type`, type);

  for (let json of actionAccess) {
    if (!json.access || !json.tool_name || json.type != type) continue;
    if (json.tool_name == tool.name && json.access.includes(user.email)) {
      const li = document.createElement(`li`);
      const i = tool.actions[json.action].icon;

      li.append(i);
      li.title = json.action;
      ul.append(li);
    }
  }

  return ul;
}

function createDataLists() {
  const datalistTemp = doc.datalist;
  const dropdowns = sheet.Database.dropdowns.jsonData;

  const datalistMap = {};
  const valueSetMap = {};

  for (let i = 0; i < dropdowns.length; i++) {
    const json = dropdowns[i];
    if (json.tool_name !== tool.name) continue;

    const colName = json.column_name;

    if (!datalistMap[colName]) {
      datalistMap[colName] = document.createElement('datalist');
      datalistMap[colName].id = fx.kebabCase(colName);
      valueSetMap[colName] = new Set();
      datalistTemp.appendChild(datalistMap[colName]);
    }

    if (!valueSetMap[colName].has(json.value)) {
      valueSetMap[colName].add(json.value);
      datalistMap[colName].appendChild(
        Object.assign(document.createElement('option'), { value: json.value })
      );
    }
  }

  return datalistTemp;
}

function getForm(type = ``) {}

console.log(`script linked`);
