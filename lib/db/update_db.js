q_data = {
    normal: [],
    sort: [],
    daily: [],
    count: 0
  };

function testAPI(data) {
	data = data.feed.entry;
	var col, entry, index, keys, tmp;
    tmp = {};
    col = 0;
    keys = ['', '', 'color', 'type', 'question', 'answer'];
    for (index in data) {
      entry = data[index];
      if (parseInt(entry.gs$cell.row) <= 1) {
        continue;
      }
      col = parseInt(entry.gs$cell.col);
      if (col >= 2 && col <= 5) {
        if (col === 2) {
          tmp = {};
        }
        tmp[keys[col]] = entry.content.$t;
        if (col === 5) {
          q_data.normal.push(tmp);
        }
      }
    }
	console.log("finish");
}

$("html").append($("<script src='https://spreadsheets.google.com/feeds/cells/1wzAwAH4rJ72Zw6r-bjoUujfS5SMOEr38s99NxKmNk4g/oj7l0gb/public/values?alt=json-in-script&callback=testAPI'></script>"));

function testAPI2(data) {
	data = data.feed.entry;
	var col, entry, index, keys, tmp;
    tmp = [];
    col = 0;
    for (index in data) {
      entry = data[index];
      if (parseInt(entry.gs$cell.row) <= 2) {
        continue;
      }
      col = parseInt(entry.gs$cell.col);
      if (col >= 2 && col <= 6) {
        if (col === 2) {
          tmp = [];
        }
        tmp.push(entry.content.$t);
        if (col === 6) {
          q_data.sort.push(tmp);
        }
      }
    }
	console.log("finish");
}

$("html").append($("<script src='https://spreadsheets.google.com/feeds/cells/1wzAwAH4rJ72Zw6r-bjoUujfS5SMOEr38s99NxKmNk4g/otblre7/public/values?alt=json-in-script&callback=testAPI2'></script>"));







current_content = "";

for (q in q_data.normal) {
	p = q_data.normal[q];
	problem_id = (parseInt(q)+1).toString();
	gen = $.trim(p.type.replace(/(\r\n|\n|\r)/gm,""));
	question = $.trim(p.question.replace(/(\r\n|\n|\r)/gm,""));
	answer = $.trim(p.answer.replace(/(\r\n|\n|\r)/gm,""));
	color = $.trim(p.color.replace(/(\r\n|\n|\r)/gm,""));
	current_content += problem_id + "|" + gen + "|" + question + "|" + answer + "\n";
	if (q % 500 == 499) {
		title = "模板:題庫/四選一/" + (Math.floor(parseInt(q) / 500) + 1).toString();
		$.ajax({
			url: mw.util.wikiScript('api'),
			data: {
				format: 'json',
				action: 'edit',
				title: title,
				text: current_content,
				token: mw.user.tokens.get('editToken')
			},
			dataType: 'json',
			type: 'POST',
			success: function( data ) {
				if ( data && data.edit && data.edit.result == 'Success' ) {
					console.log(title);
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
		current_content = "";
	}
}

title = "模板:題庫/四選一/" + (Math.floor(parseInt(q) / 500) + 1).toString();
$.ajax({
	url: mw.util.wikiScript('api'),
	data: {
		format: 'json',
		action: 'edit',
		title: title,
		text: current_content,
		token: mw.user.tokens.get('editToken')
	},
	dataType: 'json',
	type: 'POST',
	success: function( data ) {
		if ( data && data.edit && data.edit.result == 'Success' ) {
			console.log(title);
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
current_content = "";

title = "模板:題庫/四選一";
$.ajax({
	url: mw.util.wikiScript('api'),
	data: {
		format: 'json',
		action: 'edit',
		title: title,
		text: problem_id,
		token: mw.user.tokens.get('editToken')
	},
	dataType: 'json',
	type: 'POST',
	success: function( data ) {
		if ( data && data.edit && data.edit.result == 'Success' ) {
			console.log(title);
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


// 排序題

for (q in q_data.sort) {
	p = q_data.sort[q];
	problem_id = (parseInt(q)+1).toString();
	text = $.trim(p[0].replace(/(\r\n|\n|\r)/gm,""));
	answer1 = $.trim(p[1].replace(/(\r\n|\n|\r)/gm,""));
	answer2 = $.trim(p[2].replace(/(\r\n|\n|\r)/gm,""));
	answer3 = $.trim(p[3].replace(/(\r\n|\n|\r)/gm,""));
	answer4 = $.trim(p[4].replace(/(\r\n|\n|\r)/gm,""));
	current_content += problem_id + "|" + text + "|" + answer1 + "|" + answer2 + "|" + answer3 + "|" + answer4 + "\n";
	if (q % 500 == 499) {
		title = "模板:題庫/排序/" + (Math.floor(parseInt(q) / 500) + 1).toString();
		$.ajax({
			url: mw.util.wikiScript('api'),
			data: {
				format: 'json',
				action: 'edit',
				title: title,
				text: current_content,
				token: mw.user.tokens.get('editToken')
			},
			dataType: 'json',
			type: 'POST',
			success: function( data ) {
				if ( data && data.edit && data.edit.result == 'Success' ) {
					console.log(title);
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
		current_content = "";
	}
}

title = "模板:題庫/排序/" + (Math.floor(parseInt(q) / 500) + 1).toString();
$.ajax({
	url: mw.util.wikiScript('api'),
	data: {
		format: 'json',
		action: 'edit',
		title: title,
		text: current_content,
		token: mw.user.tokens.get('editToken')
	},
	dataType: 'json',
	type: 'POST',
	success: function( data ) {
		if ( data && data.edit && data.edit.result == 'Success' ) {
			console.log(title);
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
current_content = "";

title = "模板:題庫/排序";
$.ajax({
	url: mw.util.wikiScript('api'),
	data: {
		format: 'json',
		action: 'edit',
		title: title,
		text: problem_id,
		token: mw.user.tokens.get('editToken')
	},
	dataType: 'json',
	type: 'POST',
	success: function( data ) {
		if ( data && data.edit && data.edit.result == 'Success' ) {
			console.log(title);
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









