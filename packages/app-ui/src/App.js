import './App.css';
import TextBox from '@mycomp/textbox';
import Label from '@mycomp/label';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <form>
          <Label forField="username" name="Username" />
          <TextBox name='username' id='username' required placeholder="enter username" />
          <Label forField="password" name="Password" />
          <TextBox name='password' id='password' required placeholder="enter password" />
          <input type="submit" value="Login"></input>
        </form>
      </header>
    </div>
  );
}

export default App;
