export const required = value => (value ? undefined : 'Required');

export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';

// export const numbersOnly = value =>
//     /.*?(\d)[^\d]*/g.test(value) ? undefined : 'Must be a number';

