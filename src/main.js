import usersArr from './users.js';

const refs = {
  tbody: document.querySelector('.tbody'),
  modal: document.querySelector('.modal'),
  jsBackdrop: document.querySelector('.jsBackdrop'),
  form: document.querySelector('.addUserForm'),
};

if (!localStorage.userList) {
  localStorage.setItem('userList', JSON.stringify(usersArr));
}

let currentUserList = JSON.parse(localStorage.getItem('userList'));

function render(userList) {
  userList.forEach(
    ({ id, name, username, email, website, address, company, phone }) => {
      const templateUsersTable = `
      <tr>
      <td data-action="openModal" class="username">${name}</td>
      <td>${username}</td>
      <td>${email}</td>
      <td>${website}</td>
      <td><button class="jsDeleteBtn button" id=${id} type="button">delete</button></td>
      </tr>`;

      refs.tbody.insertAdjacentHTML('afterbegin', templateUsersTable);

      const openModalByName = document.querySelector(
        '[data-action="openModal"]',
      );

      const deleteBtnRef = document.querySelector('.jsDeleteBtn');

      const handlerDeleteBtn = () => {
        const newUserList = userList.filter(user => user.id !== id);

        currentUserList = newUserList;

        localStorage.setItem('userList', JSON.stringify(newUserList));

        refs.tbody.textContent = '';
        render(newUserList);
      };

      deleteBtnRef.addEventListener('click', handlerDeleteBtn);

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

render(currentUserList);

function onCloseModal() {
  document.body.classList.remove('showModal');
}

function onBackDropClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}

function addUser(newUser) {
  const newList = currentUserList;
  newList.push(newUser);

  localStorage.setItem('userList', JSON.stringify(newList));

  refs.tbody.textContent = '';
  render(newList);
}

refs.jsBackdrop.addEventListener('click', onBackDropClick);

const handlerForm = event => {
  event.preventDefault();

  const getId = () => Date.now();
  const formElements = event.target.elements;

  const newUser = {
    id: getId(),
    name: formElements.name.value,
    username: formElements.username.value,
    email: formElements.email.value,
    address: {
      street: '#',
      suite: '#',
      city: '#',
      zipcode: '#',
      geo: {
        lat: '#',
        lng: '#',
      },
    },
    phone: '#',
    website: formElements.website.value,
    company: {
      name: '#',
      catchPhrase: '#',
      bs: '#',
    },
  };

  refs.form.reset();
  addUser(newUser);
};

refs.form.addEventListener('submit', handlerForm);
