import React, { Component } from 'react'
import { Link }             from 'react-router-dom'
import axios                from 'axios'

class TableRow extends Component {

  constructor (props) {
    super(props)
    this.delete = this.delete.bind(this)
  }

  async delete () {
    axios.delete('http://localhost:8080/alunos/' + this.props.obj.id)
      .then(() => window.location.reload())
      .catch(err => console.log(err))
  }

  render () {
    return (
      <tr>
        <td>
          <img src={ this.props.obj.avatar } alt="avatar" className="img-thumbnail w-25"/>
        </td>
        <td>
          { this.props.obj.nome }
        </td>
        <td>
          { this.props.obj.endereco }
        </td>
        <td>
          <Link to={ '/edit/' + this.props.obj.id } className="btn btn-primary">Edit</Link>
        </td>
        <td>
          <button onClick={ this.delete } className="btn btn-danger">Delete</button>
        </td>
      </tr>
    )
  }
}

export default TableRow