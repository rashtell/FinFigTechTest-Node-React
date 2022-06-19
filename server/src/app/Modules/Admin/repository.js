import { verifyHash } from "../../Domain/Encryption";
import AdminModel from "./model";

//defualt selectF
const selectAll = "_id adminID username name email createdAt updatedAt";

//#region
export async function mAuthenticate({ username, publicKey }) {
  //validate token details against profile details
  return AdminModel.exists({
    publicKey,
    username,
    deleted: false,
  });
}
//#endregion

//#region
export async function mCreateAdmin(payload) {
  return AdminModel.create(payload);
}

export async function mLoginAdmin(username, password, publicKey) {
  const admin = await AdminModel.findOneAndUpdate(
    { username, deleted: false },
    { publicKey }
  )
    .select(selectAll + " password")
    .exec();

  //if admin does not exist
  if (!admin || !admin.password) {
    throw new Error("Invalid login credentials");
  }

  //Verify if password match
  const isPasswordVerified = await verifyHash(admin.password, password);

  if (!isPasswordVerified) {
    throw new Error("Invalid login credentials");
  }

  return admin;
}
//#endregion

//#region
export async function mGetAdminById(_id) {
  return AdminModel.findOne({ _id, deleted: false }).select(selectAll).exec();
}

export async function mLogoutAdminById(_id) {
  //Invalidate public key
  return AdminModel.updateOne({ _id, deleted: false }, { publicKey: null });
}
//#endregion
