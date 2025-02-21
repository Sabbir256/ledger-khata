import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function Layout() {
    const activeLinkStyle = "text-lime-700 font-medium";

    return (
        <div className="flex">
            <nav className="min-w-[180px] p-4 0 h-screen rounded">
                <ul className="flex flex-col gap-2 text-sm">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? activeLinkStyle : ""}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/products"
                            className={({ isActive }) => isActive ? activeLinkStyle : ""}
                        >
                            Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/sellers"
                            className={({ isActive }) => isActive ? activeLinkStyle : ""}
                        >
                            Sellers
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/purchase"
                            className={({ isActive }) => isActive ? activeLinkStyle : ""}
                        >
                            Purchase
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <main className="p-4 bg-gray-50 w-full rounded-md">
                <Outlet />
            </main>
        </div>
    );
}