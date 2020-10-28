import { REGISTER_USER, DELETE_USER } from "./types";

export function createUser(user) {
  console.log("reducera gelen user",user)
  return {
    type: "create_user",
    payload: user,
  };


}
export function deleteUser(id) {
  console.log("reducera gelen id",id)
  return {
    type: DELETE_USER,
    payload: id,
  };
}
export function editUser(payload) {
  console.log("helen ediy user",payload)
  return {
    type: "edit_user",
    payload: payload,
  };


}
