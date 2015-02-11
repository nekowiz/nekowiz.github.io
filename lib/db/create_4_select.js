function get_page_title_by_id(problem_id) {
	return "模板:題庫/四選一/" + (Math.floor((problem_id - 1) / 500) + 1).toString();
}

function createNewProblem() {
	// Disable all forms
	$("#problem_info").hide(1000);
	$("#msg").html("新增題目中...").show();
	// Get information
	var gen = $("#gen").val();
	var problem = $("#problem").val();
	var answer = $("#answer").val();
	// Get Max Problem ID
	$.ajax({
		url: "http://zh.nekowiz.wikia.com/index.php?action=raw&title=模板:題庫/四選一"
	}).done(function (data) {
		var new_problem_id = parseInt(data) + 1;
		// Create new problem page
		var new_content = "\n" + new_problem_id.toString() + "|" + gen + "|" + problem + "|" + answer;
		var title = get_page_title_by_id(new_problem_id);
		$.ajax({
			url: mw.util.wikiScript('api'),
			data: {
				format: 'json',
				action: 'edit',
				title: title,
				appendtext: new_content,
				token: mw.user.tokens.get('editToken')
			},
			dataType: 'json',
			type: 'POST',
			success: function( data ) {
				if ( data && data.edit && data.edit.result == 'Success' ) {
					// Update Max Problem ID
					$.ajax({
						url: mw.util.wikiScript('api'),
						data: {
							format: 'json',
							action: 'edit',
							title: "模板:題庫/四選一",
							text: new_problem_id.toString(),
							token: mw.user.tokens.get('editToken')
						},
						dataType: 'json',
						type: 'POST',
						success: function( data ) {
							if ( data && data.edit && data.edit.result == 'Success' ) {
								// 成功新增題目
								$("#msg").html("題目新增完成").delay(1000).hide(1000);
								$("#problem_info").delay(1000).show(1000);
								$("#problem").val("");
								$("#answer").val("");
							} else if ( data && data.error ) {
								alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
							} else {
								alert( 'Error: Unknown result from API.' );
							}
						},
						error: function( xhr ) {
							alert( 'Error: Request failed.' );
						}
					});
				} else if ( data && data.error ) {
					alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
				} else {
					alert( 'Error: Unknown result from API.' );
				}
			},
			error:	function( xhr ) {
				alert( 'Error: Request failed.' );
			}
		});
	});
}