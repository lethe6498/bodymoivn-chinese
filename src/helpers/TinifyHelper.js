import { fetchWithId } from '../helpers/FileLoader';
import { getPort } from './enums/networkData';

// Tinify API配置
const TINIFY_API_URL = 'https://api.tinify.com/shrink';
const TINIFY_CN_URL = 'https://tinify.cn/shrink'; // 国内访问更稳定的接口

/**
 * 通过本地服务器读取图片文件
 * @param {string} imagePath - 图片文件路径
 * @returns {Promise<Buffer>} 图片文件数据
 */
async function readImageFile(imagePath) {
    try {
        const response = await fetchWithId(`http://localhost:${getPort()}/readFile/`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                path: encodeURIComponent(imagePath)
            })
        });
        
        if (response.ok) {
            const arrayBuffer = await response.arrayBuffer();
            return new Uint8Array(arrayBuffer);
        }
        return null;
    } catch (error) {
        console.error('读取图片文件失败:', error);
        return null;
    }
}

/**
 * 通过本地服务器写入图片文件
 * @param {string} imagePath - 图片文件路径
 * @param {Buffer} imageData - 图片数据
 * @returns {Promise<boolean>} 是否写入成功
 */
async function writeImageFile(imagePath, imageData) {
    try {
        const response = await fetchWithId(`http://localhost:${getPort()}/writeFile/`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/octet-stream'
            },
            body: JSON.stringify({
                path: encodeURIComponent(imagePath),
                data: btoa(String.fromCharCode.apply(null, imageData))
            })
        });
        
        return response.ok;
    } catch (error) {
        console.error('写入图片文件失败:', error);
        return false;
    }
}

/**
 * 解析图片路径
 * @param {string} imagePath - 图片路径
 * @returns {Object} 解析后的路径信息
 */
function parseImagePath(imagePath) {
    const lastSlash = imagePath.lastIndexOf('/');
    const lastDot = imagePath.lastIndexOf('.');
    
    return {
        dir: imagePath.substring(0, lastSlash),
        name: imagePath.substring(lastSlash + 1, lastDot),
        ext: imagePath.substring(lastDot)
    };
}

/**
 * 使用 TinyPNG/Tinify.cn API 压缩图片
 * @param {string} imagePath - 图片文件路径
 * @param {number} compressionRate - 压缩质量 (0-100，但Tinify使用智能压缩，此参数仅作参考)
 * @returns {Promise<Object>} 返回压缩后的图片信息
 */
async function compressImageWithTinify(imagePath, compressionRate = 80) {
    try {
        // 通过CEP接口读取图片文件
        const imageBuffer = await readImageFile(imagePath);
        if (!imageBuffer) {
            throw new Error(`图片文件不存在或读取失败: ${imagePath}`);
        }
        
        // 首先尝试使用 tinify.cn (国内更稳定)
        let apiUrl = TINIFY_CN_URL;
        let response;
        
        try {
            response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'User-Agent': 'Bodymovin Extension'
                },
                body: imageBuffer
            });
        } catch (error) {
            // 如果 tinify.cn 失败，尝试官方API
            console.log('Tinify.cn 失败，尝试官方API:', error.message);
            apiUrl = TINIFY_API_URL;
            response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'User-Agent': 'Bodymovin Extension'
                },
                body: imageBuffer
            });
        }

        if (!response.ok) {
            throw new Error(`Tinify API 错误: ${response.status} ${response.statusText}`);
        }

        // 获取压缩后的图片数据
        const compressedBuffer = await response.arrayBuffer();
        const compressedData = new Uint8Array(compressedBuffer);

        // 生成压缩后的文件路径
        const parsedPath = parseImagePath(imagePath);
        const compressedPath = `${parsedPath.dir}/${parsedPath.name}_compressed${parsedPath.ext}`;

        // 通过CEP接口保存压缩后的图片
        await writeImageFile(compressedPath, compressedData);

        // 获取文件大小信息用于统计
        const originalSize = imageBuffer.length;
        const compressedSize = compressedData.length;
        const compressionRatio = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);

        console.log(`Tinify压缩完成: ${parsedPath.name}${parsedPath.ext}`);
        console.log(`原始大小: ${(originalSize / 1024).toFixed(1)}KB`);
        console.log(`压缩后大小: ${(compressedSize / 1024).toFixed(1)}KB`);
        console.log(`压缩率: ${compressionRatio}%`);

        return {
            path: compressedPath,
            extension: parsedPath.ext.substring(1), // 去掉点号
            originalSize,
            compressedSize,
            compressionRatio
        };

    } catch (error) {
        console.error('Tinify压缩失败:', error.message);
        // 压缩失败时返回原始图片信息
        const parsedPath = parseImagePath(imagePath);
        return {
            path: imagePath,
            extension: parsedPath.ext.substring(1),
            error: error.message
        };
    }
}

/**
 * 批量压缩图片
 * @param {Array} imagePaths - 图片路径数组
 * @param {number} compressionRate - 压缩质量
 * @returns {Promise<Array>} 返回压缩结果数组
 */
async function compressMultipleImages(imagePaths, compressionRate = 80) {
    const results = [];
    
    for (const imagePath of imagePaths) {
        try {
            const result = await compressImageWithTinify(imagePath, compressionRate);
            results.push({
                originalPath: imagePath,
                ...result
            });
            
            // 添加延迟避免API限制
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            results.push({
                originalPath: imagePath,
                path: imagePath,
                error: error.message
            });
        }
    }
    
    return results;
}

/**
 * 检查Tinify服务是否可用
 * @returns {Promise<boolean>} 服务是否可用
 */
async function checkTinifyService() {
    try {
        // 创建一个1x1像素的PNG测试图片
        const testImageBuffer = new Uint8Array([
            0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
            0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
            0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, 0x00, 0x00, 0x00,
            0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0x99, 0x01, 0x01, 0x00, 0x00, 0x00,
            0xFF, 0xFF, 0x00, 0x00, 0x00, 0x02, 0x00, 0x01, 0xE2, 0x21, 0xBC, 0x33,
            0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
        ]);

        // 先测试 tinify.cn
        try {
            const response = await fetch(TINIFY_CN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'User-Agent': 'Bodymovin Extension'
                },
                body: testImageBuffer
            });
            
            if (response.ok) {
                console.log('Tinify.cn 服务可用');
                return true;
            }
        } catch (error) {
            console.log('Tinify.cn 不可用，测试官方API');
        }

        // 测试官方API
        const response = await fetch(TINIFY_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream',
                'User-Agent': 'Bodymovin Extension'
            },
            body: testImageBuffer
        });

        const isAvailable = response.ok;
        console.log(`Tinify官方API ${isAvailable ? '可用' : '不可用'}`);
        return isAvailable;

    } catch (error) {
        console.error('Tinify服务检查失败:', error.message);
        return false;
    }
}

export {
    compressImageWithTinify,
    compressMultipleImages,
    checkTinifyService
};

export default compressImageWithTinify;