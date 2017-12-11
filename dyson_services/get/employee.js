var g = require('dyson-generators');

module.exports = {
	path: '/employee/:id',
	template: {
		id: function(params) {
            return params.id;
        },
        name: g.name,
        age: 10,
        status: 'OK'
    }
};
