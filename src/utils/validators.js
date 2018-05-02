export const required = value => (value ? undefined : 'Required');

export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';

export const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength120 = minLength(120)


let futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 1);
// console.log('tomorrow:', futureDate);
export const checkDate = value =>
    value >= futureDate ? `You can't report an incident in the future!` : undefined;

