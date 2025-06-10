/**
 * @description This consists all the helper functions
 */

//------------------------- toggle-loader-helper-function()
function toggleLoader() {
  /**
   * @description This function toggles the loader div
   */

  let extraViews = fx.$(`.extra-views`);
  let loaderDiv = fx.$(`.loader-div`);

  if (loaderDiv) {
    extraViews.innerHTML = ``;
  } else {
    extraViews.innerHTML = loader;
  }
}

//------------------------- distribute-data-helper-function()
function distributeData(ss, sheetname, data) {
  /**
   * @description This function distributes the data to be stored in variable accordingly
   * @param {string} ss
   * @param {string} sheetname
   * @param {array} data
   */

  data = data.slice(); //make-copy-of-data-so-that-original-will-be-safe
  //------------------------- initialize-if-data-not-found
  sheet[ss] ??= {}; //level-1
  sheet[ss][sheetname] = {}; //level-2
  sheet[ss][sheetname].indexes = {}; //level-3
  sheet[ss][sheetname].jsonData = []; //level-3
  sheet[ss][sheetname].arrayData = data; //level-3

  let headers = data.shift(); //get-headers
  let rowNum = ss == tool.name && sheetname == `Master` ? data.length + 2 : 2; //get-row-number

  headers.forEach(function (header, index) {
    sheet[ss][sheetname].indexes[header] = index; //set-sheet-header-indexes
  });

  //------------------------- set-sheet-json-data
  if (ss == `Domestic Operation Sheet` && sheetname == `Master`) {
    data = data.reverse();
    const indexes = sheet[ss].Master.indexes; //get-master-index-json
    //------------------------- store-views-to-variables
    [
      `Medisellers COD`,
      `Medicare COD`,
      `Payment Not Received`,
      `Payment Received`,
      `Dispatch + Menifest`,
      `T-1 Orders`,
      `Dispatch + RTO`,
      `RTO Delivered`,
      `Pending Orders`,
      `Unconfirmed Returns`,
      `To Check`,
      `Get Initial Confirmation`,
      `Confirm Payments`,
      `Generate Orders`,
      `Raised Issues`,
      `COD`,
      `Processed Orders`,
    ].forEach(function (sn) {
      sheet[ss][sn] = {};
      sheet[ss][sn].jsonData = [];
      sheet[ss][sn].arrayData = [];
    });

    for (let row of data) {
      let json = { rowNo: rowNum-- };
      //------------------------- get-conditional-values
      const values = {
        orderConfirmationStatus: row[indexes[`Order Confirmation Status`]],
        deliveryType: row[indexes[`Delivery Type`]],
        instantDeliveryPartner: row[indexes[`Instant Delivery Partner`]],
        trackingStatus: row[indexes[`Tracking Status`]],
        trackingNumber: row[indexes[`Tracking Number`]],
        dispatchStatus: row[indexes[`Dispatch Status`]],
        orderType: row[indexes[`Order Type`]],
        isPaymentConfirmed: row[indexes[`Is Payment Confirmed`]],
        prepaidAmount: fx.num(row[indexes[`Prepaid Amount (If any) (INR)`]]),
        balanceAmount: fx.num(
          row[indexes[`Balance Amount (To be paid) (INR)`]]
        ),
        remittanceAmount: fx.num(row[indexes[`Remittance Amount`]]),
        bookingCompany: row[indexes[`Booking Company`]],
        cxIssue: row[indexes[`CX Issue`]],
        cxIssueStatus: row[indexes[`CX Issue Status`]],
      };

      //------------------------- medisellers-cod-conditionals
      if (
        values.orderType == `COD` &&
        values.bookingCompany == `Medicare India` &&
        (values.trackingStatus != `Cancelled` ||
          values.dispatchStatus != `Cancelled`)
      ) {
        sheet[ss][`Medicare COD`].arrayData.push(row);
        sheet[ss][`Medicare COD`].jsonData.push(
          viewsJson(row, headers, rowNum)
        );
      }
      //------------------------- payment-not-received-conditionals
      if (
        values.prepaidAmount > 0 &&
        values.isPaymentConfirmed == `No` &&
        (values.dispatchStatus != `Cancelled` ||
          values.trackingStatus != `Cancelled`)
      ) {
        sheet[ss][`Payment Not Received`].arrayData.push(row);
        sheet[ss][`Payment Not Received`].jsonData.push(
          viewsJson(row, headers, rowNum)
        );
      }
      //------------------------- payment-received-conditionals
      if (
        values.prepaidAmount > 0 &&
        values.isPaymentConfirmed == `Yes` &&
        (values.dispatchStatus != `Cancelled` ||
          values.trackingStatus != `Cancelled`)
      ) {
        sheet[ss][`Payment Received`].arrayData.push(row);
        sheet[ss][`Payment Received`].jsonData.push(
          viewsJson(row, headers, rowNum)
        );
      }
      //------------------------- dispatch-+-manifest-conditionals
      {
      }
      //------------------------- t-1-orders-conditionals
      {
      }
      //------------------------- dispatch-+-rto-conditionals
      {
      }
      //------------------------- rto-delivered-conditionals
      {
      }
      //------------------------- pending-orders-conditionals
      if (
        values.dispatchStatus == `Yet to be Dispatched` &&
        values.orderConfirmationStatus != `Good to Go` &&
        values.trackingNumber
      ) {
        sheet[ss][`Pending Orders`].arrayData.push(row);
        sheet[ss][`Pending Orders`].jsonData.push(
          viewsJson(row, headers, rowNum)
        );
      }
      //------------------------- unconfirmed-returns-conditionals
      {
      }
      //------------------------- to-check-conditionals
      if (
        values.orderConfirmationStatus == `To Check` &&
        (values.dispatchStatus != `Cancelled` ||
          values.trackingStatus != `Cancelled`)
      ) {
        sheet[ss][`To Check`].arrayData.push(row);
        sheet[ss][`To Check`].jsonData.push(viewsJson(row, headers, rowNum));
      }
      //------------------------- get-initial-confirmation-conditionals
      if (
        values.orderConfirmationStatus != `To Check` &&
        !values.deliveryType &&
        (values.dispatchStatus != `Cancelled` ||
          values.trackingStatus != `Cancelled`)
      ) {
        sheet[ss][`Get Initial Confirmation`].arrayData.push(row);
        sheet[ss][`Get Initial Confirmation`].jsonData.push(
          viewsJson(row, headers, rowNum)
        );
      }
      //------------------------- confirm-payments-conditionals
      if (
        values.prepaidAmount > 0 &&
        !values.isPaymentConfirmed &&
        (values.trackingStatus != `Cancelled` ||
          values.dispatchStatus != `Cancelled`)
      ) {
        sheet[ss][`Confirm Payments`].arrayData.push(row);
        sheet[ss][`Confirm Payments`].jsonData.push(
          viewsJson(row, headers, rowNum)
        );
      }
      //------------------------- generate-orders-conditionals
      if (
        values.orderConfirmationStatus == `Good to Go` &&
        values.deliveryType == `Regular Delivery` &&
        values.isPaymentConfirmed == `Yes` &&
        !values.trackingNumber &&
        values.dispatchStatus != `Cancelled`
      ) {
        sheet[ss][`Generate Orders`].arrayData.push(row);
        sheet[ss][`Generate Orders`].jsonData.push(
          viewsJson(row, headers, rowNum)
        );
      }
      //------------------------- raised-issues-conditionals
      if (!values.cxIssue && values.cxIssueStatus != `Closed`) {
        sheet[ss][`Raised Issues`].arrayData.push(row);
        sheet[ss][`Raised Issues`].jsonData.push(
          viewsJson(row, headers, rowNum)
        );
      }
      //------------------------- cod-conditionals
      if (values[`orderType`] == `COD`) {
        sheet[ss].COD.arrayData.push(row);
        sheet[ss].COD.jsonData.push(viewsJson(row, headers, rowNum));
      }
      //------------------------- processed-orders-conditionals
      if (
        values.trackingNumber &&
        values.dispatchStatus == `Yet to be Dispatched`
      ) {
        sheet[ss][`Processed Orders`].arrayData.push(row);
        sheet[ss][`Processed Orders`].jsonData.push(
          viewsJson(row, headers, rowNum)
        );
      }

      for (let c = 0; c < row.length; c++) {
        json[headers[c]] ??= row[c];
      }

      sheet[ss].Master.jsonData.push(json);
    }
  } else {
    for (let row of data) {
      let json = { rowNo: rowNum++ };

      for (let c = 0; c < row.length; c++) {
        json[headers[c]] ??= row[c];
      }

      sheet[ss][sheetname].jsonData.push(json);
    }
  }
}

