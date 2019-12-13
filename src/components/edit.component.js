import React, { Component } from 'react'
import axios                from 'axios'
import { Redirect }         from 'react-router-dom'

/**
 * Componente para a edição de alunos
 */
export default class Edit extends Component {

  /**
   * Contrutor
   * @param props
   */
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

  /**
   * Método responsável por buscar os dados do aluno cadastrados na api
   * no momento da montagem do component.
   */
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

  /**
   * Método para atualizar o estado do avatar quando o usuários
   * modificá-lo.
   *
   * @param e Evento vindo da ação do usuário.
   */
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

  /**
   * Método para atualizar o estado do nome quando o usuários
   * modificá-lo.
   *
   * @param e Evento vindo da ação do usuário.
   */
  onChangeNome (e) {
    this.setState({
      nome: e.target.value
    })
  }

  /**
   * Método para atualizar o estado do endereço quando o usuários
   * modificá-lo.
   *
   * @param e Evento vindo da ação do usuário.
   */
  onChangeEndereco (e) {
    this.setState({
      endereco: e.target.value
    })
  }

  /**
   * Método responsável por realizar a submissão dos dados
   * para a API.
   *
   * @param e Evento vindo da ação do usuário.
   */
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

  /**
   * Método responsável por mudar o estado do 'redirect'.
   * É utilizado no botão de voltar à tela inicial.
   */
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

  /**
   * Função para renderizar o html na página.
   * @returns {*}
   */
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