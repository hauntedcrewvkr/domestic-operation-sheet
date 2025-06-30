/**
 * @description This consists all the helper functions
 */

//-------------------------------------------<( filter-check-helper-function()>-
function filterCheck({ json, filter }) {
  const operators = fx.checkers;

  for (const [operator, obj] of Object.entries(filter)) {
    for (const [column, value] of Object.entries(obj)) {
      if (!operators[operator](json[column].value, value)) return false;
    }
  }

  return true;
}

//-------------------------------------------<( action-router-event-function )>-
function actionRouter(e) {}

//---------------------------------------------<( set-action-helper-function )>-
function setAction(element) {
  const actionName = element.getAttribute('actionname');

  if (actionName.includes('|')) {
    for (const action_name of actionName.split('|')) {
      element.append(action_name == 'Sub Action' ? app.cta[action_name].cloneNode(true) : app.cta[action_name]);
    }
  } else {
    element.append(actionName == 'Sub Action' ? app.cta[actionName].cloneNode(true) : app.cta[actionName]);
  }
}

//--------------------------------------------<( add-shimmer-helper-function()>-
function addShimmerEffect(element) {
  element.classList.add('shimmer');
}

//-----------------------------------------<( remove-shimmer-helper-function()>-
function removeShimmerEffect(element) {
  element.classList.remove('shimmer');
}

//----------------------------------------------<( schema2el-helper-function()>-
function schema2el(schema = {}) {
  const element = document.createElement(schema.tag);

  schema.text && (element.textContent = schema.text);
  schema.innerhtml && (element.innerHTML = schema.innerhtml);

  if ('attr' in schema) {
    for (const [key, val] of Object.entries(schema.attr)) {
      element.setAttribute(key, val);
    }
  }

  if ('sub' in schema && schema.sub.length > 0) {
    for (const childSchema of schema.sub) {
      element.appendChild(schema2el(childSchema));
    }
  }

  if ('func' in schema && schema.func.length > 0) {
    for (const fx of schema.func) {
      fx(element);
    }
  }

  return element;
}

//--------------------------------<( change-loader-progress-herlper-function()>-
function changeLoaderProgress(progress) {
  /**
   * @description Update progress bar width using CSS variable
   * @param {number} progress - 0 to 100
   */
  progress = Math.max(0, Math.min(100, progress));
  const styleVariables = document.documentElement.style;
  styleVariables.setProperty('--progress-width', `${progress}%`);
}

//----------------------------------------------------------<( add-name-form()>-
function addNameForm() {
  const form = schema2el(app.schema.forms.addNameForm);
  document.body.append(form);
}

//-------------------------------------------------<( notify-helper-function()>-
function notify({ message, type }) {
  if (!['info', 'warn`', 'error'].includes(type)) return;

  const icon = {
    info: 'ph-fill ph-info alert-span',
    warn: 'ph-fill ph-warning-circle alert-span',
    error: 'ph-fill ph-x-circle alert-span',
  };

  const schema = {
    tag: 'div',
    attr: { class: type },
    func: [removeElement, toggleVisibility],
    sub: [
      {
        tag: 'i',
        attr: { class: icon[type] },
      },
      {
        tag: 'i',
        attr: { class: '', innerhtml: message },
      },
    ],
  };

  function toggleVisibility(element) {
    function toggle() {
      element.classList.toggle('hide');
      element.classList.toggle('show');
      element.classList.toggle('show-alert');
    }

    toggle();
    setTimeout(toggle, 5000);
  }
  return schema2el({ schema: schema });
}

//-----------------------------------------<( remove-element-helper-function()>-
function removeElement({ element, urgent = false }) {
  if (urgent) element.remove();
  if (!urgent) setTimeout(() => element.remove(), 500);
}

//--------------------------------------<( set-table-headers-helper-function()>-
function setTableHeaders(element) {
  element.append(
    schema2el({
      tag: 'th',
      sub: [
        {
          tag: 'div',
          attr: { class: 'th-holder' },
          sub: [
            { tag: 'i', attr: { class: 'ph ph-magnifying-glass' } },
            { tag: 'input', att: { type: 'text' } },
          ],
        },
      ],
    })
  );

  for (const [group, columns] of Object.entries(gsheet.columnGroup)) {
    if (Array.isArray(columns) && columns.length > 0) {
      element.append(
        schema2el({
          tag: 'th',
          sub: [
            {
              tag: 'div',
              attr: { class: 'th-holder' },
              sub: [
                { tag: 'i', attr: { class: 'ph ph-sort-ascending' } },
                { tag: 'span', text: group },
              ],
            },
          ],
        })
      );
    }
  }
}

//-----------------------------------------<( set-table-rows-helper-function()>-
function setTableRows(element, props = { page: 1, view: `Orders`, rpp: 50 }) {
  const data = gsheet.domesticOperationSheet[props.view].data;
  let start = props.page > 0 ? props.rpp * (props.page - 1) : 0;
  const end = Math.min(start + props.rpp, data.length);

  while (start < end) {
    const tr = schema2el({ tag: 'tr', attr: { class: 'table-row', onclick: 'seeDetails(event)', rowNum: start + 2 } });
    tr.append(schema2el({ tag: 'td', attr: { class: 'sub-action-td', actionname: 'Sub Action' }, sub: [{ tag: 'div', attr: { class: 'tr-actions', actionname: 'Sub Action' }, func: [setAction], sub: [{ tag: 'div', attr: {}, sub: [{ tag: 'i', attr: { class: 'ph ph-corners-out' } }] }] }] }));

    for (const [group, columns] of Object.entries(gsheet.columnGroup)) {
      const td = schema2el({ tag: 'td', sub: [{ tag: 'div', attr: { headname: group } }] });
      const tdContainer = fx.$('div', td);

      for (const column of columns) {
        if (gsheet.columnProps[column].view.access) {
          const el = schema2el(gsheet.columnProps[column].view.schema);
          el.textContent = data[start][column].value;

          tdContainer.append(el);
        }
      }

      tdContainer.innerHTML && tr.append(td);
    }

    tr.innerHTML ? element.append(tr) : tr.remove();
    start++;
  }
}
