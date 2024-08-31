import "./App.css";
import "./theme.css";
import * as vars from "./cssVar.gen";

const App = () => {
    return (
        <div className="content">
            <h1 style={{ color: vars.primary }}>Webpack with React</h1>
            <p style={{ color: vars.secondary }}>
                Start building with webpack.
            </p>
        </div>
    );
};

export default App;
