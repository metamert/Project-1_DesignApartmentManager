import { REGISTER_USER, EDIT_USER, DELETE_USER } from "../_actions/types";
let us= localStorage.getItem("user", "user")
const intialState = {user:us}

const del = (state, id) => {
  console.log("STATE", state);
  let arr = state.filter((item) => {
    return item.id !== id;
  });

  console.log("ID", id);
  console.log("ARR", arr);
  return [...arr];
};

const create = (state, user) => {
  console.log("STATE", state);
  let arr = state
arr.push(
  {
    id: user.id,
    name: user.name,
    email: user.email,
    due: user.due,
    role: user.role,
  },
)

  return [...arr];
};


const edit = (state, user) => {
  console.log("edit cun",user)
  let arr = state;
    arr.map((item,index) => {
      console.log("item id",item.id)
      console.log("user id",user.id)
      if (item.id == user.id) {
        console.log("girdi")
        arr[index]= user;
        console.log("item",arr[index])
      }
    });
console.log("maplendikten sonra",arr)
    return [...arr]
};


export default function (state = intialState, action) {
  switch (action.type) {
    case "add_user":
      return {...state,user:"admin"}

      case "delete_user":
        return {...state,user:null}
    default:
      return state;
  }
}
