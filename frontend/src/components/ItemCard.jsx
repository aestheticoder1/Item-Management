import { Link } from "react-router-dom";

export default function ItemCard({ item }) {
    return (
        <Link to={`/item/${item._id}`}>
            <div className="border rounded-lg shadow hover:shadow-lg transition p-4 bg-white">
                <img
                    src={item.coverImage}
                    alt={item.name}
                    className="w-full h-56 object-contain rounded"
                />
                <h3 className="mt-2 text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.type}</p>
            </div>
        </Link>
    );
}
