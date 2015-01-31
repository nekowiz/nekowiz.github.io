function load_card_from_wiki() {
	var card_number_low = 1;
	var card_datas = [];
	while(card_number_low < 100) {
		var page_name = "http://zh.nekowiz.wikia.com/wiki/Template:Card/Data/" + card_number_low.toString() + "-" + (card_number_low+19).toString() + "?action=edit";
		$.ajax({
		url: page_name
		})
			.done(function (data) {
				var status = 0;
				var card_page = data;
				var card_data = $(card_page).find("#wpTextbox1").html();
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
				console.log("Parsing card number " + card_number_low.toString() + " finished.");
			});
		card_number_low += 20;
	}
	card_db = TAFFY(card_datas);
}