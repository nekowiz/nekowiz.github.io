$().ready(function () {
	$("div.LeaderFinder input[name='cardId']").on("keypress", function (evt) {
		if (evt.which == 13) {
			$("button.findLeader").click();
		}
	});
	$("button.randomLeader").click();
	showHotSearch();
});
function findLeader() {
	var enabled = $("button.findLeader").attr("disabled");
	if (enabled === "disabled") {
		return false;
	}
	var cardId = $("div.LeaderFinder input[name='cardId']").val();
	if (cardId === "") {
		$("div.LeaderFinder input[name='cardId']").select();
		return false;
	}
	$("button.findLeader").attr("disabled", true);
	cardId = parseInt(cardId);
	if (isNaN(cardId)) {
		$("div.LeaderFinderResult").empty();
		$("div.LeaderFinderNoResult").show();
		$("button.findLeader").attr("disabled", false);
		$("div.LeaderFinder input[name='cardId']").select();
		return false;
	}
	$("div.LeaderFinder input[name='cardId']").val(cardId);
	updateSearchData(cardId);
	getLeaderData(function (leaderTextData) {
		var leaderData = jQuery.parseJSON(leaderTextData);
		if (!leaderData) {
			leaderData = {};
		}
		$("span.leaderCount").html("共有 " + Object.keys(leaderData).length + " 位魔導士登錄");
		var finderResults = getObjects(leaderData, "cardId", cardId);
		$("div.LeaderFinderResult").empty();
		if (finderResults.length > 0) {
			showFindResults(finderResults);
			$("div.LeaderFinderNoResult").hide();
		} else {
			$("div.LeaderFinderNoResult").show();
			$("button.findLeader").attr("disabled", false);
			$("div.LeaderFinder input[name='cardId']").select();
		}
	});
}
function getObjects(obj, key, val) {
	var objects = [];
	for (var i in obj) {
		if (!obj.hasOwnProperty(i)) {
			continue;
		}
		if (typeof obj[i] == 'object') {
			objects = objects.concat(getObjects(obj[i], key, val));
		} else if (i == key) {
			console.log(key);
			if (obj[key] == val) {
				objects.push(obj);
			}
		}
	}
	return objects;
}
function showFindResults(results) {
	var cardId = $("div.LeaderFinder input[name='cardId']").val();
	getCardMaxLv(cardId, function (data) {
		var content = data.parse.text['*'];
		var startIndex = content.indexOf("<p>") + 3;
		var endIndex = content.indexOf("\n<\/p>");
		var CardMaxLv = parseInt(content.substring(startIndex, endIndex));

		$(results).each(function (index, result) {
			$("div.LeaderFinderResult").append($("div.LeaderTemplate").html());
			var LeaderNode = $("div.LeaderFinderResult div.leader:nth-child(" + (index + 1) + ")");
			var lv = result.cardLv;
			if (lv.toUpperCase() == "MAX") {
				lv = "MAX";
			} else if (parseInt(lv) >= parseInt(CardMaxLv)) {
				lv = "MAX";
			} else {
				lv = "Lv. " + lv;
			}
			$(LeaderNode).find("div.cardLv").html(lv);
			$(LeaderNode).find("div.cardExtra").html(result.cardExtra);
			if (parseInt(result.cardExtra) <= 0) {
				$(LeaderNode).find("div.cardExtra").hide();
			}
			$(LeaderNode).find("div.userId").html(result.userId);
			$(LeaderNode).find("a.userName").html(result.userName);
			$(LeaderNode).find("div.userNote").html(result.userNote);
		});

		getLeaderImage(cardId, function (data) {
			$("div.LeaderFinderResult").find("div.img").html($(data.parse.text['*']).children().attr('target', '_blank'));
		});

		$("div.LeaderFinderResultCount").html("搜尋到 " + results.length + " 位魔導士");
		$("button.findLeader").attr("disabled", false);
		$("div.LeaderFinder input[name='cardId']").select();
	});
}
function getLeaderImage(cardId, successFunc) {
	$.get(mw.util.wikiScript('api'), {
		format: 'json',
		action: 'parse',
		text: decodeURI('%7B%7BCard/Image/Small%7Cid=' + cardId + '%7Clink=true%7D%7D')
	}, successFunc, 'json');
}
function getCardMaxLv(cardId, successFunc) {
	$.get(mw.util.wikiScript('api'), {
		format: 'json',
		action: 'parse',
		text: decodeURI('%7B%7BCard/Data/' + cardId + '%7Cdata=MaxLevel%7D%7D')
	}, successFunc, 'json');
}
function randomLeader() {
	var enabled = $("button.randomLeader").attr("disabled");
	if (enabled === "disabled") {
		return false;
	}
	$("div.LeaderFinder input[name='cardId']").val("");
	$("button.randomLeader").attr("disabled", true);
	getLeaderData(function (leaderTextData) {
		var leaderData = jQuery.parseJSON(leaderTextData);
		if (!leaderData) {
			leaderData = {};
		}
		var randomindexs = [];
		var randomResults = [];
		var maxRandomCount = (Math.floor(Math.random() * 50) + 1);
		var leaderDataLength = Object.keys(leaderData).length;
		$("span.leaderCount").html("共有 " + leaderDataLength + " 位魔導士登錄");
		var count = maxRandomCount;
		if (maxRandomCount > leaderDataLength) {
			count = leaderDataLength;
		}
		for (var i = 0; i < count; i++) {
			var randomIndex = Math.floor(Math.random() * (leaderDataLength));
			if (randomindexs.indexOf(randomIndex) >= 0) {
				i--;
				continue;
			}
			var wikiaUserId = Object.keys(leaderData)[randomIndex];
			if (!leaderData[wikiaUserId].leaders) {
				i--;
				continue;
			}
			var wikiaUserLeaders = leaderData[wikiaUserId].leaders;
			if (wikiaUserLeaders.length == 0) {
				if (maxRandomCount < leaderDataLength) {
					i--;
				}
				randomindexs.push(randomIndex);
				continue;
			}
			var randomLeaderIndex = Math.floor(Math.random() * (wikiaUserLeaders.length));
			randomResults.push({
				"wikiaUserId": wikiaUserId,
				"leader": wikiaUserLeaders[randomLeaderIndex]
			});
			randomindexs.push(randomIndex);
		}

		$("div.LeaderFinderResult").empty();
		if (randomResults.length > 0) {
			showRandomResults(randomResults);
			$("div.LeaderFinderNoResult").hide();
		} else {
			$("div.LeaderFinderNoResult").show();
			$("button.randomLeader").attr("disabled", false);
		}
	});
}
function showRandomResults(results) {
	$(results).each(function (index, result) {
		var wikiaUserId = result.wikiaUserId;
		var leader = result.leader;
		$("div.LeaderFinderResult").append($("div.LeaderTemplate").html());
		var LeaderNode = $("div.LeaderFinderResult div.leader:nth-child(" + (index + 1) + ")");
		getLeaderImage(leader.cardId, function (data) {
			$(LeaderNode).find("div.img").html($(data.parse.text['*']).children().attr('target', '_blank'));
		});

		if (leader.cardLv.toUpperCase() === "MAX") {
			$(LeaderNode).find("div.cardLv").html("MAX");
		} else if (leader.cardLv % 10 == 0) {
			getCardMaxLv(leader.cardId, function (data) {
				var content = data.parse.text['*'];
				var startIndex = content.indexOf("<p>") + 3;
				var endIndex = content.indexOf("\n<\/p>");
				var CardMaxLv = parseInt(content.substring(startIndex, endIndex));

				var lv = leader.cardLv;
				if (parseInt(lv) >= parseInt(CardMaxLv)) {
					lv = "MAX";
				} else {
					lv = "Lv. " + lv;
				}
				$(LeaderNode).find("div.cardLv").html(lv);
			});
		} else {
			$(LeaderNode).find("div.cardLv").html("Lv. " + leader.cardLv);
		}

		$(LeaderNode).find("div.cardExtra").html(leader.cardExtra);
		if (parseInt(leader.cardExtra) <= 0) {
			$(LeaderNode).find("div.cardExtra").hide();
		}
		$(LeaderNode).find("div.userId").html(leader.userId);
		$(LeaderNode).find("a.userName").html(leader.userName);
		$(LeaderNode).find("a.userName").attr("href", "http://zh.nekowiz.wikia.com/wiki/%E4%BD%BF%E7%94%A8%E8%80%85:" + wikiaUserId);
		$(LeaderNode).find("a.userName").attr("target", "_blank");
		$(LeaderNode).find("div.userNote").html(leader.userNote);
	});
	$("div.LeaderFinderResultCount").html("與 " + results.length + " 位魔導士相當有緣分");
	$("button.randomLeader").attr("disabled", false);
}
function getSearchData(successFunc) {
	$.ajax({
		url: "http://zh.nekowiz.wikia.com/wiki/Template:Leader/SearchData?action=raw",
		cache: false,
		success: successFunc,
		error: function (xhr) {
			console.log("error");
		}
	});
}
function saveSearchData(searchData) {
	$.ajax({
		url: mw.util.wikiScript('api'),
		data: {
			format: 'json',
			action: 'edit',
			title: 'Template:Leader/SearchData',
			text: searchData,
			token: mw.user.tokens.get('editToken')
		},
		dataType: 'json',
		type: 'POST',
		cache: false,
		success: function (data) {
		},
		error: function (xhr) {
			console.log("error");
		}
	});
}
function updateSearchData(cardId) {
	getSearchData(function (searchTextData) {
		var searchData = jQuery.parseJSON(searchTextData);
		if (!searchData) {
			searchData = {};
		}
		if (!searchData[cardId]) {
			searchData[cardId] = {};
		}
		if (!searchData[cardId].count) {
			searchData[cardId].count = 0;
		}
		searchData[cardId].count++;
		saveSearchData(JSON.stringify(searchData));
	});
}
function showHotSearch() {
	getSearchData(function (searchTextData) {
		var searchData = jQuery.parseJSON(searchTextData);
		var sortSearchData = [];
		for (var cardId in searchData) {
			var card = searchData[cardId];
			sortSearchData.push({
				"cardId": cardId,
				"searchCount": card.count
			});
		}
		sortSearchData.sort(function (a, b) {
			return b.searchCount - a.searchCount;
		});
		for (var i = 0; i < 13; i++) {
			if (!sortSearchData[i]) {
				continue;
			}
			var hotLeaderDiv = document.createElement("div");
			$(hotLeaderDiv).attr("class", "hotLeader");
			$("div.HotLeader").append(hotLeaderDiv);
			getHotLeaderImage(sortSearchData[i].cardId, hotLeaderDiv);
		}
	});
}
function getHotLeaderImage(cardId, rootNode) {
	$.get(mw.util.wikiScript('api'), {
		format: 'json',
		action: 'parse',
		text: decodeURI('%7B%7BCard/Image/Small%7Cid=' + cardId + '%7Clink=%7C%7D%7D')
	}, function (data) {
		$(rootNode).html($(data.parse.text['*']).children().removeAttr('href').removeClass("image"));
		$(rootNode).find("a").on("click", function () {
			$("div.LeaderFinder input[name='cardId']").val(cardId);
			$("button.findLeader").click();
		});
	}, 'json');
}