


export function addUser(id) {
  console.log("reducera gelen id",id)
  return {
    type: "add_user",
    payload: id,
  };
}
export function deleteUser(payload) {
  
  return {
    type: "delete_user",
    payload: payload,
  };


}
