keys = [
	['prop', '屬性', 'select', 'prop'],
	['breed', '種族', 'select', 'breed'],
	['rank', 'Rank', 'select', 'rank'],
	['name', '卡片名稱'],
	['max_hp', '最高血量'],
	['max_atk', '最高攻擊力'],
	['cost', 'Cost'],
	['card_filename', '卡片大圖名稱'],
	['small_filename', ''],
	['evo_now', '目前進化級數', 'select', 'evo_level'],
	['evo_max', '最高進化級數', 'select', 'evo_level'],
	['max_level', ''],
	['as', '答題技能名稱'],
	['ss', '特殊技能名稱'],
	['ss_cd', ''],
	['evo_1', '進化素材1 ID', 'select', 'evo_material'],
	['evo_2', '進化素材2 ID', 'select', 'evo_material'],
	['evo_3', '進化素材3 ID', 'select', 'evo_material'],
	['evo_4', '進化素材4 ID', 'select', 'evo_material'],
	['evo_5', '進化素材5 ID', 'select', 'evo_material'],
	['evo_6', '進化素材6 ID', 'select', 'evo_material'],
	['evo_7', '進化素材7 ID', 'select', 'evo_material'],
	['evo_8', '進化素材8 ID', 'select', 'evo_material'],
	['evo_price', '進化所需金幣'],
	['sell_price', '販賣獲得金幣'],
	['evo_from', '進化自卡片 ID'],
	['evo_to', '進化為卡片 ID'],
	['evo_chain_before_note', ''],
	['evo_chain_after_note', ''],
	['evo_chain_branch', ''],
	['get_source', '取得來源'],
	['comment', '備註', 'textarea']
];

options = {
	prop: ["火", "水", "雷"],
	breed: ["戰士", "術士", "魔族", "魔法生物", "妖精", "亞人", "龍族", "神族", "物質", "天使", "道具"],
	rank: ["C", "C+", "B", "B+", "A", "A+", "S", "S+", "SS"],
	evo_level: [1, 2, 3, 4, 5],
	evo_material: ["none"]
};

