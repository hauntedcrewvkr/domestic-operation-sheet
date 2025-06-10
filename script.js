function createDocumentHeader() {
  //------------------------- header
  let header = document.createElement(`header`);
  header.classList.add(`header`);

  //------------------------- logo-div
  let logoDiv = document.createElement(`div`);
  logoDiv.classList.add(`logo`);

  //------------------------- logo-img
  let logoImg = document.createElement(`img`);
  logoImg.classList.add(`logo-img`);
  logoImg.src = `https://i.postimg.cc/hGGkfhm2/mediseller-Logo.png`;
  logoImg.alt = `Mediseller Logo`;
  logoImg.title = `Medisellers India`;

  //------------------------- logo-span
  let logoSpan = document.createElement(`span`);
  logoSpan.classList.add(`logo-name`);
  logoSpan.insertAdjacentHTML(`beforeend`, `Domestic Operation Sheet`);

  //------------------------- add-order-span
  let addOrderSpan = document.createElement(`span`);
  addOrderSpan.classList.add(`pr-icon`, `add-order-span`);
  addOrderSpan.addEventListener(`click`, addNewOrder);
  addOrderSpan.title = `Add New Order`;

  //------------------------- add-order-icon
  let addOrderIcon = document.createElement(`i`);
  addOrderIcon.classList.add(`ph`, `ph-user-circle-plus`);
  addOrderIcon.title = `Add Order`;

  //------------------------- create-order-span
  let createOrderSpan = document.createElement(`span`);
  createOrderSpan.classList.add(`pr-icon`, `create-order-span`);
  createOrderSpan.addEventListener(`click`, createOrder);
  createOrderSpan.title = `Create Orders`;

  //------------------------- create-orders-icon
  let createOrdersIcon = document.createElement(`i`);
  createOrdersIcon.classList.add(`ph`, `ph-webhooks-logo`);
  createOrdersIcon.title = `Create Orders`;
  createOrdersIcon.addEventListener(`click`, createOrder);

  //------------------------- pr-actions-div
  let prActionDiv = document.createElement(`div`);
  prActionDiv.classList.add(`pr-actions`);

  //------------------------- primary-filter-span
  let prFilterSpan = document.createElement(`span`);
  const prFilterDiv = document.createElement(`div`);
  prFilterDiv.append(getFilterActions());
  prFilterSpan.classList.add(`pr-icon`, `primary-action-filter-span`);
  prFilterSpan.title = `Filter`;
  prFilterDiv.classList.add(`pr-filter-options`, `hidden`);

  prFilterSpan.addEventListener(`click`, function (e) {
    let target = e.target;
    let div = fx.$(`div`, target);
    console.log(div);
    div.classList.toggle(`hidden`);
  });

  //------------------------- create-orders-icon
  let prFilterIcon = document.createElement(`i`);
  prFilterIcon.classList.add(`ph`, `ph-funnel`);
  prFilterIcon.title = `Primary Filter`;
  prFilterSpan.append(prFilterIcon, prFilterDiv);
  // prFilterIcon.addEventListener(`click`, createOrder);

  //------------------------- company-name-span
  let companyNameSpan = document.createElement(`span`);
  companyNameSpan.classList.add(`pr-icon`, `company-name-span`);
  companyNameSpan.addEventListener(`click`, changeCompany);
  companyNameSpan.addEventListener(`mouseenter`, function (e) {
    let target = e.target;
    let icon = target.querySelector(`i`);
    target.append(icon, user.company.COD.name);

    target.addEventListener(`mouseleave`, function () {
      target.innerHTML = ``;
      target.append(icon);
    });
  });
  companyNameSpan.title = `Change Account`;

  //------------------------- company-name-icon
  let companyNameIcon = document.createElement(`i`);
  companyNameIcon.classList.add(`ph`, `ph-buildings`);

  //------------------------- useremail-span
  let useremailSpan = document.createElement(`span`);
  useremailSpan.classList.add(`pr-icon`, `useremail-span`);
  useremailSpan.addEventListener(`click`, changeEmail);
  useremailSpan.addEventListener(`mouseenter`, function (e) {
    let target = e.target;
    let icon = target.querySelector(`i`);
    target.append(icon, user.email);

    target.addEventListener(`mouseleave`, function () {
      target.innerHTML = ``;
      target.append(icon);
    });
  });
  useremailSpan.title = `change email`;

  //------------------------- useremail-icon
  let useremailIcon = document.createElement(`i`);
  useremailIcon.classList.add(`ph`, `ph-at`);

  //------------------------- sync-span
  let syncSpan = document.createElement(`span`);
  syncSpan.classList.add(`pr-icon`, `sync-span`);
  syncSpan.addEventListener(`click`, syncData);
  syncSpan.title = `Sync`;

  //------------------------- sync-icon
  let syncIcon = document.createElement(`i`);
  syncIcon.classList.add(`ph`, `ph-arrows-clockwise`);

  //------------------------- apeend-all
  addOrderSpan.append(addOrderIcon);
  createOrderSpan.append(createOrdersIcon);
  logoDiv.append(logoImg, logoSpan, addOrderSpan, createOrderSpan);
  companyNameSpan.append(companyNameIcon);
  useremailSpan.append(useremailIcon);
  syncSpan.append(syncIcon);
  prActionDiv.append(
    logoDiv,
    prFilterSpan,
    companyNameSpan,
    useremailSpan,
    syncSpan
  );
  header.append(logoDiv, prActionDiv);

  document.body.append(header);
}

