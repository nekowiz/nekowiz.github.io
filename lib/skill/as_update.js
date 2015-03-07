as_skill_index = {
	"攻擊系": {
		"攻擊上升": ["ratio"],
		"連續攻擊": ["ratio", "atks"],
		"屬性特效": ["ratio", "elmts"],
		"全體攻擊（分散）": ["ratio"],
		"全體攻擊（不分散）": ["ratio"],
		"隨機攻擊": ["ratio"],
		"吸收": ["ratio"],
		"連段數攻擊上升": ["ratio", "combo"],
		"瀕死攻擊上升": ["ratio", "hp"],
		"快調攻擊上升": ["ratio", "hp"],
		"隊伍屬性攻擊上升": ["ratio", "elmts"],
		"戰鬥不能攻擊上升": ["ratio"],
		"問答屬性數攻擊上升": ["ratio1", "ratio2", "ratio3"],
		"隊伍屬性數攻擊上升": ["ratio1", "ratio2", "ratio3"]
	},
	"回復系": {
		"自身回復": ["mode", "ratio"],
		"屬性回復": ["mode", "ratio", "elmts"]
	}
};

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
	for (var data_index in as_skill_data) {
		var skill_data_val = as_skill_data[data_index];
		table_elem.append("<tr><th>" + data_index + "</th><td><input type='text' id='" + data_index + "' value='" + skill_data_val + "' /></td></tr>");
	}
	$("#data").html(table_elem);
	$("#search").hide(1000);
	$("#data").show(1000);
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
	
	// 讀取技能資料
	$("#msg").html("讀取技能資料中...");
	
	load_as_skill();
});