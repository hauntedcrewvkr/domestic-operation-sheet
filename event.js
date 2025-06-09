//------------------------- escape-btn-event
document.addEventListener(`keydown`, function (event) {
  if (event.key === `Escape`) {
    const detailsView = fx.$$(`.details`);
    detailsView.forEach(function (d) {
      d.classList.remove(`details`);
    });
    fx.$(`.extra-views`).innerHTML = ``;
  }
});

//------------------------- add-new-order-event-listener
function addNewOrder(e) {
  e.stopPropagation();
  const extraViews = fx.$(".extra-views");
  const htmlViews = sheet.Database.domestic_html_views.jsonData.slice();
  const addOrderView = htmlViews[0].add_new_order_form;
  const addOrderHtml = fx.text2el(addOrderView);

  const pocDropdowns = getPocDropdowns();
  const mopDropdowns = getDropdowns("Mode of payment");
  const stateDropdowns = getDropdowns("State");

  const pocSelect = fx.$("#poc-select", addOrderHtml);
  const mopSelect = fx.$("#payment-mode-select", addOrderHtml);
  const stateSelect = fx.$("#state-select", addOrderHtml);

  pocDropdowns.forEach(function (dropdown) {
    pocSelect.append(dropdown);
  });
  mopDropdowns.forEach(function (dropdown) {
    mopSelect.append(dropdown);
  });
  stateDropdowns.forEach(function (dropdown) {
    stateSelect.append(dropdown);
  });

  extraViews.append(addOrderHtml);

  addOrderHtml.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(addOrderHtml);
    const dataObject = Object.fromEntries(formData.entries());
    dataObject.ID ??= `ORDR-${Date.now()}`;
    dataObject.Timestamp ??= nowStr();
    dataObject.Email ??= user.email;
    dataObject[`Order ID`] ??= getOrderNo();
    dataObject.MONTH ??= Date(dataObject.DATE).toLocaleString(`default`, {
      month: `long`,
    });
    dataObject[`Order No`] ??= `MS${dataObject[`Order ID`] + 1}`;
    dataObject[`Balance Amount (To be paid) (INR)`] ??=
      dataObject[`Total Amount  (INR)`] -
      dataObject[`Prepaid Amount (If any) (INR)`];

    appendData(dataObject);
  });

  const cancelBtn = fx.$(".cancel", addOrderHtml);
  cancelBtn.addEventListener("click", removeForm);
}

function executeFilterAndAction() {}

//------------------------- change-company-event-listener
function changeCompany(e) {}

//------------------------- change-email-event-listener
function changeEmail(e) {}

//------------------------- sync-data-event-listener
function syncData(e) {
  location.reload();
}

//------------------------- see-details-event-listener
function seeDetails(e) {
  const target = e.target.closest(`tr`);
  const extraViews = fx.$(`.extra-views`);
  const tableDatas = fx.$$(`td`, target);
  const detailsForm = document.createElement(`form`);
  const formHeader = document.createElement(`h2`);

  detailsForm.id = `details-form`;
  detailsForm.classList.add(`details-form`, `form-base`);
  formHeader.innerText = `Details`;
  detailsForm.append(formHeader);

  tableDatas.forEach(function (td, index) {
    if (index == 0) {
      let subactions = fx.$(`ul`, td).cloneNode(true);
      subactions.classList.add(`detail-actions`);
      detailsForm.append(subactions);
      return;
    }
    const label = document.createElement(`label`);
    const textfield = document.createElement(`textfield`);
    let _class = td.classList[0];
    let _name = _class.replaceAll(`-dt`, ``).toUpperCase();
    let _li = fx.$$(`li`, td);

    label.textContent = _name;

    _li.forEach(function (li) {
      const label = document.createElement(`label`);
      const span = document.createElement(`span`);
      let labelname = li.title;
      let value = li.innerHTML;

      label.textContent = labelname;
      span.innerHTML = value;
      textfield.append(label, span);
    });
    detailsForm.append(label, textfield);
  });

  extraViews.append(detailsForm);
}

//------------------------- raise-issue-event-listener
function raiseIssue(e) {
  e.stopPropagation();
  const row = e.target.closest(`tr`);
  const rownum = fx.num(row.getAttribute(`row-num`));
  const extraViews = fx.$(`.extra-views`);
  const htmlViews = sheet.Database.domestic_html_views.jsonData.slice();
  const cxIssueView = htmlViews[0].cx_issue_form;
  const cxIssueHtml = fx.text2el(cxIssueView);
  const cxDropdowns = getDropdowns(`CX Issue`);

  cxDropdowns.forEach(function (option) {
    const select = fx.$(`#cx-issue-select`, cxIssueHtml);
    select.appendChild(option);
  });

  extraViews.append(cxIssueHtml);

  cxIssueHtml.addEventListener(`submit`, function (e) {
    e.preventDefault();
    const formData = new FormData(cxIssueHtml);
    const dataObject = Object.fromEntries(formData.entries());

    updateData(dataObject, rownum);
  });

  const cancelBtn = fx.$(`.cancel`, cxIssueHtml);
  cancelBtn.addEventListener(`click`, removeForm);
}

//------------------------- change-dispatch-status-event-listener
function changeDispatchStatus(e) {
  e.stopPropagation();
  const extraViews = fx.$(`.extra-views`);
  const htmlViews = sheet.Database.domestic_html_views.jsonData.slice();
  const changeDispatchStatusView = htmlViews[0].change_dispatch_status_form;
  const changeDispatchStatusHtml = fx.text2el(changeDispatchStatusView);
  const dropdowns = getDropdowns(`Dispatch Status`);

  dropdowns.forEach(function (option) {
    const select = fx.$(`#change-dispatch-select`, changeDispatchStatusHtml);
    select.appendChild(option);
  });

  extraViews.append(changeDispatchStatusHtml);
}

