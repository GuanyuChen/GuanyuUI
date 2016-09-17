// 内容管理对象

var Main = function() {
	this.id = ('main_' + Math.random()).replace('.', '_');
	this.element = $('<div class="main" id="' + this.id + '">').hide(); // 新建一个div 并隐藏起来
	$('body').append(this.element); // 将div加到body上
	this.page = [];

	// 新增一个页 name
	this.addPage = function(name, text) {
		var page = $('<div class="main_page section">');

		if (name != undefined) {
			page.addClass('main_page_' + name);
		}
		if (text != undefined) {
			page.text(text);
		}
		this.element.append(page);
		this.page.push(page); //把新增的page放入数组中
		return this;
	}

	// 新增一个组件
	this.addComponent = function(name, config) {
		var config = config || {};
		config = $.extend({
			type: 'base'
		}, config); // 当传入的config中没有type属性时 为type属性设置一个默认值base

		var component;
		var page = this.page.slice(-1)[0]; // 取page最后一个DOM元素

		switch (config.type) {
			case 'base':
				component = new ComponentBase(name, config);
				page.append(component);
				break;
		}

		return this;
	}


	// main对象初始化加载
	this.loader = function() {
		this.element.fullpage({
			onLeave: function(index, nextIndex, direction) { // 页面离开
				$(this).find('.component').trigger('onLeave');
			},
			afterLoad: function(anchorLink, index) { // 页面载入完毕 anchorLink 锚点名称
				$(this).find('.component').trigger('onLoad');
			}
		});
		this.page[0].find('.component').trigger('onLoad');
		this.element.show(); //当所有page加载完毕调用此方法
	}
	return this;
}