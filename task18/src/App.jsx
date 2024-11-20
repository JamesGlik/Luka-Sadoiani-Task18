import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todos = await axios.get('https://jsonplaceholder.typicode.com/todos');
        const users = await axios.get('https://jsonplaceholder.typicode.com/users');
        setTodos(todos.data);
        setUsers(users.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const createUserMap = () => {
    return users.reduce((map, user) => {
      map[user.id] = user;
      return map;
    }, {});
  };

  const deleteRow = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const usersMap = createUserMap();

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Image</th>
            <th>Title</th>
            <th>Email</th>
            <th>Address</th>
            <th>Zip Code</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => {
            const user = usersMap[todo.userId];
            return (
              user && (
                <tr key={todo.id}>
                  <td><input type="checkbox" /></td>
                  <td><div className="avatar"></div></td>
                  <td>{todo.title}</td>
                  <td>{user.email}</td>
                  <td>{`${user.address.street}, ${user.address.city}`}</td>
                  <td>{user.address.zipcode}</td>
                  <td>
                    <span className={`status ${todo.completed}`}>
                      {todo.completed ? 'true' : 'false'}
                    </span>
                  </td>
                  <td>
                    <span className="action" onClick={() => deleteRow(todo.id)}>x</span>
                  </td>
                </tr>
              )
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default App;
