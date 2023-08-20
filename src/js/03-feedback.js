import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('[name="email"]');
const messageInput = form.querySelector('[name="message"]');
const formStorageKey = 'feedback-form-state';

form.addEventListener('input', throttle(saveForm, 500));
form.addEventListener('submit', handleSubmit);

loadForm();

function saveForm() {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.setItem(formStorageKey, JSON.stringify(formState));
}

function loadForm() {
  const savedForm = localStorage.getItem(formStorageKey);

  if (savedForm) {
    const { email, message } = JSON.parse(savedForm);
    emailInput.value = email;
    messageInput.value = message;
  }
}

function handleSubmit(e) {
  e.preventDefault();

  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };

  console.log(formState);

  localStorage.removeItem(formStorageKey);
  emailInput.value = '';
  messageInput.value = '';
}
