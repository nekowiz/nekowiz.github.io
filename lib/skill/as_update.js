as_skill_index = {
	"攻擊系": {
		"攻擊上升": [["ratio", "%數 / 數值"]],
		"連續攻擊": [["ratio", "%數 / 數值"], ["atks", "攻擊次數"]],
		"屬性特效": [["ratio", "%數 / 數值"], ["elmts", "對應屬性"]],
		"全體攻擊（分散）": [["ratio", "%數 / 數值"]],
		"全體攻擊（不分散）": [["ratio", "%數 / 數值"]],
		"賭博攻擊": [["ratio", "%數 / 數值"]],
		"吸收": [["ratio", "%數 / 數值"]],
		"連段數攻擊上升": [["ratio", "%數 / 數值"], ["combo", "連段數"]],
		"瀕死攻擊上升": [["ratio", "%數 / 數值"], ["hp", "HP %數"]],
		"快調攻擊上升": [["ratio", "%數 / 數值"], ["hp", "HP %數"]],
		"隊伍屬性攻擊上升": [["ratio", "%數 / 數值"], ["elmts", "對應屬性"]],
		"戰鬥不能攻擊上升": [["ratio", "%數 / 數值"]],
		"問答屬性數攻擊上升": [["ratio1", "一屬性 %數"], ["ratio2", "二屬性 %數"], ["ratio3", "三屬性 %數"]],
		"屬性的庇佑": [["ratio1", "一屬性 %數"], ["ratio2", "二屬性 %數"], ["ratio3", "三屬性 %數"]]
	},
	"回復系": {
		"回復（自身）": [["mode", "模式（%數 / 絕對值）"], ["ratio", "%數 / 數值"]],
		"回復（隊友）": [["mode", "模式（%數 / 絕對值）"], ["ratio", "%數 / 數值"], ["elmts", "對應屬性"]]
	}
};

function errorHandler() {
	$("#msg").html("資料修改/新增發生錯誤，請再試一次").delay(3000).hide(1000);
	$("#search").delay(3000).show(1000);
	$("#data").html("");
}

as_skills = {};

