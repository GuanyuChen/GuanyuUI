// 柱图组件
// 基于基本图文组件

var ComponentBar = function(name, config) {
	var component = new ComponentBase(name, config);

	$.each(config.data, function(index, item) {
		// console.log(item);

		var line = $('<div class="line">'); // 一个完整的柱 会分成三部分
		var name = $('<div class="name">'); // 柱的名字部分
		var rate = $('<div class="rate">'); // 柱的进程部分
		var per = $('<div class="per">'); // 柱的数值部分

		var width = item[1] * 100 + '%';

		var bgStyle = "";
		if (item[2] !== undefined) {
			bgStyle = ' style="background-color:' + item[2] + '"'
		}

		rate.html('<div class="bg"' + bgStyle + '></div>') // bg来做动画效果

		rate.css('width', width);
		name.text(item[0]);
		per.text(width);

		line.append(name).append(rate).append(per);

		component.append(line);
	});

	return component;
}