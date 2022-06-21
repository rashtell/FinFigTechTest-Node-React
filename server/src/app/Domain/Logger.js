const fs = require("fs");

/**
 * This function logs error to erro file
 * @param {string} error
 */
export const LogError = (error) => {
  error = `\n${new Date().toDateString()} - ${new Date().toLocaleTimeString()} :=> ${error}`;

  const dir = "src/logs";

  fs.appendFile(dir + "/node.error.log", error, function (err) {
    if (err) {
    }
  });
};

export const LogAccountError = (error) => {
  error = `\n${new Date().toDateString()} - ${new Date().toLocaleTimeString()} :=> ${error}`;

  const dir = "src/logs";

  fs.appendFile(dir + "/node.accoount.error.log", error, function (err) {
  });
};

export const LogAccess = (access) => {
  access = fs.createWriteStream(dir + "/node.access.log", { flags: "a" });

  // redirect stdout / stderr
  // proc.stdout.pipe(access);
  // proc.stderr.pipe(error);
};
