/**
 * This function validates the required inputs exists in the request
 * @param {Request} req
 * @param {array} required
 */
export const validateRequired = (req, required) => {
  required.forEach((element) => {
    const names = element.name.split(".");
    const name = [req.body, ...names].reduce((prev, val) => prev[val]);
    if (!name) {
      throw new Error(`All fields are required. ${element.text} not set`);
    }
  });
};

export const validatePhoneNumber = (phone) => {
  if (typeof phone !== "string") {
    phone = JSON.stringify(phone);
  }

  const phoneLength = phone.length;

  if (phoneLength >= 10 && phoneLength <= 15) {
    return true;
  }

  return false;
};
