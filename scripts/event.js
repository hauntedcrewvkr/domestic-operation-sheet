//---------------------------------------------<( view-router-event-function()>-
function viewRouter(e) {
  const clickedElement = e.currentTarget;
  const title = clickedElement.getAttribute('title');

  if (!title || title === undefined) return;
  app.currentView = title;

  setTableRows();
}

//---------------------------------------------<( form-router-event-function()>-
function formRouter(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = Object.fromEntries(new FormData(form));
  let readyToGo = true;

  for (const name in formData) {
    if (gsheet.columnProps[name].edit.schema.attr.type == 'number') {
      formData[name] = fx.num(formData[name]);
    } else {
      const value = formData[name];
      const listId = gsheet.columnProps[name].edit.schema.attr.list;
      // prettier-ignore
      if (listId && !Array.from(fx.$$(`#${listId} option`)).map((o) => o.value).includes(value)) readyToGo = false;

      formData[name] = value.trim();
    }
  }

  console.log(readyToGo);
}

function getBalanceAmount(e) {
  const child = e.currentTarget;
  const parent = child.closest('fieldset');
  const childName = child.name;
  const isTotalChild = childName == 'Total Amount (₹)';

  const child2 = isTotalChild ? fx.$(`input[name="Prepaid Amount (₹)"]`, parent) : fx.$(`input[name="Total Amount (₹)"]`, parent);
  const balanceChild = fx.$(`input[name="Balance Amount (₹)"]`, parent);
  const balanceValue = isTotalChild ? fx.num(child.value) - fx.num(child2.value) : fx.num(child2.value) - fx.num(child.value);

  balanceChild.value = balanceValue;
}

//-------------------------------------<( change-row-per-page-event-function()>-
function changeRPP(e) {
  app.table.pagination.rpp = fx.num(e.currentTarget.value);
  setTableRows(app.table.pagination.currentPage);
}

//-----------------------------------------------<( prev-page-event-function()>-
function prevPage(e) {
  setTableRows(Math.max(app.table.pagination.currentPage - 1, 1));
}

//---------------------------------------------<( change-page-event-function()>-
function changePage(e) {
  const pagenum = fx.num(e.currentTarget.value);
  console.log(pagenum);
  if (pagenum >= 1 && pagenum <= app.table.pagination.totalPages) setTableRows(pagenum);
}

//-----------------------------------------------<( next-page-event-function()>-
function nextPage(e) {
  if (app.table.pagination.currentPage < app.table.pagination.totalPages) setTableRows(app.table.pagination.currentPage + 1);
}

//-----------------------------------------------<( last-page-event-function()>-
function lastPage(e) {
  if (app.table.pagination.currentPage == app.table.pagination.totalPages) return;
  setTableRows(app.table.pagination.totalPages);
}

//----------------------------------------------<( first-page-event-function()>-
function firstPage(e) {
  setTableRows(1);
}

//-------------------------------------------<( add-new-order-event-function()>-
function addNewOrder(e) {
  const extraViews = fx.$('.extra-views');
  const addNewOrderForm = schema2el(app.schema.forms.addNewOrderForm);

  extraViews.append(addNewOrderForm);
  requestAnimationFrame(addActive);

  function addActive() {
    const classes = addNewOrderForm.classList;
    !classes.contains('active') && addNewOrderForm.classList.add('active');
  }
}

//---------------------------------------------<( cancel-form-event-function()>-
function cancelForm(e) {
  const target = e.currentTarget;
  const tagname = target.tagName.toLowerCase();
  const form = tagname == 'form' ? target : target.closest('form');

  if ((tagname == 'form' && e.key === 'Escape') || e.type === 'click') form?.remove();
}

//----------------------------------------<( newOrder )>-

function createOrder(e) {}
function myOrders(e) {}
function filter(e) {}
function changeAccount(e) {}
function raiseIssue(e) {}
function seeFollowups(e) {}
function changeDispatchStatus(e) {}
function addRemarks(e) {}
function sendOrderConfirmationMessage(e) {}
function markResolved(e) {}
function paymentConfirmationYes() {}
function paymentConfirmationNo() {}
function editRow() {}

//===================================================================================================================================
//------------------------------------------------<( set-name-event-function()>-
async function setName(e) {
  e.preventDefault();
  const element = e.currentTarget;
  const formData = new FormData(element);

  if (await app.script.run(`setUserProp`, `name`, formData.POC)) {
    app.user.props.name ??= app.user.props.name || formData.POC;
  }
}

function executeFilterAndAction() {}

//------------------------- change-company-event-listener
function changeCompany(e) {}

//------------------------- change-email-event-listener
function changeEmail(e) {}

