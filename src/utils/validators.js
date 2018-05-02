export const required = value => (value ? undefined : 'Required');

export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';

export const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength120 = minLength(120)

let futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 1);
export const notTomorrow = date => date >= futureDate ? undefined : `You can't report an incident in the future!`;

// export const numbersOnly = value =>
//     /.*?(\d)[^\d]*/g.test(value) ? undefined : 'Must be a number';

