import React, { Component } from 'react'
import axios                from 'axios'
import TableRow             from './TableRow'

/**
 * Componente para a listagem de alunos
 */
export default class Index extends Component {

  /**
   * Contrutor
   * @param props
   */
  constructor (props) {
    super(props)
    this.state = {alunos: []}
  }

  /**
   * Método responsável por buscar os alunos cadastrados na api
   * no momento da montagem do component.
   */
  componentDidMount () {
    axios.get('http://localhost:8080/alunos')
      .then(response => {
        this.setState({alunos: response.data})
      })
      .catch(function (error) {
        console.log('Error: ' + error)
      })
  }

  /**
   * Função responsável por mapear e renderizar as linhas da tabela
   * com as informações dos alunos.
   * @returns {unknown[]}
   */
  tabRow () {
    return this.state.alunos.map(function (object, i) {
      return <TableRow obj={ object } key={ i }/>
    })
  }

  /**
   * Função para renderizar o html na página.
   * @returns {*}
   */
  render () {
    return (
      <div>
        <h3 align="center">Lista de alunos</h3>
        <table className="table table-striped" style={ {marginTop: 20} }>
          <thead>
          <tr>
            <th>Avatar</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th colSpan="2">Ação</th>
          </tr>
          </thead>
          <tbody>
          { this.tabRow() }
          </tbody>
        </table>
      </div>
    )
  }
}