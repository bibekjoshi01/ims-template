export const splitName = (name: string) => {
  const nameParts = name.split(' ');

  if (nameParts.length < 2) {
    throw new Error('Name must contain at least a firstName and a lastName.');
  }

  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];
  const middleName = nameParts.length > 2 ? nameParts.slice(1, -1).join(' ') : '';

  return { firstName, middleName, lastName };
};

export const combineName = (firstName: string, middleName: string, lastName: string) => {
  return `${firstName} ${middleName ?? ''} ${lastName}`.trim();
};