evo_material = {
	"火": [
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 137, "name": "火石碰碰吉 (C+)" },
		{ "id": 138, "name": "噴火碰碰吉 (B)" },
		{ "id": 139, "name": "紅眼魔法碰碰吉 (B+)" },
		{ "id": 1480, "name": "(A)" },
		{ "id": 1481, "name": "(A+)" },
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 128, "name": "火之花精靈 (C+)" },
		{ "id": 129, "name": "躍動的火之花精靈 (B+)" },
		{ "id": 130, "name": "月夜舞動的火之花精靈 (A)" },
		{ "id": 1486, "name": "(A+)" },
		{ "id": 1487, "name": "(S)" },
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 110, "name": "火蘑菇人‧新秀 (C+)" },
		{ "id": 111, "name": "火蘑菇人‧英雄 (B+)" },
		{ "id": 112, "name": "火蘑菇人‧大師 (A)" },
		{ "id": 1492, "name": "(A+)" },
		{ "id": 1493, "name": "(S)" },
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 146, "name": "緋色樹精 (A)" },
		{ "id": 147, "name": "葉隙光芒之神樹 (A+)" },
		{ "id": 148, "name": "太陽樹尤克特拉希爾 (S)" },
		{ "id": 1498, "name": "灼耀太陽之世界樹 (S+)" },
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 119, "name": "火貍貓 (C+)" },
		{ "id": 120, "name": "火狸貓首領 (B+)" },
		{ "id": 121, "name": "火狸貓大王 (A)" },
		{ "id": 1501, "name": "(A+)" },
		{ "id": 1502, "name": "(S)" },
	],
	"水": [
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 140, "name": "冰石碰碰吉 (C+)" },
		{ "id": 141, "name": "降雨碰碰吉 (B)" },
		{ "id": 142, "name": "青眼魔法碰碰吉 (B+)" },
		{ "id": 1482, "name": "(A)" },
		{ "id": 1483, "name": "(A+)" },
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 131, "name": "水之花精靈 (C+)" },
		{ "id": 132, "name": "躍動的水之花精靈 (B+)" },
		{ "id": 133, "name": "月夜舞動的水之花精靈 (A)" },
		{ "id": 1488, "name": "(A+)" },
		{ "id": 1489, "name": "(S)" },
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 113, "name": "冰蘑菇人‧新秀 (C+)" },
		{ "id": 114, "name": "冰蘑菇人‧英雄 (B+)" },
		{ "id": 115, "name": "冰蘑菇人‧大師 (A)" },
		{ "id": 1494, "name": "(A+)" },
		{ "id": 1495, "name": "(S)" },
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 149, "name": "翡翠樹精 (A)" },
		{ "id": 150, "name": "生命海洋之神樹 (A+)" },
		{ "id": 151, "name": "蒼海樹尤克特拉希爾 (S)" },
		{ "id": 1499, "name": "幽幻蒼海之世界樹 (S+)" },
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 122, "name": "雨貍貓 (C+)" },
		{ "id": 123, "name": "雨狸貓首領 (B+)" },
		{ "id": 124, "name": "雨狸貓大王 (A)" },
		{ "id": 1503, "name": "(A+)" },
		{ "id": 1504, "name": "(S)" },
	],
	"雷": [
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 143, "name": "雷石碰碰吉 (C+)" },
		{ "id": 144, "name": "電光碰碰吉 (B)" },
		{ "id": 145, "name": "光眼魔法碰碰吉 (B+)" },
		{ "id": 1484, "name": "(A)" },
		{ "id": 1485, "name": "(A+)" },
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 134, "name": "雷之花精靈 (C+)" },
		{ "id": 135, "name": "躍動的雷之花精靈 (B+)" },
		{ "id": 136, "name": "月夜舞動的雷之花精靈 (A)" },
		{ "id": 1490, "name": "如幻想般舞動的雷之花精靈 (A+)" },
		{ "id": 1491, "name": "(S)" },
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 116, "name": "雷蘑菇人‧新秀 (C+)" },
		{ "id": 117, "name": "雷蘑菇人‧英雄 (B+)" },
		{ "id": 118, "name": "雷蘑菇人‧大師 (A)" },
		{ "id": 1496, "name": "(A+)" },
		{ "id": 1497, "name": "雷蘑菇人‧君王 (S)" },
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 152, "name": "月光樹精 (A)" },
		{ "id": 153, "name": "向天祈求之神樹 (A+)" },
		{ "id": 154, "name": "天雷樹尤克特拉希爾 (S)" },
		{ "id": 1500, "name": "壯實雷神之世界樹 (S+)" },
		{ "id": "disabled", "name": "────────────────────" },
		{ "id": 125, "name": "雷貍貓 (C+)" },
		{ "id": 126, "name": "雷狸貓首領 (B+)" },
		{ "id": 127, "name": "雷狸貓大王 (A)" },
		{ "id": 1505, "name": "(A+)" },
		{ "id": 1506, "name": "(S)" },
	]
};

// For updating evo materials dynamically.
lastProp = "";
evo_id   = [];

strDefaultOption     = "<待填>";
strNoProp            = "<請先選擇屬性>";
strOtherMaterial     = "# 我想自己輸入素材";
strBackToRegMaterial = "# 換回一般進化素材";

function get_page_title_by_id(card_id) {
	return "模板:Card/Data/" + card_id.toString();
}

function errorHandler() {
	$("#msg").html("卡片修改/新增發生錯誤，請再試一次").delay(5000).hide(1000);
	$("#search").delay(5000).show(1000);
	$("#data").html("");
	$('html, body').animate({
		scrollTop: 0
	}, 1000);
}

