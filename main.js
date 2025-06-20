//------------------------- get-user's-api-key()
async function getapikey() {
  let apiKeys = await sheet.getData(sheet.Database.ssid, `api_keys`, user.apiKey);
  distributeData({ ss: `Database`, sheetname: `api_keys`, data: apiKeys });

  for (let json of sheet.Database.api_keys.jsonData) {
    if (json.user_email == user.email) {
      user.apiKey = json.api_key;
    }
  }

  await getRequirements();
}

//------------------------- get-requirement-data()
async function getRequirements() {
  const spreadsheets = Object.keys(tool.requirements);

  for (const spreadsheet of spreadsheets) {
    const sheets = tool.requirements[spreadsheet];

    for (const sheetname of sheets) {
      const data = await sheet.getData(sheet[spreadsheet].ssid, sheetname, user.apiKey);
      distributeData({ ss: spreadsheet, sheetname, data });
    }
  }

  setRoutes();
}

getapikey();
