# WebModules
# HTML5实现的移动端数据可视化

元素：

1. 移动端
2. 可视化
3. CANVAS
4. 数据报告

## 产品设计

1. 首页载入动画
2. 滑动切换页面
3. 具体页面
    + 首页
    + 图文
    + 折线图
    + 饼图
    + 柱图
    + 雷达图
    + 环图
    + 散点图
    + 尾页

## 技术方案设计

1. 页面DOM操作采用`jQuery` 
2. 页面切换功能采用`FullPage.js`(一款基于jQuery的插件，简单、易用、跨浏览器)
3. 页面组织方式采用Page--Component(Page就是页面切换的每一页，可以理解为一个满屏的DIV，Component是页面上应用的组件，简单分为图文组件和图表组件)

### JS类的规划

1. 内容组织类 Main
    作用：
    * 组织报告的内容结构
    * 设置报告的切换效果(fullpage.js) 当页切换时，通知页内所有的组件
    
    方法：
    * addPage 添加页面
    * addComponent 添加组件
    * loader 展现所有页面
2. 图文组件类 ComponentBase
    作用：输出一个DOM，内容是图片或文字
    事件：
    * onLoad 当前页载入
    * onLeave 当前页移出
3. 图表组件类 Component???(有很多个)
    作用：在ComponentBase基础上插入DOM结构或CANVAS图形
    事件：
    * onLoad/onLeave 当前页面载入移除
    * 图表组件本身的生长动画

### CSS规划

1. component 代表所有组件
2. component_base 代表某种类型的组件 还有component_pie...用于某种样式的附加；还包括他们的状态_Load、_ Leave
3. component_name_myName 自定义组件名 用于附加样式 比如通用的标题之类的

### 图表组件

图表组件数据 (本身是一个数组，数组里面每一项都是数组)

```
var data = [];
data.push(['A项',.5,'#f00']);
        项目名称 项目数值(取值约定) 颜色
```

1. 散点图
2. 水平柱图、垂直柱图
    * 柱图结构：name process per
    * 我们应当注意一点：process一部分的width应该可以占据组件width的100%；所以，应当把name和per设置为`position:absolute;`，并且距离左右两边分别为本身宽度的负数
3. 折线图(Canvas)
    1. Canvas划线、填充、简单画圆
    2. 网格绘制/项目文本
    3. 通用Canvas动画(数据生长)
    4. 填充阴影
4. 雷达图
5. 饼图、环图
