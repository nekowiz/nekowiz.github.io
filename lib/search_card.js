function input_card_name_keyup_fun() {
	$("#card_serach_result").html("");
	var card_name = $("#input_card_name").val();
	if (card_name == "") {
		return;
	}
	$("#card_serach_result").html("搜尋中...");
	var search_result_html = "";
	var db_result = card_db({name: {like: card_name}}).limit(10);
	db_result.each(function (record,recordnumber) {
		search_result_html += "<span class='search_result_small_img' data-small_filename='" + record["small_filename"] + "'></span>" + record["name"] + "<br />";
	});
	$("#card_search_result").html(search_result_html);
	$(".search_result_small_img").each(function() {
		var small_url = "http://zh.nekowiz.wikia.com/api.php?action=query&prop=imageinfo&titles=File:" + $(this).data("small_filename") + "&iiprop=url&format=json";
		var this_element = $(this);
		$.getJSON(small_url, function(data) {
			for (var first in data.query.pages) {break;}
			var url = data.query.pages[first].imageinfo[0].url;
			this_element.append("<a href='add_card(" + record["id"] + ");'><img height='60px' width='60px' src='" + url + "' /></a>");
		});
	});
}

function add_card(card_id) {
	
}

$(document).ready(function() {
	$("#input_card_name").on({
		keyup: input_card_name_keyup_fun
	});
	load_card_from_wiki();
});