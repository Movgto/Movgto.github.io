const worksCtr = document.getElementById('works-ctnr');

const projectsData = {
  projects: [{
    name: 'Keeping track of hundreds of components',
    tech: ['Ruby on Rails', 'CSS', 'JavaScript'],
    desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when 
            an unknown printer took a galley of type and scrambled it 1960s. Lorem Ipsum is simply dummy text of the 
            printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it 1960s.`
  },
  {
    name: 'Keeping track of hundreds of components',
    tech: ['Ruby on Rails', 'CSS', 'JavaScript'],
    desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when 
            an unknown printer took a galley of type and scrambled it 1960s. Lorem Ipsum is simply dummy text of the 
            printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it 1960s.`
  },
  {
    name: 'Keeping track of hundreds of components',
    tech: ['Ruby on Rails', 'CSS', 'JavaScript'],
    desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when 
            an unknown printer took a galley of type and scrambled it 1960s. Lorem Ipsum is simply dummy text of the 
            printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it 1960s.`
  },
  {
    name: 'Keeping track of hundreds of components',
    tech: ['Ruby on Rails', 'CSS', 'JavaScript'],
    desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when 
            an unknown printer took a galley of type and scrambled it 1960s. Lorem Ipsum is simply dummy text of the 
            printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it 1960s.`
  },
  {
    name: 'Keeping track of hundreds of components',
    tech: ['Ruby on Rails', 'CSS', 'JavaScript'],
    desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when 
            an unknown printer took a galley of type and scrambled it 1960s. Lorem Ipsum is simply dummy text of the 
            printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it 1960s.`
  },
  {
    name: 'Keeping track of hundreds of components',
    tech: ['Ruby on Rails', 'CSS', 'JavaScript'],
    desc: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when 
            an unknown printer took a galley of type and scrambled it 1960s. Lorem Ipsum is simply dummy text of the 
            printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it 1960s.`
  }]
};

function projectPopUp(projectIndex) {
  htmlElement.style.overflowY = 'hidden';
  popupAlive = true;
  const popUpCtr = document.createElement('div');
  const curtainPopUp = document.createElement('div');
  curtainPopUp.setAttribute('id', 'curtain');
  popUpCtr.setAttribute('id', 'popup-ctr');
  popUpCtr.innerHTML = `<div id='popup-img-ctr'>
                            <img id='popup-img' src='./icons/work-image.png' alt='Project image' />
                            <img id='close-popup-btn' src='./icons/popup-cancel.svg' alt='Close popup button' />
                        </div>
                        <div id='popup-name-ctr'>
                            <h2 id='work-name'>${projectsData.projects[projectIndex].name}</h2>
                        </div>
                        <ul class='tech' id='skill-popup-ctr'></ul>
                        <p id='work-desc'>${projectsData.projects[projectIndex].desc}</p>
                        <div id='btn-popup-ctr'>
                            <button class='see-btn' type='button'>See live <img src='./icons/see-live.svg' /></button>
                            <button class='see-btn' type='button'>See source <img src='./icons/see-source.svg' /></button>
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
  const tech = workCard.querySelector(`.tech`);
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

let popupAlive = false;
const htmlElement = document.querySelector('html');

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