function getCardDataDone(data) {
	// 卡片編號
	var card_id = parseInt($("#card_id").val());

	// 根據編號取得 page title
	var title = get_page_title_by_id(card_id);

	var card_data_split = data.split("\n");
	var card_data = {};
	card_data["id"] = card_id.toString();
	var status = 0;
	for (var line_index in card_data_split) {
		if (line_index == "") {
			continue;
		}
		var line = card_data_split[line_index];
		if (line[0] == "|") {
			var before = line.substr(1, line.search("=") - 1);
			var after = line.substr(line.search("=") + 1);
			if (before != "") {
				card_data[before] = after;
			}
		}
	}

	// For updating evo materials dynamically.
	lastProp = undefined === card_data.prop ? "" : card_data.prop.toString();
	for (var i = 1; i <= 8; i++) {
		evo_id["evo_"+i] = undefined === card_data["evo_"+i] ? "" : card_data["evo_"+i];
	}

	// 產生編輯表單
	var table_elem = $("<table class='article-table'><tr><th>卡片圖示</th><td class='card_smallfile'></td></tr><tr><th>卡片 ID</th><td>" + card_data["id"] + "</td></tr></table>");
	for (var key_index in keys) {
		var key = keys[key_index];
		if (key[1] == "") {
			table_elem.append("<tr style='display: none;'><th>" + key[1] + "</th><td><input type='hidden' id='" + key[0] + "' value='" + (card_data[key[0]] == undefined ? "" : card_data[key[0]]) + "' /></td></tr>");
		} else {
			if (key[2] && key[2] == "textarea") {
				table_elem.append("<tr><th>" + key[1] + "</th><td><textarea id='" + key[0] + "'>" + (card_data[key[0]] == undefined ? "" : card_data[key[0]]) + "</textarea></td></tr>");
			}
			else if (key[2] && key[2] == "select") {
				table_elem.append($("<tr>").append(
					$("<th>").html(key[1]),
					$("<td>").append(
						$('<select>').attr('id', key[0]).append(function() {
							var htmlOptions;
							if ("evo_material" === key[3]) {
								htmlOptions = htmlEvoMaterialOptions(key[0], card_data.prop);
							}
							else {
								htmlOptions = $("<option>").html(strDefaultOption).val("");
								for (var option_index in options[key[3]]) {
									var option = options[key[3]][option_index];
									if ( undefined === card_data[key[0]] || option != card_data[key[0]] )
										htmlOptions.after($('<option>').html(option));
									else
										htmlOptions.after($('<option>').html(option).attr('selected', true));
								}
							}
							return htmlOptions;
						})
					)
				));
			}
			else {
				table_elem.append("<tr><th>" + key[1] + "</th><td><input type='text' id='" + key[0] + "' value='" + (card_data[key[0]] == undefined ? "" : card_data[key[0]]) + "' /></td></tr>");
			}
		}
	}
	$("#msg").html("讀取完成").hide(500);
	$("#data").html(table_elem).show(500, "swing", function () {
		var cardId = parseInt($("#card_id").val());
		// Set the dafault file name of small pic to the card data if it is not created.
		if ( undefined === card_data.small_filename || "" === card_data.small_filename ) {
			if ( cardId >= 0)
				$("#small_filename").val(leftZeroPad(cardId, 4) + ".png");
			else
				$("#small_filename").val(cardId.toString() + ".png");
		}
		// Otherwise, use the file name of setting.
		else
			$("#small_filename").val(card_data.small_filename);
		getCardImage();
	});
	$("#data").append("<button id='cancel_btn'>取消編輯</button>&nbsp;<button id='confirm_btn'>確認編輯</button>");
	$("#cancel_btn").on("click", function () {
		$("#data").hide(500).html("");
		$("#search").show(500);
		$('html, body').animate({
			scrollTop: 0
		}, 500);
	});
	$("#confirm_btn").on("click", function () {
		$("#msg").html("修改卡片資料中...").show(500);
		$("#data").hide(500);
		$('html, body').animate({
			scrollTop: 0
		}, 500);

		// 產生該張卡片的資料表單
		var card_text = "{{ Card/Data/{{{data}}}\n|id=" + card_id.toString() + "\n";
		for (var key_index in keys) {
			var key = keys[key_index];
			card_text += "|" + key[0] + "=" + $("#" + key[0]).val() + "\n";
		}
		card_text += "}}\n";

		// 修改頁面
		$.ajax({
			url: mw.util.wikiScript('api'),
			data: {
				format: 'json',
				action: 'edit',
				title: 'Template:Card/Data/' + card_id.toString(),
				text: card_text,
				token: mw.user.tokens.get('editToken')
			},
			dataType: 'json',
			type: 'POST',
			cache: false,
			success: function (data) {
				if (data && data.edit && data.edit.result == 'Success') {
					// 成功新增題目
					$("#msg").html("卡片修改/新增完成").delay(500).hide(500);
					$("#search").delay(500).show(500, "swing", function () {
						$("#card_id").select();
					});
					$("#data").html("");
				} else if (data && data.error) {
					errorHandler();
					// alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
				} else {
					errorHandler();
					// alert( 'Error: Unknown result from API.' );
				}
			},
			error: function (xhr) {
				errorHandler();
				// alert( 'Error: Request failed.' );
			}
		});
	});

	// For updating evo materials dynamically.
	$("#prop").change(function() {
		var changedProp = $(this).val();

		for (var i = 1; i <= 8; i++) {
			$("#evo_"+i).html(htmlEvoMaterialOptions("evo_"+i, changedProp));
		}

		if ( "" !== changedProp )
			lastProp = changedProp;
	});

	// For updating evo materials dynamically.
	for (var i = 1; i <= 8; i++) {
		$("#evo_"+i).change(function() {
			var htmlSelectedOption = $(this).children(":selected").html();
			var cardEvoKey         = $(this).attr("id");
			var selectedVal        = $(this).val();
			// input the evo material manually.
			if ( strOtherMaterial === htmlSelectedOption ) {
				var evoCardId = prompt("請輸入進化素材的卡片編號ID (整數)。");

				// No-input, or cancel.
				if ( null === evoCardId )
					return;
				// Not-a-Number.
				else if ( isNaN(evoCardId) ) {
					alert("進化素材的編號只能是數字！");
					return;
				}
				// Seccessfully. Update the Options.
				else {
					evo_id[cardEvoKey] = evoCardId;
					$(this).html(htmlEvoMaterialOptions(cardEvoKey, lastProp));
				}
			}
			// Back to the Regular Evo Materials from some Special Evo Material.
			else if ( strBackToRegMaterial === htmlSelectedOption ) {
				evo_id[cardEvoKey] = "";
				$(this).html(htmlEvoMaterialOptions(cardEvoKey, lastProp));
			}
			// Keep the recodes of the Regular Evo Materials (for updating evo materials dynamically).
			else if ( isRegularEvoMaterial(selectedVal) ) {
				evo_id[cardEvoKey] = selectedVal;
			}
		});
	}
}

