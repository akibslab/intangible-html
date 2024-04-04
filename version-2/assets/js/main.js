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

	// chart
	$(".color_chart .value").each(function () {
		var text = $(this).text();
		$(this).parent().css("height", text);
	});

	// horizontal bar chart
	google.charts.load("current", { packages: ["corechart", "bar"] });
	google.charts.setOnLoadCallback(drawBasic);
	google.charts.setOnLoadCallback(drawBasic2);

	function drawBasic() {
		var data = google.visualization.arrayToDataTable([
			["Manufacturing", ""],
			["Patent", 67],
			["Technology", 37],
			["Know-how", 24],
			["Process", 3],
		]);

		var options = {
			title: "Manufacturing  Intangibles",
			colors: ["#2A3259"],
			chartArea: { width: "60%" },
			legend: { position: "none" },
		};

		var chart = new google.visualization.BarChart(
			document.getElementById("horizontal_bar_chart")
		);

		chart.draw(data, options);
	}
	function drawBasic2() {
		var data = google.visualization.arrayToDataTable([
			["Manufacturing", ""],
			["Patent", 67],
			["Technology", 37],
			["Know-how", 24],
			["Process", 3],
		]);

		var options = {
			title: "Manufacturing  Intangibles",
			colors: ["#2A3259"],
			chartArea: { width: "60%" },
			legend: { position: "none" },
		};

		var chart = new google.visualization.BarChart(
			document.getElementById("horizontal_bar_chart2")
		);

		chart.draw(data, options);
	}

	// column chart
	google.charts.load("current", { packages: ["corechart", "bar"] });
	google.charts.setOnLoadCallback(drawColumnChart);
	google.charts.setOnLoadCallback(drawColumnChart2);
	function drawColumnChart() {
		var data = google.visualization.arrayToDataTable([
			["Royalty Rates", "Records"],
			["0.5%", 0.5],
			["1.0%", 1.0],
			["1.5%", 1.5],
			["2.0%", 2.0],
			["2.3%", 2.3],
			["2.5%", 2.5],
			["3.0%", 3.0],
			["3.5%", 3.5],
			["4.0%", 4.0],
			["4.5%", 4.5],
			["4.7%", 4.7],
			["5.0%", 5.0],
			["5.3%", 5.3],
			["5.5%", 5.5],
			["5.8%", 5.8],
			["6.0%", 6.0],
			["6.5%", 6.5],
			["7.0%", 7.0],
			["7.5%", 7.5],
			["8.0%", 8.0],
			["8.3%", 8.3],
			["9.0%", 9.0],
			["10.0%", 10.0],
			["11.0%", 11.0],
		]);

		var view = new google.visualization.DataView(data);
		view.setColumns([0, 1]);

		var options = {
			colors: ["#C5E4FF"],
			chartArea: { width: "95%" },
			height: 300,
			bar: { groupWidth: "65%" },
			legend: { position: "none" },

			vAxis: {
				title: "Number of Records",
			},
			hAxis: {
				title: "Royalty Rates",
			},
			fontSize: 10,
			backgroundColor: "#FBFBFB",
		};
		var chart = new google.visualization.ColumnChart(
			document.getElementById("column_bar_chart")
		);
		chart.draw(view, options);
	}
	function drawColumnChart2() {
		var data = google.visualization.arrayToDataTable([
			["Royalty Rates", "Records"],
			["0.5%", 0.5],
			["1.0%", 1.0],
			["1.5%", 1.5],
			["2.0%", 2.0],
			["2.3%", 2.3],
			["2.5%", 2.5],
			["3.0%", 3.0],
			["3.5%", 3.5],
			["4.0%", 4.0],
			["4.5%", 4.5],
			["4.7%", 4.7],
			["5.0%", 5.0],
			["5.3%", 5.3],
			["5.5%", 5.5],
			["5.8%", 5.8],
			["6.0%", 6.0],
			["6.5%", 6.5],
			["7.0%", 7.0],
			["7.5%", 7.5],
			["8.0%", 8.0],
			["8.3%", 8.3],
			["9.0%", 9.0],
			["10.0%", 10.0],
			["11.0%", 11.0],
		]);

		var view = new google.visualization.DataView(data);
		view.setColumns([0, 1]);

		var options = {
			colors: ["#C5E4FF"],
			chartArea: { width: "95%" },
			height: 300,
			bar: { groupWidth: "65%" },
			legend: { position: "none" },

			vAxis: {
				title: "Number of Records",
			},
			hAxis: {
				title: "Royalty Rates",
			},
			fontSize: 10,
			backgroundColor: "#FBFBFB",
		};
		var chart = new google.visualization.ColumnChart(
			document.getElementById("column_bar_chart2")
		);
		chart.draw(view, options);
	}

	// candlestick chart
	google.charts.load("current", { packages: ["corechart"] });
	google.charts.setOnLoadCallback(candlestickChart);
	google.charts.setOnLoadCallback(candlestickChart2);
	function candlestickChart() {
		var number = google.visualization.arrayToDataTable(
			[
				["Africa", 20, 28, 38, 45],
				["Asia-Pacific", 31, 38, 55, 66],
				["Europe", 50, 55, 77, 80],
				["LATAM", 77, 77, 66, 50],
				["Middle East", 68, 66, 22, 15],
				["North America", 40, 50, 22, 15],
				["Worldwide", 70, 80, 22, 15],
				// Treat first row as data as well.
			],
			true
		);

		var options = {
			legend: "none",
			chartArea: { width: "95%" },
			height: 300,
			backgroundColor: "#FBFBFB",

			vAxis: {
				title: "Royalty Rates Distributions",
			},
			hAxis: {
				title: "Licensed Territory",
			},
		};

		var chart = new google.visualization.CandlestickChart(
			document.getElementById("candlestick_bar_chart")
		);

		chart.draw(number, options);
	}
	function candlestickChart2() {
		var number = google.visualization.arrayToDataTable(
			[
				["Africa", 20, 28, 38, 45],
				["Asia-Pacific", 31, 38, 55, 66],
				["Europe", 50, 55, 77, 80],
				["LATAM", 77, 77, 66, 50],
				["Middle East", 68, 66, 22, 15],
				["North America", 40, 50, 22, 15],
				["Worldwide", 70, 80, 22, 15],
				// Treat first row as data as well.
			],
			true
		);

		var options = {
			legend: "none",
			chartArea: { width: "95%" },
			height: 300,
			backgroundColor: "#FBFBFB",

			vAxis: {
				title: "Royalty Rates Distributions",
			},
			hAxis: {
				title: "Licensed Territory",
			},
		};

		var chart = new google.visualization.CandlestickChart(
			document.getElementById("candlestick_bar_chart2")
		);

		chart.draw(number, options);
	}

	// line chart
	google.charts.load("current", { packages: ["corechart", "line"] });
	google.charts.setOnLoadCallback(lineChart);
	google.charts.setOnLoadCallback(lineChart2);
	function lineChart() {
		var data = new google.visualization.DataTable();
		data.addColumn("number", "Year");
		data.addColumn("number", "Percents");

		data.addRows([
			[1990, 0],
			[1991, 5],
			[1992, 6],
			[1993, 11],
			[1994, 7],
			[1995, 3],
			[1996, 3],
			[1997, 4],
			[1998, 3],
			[1999, 6],
			[2000, 5],
			[2001, 5],
			[2002, 3],
			[2003, 5],
			[2004, 5],
			[2005, 5],
			[2006, 5],
			[2007, 6],
			[2008, 5],
			[2009, 5],
			[2010, 6],
			[2011, 5],
			[2012, 5],
			[2013, 5],
			[2014, 4],
			[2015, 7],
			[2016, 6],
			[2017, 7],
			[2018, 5],
			[2019, 10],
			[2020, 0],
			[2021, 5],
			[2022, 5.5],
			[2023, 5],
		]);

		var options = {
			legend: "none",
			chartArea: { width: "90%" },
			height: 300,
			backgroundColor: "#FBFBFB",

			vAxis: {
				title: "Royalty Rates",
			},
			hAxis: {
				title: "License Year",
			},
		};

		var chart = new google.visualization.LineChart(
			document.getElementById("line_dot_chart")
		);

		chart.draw(data, options);
	}
	function lineChart2() {
		var data = new google.visualization.DataTable();
		data.addColumn("number", "Year");
		data.addColumn("number", "Percents");

		data.addRows([
			[1990, 0],
			[1991, 5],
			[1992, 6],
			[1993, 11],
			[1994, 7],
			[1995, 3],
			[1996, 3],
			[1997, 4],
			[1998, 3],
			[1999, 6],
			[2000, 5],
			[2001, 5],
			[2002, 3],
			[2003, 5],
			[2004, 5],
			[2005, 5],
			[2006, 5],
			[2007, 6],
			[2008, 5],
			[2009, 5],
			[2010, 6],
			[2011, 5],
			[2012, 5],
			[2013, 5],
			[2014, 4],
			[2015, 7],
			[2016, 6],
			[2017, 7],
			[2018, 5],
			[2019, 10],
			[2020, 0],
			[2021, 5],
			[2022, 5.5],
			[2023, 5],
		]);

		var options = {
			legend: "none",
			chartArea: { width: "90%" },
			height: 300,
			backgroundColor: "#FBFBFB",

			vAxis: {
				title: "Royalty Rates",
			},
			hAxis: {
				title: "License Year",
			},
		};

		var chart = new google.visualization.LineChart(
			document.getElementById("line_dot_chart2")
		);

		chart.draw(data, options);
	}
})(jQuery);
