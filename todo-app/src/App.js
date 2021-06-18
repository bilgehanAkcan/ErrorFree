import './App.css';
import {Route, Link} from 'react-router-dom';
import RegistrationPage from './Components/RegistrationPage';
import SignInPage from "./Components/SignInPage";
import HomePage from "./Components/HomePage";
import EditPage from './Components/EditPage';

function App() {
  return (
    <div>
      <Route exact path="/" component={SignInPage} />
      <Route exact path="/RegistrationPage" component={RegistrationPage} />
      <Route exact path="/HomePage" component={HomePage} />
      <Route exact path="/EditPage" component={EditPage} />
    </div>
  );
}

export default App;
