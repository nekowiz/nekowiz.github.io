q_data = {
	normal: [],
	sort: [],
	daily: []
};

function load4select() {
	// 取得目前最大題號
	$.ajax({
		url: "http://zh.nekowiz.wikia.com/wiki/模板:題庫/四選一?action=raw",
		cache: false
	}).done(function (data) {
		var max_problem_id = parseInt(data);
		// 根據最大題號得到最大題目頁面
		var max_problem_page = (Math.floor((max_problem_id - 1) / 500) + 1);
		// 獲取每個頁面的題目
		for (var current_problem_page = 1; current_problem_page <= max_problem_page; current_problem_page+=1) {
			// 取得每個題目頁面的 title
			var title = "模板:題庫/四選一/" + current_problem_page.toString();
			// 取得題目
			$.ajax({
				url: "http://zh.nekowiz.wikia.com/wiki/" + title + "?action=raw",
				cache: false
			}).done(function (data) {
				// parse 題目
				var data_arr = $.trim(data).split("\n");
				for (var question_index in data_arr) {
					var question = data_arr[question_index];
					var question_arr = $.trim(question).split("|");
					tmp = {}
					tmp["id"] = question_arr[0];
					tmp["gen"] = question_arr[1];
					tmp["question"] = question_arr[2];
					tmp["answer"] = question_arr[3];
					q_data.normal.push(tmp);
				}
			});
		}
	});
}