function getCardData() {
	// 卡片編號
	var card_id = parseInt($("#card_id").val());
	if ( isNaN(card_id) ) {
		alert("卡片圖鑑編號只能是數字！");
		return;
	}

	// 隱藏搜尋欄
	$("#search").hide(1000);
	$("#msg").html("讀取卡片資料中...").show(1000);

	// 根據編號取得 page title
	var title = get_page_title_by_id(card_id);

	// 取得該頁面資料
	$.ajax({
		url: "http://zh.nekowiz.wikia.com/wiki/" + title + "?action=raw",
		cache: false,
		statusCode: {
			404: function () {
				getCardDataDone("");
			}
		}
	}).done(function (data) {
		getCardDataDone(data);
	});
}

function leftZeroPad(val, minLength) {
	val = val.toString();
	if (val.length >= minLength) {
		return val;
	} else {
		return leftZeroPad("0" + val, minLength);
	}
}

function getUrlParams() {
	var paramMap = {};
	if (location.search.length == 0) {
		return paramMap;
	}
	var parts = location.search.substring(1).split("&");

	for (var i = 0; i < parts.length; i++) {
		var component = parts[i].split("=");
		paramMap [decodeURIComponent(component[0])] = decodeURIComponent(component[1]);
	}
	return paramMap;
}
function getCardImage() {
	var fileName = $("#small_filename").val();
	$.get(mw.util.wikiScript('api'), {
		format: 'json',
		action: 'parse',
		text: decodeURI('%5B%5Bfile%3A' + fileName + '%7C60px%7Clink= %5D%5D')
	}, function (data) {
		var content = $(data.parse.text['*']).children();
		$("td.card_smallfile").append(content);
	}, 'json');
}

