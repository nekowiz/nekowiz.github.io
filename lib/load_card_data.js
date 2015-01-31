function load_card_from_wiki() {
	var card_number_low = 1;
	var card_datas = [];
	var loaded_count = 0;
	var max_load = 100;
	while(card_number_low < max_load) {
		var page_name = "http://zh.nekowiz.wikia.com/index.php?action=raw&title=Template:Card/Data/" + card_number_low.toString() + "-" + (card_number_low+19).toString();
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
					if (status == 0 && line[0] == "|") {
						status = 1;
						current_id = line.substr(1, line.search("=") - 1);
						current_card_data["id"] = current_id;
					} else if (status == 1) {
						if (line[0] == "}") {
							card_datas.push(current_card_data);
							current_card_data = {};
							status = 0;
						} else {
							var before = line.substr(line.search("\\|")+1, line.search("=") - line.search("\\|") - 1);
							var after = line.substr(line.search("=")+1);
							if (before != "") {
								current_card_data[before] = after;
							}
						}
					}
				}
				loaded_count += 20;
				console.log("Parsing progress: " + (loaded_count/max_load*100).toString() + "%");
				if (loaded_count >= max_load) {
					console.log("Parsing finished");
					card_db = TAFFY(card_datas);
				}
			});
		card_number_low += 20;
	}
}