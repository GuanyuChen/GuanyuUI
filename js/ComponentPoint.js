// 散点图组件 
// 基于基本图文组件

var ComponentPoint = function(name, config) {
	// 先新建一个基本图文组件作为基础
	var component = new ComponentBase(name, config);

	var base = config.data[0][1]; // 以第一个数据的比例为大小的100%

	$.each(config.data, function(index, item) { // 参数分别为索引、项
		var point = $('<div class="point point_' + index + '">');

		var name = $('<div class="name">' + item[0] + '</div>')
		var rate = $('<div class="per">' + (item[1] * 100) + '%' + '</div>') // 百分比

		name.append(rate);
		point.append(name);

		var per = (item[1] / base * 100) + '%'; // 计算出每一项与参照项的比例
		point.width(per).height(per);

		if (item[2]) { // 如果提供颜色参数
			point.css('background-color', item[2]); // 可以驼峰命名 也可以按照原始命名 中间加-
		}

		// 当数值为0时，if判断会为false 所以这两个数值用是否为undefined来判断
		if (item[3] !== undefined && item[4] !== undefined) { //如果提供了偏移参数 X轴偏移 和 Y轴偏移
			point.css('left', item[3]).css('top', item[4])
		}

		component.append(point);
	});
	return component;
}

/*任务可以分为 3 个步骤来完成：
第一步：暂存每个点元素（.point）的 left 和 top
提示：
1、可以直接使用 jquery 的 data 方法来保存
第二步：设置点元素的 zIndex、重设位置（left、top）
提示：
1、设置 zIndex 是为了保证后面出现的元素会被中间大元素挡住
2、重设位置是因为必须有初始的 left、top 设置，后面的修改才会应用到动画上
第三步：onLoad 之后取出每个点元素（.point）暂存的 left、top 并且附加到 CSS 中
提示：
1.通过component.find( '.point' )可以获得组件内的每个点元素
第四步：onLeave 之后，还原每个点元素的初始的位置
提示：
1、这是退场动画，这个任务保证重新载入当前页的时候，入场动画可以正常播放
2、还原初始位置，可以直接归 0*/