import React from "react";

interface HeaderDashboardProps {
    title: string;
    className?: string;
}

const HeaderDashboard: React.FC<HeaderDashboardProps> = ({ title, className = "" }) => {
    return (
        <div className={`flex mb-4 justify-between ${className}`}>
            <p className="text-xl font-semibold">{title}</p>
        </div>
    );
};

export default HeaderDashboard;