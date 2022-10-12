const URL_API='https://m2-sprint1back-production.up.railway.app/';

class UI {
    constructor(targetID) {
        this.target = document.getElementById(targetID);
    }

    getValue() {
        return this.target.value;
    }
}

const singUpName = new UI('singUpName');
const singUpPhone = new UI('singUpPhone');
const singUpPassword = new UI('singUpPassword');
const singUpPhoto = new UI('singUpPhoto');
const singUpPhrase = new UI('singUpPhrase');

const form = document.getElementById('singUpForm');

const handleSubmit = async (e) => {
    e.preventDefault();
    //new object from values
    const newUser = {
        name: singUpName.getValue(),
        phone: singUpPhone.getValue(),
        password: singUpPassword.getValue(),
        photo: singUpPhoto.getValue(),
        phrase: singUpPhrase.getValue(),
    }
    //validations
    for (const key in newUser) {
        const element = newUser[key];
        if (element === '') {
            alert(`Falta llenar el campo ${key}`)
            return;
        }
    }
    //send to back
    try {
        let response = await axios.post(`${URL_API}user`, newUser);
        if (response.status === 201) {
            Swal.fire(
                'Excelente!',
                'Usuario creado con éxito!',
                'success'
            )
            location.href = 'http://127.0.0.1:5500/index.html'
        }
    } catch (error) {
        Swal.fire(
            'Oops!',
            'Se ha presentado un error!',
            'error'
        )
    }
}

form.addEventListener('submit', (e) => { handleSubmit(e) })