'use client'

import React, { useEffect, useState } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    buttonText: string;
    buttonColor: string;
    loading?: boolean; 
    onConfirm: () => void;
}

const ModalDark: React.FC<ModalProps> = ({ isOpen, onClose, title, message, buttonText, buttonColor, loading, onConfirm }) => {
    const [isVisible, setIsVisible] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 600); // Match duration with CSS transition
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible) return null; // Don't render the modal if it's not visible

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-[#212121] rounded-[40px] shadow-lg p-6 max-w-[400px] w-[90%] relative px-10 py-10 transition-transform duration-300 transform ${isOpen ? 'scale-100' : 'scale-95'}">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-white text-2xl mr-8 mt-3"
                >
                    &times; {/* Close button */}
                </button>
                <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
                <p className="text-sm text-gray-300 mb-6">{message}</p>
                <div className="flex justify-center">
                    <button
                        onClick={onConfirm}
                        disabled={loading} // Disable button when loading
                        className={`w-full bg-gradient-to-tl from-${buttonColor}-600 to-violet-600 hover:from-violet-600 hover:to-${buttonColor}-600 text-white rounded-[100px] px-4 py-2 hover:bg-blue-500 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <span className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                                <span className="ml-2 text-sm">加载中...</span>
                            </div>
                        ) : (
                            <span className="text-sm">{buttonText}</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalDark;
