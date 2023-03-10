import React from 'react';
import { Route, Switch } from 'react-router-dom';
// Phase1: import LoginFormPage component and then insert into App
import LoginFormPage from './components/LoginFormPage';

function App() {
  return (
    <Switch>
      <Route path="/login">
        <LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;
