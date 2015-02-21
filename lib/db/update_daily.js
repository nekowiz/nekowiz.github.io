q_data = {
  daily: []
};
  
  $.ajax({
    url: "https://spreadsheets.google.com/feeds/cells/1wzAwAH4rJ72Zw6r-bjoUujfS5SMOEr38s99NxKmNk4g/oy2mxv6/public/values?alt=json",
    dataType: "json",
    success: function(data, textStatus, jqXHR) {
      var col, entry, index, _ref, _results;
      console.log([data, textStatus, jqXHR]);
      col = 0;
      _ref = data.feed.entry;
      _results = [];
	  tmp = {}
      for (index in _ref) {
        entry = _ref[index];
        if (parseInt(entry.gs$cell.row) <= 2) {
          continue;
        }
        col = parseInt(entry.gs$cell.col);
        if (col == 2) {
		  tmp["url"] = entry.content.$t;
          // console.log(entry.content.$t);
        }
		if (col == 4) {
		  tmp["problem"] = entry.content.$t;
		  // console.log(entry.content.$t);
		}
		if (col == 5) {
		  tmp["answer"] = entry.content.$t;
		  // console.log(entry.content.$t);
		  q_data.daily.push(tmp);
		  tmp = {}
		}
      }
      return _results;
    }
  }).done(function () {
	  current_content = "";
	for (var q_index in q_data.daily) {
		var url = q_data.daily[q_index]["url"];
	  var filename = "每日問答-" + (parseInt(q_index)+1).toString() + url.substr(url.lastIndexOf("."));
	  console.log(url);
	  var problem = $.trim(q_data.daily[q_index]["problem"].replace(/(\r\n|\n|\r)/gm,""));
	  var answer = $.trim(q_data.daily[q_index]["answer"].replace(/(\r\n|\n|\r)/gm,""));
	  
	  // 上傳圖片
	   $.ajax({
		url: "/api.php",
		type: "POST",
		dataType: "json",
		data: {
		  action: "upload",
		  filename: filename,
		  url: url,
		  format: "json",
		  token: mw.user.tokens.get('editToken'),
		  ignorewarnings: "1"
		},
		success: function(data, textStatus, jqXHR) {
		  return console.log([data, textStatus, jqXHR]);
		}
	  });
	  
		var problem_id = (parseInt(q_index)+1).toString();
		current_content += problem_id + "|" + problem + "|" + answer + "|" + filename + "\n";
		if (parseInt(q_index) % 500 == 499) {
			title = "模板:題庫/每日/" + (Math.floor(parseInt(q_index) / 500) + 1).toString();
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
		title = "模板:題庫/每日/" + (Math.floor(parseInt(q_index) / 500) + 1).toString();
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
  });