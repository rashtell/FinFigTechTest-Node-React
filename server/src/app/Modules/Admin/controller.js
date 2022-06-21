import { createDigest, createHash } from "../../Domain/Encryption";
import { LogError } from "../../Domain/Logger";
import { createToken, getTokenDetailsFromRequest } from "../../Domain/Token";
import { validateRequired } from "../../Domain/Validation";
import {
  mCreateAdmin,
  mGetAdminById,
  mLoginAdmin,
  mLogoutAdminById
} from "./repository";

//#region No authentication

export async function cLoginAdmin(req, res) {
  try {
    //validates required inputs are set
    const required = [
      { name: "data.username", text: "Username" },
      { name: "data.password", text: "Password" },
    ];
    validateRequired(req, required);

    //get inputted credential
    let { username, password } = req.body.data;

    //create a new pulic key
    const publicKey = createDigest(10);

    let profileDetails = await mLoginAdmin(username, password, publicKey);

    const { _id, adminID, name, email } = profileDetails;

    //create jwt for authentication
    const token = createToken({
      _id,
      adminID,
      publicKey,
      username,
      name,
      email,
    });

    const data = {
      id: _id,
      adminID,
      name,
      email,
    };

    return res.status(200).json({
      type: "success",
      msg: "Login successful",
      data,
      extra: {
        token,
      },
    });
  } catch (err) {
    LogError("cLoginAdmin: " + err.message);

    return res.status(400).json({
      type: "error",
      msg: err.message,
      data: null,
      extra: null,
    });
  }
}
export async function cCreateAdmin(req, res) {
  try {
    //validate required inputs are set
    const required = [
      { name: "data.username", text: "Username" },
      { name: "data.password", text: "Password" },
      { name: "data.name", text: "Name" },
      { name: "data.email", text: "Email" },
    ];
    validateRequired(req, required);

    //get admin data from input
    const { username, password, name, email } = req.body.data;

    //hash password
    const hashedPassword = await createHash(password);

    //generate public key
    const publicKey = createDigest(10);

    // create admin
    let profileDetails = await mCreateAdmin({
      username,
      password: hashedPassword,
      name,
      email,
      publicKey,
    });

    if (!profileDetails) {
      throw new Error(
        "Could not create this admin profile. Please check your inputs and try again."
      );
    }

    const data = {
      id: profileDetails._id,
      adminID: profileDetails.adminID,
      username,
      name,
      email,
    };

    return res.status(200).json({
      type: "success",
      msg: "Admin created successfully",
      data,
      extra: null,
    });
  } catch (err) {
    LogError("cCreateAdmin: " + err.message);

    return res.status(400).json({
      type: "error",
      msg: err.message,
      data: null,
      extra: null,
    });
  }
}
//#endregion

//#region Autheticated

export async function cGetAdmin(req, res) {
  try {
    //get current admin details from authentication token
    const { _id } = getTokenDetailsFromRequest(req);
    const { adminID, username, name, email } = await mGetAdminById(_id);

    const data = { adminID, username, name, email };

    return res.status(200).json({
      type: "success",
      msg: "",
      data,
      extra: null,
    });
  } catch (err) {
    LogError("cGetAdmin: " + err.message);

    return res.status(400).json({
      type: "error",
      msg: err.message,
      data: null,
      extra: null,
    });
  }
}

export async function cLogoutAdmin(req, res) {
  try {
    const { _id } = getTokenDetailsFromRequest(req);

    //logout admin
    await mLogoutAdminById(_id);

    return res.status(200).json({
      type: "success",
      msg: "Logout succesful",
      data: null,
      extra: null,
    });
  } catch (err) {
    LogError("cLogoutAdmin" + err.message);

    return res.status(400).json({
      type: "error",
      msg: err.message,
      data: null,
      extra: null,
    });
  }
}
//#endregion
