import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MultipleBullets from "./tries/MultipleBullets.tsx";
import App from "./App.tsx";
import Clocks from "./paths/Clocks.tsx";
const App2 = () => {


    return (
        <Router>
            <Routes>
                <Route path="/multiple" element={<MultipleBullets />} />
                <Route path="/clock" element={<Clocks />} />
                <Route path="/" element={<App />} />

            </Routes>
        </Router>
    );
};

export default App2;