import React from 'react';
import Button from './Button';
import PropTypes from "prop-types"
import SkeletonLoading from './SkeletonLoading';


// destructer propsnya ambil dari proptypes
 const TodoItem = ({ todo, del, open, loading}) => {

  // method hapus by id
  const hapusById = (id) => {
      // panggil propstypes del
      del(id)
  }

  return (
    <>
    {loading ? (<SkeletonLoading />) : (
      <div style={todoItem}>
          <p> {todo.title}</p>
          <div>
            <Button 
              text="edit"
              variant="success"
              action={() => open(todo._id, todo.title)}
              />
            <Button text="hapus" variant="warning"
            // () => hapusById(todoo.ids)
            action={ () => hapusById(todo._id) }/>
          </div>
          
      </div>
     )}
    </>

  )
}

// propsType atau typenya berupa objek dan harus required

TodoItem.propsTypes = {
  todo : PropTypes.object.isRequired,
  del: PropTypes.func.isRequired, //del ini dari props app
}




export default TodoItem;

// ccs menggunakan iline-style

const todoItem =  {
    background: "#2da4f8",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    height: "3rem",
    padding: "0 1rem",
    justifyContent: "space-between" ,
    margin: "0.5rem 0"
}
