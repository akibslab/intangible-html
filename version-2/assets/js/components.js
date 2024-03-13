(function ($) {
	"use strict";

	// project filter
	$(document).ready(function () {
		// header language
		$(".project_filter .activated").html($(".project_list > .project").html());

		var newOptions = $(".project_list > .project");
		newOptions.click(function () {
			$(".project_filter .activated").html($(this).html());
			$(".project_list > .project").siblings().removeClass("active");
			$(this).addClass("active");
		});

		var aeDropdown = $(".project_filter");
		aeDropdown.click(function () {
			$(".project_items").slideToggle();
			$(this).toggleClass("open");
		});
	});
})(jQuery);