function createDocumentNav() {
  const viewData = sheet.Database.view_access.jsonData;
  //------------------------- view-nav
  const nav = document.createElement(`nav`);
  nav.classList.add(`view-nav`);

  //------------------------- nav-list
  let navUl = document.createElement(`ul`);
  navUl.classList.add(`nav-list`);

  for (let views of viewData) {
    if (views.tool_name != tool.name) continue;
    if (!views.access.includes(user.email)) continue;

    const element = fx.text2el(views.script);
    element.title = views.view_name;

    element.addEventListener(`click`, function (e) {
      getTableRows(1, e.target.title || e.target.closest(`li`).title);
    });

    navUl.append(element);
  }

  //------------------------- append-all
  nav.append(navUl);
  document.body.append(nav);
}

function createDocumentMain() {
  //------------------------- main
  let main = document.createElement(`main`);
  main.classList.add(`main`);

  //------------------------- table-container
  let tableContainer = document.createElement(`div`);
  tableContainer.classList.add(`table-container`);

  //------------------------- append-all
  tableContainer.append(createDocumentTable());
  main.append(tableContainer, createDocumentExtraViews());
  document.body.append(main);
}

function createDocumentTable() {
  //------------------------- table
  let table = document.createElement(`table`);
  table.classList.add(`table`);

  //------------------------- thead
  let thead = document.createElement(`thead`);
  thead.classList.add(`thead`);

  //------------------------- thead-row
  let theadRow = document.createElement(`tr`);
  theadRow.classList.add(`table-headings`);

  //------------------------- thead-row-th
  let Actionth = document.createElement(`th`);
  let orderDetailsth = document.createElement(`th`);
  let cutomerDetailsth = document.createElement(`th`);
  let requirementsth = document.createElement(`th`);
  let amountth = document.createElement(`th`);
  let shippingDetailsth = document.createElement(`th`);
  let logisticDetailsth = document.createElement(`th`);

  Actionth.classList.add(`action-th`);
  orderDetailsth.classList.add(`order-details-th`);
  cutomerDetailsth.classList.add(`customer-details-th`);
  requirementsth.classList.add(`requirements-th`);
  amountth.classList.add(`amount-th`);
  shippingDetailsth.classList.add(`shipping-details-th`);
  logisticDetailsth.classList.add(`logistic-details-th`);

  Actionth.textContent = `Actions`;
  orderDetailsth.textContent = `Order Details`;
  cutomerDetailsth.textContent = `Customer Details`;
  requirementsth.textContent = `Requirements`;
  amountth.textContent = `Amount`;
  shippingDetailsth.textContent = `Shipping Details`;
  logisticDetailsth.textContent = `Logistic Details`;

  /* append */
  theadRow.append(
    Actionth,
    orderDetailsth,
    cutomerDetailsth,
    requirementsth,
    amountth,
    shippingDetailsth,
    logisticDetailsth
  );

  thead.append(theadRow);

  //------------------------- tbody
  let tbody = document.createElement(`tbody`);
  tbody.classList.add(`tbody`);

  //------------------------- append-all
  table.append(thead, tbody);
  return table;
}

