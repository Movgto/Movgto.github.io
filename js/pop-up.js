const project = {
  name: 'Keeping track of hundreds of components',
  tech: ['Ruby on Rails', 'CSS', 'JavaScript'],
  desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it 1960s. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it 1960s."
};

let popupAlive = false;

function projectPopUp() {
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
                            <h2 id='work-name'>${project.name}</h2>
                        </div>
                        <ul class='tech' id='skill-popup-ctr'></ul>
                        <p id='work-desc'>${project.desc}</p>
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
  }

  const skillCtr = document.getElementById('skill-popup-ctr');

  const closeBtn = document.getElementById('close-popup-btn');

  let fadeTimeout = null;

  closeBtn.addEventListener('click', () => {
    clearTimeout(fadeTimeout);
    curtainPopUp.classList.add('fade');
    fadeTimeout = setTimeout(() => {
      curtainPopUp.remove();
      popupAlive = false;
    }, 200);
  });

  project.tech.forEach((item) => {
    const skillCard = document.createElement('li');
    skillCard.setAttribute('class', 'tech-card popup');
    skillCard.innerHTML = `<p>${item}</p>`;
    skillCtr.appendChild(skillCard);
  });
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 765 && popupAlive) {
    const nameCtr = document.getElementById('popup-name-ctr');
    const buttonCtr = document.getElementById('btn-popup-ctr');
    buttonCtr.classList.add('desktop');

    nameCtr.appendChild(buttonCtr);
  } else {
    const popupCtr = document.getElementById('popup-ctr');
    const buttonCtr = document.getElementById('btn-popup-ctr');
    buttonCtr.classList.remove('desktop');

    popupCtr.appendChild(buttonCtr);
  }
});

const seeBtns = document.querySelectorAll('.work-card button');

seeBtns.forEach((items) => {
  items.addEventListener('click', projectPopUp);
});