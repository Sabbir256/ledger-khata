import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        address: ''
    });

    useEffect(() => {
        window.api.invoke('get-customers').then((data) => {
            setCustomers(data);
        });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.name && formData.contact) {
            window.api.invoke('insert-customer', formData).then(() => {
                window.api.invoke('get-customers').then((data) => {
                    setCustomers(data);
                    setFormData({});
                    setShowForm(false);
                })
            });
        }
    }

    const handleCancel = () => {
        setShowForm(false);
        setFormData({});
    }

    return (
        <>
            <div className="max-w-7xl mx-auto transition-all duration-200 ease-in">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-medium">Customers</h1>
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

                {customers.length === 0 && <div className="bg-white px-6 py-4 rounded-lg mt-4 text-sm">
                    <span>There are no customers at the moment, please add new customers (click on the &quot;<strong>+ add new</strong>&quot; button).</span>
                </div>}

                {customers.length > 0 && <div className="bg-white rounded-xl px-6 py-4 mt-4">
                    <table className="w-full">
                        <thead className="text-sm">
                            <tr className="border-b border-gray-200">
                                <th className="text-left p-2.5">Name</th>
                                <th className="text-left p-2.5">Contact</th>
                                <th className="text-left p-2.5">Address</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-800">
                            {customers.map((cust) => (
                                <tr key={cust.id} className="border-b border-gray-100">
                                    <td className="p-2 font-medium">
                                        <Link to={`/customers/${cust.id}`} className="text-blue-500 hover:underline">{cust.name}</Link>
                                    </td>
                                    <td className="p-2">{cust.contact}</td>
                                    <td className="p-2">{cust.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>}
            </div>
        </>
    );
}