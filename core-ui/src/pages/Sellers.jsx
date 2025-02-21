import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Sellers() {
    const [sellers, setSellers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newSeller, setNewSeller] = useState({
        name: '',
        contact: '',
        address: ''
    });

    useEffect(() => {
        window.api.invoke('get-sellers').then((data) => {
            setSellers(data);
        });
    }, []);

    const handleChange = (e) => {
        setNewSeller({ ...newSeller, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newSeller.name && newSeller.contact) {
            try {
                window.api.invoke('insert-seller', newSeller).then(() => {
                    window.api.invoke('get-sellers').then((data) => {
                        setSellers(data);
                        setNewSeller({});
                        setShowForm(false);
                    })
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

    const handleCancel = () => {
        setShowForm(false);
        setNewSeller({});
    }

    return (
        <>
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-medium">Sellers</h1>
                    <button
                        className="bg-lime-300 hover:bg-lime-400 rounded px-3 text-sm"
                        onClick={() => setShowForm(true)}
                    >+ add new</button>
                </div>

                {showForm && <form className="bg-white my-3 rounded-lg px-7 py-4 select-none" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-3.5">
                        <div className="flex justify-between gap-5">
                            <div className="flex flex-col text-sm gap-1 flex-grow">
                                <label htmlFor="name" className="font-medium">Name</label>
                                <input name="name" type="text" onChange={handleChange} className="border border-gray-200 rounded p-2 outline-sky-200" required={true} />
                            </div>

                            <div className="flex flex-col text-sm gap-1 flex-grow">
                                <label htmlFor="contact" className="font-medium">Contact</label>
                                <input name="contact" type="text" step="any" onChange={handleChange} className="border border-gray-200 rounded p-2 outline-sky-200" required={true} />
                            </div>
                        </div>

                        <div className="flex flex-col text-sm gap-1">
                            <label htmlFor="address" className="font-medium">Address</label>
                            <input name="address" type="text" onChange={handleChange} className="border border-gray-200 rounded p-2 outline-sky-200" />
                        </div>
                    </div>

                    <div className="mt-5 flex gap-4 text-sm font-medium">
                        <button type="submit" className="bg-lime-300 px-6 py-2 rounded hover:bg-lime-400">Save</button>
                        <button className="border px-4 py-1 rounded hover:bg-gray-100" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>}

                {sellers.length === 0 && <div className="bg-white px-6 py-4 rounded-lg mt-4 text-sm">
                    <span>There are no sellers in the system, please add new sellers (click on the &quot;<strong>+ add new</strong>&quot; button).</span>
                </div>}

                {sellers.length > 0 && <div className="bg-white rounded-xl px-6 py-4 mt-4">
                    <table className="w-full">
                        <thead className="text-sm">
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-1.5 px-2">Name</th>
                                <th className="text-left py-1.5 px-2">Contact</th>
                                <th className="text-left py-1.5 px-2.5">Address</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-800">
                            {sellers.map((seller) => (
                                <tr key={seller.id} className="border-b border-gray-100">
                                    <td className="p-2 font-medium">
                                        <Link className="text-blue-500 hover:underline" to={`/sellers/${seller.id}`}>{seller.name}</Link>
                                    </td>
                                    <td className="p-2">{seller.contact}</td>
                                    <td className="p-2">{seller.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>}
            </div>
        </>
    );
}