// Tinify压缩服务
const TINIFY_CN_URL = 'https://tinify.cn/shrink';
const TINIFY_API_URL = 'https://api.tinify.com/shrink';

/**
 * 使用Tinify.cn压缩图片
 * @param {ArrayBuffer} imageData - 图片数据
 * @param {number} quality - 压缩质量 (0-100，Tinify使用智能压缩)
 * @returns {Promise<ArrayBuffer>} 压缩后的图片数据
 */
async function compressWithTinify(imageData, quality = 80) {
    try {
        // 先尝试tinify.cn
        let response;
        try {
            response = await fetch(TINIFY_CN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'User-Agent': 'Bodymovin Extension'
                },
                body: imageData
            });
        } catch (error) {
            console.log('Tinify.cn不可用，尝试官方API');
            // 回退到官方API
            response = await fetch(TINIFY_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'User-Agent': 'Bodymovin Extension'
                },
                body: imageData
            });
        }

        if (!response.ok) {
            throw new Error(`Tinify API错误: ${response.status}`);
        }

        const compressedData = await response.arrayBuffer();
        console.log(`Tinify压缩成功: ${(imageData.byteLength / 1024).toFixed(1)}KB -> ${(compressedData.byteLength / 1024).toFixed(1)}KB`);
        
        return compressedData;
    } catch (error) {
        console.error('Tinify压缩失败:', error.message);
        throw error;
    }
}

/**
 * 检查Tinify服务状态
 * @returns {Promise<boolean>} 服务是否可用
 */
async function checkTinifyAvailable() {
    try {
        // 使用1x1像素的PNG测试
        const testPNG = new Uint8Array([
            0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
            0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
            0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, 0x00, 0x00, 0x00,
            0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0x99, 0x01, 0x01, 0x00, 0x00, 0x00,
            0xFF, 0xFF, 0x00, 0x00, 0x00, 0x02, 0x00, 0x01, 0xE2, 0x21, 0xBC, 0x33,
            0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
        ]);

        // 先测试tinify.cn
        try {
            const response = await fetch(TINIFY_CN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/octet-stream',
                    'User-Agent': 'Bodymovin Extension'
                },
                body: testPNG
            });
            
            if (response.ok) {
                console.log('Tinify.cn 服务可用');
                return true;
            }
        } catch (error) {
            // tinify.cn不可用，测试官方API
        }

        // 测试官方API
        const response = await fetch(TINIFY_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream',
                'User-Agent': 'Bodymovin Extension'
            },
            body: testPNG
        });

        const available = response.ok;
        console.log(`Tinify官方API ${available ? '可用' : '不可用'}`);
        return available;

    } catch (error) {
        console.error('Tinify服务检查失败:', error.message);
        return false;
    }
}

export {
    compressWithTinify,
    checkTinifyAvailable
};