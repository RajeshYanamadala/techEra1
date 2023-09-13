import {Route, Switch, Redirect} from 'react-router-dom'
import HomeRoute from './components/HomeRoute'
import CourseItemDetails from './components/CourseItemDetails'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <div className="app-container">
    <Switch>
      <Route exact path="/" component={HomeRoute} />
      <Route exact path="/courses/:id" component={CourseItemDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </div>
)

export default App
