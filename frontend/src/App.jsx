import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddItem from './pages/AddItem';
import ViewItems from './pages/ViewItems';
import ItemDetails from './pages/ItemDetails';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ViewItems />} />
        <Route path="/add" element={<AddItem />} />
        <Route path="/view" element={<ViewItems />} />
        <Route path="/item/:id" element={<ItemDetails />} />
      </Routes>
    </Router>
  );
}