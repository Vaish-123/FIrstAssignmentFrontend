import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ViewCustomer from './Components/ViewCutomer/ViewCustomer';
import ViewProduct from './Components/ViewProduct/ViewProduct';
import './App.css'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <ViewCustomer />
          </Route>
          <Route exact path='/viewproduct'>
            <ViewProduct />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;