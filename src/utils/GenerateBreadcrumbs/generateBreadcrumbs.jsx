import { Link } from "react-router-dom";

export const generateBreadcrumbs = (pathnames) => {
    pathnames = pathnames.split('/').filter((x) => x);
    return (
        <div className="text-sm breadcrumbs mb-4 text-blue">
            <ul className="flex space-x-2">
                <li>
                    <Link to="/" className="text-gray-600 hover:text-blue-500">
                        Home
                    </Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    return (
                        <li key={to}>
                            <Link to={to} className="text-gray-600 hover:text-blue-500">
                                {value.charAt(0).toUpperCase() + value.slice(1)}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};