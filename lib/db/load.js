loading_status = {
	normal: false,
	sort: false,
	daily: false
}

q_data = {
	normal: [],
	sort: [],
	daily: []
};

taffy_dbs = {
};

function errorHandler() {
	$("#msg").html("新增時發生錯誤，請重新嘗試").delay(1000).hide(1000);
	$("#edit").delay(1000).show(1000);
}

function editQuestionSelect(q_id) {
	// 將搜尋 & 結果隱藏
	$("#result").hide(1000).html("");
	$("#search").hide(1000);
	
	var edit_finish_fun = function () {
		$("#edit").hide(1000).html("");
		$("#result").show(1000);
		$("#search").show(1000);
	};
	
	// 根據 id 取得題目內容
	var title = "模板:題庫/四選一/" + (Math.floor((q_id - 1) / 500) + 1).toString()
	$.ajax({
		url: "http://zh.nekowiz.wikia.com/wiki/" + title + "?action=raw",
		cache: false
	}).done(function (data) {
		var data_arr = $.trim(data).split("\n");
		for (var question_index in data_arr) {
			var question = data_arr[question_index];
			var question_arr = $.trim(question).split("|");
			var question_id = parseInt(question_arr[0]);
			if (question_id != q_id) {
				continue;
			} else {
				var question_gen = question_arr[1];
				var question_text = question_arr[2];
				var question_answer = question_arr[3];
				
				// 產生編輯表單
				var result_html = "題目類型：<select id='gen'><option>生活常識</option><option>動漫與遊戲</option><option>文科</option><option>理科</option><option>演藝</option><option>體育</option><option>&lt;待填&gt;</option></select><hr /><input type='text' id='problem' placeholder='題目內容' size='100' /><hr /><input type='text' id='answer' placeholder='答案' size='30' /><hr /><button id='cancel_edit'>取消修改</button>&nbsp;<button id='confirm_edit'>確認修改</button>";
				$("#edit").html(result_html).show(1000);
				$("#gen").val(question_gen);
				$("#problem").val(question_text);
				$("#answer").val(question_answer);
				
				$("#cancel_edit").on('click', function() {
					edit_finish_fun();
				});
				$("#confirm_edit").on('click', function() {
					// 隱藏編輯表單
					$("#edit").hide(1000);
					$("#msg").html("修改題目中...").show(1000);
					
					// 產生新題目的該行
					var new_question_line = q_id.toString() + "|" + $("#gen").val() + "|" + $("#problem").val() + "|" + $("#answer").val() + "\n";
					
					// 重新取得該頁面所有內容
					$.ajax({
						url: "http://zh.nekowiz.wikia.com/api.php?action=query&titles=" + title + "&prop=info|revisions&inprop=&intoken=edit&rvprop=timestamp|content&format=json",
						cache: false
					}).done( function (data) {
						var pages = data.query.pages;
						var page;
						for (var index in pages) {
							page = pages[index];
						}
						var starttimestamp = page.starttimestamp;
						var content = page.revisions[0]["*"];
						
						var new_content = "";
						var data_arr = $.trim(content).split("\n");
						for (var question_index in data_arr) {
							var question = data_arr[question_index];
							var question_arr = $.trim(question).split("|");
							var question_id = parseInt(question_arr[0]);
							if (question_id != q_id) {
								new_content += (question + "\n");
							} else {
								new_content += new_question_line;
							}
						}
						// 將 new_content 寫回題庫
						$.ajax({
							url: mw.util.wikiScript('api'),
							data: {
								format: 'json',
								action: 'edit',
								title: title,
								text: new_content,
								token: mw.user.tokens.get('editToken'),
								starttimestamp: starttimestamp
							},
							dataType: 'json',
							type: 'POST',
							cache: false,
							success: function( data ) {
								if ( data && data.edit && data.edit.result == 'Success' ) {
									// 成功新增題目
									$("#msg").html("題目新增完成").delay(1000).hide(1000);
									edit_finish_fun();
								} else if ( data && data.error ) {
									errorHandler();
									// alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
								} else {
									errorHandler();
									// alert( 'Error: Unknown result from API.' );
								}
							},
							error:	function( xhr ) {
								errorHandler();
								// alert( 'Error: Request failed.' );
							}
						});
					})
				});
			}
		}
	}).error(function () {
		edit_finish_fun();
	});
}