//------------------------- sync-data-event-listener
function sync(e) {
  fx.$$('header, nav, main, footer').forEach(removeBody);
  start();

  function removeBody(element) {
    element.remove();
  }
}

//------------------------- see-details-event-listener
function seeDetails(e) {
  e.preventDefault();
  const row = e.currentTarget.cloneNode(true);
  const td = fx.$$('td div[headname]', row);
  const extraViews = fx.$('main .extra-views');

  const mainSchema = {
    tag: 'div',
    attr: { class: 'detail-view' },
    sub: [{ tag: 'legend', text: 'DETAILS', attr: { class: 'details-heading' } }],
  };

  for (const div of td) {
    const colHead = div.getAttribute('headname');
    const fieldsetSchema = { tag: 'fieldset', sub: [{ tag: 'legend', text: colHead }] };
    const spans = fx.$$('span', div);
    console.log(spans);

    for (const span of spans) {
      const spanSchema = {
        tag: 'div',
        text: span.title,
        attr: { class: 'column-holder' },
        sub: [{ tag: 'span', text: span.textContent, attr: { class: 'column-value' } }],
      };

      fieldsetSchema.sub.push(spanSchema);
    }

    mainSchema.sub.push(fieldsetSchema);
  }

  mainSchema.sub.push({ tag: 'button', attr: { class: 'detail-close-btn', onclick: 'removeDetailView(event)' } });

  fx.removeInnerHTML(extraViews);
  console.log(mainSchema);
  extraViews.append(schema2el(mainSchema));
}

//--------------------------------------<( remove-detail-view-event-function()>-
function removeDetailView(e) {
  const parent = e.currentTarget.closest('.detail-view');
  parent.remove();
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
  const row = e.target.closest(`tr`);
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

  cxIssueHtml.addEventListener(`submit`, function (e) {
    e.preventDefault();
    const formData = new FormData(changeDispatchStatusHtml);
    const dataObject = Object.fromEntries(formData.entries());

    updateData(dataObject, rownum);
  });

  const cancelBtn = fx.$(`.cancel`, changeDispatchStatusHtml);
  cancelBtn.addEventListener(`click`, removeForm);
}

//------------------------- add-remarks-event-listener
function addRemarks(e) {
  e.stopPropagation();
  const row = e.target.closest(`tr`);
  const extraViews = fx.$(`.extra-views`);
  const htmlViews = sheet.Database.domestic_html_views.jsonData.slice();
  const addRemarksView = htmlViews[0].add_remarks_form;
  const addRemarksHtml = fx.text2el(addRemarksView);

  extraViews.append(addRemarksHtml);

  addRemarksHtml.addEventListener(`submit`, function (e) {
    e.preventDefault();
    const formData = new FormData(addRemarksHtml);
    const dataObject = Object.fromEntries(formData.entries());

    updateData(dataObject, rownum);
  });

  const cancelBtn = fx.$(`.cancel`, addRemarksHtml);
  cancelBtn.addEventListener(`click`, removeForm);
}

//------------------------- payment-confirm-event-listener
function paymentConfirm(e) {
  e.stopPropagation();
  const row = e.target.closest(`tr`);
  const extraViews = fx.$(`.extra-views`);
  const htmlViews = sheet.Database.domestic_html_views.jsonData.slice();
  const paymentConfirmView = htmlViews[0].payment_confirmation_yes_form;
  const paymentConfirmHtml = fx.text2el(paymentConfirmView);

  extraViews.append(paymentConfirmHtml);

  paymentConfirmHtml.addEventListener(`submit`, function (e) {
    e.preventDefault();
    const formData = new FormData(paymentConfirmHtml);
    const dataObject = Object.fromEntries(formData.entries());

    updateData(dataObject, rownum);
  });

  const cancelBtn = fx.$(`.cancel`, paymentConfirmHtml);
  cancelBtn.addEventListener(`click`, removeForm);
}

