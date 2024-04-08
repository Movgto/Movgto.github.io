const worksCtr = document.getElementById('works-ctnr');
let popupAlive = false;
const htmlElement = document.querySelector('html');

const projectsData = {
  projects: [
    {
      name: 'Products Manager App',
      tech: ['React', 'Tailwindcss', 'Express', 'Sequelize', 'TypeScript', 'React Router DOM'],
      desc: 'A simple to do list application using webpack to make the code easier to handle as it is splitted in different modules, and it also makes the debugging process lighter, as it allows you to reuse parts parts of your code as modules, which means there\'s less code to check.',
      img: './images/todolist.png',
      src: 'https://github.com/Movgto/ToDoList',
      live: 'https://movgto.github.io/ToDoList/dist/'
    },
    {
      name: 'Anime information application made with React-Redux',
      tech: ['React', 'Redux', 'React-Router', 'JavaScript'],
      desc: 'This project is an application for viewing anime shows information built with ReactJS framework. It applies Components and Hooks along with GitFlow workflow. State management is implemented using Redux & Redux Toolkit. External data fetching is done with an asynchronous Thunk & Axios. Navigation is implemented using React-Router',
      img: './images/animepedia.png',
      src: 'https://github.com/Movgto/react-capstone',
      live: 'https://the-animepedia.onrender.com/'
    },
    {
      name: 'Handling data dinamically with JavaScript',
      tech: ['HTML', 'CSS', 'JavaScript'],
      desc: 'First capstone project I made in Microverse (a remote web development school), it\'s a website to show information about a music festival. The main goal with this project was handling data dynamically to add elements to the website with JavaScript.',
      img: './images/capstone1.png',
      src: 'https://github.com/Movgto/capstone_1_project',
      live: 'https://movgto.github.io/capstone_1_project'
    }
  ]
};

function projectPopUp(projectIndex) {
  htmlElement.style.overflowY = 'hidden';
  popupAlive = true;
  const popUpCtr = document.createElement('div');
  const curtainPopUp = document.createElement('div');
  curtainPopUp.setAttribute('id', 'curtain');
  popUpCtr.setAttribute('id', 'popup-ctr');
  popUpCtr.innerHTML = `<div id='popup-img-ctr'>
                            <img id='popup-img' src=${projectsData.projects[projectIndex].img} alt='Project image' />
                            <img id='close-popup-btn' src='./icons/popup-cancel.svg' alt='Close popup button' />
                        </div>
                        <div id='popup-name-ctr'>
                            <h2 id='work-name'>${projectsData.projects[projectIndex].name}</h2>
                        </div>
                        <ul class='tech' id='skill-popup-ctr'></ul>
                        <p id='work-desc'>${projectsData.projects[projectIndex].desc}</p>
                        <div id='btn-popup-ctr'>
                            <a class='see-btn' href=${projectsData.projects[projectIndex].live} target='_blank'>See live <img src='./icons/see-live.svg' /></a>
                            <a class='see-btn' href=${projectsData.projects[projectIndex].src} target='_blank'><span>See source</span><img src='./icons/see-source.svg' /></a>
                        </div>`;

  document.body.appendChild(curtainPopUp);
  curtainPopUp.appendChild(popUpCtr);

  const nameCtr = document.getElementById('popup-name-ctr');
  const btnCtr = document.getElementById('btn-popup-ctr');

  if (window.innerWidth > 765) {
    nameCtr.appendChild(btnCtr);
    btnCtr.classList.add('desktop');
    const popupImg = document.getElementById('close-popup-btn');
    popupImg.setAttribute('src', './icons/cancel-desktop.svg');
  }

  const skillCtr = document.getElementById('skill-popup-ctr');

  const closeBtn = document.getElementById('close-popup-btn');

  let fadeTimeout = null;

  closeBtn.addEventListener('click', () => {
    clearTimeout(fadeTimeout);
    curtainPopUp.classList.add('fade');
    fadeTimeout = setTimeout(() => {
      curtainPopUp.remove();
      htmlElement.style.overflowY = 'auto';
      popupAlive = false;
    }, 200);
  });

  projectsData.projects[projectIndex].tech.forEach((item) => {
    const skillCard = document.createElement('li');
    skillCard.setAttribute('class', 'tech-card popup');
    skillCard.innerHTML = `<p>${item}</p>`;
    skillCtr.appendChild(skillCard);
  });
}

projectsData.projects.forEach((item, i) => {
  const workCard = document.createElement('div');
  workCard.className = `work-card ${i}`;
  workCard.innerHTML = `
                        <div class="bottom-area">
                            <img src=${item.img} class="work-img" />
                            <h2 class="top">
                                ${item.name}
                            </h2>
                            <ul class="tech">
                            </ul>
                            <div class="bottom">
                                <button class="see-btn" type="button">
                                    See Project
                                </button>
                            </div>
                        </div>
                        `;
  const tech = workCard.querySelector('.tech');
  const seeBtn = workCard.querySelector('.see-btn');
  projectsData.projects[i].tech.forEach((item) => {
    const techCard = document.createElement('li');
    techCard.className = 'tech-card';
    techCard.innerHTML = `<p>${item}</p>`;
    tech.appendChild(techCard);
  });

  worksCtr.appendChild(workCard);
  seeBtn.addEventListener('click', () => projectPopUp(i));
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 765 && popupAlive) {
    const nameCtr = document.getElementById('popup-name-ctr');
    const buttonCtr = document.getElementById('btn-popup-ctr');
    buttonCtr.classList.add('desktop');
    const popupImg = document.getElementById('close-popup-btn');
    popupImg.setAttribute('src', './icons/cancel-desktop.svg');
    nameCtr.appendChild(buttonCtr);
  } else {
    const popupCtr = document.getElementById('popup-ctr');
    const buttonCtr = document.getElementById('btn-popup-ctr');
    buttonCtr.classList.remove('desktop');
    const popupImg = document.getElementById('close-popup-btn');
    popupImg.setAttribute('src', './icons/cancel.svg');
    popupCtr.appendChild(buttonCtr);
  }
});