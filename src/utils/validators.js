export const required = value => (value ? undefined : 'Required');

export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';

export const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength120 = minLength(120)

// export const numbersOnly = value =>
//     /.*?(\d)[^\d]*/g.test(value) ? undefined : 'Must be a number';