//------------------------- views-json-helper-function()
function viewsJson(data, header, row) {
  /**
   * @description This function creates a JSON object from the data and header
   * @param {array} data
   * @param {array} header
   * @param {number} row
   */

  let json = { rowNo: row };
  for (let h = 0; h < header.length; h++) {
    if ([`string`, `number`].includes(typeof data[h])) {
      json[header[h]] ??= data[h];
    } else if (Array.isArray(data[h])) {
      json[header[h]] ??= data[h].join(``);
    } else {
      json[header[h]] ??= ``;
    }
  }

  return json;
}

//------------------------- set-routes-helper-function()
function setRoutes() {
  /**
   * @description This function set all the function to be run in serial
   */
  createDocumentHeader();
  createDocumentNav();
  createDocumentMain();
  fx.$(`.loader-init-div`)?.remove();
  fx.$(`.loader-div`)?.remove();
  createDocumentFooter();
  getTableRows();
  setTimeout(ghostSync, 5 * 60 * 1000);
}

//------------------------- get-table-rows-helper-function()
function getTableRows(pagenum = 1, viewname = `Master`) {
  /**
   * @description This function create and set the rows to the table
   * @param {number} pagenum
   * @param {string} viewname
   */

  if (typeof pagenum != `number`) pagenum = fx.num(pagenum);
  if (typeof viewname != `string`) viewname = fx.str(viewname);
  if (viewname == `Orders`) viewname = `Master`;

  const tbody = fx.$(`.tbody`);
  const currentView = fx.$(`.current-view`);
  const totalPages = fx.$(`footer .total-pages`);
  let data = sheet[tool.name][viewname].jsonData;
  const dataLength = data.length;
  const access = sheet.Database.column_access.jsonData;
  const rpp = fx.num(fx.$(`#entries-per-page`)?.value) || 50;
  const total = Math.ceil(data.length / rpp);
  const end = Math.min(rpp * pagenum, data.length);
  const start = Math.max(0, end - rpp);

  data = data.slice(start, end);
  fx.removeInnerHTML(tbody);

  for (row of data) {
    const subAction = subActions();
    let tr = document.createElement(`tr`);
    tr.setAttribute(`row-num`, row.rowNo);
    tr.addEventListener(`click`, seeDetails);

    //------------------------- sub-action-td
    let sa = document.createElement(`td`);
    sa.classList.add(`sub-actions`);
    sa.append(subAction);
    tr.append(sa);

    //------------------------- order-td
    let orderTd = document.createElement(`td`);
    let orderUl = document.createElement(`ul`);
    let orderDiv = document.createElement(`div`);

    orderTd.classList.add(`order-dt`);
    orderUl.classList.add(`order`);

    //------------------------- customer-td
    let customerTd = document.createElement(`td`);
    let customerUl = document.createElement(`ul`);
    let customerDiv = document.createElement(`div`);

    customerTd.classList.add(`customer-dt`);
    customerUl.classList.add(`customer`);

    //------------------------- requirement-td
    let requirementTd = document.createElement(`td`);
    let requirementUl = document.createElement(`ul`);
    let requirementDiv = document.createElement(`div`);

    requirementTd.classList.add(`requirement-dt`);
    requirementUl.classList.add(`requirement`);

    //------------------------- amount-td
    let amountTd = document.createElement(`td`);
    let amountUl = document.createElement(`ul`);
    let amountDiv = document.createElement(`div`);

    amountTd.classList.add(`amount-dt`);
    amountUl.classList.add(`amount`);

    //------------------------- shipping-td
    let shippingTd = document.createElement(`td`);
    let shippingUl = document.createElement(`ul`);
    let shippingDiv = document.createElement(`div`);

    shippingTd.classList.add(`shipping-dt`);
    shippingUl.classList.add(`shipping`);

    //------------------------- logistic-td
    let logisticTd = document.createElement(`td`);
    let logisticUl = document.createElement(`ul`);
    let logisticDiv = document.createElement(`div`);

    logisticTd.classList.add(`logistic-dt`);
    logisticUl.classList.add(`logistic`);

    for (acc of access) {
      if (!acc.access || !acc.access.includes(user.email)) continue;

      const colname = acc.column_name;

      switch (colname) {
        case `ID`:
          {
            const idLi = document.createElement(`li`);
            const value = row[colname] ?? ``;

            if (!value) idLi.classList.add(`hidden`);

            idLi.id = `id`;
            idLi.title = colname;
            idLi.classList.add(`id`);
            idLi.textContent = value;

            orderUl.append(idLi);
          }
          break;

        case `Timestamp`:
          {
            const timestampLi = document.createElement(`li`);
            const value = row[colname] ?? ``;

            if (!value) timestampLi.classList.add(`hidden`);

            timestampLi.id = `timestamp`;
            timestampLi.title = colname;
            timestampLi.classList.add(`timestamp`);
            timestampLi.textContent = value;

            orderUl.append(timestampLi);
          }
          break;

        case `Email`:
          {
            const value = row[colname] ?? ``;
            const emailLi = document.createElement(`li`);
            const emailA = document.createElement(`a`);

            if (!value) emailLi.classList.add(`hidden`);

            emailLi.id = `email`;
            emailA.href = `mailto:${row[colname]}`;
            emailLi.title = colname;
            emailLi.classList.add(`email`);
            emailA.textContent = value;
            emailA.target = `_blank`;

            emailLi.append(emailA);
            orderUl.append(emailLi);
          }
          break;

        case `MONTH`:
          {
            const value = row[colname] ?? ``;
            const monthLi = document.createElement(`li`);

            if (!value) monthLi.classList.add(`hidden`);

            monthLi.id = `month`;
            monthLi.title = colname;
            monthLi.classList.add(`month`);
            monthLi.textContent = value;

            orderUl.append(monthLi);
          }
          break;

        case `DATE`:
          {
            const value = row[colname] ?? ``;
            const dateLi = document.createElement(`li`);

            if (!value) dateLi.classList.add(`hidden`);

            dateLi.id = `date`;
            dateLi.title = colname;
            dateLi.classList.add(`date`);
            dateLi.textContent = value;

            orderUl.append(dateLi);
          }
          break;

        case `Order No`:
          {
            const value = row[colname] ?? ``;
            const ordernoLi = document.createElement(`li`);

            if (!value) ordernoLi.classList.add(`hidden`);

            ordernoLi.id = `order-no`;
            ordernoLi.title = colname;
            ordernoLi.classList.add(`order-no`);
            ordernoLi.textContent = value;

            orderUl.append(ordernoLi);
          }
          break;

        case `POC`:
          {
            const value = row[colname] ?? ``;
            const pocLi = document.createElement(`li`);
            if (!value) pocLi.classList.add(`hidden`);
            pocLi.id = `poc`;
            pocLi.title = colname;
            pocLi.classList.add(`poc`);
            pocLi.textContent = value;

            orderUl.append(pocLi);
          }
          break;

        case `Client Name`:
          {
            const value = row[colname] ?? ``;
            const clientNameLi = document.createElement(`li`);
            if (!value) clientNameLi.classList.add(`hidden`);
            clientNameLi.id = `client-name`;
            clientNameLi.title = colname;
            clientNameLi.classList.add(`client-name`);
            clientNameLi.textContent = value;

            customerUl.append(clientNameLi);
          }
          break;

        case `Contact Number`:
          {
            const value = row[colname] ?? ``;
            const contactLi = document.createElement(`li`);
            const contactA = document.createElement(`a`);
            if (!value) contactLi.classList.add(`hidden`);
            contactLi.id = `contact-number`;
            contactA.href = `tel:${value ?? ``}`;
            contactLi.title = colname;
            contactA.textContent = value;
            contactA.target = `_blank`;
            contactLi.classList.add(`contact-number`);

            contactLi.append(contactA);
            customerUl.append(contactLi);
          }
          break;

        case `Alternate Contact Number`:
          {
            const value = row[colname] ?? ``;
            const altContactLi = document.createElement(`li`);
            const altContactA = document.createElement(`a`);
            if (!value) altContactLi.classList.add(`hidden`);
            altContactLi.id = `alternative-contact-number`;
            altContactA.href = `tel:${row[colname] ?? ``}`;
            altContactLi.title = colname;
            altContactA.textContent = value;
            altContactA.target = `_blank`;
            altContactLi.classList.add(`alternative-contact-number`);

            altContactLi.append(altContactA);
            customerUl.append(altContactLi);
          }
          break;

        case `Order Details`:
          {
            const orderDetilsLi = document.createElement(`li`);
            const value = row[colname]?.replaceAll(`\n`, `<br>`) ?? ``;
            if (!value) orderDetilsLi.classList.add(`hidden`);
            orderDetilsLi.id = `order-details`;
            orderDetilsLi.title = colname;
            orderDetilsLi.classList.add(`order-details`);
            orderDetilsLi.insertAdjacentHTML(`beforeend`, value);

            requirementUl.append(orderDetilsLi);
          }
          break;

        case `Total Amount  (INR)`:
          {
            const totalAmountLi = document.createElement(`li`);
            const value = row[colname] ?? `0`;
            if (!value) totalAmountLi.classList.add(`hidden`);
            totalAmountLi.id = `total-amount`;
            totalAmountLi.title = colname;
            totalAmountLi.classList.add(`total-amount`);
            totalAmountLi.textContent = value;

            amountUl.append(totalAmountLi);
          }
          break;

        case `Prepaid Amount (If any) (INR)`:
          {
            const prepaidAmountLi = document.createElement(`li`);
            const value = row[colname] ?? `0`;
            if (!value) prepaidAmountLi.classList.add(`hidden`);
            prepaidAmountLi.id = `prepaid-amount`;
            prepaidAmountLi.title = colname;
            prepaidAmountLi.classList.add(`prepaid-amount`);
            prepaidAmountLi.textContent = value;

            amountUl.append(prepaidAmountLi);
          }
          break;

        case `Balance Amount (To be paid) (INR)`:
          {
            const balanceAmountLi = document.createElement(`li`);
            const value = row[colname] ?? `0`;
            if (!value) balanceAmountLi.classList.add(`hidden`);
            balanceAmountLi.id = `balance-amount`;
            balanceAmountLi.title = colname;
            balanceAmountLi.classList.add(`balance-amount`);
            balanceAmountLi.textContent = value;

            amountUl.append(balanceAmountLi);
          }
          break;

        case `Mode of payment`:
          {
            const mopLi = document.createElement(`li`);
            const value = row[colname] ?? ``;
            if (!value) mopLi.classList.add(`hidden`);
            mopLi.id = `mode-of-payment`;
            mopLi.title = colname;
            mopLi.classList.add(`mode-of-payment`);
            mopLi.insertAdjacentHTML(`beforeend`, value);

            amountUl.append(mopLi);
          }
          break;

        case `Shipping Address`:
          {
            const address1Li = document.createElement(`li`);
            const value = row[colname]?.replaceAll(`\n`, `<br>`) ?? ``;
            if (!value) address1Li.classList.add(`hidden`);
            address1Li.id = `shipping-address`;
            address1Li.title = colname;
            address1Li.classList.add(`shipping-address`);
            address1Li.insertAdjacentHTML(`beforeend`, value);

            shippingUl.append(address1Li);
          }
          break;

        case `Shipping Address_2`:
          {
            const address2Li = document.createElement(`li`);
            const value = row[colname]?.replaceAll(`\n`, `<br>`) ?? ``;
            if (!value) address2Li.classList.add(`hidden`);
            address2Li.id = `shipping-address-2`;
            address2Li.title = colname;
            address2Li.classList.add(`shipping-address-2`);
            address2Li.insertAdjacentHTML(`beforeend`, value);

            shippingUl.append(address2Li);
          }
          break;

        case `State`:
          {
            const stateLi = document.createElement(`li`);
            const value = row[colname] ?? ``;
            if (!value) stateLi.classList.add(`hidden`);
            stateLi.id = `state`;
            stateLi.title = colname;
            stateLi.classList.add(`state`);
            stateLi.insertAdjacentHTML(`beforeend`, value);

            shippingUl.append(stateLi);
          }
          break;

        case `Pincode`:
          {
            const pincodeLi = document.createElement(`li`);
            const value = row[colname] ?? ``;
            if (!value) pincodeLi.classList.add(`hidden`);
            pincodeLi.id = `pincode`;
            pincodeLi.title = colname;
            pincodeLi.classList.add(`pincode`);
            pincodeLi.insertAdjacentHTML(`beforeend`, value);

            shippingUl.append(pincodeLi);
          }
          break;

        case `Order Confirmation Status`:
          {
            const ordrConfLi = document.createElement(`li`);
            const value = row[colname] ?? ``;
            if (!value) ordrConfLi.classList.add(`hidden`);
            ordrConfLi.id = `order-confirmation-status`;
            ordrConfLi.title = colname;
            ordrConfLi.classList.add(`order-confirmation-status`);
            ordrConfLi.insertAdjacentHTML(`beforeend`, value);

            logisticUl.append(ordrConfLi);
          }
          break;

        case `Delivery Type`:
          {
            const deliveryTypeLi = document.createElement(`li`);
            const value = row[colname] ?? ``;
            if (!value) deliveryTypeLi.classList.add(`hidden`);
            deliveryTypeLi.id = `delivery-type`;
            deliveryTypeLi.title = colname;
            deliveryTypeLi.classList.add(`delivery-type`);
            deliveryTypeLi.insertAdjacentHTML(`beforeend`, value);

            logisticUl.append(deliveryTypeLi);
          }
          break;

        case `Instant Delivery Partner`:
          {
            const deliveryPartnerLi = document.createElement(`li`);
            const value = row[colname] ?? ``;
            if (!value) deliveryPartnerLi.classList.add(`hidden`);
            deliveryPartnerLi.id = `instant-delivery-partner`;
            deliveryPartnerLi.title = colname;
            deliveryPartnerLi.classList.add(`instant-delivery-partner`);
            deliveryPartnerLi.insertAdjacentHTML(`beforeend`, value);

            logisticUl.append(deliveryPartnerLi);
          }
          break;

        case `Tracking Status`:
          {
            const trackingStatusLi = document.createElement(`li`);
            const value = row[colname] ?? ``;
            if (!value) trackingStatusLi.classList.add(`hidden`);
            trackingStatusLi.id = `tracking-status`;
            trackingStatusLi.title = colname;
            trackingStatusLi.classList.add(`tracking-status`);
            trackingStatusLi.insertAdjacentHTML(`beforeend`, value);

            logisticUl.append(trackingStatusLi);
          }
          break;

        case `Tracking Number`:
          {
            const trackingNumberLi = document.createElement(`li`);
            const trackingNumberA = document.createElement(`a`);
            const value = row[colname] ?? ``;
            if (!value) trackingNumberLi.classList.add(`hidden`);
            trackingNumberLi.id = `tracking-number`;
            trackingNumberLi.title = colname;
            trackingNumberLi.classList.add(`tracking-number`);
            trackingNumberA.href = `https://www.ithinklogistics.co.in/postship/tracking/${value}`;
            trackingNumberA.target = `_blank`;
            trackingNumberA.textContent = value;
            trackingNumberLi.append(trackingNumberA);

            logisticUl.append(trackingNumberLi);
          }
          break;

        case `Order Creation Error Type`:
          {
            const orderErrorLi = document.createElement(`li`);
            const value = row[colname] ?? ``;
            if (!value) orderErrorLi.classList.add(`hidden`);
            orderErrorLi.id = `order-creation-error-type`;
            orderErrorLi.title = colname;
            orderErrorLi.classList.add(`order-creation-error-type`);
            orderErrorLi.insertAdjacentHTML(`beforeend`, value);

            logisticUl.append(orderErrorLi);
          }
          break;

        case `Logistic Name`:
          {
            const logisticNameLi = document.createElement(`li`);
            const value = row[colname] ?? ``;
            if (!value) logisticNameLi.classList.add(`hidden`);
            logisticNameLi.id = `logistic-name`;
            logisticNameLi.title = colname;
            logisticNameLi.classList.add(`logistic-name`);
            logisticNameLi.insertAdjacentHTML(`beforeend`, value);

            logisticUl.append(logisticNameLi);
          }
          break;

        case `Tracking Url`:
          {
            const trackingUrlli = document.createElement(`li`);
            const trackingUrlA = document.createElement(`a`);
            const value = row[colname] ?? ``;
            if (!value) trackingUrlli.classList.add(`hidden`);
            trackingUrlA.href = row[colname];
            trackingUrlli.id = `tracking-url`;
            trackingUrlli.title = colname;
            trackingUrlA.textContent = `Check Tracking Status`;
            trackingUrlA.target = `_blank`;
            trackingUrlli.classList.add(`tracking-url`);

            trackingUrlli.append(trackingUrlA);
            logisticUl.append(trackingUrlli);
          }
          break;

        case `Dispatch Status`:
          {
            const dispatchStatusLi = document.createElement(`li`);
            const value = row[colname] ?? ``;
            if (!value) dispatchStatusLi.classList.add(`hidden`);
            dispatchStatusLi.id = `dispatch-status`;
            dispatchStatusLi.title = colname;
            dispatchStatusLi.classList.add(`dispatch-status`);
            dispatchStatusLi.insertAdjacentHTML(`beforeend`, value);

            logisticUl.append(dispatchStatusLi);
          }
          break;

        case `Order Type Status`:
          {
            const orderTypeStatusLi = document.createElement(`li`);
            const value = row[colname] ?? ``;
            if (!value) orderTypeStatusLi.classList.add(`hidden`);
            orderTypeStatusLi.id = `order-type-status`;
            orderTypeStatusLi.title = colname;
            orderTypeStatusLi.classList.add(`order-type-status`);
            orderTypeStatusLi.insertAdjacentHTML(`beforeend`, value);

            amountUl.append(orderTypeStatusLi);
          }
          break;

        case `Order Type`:
          {
            const orderTypeLi = document.createElement(`li`);
            const value = row[colname] ?? ``;
            if (!value) orderTypeLi.classList.add(`hidden`);
            orderTypeLi.id = `order-type`;
            orderTypeLi.title = colname;
            orderTypeLi.classList.add(`order-type`);
            orderTypeLi.insertAdjacentHTML(`beforeend`, value);

            amountUl.append(orderTypeLi);
          }
          break;

        case `Is Payment Confirmed`:
          {
            const isPaymentConfirmedLi = document.createElement(`li`);
            const value = row[colname] ?? `Pending`;
            if (!value) isPaymentConfirmedLi.classList.add(`hidden`);
            isPaymentConfirmedLi.id = `is-payment-confirmed`;
            isPaymentConfirmedLi.title = colname;
            isPaymentConfirmedLi.classList.add(`is-payment-confirmed`);
            isPaymentConfirmedLi.insertAdjacentHTML(`beforeend`, value);

            amountUl.append(isPaymentConfirmedLi);
          }
          break;

        case `Payment Timestamp`:
          {
            const paymentTimestampLi = document.createElement(`li`);
            const value = row[colname] ?? ``;
            if (!value) paymentTimestampLi.classList.add(`hidden`);
            paymentTimestampLi.id = `payment-timestamp`;
            paymentTimestampLi.title = colname;
            paymentTimestampLi.classList.add(`payment-timestamp`);
            paymentTimestampLi.insertAdjacentHTML(`beforeend`, value);

            amountUl.append(paymentTimestampLi);
          }
          break;

        case `Payment Confirmation Timestamp`:
          {
            const paymentConfirmationTimestampLi = document.createElement(`li`);
            const value = row[colname] ?? ``;
            if (!value) paymentConfirmationTimestampLi.classList.add(`hidden`);
            paymentConfirmationTimestampLi.id = `payment-confirmation-timestamp`;
            paymentConfirmationTimestampLi.title = colname;
            paymentConfirmationTimestampLi.classList.add(
              `payment-confirmation-timestamp`
            );
            paymentConfirmationTimestampLi.insertAdjacentHTML(
              `beforeend`,
              value
            );

            amountUl.append(paymentConfirmationTimestampLi);
          }
          break;

        case `Remarks`:
          {
            const remarksLi = document.createElement(`li`);
            const value = row[colname]?.replaceAll(`\n`, `<br>`) ?? ``;
            if (!value) remarksLi.classList.add(`hidden`);
            remarksLi.id = `remarks`;
            remarksLi.title = colname;
            remarksLi.classList.add(`remarks`);
            remarksLi.insertAdjacentHTML(`beforeend`, value);

            logisticUl.append(remarksLi);
          }
          break;

        case `Booking Company`:
          {
            const bookingCompanyLi = document.createElement(`li`);
            const value = row[colname] ?? ``;
            if (!value) bookingCompanyLi.classList.add(`hidden`);
            bookingCompanyLi.id = `booking-company`;
            bookingCompanyLi.title = colname;
            bookingCompanyLi.classList.add(`booking-company`);
            bookingCompanyLi.insertAdjacentHTML(`beforeend`, value);

            logisticUl.append(bookingCompanyLi);
          }
          break;

        case `Remittance Amount`:
          {
            const remittanceAmountLi = document.createElement(`li`);
            const value = row[colname] ?? `0`;
            if (!value) remittanceAmountLi.classList.add(`hidden`);
            remittanceAmountLi.id = `remittance-amount`;
            remittanceAmountLi.title = colname;
            remittanceAmountLi.classList.add(`remittance-amount`);
            remittanceAmountLi.insertAdjacentHTML(`beforeend`, value);

            amountUl.append(remittanceAmountLi);
          }
          break;

        case `CX Issue`:
          {
            const cxIssueLi = document.createElement(`li`);
            const value = row[colname] ?? ``;
            if (!value) cxIssueLi.classList.add(`hidden`);
            cxIssueLi.id = `cx-issue`;
            cxIssueLi.title = colname;
            cxIssueLi.classList.add(`cx-issue`);
            cxIssueLi.insertAdjacentHTML(`beforeend`, value);

            logisticUl.append(cxIssueLi);
          }
          break;

        case `CX Issue Status`:
          {
            const cxIssueStatusLi = document.createElement(`li`);
            const value = row[colname] ?? ``;
            if (!value) cxIssueStatusLi.classList.add(`hidden`);
            cxIssueStatusLi.id = `cx-issue-status`;
            cxIssueStatusLi.title = colname;
            cxIssueStatusLi.classList.add(`cx-issue-status`);
            cxIssueStatusLi.insertAdjacentHTML(`beforeend`, value);

            logisticUl.append(cxIssueStatusLi);
          }
          break;

        default:
          break;
      }
    }

    orderDiv.append(orderUl);
    customerDiv.append(customerUl);
    requirementDiv.append(requirementUl);
    amountDiv.append(amountUl);
    shippingDiv.append(shippingUl);
    logisticDiv.append(logisticUl);

    orderTd.append(orderDiv);
    customerTd.append(customerDiv);
    requirementTd.append(requirementDiv);
    amountTd.append(amountDiv);
    shippingTd.append(shippingDiv);
    logisticTd.append(logisticDiv);

    tr.append(
      orderTd,
      customerTd,
      requirementTd,
      amountTd,
      shippingTd,
      logisticTd
    );

    tbody.append(tr);
  }

  currentView.innerHTML = `${viewname == `Master` ? `Orders` : viewname} (${
    start + 1 + ` - ` + end + `/ ` + dataLength
  })`;
  totalPages.disabled = false;
  totalPages.value = total;
  totalPages.disabled = true;
}

