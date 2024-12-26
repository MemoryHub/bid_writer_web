import React, { useState } from 'react';
import UploadButton from '@/components/button/UploadButton';

interface StampManageProps {
    onImageSelect: (index: number, path: string) => void;
}

const StampManage: React.FC<StampManageProps> = ({ onImageSelect }) => {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const mockImages = Array.from({ length: 7 }, (_, index) => `/img/stamp-test.jpg`);

    const toggleSelectImage = (index: number) => {
        setSelectedImage(prev => {
            const newIndex = prev === index ? null : index;
            if (newIndex !== null) {
                onImageSelect(newIndex, mockImages[newIndex]);
            } else {
                onImageSelect(-1, '');
            }
            return newIndex;
        });
    };

    return (
        <>
            <div>
                <UploadButton loading={false} text='上传印章' allowedTypes={['.png', '.jpg', '.jpeg']} />
            </div>

            <div className='bg-gray-200 mt-4 p-4 rounded-xl shadow-md'>
                <div className={`grid grid-cols-5 gap-4`}>
                    {mockImages.map((src, index) => (
                        <div key={index} className="rounded-xl relative w-full h-0 pb-[100%] cursor-pointer" onClick={() => toggleSelectImage(index)}>
                            <img src={src} alt={`Stamp ${index + 1}`} className="absolute top-0 left-0 w-full h-full object-cover rounded-xl" />
                            {selectedImage === index && (
                                <>
                                    <div className="absolute inset-0 border-4 border-green-600 rounded-xl" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-green-600 to-transparent rounded-xl" />
                                    <svg className="absolute bottom-2 right-2 w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default StampManage;