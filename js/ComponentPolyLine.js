// 折线图组件对象
// 基于基本图文组件对象

var ComponentPolyLine = function(name, config) {
	var component = new ComponentBase(name, config);

	// 绘制网格线
	var w = config.width;
	var h = config.height;

	// 加入一个画布(网格线背景)
	var can = document.createElement('canvas'); // 新建canvas元素
	var ctx = can.getContext('2d'); // 获取到canvas对象
	can.width = ctx.width = w;
	can.height = ctx.height = h;
	component.append(can);

	// 水平网格线 10份
	var step = 10;
	ctx.beginPath(); // 开始
	ctx.lineWidth = 1; // 线宽
	ctx.strokeStyle = "#AAA";

	for (var i = 0; i <= step; i++) {
		ctx.moveTo(0, i * 40) // 起点
		ctx.lineTo(w, 40 * i); // 画线线
	}

	// 垂直网格线 (根据项目个数去分)
	step = config.data.length + 1;
	for (var i = 0; i <= step; i++) {
		ctx.moveTo(i * (w / step), 0);
		ctx.lineTo(i * (w / step), h);

		// 创建项目文本
		if (config.data[i]) {
			var text = $('<div class="text">');
			text.text(config.data[i][0]);
			text.css('width', w / step >> 0).css('left', i * (w / step) / 2);
			component.append(text);
		}
	}

	ctx.stroke() // 收笔

	// 加入画布 -- 数据层
	var can = document.createElement('canvas');
	var ctx = can.getContext('2d');
	can.width = ctx.width = w;
	can.height = ctx.height = h;
	component.append(can);

	var draw = function(per) { // 参数为绘制最终状态的百分比
		// 清空画布
		ctx.clearRect(0, 0, w, h);

		// 绘制折线数据
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeStyle = "#ff8878";

		var x = 0;
		var y = 0;
		// 画点
		for (var i = 0; i < config.data.length; i++) {
			x = (i + 1) * (w / step);
			y = h - config.data[i][1] * h * per;

			ctx.moveTo(x, y);
			ctx.arc(x, y, 4, 0, 2 * Math.PI);
		}

		// 连线 将画笔移动到第一个数据的点位置
		ctx.moveTo(w / (config.data.length + 1), h - config.data[0][1] * per * h);
		for (var i = 0; i < config.data.length; i++) {
			x = (i + 1) * (w / step);
			y = h - config.data[i][1] * h * per;
			ctx.lineTo(x, y);
		}
		ctx.stroke();

		// 绘制阴影
		ctx.lineWidth = 1;
		ctx.lineTo(x, h);
		ctx.lineTo(w / (config.data.length + 1), h);
		ctx.fillStyle = 'rgba(255, 136, 120, .2)';
		ctx.fill();

		// 写数据
		for (var i = 0; i < config.data.length; i++) {
			x = (i + 1) * (w / step);
			y = h - config.data[i][1] * h * per;
			ctx.fillStyle = config.data[i][2] ? config.data[i][2] : '#595959';
			ctx.fillText(((config.data[i][1] * 100) >> 0) + '%', x - 10, y - 10);
		}

		ctx.stroke();
	}

	// 折线图生长动画
	component.on('onLoad', function() {
		var s = 0;
		for (i = 0; i < 100; i++) {
			setTimeout(function() {
				s += .01;
				draw(s);
			}, i * 10);
		}
	});

	// 折线退场动画
	component.on('onLeave', function() {
		var s = 1;
		for (i = 0; i < 100; i++) {
			setTimeout(function() {
				s -= .01;
				draw(s);
			}, i * 10);
		}
	})

	return component;
}