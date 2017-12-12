// __webpack_public_path__ = process.env.PUBLIC_PATH;
console.log(process.env.PUBLIC_PATH);
import '../../assets/scripts/common.js';
import '../../assets/styles/common.css';
import './index.css';
import '../../components/jumbotron/jumbotron.js';

// 测试模拟数据
$.get('http://localhost:3005/employee/123', function(res){
	console.log(res);
})

//当前页面选中
$('[data-flag="index"]').addClass('active');

/*调整附加导航栏宽度*/
var leftNavWidth = $('#spyTarget').width();
$('.affixNav').width(leftNavWidth);

/*滚动监听*/
var dataOffsetTop = $('.navbar').height() + $('.jumbotron').outerHeight();
$('.affixNav').attr('data-offset-top',dataOffsetTop);

$(window).resize(function(){
	/*调整附加导航栏宽度*/
	leftNavWidth = $('#spyTarget').width();
	$('.affixNav').width(leftNavWidth);
	
	/*滚动监听*/
	dataOffsetTop = $('.navbar').height() + $('.jumbotron').outerHeight();
	$('.affixNav').attr('data-offset-top',dataOffsetTop);
});

// 生成列表
let maps = require('../../assets/data/index.js').default;
maps.forEach(item => {
	let domStr=`<div class="col-xs-6 col-sm-6 col-md-4">
					<a href="./project-detail.html?id=${item.id}" class="thumbnail">
						<div class="aspect-box" aspect-ratio="16:10">
							<div class="aspect-box-content">
								<img src="${item.cover}" alt="...">
							</div>
						</div>
						<span>${item.name}</span>
				    </a>
				</div>`;
	if(item.type === 0){
		$('#pc .row').append(domStr);
	}else{
		$('#yd .row').append(domStr);
	}
});