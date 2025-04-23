const SELECT_DEFAULT_VALUE = "Выберите";

const showError = (form, input, message) => {
  const error = form.querySelector(`.${input.id}-error`);
  error.textContent = message;
  error.classList.add("form__input-error_active");
  input.classList.add("form_input_invalid");
};

const hideError = (form, input) => {
  const error = form.querySelector(`.${input.id}-error`);
  error.textContent = "";
  error.classList.remove("form__input-error_active");
  input.classList.remove("form_input_invalid");
};

const isCardNumberValid = (value) => {
  const cleaned = value.replace(/\D/g, '');
  return cleaned.length === 16;
};

const isPhoneValid = (value) => {
  const cleaned = value.replace(/\D/g, '');
  return cleaned.length === 11 && cleaned.startsWith('7');
};

const formatPhoneNumber = (input) => {
  let value = input.value.replace(/\D/g, '');

  // Заменим 8 на 7 в начале
  if (value.startsWith('8')) {
    value = '7' + value.slice(1);
  } else if (!value.startsWith('7')) {
    value = '7' + value;
  }

  value = value.substring(0, 11);

  let formatted = '+7';
  let rest = value.slice(1); // убираем первую "7"

  if (rest.length > 0) formatted += ` (${rest.slice(0, 3)}`;
  if (rest.length >= 4) formatted += `) ${rest.slice(3, 6)}`;
  if (rest.length >= 7) formatted += `-${rest.slice(6, 8)}`;
  if (rest.length >= 9) formatted += `-${rest.slice(8, 10)}`;

  input.value = formatted;
};

document.getElementById('card-input').addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '').substring(0, 16);
  e.target.value = value.replace(/(.{4})/g, '$1 ').trim();
});

const isValid = (form, input) => {
  let isInputValid = input.validity.valid;

  if (input.tagName === 'SELECT' && input.value === SELECT_DEFAULT_VALUE) {
    isInputValid = false;
  }

  if (input.id === 'card-input') {
    isInputValid = isCardNumberValid(input.value);
  }

  if (input.id === 'phone-input') {
    isInputValid = isPhoneValid(input.value);
  }

  if (!isInputValid) {
    showError(form, input, input.dataset.errorMessage || input.validationMessage);
  } else {
    hideError(form, input);
  }
};

const toggleButtonState = (form, inputs, button) => {
  const hasInvalid = inputs.some((input) => {
    if (input.tagName === 'SELECT' && input.value === SELECT_DEFAULT_VALUE) {
      return true;
    }
    if (input.id === 'card-input' && !isCardNumberValid(input.value)) {
      return true;
    }
    if (input.id === 'phone-input' && !isPhoneValid(input.value)) {
      return true;
    }
    return !input.validity.valid;
  });

  if (hasInvalid) {
    button.setAttribute('disabled', true);
    button.classList.add('btn__submit_disabled');
  } else {
    button.removeAttribute('disabled');
    button.classList.remove('btn__submit_disabled');
  }
};

const setEventListeners = (form) => {
  const inputs = Array.from(form.querySelectorAll('.form_input, select'));
  const button = form.querySelector('#submit-btn');

  inputs.forEach((input) => {
    if (input.id === 'name-input') {
      input.addEventListener('input', () => {
        input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
        isValid(form, input);
        toggleButtonState(form, inputs, button);
      });
    } else if (input.id === 'phone-input') {
      input.addEventListener('input', () => {
        formatPhoneNumber(input);
        isValid(form, input);
        toggleButtonState(form, inputs, button);
      });
    } else {
      input.addEventListener('input', () => {
        isValid(form, input);
        toggleButtonState(form, inputs, button);
      });
    }

    if (input.tagName === 'SELECT') {
      input.addEventListener('change', () => {
        isValid(form, input);
        toggleButtonState(form, inputs, button);
      });
    }
  });
};

const enableValidation = () => {
  const forms = document.querySelectorAll('form');
  forms.forEach(setEventListeners);
};

enableValidation();
