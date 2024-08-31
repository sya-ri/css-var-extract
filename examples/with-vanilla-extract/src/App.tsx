import "./App.css";
import { headerStyle, messageStyle } from "./styles.css.ts";

function App() {
    return (
        <div>
            <h1 className={headerStyle}>Vite + React</h1>
            <p className={messageStyle}>
                Edit <code>src/App.tsx</code> and save to test HMR
            </p>
        </div>
    );
}

export default App;
