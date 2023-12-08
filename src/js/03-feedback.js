import _ from 'lodash';
import throttle from 'lodash.throttle';

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.feedback-form');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');

  const updateLocalStorageThrottled = throttle(updateLocalStorage, 500);

  checkLocalStorage();

  form.addEventListener('input', updateLocalStorageThrottled);

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = {
      email: emailInput.value,
      message: messageInput.value,
    };
    console.log('Form data submitted:', formData);
    clearFormAndLocalStorage();
  });

  function updateLocalStorage() {
    const formData = {
      email: emailInput.value,
      message: messageInput.value,
    };
    localStorage.setItem('feedback-form-state', JSON.stringify(formData));
  }

  function checkLocalStorage() {
    const storedData = localStorage.getItem('feedback-form-state');
    if (storedData) {
      const formData = JSON.parse(storedData);
      emailInput.value = formData.email;
      messageInput.value = formData.message;
    }
  }

  function clearFormAndLocalStorage() {
    emailInput.value = '';
    messageInput.value = '';
    localStorage.removeItem('feedback-form-state');
  }
});
