import { useEffect, useState } from "react";
import ItemCard from "../components/ItemCard";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ViewItems() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/items")
            .then(res => setItems(res.data))
            .catch(err => console.error("Error fetching items:", err))
            .finally(() => setLoading(false)); // Turn off loader after fetch
    }, []);

    return (
        <div className="max-w-6xl mx-auto p-6 border min-h-screen m-2 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold">Listed Items</h1>
                <Link
                    to="/add"
                    className="bg-gray-600 font-semibold text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                    + Add New Item
                </Link>
            </div>

            {loading ? (
                <div className="text-center text-lg mt-20">Loading items...</div>
            ) : items.length === 0 ? (
                <p className="w-[95%] mx-auto mt-8 text-lg">🚫 No items found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-[95%] mx-auto mt-8">
                    {items.map((item) => (
                        <ItemCard key={item._id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
}
