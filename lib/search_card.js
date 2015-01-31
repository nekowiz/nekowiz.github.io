function input_card_name_keyup_fun() {
	$("#card_serach_result").html("");
	var card_name = $("#input_card_name").val();
	if (card_name == "") {
		return;
	}
	$("#card_serach_result").html("搜尋中...");
	var search_result_html = "<table>";
	var db_result = card_db({name: {like: card_name}}).limit(10);
	db_result.each(function (record,recordnumber) {
		search_result_html += "<tr><td><span class='search_result_small_img' data-card_id='" + record["id"] + "' data-small_filename='" + record["small_filename"] + "'></span></td><td>" + record["name"] + "</td></tr>";
	});
	search_result_html += "</table>";
	$("#card_search_result").html(search_result_html);
	$(".search_result_small_img").each(function() {
		var small_url = "http://zh.nekowiz.wikia.com/api.php?action=query&prop=imageinfo&titles=File:" + $(this).data("small_filename") + "&iiprop=url&format=json";
		var this_element = $(this);
		this_element.append("<a href='javascript:add_card(" + this_element.data("card_id") + ");'><img height='60px' width='60px'></a>");
		$.getJSON(small_url, function(data) {
			for (var first in data.query.pages) {break;}
			var url = data.query.pages[first].imageinfo[0].url;
			this_element.find("img").attr("src", url);
		});
	});
}

function get_img_by_card_id(card_id) {
	var card_data = card_db({id: card_id.toString()}).first();
	var img_elem = $("<img height='60px' width='60px' title='" + card_id.toString() + "' />");
	if (card_data) {
		var small_url = "http://zh.nekowiz.wikia.com/api.php?action=query&prop=imageinfo&titles=File:" + card_data["small_filename"] + "&iiprop=url&format=json";
		$.getJSON(small_url, function(data) {
			for (var first in data.query.pages) {break;}
			var url = data.query.pages[first].imageinfo[0].url;
			img_elem.attr("src", url);
		});
	}
	return img_elem;
}

function remove_card(elem) {
	var first_tr_parent = $(elem).parents("tr:first");
	var card_id = first_tr_parent.data("card_id");
	first_tr_parent.remove();
	var card_data = card_db({id: card_id.toString()}).first();
	for (var i = 1; i <= 8; ++i) {
		var index_name = "evo_" + i.toString();
		var evo_id = card_data[index_name];
		if (evo_id == "") {
			continue;
		}
		evo_count[evo_id] -= 1;
	}
	update_evo_total();
}

function add_card(card_id) {
	$("#evo_list").append("<tr data-card_id='" + card_id.toString() +"'></tr>");
	var last_tr = $("#evo_list").find("tr:last");
	last_tr.append("<td rowspan='2'></td>");
	last_tr.find("td:last").append($(".search_result_small_img[data-card_id=" + card_id.toString() + "]"));
	last_tr.find("td span").removeClass("search_result_small_img");
	last_tr.find("td a").attr("href", "javascript:false;").attr("onclick", "remove_card(this);");
	var card_data = card_db({id: card_id.toString()}).first();
	last_tr.append("<td rowspan='2'>" + card_data["name"] + "</td>");
	// evo_1~8
	for (var i = 1; i <= 8; ++i) {
		var index_name = "evo_" + i.toString();
		last_tr.append("<td></td>");
		var evo_id = card_data[index_name];
		last_tr.find("td:last").append(get_img_by_card_id(evo_id));
		if (i == 4) {
			$("#evo_list").append("<tr data-card_id='" + card_id.toString() +"'></tr>");
			last_tr = $("#evo_list").find("tr:last");
		}
		if (evo_id == "") {
			continue;
		}
		if (evo_id in evo_count == false) {
			evo_count[evo_id] = 1;
		} else {
			evo_count[evo_id] += 1;
		}
	}
	update_evo_total();
	$("#card_search_result").html("");
}

function update_evo_total() {
	$("#evo_total").html("");
	$("#evo_total").append("<tr><th></th><th>屬性</th><th>Rank</th><th>總數</th></tr>");
	for (var card_id in evo_count) {
		var total_number = evo_count[card_id];
		if (total_number == 0) {
			continue;
		}
		var card_info = card_db({id: card_id.toString()}).first();
		$("#evo_total").append("<tr></tr>");
		var last_tr = $("#evo_total").find("tr:last");
		last_tr.append("<td></td>");
		last_tr.find("td:last").append(get_img_by_card_id(card_id));
		// last_tr.append("<td>" + card_info['name'] + "</td>");
		last_tr.append("<td>" + card_info['prop'] + "</td>");
		last_tr.append("<td>" + card_info['rank'] + "</td>");
		last_tr.append("<td>" + total_number + "</td>");
	}
}

$(document).ready(function() {
	$("#input_card_name").on({
		keyup: input_card_name_keyup_fun
	});
	load_card_from_wiki();
	evo_count = {};
});