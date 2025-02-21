/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Select from 'react-select';
import DateDisplay from "../components/DateDisplay";
import { Link } from "react-router-dom";

export default function Purchase() {
    const [sellersOptions, setSellersOptions] = useState([]);
    const [productsOptions, setProductsOptions] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({});
    const [purchaseHistory, setPurchaseHistory] = useState([]);

    useEffect(() => {
        window.api.invoke('get-sellers').then((result) => {
            setSellersOptions(result.map((seller) => ({ label: seller.name, value: seller.id })));
        });

        window.api.invoke('get-products').then(result => {
            setProductsOptions(result.map((product) => ({ label: product.name, value: product.id })));
        })

        window.api.invoke('get-purchase-orders').then((data) => {
            setPurchaseHistory(data);
        });
    }, []);

    const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        window.api.invoke('insert-purchase-order', formData).then(() => {
            window.api.invoke('get-purchase-orders').then((data) => {
                setPurchaseHistory(data);
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
                    <h1 className="text-2xl font-medium">Purchase History</h1>
                    <button
                        className="bg-lime-300 hover:bg-lime-400 rounded px-3 text-sm"
                        onClick={() => setShowForm(true)}
                    >+ add new</button>
                </div>

                {showForm && <form className="bg-white my-3 rounded-lg px-7 py-4 select-none" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-5">
                        <div className="flex justify-between gap-5">
                            <div className="flex flex-col text-sm gap-1 flex-grow">
                                <label className="font-medium">Seller</label>
                                <Select
                                    options={sellersOptions}
                                    styles={customStyles}
                                    onChange={(option) => handleChange('seller_id', option.value)}
                                    isSearchable={true} />
                            </div>

                            <div className="flex flex-col text-sm gap-1">
                                <label htmlFor="purchase_date" className="font-medium">Purchase Date</label>
                                <input
                                    name="purchase_date"
                                    type="date"
                                    required={true}
                                    max={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => handleChange('purchase_date', e.target.value)}
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
                                <label htmlFor="cost" className="font-medium">Cost (Total)</label>
                                <input
                                    name="cost"
                                    type="number"
                                    step="any"
                                    onChange={e => handleChange('cost', Number(e.target.value))}
                                    className="border border-gray-200 rounded p-2 outline-sky-200"
                                    required={true} />
                            </div>

                            <div className="flex flex-col text-sm gap-1">
                                <label htmlFor="paid" className="font-medium">Paid</label>
                                <input
                                    name="paid"
                                    type="number"
                                    step="any"
                                    onChange={e => handleChange('paid', Number(e.target.value))}
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

                {purchaseHistory.length === 0 && <div className="bg-white px-6 py-4 rounded-lg mt-4 text-sm">
                    <span>No products found, please add new products (click on the &quot;<strong>+ add new</strong>&quot; button).</span>
                </div>}

                {purchaseHistory.length > 0 && <div className="bg-white rounded-xl px-6 py-4 mt-4">
                    <table className="w-full">
                        <thead className="text-sm">
                            <tr className="border-b border-gray-200">
                                <th className="text-left p-2.5">Seller</th>
                                <th className="text-left p-2.5">Product</th>
                                <th className="text-left p-2.5">Order Date</th>
                                <th className="text-right p-2.5">Cost</th>
                                <th className="text-right p-2.5">Paid</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-800">
                            {purchaseHistory.map((history) => (
                                <PurchaseHistoryRow
                                    key={history.id}
                                    history={history}
                                    sellersOptions={sellersOptions}
                                    productsOptions={productsOptions}
                                />
                            ))}
                            {/* <tr>
                                <td colSpan="3" className="p-2 font-medium text-right">Total</td>
                                <td className="p-2 text-right font-medium">{purchaseHistory.reduce((acc, curr) => acc + curr.cost, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                <td className="p-2 text-right font-medium">{purchaseHistory.reduce((acc, curr) => acc + curr.paid, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>}
            </div> 
        </>
    );
}


const PurchaseHistoryRow = ({ history, sellersOptions, productsOptions }) => {
    const sellerLabel = sellersOptions.find(opt => opt.value === history.seller_id)?.label || 'Unknown Seller';
    const productLabel = productsOptions.find(opt => opt.value === history.product_id)?.label || 'Unknown Product';

    return (
        <tr key={history.id} className="border-b border-gray-100">
            <td className="p-2">
                <Link to={`/sellers/${history.seller_id}`} className="text-blue-500 hover:underline">{sellerLabel}</Link>
            </td>
            <td className="p-2">{productLabel}</td>
            <td className="p-2">{<DateDisplay date={history.purchase_date} />}</td>
            <td className="p-2 text-right">{history.cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td className="p-2 text-right">{history.paid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
        </tr>
    );
};
