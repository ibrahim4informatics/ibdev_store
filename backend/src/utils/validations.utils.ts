const isEmail = (email: string): boolean => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
const isStrongPassword = (password: string): boolean => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
const isPhoneNumber = (number: string): boolean => /(07|06|05)\d{8}/.test(number);

export { isEmail, isStrongPassword, isPhoneNumber }