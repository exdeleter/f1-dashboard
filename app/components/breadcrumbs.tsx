import { useLocation, Link } from "react-router";

type BreadcrumbItem = {
    label: string;
    path: string;
};

export function Breadcrumbs() {
    const location = useLocation();
    const pathname = location.pathname;

    // Разбиваем путь на сегменты
    const pathSegments = pathname.split("/").filter(Boolean);

    // Создаем breadcrumbs
    const breadcrumbs: BreadcrumbItem[] = [
        { label: "Home", path: "/" },
    ];

    // Добавляем остальные сегменты
    let currentPath = "";
    pathSegments.forEach((segment) => {
        currentPath += `/${segment}`;
        
        // Для числовых ID просто выводим ID
        if (/^\d+$/.test(segment)) {
            breadcrumbs.push({
                label: segment,
                path: currentPath,
            });
        } else {
            // Для обычных сегментов выводим с заглавной буквы
            const label = segment.charAt(0).toUpperCase() + segment.slice(1);
            breadcrumbs.push({
                label,
                path: currentPath,
            });
        }
    });

    // Если мы на главной странице, показываем только Home
    if (pathname === "/") {
        return (
            <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="text-white">Home</span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 text-sm text-gray-400">
            {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;
                
                return (
                    <span key={crumb.path} className="flex items-center gap-2">
                        {index > 0 && (
                            <span className="text-gray-600">/</span>
                        )}
                        {isLast ? (
                            <span className="text-white">{crumb.label}</span>
                        ) : (
                            <Link
                                to={crumb.path}
                                className="hover:text-white transition"
                            >
                                {crumb.label}
                            </Link>
                        )}
                    </span>
                );
            })}
        </div>
    );
}

