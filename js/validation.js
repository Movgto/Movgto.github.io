const valMsg = document.getElementById('validation_msg');
const inputs = document.querySelectorAll('form input, form textarea');
let clearMsgTimeOut = null;

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
        emailOk = /^([a-z0-9-_.]+)@(\w+)\.(\w+)$/i.test(item.value);
        if (emailOk) {
          item.classList.remove('invalid');
        } else {
          item.classList.add('invalid');
          msgArr.push('Invalid email format');
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

  
  }, 2000);

  if (emailOk && textOkArr.includes(false) === false) {
    fetch('https://formspree.io/f/mjvdnklq', {
      method: 'POST',
      body: new FormData(document.querySelector('form'))
    });

    alert('Your information has been succesfully delivered!');
  }
}

document.querySelector('form').addEventListener('submit', validationHandler);