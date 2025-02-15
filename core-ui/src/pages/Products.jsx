import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: null
  });

  useEffect(() => {
    window.api.invoke('get-products').then((data) => {
      setProducts(data);
    });
  }, []);

  const handleChange = (e) => {
    let value = e.target.value;
    if (!isNaN(value)) {
      value = Number(value)
    }

    setNewProduct({ ...newProduct, [e.target.name]: value });
  }

  const handleAddProduct= async (e) => {
    e.preventDefault();

    if (newProduct.name && newProduct.price) {
      console.log('here!');
      try {
        await window.api.invoke('insert-product', newProduct);
        const data = await window.api.invoke('get-products');
        setProducts(data);
        setNewProduct({});
        setShowForm(false);
      } catch(error) {
        console.log(error);
      }
    }
  }

  const handleCancel = () => {
    setShowForm(false);
    setNewProduct({
      name: '',
      description: '',
      price: null,
      category: '',
    });
  }

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between">
          <h1 className="text-2xl font-medium">Products</h1>
          <button
            className="bg-lime-300 hover:bg-lime-400 rounded px-3 text-sm"
            onClick={() => setShowForm(true)}
          >+ add new</button>
        </div>

        {showForm && <form className="bg-white my-3 rounded-lg px-7 py-4 select-none" onSubmit={handleAddProduct}>
          <div className="flex flex-col gap-3.5">
            <div className="flex justify-between gap-5">
              <div className="flex flex-col text-sm gap-1 flex-grow">
                <label htmlFor="name" className="font-medium">Name</label>
                <input name="name" type="text" onChange={handleChange} className="border border-gray-200 rounded p-2 outline-sky-200" />
              </div>

              <div className="flex flex-col text-sm gap-1">
                <label htmlFor="price" className="font-medium">Price</label>
                <input name="price" type="number" step="any" onChange={handleChange} className="border border-gray-200 rounded p-2 outline-sky-200 min-w-[200px]" />
              </div>
            </div>

            <div className="flex flex-col text-sm gap-1">
              <label htmlFor="description" className="font-medium">Product Description</label>
              <input name="description" type="text" onChange={handleChange} className="border border-gray-200 rounded p-2 outline-sky-200" />
            </div>
          </div>

          <div className="mt-5 flex gap-4 text-sm font-medium">
            <button type="submit" className="bg-lime-300 px-6 py-2 rounded hover:bg-lime-400">Save</button>
            <button className="border px-4 py-1 rounded hover:bg-gray-100" onClick={handleCancel}>Cancel</button>
          </div>
        </form>}

        <div className="bg-white rounded-xl px-6 py-4 mt-4">
          <table className="w-full">
            <thead className="text-sm">
              <tr className="border-b border-gray-200">
                <th className="text-left py-1.5 px-2 border-r">Name</th>
                <th className="text-left py-1.5 px-2 border-r">Price</th>
                <th className="text-left py-1.5 px-2">Description</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-800">
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100">
                  <td className="border-r py-1.5 px-2">{product.name}</td>
                  <td className="border-r py-1.5 px-2">{product.price.toLocaleString(2)}</td>
                  <td className="py-1.5 px-2">{product.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
