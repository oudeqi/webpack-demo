// __webpack_public_path__ = process.env.PUBLIC_PATH;
import '../../assets/scripts/common.js';
import '../../assets/styles/common.css';
import './index.css';

const getQueryString = function (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'),
    	r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}

const getRequest = function () {
    let url = location.search,
    	theRequest = new Object();
    if (url.indexOf('?') !== -1) {
        let str = url.substr(1),
        	strs = str.split('&');
        for(let i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1]);
        }
    }
    return theRequest;
}

let maps = require('../../assets/data/index.js').default;

maps.forEach((item,index,array) => {
	if(getRequest().id && getRequest().id == item.id){
		$('#detail .page-header').show().find('h1').text(item.name);
		$('#detail .alert').show().find('a').text(item.git || '无').prop('href', item.git || 'javascript:void(0);');
		if(!!item.desc && item.desc.length > 0){
			$('#detail .list').show();
			item.desc.forEach((str, idx) => {
				$('#detail .list').append('<li>' + (idx+1+ '. ') + str + '</li>');
			});
		}
		if(!!item.preview){
			$('#detail .preview').show().find('a').prop('href', item.preview);
		}
		if(item.cutPic.length > 0){
			item.cutPic.forEach(str => {
				let domStr = `<div class="col-xs-12">
								<img src="${str}" alt="">
							</div>`
				$('#detail .row').append(domStr);
			});
		}
		
	}
});
