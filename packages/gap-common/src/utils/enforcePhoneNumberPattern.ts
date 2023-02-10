/**
 * Convert string to match E.164 phone number pattern (e.g. +1234567890),
 * otherwise return empty string.
 */
export const enforcePhoneNumberPattern = (phoneNumber: string) => {
  let newPhoneNumber = phoneNumber?.match(/[0-9]{0,14}/g);

  if (newPhoneNumber === null) {
    return '';
  }

  // Join parts returned from RegEx match
  newPhoneNumber = newPhoneNumber?.join('');

  // Start number with "+"
  newPhoneNumber = newPhoneNumber && `+${newPhoneNumber}`;

  return newPhoneNumber;
};
