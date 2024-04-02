import { ThemeProvider } from "ThemeContext";
import "./App.css";
import AppRoute from "./Router/router";

function App() {
  return (
    <div dir="rtl" >
      <ThemeProvider >
        <main>
          <AppRoute />
        </main>
      </ThemeProvider>
    </div>
  );
}

export default App;
