const URL_API='https://m2-sprint1back-production.up.railway.app/';

class UI {
    constructor(targetID) {
        this.target = document.getElementById(targetID);
    }

    getValue() {
        return this.target.value;
    }
}

const singInPhone = new UI('singInPhone');
const singInPassword = new UI('singInPassword');

const form = document.getElementById('singInForm');

const handleSubmit = async (e) => {
    e.preventDefault();
    //new object from values
    const user = {
        singInPhone: singInPhone.getValue(),
        singInPassword: singInPassword.getValue(),
    }
    //validations
    for (const key in user) {
        const element = user[key];
        if (element === '') {
            alert(`Falta llenar el campo ${key}`)
            return;
        }
    }
    //send to back
    try {
        let response = await axios.get(`${URL_API}user?phone=${user.singInPhone}&password=${user.singInPassword}`);
        if (response.status === 200) {
            if (response.data.length) {
                //save localStorage session
                Swal.fire(
                    'Bienvenid@',
                    '',
                )
                localStorage.setItem('user', JSON.stringify(response.data[0]))
                
                location.href = 'http://127.0.0.1:5500/pages/home.html'

            }else {
                Swal.fire(
                    'Oops!',
                    'Usuario o contraseña incorrecta!',
                    'error'
                )
            }
        }
    } catch (error) {
        console.log(error);
        Swal.fire(
            'Oops!',
            'Se ha presentado un error!',
            'error'
        )
    }
}

const validationSession = () => {
    const user = localStorage.getItem('user');
    if (user) {
        location.href = 'http://127.0.0.1:5500/pages/home.html'
    }
}

validationSession()

form.addEventListener('submit', (e) => { handleSubmit(e) })

// const URL_USERS='http://localhost:3000/user';  //https://m2-sprint1back-production.up.railway.app/
// const singIn = document.getElementById('singInForm');
// const singInButton = document.getElementById('singInButton');
// const singInPhone = document.getElementById('singInPhone');
// const singInPassword = document.getElementById('singInPassword');

// const number = () =>{
//     n= singInPhone.value 
//     p= singInPassword.value 
//     console.log(n);
//     //const user = users.find(item => item.phone === n)
//     if (users.find(item => item.phone === n && item.password === p)){
//         console.log('correcto');
//     }else{
//         console.log('incorrecto');
//     }      
// }
// singInButton.addEventListener('click', number);


//https://github.com/carlosdiaztl/signupusers
//https://sigdeletras.com/2020/crear-una-fake-reat-api-con-json-server-copy/