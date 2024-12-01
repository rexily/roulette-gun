import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MultipleBullets from "./tries/MultipleBullets.tsx";
import MultipleBullets2 from "./tries/New.tsx";


const App = () => {


    return (
        <Router>
            <Routes>
                <Route path="/" element={<MultipleBullets2 />} />
                <Route path="/old" element={<MultipleBullets />} />
            </Routes>
        </Router>
    );
};

export default App;