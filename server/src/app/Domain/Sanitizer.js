export const removeUnwanted = (payload) => {
  payload.password = undefined;
  payload.publicKey = undefined;
  payload.deleted = undefined;
  payload.digest = undefined;
  payload.__v = undefined;
  payload.extras = undefined;
  payload.otp = undefined;

  return payload;
};
