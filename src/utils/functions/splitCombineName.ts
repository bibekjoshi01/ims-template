export const splitName = (name: string) => {
  const nameParts = name.split(' ');

  if (nameParts.length < 2) {
    // mimic the error as of the backend for zod validation consistency
    throw {
      status: 400,
      data: {
        firstName: 'Name must contain first and last name' //  we are mapping the error to firstName
      }
    };
  }

  const firstName = nameParts[0];
  const lastName = nameParts[nameParts.length - 1];
  const middleName = nameParts.length > 2 ? nameParts.slice(1, -1).join(' ') : '';

  return { firstName, middleName, lastName };
};

export const combineName = (firstName: string, middleName: string, lastName: string) => {
  return `${firstName} ${middleName ?? ''} ${lastName}`.trim();
};
