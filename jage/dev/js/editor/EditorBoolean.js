define(['jquery'], function ($) {
	var EditorBoolean = function (params) {
		this.element = $('<input />').attr('type', 'checkbox').addClass('editorElement').addClass('editorBoolean').appendTo(params.container);
		this.element.val(params.value);
	};

	EditorBoolean.prototype.bindChange = function (callback) {
		this.element.on('change', function () {
			callback($(this).val());
		});
	};

	return EditorBoolean;
});