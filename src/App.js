import logo from "./logo.svg";
import "./App.css";
import "./styles.css";
import TicketForm from "./components/TicketForm";
import { useReducer } from "react";
import ticketReducer from "./reducers/ticketReducer";

function App() {
  const initialState = { tickets: [] };
  const [state, dispatch] = useReducer(ticketReducer, initialState);

  return (
    <div className="App">
      <div class="container">
        <h1>Welcome to Bug Blaster</h1>
        <TicketForm dispatch={dispatch}></TicketForm>
      </div>
    </div>
  );
}

export default App;
