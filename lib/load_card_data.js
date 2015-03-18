function load_card_from_wiki(loading_msg_div, info_div) {
	loading_msg_div.html("卡片資料庫讀取中...");
	var card_number_low = -11;
	var card_number_high = 1500;
	var card_datas = [];
	max_load = card_number_high - card_number_low + 1;
	loaded_count = 0;
	while(card_number_low <= card_number_high) {
		var page_name = "http://zh.nekowiz.wikia.com/index.php?action=raw&title=Template:Card/Data/" + card_number_low.toString();
		$.ajax({
		url: page_name
		})
			.done(function (data) {
				var status = 0;
				/* var card_page = data;
				var card_data = $(card_page).find("#wpTextbox1").html(); */
				var card_data = data;
				var current_id = "";
				var current_card_data = {};
				var card_data_split = card_data.split("\n");
				for (var line_index in card_data_split) {
					var line = card_data_split[line_index];
					if (line[0] == "|") {
						var before = line.substr(1, line.search("=") - 1);
						var after = line.substr(line.search("=") + 1);
						if (before != "") {
							current_card_data[before] = after;
						}
					}
				}
				card_datas.push(current_card_data);
			})
			.always(function () {
				loaded_count += 1;
				loading_msg_div.html("卡片資料庫讀取中...<br />讀取進度: " + Math.round(loaded_count/max_load*100).toString() + "%");
				// console.log("Parsing progress: " + (loaded_count/max_load*100).toString() + "%");
				if (loaded_count >= max_load) {
					loading_msg_div.hide(1000);
					info_div.show(1000);
					console.log("Parsing finished");
					card_db = TAFFY(card_datas);
				}
			});
		card_number_low += 1;
	}
}

function update_json() {
	var errorHandler = function () {
		console.log("Error.");
	};
	
	var new_json = card_db().stringify();

	$.ajax({
		url: mw.util.wikiScript('api'),
		data: {
			format: 'json',
			action: 'edit',
			title: 'Template:Card/Data/JSON',
			text: new_json,
			token: mw.user.tokens.get('editToken')
		},
		dataType: 'json',
		type: 'POST',
		cache: false,
		success: function (data) {
			if ( data && data.edit && data.edit.result == 'Success' ) {
				console.log("Json updated.");
			} else if ( data && data.error ) {
				errorHandler();
				// alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
			} else {
				errorHandler();
				// alert( 'Error: Unknown result from API.' );
			}
		},
		error: function(xhr) {
			errorHandler();
		}
	});
}

function load_card_from_json(loading_msg_div, info_div) {
	loading_msg_div.html("卡片資料庫讀取中...");
	var page_name = "http://zh.nekowiz.wikia.com/index.php?action=raw&title=Template:Card/Data/JSON";
	$.ajax({
	url: page_name
	})
		.done(function (data) {
			card_db = TAFFY(data);
			loading_msg_div.hide(1000);
			info_div.show(1000);
			console.log("Parsing finished");
		});
}