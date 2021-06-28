import usersArr from './users.js';

const refs = {
  tbody: document.querySelector('.tbody'),
  modal: document.querySelector('.modal'),
  jsBackdrop: document.querySelector('.js-backdrop'),
};

usersArr.forEach(
  ({ name, username, email, website, address, company, phone }) => {
    const templateUsersTable = `
  <tr>
  <td data-action="open-modal" class="username">${name}</td>
  <td>${username}</td>
  <td>${email}</td>
  <td>${website}</td>
  </tr>`;
    refs.tbody.insertAdjacentHTML('afterbegin', templateUsersTable);

    const openModalByName = document.querySelector(
      '[data-action="open-modal"]',
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
      document.body.classList.add('show-modal');
      refs.modal.innerHTML = templateUserDetails;
    }

    openModalByName.addEventListener('click', onOpenModal);
  },
);

function onCloseModal() {
  document.body.classList.remove('show-modal');
}

function onBackDropClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}

refs.jsBackdrop.addEventListener('click', onBackDropClick);
