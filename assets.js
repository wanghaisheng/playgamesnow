const pwaAssetGenerator = require('pwa-asset-generator')

;(async () => {
	const { savedImages, htmlMeta, manifestJsonContent } = await pwaAssetGenerator.generateImages(
		'./assets/assets/logo/download.png',
		'./public',
		{
			scrape: false,
			background: '#ffffff',
			splashOnly: true,
			portraitOnly: true,
			log: false,
		},
	)
})()

// Access to static data for Apple Device specs that are used for generating launch images
const appleDeviceSpecsForLaunchImages = pwaAssetGenerator.appleDeviceSpecsForLaunchImages