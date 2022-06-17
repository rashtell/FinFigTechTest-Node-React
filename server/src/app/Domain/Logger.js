const fs = require("fs");

export const LogError = (error) => {
  console.log({ error });
  error = `\n${new Date().toDateString()} - ${new Date().toLocaleTimeString()} :=> ${error}`;

  const dir = "src/logs";

  fs.appendFile(dir + "/node.error.log", error, function (err) {
    console.log("Log error: ", err);
  });
};

export const LogAccountError = (error) => {
  console.log({ error });
  error = `\n${new Date().toDateString()} - ${new Date().toLocaleTimeString()} :=> ${error}`;

  const dir = "src/logs";

  fs.appendFile(dir + "/node.accoount.error.log", error, function (err) {
    console.log("Log error: ", err);
  });
};

export const LogAccess = (access) => {
  access = fs.createWriteStream(dir + "/node.access.log", { flags: "a" });

  // redirect stdout / stderr
  // proc.stdout.pipe(access);
  // proc.stderr.pipe(error);
};
