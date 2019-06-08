function submitForm() {
  var taskInput = document.getElementById('task').value;
  var descriptionInput = document.getElementById('description').value;
  window['transferData'](taskInput, descriptionInput);
  window.close();
}

function loadInitialValues() {
  document.getElementById('task').value = window['lastTaskName'];
  document.getElementById('description').focus();
}

document
  .getElementById('save-button')
  .addEventListener('click', submitForm, false);

document.addEventListener('dataReady', loadInitialValues, false);

document.addEventListener(
  'keypress',
  function(e) {
    if (e.keyCode === 13) {
      submitForm();
    }
  },
  false
);

var event = new CustomEvent('dataReady');
document.dispatchEvent(event);
