function getSelectPageTitleById(problem_id) {
	return "模板:題庫/四選一/" + (Math.floor((problem_id - 1) / 500) + 1).toString();
}

function errorHandler() {
	$(".msg").html("新增時發生錯誤，請重新嘗試").delay(1000).hide(1000);
	$(".problem_info").delay(1000).show(1000);
}

function createSelectQuest() {
	// Get information
	var gen = $(".create_select .gen").val();
	var color = $(".create_select .color").val();
	var problem = $.trim($(".create_select .problem").val());
	var answer = $.trim($(".create_select .answer").val());

	// Check if problem & answer is empty
	if (problem == "" || answer == "") {
		$(".create_select .msg").hide().html("題目或答案不得為空白").show(1000);
		return;
	}

	// Disable all forms
	$(".create_select .problem_info").hide(1000);
	$(".create_select .msg").hide(1000).html("新增題目中...").show(1000);
	// Get Max Problem ID
	$.ajax({
		// url: "http://zh.nekowiz.wikia.com/wiki/模板:題庫/四選一?action=raw",
		url: "http://zh.nekowiz.wikia.com/api.php?action=query&titles=%E6%A8%A1%E6%9D%BF:%E9%A1%8C%E5%BA%AB/%E5%9B%9B%E9%81%B8%E4%B8%80&prop=info|revisions&inprop=&intoken=edit&rvprop=timestamp|content&format=json",
		cache: false
	}).done(function (data) {
		var pages = data.query.pages;
		var page;
		for (var index in pages) {
			page = pages[index];
		}
		var starttimestamp = page.starttimestamp;
		var content = page.revisions[0]["*"];

		var new_problem_id = parseInt(content) + 1;
		// Create new problem page
		var new_content = "\n" + new_problem_id.toString() + "|" + gen + "|" + problem + "|" + answer + "|" + color;
		var title = getSelectPageTitleById(new_problem_id);

		// 更新最大題號
		// Update Max Problem ID
		$.ajax({
			url: mw.util.wikiScript('api'),
			data: {
				format: 'json',
				action: 'edit',
				title: "模板:題庫/四選一",
				text: new_problem_id.toString(),
				summary: problem,
				token: mw.user.tokens.get('editToken'),
				starttimestamp: starttimestamp
			},
			dataType: 'json',
			type: 'POST',
			cache: false,
			success: function (data) {
				if (data && data.edit && data.edit.result == 'Success') {
					// 更新題號成功，新增題目
					$.ajax({
						url: mw.util.wikiScript('api'),
						data: {
							format: 'json',
							action: 'edit',
							title: title,
							summary: problem,
							appendtext: new_content,
							token: mw.user.tokens.get('editToken')
						},
						dataType: 'json',
						type: 'POST',
						cache: false,
						success: function (data) {
							if (data && data.edit && data.edit.result == 'Success') {
								// 成功新增題目
								$(".create_select .msg").html("題目新增完成").delay(1000).hide(1000);
								$(".create_select .problem_info").delay(1000).show(1000);
								$(".create_select .problem").val("");
								$(".create_select .answer").val("");
							} else if (data && data.error) {
								errorHandler();
								// alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
							} else {
								errorHandler();
								// alert( 'Error: Unknown result from API.' );
							}
						},
						error: function (xhr) {
							errorHandler();
							// alert( 'Error: Request failed.' );
						}
					});
				} else if (data && data.error) {
					errorHandler();
					// alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
				} else {
					errorHandler();
					// alert( 'Error: Unknown result from API.' );
				}
			},
			error: function (xhr) {
				errorHandler();
				// alert( 'Error: Request failed.' );
			}
		});
	});
}

$(document).ready(function () {
	if (mw.user.anonymous()) {
		alert('請先登入Wikia');
		$(".create_select .addQuest").on("click", function () {
			alert('請先登入Wikia');
		});
		return false;
	}
	$(".create_select .addQuest").on("click", function () {
		createSelectQuest();
	});
});