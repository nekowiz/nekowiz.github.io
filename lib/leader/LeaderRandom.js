
$().ready(function () {
	$("button.randomLeader").click();
});
function getLeaderData(successFunc) {
	$.ajax({
		url: "http://zh.nekowiz.wikia.com/wiki/Template:Leader/Data?action=raw",
		cache: false,
		success: successFunc,
		error: function (xhr) {
			errorHandler();
		}
	});
}
function getLeaderImage(cardId, rootNode) {
	$.get(mw.util.wikiScript('api'), {
		format: 'json',
		action: 'parse',
		text: decodeURI('%7B%7BCard/Image/Small%7Cid=' + cardId + '%7Clink=true%7D%7D')
	}, function (data) {
		$(rootNode).find("div.img").html($(data.parse.text['*']).children().attr('target', '_blank'));
	}, 'json');
}
function getCardMaxLv(cardId, successFunc) {
	$.get(mw.util.wikiScript('api'), {
		format: 'json',
		action: 'parse',
		text: decodeURI('%7B%7BCard/Data/' + cardId + '%7Cdata=MaxLevel%7D%7D')
	}, successFunc, 'json');
}
function randomLeader() {
	$("button.randomLeader").attr("disabled", true);
	getLeaderData(function (leaderTextData) {
		var leaderData = jQuery.parseJSON(leaderTextData);
		if (!leaderData) {
			leaderData = {};
		}
		var randomindexs = [];
		var randomResults = [];
		var maxRandomCount = 9;
		var leaderDataLength = Object.keys(leaderData).length;
		var count = maxRandomCount;
		if (maxRandomCount > leaderDataLength) {
			count = leaderDataLength;
		}
		for (var i = 0; i < count; i++) {
			var randomIndex;
			if (i == 0) {
				randomIndex = 0;
			} else {
				randomIndex = Math.floor(Math.random() * (leaderDataLength));
			}
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
				if (maxRandomCount <= leaderDataLength) {
					i--;
				}
				randomindexs.push(randomIndex);
				continue;
			}
			var randomLeaderIndex = Math.floor(Math.random() * (wikiaUserLeaders.length));
			randomResults.push(wikiaUserLeaders[randomLeaderIndex]);
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
		$("div.LeaderFinderResult").append($("div.LeaderTemplate").html());
		var LeaderNode = $("div.LeaderFinderResult div.leader:nth-child(" + (index + 1) + ")");

		getLeaderImage(result.cardId, LeaderNode);

		if (result.cardLv.toUpperCase() == "MAX") {
			$(LeaderNode).find("div.cardLv").html("MAX");
		} else if (result.cardLv % 10 == 0) {
			getCardMaxLv(result.cardId, function (data) {
				var content = data.parse.text['*'];
				var startIndex = content.indexOf("<p>") + 3;
				var endIndex = content.indexOf("\n<\/p>");
				var CardMaxLv = parseInt(content.substring(startIndex, endIndex));

				var lv = result.cardLv;
				if (parseInt(lv) >= parseInt(CardMaxLv)) {
					lv = "MAX";
				} else {
					lv = "Lv. " + lv;
				}
				$(LeaderNode).find("div.cardLv").html(lv);
			});
		} else {
			$(LeaderNode).find("div.cardLv").html("Lv. " + result.cardLv);
		}

		$(LeaderNode).find("div.cardExtra").html(result.cardExtra);
		if (parseInt(result.cardExtra) <= 0) {
			$(LeaderNode).find("div.cardExtra").hide();
		}
		$(LeaderNode).find("div.userId").html(result.userId);
		$(LeaderNode).find("div.userName").html(result.userName);
		$(LeaderNode).find("div.userNote").html(result.userNote);
	});
	$("button.randomLeader").attr("disabled", false);
}
function goLeaderFinder() {
	window.location.assign("http://zh.nekowiz.wikia.com/wiki/%E4%BB%A3%E8%A1%A8%E6%90%9C%E5%B0%8B%E5%99%A8");
}