import usersArr from './users.js';

const refs = {
  tbody: document.querySelector('.tbody'),
  modal: document.querySelector('.modal'),
  jsBackdrop: document.querySelector('.jsBackdrop'),
  form: document.querySelector('.jsAddUserForm'),
};

localStorage.setItem('userList', JSON.stringify(usersArr));

let currentUserList = JSON.parse(localStorage.getItem('userList'));

console.log(currentUserList);

function render() {
  currentUserList.forEach(
    ({ name, username, email, website, address, company, phone }) => {
      const templateUsersTable = `
      <tr>
      <td data-action="openModal" class="username">${name}</td>
      <td>${username}</td>
      <td>${email}</td>
      <td>${website}</td>
      </tr>`;

      refs.tbody.insertAdjacentHTML('afterbegin', templateUsersTable);

      const openModalByName = document.querySelector(
        '[data-action="openModal"]',
      );

      const templateUserDetails = `
        <h3>USER DETAILS </h3>
        <p>Name: ${name}</p>
        <p>Phone: ${phone}</p>
        <p>Address: ${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}</p>
        <p>Coordinates: latitude (${address.geo.lat}) ; longitude (${address.geo.lng})</p>
        <p>Сompany: "${company.name}" </br>catchPhrase: "${company.catchPhrase}" </br>bs: "${company.bs}"</p>
        `;

      function onOpenModal() {
        document.body.classList.add('showModal');
        refs.modal.innerHTML = templateUserDetails;
      }

      openModalByName.addEventListener('click', onOpenModal);
    },
  );
}

render();

function onCloseModal() {
  document.body.classList.remove('showModal');
}

function onBackDropClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}

refs.jsBackdrop.addEventListener('click', onBackDropClick);

const handlerForm = event => {
  event.preventDefault();

  const getId = () => currentUserList.length + 1;
  const formElements = event.target.elements;

  const userData = {
    id: getId(),
    name: formElements.name.value,
    username: formElements.username.value,
    email: formElements.email.value,
    website: formElements.website.value,
  };

  currentUserList.push(userData);

  localStorage.setItem('userList', JSON.stringify(currentUserList));

  refs.form.reset();

  console.log(currentUserList);
};

refs.form.addEventListener('submit', handlerForm);
