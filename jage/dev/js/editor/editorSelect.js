define(['jquery'], function ($) {
	var EditorSelect = function (params) {
		this.element = $('<select />').addClass('editorElement').addClass('editorSelect').appendTo(params.container);
		this.element.val(params.value);
		return element;
	};

	EditorSelect.prototype.bindChange = function (callback) {

	};
	return EditorSelect;
});