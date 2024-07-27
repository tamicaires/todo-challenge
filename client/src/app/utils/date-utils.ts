export const formatDate = (date: Date): string => {
  const today = new Date();
  const givenDate = new Date(date);
  const differenceInTime = givenDate.getTime() - today.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  if (differenceInDays === 0) {
    return 'Hoje';
  } else if (differenceInDays === -1) {
    return 'Ontem';
  } else if (differenceInDays === 1) {
    return 'Amanhã';
  } else {
    return givenDate.toLocaleDateString();
  }
};
