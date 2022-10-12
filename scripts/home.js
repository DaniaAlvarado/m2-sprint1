const URL_API = 'https://m2-sprint1back-production.up.railway.app/';

const userRaw = localStorage.getItem('user');
const profile = document.getElementById('profile');
const printChats = document.querySelector('.chats__contacts');
const form = document.querySelector('.form__input');
const inputChat = document.getElementById('inputChat');
const sendMessage = document.querySelector('.send__chat');
const editProfile = document.getElementById('profile__edit');
const userSesion = document.getElementById('userSesion');

let user;

const validationSession = () => {
    if (!userRaw) {
        location.href = 'http://127.0.0.1:5500/index.html'
    } else {
        user = JSON.parse(userRaw)
    }
}
validationSession();

const printProfile = () => {
    profile.innerHTML += `
    <figure>
      <img src="${user.photo}" alt="photo" id="userSesion">
    </figure>
   `
};
printProfile();


const getApi = async () => {
    let { data } = await axios.get(`${URL_API}user`);
    console.log(data);
    return data;
};
getApi();

const renderChat = async () => {
    let { data } = await axios.get(`${URL_API}user`);
    printChats.innerHTML = "";
    console.log(data)
    data.forEach(element => {
        printChats.innerHTML += `
            <nav class="chats__img">
                <nav>
                    <figure>
                        <img src="${element.photo}" class="img-contact" name="${element.id}" alt="photo">
                    </figure>
                    <div>
                        <span>${element.name}</span>
                        <span> viernes</span>
                    </div>
                </nav>
                <div class="ms">
                    <img src="../icon/check.svg">
                    <img src="../icon/check.svg">
                    <p>Amet minim mollit non deserunt ullamco est sit alliqua...</p>
                </div>
            </nav> 
          `;
    });
};
renderChat();


document.addEventListener("click", async ({ target }) => {
    if (target.classList.contains("img-contact")) {
        const { data } = await axios.get(`${URL_API}user`);
        const contact = data.find((item) => item.id == target.getAttribute("name"));
        const elementExist = data.some((item) => item.id === contact.id);
        console.log(elementExist);
        if (elementExist === true) {
            //renderMessage();
            renderM();
        }
    } else {
        console.log('error')
    }
});


class UI {
    constructor(idTarget, nameEvent = 'click', event = () => { }) {
        this.target = document.getElementById(idTarget);
        this.nameEvent = nameEvent,
            this.event = event;
    }

    listenEvent() {
        this.target.addEventListener(this.nameEvent, this.event)
    }
}

// edit profile
const handleEdit = () => {
    console.log(lateral);
    if (lateral.target.classList.contains('edit-hidden')) {
        lateral.target.classList.remove('edit-hidden');
    } else {
        lateral.target.classList.add('edit-hidden');
    }
}

const buttonEdit = new UI('profile', 'click', handleEdit);
const arrow = new UI('arrow', 'click', handleEdit);
const lateral = new UI('profile__edit');

buttonEdit.listenEvent();

const textUserName = document.querySelector('.yourName');

textUserName.innerHTML += `<span class="yourName">${user.name}</span>`


const renderM = async () => {
    let { data } = await axios.get(`${URL_API}messages`);
    data.forEach(element => {
        const user1 = data.find((element) => element.idUser1);
        console.log(user1)
        const { conversation } = element;
        conversation.forEach(item => {
            console.log(item.sendBy);
            sendMessage.innerHTML = "";
            for (let i = 0; i < conversation.length; i++) {
                if(user1 === item.sendBy){
                    sendMessage.innerHTML += `     
                    <div id="send__right">
                        <p>${conversation[i].message}</p>
                        <span>${conversation[i].date}</span>
                    </div>`
                }else{
                    sendMessage.innerHTML += `
                    <div id="send__left">
                        <p>${conversation[i].message}</p>
                        <span>${conversation[i].date}</span>
                    </div> 
                `;
                }               
            }
        })
    })
};

const handleCloseSession = () => {
    localStorage.clear();
    location.href = 'http://127.0.0.1:5500/index.html';
}

const btnCloseSession = document.getElementById('btnCloseSession');

btnCloseSession.addEventListener('click', handleCloseSession);


let DateTime = luxon.DateTime;
const dt = DateTime.now();

const hour = DateTime.fromISO(dt).toFormat('h:mm a') //hora y minutos
console.log(hour);

const day = DateTime.fromISO(dt).toFormat('cccc'); //dia
console.log(day)


form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(inputChat.value)
    // let newMessage = document.createElement('span')
    // newMessage.innerHTML = inputChat.value;
    // sendRight.appendChild(newMessage)
    inputChat.value = '';
})


// const renderMessage = async () => {
//     let { data } = await axios.get(`${URL_API}messages`);
//     data.forEach(element => {
//         console.log(data);
//         const { conversation } = element;
//         conversation.forEach(item => {
//             console.log(item);
//             sendMessage.innerHTML = "";
//             for (let i = 0; i < conversation.length; i++) {
//                 //console.log(conversation[i].message);
//                 //console.log(conversation[i].sendBy); 
//                 sendMessage.innerHTML += `     
//                 <div id="send__right">
//                     <p>${conversation[i].message}</p>
//                     <span>${conversation[i].date}</span>
//                 </div>`
//             }
//         })

//     })
// };