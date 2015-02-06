window.onload = function() {
  init();
};

var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1Phm6RTSNWfgvC7TlBdBVe-1C4afPYTPyR_557qHRaoY/pubhtml';

function init() {
  Tabletop.init( { key: public_spreadsheet_url,
                   callback: showInfo,
                   simpleSheet: true } );
}

function showInfo(data, tabletop) {
  console.log("Successfully processed!");
  var key_value_mapping = data[0];
  for (var i=1; i<data.length; ++i) {
    var id = data[i]["編號"];
    var page_exist = data[i]["頁面是否存在"];
    for (k in data[i]) {
      var value = data[i][k];
      if (k == "編號") {
        continue;
      } else if (k == "頁面是否存在") {
        continue;
      } else {
        var element_name = "#quest_normal_" + id + "_" + key_value_mapping[k];
        var element = $(element_name);
        if (element.data("type") == "link") {
          element.append("<a></a>");
          var a_node = element.find("a");
          var page_name = "一般任務/" + value;
          a_node.html(value);
          a_node.attr("href", "/wiki/" + page_name);
          if (page_exist == "no") {
            a_node.addClass("new");
            a_node.attr("title", page_name + " (頁面不存在)");
          } else {
            a_node.attr("title", page_name);
          }
        } else {
          element.html(value);
        }
      }
    }
  }
  $("#div_info").hide("2000");
  $("#div_data").show("2000");
}