/**
 * Dynamically Update the Evo Material Option when changing the Prop, inputting the Special Evo Material.
 * @param  {string} cardEvoKey   A key to evo_id (the recode of card_data.evo_i in function getCardDataDone).
 * @param  {string} changedProp  The New Prop. of some changing.
 * @return {HTML}                Options in HTML format.
 */
function htmlEvoMaterialOptions(cardEvoKey, changedProp) {
	if ( undefined === evo_material[changedProp] )
		// Keep the orginal evo material in "value".
		return $("<option>").html(strNoProp).val(evo_id[cardEvoKey]);

	var htmlOptions = $("<option>").html(strDefaultOption).val("");
	if ( isRegularEvoMaterial(evo_id[cardEvoKey]) ) {
		// if it have been filled in, and user change it from some prop. to another, then we shift its ID to another corresponding to new prop.
		// example: "火石碰碰吉 (C+)" -> "冰石碰碰吉 (C+)" if "火" -> "水".
		if ( "" !== evo_id[cardEvoKey] && "" !== lastProp && "" !== changedProp && lastProp !== changedProp ) {
			for (var i = evo_material[lastProp].length - 1; i >= 0; i--) {
				if ( evo_id[cardEvoKey] == evo_material[lastProp][i].id ) {
					evo_id[cardEvoKey] = evo_material[changedProp][i].id;
					break;
				}
			}
		}

		htmlOptions.after($('<option>').html(strOtherMaterial).val(""));

		for (var option_index in evo_material[changedProp]) {
			var option = evo_material[changedProp][option_index];
			if ( "disabled" == option.id )
				htmlOptions.after($('<option>').html(option.name).attr("disabled", true));
			else if ( undefined === evo_id[cardEvoKey] || option.id != evo_id[cardEvoKey] )
				htmlOptions.after($('<option>').html(option.name).val(option.id));
			else
				htmlOptions.after($('<option>').html(option.name).val(option.id).attr('selected', true));
		}
	}
	// Special Evo Material. (It's usually from Evevt Quest)
	else {
		htmlOptions.after($('<option>').html(strOtherMaterial).val(""));
		htmlOptions.after($('<option>').html(strBackToRegMaterial).val(""));
		htmlOptions.after($('<option>').html(evo_id[cardEvoKey]).attr('selected', true));
	}
	return htmlOptions;
}

/**
 * Check is evoCardID a Regular Evo Material ID. Null String is regarded as Regular.
 * @param  {int}     evoCardId  The Card ID which is to be checked.
 * @return {Boolean}
 */
function isRegularEvoMaterial(evoCardId) {
	return (110 <= evoCardId && evoCardId <= 154) || (1480 <= evoCardId && evoCardId <= 1506) || "" == evoCardId;
}

$(document).ready(function () {
	if (mw.user.anonymous()) {
		alert('請先登入Wikia');
		location.replace("http://zh.nekowiz.wikia.com/wiki/");
		return false;
	}
	$("#get_card").on('click', function () {
		getCardData();
	});
	$(document).on("keydown", function (evt) {
		if ($("#data").is(":visible") && evt.keyCode == 115) {
			$("#confirm_btn").click();
		}
	});
	$("#card_id").on("click", function (evt) {
		$(this).select();
	});
	$("#card_id").on("keypress", function (evt) {
		if (evt.which == 13) {
			getCardData();
		}
	});
	$("#card_id").select();

	var getParams = getUrlParams();
	if (getParams.card_id) {
		$("#card_id").val(getParams.card_id);
		$("#get_card").click();
	}
});
