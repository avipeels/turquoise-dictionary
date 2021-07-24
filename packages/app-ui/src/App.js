import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import DashBoard from './Dashboard';

const App = () => {
    return (
        <main>
            <Switch>
                <Route path="/" component={Login} exact />
                <Route path="/dashboard" component={DashBoard} />
            </Switch>
        </main>
    )
}
export default App;


