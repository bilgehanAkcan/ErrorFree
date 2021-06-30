import './App.css';
import {Route, Link} from 'react-router-dom';
import RegistrationPage from './Components/RegistrationPage';
import SignInPage from "./Components/SignInPage";
import HomePage from "./Components/HomePage";
import EditPage from './Components/EditPage';
import DetailsPage from './Components/DetailsPage';
import ProfilePage from "./Components/ProfilePage";

function App() {
  return (
    <div>
      <Route exact path="/" component={SignInPage} />
      <Route exact path="/RegistrationPage" component={RegistrationPage} />
      <Route exact path="/HomePage" component={HomePage} />
      <Route exact path="/EditPage" component={EditPage} />
      <Route exact path="/DetailsPage" component={DetailsPage} />
      <Route exact path="/ProfilePage" component={ProfilePage} />
    </div>
  );
}

export default App;
