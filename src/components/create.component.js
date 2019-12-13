import React, { Component } from 'react'
import { Redirect }         from 'react-router-dom'
import axios                from 'axios'

export default class Create extends Component {
  constructor (props) {
    super(props)
    this.onChangeAvatar = this.onChangeAvatar.bind(this)
    this.onChangeNome = this.onChangeNome.bind(this)
    this.onChangeEndereco = this.onChangeEndereco.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      avatar: '',
      nome: '',
      endereco: ''
    }
  }

  onChangeAvatar (e) {
    let file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = (e) => {
      this.setState({
        avatar: e.target.result
      })
    }
  }

  onChangeNome (e) {
    this.setState({
      nome: e.target.value
    })
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/index'/>
    }
  }

  onChangeEndereco (e) {
    this.setState({
      endereco: e.target.value
    })
  }

  async onSubmit (e) {
    e.preventDefault()
    const obj = {
      avatar: this.state.avatar,
      nome: this.state.nome,
      endereco: this.state.endereco
    }

    await axios.post(`http://localhost:8080/alunos`, obj)
      .then(() => {
        this.props.history.push('/index')
      })
      .catch(e => console.log('erro :' + e))
  }

  render () {
    return (
      <div style={ {marginTop: 10} }>
        <h3>Adicionar Aluno</h3>
        <form onSubmit={ this.onSubmit }>
          <div className="form-group">
            <label>Avatar: </label><br/>
            <img src={ this.state.avatar }
                 className="img-thumbnail"
                 style={ {maxWidth: 10 + '%'} }
                 alt="img"
            /><br/>
            <input type="file"
                   id='multi'
                   onChange={ this.onChangeAvatar }
            />

          </div>
          <div className="form-group">
            <label>Nome: </label>
            <input type="text"
                   className="form-control"
                   value={ this.state.nome }
                   onChange={ this.onChangeNome }
            />
          </div>
          <div className="form-group">
            <label>Endereco: </label>
            <input type="text"
                   className="form-control"
                   value={ this.state.endereco }
                   onChange={ this.onChangeEndereco }
            />
          </div>
          <div className="form-group text-center">
            { this.renderRedirect() }
            <input type="button"
                   value="Voltar"
                   onClick={ this.setRedirect }
                   className="btn btn-danger mx-4"/>
            <input type="submit" value="Adicionar" className="btn btn-primary"/>
          </div>
        </form>
      </div>
    )
  }
}