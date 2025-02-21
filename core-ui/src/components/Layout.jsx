import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default function Layout() {
    const styles = {
        active: "nav-link active",
        inactive: "nav-link"
    }

    return (
        <div className="flex">
            <nav className="min-w-[180px] p-4 0 h-screen rounded">
                <ul className="flex flex-col gap-2 text-sm w-full">
                    <li className='block'>
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? styles.active : styles.inactive}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/sale"
                            className={({ isActive }) => isActive ? styles.active : styles.inactive}
                        >
                            Sale
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/purchase"
                            className={({ isActive }) => isActive ? styles.active : styles.inactive}
                        >
                            Purchase
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/products"
                            className={({ isActive }) => isActive ? styles.active : styles.inactive}
                        >
                            Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/sellers"
                            className={({ isActive }) => isActive ? styles.active : styles.inactive}
                        >
                            Sellers
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/customers"
                            className={({ isActive }) => isActive ? styles.active : styles.inactive}
                        >
                            Customers
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