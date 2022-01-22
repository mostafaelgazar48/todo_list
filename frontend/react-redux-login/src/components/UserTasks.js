import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import userService from '../services/user-service';


const UserTasks = () => {

  const [tasks, setTasks] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    userService.getUserTasks()
      .then((response) => {
          setTasks(response.data.data)
      }).catch((error) => {
          const tasksError = (
            error.response &&
            error.response.data &&
            error.respone.data.message
          ) || error.message ||
            error.toString();
          setTasks(tasksError);
        }
      )
  }, [])

  return (
    <div className="container">

     <div className='card'>
       <h3 className='mx-auto'> Tasks of {currentUser.user.email}</h3>
     <ul className="list-group">
        {tasks && tasks.map((task,i)=> (
          <li className='list-group-item m-1' key={i}> {task.name}</li>
        ))}
        </ul>
     </div>
    </div>
  );
};

export default UserTasks;
