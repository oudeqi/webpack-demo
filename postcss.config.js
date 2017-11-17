module.exports = function({file, options, env}){
	return {
		plugins: {
			'precss': {},
			// 'postcss-px-to-viewport': {
			// 	viewportWidth: 320,
			// 	viewportHeight: 568,
			// 	unitPrecision: 5,
			// 	viewportUnit: 'vw',
			// 	selectorBlackList: [],
			// 	minPixelValue: 1,
			// 	mediaQuery: false
			// },//px转vw
			'postcss-assets': {
				loadPaths: ['app/images/'],
				relative: true
			},
			'postcss-will-change': {},//给不支持will-change属性的浏览器触发GPU处理器
			'postcss-color-rgba-fallback': {},//给不支持rgba的ie8作降级处理
			'postcss-opacity': {},//给不支持opacity的ie8作降级处理
			'postcss-pseudoelements': {},//给不支持::伪元素的ie8作降级处理
			'postcss-vmin': {},//给不支持vmin的ie9作降级处理
			'postcss-calc': {},//尽可能让calc输出静态的值
			'postcss-at2x': {},//retina 2倍图片
			'postcss-write-svg': {},//在样式表的写svg // TODO 可能要废弃,与cssnano不兼容
			'postcss-aspect-ratio-mini': {},//长宽比效果
			// 'postcss-px2rem': {
			// 	remUnit: 32
			// },//px转rem
			'postcss-functions': {
				functions: {
			        px2rem: function (int) {
			        	return parseFloat(parseInt(int) / 32) + 'rem';
			        },
			        px2em: function (int, base) {
			        	return parseFloat(parseInt(int) / (base || 18)) + 'em';
			        }
			    }
			},//自定义函数 px2rem
			'postcss-responsive-type': {},//响应式文本
			'autoprefixer': env === 'production' ? options.autoprefixer : false,
			'postcss-mq-keyframes': {},//将所有关键帧从现有媒体查询中移动到样式表的底部
			'css-mqpacker': {},//相同的媒体查询样式合并到一个媒体查询中
			'cssnano': env === "production" ? {} : false
		}
	}
}