function get_as_skill() {
	// 先根據 type 產生對應表單
	var as_skill_name = $("#as_skill_name").val();
	var as_type = $("#as_type").val();
	var as_args_type = [];
	for (var skill_group in as_skill_index) {
		for (var skill_type in as_skill_index[skill_group]) {
			if (as_type == skill_type) {
				as_args_type = as_skill_index[skill_group][skill_type];
			}
		}
	}
	
	// 從 as_skills 裡面取得對應的技能資料
	var as_skill_data = as_skills[as_skill_name];
	
	var table_elem = $("<table class='article-table'></table>");
	table_elem.append("<tr><th>技能名稱</th><td>" + as_skill_name + "</td></tr>");
	table_elem.append("<tr><th>技能類型</th><td>" + as_type + "</td></tr>");
	
	if (as_skill_data != undefined) {
		// info
		var info_val = (as_skill_data["info"] != undefined ? as_skill_data["info"] : "");
		table_elem.append("<tr><th>技能說明 (info)</th><td><input type='text' size='50' id='info' value='" + info_val + "' /></td></tr>");
		
		for (var arg_index in as_args_type) {
			var arg = as_args_type[arg_index];
			var arg_val = "";
			
			if (as_skill_data != undefined  && as_skill_data[arg[0]] != undefined) {
				arg_val = as_skill_data[arg[0]];
			}
			
			table_elem.append("<tr><th>" + arg[1] + " (" + arg[0] + ")</th><td><input type='text' size='50' id='" + arg[0] + "' value='" + arg_val + "' /></td></tr>");
		}
		
		// verified
		table_elem.append("<tr><th>是否已實測確認？ (verified)</th><td><select id='verified'><option value='false' selected='selected'>未確認</option><option value='true'>已確認</option></select></td></tr>");
		if (as_skill_data["verified"] == "true") {
			table_elem.find("select").val("true");
		}
	} else {
		// as_skills 中沒有資料，新創一個
		table_elem.append("<tr><th>技能說明 (info)</th><td><input type='text' size='50' id='info' value='' /></td></tr>");
		
		for (var arg_index in as_args_type) {
			var arg = as_args_type[arg_index];
			var arg_val = "";
			
			table_elem.append("<tr><th>" + arg[1] + " (" + arg[0] + ")</th><td><input type='text' size='50' id='" + arg[0] + "' value='' /></td></tr>");
		}
		
		// verified
		table_elem.append("<tr><th>是否已實測確認？ (verified)</th><td><select id='verified'><option value='false' selected='selected'>未確認</option><option value='true'>已確認</option></select></td></tr>");
	}
	$("#data").hide().html(table_elem).show(500);
	$("#search").hide(500);
	
	$("#data").append("<button id='cancel_btn'>取消編輯</button>&nbsp;<button id='confirm_btn'>確認編輯</button>");
	$("#cancel_btn").on("click", function() {
		$("#data").hide(500).html("");
		$("#search").show(500);
	});
	$("#confirm_btn").on("click", function() {
		$("#data").hide(500);
		$("#msg").html("答題技能資料修改中...").show(500);
		
		// 產生技能文字
		var skill_text = "|" + as_skill_name + "={{ #switch: {{{data}}}\n";
		skill_text += "    |info=" + $("#info").val() + "\n";
		skill_text += "    |type=" + as_type + "\n";
		for (var arg_index in as_args_type) {
			var arg = as_args_type[arg_index][0];
			var arg_val = $("#" + arg).val();
			
			skill_text += "    |" + arg + "=" + arg_val + "\n";
		}
		skill_text += "    |verified=" + $("#verified").val() + "\n";
		skill_text += "    |\n    }}\n";
		
		// 重新取得技能資料
		$.ajax({
			url: "http://zh.nekowiz.wikia.com/wiki/Template:Skill/Answer/Data?action=raw",
			cache: false
		}).done(function (data) {
			var final_text = "";
			var data_split = data.split("\n");
			var status = 0;
			var current_as_skill_data = {};
			var current_text = "";
			
			// 取得 type 的 index
			var type_index_arr = [];
			for (var skill_group in as_skill_index) {
				for (var skill_type in as_skill_index[skill_group]) {
					type_index_arr.push(skill_type);
				}
			}
			
			for (var line in data_split) {
				trim_line = $.trim(data_split[line]);
				if (trim_line[0] != "|" && trim_line[0] != "}") {
					final_text += data_split[line] + "\n";
					continue;
				}
				
				// 還沒有在技能裡面
				if (status == 0 || status == 2) {
					if (trim_line.search("switch") != -1) {
						var equal_pos = trim_line.search("=");
						current_as_skill_data = {};
						current_as_skill_data["as_skill_name"] = trim_line.substr(1, equal_pos - 1);
						current_as_skill_data["as_skill_data"] = {};
						current_text = data_split[line] + "\n";
						status += 1;
					} else if (trim_line.search("尚無技能資料") != -1 && status == 0) {
						// 最後了，如果都沒插入，就插吧
						final_text += skill_text;
						final_text += data_split[line] + "\n";
					} else {
						final_text += data_split[line] + "\n";
					}
				}
				// 在技能裡面
				else if (status == 1 || status == 3) {
					// 技能結束
					if (trim_line.search("}}") != -1) {
						if (current_as_skill_data["as_skill_name"] == as_skill_name) {
							if (status == 1 && current_as_skill_data["as_skill_data"]["type"] == as_type) {
								final_text += skill_text;
								status = 3;
							}
							status -= 1;
							
						} else {
							current_text += data_split[line] + "\n";
							
							if ( status == 1 && type_index_arr.indexOf(current_as_skill_data["as_skill_data"]["type"]) > type_index_arr.indexOf(as_type)) {
								// 超過了，插入吧
								final_text += skill_text;
								final_text += current_text;
								status = 2;
							} else {
								final_text += current_text;
								status -= 1;
							}
						}
					} else {
						current_text += data_split[line] + "\n";
						// 沒有資料的行數
						var equal_pos = trim_line.search("=");
						if (equal_pos != -1) {
							// 儲存資料
							var skill_index = trim_line.substr(1, equal_pos - 1);
							var skill_data = trim_line.substr(equal_pos + 1);
							current_as_skill_data["as_skill_data"][skill_index] = skill_data;
						}
					}
				} else {
					final_text += data_split[line] + "\n";
				}
			}
			
			// 將 final_text 寫回去頁面
			$.ajax({
				url: mw.util.wikiScript('api'),
				data: {
					format: 'json',
					action: 'edit',
					title: 'Template:Skill/Answer/Data',
					text: final_text,
					token: mw.user.tokens.get('editToken')
				},
				dataType: 'json',
				type: 'POST',
				cache: false,
				success: function( data ) {
					if ( data && data.edit && data.edit.result == 'Success' ) {
						// 成功新增題目
						$("#msg").html("技能資料修改/新增完成").delay(1000).hide(1000);
						$("#search").delay(1000).show(1000);
						$("#data").html("");
						window.location.reload();
					} else if ( data && data.error ) {
						errorHandler();
						// alert( 'Error: API returned error code "' + data.error.code + '": ' + data.error.info );
					} else {
						errorHandler();
						// alert( 'Error: Unknown result from API.' );
					}
				},
				error:	function( xhr ) {
					errorHandler();
					// alert( 'Error: Request failed.' );
				}
			});
		});
	});
}

