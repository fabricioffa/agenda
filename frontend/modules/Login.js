// import validator from "validator";

// export default class Login {
//     constructor(formClass) {
//         this.form = document.querySelector(formClass);
//     }

//     init() {
//         this.events();
//     }

//     events() {
//         if(!this.form) return;

//         this.form.addEventListener('submit', e => {
//             e.preventDefault();
//             if(this.validate(e)) e.target.submit();
//         })
//     }

//     validate(e) {
//         let valid = true;
//         const el = e.target;
//         const emailInput = el.querySelector('input[name="email"]');
//         const passwordInput = el.querySelector('input[name="password"]');

//         if (!validator.isEmail(emailInput.value)) valid = false;
//         if (passwordInput.value.length < 3 || passwordInput.value.length > 50) valid = false;

//         return valid;
//     }
// }