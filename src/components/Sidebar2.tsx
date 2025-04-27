// components/Sidebar.tsx
'use client'
import { useState } from 'react';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string | null>(null);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (name: string) => {
        setSelected(name);
    };

    return (
        <div className={`flex ${isOpen ? 'w-64' : 'w-16'} transition-all bg-gray-800 h-screen`}>
            <div className="flex flex-col items-center py-4">
                <button
                    className="text-white mb-4"
                    onClick={toggleSidebar}
                >
                    {isOpen ? 'Close' : 'Open'}
                </button>
                <nav className="flex flex-col items-center space-y-4">
                    <button
                        className={`text-white p-2 ${selected === 'home' ? 'bg-blue-500' : 'hover:bg-gray-700'} rounded-full`}
                        onClick={() => handleSelect('home')}
                    >
                        <FaHome size={24} />
                        {isOpen && <span className="text-sm">Home</span>}
                    </button>
                    <button
                        className={`text-white p-2 ${selected === 'user' ? 'bg-blue-500' : 'hover:bg-gray-700'} rounded-full`}
                        onClick={() => handleSelect('user')}
                    >
                        <FaUser size={24} />
                        {isOpen && <span className="text-sm">User</span>}
                    </button>
                    <button
                        className={`text-white p-2 ${selected === 'settings' ? 'bg-blue-500' : 'hover:bg-gray-700'} rounded-full`}
                        onClick={() => handleSelect('settings')}
                    >
                        <FaCog size={24} />
                        {isOpen && <span className="text-sm">Settings</span>}
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;