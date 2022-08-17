import React, { Component } from 'react'
import Button from './Button';
import "../style/FormInput.css"
import axios from 'axios';


const baseUrl = `https://my-udemy-api.herokuapp.com/api/v1/todo`


export default class FormInput extends Component {

state = {
  text: ""
}  

// method Change . ambil nilai form input yg di ketik
change = e => {

 this.setState({
   text: e.target.value
 })

}

submit = async (e) => {
  e.preventDefault()
  const token = localStorage.getItem("token")
 
  // jika state nya tidakkosong
  if(this.state.text !== "") {
    const newTodo = {
      title: this.state.text
    }
    const res = await axios.post(`${baseUrl}`, newTodo, {
      headers: {
        "Authorization" : token
      }
    })
    this.props.add(res.data.todo)
  }
  // jika di submit set statenyamenjadi kosong
  this.setState({
    text:"",
  })
  
}

  render() {
    return (
      <form style={inputForm} onSubmit ={this.submit}>
        <input 
        type="text" onChange={this.change}
        value={this.state.text}
        style={input} 
        placeholder="Tambah Task" />

        <Button
         text="Tambah" 
         variant="primary"
         action={this.submit}/>
      </form>
    )
  }
}

const inputForm ={
    background: "#fff",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    height: "3rem",
    padding: "0 1rem",
    justifyContent: "space-between" ,
    margin: "0.5rem 0"
}

const input ={
    width: "70%",
    height: "55%",
    border: " 1px solid #eaeaea",
}
 