define(['j.CompProperties', 'j.EditorColor', 'j.EditorSelect', 'j.EditorNumber',
'j.EditorBoolean', 'jquery'],
 function (CompProperties, EditorColor, EditorSelect, EditorNumber,
 EditorBoolean, $) {

	var elemFunctions = [];
	elemFunctions[CompProperties.COLOR] = EditorColor;
	elemFunctions[CompProperties.SELECT] = EditorSelect;
	elemFunctions[CompProperties.NUMBER] = EditorNumber;
	elemFunctions[CompProperties.BOOLEAN] = EditorBoolean;
	var InspectorElement = function (params) {
		this.box = $('<div />').addClass('editorPart').appendTo(params.container);
		this.namePart = $('<span />').addClass('propName').appendTo(this.box).html(params.prop);
		this.propContainer = $('<div />').addClass('propContainer').appendTo(this.box);
		this.propType = params.propType;
		params.value = params.master[params.prop];
		this.element = elemFunctions[CompProperties[this.propType]]({ container : this.propContainer, value : params.value});

		this.element.bindChange(function (value) {
			params.master[params.prop] = value;
		});
	};

	return InspectorElement;
});