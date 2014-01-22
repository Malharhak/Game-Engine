define(['jquery'], function ($) {
	var EditorColor = function (params) {
		this.element = $('<input />').addClass('editorElement').addClass('editorColor').appendTo(params.container);
		this.element.val(params.value);
	};

	EditorColor.prototype.bindChange = function (callback) {
		this.element.on('keyup', function () {
			callback ($(this).val());
		});
	};

	return EditorColor;
});