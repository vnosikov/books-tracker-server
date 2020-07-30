import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Header = () => <h2>Header</h2>
const Landing = () => <h2>Landing</h2>
const ProjectsList = () => <h2>Projects List</h2>
const Dashboard = () => <h2>Dashboard</h2>
const NewItem = () => <h2>New Item</h2>

const App = () => {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/projects" component={ProjectsList} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard/new" component={NewItem} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}


export default App;
