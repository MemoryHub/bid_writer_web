'use client'

import React, { useEffect, useRef, useState } from 'react';

/**
 * SplitContainer 组件
 * 功能：
 * 1. 提供可拖动的分割线，允许用户调整左右面板的宽度
 * 2. 根据设备类型（移动端或桌面端）动态调整面板的模糊效果
 * 3. 支持左右面板内容的自定义
 */
interface SplitContainerProps {
    left_container: React.ReactNode;  // 左侧面板内容
    right_container: React.ReactNode; // 右侧面板内容
}

const SplitContainer: React.FC<SplitContainerProps> = ({ left_container, right_container }) => {
    // ==================== 状态管理 ====================
    const [splitPosition, setSplitPosition] = useState(60);  // 分割线位置，默认60%
    const [showLeftBlur, setShowLeftBlur] = useState(false);  // 左侧面板模糊状态
    const [showRightBlur, setShowRightBlur] = useState(false);  // 右侧面板模糊状态
    const [isMobile, setIsMobile] = useState(false);  // 设备类型标识
    const isDragging = useRef(false);  // 拖动状态标识
    const splitContainerRef = useRef<HTMLDivElement>(null);  // 分割容器引用

    // ==================== 设备检测 ====================
    /**
     * 检测设备类型并监听窗口大小变化
     * 目的：根据屏幕宽度判断是否为移动设备，以应用不同的阈值
     */
    useEffect(() => {
        const checkDevice = () => {
            setIsMobile(window.innerWidth <= 768);  // 768px作为移动设备断点
        }

        checkDevice();  // 初始检查设备类型
        window.addEventListener('resize', checkDevice);  // 监听窗口大小变化
        return () => window.removeEventListener('resize', checkDevice);  // 清理事件监听
    }, []);

    // ==================== 拖动处理 ====================
    /**
     * 处理分割线拖动开始
     * 目的：初始化拖动状态，设置鼠标样式，禁用文本选择
     */
    const handleMouseDown = () => {
        isDragging.current = true;  // 设置拖动状态为true
        document.body.style.cursor = 'col-resize';  // 更改鼠标样式
        document.body.style.userSelect = 'none';  // 禁用文本选择
    }

    /**
     * 处理分割线拖动过程
     * 目的：
     * 1. 跟踪鼠标移动更新分割线位置
     * 2. 限制拖动范围在20%-80%之间
     * 3. 清理拖动结束状态
     */
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current || !splitContainerRef.current) return;  // 如果未拖动或引用无效则返回

            const containerRect = splitContainerRef.current.getBoundingClientRect();  // 获取容器边界
            const containerWidth = containerRect.width;  // 容器宽度
            const mouseX = e.clientX - containerRect.left;  // 鼠标相对容器的X坐标
            const newPosition = (mouseX / containerWidth) * 100;  // 计算新的分割位置百分比

            // 限制拖动范围
            if (newPosition >= 20 && newPosition <= 80) {
                setSplitPosition(newPosition);  // 更新分割位置
            }
        }

        const handleMouseUp = () => {
            isDragging.current = false;  // 设置拖动状态为false
            document.body.style.cursor = 'default';  // 恢复鼠标样式
            document.body.style.userSelect = 'auto';  // 恢复文本选择
        }

        document.addEventListener('mousemove', handleMouseMove);  // 监听鼠标移动
        document.addEventListener('mouseup', handleMouseUp);  // 监听鼠标释放

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);  // 清理鼠标移动监听
            document.removeEventListener('mouseup', handleMouseUp);  // 清理鼠标释放监听
        }
    }, []);

    // ==================== 模糊效果控制 ====================
    /**
     * 监听分割位置变化，控制模糊效果
     * 目的：
     * 1. 当面板宽度小于阈值时显示模糊效果
     * 2. 移动端和桌面端使用不同阈值（移动端45%，桌面端25%）
     */
    useEffect(() => {
        const checkWidth = () => {
            const threshold = isMobile ? 45 : 25;  // 根据设备类型设置阈值
            // 检查左侧区域宽度
            if (splitPosition < threshold) {
                setShowLeftBlur(true);  // 显示左侧模糊效果
            } else {
                setShowLeftBlur(false);  // 隐藏左侧模糊效果
            }

            // 检查右侧区域宽度
            if ((100 - splitPosition) < threshold) {
                setShowRightBlur(true);  // 显示右侧模糊效果
            } else {
                setShowRightBlur(false);  // 隐藏右侧模糊效果
            }
        }
        checkWidth();  // 初始检查宽度
    }, [splitPosition, isMobile]);  // 依赖于分割位置和设备类型

    return (
        <>
            {/* 内容部分 */}
            <div className="flex-1 flex flex-col">
                {/* 分割区域 */}
                <div
                    ref={splitContainerRef}
                    className="flex-1 flex relative"
                >
                    {/* 左侧面板 */}
                    <div
                        className="bg-[#212121] overflow-auto relative"
                        style={{ width: `${splitPosition}%` }}  // 设置左侧面板宽度
                    >
                        {/* 左侧模糊背景层 */}
                        {showLeftBlur && (
                            <div className="absolute inset-0 backdrop-blur-md bg-black/30 z-10 flex items-center justify-center">
                                <div className="text-white/50 text-sm">内容已隐藏</div>  {/* 模糊提示 */}
                            </div>
                        )}

                        {/* 原有内容 */}
                        <div className={`h-full flex flex-col ${showLeftBlur ? 'invisible' : ''}`}>
                            {left_container}  {/* 渲染左侧面板内容 */}
                        </div>
                    </div>

                    {/* 分割线 */}
                    <div
                        className="w-[5px] relative cursor-col-resize group"
                        onMouseDown={handleMouseDown}  // 处理鼠标按下事件
                    >
                        {/* 渐变背景分割线 */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-400 to-transparent opacity-80" />

                        {/* 拖动把手 */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[200px] bg-gradient-to-b from-transparent via-gray-600 to-transparent opacity-80 group-hover:via-gray-500 transition-colors" />
                    </div>

                    {/* 右侧面板 */}
                    <div
                        className="bg-[#212121] overflow-auto relative"
                        style={{ width: `${100 - splitPosition}%` }}  // 设置右侧面板宽度
                    >
                        {/* 右侧模糊背景层 */}
                        {showRightBlur && (
                            <div className="absolute inset-0 backdrop-blur-md bg-black/30 z-10 flex items-center justify-center">
                                <div className="text-white/50 text-sm">内容已隐藏</div>  {/* 模糊提示 */}
                            </div>
                        )}

                        {/* 右侧原有内容 */}
                        <div className={`h-full flex flex-col ${showRightBlur ? 'invisible' : ''}`}>
                            {right_container}  {/* 渲染右侧面板内容 */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SplitContainer;