//------------------------- create-sub-actions-function()
function subActions() {
  /**
   * @description This function returns the sub-action-ul
   */
  const access = sheet.Database.sub_action_access.jsonData;
  let subAction = document.createElement(`ul`);

  for (let acc of access) {
    if (acc.tool_name == tool.name && acc.access.includes(user.email)) {
      const subaction = fx.text2el(acc.script);
      subAction.append(subaction);
    }
  }

  return subAction;
}

//------------------------- get-dropdowns-helper-function()
function getDropdowns(colname) {
  /**
   * @description This function returns the dropdowns for the given column name
   * @param {string} colname
   */

  const dropdownData = sheet.Database.dropdowns.jsonData.slice();
  const selectedOption = document.createElement(`option`);
  let dropdowns = [];
  selectedOption.value = ``;
  selectedOption.textContent = `Select ${colname}`;
  selectedOption.disabled = true;
  selectedOption.selected = true;
  dropdowns.push(selectedOption);

  for (let dropdown of dropdownData) {
    if (dropdown.tool_name != tool.name || dropdown.column_name != colname)
      continue;
    let option = document.createElement(`option`);
    option.value = dropdown.value;
    option.textContent = dropdown.value;
    dropdowns.push(option);
  }

  return dropdowns;
}

//------------------------- get-poc-dropdowns-function()
function getPocDropdowns() {
  /**
   * @description This function returns the POC options
   */

  const employeesData = sheet.Database.Employees.jsonData.slice();
  const selectedOption = document.createElement(`option`);
  let dropdowns = [];
  selectedOption.value = ``;
  selectedOption.textContent = `Select POC`;
  selectedOption.disabled = true;
  selectedOption.selected = true;
  dropdowns.push(selectedOption);

  for (let employee of employeesData) {
    let option = document.createElement(`option`);
    let name = employee.Name;

    option.value = name;
    option.textContent = name;
    dropdowns.push(option);
  }

  return dropdowns;
}

