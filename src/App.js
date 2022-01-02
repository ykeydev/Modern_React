import logo from "./logo.svg";
import Users from "./Users";
import InputSample from "./InputSample";
import UserList from "./UserList";
import CreateUser from "./CreateUser";
import Counter from "./Counter";
import useInputs from "./hooks/useInputs";
import produce from "immer";
import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useReducer,
} from "react";
import "./App.css";

function countActiveUsers(users) {
  console.log("활성 사용자 수를 세는중...");
  return users.filter((user) => user.active).length;
}

const initialState = {
  inputs: {
    username: "",
    email: "",
  },
  users: [
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      active: false,
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      active: false,
    },
  ],
  reducer,
};

function reducer(state, action) {
  switch (action.type) {
    /* custom useInputs 사용으로 변경
    case "CHANGE_INPUT":
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      };
      */
    case "CREATE_USER":
      /* immer 사용
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user),
      };
      */
      return produce(state, (draft) => {
        draft.users.push(action.user);
      });
    case "TOGGLE_USER":
      /*
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
      */
      return produce(state, (draft) => {
        const user = draft.users.find((user) => user.id === action.id);
        user.active = !user.active;
      });
    case "REMOVE_USER":
      /*
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
      */
      return produce(state, (draft) => {
        const index = draft.users.findIndex((user) => user.id === action.id);
        draft.users.splice(index, 1);
      });
    default:
      return state;
  }
}

export const UserDispatch = React.createContext(null);

function App() {
  /*
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });
  const { username, email } = inputs;
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  }, []);
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
    },
  ]);

  const nextId = useRef(4);
  const onCreate = () => {
    // 나중에 구현 할 배열에 항목 추가하는 로직
    // ...
    setUsers([
      ...users,
      {
        id: nextId.current,
        username: username,
        email: email,
      },
    ]);

    setInputs({
      username: "",
      email: "",
    });
    nextId.current += 1;
  };
  const onRemove = useCallback((id) => {
    setUsers((users) => users.filter((user) => user.id !== id));
  }, []);
  const count = useMemo(() => countActiveUsers(users), [users]);
  const onToggle = useCallback((id) => {
    setUsers((users) =>
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  }, []);
  */

  /*custom hooks
  const { username, email } = state.inputs;
  */
  const [{ username, email }, onChange, reset] = useInputs({
    username: "",
    email: "",
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users } = state;
  const nextId = useRef(4);

  //  /*custom hooks useinput으로 변경
  /*
  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_INPUT",
      name,
      value,
    });
  }, []);
  */

  /*
  const onCreate = useCallback(() => {
    dispatch({
      type: "CREATE_USER",
      user: {
        id: nextId.current,
        username,
        email,
      },
    });
    reset();
    nextId.current += 1;
  }, [username, email, reset]);
  */

  const count = useMemo(() => countActiveUsers(users), [users]);

  //context 사용
  /*
  const onToggle = useCallback((id) => {
    dispatch({
      type: "TOGGLE_USER",
      id,
    });
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({
      type: "REMOVE_USER",
      id,
    });
  }, []);
  */
  return (
    <>
      <UserDispatch.Provider value={dispatch}>
        <CreateUser
        //CreateUser context 사용
        /* 
          username={username}
          email={email}
          onChange={onChange}
          onCreate={onCreate}
          */
        />
        <UserList users={users} /*onToggle={onToggle} onRemove={onRemove} */ />
        <div>활성사용자 수 : {count}</div>
      </UserDispatch.Provider>
    </>
    // <>
    //   <Counter />
    // </>
  );
}

export default App;
