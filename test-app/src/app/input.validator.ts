export const patterns = {
    pass_regex: /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,}$/,
    email_regex: /^[\w-\.]+@(docquity)\.+(com)$/,
    phone_regex: /^[1-9]{1}[0-9]{9}$/,
}