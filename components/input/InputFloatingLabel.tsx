'use client'

interface InputFloatingLabelProps {
    type: string; // 输入框类型
    label: string; // 标签文本
    onChange: (value: number) => void; // 监听回调
    value: number; // 输入框的值
}

export default function InputFloatingLabel({ type, label, onChange, value }: InputFloatingLabelProps) {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        onChange(value); // 调用回调函数
    };

    return (
        <div>
            <div className="relative">
                <input
                    type={type}
                    value={value}
                    id={`input-${label}`} // 确保每个输入框有唯一的ID
                    className="peer py-4 px-0 block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent text-sm placeholder:text-transparent focus:outline-none focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400"
                    placeholder=" "
                    onChange={handleInputChange} // 监听输入变化
                />
                <label
                    htmlFor={`input-${label}`}
                    className="absolute left-0 top-0 py-4 px-0 h-full text-sm truncate pointer-events-none transition-all duration-200 origin-[0_0] 
                    text-white dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                    peer-focus:scale-75
                    peer-focus:-translate-y-4
                    peer-[:not(:placeholder-shown)]:scale-75
                    peer-[:not(:placeholder-shown)]:-translate-y-4"
                >
                    {label}
                </label>
            </div>
        </div>
    );
}