//------------------------- add-remarks-event-listener
function addRemarks(e) {
  e.stopPropagation();
  const extraViews = fx.$(`.extra-views`);
  const htmlViews = sheet.Database.domestic_html_views.jsonData.slice();
  const addRemarksView = htmlViews[0].add_remarks_form;
  const addRemarksHtml = fx.text2el(addRemarksView);

  extraViews.append(addRemarksHtml);
}

//------------------------- payment-confirm-event-listener
function paymentConfirm(e) {
  e.stopPropagation();
  const extraViews = fx.$(`.extra-views`);
  const htmlViews = sheet.Database.domestic_html_views.jsonData.slice();
  const paymentConfirmView = htmlViews[0].payment_confirmation_yes_form;
  const paymentConfirmHtml = fx.text2el(paymentConfirmView);

  extraViews.append(paymentConfirmHtml);
}

//------------------------- payment-unconfirm-event-listener
function paymentUnconfirm(e) {
  e.stopPropagation();
  const extraViews = fx.$(`.extra-views`);
  const htmlViews = sheet.Database.domestic_html_views.jsonData.slice();
  const paymentUnconfirmView = htmlViews[0].payment_confirmation_no_form;
  const paymentUnconfirmHtml = fx.text2el(paymentUnconfirmView);

  extraViews.append(paymentUnconfirmHtml);
}

//------------------------- initial-confirmation-event-listener
function initialConfirmation(e) {
  let master = DATA.Master.slice();
  let headers = master.shift();
  let orderConf_index = headers.indexOf(`Order Confirmation Status`);
  let deliveryType_index = headers.indexOf(`Delivery Type`);
  let dispatchStatus_index = headers.indexOf(`Dispatch Status`);
  DATA.initialConfirmation ??= [];
  DATA.initialConfirmation.push(headers);

  for (let row of master) {
    const orderConf = fx.indexer(row, orderConf_index);
    const deliveryType = fx.indexer(row, deliveryType_index);
    const disptachStatus = fx.indexer(row, dispatchStatus_index);
    const cond1 = orderConf != `To Check` && !deliveryType;
    const cond2 = disptachStatus != `Cancelled`;

    if (cond1 && cond2) DATA.initialConfirmation.push(row);
  }

  createTableRows(1);
}

//------------------------- first-page-event
function firstPage(e) {
  const currentView = fx.$(`.current-view`);
  const pageInput = fx.$(`.page-input`);
  if (pageInput.value == 1) return;
  const viewname = currentView.innerHTML.split(` (`)[0];
  pageInput.value = 1;

  getTableRows(1, viewname);
}

//------------------------- go-back-event
function goBack(e) {
  const currentView = fx.$(`.current-view`);
  const pageInput = fx.$(`.page-input`);
  const inputValue = fx.num(pageInput.value);
  if (inputValue == 1) return;
  const viewname = currentView.innerHTML.split(` (`)[0];
  pageInput.value = inputValue - 1;
  getTableRows(inputValue - 1, viewname);
}

//------------------------- epp-select-event
function eppSelect(e) {
  const currentView = fx.$(`.current-view`);
  const pagenum = fx.$(`.page-input`).value;
  const viewname = currentView.innerHTML.split(` (`)[0];
  getTableRows(pagenum, viewname);
}

//------------------------- page-input-event
function pageInputE(e) {
  const currentView = fx.$(`.current-view`);
  const pagenum = fx.num(e.target.value);
  const viewname = currentView.innerHTML.split(` (`)[0];
  getTableRows(pagenum, viewname);
}

//------------------------- next-page-event
function nextPage(e) {
  const currentView = fx.$(`.current-view`);
  const lastPage = fx.num(fx.$(`.total-pages`).value);
  const pageInput = fx.$(`.page-input`);
  const inputValue = fx.num(pageInput.value);

  if (lastPage == inputValue) return;

  const viewname = currentView.innerHTML.split(` (`)[0];
  pageInput.value = inputValue + 1;
  getTableRows(inputValue + 1, viewname);
}

//------------------------- last-page-event
function lastPage(e) {
  const currentView = fx.$(`.current-view`);
  const lastPage = fx.$(`.total-pages`).value;
  const pageInput = fx.$(`.page-input`);
  const inputValue = fx.num(pageInput.value);
  if (lastPage == inputValue) return;
  const viewname = currentView.innerHTML.split(` (`)[0];
  pageInput.value = lastPage;

  getTableRows(lastPage, viewname);
}

//------------------------- generate-orders-event
function createOrder(e) {
  const data = sheet[tool.name]["Generate Orders"].jsonData;
  const orderOutput = [];
  const companies = {};

  data.forEach(function (row, index) {
    const company = row["Booking Company"];

    if (!companies[company]) companies[company] = [];
    companies[company].push(row);

    if (companies[company].length === 10) {
      orderOutput.push(
        responseAdjust(fetchApi(companies[company], company), data)
      );

      companies[company] = [];
    }

    if (index === data.length - 1) {
      Object.entries(companies).forEach(function ([compName, orders]) {
        if (orders.length > 0) {
          orderOutput.push(
            responseAdjust(fetchApi(companies[company], company), data)
          );
        }
      });
    }
  });
}

function editRow(e) {}
