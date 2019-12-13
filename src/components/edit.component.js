import React, { Component } from 'react'
import axios                from 'axios'
import { Redirect }         from 'react-router-dom'

export default class Edit extends Component {
  constructor (props) {
    super(props)
    this.onChangeAvatar = this.onChangeAvatar.bind(this)
    this.onChangeNome = this.onChangeNome.bind(this)
    this.onChangeEndereco = this.onChangeEndereco.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      avatar: '',
      nome: '',
      endereco: '',
      redirect: false
    }
  }

  componentDidMount () {
    axios.get(`http://localhost:8080/alunos/${ this.props.match.params.id }`)
      .then(response => {
        this.setState({
          avatar: response.data.avatar,
          nome: response.data.nome,
          endereco: response.data.endereco
        })
      })
      .catch(function (error) {
        console.log('Error: ' + error)
      })
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

    await axios.put(`http://localhost:8080/alunos/${ this.props.match.params.id }`, obj)
      .then(() => this.props.history.push('/index'))
      .catch(e => console.log(e))

  }

  async onBack (e) {
    e.preventDefault()
    this.props.history.push('/index')
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

  render () {
    return (
      <div style={ {marginTop: 10} }>
        <h3 align="center">Aluno: <b>{ this.state.nome }</b></h3>
        <form>
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
            <label>Endereço: </label>
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
            <input type="button"
                   value="Atualizar"
                   onClick={ this.onSubmit }
                   className="btn btn-primary"/>
          </div>
        </form>
      </div>
    )
  }
}