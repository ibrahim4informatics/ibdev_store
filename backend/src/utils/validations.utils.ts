const isEmail = (email: string): boolean => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
const isStrongPassword = (password: string): boolean => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
const isPhoneNumber = (number: string): boolean => /(07|06|05)\d{8}/.test(number);
const isUUID = (uuid: string): boolean => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid);
const isValidOrderQuery = (query: string): boolean => /^(\w+:(asc|desc))(,\w+:(asc|desc))*$/.test(query);
export { isEmail, isStrongPassword, isPhoneNumber, isUUID, isValidOrderQuery }