//------------------------- ghost-sync-helper-function()
async function ghostSync() {
  /**
   * @description This function works in background to sync realtime data
   */

  const masterData = await sheet.getData(
    sheet[tool.name].ssid,
    `Master`,
    user.apiKey
  );
  distributeData(tool.name, `Master`, masterData);
  setTimeout(ghostSync, 5 * 60 * 1000);
}

//------------------------- now-str-helper-function()
function nowStr() {
  const d = new Date();
  const pad = (n) => (n < 10 ? "0" + n : n);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

//------------------------- get-order-number-helper-function()
function getOrderNo(condition) {
  let data = sheet[tool.name].Master.jsonData.slice();
  let orders = data.filter(function (value) {
    return value.DATE == condition;
  });
  return orders.length + 1;
}

//------------------------- append-data-helper-function()
function appendData(object = {}) {
  const indexes = sheet[tool.name].Master.indexes;
  let data = { type: `append`, data: [] };

  for (let key in object) {
    data.data.push({
      index: indexes[key] + 1,
      value: object[key],
    });
  }

  data.data = data.data
    .sort(function (a, b) {
      return a.index - b.index;
    })
    .map(function (value) {
      return value.value;
    });

  script.run(toSheet, data, tool.name, `Master`);
}

//------------------------- response-adjust-helper-function()
function responseAdjust(results = [], data = []) {
  const indexes = sheet[tool.name].Master.indexes;
  let arr = [];

  results.forEach(function (result) {
    const row = data.find((r) => r[`ID`] == result.id);
    console.log(row);

    arr.push({
      row_number: row?.rowNum || null,
      indexes: {
        tracking_status: indexes[`Tracking Status`],
        tracking_number: indexes[`Tracking Number`],
        order_creation_error_type: indexes[`Order Creation Error Type`],
        logistic_name: indexes[`Logistic Name`],
        tracking_url: indexes[`Tracking Url`],
        dispatch_status: indexes[`Dispatch Status`],
        booking_company: indexes[`Booking Company`],
      },
      tracking_status: result.tracking_status,
      tracking_number: result.tracking_number,
      order_creation_error_type: result.order_creation_error_type,
      logistic_name: result.logistic_name,
      tracking_url: result.tracking_url,
      dispatch_status: result.dispatch_status,
      booking_company: result.booking_company,
    });
  });

  return arr;
}

//------------------------- fetch-api-helper-function()
function fetchApi(data = [], company) {
  const url = `https://my.ithinklogistics.com/api_v3/order/add.json`;
  const arr = [];

  const pickupAddressId = Object.values(user.company).find(function (c) {
    return c.name == company;
  })?.pickupAddressId;

  const returnAddressId = Object.values(user.company).find(function (c) {
    return c.name == company;
  })?.returnAddressId;

  const accessToken = Object.values(user.company).find(function (c) {
    return c.name == company;
  })?.accessToken;

  const secretKey = Object.values(user.company).find(function (c) {
    return c.name == company;
  })?.secretKey;

  const payload = {
    data: {
      shipments: [],
      pickup_address_id: `${pickupAddressId}`,
      access_token: `${accessToken}`,
      secret_key: `${secretKey}`,
      logistics: ``,
      s_type: ``,
      order_type: `forward`,
    },
  };

  for (row of data) {
    payload.data.shipments.push(payloadHelper(row, returnAddressId));
  }

  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
    body: JSON.stringify(payload),
  };

  const baseTrack = `https://www.ithinklogistics.co.in/postship/tracking/`;

  const result = fetch(url, option)
    .then((response) => response.json())
    .then(function (json) {
      if (json.status == `success`) {
        Object.keys(json.data).forEach(function (key) {
          arr.push({
            id: json?.data[key]?.refnum,
            tracking_status: json?.data[key]?.waybill ? `Manifested` : ``,
            tracking_number: json?.data[key]?.waybill || ``,
            order_creation_error_type: json?.data[key]?.remark || ``,
            logistic_name: json?.data[key]?.logistic_name || ``,
            tracking_url: json?.data[key]?.waybill
              ? baseTrack + json?.data[key]?.waybill
              : ``,
            dispatch_status: json?.data[key]?.waybill
              ? `Yet to be Dispatched`
              : ``,
            booking_company: company,
          });
        });
      } else {
        arr.push({
          id: ``,
          tracking_status: ``,
          tracking_number: ``,
          order_creation_error_type: json.html_message || ``,
          logistic_name: ``,
          tracking_url: ``,
          dispatch_status: ``,
          booking_company: company,
        });

        console.log(json.html_message);
      }
    });

  return arr;
}

