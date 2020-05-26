let userFilter = null;
let userFilterTitle = null;
let userFilterList = null;

let userStatus = null;
let userStatusTitle = null;
let userStatusList = null;

let inputFind = null;
let allUsers = [];

window.addEventListener('load', () => {
  userFilter = document.querySelector('#userFilter');
  userFilterTitle = document.querySelector('#userFilterTitle');
  userFilterList = document.querySelector('#userFilterList');

  userStatus = document.querySelector('#userStatus');
  userStatusTitle = document.querySelector('#userStatusTitle');
  userStatusList = document.querySelector('#userStatusList');

  inputFind = document.querySelector('#find');

  userFilter.classList.add('div-hidden');
  userStatus.classList.add('div-hidden');

  inputFind.addEventListener('keyup', findUser);

  fetchUsers();
});

async function fetchUsers() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await res.json();

  allUsers = json.results.map((user) => {
    const { name, picture, dob, gender } = user;

    return {
      name: `${name.first} ${name.last}`,
      picture: picture,
      age: dob.age,
      gender: gender,
    };
  });
}

function findUser(event) {
  if (!!event.target.value && event.target.value.trim() !== '') {
    renderUsers(event.target.value);
  } else {
    userFilterTitle.textContent = 'Nenhum usuário filtrado';
    userStatusTitle.textContent = 'Nada a ser exibido';
    userFilter.classList.add('div-hidden');
    userStatus.classList.add('div-hidden');
  }
}

function renderUsers(nameFind) {
  let words = nameFind;
  let Words = 0;
  if (words.split((seaprator = '')).length !== 0) {
    Words = words[0].toUpperCase();
  } else {
    Words = words;
  }
  Words = Words + words.slice(1);
  let newUsers = allUsers.filter((user) => {
    if (
      user.name.includes(words) === true ||
      user.name.includes(Words) === true
    ) {
      return true;
    }
    return false;
  });

  let userHTML = '<div>';
  let sumMen = 0;
  let sumWoman = 0;
  let sumAges = 0;
  let mediaAges = 0;

  newUsers.forEach((user) => {
    const divHTML = `
      <div class="user-list">
        <div>
          <img src="${user.picture.thumbnail}" alt="${user.name}">
        </div>
        <div>
          ${user.name}, ${user.age} ages
        </div>        
      </div>
    `;
    userHTML += divHTML;

    user.gender === 'female' ? sumWoman++ : sumMen++;
    sumAges += user.age;
  });

  userHTML += '</div>';

  mediaAges = sumAges / (sumMen + sumWoman);
  userStatusList.innerHTML = `
    <div>
      Sexo Masculino: <b>${sumMen}</b></br>
      Sexo Feminino: <b>${sumWoman}</b></br>
      Soma das idades: <b>${sumAges}</b></br>
      Média das idades: <b>${mediaAges.toFixed(2)}</b>
    </div>
  `;

  userFilter.classList.remove('div-hidden');
  userStatus.classList.remove('div-hidden');
  userFilterTitle.textContent = `${newUsers.length} usuário(s) encontrado(s)`;
  userStatusTitle.textContent = 'Estatísticas';

  userFilterList.innerHTML = userHTML;
}
