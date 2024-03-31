(function ($) {
	"use strict";

	$(".sidebar-area .filter-dropdown-box:not(:first)").hide();

	$(".database-tab li button").click(function () {
		$(".sidebar-area .filter-dropdown-box").hide();
		$(".sidebar-area .filter-dropdown-box-" + $(this).attr("target")).fadeIn();
	});

	$(".filter-box .filter-title").on("click", function () {
		$(this).parents(".filter-box").toggleClass("active");
		$(this).parents(".filter-box").find(".filter-body").slideToggle();
	});

	$(".filter-box .filter-sub-title").on("click", function () {
		$(this).toggleClass("active");
		$(this).next(".filter-sub-body").slideToggle();
	});

	// new search field
	$(".filter-sub-item .new-search-field").on("click", function () {
		$(this).next(".search-keyword-box").toggleClass("open");
		$("body").toggleClass("input-focus");
		$(".sidebar-area").toggleClass("active-search-field");
	});

	$(".search-keyword-box .close").on("click", function () {
		$(this).parents().parents().removeClass("open");
		$("body").removeClass("input-focus");
		$(".sidebar-area").removeClass("active-search-field");
	});

	// add search filed
	$(".filter-title .add-field").on("click", function () {
		$(this)
			.parents(".filter-title")
			.find(".add-search-field")
			.toggleClass("open");
		$("body").toggleClass("input-focus");
	});
	$(".add-search-field .btn-group .cancel_btn").on("click", function () {
		$(".add-search-field").removeClass("open");
		$("body").removeClass("input-focus");
	});

	// input focus body class
	jQuery(document).ready(function ($) {
		$(".search-box .input-box input")
			.focus(function () {
				$("body").addClass("input-focus");
			})
			.blur(function () {
				$("body").removeClass("input-focus");
			});
	});

	// statistics filter
	$(".statistics_score_wrap button").on("click", function () {
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
	});

	// statistics returns
	$(".statistics_returns .returns_title").on("click", function () {
		$(this).toggleClass("active");
		$(this).next(".returns_infos").slideToggle();
	});

	// Table click sorting
	$(document).on(
		"click",
		".contents-area .table-area table thead tr th:not(.no-sort)",
		function () {
			var table = $(this).parents("table");
			var rows = $(this)
				.parents("table")
				.find("tbody tr")
				.toArray()
				.sort(TableComparer($(this).index()));
			var dir = $(this).hasClass("sort-asc") ? "desc" : "asc";

			if (dir == "desc") {
				rows = rows.reverse();
			}

			for (var i = 0; i < rows.length; i++) {
				table.append(rows[i]);
			}

			table
				.find("thead tr th")
				.removeClass("sort-asc")
				.removeClass("sort-desc");
			$(this)
				.removeClass("sort-asc")
				.removeClass("sort-desc")
				.addClass("sort-" + dir);
		}
	);

	function TableComparer(index) {
		return function (a, b) {
			var val_a = TableCellValue(a, index);
			var val_b = TableCellValue(b, index);
			var result =
				$.isNumeric(val_a) && $.isNumeric(val_b)
					? val_a - val_b
					: val_a.toString().localeCompare(val_b);

			return result;
		};
	}

	function TableCellValue(row, index) {
		return $(row).children("td").eq(index).text();
	}

	if ($(".table tbody tr").hasClass("collapese-content")) {
		$(".table tbody tr.collapese-content")
			.prev("tr")
			.before()
			.on("click", function () {
				var accordionRow = $(this).next(".collapese-content");

				$(this).toggleClass("collapsed");
				accordionRow.slideToggle("slow");
			});
	}

	$(document).ready(function () {
		$("select").niceSelect();
	});

	// statistics page
	$(document).ready(function () {
		// Statistics Tab
		$('#statisticsTab li[data-bs-toggle="pill"]').on(
			"show.bs.tab",
			function (e) {
				let target = $(e.target).data("bs-target");
				$(target)
					.addClass("active show")
					.siblings(".tab-pane.active")
					.removeClass("active show");
			}
		);

		// item filter
		$(".item_filter").each(function () {
			var filter = $(this);
			var filterItem = $(this).find(".items_list > .item.active").html();

			filter.find(".activated").html(filterItem);
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
	});

	document.addEventListener("DOMContentLoaded", function () {
		setTimeout(function () {
			var tooltips = document.querySelectorAll(".stTooltip");

			tooltips.forEach(function (tooltip) {
				var tooltipText = tooltip.querySelector(".tooltiptext");

				// tooltip bounding and calculations
				function adjustTooltipPosition() {
					var rect = tooltip.getBoundingClientRect();
					var tooltipWidth = tooltipText.offsetWidth;

					var spaceLeft = rect.left;
					var spaceRight = window.innerWidth - rect.right;

					tooltipText.style.left = "0";
					tooltipText.style.right = "auto";
					tooltipText.style.transform = "translateX(0)";

					if (spaceRight < tooltipWidth / 2) {
						tooltipText.style.left = "auto";
						tooltipText.style.right = "0";
						tooltipText.style.transform = "translateX(0)";
					}

					if (spaceLeft < tooltipWidth / 2) {
						tooltipText.style.left = "0";
						tooltipText.style.transform = "translateX(0)";
					}

					// if (rect.top < tooltipText.offsetHeight) {
					// 	tooltipText.style.top = "100%";
					// 	tooltipText.style.bottom = "auto";
					// } else {
					// 	tooltipText.style.bottom = "100%";
					// 	tooltipText.style.top = "auto";
					// }
				}

				// call adjustTooltipPosition initially
				adjustTooltipPosition();

				// call adjustTooltipPosition on window resize
				window.addEventListener("resize", adjustTooltipPosition);
			});
		}, 100); // delay on bounding in ms
	});
})(jQuery);