function editQuestionSort(q_id) {
	// 將搜尋 & 結果隱藏
	$("#result").hide(1000).html("");
	$("#search").hide(1000);
	
	var edit_finish_fun = function () {
		$("#edit").hide(1000).html("");
		$("#result").show(1000);
		$("#search").show(1000);
	};
	
	// 根據 id 取得題目內容
	var title = "模板:題庫/排序/" + (Math.floor((q_id - 1) / 500) + 1).toString()
	$.ajax({
		url: "http://zh.nekowiz.wikia.com/wiki/" + title + "?action=raw",
		cache: false
	}).done(function (data) {
		var data_arr = $.trim(data).split("\n");
		for (var question_index in data_arr) {
			var question = data_arr[question_index];
			var question_arr = $.trim(question).split("|");
			var question_id = parseInt(question_arr[0]);
			if (question_id != q_id) {
				continue;
			} else {
				var question_text = question_arr[1];
				var question_answer1 = question_arr[2];
				var question_answer2 = question_arr[3];
				var question_answer3 = question_arr[4];
				var question_answer4 = question_arr[5];
				
				// 產生編輯表單
				var result_html = "<input type='text' id='problem' placeholder='題目內容' size='100' /><hr /><input type='text' id='answer1' placeholder='順位1' size='30' /><hr /><input type='text' id='answer2' placeholder='順位2' size='30' /><hr /><input type='text' id='answer3' placeholder='順位3' size='30' /><hr /><input type='text' id='answer4' placeholder='順位4' size='30' /><hr /><button id='cancel_edit'>取消修改</button>&nbsp;<button id='confirm_edit'>確認修改</button>";
				$("#edit").html(result_html).show(1000);
				$("#problem").val(question_text);
				$("#answer1").val(question_answer1);
				$("#answer2").val(question_answer2);
				$("#answer3").val(question_answer3);
				$("#answer4").val(question_answer4);
				
				$("#cancel_edit").on('click', function() {
					edit_finish_fun();
				});
				$("#confirm_edit").on('click', function() {
					// 隱藏編輯表單
					$("#edit").hide(1000);
					$("#msg").html("修改題目中...").show(1000);
					
					// 產生新題目的該行
					var new_question_line = q_id.toString() + "|" + $("#problem").val() + "|" + $("#answer1").val() + "|" + $("#answer2").val() + "|" + $("#answer3").val() + "|" + $("#answer4").val() + "\n";
					
					// 重新取得該頁面所有內容
					$.ajax({
						url: "http://zh.nekowiz.wikia.com/api.php?action=query&titles=" + title + "&prop=info|revisions&inprop=&intoken=edit&rvprop=timestamp|content&format=json",
						cache: false
					}).done( function (data) {
						var pages = data.query.pages;
						var page;
						for (var index in pages) {
							page = pages[index];
						}
						var starttimestamp = page.starttimestamp;
						var content = page.revisions[0]["*"];
						
						var new_content = "";
						var data_arr = $.trim(content).split("\n");
						for (var question_index in data_arr) {
							var question = data_arr[question_index];
							var question_arr = $.trim(question).split("|");
							var question_id = parseInt(question_arr[0]);
							if (question_id != q_id) {
								new_content += (question + "\n");
							} else {
								new_content += new_question_line;
							}
						}
						// 將 new_content 寫回題庫
						$.ajax({
							url: mw.util.wikiScript('api'),
							data: {
								format: 'json',
								action: 'edit',
								title: title,
								text: new_content,
								token: mw.user.tokens.get('editToken'),
								starttimestamp: starttimestamp
							},
							dataType: 'json',
							type: 'POST',
							cache: false,
							success: function( data ) {
								if ( data && data.edit && data.edit.result == 'Success' ) {
									// 成功新增題目
									$("#msg").html("題目新增完成").delay(1000).hide(1000);
									edit_finish_fun();
								} else if ( data && data.error ) {
									errorHandler();
									// alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
								} else {
									errorHandler();
									// alert( 'Error: Unknown result from API.' );
								}
							},
							error:	function( xhr ) {
								errorHandler();
								// alert( 'Error: Request failed.' );
							}
						});
					})
				});
			}
		}
	}).error(function () {
		edit_finish_fun();
	});
}

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
		var loaded_pages = 0;
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
				loaded_pages += 1;
				$("#msg1").html("四選一題目讀取中...<br />讀取進度 " + Math.round(loaded_pages/max_problem_page*100).toString() + "%");
				if (loaded_pages == max_problem_page) {
					taffy_dbs["normal"] = TAFFY(q_data.normal);
					loading_status.normal = true;
					check_search_show();
				}
			});
		}
	});
}

function check_search_show() {
	if (loading_status.normal == true && loading_status.sort == true && loading_status.daily == true) {
		$("#search").show(1000);
		$("#result").show(1000);
		$("#msg").hide(1000);
	}
}