function createDocumentExtraViews() {
  //------------------------- extra-views
  let extraViews = document.createElement(`section`);
  extraViews.classList.add(`extra-views`);

  //------------------------- loader-div
  let loaderDiv = document.createElement(`div`);
  loaderDiv.classList.add(`loader-div`);

  //------------------------- loader-span
  let loaderSpan = document.createElement(`span`);
  loaderSpan.classList.add(`loader`);
  loaderSpan.textContent = `Loading`;
  loaderDiv.append(loaderSpan);

  //------------------------- append-all
  extraViews.append(loaderDiv);

  return extraViews;
}

function createDocumentFooter() {
  //------------------------- footer
  let footer = document.createElement(`footer`);
  footer.classList.add(`footer`);

  //------------------------- entries-per-page-div
  let eppDiv = document.createElement(`div`);
  eppDiv.classList.add(`epp`);
  //------------------------- entrie-per-page-select
  let entriesPerPageSelect = document.createElement(`select`);
  entriesPerPageSelect.setAttribute(`id`, `entries-per-page`);
  entriesPerPageSelect.setAttribute(`name`, `entries-per-page`);
  entriesPerPageSelect.setAttribute(`title`, `Entries Per Page`);

  //------------------------- entries-per-page-option
  let option1 = document.createElement(`option`);
  let option2 = document.createElement(`option`);
  let option3 = document.createElement(`option`);
  let option4 = document.createElement(`option`);

  option1.setAttribute(`value`, `50`);
  option1.setAttribute(`selected`, true);
  option1.innerHTML = `50`;
  option2.setAttribute(`value`, `100`);
  option2.innerHTML = `100`;
  option3.setAttribute(`value`, `150`);
  option3.innerHTML = `150`;
  option4.setAttribute(`value`, `200`);
  option4.innerHTML = `200`;

  /* append */
  entriesPerPageSelect.append(option1, option2, option3, option4);
  eppDiv.append(entriesPerPageSelect);

  //------------------------- pagination-div
  let paginationDiv = document.createElement(`div`);
  paginationDiv.classList.add(`pagination`);

  //------------------------- pagination-actions
  let firstAction = document.createElement(`i`);
  let backAction = document.createElement(`i`);
  let pageInput = document.createElement(`input`);
  let delimeterInput = document.createElement(`input`);
  let totalInput = document.createElement(`input`);
  let nextAction = document.createElement(`i`);
  let lastAction = document.createElement(`i`);

  firstAction.classList.add(`ph`, `ph-caret-double-left`);
  backAction.classList.add(`ph`, `ph-caret-left`);
  pageInput.setAttribute(`type`, `number`);
  pageInput.classList.add(`page-input`);
  pageInput.setAttribute(`value`, 1);
  delimeterInput.setAttribute(`type`, `text`);
  delimeterInput.classList.add(`pagination-delimeter`);
  delimeterInput.setAttribute(`value`, `/`);
  delimeterInput.setAttribute(`disabled`, true);
  totalInput.setAttribute(`type`, `number`);
  totalInput.classList.add(`total-pages`);
  totalInput.setAttribute(`value`, `1`);
  totalInput.setAttribute(`disabled`, true);
  nextAction.classList.add(`ph`, `ph-caret-right`);
  lastAction.classList.add(`ph`, `ph-caret-double-right`);

  /* append */
  paginationDiv.append(
    firstAction,
    backAction,
    pageInput,
    delimeterInput,
    totalInput,
    nextAction,
    lastAction
  );

  //------------------------- current-view-div
  let currentViewDiv = document.createElement(`div`);
  currentViewDiv.classList.add(`current-view`);
  currentViewDiv.innerHTML = `Orders`;
  //------------------------- append-all
  footer.append(eppDiv, paginationDiv, currentViewDiv);
  //------------------------- append to body
  document.body.append(footer);

  {
    firstAction.addEventListener(`click`, firstPage);
    backAction.addEventListener(`click`, goBack);
    pageInput.addEventListener(`change`, pageInputE);
    nextAction.addEventListener(`click`, nextPage);
    lastAction.addEventListener(`click`, lastPage);
    entriesPerPageSelect.addEventListener(`change`, eppSelect);
  }
}
