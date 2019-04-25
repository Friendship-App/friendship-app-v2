export const getFormattedAge = birthyear => {
  const parsedBirthYear = parseInt(birthyear);
  const now = new Date();
  let age = now.getFullYear() - parsedBirthYear;

  const early = [0, 1, 2, 3];
  const mid = [4, 5, 6];
  const late = [7, 8, 9];
  let ageName = '';
  const lastDigit = age.toString().substr(age.toString().length - 1);
  if (age < 20) {
    ageName = age + ' years old';
  } else if (early.indexOf(parseInt(lastDigit)) > -1) {
    ageName = 'early ' + (age - parseInt(lastDigit)) + "'s";
  } else if (mid.indexOf(parseInt(lastDigit)) > -1) {
    ageName = 'mid ' + (age - parseInt(lastDigit)) + "'s";
  } else if (late.indexOf(parseInt(lastDigit)) > -1) {
    ageName = 'late ' + (age - parseInt(lastDigit)) + "'s";
  } else {
    ageName = 'Age is a mystery';
  }
  return `${ageName}, `;
};
