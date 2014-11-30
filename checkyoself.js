var Checkyoself = function() {
	var
	morphers;
	init = function() {
		morphers = {};
		$.each($('input[data-checkyo]'), function(index, el) {
			var myIcons;
			prependSvg(el, index);
			$(this).attr('style', 'display:none;');
			myIcons = new SVGMorpheus('#checkyoself-wrap-' + index);
			myIcons.to(getIconIdToDisplay($(this), index));
			morphers[index] = myIcons;
		});
		bindCheckboxListener();
	},
	getIconIdToDisplay = function(selector, idPrefix) {
		return "checkyoself-" + ($(selector).is(':checked') ? 'check' : 'cross') + "-" + idPrefix;
	},
	prependSvg = function(selector, idPrefix) {
		var iconClass = ($(selector).is(':checked') ? 'check' : 'cross');
		svg = '<svg width="40" height="40" class="checkyoself-wrap ' + iconClass + '" data-idprefix="' + idPrefix + '" id="checkyoself-wrap-' + idPrefix + '" width="2048" height="2048" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg">'
		svg += '<g id="checkyoself-check-' + idPrefix + '"><path style="fill:red;" d="M1799 694q0 40-28 68l-724 724-136 136q-28 28-68 28t-68-28l-136-136-362-362q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295 656-657q28-28 68-28t68 28l136 136q28 28 28 68z"/></g>';
		svg += '<g id="checkyoself-cross-' + idPrefix + '"><path d="M1618 1450q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></g>';
		svg += '</svg>';
		$(selector).before(svg);
	},
	bindCheckboxListener = function() {
		$('input[data-checkyo]').change(function() {
			var idPrefix = $(this).prev().attr('data-idprefix'),
			state;
			morphers[idPrefix].to(getIconIdToDisplay($(this), idPrefix));
			if($(this).is(':checked')) {
				$('svg[data-idprefix=' + idPrefix + ']').attr('class', 'check');
				if($(this).is('input[type=radio]')) {
					$('input[data-checkyo][type=radio][name=' + $(this).attr('name') + ']').not(':checked').change();
				}
			}
			else {
				$('svg[data-idprefix=' + idPrefix + ']').attr('class', 'cross');
			}
		});
	};
	return { init: init }
},
checkyoself;
$(function() {
	checkyoself = new Checkyoself();
	checkyoself.init();
});
