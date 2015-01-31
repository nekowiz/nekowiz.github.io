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
		$.getJSON(small_url, function(data) {
			for (var first in data.query.pages) {break;}
			var url = data.query.pages[first].imageinfo[0].url;
			this_element.append("<a href='javascript:add_card(" + this_element.data("card_id") + ");'><img height='60px' width='60px' src='" + url + "' /></a>");
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

function add_card(card_id) {
	$("#evo_list").append("<tr></tr>");
	var last_tr = $("#evo_list").find("tr:last");
	last_tr.append("<td></td>");
	last_tr.find("td:last").append($(".search_result_small_img[data-card_id=" + card_id.toString() + "]"));
	last_tr.find("td span").removeClass("search_result_small_img");
	last_tr.find("td a").attr("href", "javascript:remove_card(" + card_id.toString() + ");");
	var card_data = card_db({id: card_id.toString()}).first();
	last_tr.append("<td>" + card_data["name"] + "</td>");
	// evo_1~8
	for (var i = 1; i <= 8; ++i) {
		var index_name = "evo_" + i.toString();
		last_tr.append("<td>" + get_img_by_card_id(card_data[index_name]) + "</td>");
	}
	$("#card_search_result").html("");
}

$(document).ready(function() {
	$("#input_card_name").on({
		keyup: input_card_name_keyup_fun
	});
	load_card_from_wiki();
});