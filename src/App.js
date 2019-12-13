import React, { Component }                             from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

import Create from './components/create.component'
import Edit   from './components/edit.component'
import Index  from './components/index.component'

class App extends Component {
  render () {
    return (
      <Router>
        <div className="container">
          <h2>CRUD de Alunos</h2>

          <div className="form-group">
            <Link to={ '/index' } type="button"
                  className="btn btn-primary mr-4">Listar</Link>
            <Link to={ '/create' } type="button"
                  className="btn btn-primary mr-4">Adicionar</Link>
          </div>

          <Switch>
            <Route exact path='/' component={ Index }/>
            <Route exact path='/create' component={ Create }/>
            <Route path='/edit/:id' component={ Edit }/>
            <Route path='/index' component={ Index }/>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App