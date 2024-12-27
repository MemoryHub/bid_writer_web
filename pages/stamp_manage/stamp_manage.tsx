import React, { useEffect, useState } from 'react'; // 导入React和useState钩子
import UploadButton from '@/components/button/UploadButton'; // 导入上传按钮组件
import { getStampList, uploadMultipleStamp } from '@/services/stampServices';
import Alert from '@/components/alert/Alert';

interface StampManageProps { // 定义StampManage组件的属性接口
    onImageSelect: (index: number, path: string) => void; // 选择图像的回调函数
}

const StampManage: React.FC<StampManageProps> = ({ onImageSelect }) => { 
    // 定义StampManage组件
    const [selectedImage, setSelectedImage] = useState<number | null>(null); 
    // 选中删除图像索引状态
    const [selectedDeleteImages, setSelectedDeleteImages] = useState<number[]>([]);
    // 选中的图像索引状态
    const [isBatchDeleteMode, setIsBatchDeleteMode] = useState(false); 
    const [stampImages, setImages] = useState<string[]>([]); // 用于存储真实数据
    const [showAlert, setShowAlert] = useState(false)
    const [alertType, setAlertType] = useState<'success' | 'error'>('success')
    const [alertTitle, setAlertTitle] = useState('')
    const [alertMsg, setAlertMsg] = useState('')
    const [loading, setLoading] = useState(false)

    // 获取印章列表
    useEffect(() => {
        const fetchStampList = async () => {
            try {
                const images = await getStampList(); // 调用接口获取印章列表
                if (images) { // Check if images is not null or undefined
                    setImages(images); // 更新状态
                } else {
                    console.error('获取印章列表失败: 返回的图像列表为空');
                }
            } catch (error) {
                console.error('获取印章列表失败:', error);
            }
    }
    fetchStampList(); // 调用获取印章列表的函数
},[]);


    const toggleSelectImage = (index: number) => { // 切换选择图像的函数
        if (isBatchDeleteMode) {
            // 在批量删除模式下，更新选中的删除图像
            setSelectedDeleteImages(prev => {
                if (prev.includes(index)) {
                    return prev.filter(i => i !== index); // 取消选择
                } else {
                    return [...prev, index]; // 添加选择
                }
            });
        } else {
            // 普通模式下的单选逻辑
            setSelectedImage(prev => { // 更新选中的图像状态
                const newIndex = prev === index ? null : index; // 如果当前图像已选中，则取消选择
                if (newIndex !== null) { // 如果选择了新图像
                    onImageSelect(newIndex, stampImages[newIndex]); // 调用回调函数传递新图像信息
                } else { // 如果取消选择
                    onImageSelect(-1, ''); // 调用回调函数传递无效图像信息
                }
                return newIndex; // 返回新的选中索引
            });
        }
    };

    const handleUploadStamp = async (files: File[]) => {
        try {
            setLoading(true);
            const response = await uploadMultipleStamp(files);
            setLoading(false);
            setAlertType('success');
            setAlertTitle('上传成功');
            setAlertMsg('文件上传成功');
            setShowAlert(true);

            try {
                const images = await getStampList(); // 调用接口获取印章列表
                if (images) { // Check if images is not null or undefined
                    setImages(images); // 更新状态
                } else {
                    console.error('获取印章列表失败: 返回的图像列表为空');
                }
            } catch (error) {
                console.error('获取印章列表失败:', error);
            }
        } catch (error) {
            setAlertType('error');
            setAlertTitle('上传失败');
            setAlertMsg('文件上传失败');
            setShowAlert(true);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    const handleBatchDelete = () => { // 处理批量删除的函数
        setIsBatchDeleteMode(true); // 设置为批量删除模式
    };

    const handleCancelDelete = () => { // 处理取消删除的函数
        setIsBatchDeleteMode(false); // 退出批量删除模式
        setSelectedDeleteImages([]); // 清空选中的删除图像
    };

    const handleConfirmDelete = () => { // 处理确认删除的函数
        console.log('确认删除选中的印章:', selectedDeleteImages);
        // 在这里处理删除逻辑
        setIsBatchDeleteMode(false); // 退出批量删除模式
        setSelectedDeleteImages([]); // 清空选中的删除图像
    };

    return ( // 返回组件的UI
        <>
            <div className='flex items-center'> 
                <UploadButton text='上传印章' allowedTypes={['.png', '.jpg', '.jpeg']} onChange={handleUploadStamp} loading={loading}/> 
              
                {isBatchDeleteMode ? (
                    <div className="ml-4 flex items-center">
                        <button 
                            className="text-white px-2 py-1 rounded mr-2"
                            onClick={handleCancelDelete}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> 
                            </svg>
                        </button>
                        <button 
                            className="text-red-500 px-2 py-1 rounded"
                            onClick={handleConfirmDelete}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2M6 6v12a2 2 0 002 2h8a2 2 0 002-2V6H6z" /> 
                            </svg>
                        </button>
                    </div>
                ):  <button 
                className="ml-4 text-black px-2 py-1 rounded"
                onClick={handleBatchDelete}
            >
                <span className='text-xs text-white'>选择</span>
            </button>}
            </div>

            <div className='bg-gray-200 mt-6 p-4 rounded-xl shadow-md'> 
                <div className={`grid grid-cols-5 gap-4`}> 
                    {stampImages.map((src, index) => ( // 遍历模拟图像数组
                        <div key={index} className={`rounded-xl relative w-full h-0 pb-[100%] cursor-pointer ${isBatchDeleteMode ? (selectedDeleteImages.includes(index) ? 'border-4 border-red-600' : '') : (selectedImage === index ? 'border-4 border-green-600' : '')}`} onClick={() => toggleSelectImage(index)}> 
                            <img src={src} alt={`Stamp ${index + 1}`} className="absolute top-0 left-0 w-full h-full object-cover rounded-xl" /> 
                            {selectedDeleteImages.includes(index) && isBatchDeleteMode && ( // 在批量删除模式下显示红色选中样式
                                <>
                                    <div className="absolute inset-0 bg-gradient-to-t from-red-600 to-transparent" />
                                    <svg className="absolute bottom-2 right-2 w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> 
                                    </svg>
                                </>
                            )}
                            {selectedImage === index && !isBatchDeleteMode && ( // 仅在普通模式下显示绿色选中样式
                                <>
                                    <div className="absolute inset-0 bg-gradient-to-t from-green-600 to-transparent" /> 
                                    <svg className="absolute bottom-2 right-2 w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /> 
                                    </svg>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {showAlert && (
        <Alert
          type={alertType}
          title={alertTitle}
          msg={alertMsg}
          onClose={() => setShowAlert(false)}
        />
      )}
        </>
    );
};

export default StampManage; // 导出StampManage组件