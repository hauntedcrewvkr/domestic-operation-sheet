//------------------------- get-user's-api-key()
async function getapikey() {
  let apiKeys = await sheet.getData(sheet.Database.ssid, `api_keys`, user.apiKey);

  distributeData(`Database`, `api_keys`, apiKeys);

  for (let json of sheet.Database.api_keys.jsonData) {
    if (json.user_email == user.email) {
      user.apiKey = json.api_key;
    }
  }

  await getRequirements();
}

//------------------------- get-requirement-data()
async function getRequirements() {
  for (let ss in tool.requirements) {
    const sheets = tool.requirements[ss];

    for (let sheetName of sheets) {
      const data = await sheet.getData(sheet[ss].ssid, sheetName, user.apiKey);

      if (!data.length) {
        toggleNotification(`${sheetName} Sheet's Data not Found`, 'error');
      } else {
        distributeData(ss, sheetName, data);
      }
    }
  }

  setRoutes();
}

getapikey();
