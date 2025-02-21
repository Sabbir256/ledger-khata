/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Select from 'react-select';
import DateDisplay from "../components/DateDisplay";
import { Link } from "react-router-dom";

export default function Sale() {
    const [customerOptions, setCustomerOptions] = useState([]);
    const [productsOptions, setProductsOptions] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({});
    const [salesHistory, setSalesHistory] = useState([]);

    useEffect(() => {
        window.api.invoke('get-customers').then((result) => {
            setCustomerOptions(result.map((cust) => ({ label: cust.name, value: cust.id })));
        });

        window.api.invoke('get-products').then(result => {
            setProductsOptions(result.map((product) => ({ label: product.name, value: product.id })));
        })

        window.api.invoke('get-sales-orders').then((data) => {
            setSalesHistory(data);
        });
    }, []);

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        window.api.invoke('insert-sales-order', formData).then(() => {
            window.api.invoke('get-sales-orders').then((data) => {
                setSalesHistory(data);
                setFormData({});
                setShowForm(false);
            });
        });
    }

    const handleCancel = () => {
        setShowForm(false);
        setFormData({});
    }

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: 'black',
            backgroundColor: state.isSelected ? '#BEF264' : 'white'
        })
    }

    return (
        <>
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-medium">Sales History</h1>
                    <button
                        className="bg-lime-300 hover:bg-lime-400 rounded px-3 text-sm"
                        onClick={() => setShowForm(true)}
                    >+ add new</button>
                </div>

                {showForm && <form className="bg-white my-3 rounded-lg px-7 py-4 select-none" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-5">
                        <div className="flex justify-between gap-5">
                            <div className="flex flex-col text-sm gap-1 flex-grow">
                                <label className="font-medium">Customer</label>
                                <Select
                                    options={customerOptions}
                                    styles={customStyles}
                                    onChange={(option) => handleChange('customer_id', option.value)}
                                    isSearchable={true} />
                            </div>

                            <div className="flex flex-col text-sm gap-1">
                                <label htmlFor="sold_at" className="font-medium">Date</label>
                                <input
                                    name="sold_at"
                                    type="date"
                                    required={true}
                                    max={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => handleChange('sold_at', e.target.value)}
                                    className="border border-gray-200 rounded p-2 outline-sky-200 min-w-[215px]" />
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div className="flex flex-col text-sm gap-1 min-w-[250px]">
                                <label className="font-medium">Product Name</label>
                                <Select
                                    options={productsOptions}
                                    styles={customStyles}
                                    onChange={(option) => handleChange('product_id', option.value)}
                                    isSearchable={true} />
                            </div>

                            <div className="flex flex-col text-sm gap-1">
                                <label htmlFor="quantity" className="font-medium">Quantity</label>
                                <input
                                    name="quantity"
                                    type="number"
                                    required={true}
                                    onChange={e => handleChange('quantity', Number(e.target.value))}
                                    className="border border-gray-200 rounded p-2 outline-sky-200" />
                            </div>

                            <div className="flex flex-col text-sm gap-1">
                                <label htmlFor="price" className="font-medium">Price</label>
                                <input
                                    name="price"
                                    type="number"
                                    step="any"
                                    onChange={e => handleChange('price', Number(e.target.value))}
                                    className="border border-gray-200 rounded p-2 outline-sky-200"
                                    required={true} />
                            </div>

                            <div className="flex flex-col text-sm gap-1">
                                <label htmlFor="payment" className="font-medium">Payment</label>
                                <input
                                    name="payment"
                                    type="number"
                                    step="any"
                                    onChange={e => handleChange('payment', Number(e.target.value))}
                                    className="border border-gray-200 rounded p-2 outline-sky-200"
                                    required={true} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-5 flex gap-4 text-sm font-medium">
                        <button type="submit" className="bg-lime-300 px-6 py-2 rounded hover:bg-lime-400">Save</button>
                        <button className="border px-4 py-1 rounded hover:bg-gray-100" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>}

                {salesHistory.length === 0 && <div className="bg-white px-6 py-4 rounded-lg mt-4 text-sm">
                    <span>No products found, please add new products (click on the &quot;<strong>+ add new</strong>&quot; button).</span>
                </div>}

                {salesHistory.length > 0 && <div className="bg-white rounded-xl px-6 py-4 mt-4">
                    <table className="w-full">
                        <thead className="text-sm">
                            <tr className="border-b border-gray-200">
                                <th className="text-left p-2.5">Seller</th>
                                <th className="text-left p-2.5">Product</th>
                                <th className="text-left p-2.5">Order Date</th>
                                <th className="text-right p-2.5">Price</th>
                                <th className="text-right p-2.5">Payment</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-800">
                            {salesHistory.map((history) => (
                                <SalesHistoryRow
                                    key={history.id}
                                    history={history}
                                    customers={customerOptions}
                                    products={productsOptions}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>}
            </div>
        </>
    );
}


const SalesHistoryRow = ({ history, customers, products }) => {
    const customerName = customers.find(opt => opt.value === history.customer_id)?.label || 'Unknown Customer';
    const productName = products.find(opt => opt.value === history.product_id)?.label || 'Unknown Product';

    return (
        <tr key={history.id} className="border-b border-gray-100">
            <td className="p-2">
                <Link to={`/customers/${history.customer_id}`} className="text-blue-500 hover:underline">{customerName}</Link>
            </td>
            <td className="p-2">{productName}</td>
            <td className="p-2">{<DateDisplay date={history.sold_at} />}</td>
            <td className="p-2 text-right">{history.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td className="p-2 text-right">{history.payment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        </tr>
    );
};