function load_as_skill() {
	// 取得該頁面資料
	$.ajax({
		url: "http://zh.nekowiz.wikia.com/wiki/Template:Skill/Answer/Data?action=raw",
		cache: false
	}).done(function (data) {
		var data_split = data.split("\n");
		var status = 0;
		var current_as_skill_data = {};
		for (var line in data_split) {
			line = $.trim(data_split[line]);
			if (line[0] != "|" && line[0] != "}") {
				continue;
			}
			
			// 還沒有在技能裡面
			if (status == 0) {
				if (line.search("switch") == -1) {
					continue;
				}
				var equal_pos = line.search("=");
				current_as_skill_data = {};
				current_as_skill_data["as_skill_name"] = line.substr(1, equal_pos - 1);
				current_as_skill_data["as_skill_data"] = {};
				status = 1;
			}
			// 在技能裡面
			else if (status == 1) {
				// 技能結束
				if (line.search("}}") != -1) {
					as_skills[current_as_skill_data["as_skill_name"]] = current_as_skill_data["as_skill_data"];
					// as_skills.push(current_as_skill_data);
					status = 0;
					continue;
				}
				// 沒有資料的行數
				var equal_pos = line.search("=");
				if (equal_pos == -1) {
					continue;
				}
				// 儲存資料
				var skill_index = line.substr(1, equal_pos - 1);
				var skill_data = line.substr(equal_pos + 1);
				current_as_skill_data["as_skill_data"][skill_index] = skill_data;
			}
		}
		
		// 資料讀取完畢
		$("#msg").html("技能資料讀取完畢").delay(1000).hide(1000);
		$("#search").delay(1000).show(1000);
	});
}

function search_skill() {
	var skill_name = $("#as_skill_name").val();
	var result = "<hr />技能搜尋結果（檢查是否重複）：<br />";
	for (var skill in as_skills) {
		if (skill.search(skill_name) != -1) {
			result += skill + "<br />";
		}
	}
	$("#data").height("auto").html(result).show();
}

$(document).ready(function () {
	// 產生 select
	var as_type_select = $("#as_type");
	var element_str = "";
	for (var skill_type in as_skill_index) {
		element_str += "<optgroup label='" + skill_type + "'>";
		for (var skill_name in as_skill_index[skill_type]) {
			element_str += "<option value='" + skill_name + "'>" + skill_name + "</option>";
		}
		element_str += "</optgroup>";
	}
	as_type_select.append(element_str);
	
	// 註冊 onclick event
	$("#get_as_skill").on("click", function() {
		get_as_skill();
	});
	
	$("#as_skill_name").on("input", function() {
		search_skill();
	});
	
	// 讀取技能資料
	$("#msg").html("讀取技能資料中...").show();
	
	load_as_skill();
});