(function ($) {
	"use strict";

	$(document).ready(function () {
		// item filter
		$(".item_filter").each(function () {
			var filter = $(this);
			var projects = $(this).find(".items_list > .item").html();

			filter.find(".activated").html(projects);
		});

		var newOptions = $(".items_list > .item");
		newOptions.click(function () {
			$(this).parents(".item_filter").find(".activated").html($(this).html());
			$(this).siblings().removeClass("active");
			$(this).addClass("active");
		});

		var aeDropdown = $(".item_filter");
		aeDropdown.click(function () {
			$(this).find(".filter_items").slideToggle();
			$(this).toggleClass("open");
		});

		// filter type
		$(".filter_type .heading").on("click", function () {
			$(this).parents(".filter_type").toggleClass("active");
			$(this).parents(".filter_type").find(".type_content").slideToggle();
		});
	});

	$(document).ready(function () {
		$("input[type='checkbox']").each(function () {
			if ($(this).is(":checked")) {
				$(this).parents(".checkbox_group").addClass("checked");
			}
		});

		$("input[type='checkbox']").change(function () {
			if (this.checked) {
				// Add a class to the parent div with the class 'fee_setting'
				$(this).parents(".checkbox_group").addClass("checked");
			} else {
				// Remove the class if the checkbox is unchecked
				$(this).parents(".checkbox_group").removeClass("checked");
			}
		});
	});
})(jQuery);
