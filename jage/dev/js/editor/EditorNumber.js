define(['jquery'], function ($) {
	var EditorNumber = function (params) {
		this.element = $('<input />').addClass('editorElement').addClass('editorNumber').appendTo(params.container);
		this.element.val(params.value);
	};

	EditorNumber.prototype.bindChange = function (callback) {
		this.element.on('keyup', function () {
			callback($(this).val());
		});
	};

	return EditorNumber;
});