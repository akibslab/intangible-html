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
})(jQuery);
