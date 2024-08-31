import "./App.css";
import "./styles/theme.css";
import * as vars from "./cssVar.gen";

const App = () => {
    return (
        <div className="content">
            <h1 style={{ color: vars.primary }}>Rsbuild with React</h1>
            <p style={{ color: vars.secondary }}>
                Start building amazing things with Rsbuild.
            </p>
        </div>
    );
};

export default App;
