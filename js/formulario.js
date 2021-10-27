class Validator {

    constructor() {
        this.validations = [
            'data-required',
            'data-min-length',
            'data-max-length',
            'data-email-validate',
            'data-only-letters',
            'data-equal',
            'data-password-validate',
        ]
    }

    //iniciar a validação de todos os campos
    validate(form) {
        // resgata todas as validações
        let currentValidations = document.querySelectorAll('form .error-validation');

        if (currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }

        //pegar os inputs
        let inputs = form.getElementsByTagName('input');

        //transforma uma HTMLCollections -> array
        let inputsArray = [...inputs];

        // loop nos inputs e validação mediatnte ao que for ncontrado

        inputsArray.forEach(function (input) {

            // loop em todas as validações existentes
            for (let i = 0; this.validations.length > i; i++) {
                // verifica se a validação atual existe no input
                if (input.getAttribute(this.validations[i]) != null) {

                    // limpando a string para viarar um metodo
                    let method = this.validations[i].replace('data-', '').replace('-', '');

                    let value = input.getAttribute(this.validations[i]);

                    this[method](input, value);
                }
            }

        }, this);
    }
    // Verifica se um input tem um numero minimo de caracters
    minlength(input, minValue) {

        let inputLength = input.value.length;
        let errorMessage = 'Mínimo de caracteres inválido';
        if (inputLength < minValue) {
            this.printMessage(input, errorMessage);

        }
    }

    maxlength(input, maxValue) {

        let inputLength = input.value.length;
        let errorMessage = 'Excede o total de caracters permitido';
        if (inputLength > maxValue) {
            this.printMessage(input, errorMessage);

        }
    }
    //vaida emails

    emailvalidate(input){
      
        //email@email@.com -> email@email.com.br
        let re= /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = 'Insira um email no padrão example@email.com';

        if(!re.test(email)){
            this.printMessage(input, errorMessage);
        }

    }

    // valida se o campo tem apena letras
    onlyletters(input){
       
        let re = /^[A-Za-z " "]+$/;
        
        let inputValue = input.value;

        let errorMessage = 'Este campo não aceita números nem caracters especiais';

        if(!re.test(inputValue)){
            this.printMessage(input, errorMessage);
        }
    }

    //verifica se o input é requerido
    required(input) {

        let inputValue = input.value;

        if (inputValue === '') {
            let errorMessage = 'Este campo é obrigatório ';

            this.printMessage(input, errorMessage);
        }
    }

    // verifica se dois campos são iguais
    equal(input, inputName){
        
        let inputToCompare = document.getElementsByName(inputName)[0];

        let errorMessage = 'As senhas não correspondem.';
        
        if(input.value != inputToCompare.value){
            this.printMessage(input, errorMessage);
        }
    }

    // valida password
    passwordvalidate(input) {

        let charArr = input.value.split("");

        let uppercases =0;
        let numbers=0;

        for(let i=0; charArr.length > i; i++){
            if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))){
                uppercases++;
            }else if(!isNaN(parseInt(charArr[i]))){
                numbers++;

            } 
        }

        if(uppercases ===0 || numbers === 0) {
                let errorMessage = 'A senha precisa de um caracter maiúsculo e um número';

                this.printMessage(input, errorMessage);
            }

    }
    
    //método para imprimir messagens de erro na tela
    printMessage(input, msg) {

        //quantidade de errorMessage
        let errorsQty = input.parentNode.querySelector('.error-validation');

        if (errorsQty === null) {

            let template = document.querySelector('.error-validation').cloneNode(true);

            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classList.remove('template');

            inputParent.appendChild(template);
        }
        
    }

    // limpa as validações da tela
    cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }

}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

submit.addEventListener('click', function (e) {

    e.preventDefault();

    validator.validate(form);
});