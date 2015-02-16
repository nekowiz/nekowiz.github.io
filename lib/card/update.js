function get_page_title_by_id(card_id) {
	var card_id_low = Math.floor((card_id - 1) / 20) * 20 + 1;
	var card_id_high = card_id_low + 19;
	return "模板:Card/Data/" + card_id_low.toString() + "-" + card_id_high.toString();
}

function getCardData() {
	// 隱藏搜尋欄
	$("#search").hide(1000);
	$("#msg").html("讀取卡片資料中...").show(1000);

	// 卡片編號
	var card_id = parseInt($("#card_id").val());
	
	// 根據編號取得 page title
	var title = get_page_title_by_id(card_id);
	
	// 取得該頁面資料
	$.ajax({
		url: "http://zh.nekowiz.wikia.com/wiki/" + title + "?action=raw",
		cache: false,
		statusCode: {
			404: function () {
				$("#msg").html("此卡片的模板尚未建立，請先建立該卡片的模版並且加入最基本的 switch 語句後再編輯卡片<br /><button id='reset_btn'>確定</button>");
				$("#reset_btn").on("click", function() {
					$("#msg").hide(1000).html("");
					$("#search").show(1000);
				});
			}
		}
	}).done(function (data) {
		var card_data_split = data.split("\n");
		var card_data = {};
		var status = 0;
		for (var line_index in card_data_split) {
			var line = card_data_split[line_index];
			if (status == 0 && line[0] == "|" && line.substr(1, line.search("=") - 1) == card_id.toString()) {
				 status = 1;
				 card_data["id"] = card_id.toString();
			} else if (status == 1) {
				if (line[0] == "}") {
					break;
				} else {
					var before = line.substr(line.search("\\|")+1, line.search("=") - line.search("\\|") - 1);
					var after = line.substr(line.search("=")+1);
					if (before != "") {
						card_data[before] = after;
					}
				}
			}
		}
		
		var keys = [
			['prop', '屬性'],
			['breed', '種族'],
			['rank', 'Rank'],
			['name', '卡片名稱'],
			['max_atk', '最高攻擊力'],
			['max_hp', '最高血量'],
			['cost', 'Cost'],
			['card_filename', '卡片大圖名稱'],
			['small_filename', '卡片小圖名稱'],
			['evo_now', '目前進化級數'],
			['evo_max', '最高進化級數'],
			['max_level', '最高等級'],
			['as', '答題技能'],
			['ss', '特殊技能'],
			['ss_cd', '特殊技能冷卻回合數'],
			['evo_1', '進化卡片1 ID'],
			['evo_2', '進化卡片2 ID'],
			['evo_3', '進化卡片3 ID'],
			['evo_4', '進化卡片4 ID'],
			['evo_5', '進化卡片5 ID'],
			['evo_6', '進化卡片6 ID'],
			['evo_7', '進化卡片7 ID'],
			['evo_8', '進化卡片8 ID'],
			['evo_price', '進化所需金幣'],
			['sell_price', '販賣獲得金幣'],
			['evo_from', '進化自卡片 ID'],
			['evo_to', '進化為卡片 ID']
		];
		
		// 產生編輯表單
		var table_elem = $("<table class='article-table'><tr><th>卡片 ID</th><td>" + card_data["id"] + "</td></tr></table>");
		for (var key_index in keys) {
			var key = keys[key_index];
			table_elem.append("<tr><th>" + key[1] + "</th><td><input type='text' id='" + key[0] + "' value='" + (card_data[key[0]] == undefined ? "" : card_data[key[0]]) + "' /></td></tr>");
		}
		$("#msg").html("讀取完成").hide(1000);
		$("#data").html(table_elem).show(1000);
	}).error;
}

$(document).ready(function () {
	$("#get_card").on('click', function() {
		getCardData();
	});
});