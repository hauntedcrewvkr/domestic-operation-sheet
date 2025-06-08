///------------------------ get-user's-api-key
async function getapikey() {
  let apiKeys = await sheet.getData(
    sheet.Database.ssid,
    `api_keys`,
    user.apiKey
  );

  distributeData(`Database`, `api_keys`, apiKeys);

  let headers = apiKeys.shift();

  for (let api of apiKeys) {
    if (api[headers.indexOf(`user_email`)] == user.email) {
      user.apiKey = api[headers.indexOf(`api_key`)];
    }
  }

  await getRequirements();
}

///------------------------ get-requirement-data
async function getRequirements() {
  let requirements = await sheet.getData(
    sheet.Database.ssid,
    `requirement`,
    user.apiKey
  ); //requirement-sheet-data

  distributeData(`Database`, `requirement`, requirements);

  if (requirements.length === 0) return; //return-if-data-not-found

  ///------------------------ initial-variables
  let headers = requirements.shift(); //requirement-data-headers
  let tool_index = headers.indexOf(`tool`); //tool-column-index
  let ss_index = headers.indexOf(`spreadsheet`); //spreadsheet-column-indes
  let sheet_index = headers.indexOf(`sheet`); //sheet-column-index

  ///------------------------ set-requirement-data
  for (let req of requirements) {
    let toolName = req[tool_index]; //tool-name

    if (toolName !== tool.name) continue; //goto-next-loop-if-tool-name-doesn't-match

    let ss = req[ss_index]; //spreadsheet-name
    let sheetName = req[sheet_index]; //sheet-name
    let data = await sheet.getData(sheet[ss].ssid, sheetName, user.apiKey);

    distributeData(ss, sheetName, data);
  }

  setRoutes();
  // createTable();
  // filterAndActions();
  // await createNav();
  // toggleLoader();
}

async function createNav() {
  let data = DATA.view_access;

  if (data.length === 0) return;

  const headers = data.shift();
  const tool_in = headers.indexOf(`tool_name`);
  const access_in = headers.indexOf(`access`);
  const script_in = headers.indexOf(`script`);
  let html = ``;
  const navlist = document.querySelector(`.nav-list`);

  for (let dat of data) {
    let tool = dat[tool_in];
    let access = dat[access_in];

    if (tool !== TOOL || !access.includes(USER.email)) continue;

    html += dat[script_in];
  }
  navlist.innerHTML = html;
}

function createDocumentHeader() {
  //!------------------------ header
  let header = document.createElement(`header`);
  header.classList.add(`header`);

  //!------------------------ logo-div
  let logoDiv = document.createElement(`div`);
  logoDiv.classList.add(`logo`);

  //!------------------------ logo-img
  let logoImg = document.createElement(`img`);
  logoImg.classList.add(`logo-img`);
  logoImg.src = `https://i.postimg.cc/hGGkfhm2/mediseller-Logo.png`;
  logoImg.alt = `Mediseller Logo`;
  logoImg.title = `Medisellers India`;

  //!------------------------ logo-span
  let logoSpan = document.createElement(`span`);
  logoSpan.classList.add(`logo-name`);
  logoSpan.insertAdjacentHTML(`beforeend`, `Domestic Operation Sheet`);

  //!------------------------ add-order-span
  let addOrderSpan = document.createElement(`span`);
  addOrderSpan.classList.add(`pr-icon`);
  addOrderSpan.addEventListener(`click`, createNewOrder);

  //!------------------------ add-order-icon
  let addOrderIcon = document.createElement(`i`);
  addOrderIcon.classList.add(
    `ph`,
    `ph-user-circle-plus`,
    `add-order-icon`,
    `pr-icon`
  );
  addOrderIcon.addEventListener(`click`, createNewOrder);

  //!------------------------ create-orders-icon
  let createOrdersIcon = document.createElement(`i`);
  createOrdersIcon.classList.add(
    `ph`,
    `ph-webhooks-logo`,
    `create-orders`,
    `pr-icon`
  );
  createOrdersIcon.addEventListener(`click`, createOrder);

  //!------------------------ pr-actions-div
  let prActionDiv = document.createElement(`div`);
  prActionDiv.classList.add(`pr-actions`);

  //!------------------------ pr-action-select
  let prActionSelect = document.createElement(`select`);
  prActionSelect.classList.add(`pr-action-select`);
  prActionSelect.title = `Filter & Actions`;
  prActionSelect.addEventListener(`change`, executeFilterAndAction);

  //!------------------------ pr-action-option
  let prActionOption = document.createElement(`option`);
  prActionOption.innerHTML = `&#9776; &nbsp;`;
  prActionOption.selected = true;
  prActionOption.disabled = true;

  //!------------------------ company-name-span
  let companyNameSpan = document.createElement(`span`);
  companyNameSpan.classList.add(`pr-icon`);
  companyNameSpan.addEventListener(`click`, changeCompany);
  companyNameSpan.title = `Change Account`;

  //!------------------------ company-name-icon
  let companyNameIcon = document.createElement(`i`);
  companyNameIcon.classList.add(`ph`, `ph-buildings`);

  //!------------------------ useremail-span
  let useremailSpan = document.createElement(`span`);
  useremailSpan.classList.add(`pr-icon`);
  useremailSpan.addEventListener(`click`, changeEmail);
  useremailSpan.innerText = USER.email;

  //!------------------------ useremail-icon
  let useremailIcon = document.createElement(`i`);
  useremailIcon.classList.add(`ph`, `ph-at`);

  //!------------------------ sync-span
  let syncSpan = document.createElement(`span`);
  syncSpan.classList.add(`pr-icon`);
  syncSpan.addEventListener(`click`, syncData);
  syncSpan.title = `Sync`;

  //!------------------------ sync-icon
  let syncIcon = document.createElement(`i`);
  syncIcon.classList.add(`ph`, `ph-arrows-clockwise`);

  //!------------------------ apeend-all
  logoDiv.append(logoImg, logoSpan, addOrderIcon, createOrdersIcon) &&
    prActionSelect.append(prActionOption) &&
    companyNameSpan.append(companyNameIcon) &&
    useremailSpan.append(useremailIcon) &&
    syncSpan.append(syncIcon) &&
    prActionDiv.append(
      logoDiv,
      prActionSelect,
      companyNameSpan,
      useremailSpan,
      syncSpan
    ) &&
    header.append(logoDiv, prActionDiv);
}

getapikey();
