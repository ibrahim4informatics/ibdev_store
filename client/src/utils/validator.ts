export default class Validator {
    private emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    private passwordPattern: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    private phonePattern: RegExp = /(07|06|05)\d{8}/;

    validateEmail(email: string): boolean {
        return this.emailPattern.test(email);
    }

    validatePasswrod(password: string): boolean {
        return this.passwordPattern.test(password);
    }

    validatePhoneNumber(phone: string): boolean {
        return this.phonePattern.test(phone);
    }
}