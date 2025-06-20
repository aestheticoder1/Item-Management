import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function AddItem() {
    const navigate = useNavigate();

    const [itemName, setItemName] = useState("");
    const [itemType, setItemType] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [coverImage, setCoverImage] = useState(null);
    const [additionalImages, setAdditionalImages] = useState([]);

    const handleCoverImageChange = (e) => {
        const file = e.target.files[0];
        setCoverImage(file);
    };

    const handleAdditionalImagesChange = (e) => {
        setAdditionalImages([...e.target.files]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const reader = new FileReader();
        reader.onloadend = () => {
            const coverImgBase64 = reader.result;

            const promises = additionalImages.map((file) => {
                return new Promise((resolve) => {
                    const fileReader = new FileReader();
                    fileReader.onloadend = () => resolve(fileReader.result);
                    fileReader.readAsDataURL(file);
                });
            });

            Promise.all(promises).then((additionalImagesBase64) => {
                const newItem = {
                    name: itemName,
                    type: itemType,
                    description: itemDescription,
                    coverImage: coverImgBase64,
                    images: additionalImagesBase64,
                };

                axios.post("https://item-management-q3re.vercel.app/api/items", newItem)
                    .then(() => {
                        toast.success("✅ Item successfully added!");
                        setTimeout(() => navigate("/view"), 1200);
                    })
                    .catch((err) => {
                        console.error("Error uploading item:", err);
                        toast.error("❌ Failed to add item.");
                    });
            });
        };

        if (coverImage) {
            reader.readAsDataURL(coverImage);
        } else {
            toast.error("❌ Please select a cover image.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 mt-6 bg-white rounded-lg shadow-md m-2 border">
            <h1 className="text-4xl font-bold mb-6">Add New Item</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1 text-xl">Item Name</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1 text-xl">Item Type</label>
                    <input
                        type="text"
                        className="w-full border rounded px-3 py-2"
                        value={itemType}
                        onChange={(e) => setItemType(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1 text-xl">Description</label>
                    <textarea
                        className="w-full border rounded px-3 py-2"
                        value={itemDescription}
                        onChange={(e) => setItemDescription(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1 text-xl">Cover Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageChange}
                        required
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1 text-xl">Additional Images</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleAdditionalImagesChange}
                    />
                </div>

                <div className="flex space-x-4 mt-6">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Add Item
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/view")}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                        View All Items
                    </button>
                </div>
            </form>
        </div>
    );
}
