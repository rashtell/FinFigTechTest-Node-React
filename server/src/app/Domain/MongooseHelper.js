//Mongoose error handler
export const errorDuplicate = (error, doc, next) => {
  if (error.name === "MongoError" && error.code === 11000) {
    Object.keys(doc._doc).forEach((element) => {
      if (error.keyValue[element] != null) {
        next(new Error(`${element} exists`));
      }
    });
  } else {
    next();
  }
};
