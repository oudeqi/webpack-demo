// __webpack_public_path__ = process.env.PUBLIC_PATH;

import '../../assets/scripts/common.js';
import '../../assets/styles/common.css';
import './index.css';

document.body.addEventListener('touchstart', function () { });

var src = '';

$('#myModal').on('show.bs.modal', function (e) {
	// console.log($('#modal-img').attr('src'))
	$('#modal-img').attr('src', src)
}).on('hidden.bs.modal', function (e) {
	src = '';
})

$('.modal-dialog').click(function(e){
	if((e.target.className || '').indexOf('modal-dialog') !== -1){
		$('#myModal').modal('hide');
	}
});

$('.modal button').click(function(e){
	$('#myModal').modal('hide');
});

$('.content a').click(function(e){
	console.log($(this).find('img')[0].src)
	src = $(this).find('img')[0].src;
	$('#myModal').modal({
		keyboard: true,
		backdrop: true
	})
});

// 随机倾斜角度
// $('.content a img').each(function(index, item){
// 	let deg = Math.round(Math.random()*35 + 9);
// 	let sign = Math.round(Math.random()*10) % 2 === 0 ? '' : '-';
// 	$(item).css('transform', 'rotate('+ sign + deg +'deg)');
// })

