import logo from '../logo.svg';
import '../App.css';
import FormInput from '../components/FormInput';
import TodoItem from '../components/TodoItem';
import React, {useState, useEffect} from 'react';
import EditModal from '../components/EditModal';
import axios from 'axios';

const baseUrl = `https://my-udemy-api.herokuapp.com/api/v1`

const Task = () => {
  const [loading, setLoading] = useState(false)
  const [todos, setTodos ] = useState([])
  const [isEdit, setIsEdit] = useState(false)
  const [editData, setEditData]= useState({
    id: "",
    title: ""
  })

  // method tambah data
  const addTask = (data) => {
    console.log(data);
    setTodos([...todos, data] )
  }

  // method update data
  const update = async () => {
    console.log("ok update")
    const token = localStorage.getItem("token")
    const {id, title} = editData
    const res = await axios.put(`${baseUrl}/todo/${id}`, editData ,{
      headers: {
        "Authorization" : token
      }
    })
    console.log(res)
    setIsEdit(false)
    // setTodos(res.data)
    setEditData({id: "", title: ""})
    // // destructer state edit data 
    // // buatdatabaru
    //   // destructer state todos
    // const {id, title} = editData
    // const newTodos = todos
    
    // newTodos.splice((id-1), 1, newData)

  }

   // method set title modal
   const setTitle = (e) => {
    setEditData({
        ...editData,
        // ambil titlenya saja yg di ubah
        title: e.target.value  
    })
  }

  // method open modal edit
  const openModal = (id, data) => {
    setIsEdit(true)
    setEditData({id, title: data})
  }

  // method close modal
  const closeModal = () => {
    setIsEdit(false)
  }

 

  // methode delete task
const deleteTask = async (id) => {
  console.log("ok ke delete");
  setLoading(true)
  // get token from localStorage
  const token = localStorage.getItem("token")
  const res = await axios.get(`${baseUrl}/todo/${id}`, {
    headers: {
      "Authorization" : token
    }
  })
  // setTodos(res.data)
  setTimeout(() => {
    setLoading(false)
  }, 1000 )
  console.log(res);
    setTodos(todos.filter(item => item._id !== id))
}


  const getDataFromApi = async() => {
      setLoading(true)
      // get token from localStorage
      const token = localStorage.getItem("token")
      const res = await axios.get(`${baseUrl}/todo`, {
        headers: {
          "Authorization" : token
        }
      })
      setTodos(res.data.todos)
      setTimeout(() => {
        setLoading(false)
      }, 1000 )
      console.log(res);
  }
  useEffect(() => {
    getDataFromApi()
    
  }, [])

  return (
    <div className="app">
      <div className='logo'>
        <img src={logo} alt='logo' />
        <h5>Task List</h5>

      </div>

      <div className='List'>
  
      {todos.map(item => 
        <TodoItem key={item._id} //loping component todoitem
         todo={item}
         del={deleteTask}
         open={openModal}
         loading={loading}
 
         />
        
        )} 
      </div>
      <div className='input-form'>
        <FormInput add = {addTask} />
      </div>

      <EditModal 
        update={update}
        edit={isEdit} 
        close={closeModal}
        change={setTitle}
        data = {editData}
        />    
    </div>
  );
}


export default Task;