function load_order() {
	// 取得目前最大題號
	$.ajax({
		url: "http://zh.nekowiz.wikia.com/wiki/模板:題庫/排序?action=raw",
		cache: false
	}).done(function (data) {
		var max_problem_id = parseInt(data);
		// 根據最大題號得到最大題目頁面
		var max_problem_page = (Math.floor((max_problem_id - 1) / 500) + 1);
		// 獲取每個頁面的題目
		var loaded_pages = 0;
		for (var current_problem_page = 1; current_problem_page <= max_problem_page; current_problem_page+=1) {
			// 取得每個題目頁面的 title
			var title = "模板:題庫/排序/" + current_problem_page.toString();
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
					tmp["question"] = question_arr[1];
					tmp["answer1"] = question_arr[2];
					tmp["answer2"] = question_arr[3];
					tmp["answer3"] = question_arr[4];
					tmp["answer4"] = question_arr[5];
					q_data.sort.push(tmp);
				}
				loaded_pages += 1;
				$("#msg2").html("排序題目讀取中...<br />讀取進度 " + Math.round(loaded_pages/max_problem_page*100).toString() + "%");
				if (loaded_pages == max_problem_page) {
					taffy_dbs["sort"] = TAFFY(q_data.sort);
					loading_status.sort = true;
					check_search_show();
				}
			});
		}
	});
}

function load_daily() {
	// 取得目前最大題號
	$.ajax({
		url: "http://zh.nekowiz.wikia.com/wiki/模板:題庫/每日?action=raw",
		cache: false
	}).done(function (data) {
		var max_problem_id = parseInt(data);
		// 根據最大題號得到最大題目頁面
		var max_problem_page = (Math.floor((max_problem_id - 1) / 500) + 1);
		// 獲取每個頁面的題目
		var loaded_pages = 0;
		for (var current_problem_page = 1; current_problem_page <= max_problem_page; current_problem_page+=1) {
			// 取得每個題目頁面的 title
			var title = "模板:題庫/每日/" + current_problem_page.toString();
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
					tmp["question"] = question_arr[1];
					tmp["answer"] = question_arr[2];
					tmp["image_filename"] = question_arr[3];
					q_data.daily.push(tmp);
				}
				loaded_pages += 1;
				$("#msg3").html("每日題目讀取中...<br />讀取進度 " + Math.round(loaded_pages/max_problem_page*100).toString() + "%");
				if (loaded_pages == max_problem_page) {
					taffy_dbs["daily"] = TAFFY(q_data.daily);
					loading_status.daily = true;
					check_search_show();
				}
			});
		}
	});
}

function search_problem() {
	// 取得搜尋類型
	var type = $('input:radio:checked[name="type"]').val();
	
	if (type == "select") {
		// 取得題目內容
		var question = $.trim($("#question").val());
		// 搜尋
		if (question == "") {
			$("#result").html("");
		} else {
			var question_split = question.split(" ");
			var db_result = taffy_dbs["normal"]( function () {
				for (var question_index in question_split) {
					var question_key = question_split[question_index];
					if (this.question.search(question_key) == -1) return false;
				}
				return true;
			});
			var search_result_html = "<table class='article-table'><tr><th>題號</th><th>類型</th><th>題目</th><th>答案</th><th></th></tr>";
			db_result.each(function (record,recordnumber) {
				search_result_html += "<tr><td>" + record["id"] + "</td><td>" + record["gen"] + "</td><td>" + record["question"] + "</td><td>" + record["answer"] + "</td><td><button onclick='editQuestionSelect(" + record["id"] + ")'>修改</button></td></tr>";
			});
			search_result_html += "</table>";
			$("#result").html(search_result_html);
		}
	}
	else if (type == "sort") {
		// 取得題目內容
		var question = $.trim($("#question").val());
		// 搜尋
		if (question == "") {
			$("#result").html("");
		} else {
			var question_split = question.split(" ");
			var db_result = taffy_dbs["sort"]( function () {
				for (var question_index in question_split) {
					var question_key = question_split[question_index];
					if (this.question.search(question_key) == -1) return false;
				}
				return true;
			});
			var search_result_html = "<table class='article-table'><tr><th>題號</th><th>題目</th><th>答案1</th><th>答案2</th><th>答案3</th><th>答案4</th><th></th></tr>";
			db_result.each(function (record,recordnumber) {
				search_result_html += "<tr><td>" + record["id"] + "</td><td>" + record["question"] + "</td><td>" + record["answer1"] + "</td><td>" + record["answer2"] + "</td><td>" + record["answer3"] + "</td><td>" + record["answer4"] + "</td><td><button onclick='editQuestionSort(" + record["id"] + ")'>修改</button></td></tr>";
			});
			search_result_html += "</table>";
			$("#result").html(search_result_html);
		}
	}
}

$(document).ready(function() {
	$("#question").on({
		keyup: search_problem
	});
	load4select();
	load_order();
});