import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import { toast } from "react-toastify";

export default function ItemDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false); // New state for button

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/items/${id}`)
            .then((res) => {
                setItem(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Item not found", err);
                navigate("/view");
            });
    }, [id, navigate]);

    const handleEnquire = async () => {
        setSending(true);
        try {
            await axios.post("http://localhost:5000/api/enquire", {
                name: item.name,
                type: item.type,
                description: item.description,
            });
            toast.success("✅ Enquiry sent successfully!");
        } catch (error) {
            console.error("Enquiry Error:", error);
            toast.error("❌ Failed to send enquiry. Try again.");
        } finally {
            setSending(false);
        }
    };

    if (loading || !item) return <p className="text-center mt-10 text-lg">Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 border m-2 rounded-lg shadow-md">
            <h1 className="text-4xl font-bold mb-4">{item.name}</h1>
            <p className="text-gray-600 mb-2 text-xl">Type: {item.type}</p>
            <p className="mb-4 text-xl">{item.description}</p>

            <Carousel showThumbs={true} infiniteLoop className="mb-6">
                {[item.coverImage, ...(item.images || [])].map((img, idx) => (
                    <div key={idx} className="flex justify-center items-center h-[400px] bg-gray-100">
                        <img
                            src={img}
                            alt={`Item image ${idx + 1}`}
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>
                ))}
            </Carousel>

            <div className="flex space-x-4">
                <button
                    onClick={handleEnquire}
                    disabled={sending}
                    className={`px-4 py-2 rounded text-white ${
                        sending
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    {sending ? "Sending Email..." : "Enquire"}
                </button>

                <button
                    onClick={() => navigate("/view")}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                    View All Items
                </button>
            </div>
        </div>
    );
}
