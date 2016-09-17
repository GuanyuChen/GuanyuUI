// 基本图文组件对象
// 要接受onLoad onLeave事件

var ComponentBase = function(name, config) {
	var config = config || {}; // 如果没传config那么默认传一个空对象
	var id = ('com_' + Math.random()).replace('.', '_'); //为每个图文组件随机分配一个id

	// 把当前组件类型添加到类名中进行标记
	var cla = 'component_' + config.type;
	var component = $('<div class="component ' + cla + ' component_name_' + name + '" id="' + id + '"></div>'); // 新建一个空白div作为组件的基本

	// 对传入配置参数的解析
	config.text && component.text(config.text);
	config.width && component.width(config.width / 2);
	config.height && component.height(config.height / 2);

	config.css && component.css(config.css);
	config.bg && component.css('backgroundImage', 'url(' + config.bg + ')');
	config.bgc && component.css('backgroundColor', config.bgc);

	if (config.center === true) {
		component.css({
			marginLeft: (config.width / 4 * -1) + 'px',
			left: '50%'
		})
	}

	// 为组件绑定Load、Leave事件
	component.on('onLoad', function() {
		$(this).addClass(cla + '_load').removeClass(cla + '_leave');
		config.animateIn && component.animate(config.animateIn);

		if (config.relativeTo) {
			$(this).remove() // 把当前dom从body上删除
				// 第一次选择器选择出来的是DOM对象 经过再一次$()的包裹把它变成jQuery对象，便可以使用append方法
			$($('.component_name_' + config.relativeTo)[0]).append(this);
			console.log(1);
		}
		return false; // 阻止事件默认行为 
	});
	component.on('onLeave', function() {
		$(this).addClass(cla + '_leave').removeClass(cla + '_load');
		config.animateOut && component.animate(config.animateOut);
		return false;
	});

	return component;
}


// 1、relativeTo 的逻辑可以用 CSS 的 translate 实现、也可以通过 JS 修改其 DOM 结构（把自身添加到 retaveTo指向的元素）中实现。
// 2、CSS的translate 实现，其位置取值不能直接使用 css 的设置，而应用其最终表现出来的实际 offsetTop、offsetLeft。
// 3、CSS的translate 实现，应考虑 cfg.center 参数带来的影响，如果为 true，则不应该进行 translateX 的设置（因为已然设置中水平居中）。
// 4、组件的逻辑是返回一个 DOM 元素，所以relativeTo参数的支持，在修改 DOM 元素结构实现时，不能在初始化时实现，而应在 onLoad 的时实现。