//------------------------- payload-helper-helper-function()
function payloadHelper(data = {}, returnAddressId = ``) {
  return {
    waybill: ``,
    order: data[`ID`],
    sub_order: ``,
    order_date: convertDate(data[`DATE`]),
    total_amount:
      data[`Order Type`] == `COD`
        ? data[`Balance Amount (To be paid) (INR)`]
        : data[`Total Amount  (INR)`],
    name: data[`Client Name`],
    company_name: ``,
    add: data[`Shipping Address`],
    add2: data[`Shipping Address_2`],
    add3: ``,
    pin: data[`Pincode`],
    city: ``,
    state: data[`State`],
    country: `INDIA`,
    phone: data[`Contact Number`],
    alt_phone: data[`Alternate Contact Number`],
    email: ``,
    is_billing_same_as_shipping: `yes`,
    billing_name: ``,
    billing_company_name: ``,
    billing_add: ``,
    billing_add2: ``,
    billing_add3: ``,
    billing_pin: ``,
    billing_city: ``,
    billing_state: ``,
    billing_country: ``,
    billing_phone: ``,
    billing_alt_phone: ``,
    billing_email: ``,
    products: [
      {
        product_name: `HEALTHCARE HERBAL PRODUCTS`,
        product_sku: ``,
        product_quantity: 1,
        product_price:
          data[`Order Type`] == `COD`
            ? data[`Balance Amount (To be paid) (INR)`]
            : data[`Total Amount  (INR)`],
        product_tax_rate: ``,
        product_hsn_code: ``,
        product_discount: ``,
        product_img_url: ``,
      },
    ],
    shipment_length: 10,
    shipment_width: 8,
    shipment_height: 6,
    weight: 0.5,
    shipping_charges: ``,
    giftwrap_charges: ``,
    transaction_charges: ``,
    total_discount: ``,
    first_attemp_discount: ``,
    cod_charges: ``,
    advance_amount: ``,
    cod_amount: data[`Balance Amount (To be paid) (INR)`],
    payment_mode: data[`Order Type`],
    reseller_name: ``,
    eway_bill_number: ``,
    gst_number: ``,
    what3words: ``,
    return_address_id: returnAddressId,
    api_source: ``,
    store_id: ``,
  };
}

//------------------------- convert-date-helper-function()
function convertDate(date) {
  date = new Date(date);
  const day = String(date.getDate()).padStart(2, 0);
  const month = String(date.getMonth() + 1).padStart(2, 0);
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
//------------------------- update-data-helper-function()
function updateData(object = {}, rownumber = 0) {
  const indexes = sheet[tool.name].Master.indexes;
  let data = { type: `update`, row: rownumber, data: [] };

  for (let key in object) {
    data.data.push({
      index: indexes[key] + 1,
      value: object[key],
    });
  }

  script.run(toSheet, data, tool.name, `Master`);
}

//------------------------- remove-form-helper-function()
function removeForm() {
  const form = fx.$(`.form-base`);
  form.remove();
}

function getFilterActions() {
  const data = sheet.Database.action_access.jsonData.slice();
  const list = document.createElement(`ul`);

  for (let json of data) {
    if (
      json.tool_name == tool.name &&
      json.type == `Filter Action` &&
      json.access.includes(user.email)
    ) {
      const li = document.createElement(`li`);

      li.append(fx.text2el(json.script), json.action);
      list.append(li);
    }
  }

  return list;
}
