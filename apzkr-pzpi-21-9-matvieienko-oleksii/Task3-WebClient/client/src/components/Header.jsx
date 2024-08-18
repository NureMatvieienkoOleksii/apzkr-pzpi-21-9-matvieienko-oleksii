import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown, User, House, MapPin, Calendar, Star, Plane, Shield, Cloud, Users } from 'lucide-react';
import './Header.css';

const Header = () => {
    const [activeItem, setActiveItem] = useState(null);

    const handleItemClick = (itemName) => {
        setActiveItem(itemName === activeItem ? null : itemName);
    };

    const navItems = [
        {
            name: 'Home',
            icon: <House />,
            path: '/'
        },
        {
            name: 'Users',
            icon: <User size={16} />,
            subItems: ['Users', 'Tourists', 'Guides', 'Drone Operators', 'Admins']
        },
        {
            name: 'Routes',
            icon: <MapPin size={16} />,
            subItems: ['Routes', 'Route Points']
        },
        {
            name: 'Bookings',
            icon: <Calendar size={16} />,
        },
        {
            name: 'Reviews',
            icon: <Star size={16} />,
        },
        {
            name: 'Drones',
            icon: <Plane size={16} />,
            subItems: ['Drones', 'Drone Rentals', 'Drone Flights']
        },
        {
            name: 'Safety',
            icon: <Shield size={16} />,
            subItems: ['Safety Measures', 'Equipment']
        },
        {
            name: 'Conditions',
            icon: <Cloud size={16} />,
            subItems: ['Natural Conditions', 'Incidents']
        },
        {
            name: 'Assignments',
            icon: <Users size={16} />,
            subItems: ['Guide Assignments']
        },
    ];

    return (
        <nav className="navbar">
            <ul>
                {navItems.map((item) => (
                    <li key={item.name}>
                        {item.path ? (
                            <NavLink to={item.path} className={`nav-item ${activeItem === item.name ? 'active' : ''}`}>
                                {item.icon}
                                <span className="text-sm font-medium">{item.name}</span>
                            </NavLink>
                        ) : (
                            <button
                                className={`nav-item ${activeItem === item.name ? 'active' : ''}`}
                                onClick={() => handleItemClick(item.name)}
                            >
                                {item.icon}
                                <span className="text-sm font-medium">{item.name}</span>
                                {item.subItems && <ChevronDown size={12} className={`${activeItem === item.name ? 'rotate-180' : ''}`} />}
                            </button>
                        )}
                        {item.subItems && activeItem === item.name && (
                            <ul className="sub-menu">
                                {item.subItems.map((subItem) => (
                                    <li key={subItem}>
                                        <NavLink
                                            to={`/${subItem.toLowerCase().replace(' ', '-')}`}
                                        >
                                            {subItem}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Header;