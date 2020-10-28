import { REGISTER_USER, EDIT_USER, DELETE_USER } from "../_actions/types";

const intialState = [
  {
    id: 123123123,
    name: "mert",
    email: "mert@gmail.com",
    due: "52$",
    role: "user",
  },
];

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
    case "edit_user":
      return edit(state, action.payload);
    case DELETE_USER:
      return del(state, action.payload);
      case "create_user":
        return create(state, action.payload);
    default:
      return state;
  }
}
