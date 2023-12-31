const valMsg = document.getElementById('validation_msg');
const inputs = document.querySelectorAll('form input, form textarea');
let clearMsgTimeOut = null;
let formData = {};

if (localStorage.getItem('FormData')) {
  formData = JSON.parse(localStorage.getItem('FormData'));
}

// Validation function //

function validationHandler(e) {
  e.preventDefault();

  let emailOk = false;
  const textOkArr = [];
  const msgArr = [];

  inputs.forEach((item) => {
    const { name } = item;

    switch (name) {
      case 'email':
        emailOk = /^([a-z0-9-_.]+)@(\w+)\.(\w+)$/.test(item.value);
        if (emailOk) {
          item.classList.remove('invalid');
        } else {
          item.classList.add('invalid');
          msgArr.push('Invalid email format\nSuggestion: remember that all character must be lowercase.');
        }
        break;
      case 'name':
        if (item.value !== '') {
          textOkArr.push(true);
          item.classList.remove('invalid');
        } else {
          item.classList.add('invalid');
          textOkArr.push(false);
          msgArr.push('This field should not be empty');
        }
        break;
      case 'description':
        if (item.value !== '') {
          textOkArr.push(true);
          item.classList.remove('invalid');
        } else {
          item.classList.add('invalid');
          textOkArr.push(false);
          msgArr.push('This field should not be empty');
        }
        break;
      default:
        break;
    }
  });

  clearTimeout(clearMsgTimeOut);
  valMsg.innerText = msgArr.join('\n');
  clearMsgTimeOut = setTimeout(() => {
    valMsg.innerText = '';
  }, 2000);

  if (emailOk && textOkArr.includes(false) === false) {
    fetch('https://formspree.io/f/mjvdnklq', {
      method: 'POST',
      body: new FormData(document.querySelector('form'))
    });

    alert('Your information has been succesfully delivered, I will contact you soon, thank you!');
  }
}

document.querySelector('form').addEventListener('submit', validationHandler);

inputs.forEach((item) => {
  const { name } = item;
  if (item.type === 'submit') return;

  if (formData[name]) {
    item.value = formData[name];
  }
  item.addEventListener('change', (e) => {
    formData[name] = e.target.value;
    localStorage.setItem('FormData', JSON.stringify(formData));
  });
});