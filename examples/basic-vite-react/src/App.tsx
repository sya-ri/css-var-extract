import "./App.css";
import * as vars from "./cssVar.gen";

function App() {
    return (
        <div>
            <h1 style={{ color: vars.primary }}>Vite + React</h1>
            <p style={{ color: vars.secondary }}>
                Edit <code>src/App.tsx</code> and save to test HMR
            </p>
        </div>
    );
}

export default App;
