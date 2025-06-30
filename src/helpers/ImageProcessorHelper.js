import { getPort } from './enums/networkData';
import { fetchWithId } from '../helpers/FileLoader';
import { compressImageWithTinify, checkTinifyService } from './TinifyHelper';
var path = require('path');
path.parse = function(_path){
	return {
		dir:''
	}
}

// 缓存Tinify服务状态
let tinifyServiceAvailable = null;
let lastServiceCheck = 0;
const SERVICE_CHECK_INTERVAL = 300000; // 5分钟检查一次

async function compressImage(imagePath, compression_rate) {
	imagePath = imagePath.replace(/\\/g, '/')
	
	// 检查Tinify服务是否可用（带缓存）
	const now = Date.now();
	if (tinifyServiceAvailable === null || (now - lastServiceCheck) > SERVICE_CHECK_INTERVAL) {
		console.log('检查Tinify服务状态...');
		tinifyServiceAvailable = await checkTinifyService();
		lastServiceCheck = now;
	}

	// 优先使用Tinify压缩
	if (tinifyServiceAvailable) {
		try {
			console.log('使用Tinify.cn进行图片压缩...');
			const result = await compressImageWithTinify(imagePath, compression_rate);
			if (!result.error) {
				return {
					path: result.path,
					extension: result.extension,
					compressionMethod: 'tinify'
				};
			} else {
				console.log('Tinify压缩失败，回退到本地压缩:', result.error);
			}
		} catch (error) {
			console.log('Tinify压缩异常，回退到本地压缩:', error.message);
		}
	}

	// 回退到原始的本地压缩方法
	console.log('使用本地服务器进行图片压缩...');
	return new Promise((resolve, reject) => {
		fetchWithId(`http://localhost:${getPort()}/processImage/`, 
			{
				method: 'post',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					path: encodeURIComponent(imagePath),
					compression: compression_rate
				})
			})
		.then(async (response) => {
			const jsonResponse = await response.json()
			if (jsonResponse.status === 'error') {
				resolve({
					path: imagePath,
					extension: 'png',
					compressionMethod: 'none'
				})
			} else {
				setTimeout(() => {
					resolve({
						path: jsonResponse.path,
						extension: jsonResponse.extension,
						compressionMethod: 'local'
					})
				}, 1)
			}
		})
		.catch((err) => {
			console.log('本地压缩也失败了:', err)
			resolve({
				path: imagePath,
				extension: 'png',
				compressionMethod: 'none'
			})
		})
	})
}

function handleImageCompression(path, settings) {
	if(settings.should_compress) {
		return compressImage(path, settings.compression_rate)
	} else {
		return Promise.resolve({
			path,
			extension: 'png',
		})
	}
}

async function getEncodedFile(path) {
	const encodedImageResponse = await fetchWithId(`http://localhost:${getPort()}/encode/`, 
	{
		method: 'post',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			path: encodeURIComponent(path),
		})
	})
	const jsonResponse = await encodedImageResponse.json()
	return jsonResponse.data

}

async function processImage(actionData) {
	let path = actionData.path

	try {

		if (!actionData.should_encode_images && !actionData.should_compress) {
			return {
				encoded: false,
			}
		}
		const imageCompressedData = await handleImageCompression(path, actionData)

		if (actionData.should_encode_images) {

			const imagePath = imageCompressedData.extension === 'png' ? 
				imageCompressedData.path
				:
				imageCompressedData.path.substr(0, imageCompressedData.path.lastIndexOf('.png')) + '.jpg'

			var fileExtension = imagePath.substr(imagePath.lastIndexOf('.') + 1)

			let encodedImage = await getEncodedFile(imagePath)

			if (actionData.assetType === 'audio') {
				encodedImage = `data:audio/mp3;base64,${encodedImage}`
			} else {
				encodedImage = `data:image/${fileExtension === 'png' ? 'png' : 'jpeg'};base64,${encodedImage}`
			}
			return {
				encoded_data: encodedImage,
				encoded: true,
				extension: imageCompressedData.extension
			}
			// const image = await loadImage(imagePath)
			// return await encode(image, actionData)
		} else {
			return {
				new_path: imageCompressedData.path,
				encoded: false,
				extension: imageCompressedData.extension
			}
		}
	} catch(err) {
		return {
			encoded: false,
		}
	}
}

export default processImage