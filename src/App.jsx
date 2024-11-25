import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  let [users, setUsers] = useState([]);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [department, setDepartment] = useState("");
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleDelete() {
    console.log("delete button clicked");
  }
  function handleEdit() {
    console.log("edit button clicked");
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log("form submitted");
    let obj = ((id = users.length + 1), name, email, department);
    setUsers([...users, obj]);
    axios
      .post(obj)
      .then((res) => {
        console.log(res.data);
        alert("user added");
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setName("");
        setEmail("");
        setDepartment("");
        alert("user added");
      });
  }

  return (
    <>
      <h1> User Management Dashboard </h1>
      <h3>Add User</h3>
      <form action="" onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name=""
          id=""
          placeholder="Enter name"
        />
        <input
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          type="text"
          name=""
          id=""
          placeholder="Enter department"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          name=""
          id=""
          placeholder="Enter email"
        />
        <button type="submit">Add</button>
      </form>
      <h2>Users</h2>

      {users &&
        users.map((ele) => {
          return (
            <div className="card" key={ele.id}>
              <p>{ele.id}</p>
              <h3>{ele.name}</h3>
              <p>{ele.email}</p>
              <p>Dept: {ele.department || "General"}</p>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          );
        })}
    </>
  );
}

export default App;
