var user = {
	count: 1,
	getCount: function() {
		return this.count;
	}
}
console.log(user.getCount());
var func = user.getCount;
console.log(func());