//------------------------- payment-unconfirm-event-listener
function paymentUnconfirm(e) {
  e.stopPropagation();
  const row = e.target.closest(`tr`);
  const extraViews = fx.$(`.extra-views`);
  const htmlViews = sheet.Database.domestic_html_views.jsonData.slice();
  const paymentUnconfirmView = htmlViews[0].payment_confirmation_no_form;
  const paymentUnconfirmHtml = fx.text2el(paymentUnconfirmView);

  extraViews.append(paymentUnconfirmHtml);

  paymentUnconfirmHtml.addEventListener(`submit`, function (e) {
    e.preventDefault();
    const formData = new FormData(paymentUnconfirmHtml);
    const dataObject = Object.fromEntries(formData.entries());

    updateData(dataObject, rownum);
  });

  const cancelBtn = fx.$(`.cancel`, paymentUnconfirmHtml);
  cancelBtn.addEventListener(`click`, removeForm);
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

//------------------------- generate-orders-event
function createOrder(e) {
  const data = sheet[tool.name]['Generate Orders'].jsonData;
  const orderOutput = [];
  const companies = {};

  data.forEach(function (row, index) {
    const company = row['Booking Company'];

    if (!companies[company]) companies[company] = [];
    companies[company].push(row);

    if (companies[company].length === 10) {
      orderOutput.push(responseAdjust(fetchApi(companies[company], company), data));

      companies[company] = [];
    }

    if (index === data.length - 1) {
      Object.entries(companies).forEach(function ([compName, orders]) {
        if (orders.length > 0) {
          orderOutput.push(responseAdjust(fetchApi(companies[company], company), data));
        }
      });
    }
  });
}

function editRow(e) {
  e.stopPropagation();
  const accessData = sheet.Database.column_access.jsonData.slice();
  let form = document.createElement(`form`);

  for (let json of accessData) {
    if (json.tool_name == tool.name && json.editors.includes(user.email)) {
      const btn = document.createElement(`button`);
      btn.textContent = json.column_name;
      btn.title = json.column_name;
      btn.addEventListener(`click`, toggleEdit);
    }
  }

  function toggleEdit(e) {
    const target = e.target;
    const form = target.closest(`form`);
    const element = fx.$(`*[title=${target.title}]:not(button)`);

    if (element) element.remove();
  }
}

function sendOrderConfirmationMessage(e) {
  e.stopPropagation();
  const extraViews = fx.$(`.extra-views`);
  let count = 0;
  const row = e.target.closest(`tr`);
  const phoneNumber = fx.$(`#contact-number a`, row).textContent;

  const template = sheet.Database.whatsapp_templates.arrayData.filter(function (value) {
    return value[0] == `Domestic Order Confirmation`;
  });

  if (!template.length) return;

  const messageText = template[0][1];
  const messageTemplate = messageText.replaceAll(`\n`, `<br>`).replace(/\*/g, () => {
    count++;
    return count % 2 === 1 ? '<b>' : '</b>';
  });

  const messageParent = document.createElement(`div`);
  const messageChild = document.createElement(`div`);
  const helperChild = document.createElement(`div`);
  const btnSpan = document.createElement(`span`);
  const sendBtn = document.createElement(`i`);
  const cancelBtn = document.createElement(`i`);

  messageParent.classList.add(`message-parent`);
  messageChild.classList.add(`message-child`);
  helperChild.classList.add(`message-child-border`);
  messageChild.contentEditable = true;
  sendBtn.classList.add(`ph`, `ph-paper-plane-right`, `send-message`);
  cancelBtn.classList.add(`ph`, `ph-prohibit`, `cancel-message`);

  sendBtn.addEventListener(`click`, function (e) {
    let message = messageChild.innerHTML.replaceAll(`<b>`, `*`).replaceAll(`</b>`, `*`).replaceAll(`<br>`, `\n`);

    sendWhatsapp(message, phoneNumber);
  });

  cancelBtn.addEventListener(`click`, function (e) {
    messageParent.remove();
  });

  messageChild.innerHTML = messageTemplate;
  btnSpan.append(cancelBtn, sendBtn);
  helperChild.append(messageChild);
  messageParent.append(helperChild, btnSpan);

  extraViews.append(messageParent); // append to DOM
}

function sendWhatsapp(message = ``, phone = 0) {
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, `_blank`);
}

function markResolved(e) {
  const target = e.target;
  const rownum = fx.num(target.closest(`tr`).getAttribute(`row-num`));
  const obj = {
    'CX Issue Status': `Closed`,
  };

  updateData(obj, rownum);
}

function download(e) {
  const data = gsheet.domesticOperationSheet[app.currentView].data;
  if (!Array.isArray(data) || data.length === 0) return ``;

  let csvString = ``;

  const accessibleColumns = new Set();

  for (const [column, prop] of Object.entries(gsheet.columnProps)) {
    if (prop.view.access) accessibleColumns.add(column);
  }

  const headers = Object.keys(data[0]).filter((col) => accessibleColumns.has(col));
  csvString += headers.join(',') + '\n';

  const rows = data.map((row) => headers.map((h) => `"${(row[h].value ?? '').toString().replace(/"/g, '""')}"`).join(','));

  csvString += rows.join('\n') + '\n';

  const blob = new Blob([csvString], { type: `text/csv` });
  const link = document.createElement(`a`);

  link.href = URL.createObjectURL(blob);
  link.download = `${app.currentView}.csv`;
  link.click();
  link.remove();
}

function myOrders() {}

//----------------------------------------------<( add-loader-when-dom-loads )>-
document.addEventListener(`DOMContentLoaded`, start);
