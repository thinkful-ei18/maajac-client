export const required = value => (value ? undefined : 'Required');

export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';

export const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength120 = minLength(120)

const tomorrowString = () => {
    let today = new Date();
    let dd = today.getDate() + 1;
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    return `${yyyy}-${mm}-${dd}`;
};

export const checkDate = value =>
    value >= tomorrowString() ? `You can't report an incident in the future!` : undefined;

export const isTrimmed = value => value.trim() === value ? undefined : 'Cannot start or end with whitespace';

export const length = length => value => {
        if (length.min && value.length < length.min) {
            return `Must be at least ${length.min} characters long`;
        }
        if (length.max && value.length > length.max) {
            return `Must be at most ${length.max} characters long`;
        }
    };

export const matches = field => (value, allValues) =>
        field in allValues && value.trim() === allValues[field].trim()
            ? undefined
            : 'Does not match';