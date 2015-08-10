function gen_repeat_event_array(title, url, start_date, end_date, start_time, end_time, repeat_range, repeat_string) {
	var result = [];
	var current_m = moment(start_date);
	var end_m = moment(end_date);
	while(current_m.isBefore(end_m)) {
		if (moment.duration(end_time).subtract(moment.duration(start_time)).asHours() == 24) {
			var current_element = {
				title: title,
				url: url,
				start: moment(current_m).add(moment.duration(start_time)).format("YYYY-MM-DD"),
				end: moment(current_m).add(moment.duration(end_time)).format("YYYY-MM-DD")
			}
		} else {
			var current_element = {
				title: title,
				url: url,
				start: moment(current_m).add(moment.duration(start_time)).format("YYYY-MM-DD HH:mm"),
				end: moment(current_m).add(moment.duration(end_time)).format("YYYY-MM-DD HH:mm")
			}
		}
		result.push(current_element);
		current_m.add(repeat_range, repeat_string);
	}
	return result;
} 

var wizneko_events = [
{
	title: "Dragon's Blader",
	url: "http://zh.nekowiz.wikia.com/wiki/%E6%B4%BB%E5%8B%95%E4%BB%BB%E5%8B%99/Dragon%27s_Blader",
	start: "2015-08-05",
	end: "2015-08-12",
	backgroundColor: "DarkBlue"
},
{
	title: "妖精花園",
	url: "http://zh.nekowiz.wikia.com/wiki/%E6%B4%BB%E5%8B%95%E4%BB%BB%E5%8B%99/%E5%A6%96%E7%B2%BE%E8%8A%B1%E5%9C%92",
	start: "2015-07-29",
	end: "2015-08-18",
	backgroundColor: "DarkGreen"
},
{
	title: "和白貓夥伴們一起冒險喵！",
	url: "http://zh.nekowiz.wikia.com/wiki/%E6%B4%BB%E5%8B%95%E4%BB%BB%E5%8B%99/%E5%A6%96%E7%B2%BE%E8%8A%B1%E5%9C%92",
	start: "2015-08-05",
	end: "2015-09-02",
	backgroundColor: "green"
},
{
	title: "香港補習天王",
	url: "http://zh.nekowiz.wikia.com/wiki/%E6%B4%BB%E5%8B%95%E4%BB%BB%E5%8B%99/%E5%A6%96%E7%B2%BE%E8%8A%B1%E5%9C%92",
	start: "2015-07-22",
	end: "2015-08-12",
	backgroundColor: "gray"
}
];
// green, DarkBlue, DarkRed, gray, DarkGreen 

// 日曜
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"曜日任務(碰碰吉)",
"http://zh.nekowiz.wikia.com/wiki/%E6%9B%9C%E6%97%A5%E4%BB%BB%E5%8B%99#.E9.80.B1.E4.B8.80.E7.9A.84.E8.88.9E.E8.80.85",
"2015-01-19",
"2015-12-31",
"00:00",
"24:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"曜日任務(花)",
"http://zh.nekowiz.wikia.com/wiki/%E6%9B%9C%E6%97%A5%E4%BB%BB%E5%8B%99#.E9.80.B1.E4.BA.8C.E7.9A.84.E5.BD.A9.E8.8A.B1",
"2015-01-20",
"2015-12-31",
"00:00",
"24:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"曜日任務(蘑菇)",
"http://zh.nekowiz.wikia.com/wiki/%E6%9B%9C%E6%97%A5%E4%BB%BB%E5%8B%99#.E6.B0.B4.E6.9B.9C.E3.81.AE.E9.9D.99.E9.9C.8A",
"2015-01-14",
"2015-12-31",
"00:00",
"24:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"曜日任務(樹)",
"http://zh.nekowiz.wikia.com/wiki/%E6%9B%9C%E6%97%A5%E4%BB%BB%E5%8B%99#.E6.9C.A8.E6.9B.9C.E3.81.AE.E7.A5.9E.E6.A8.B9",
"2015-01-15",
"2015-12-31",
"00:00",
"24:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"曜日任務(狸貓)",
"http://zh.nekowiz.wikia.com/wiki/%E6%9B%9C%E6%97%A5%E4%BB%BB%E5%8B%99#.E9.80.B1.E4.BA.94.E7.9A.84.E5.B0.8F.E4.B8.91",
"2015-01-16",
"2015-12-31",
"00:00",
"24:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"曜日任務(金幣)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E9.87.91.E5.B9.A3.E7.9A.84.E5.AF.B6.E5.A3.BA.E7.8F.BE.E8.BA.AB.EF.BC.81",
"2015-01-18",
"2015-12-31",
"00:00",
"24:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"曜日任務(金幣)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E9.87.91.E5.B9.A3.E7.9A.84.E5.AF.B6.E5.A3.BA.E7.8F.BE.E8.BA.AB.EF.BC.81",
"2015-01-16",
"2015-12-31",
"00:00",
"24:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"曜日任務(碰碰吉)",
"http://zh.nekowiz.wikia.com/wiki/%E6%9B%9C%E6%97%A5%E4%BB%BB%E5%8B%99#.E9.80.B1.E4.B8.80.E7.9A.84.E8.88.9E.E8.80.85",
"2015-01-17",
"2015-12-31",
"09:00",
"10:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"曜日任務(花)",
"http://zh.nekowiz.wikia.com/wiki/%E6%9B%9C%E6%97%A5%E4%BB%BB%E5%8B%99#.E9.80.B1.E4.BA.8C.E7.9A.84.E5.BD.A9.E8.8A.B1",
"2015-01-17",
"2015-12-31",
"10:00",
"11:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"曜日任務(蘑菇)",
"http://zh.nekowiz.wikia.com/wiki/%E6%9B%9C%E6%97%A5%E4%BB%BB%E5%8B%99#.E6.B0.B4.E6.9B.9C.E3.81.AE.E9.9D.99.E9.9C.8A",
"2015-01-17",
"2015-12-31",
"11:00",
"12:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"曜日任務(樹)",
"http://zh.nekowiz.wikia.com/wiki/%E6%9B%9C%E6%97%A5%E4%BB%BB%E5%8B%99#.E6.9C.A8.E6.9B.9C.E3.81.AE.E7.A5.9E.E6.A8.B9",
"2015-01-17",
"2015-12-31",
"12:00",
"13:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"曜日任務(狸貓)",
"http://zh.nekowiz.wikia.com/wiki/%E6%9B%9C%E6%97%A5%E4%BB%BB%E5%8B%99#.E9.80.B1.E4.BA.94.E7.9A.84.E5.B0.8F.E4.B8.91",
"2015-01-17",
"2015-12-31",
"13:00",
"14:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"曜日任務(碰碰吉)",
"http://zh.nekowiz.wikia.com/wiki/%E6%9B%9C%E6%97%A5%E4%BB%BB%E5%8B%99#.E9.80.B1.E4.B8.80.E7.9A.84.E8.88.9E.E8.80.85",
"2015-01-17",
"2015-12-31",
"14:00",
"15:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"曜日任務(花)",
"http://zh.nekowiz.wikia.com/wiki/%E6%9B%9C%E6%97%A5%E4%BB%BB%E5%8B%99#.E9.80.B1.E4.BA.8C.E7.9A.84.E5.BD.A9.E8.8A.B1",
"2015-01-17",
"2015-12-31",
"15:00",
"16:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"曜日任務(蘑菇)",
"http://zh.nekowiz.wikia.com/wiki/%E6%9B%9C%E6%97%A5%E4%BB%BB%E5%8B%99#.E6.B0.B4.E6.9B.9C.E3.81.AE.E9.9D.99.E9.9C.8A",
"2015-01-17",
"2015-12-31",
"16:00",
"17:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"曜日任務(樹)",
"http://zh.nekowiz.wikia.com/wiki/%E6%9B%9C%E6%97%A5%E4%BB%BB%E5%8B%99#.E6.9C.A8.E6.9B.9C.E3.81.AE.E7.A5.9E.E6.A8.B9",
"2015-01-17",
"2015-12-31",
"17:00",
"18:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"曜日任務(狸貓)",
"http://zh.nekowiz.wikia.com/wiki/%E6%9B%9C%E6%97%A5%E4%BB%BB%E5%8B%99#.E9.80.B1.E4.BA.94.E7.9A.84.E5.B0.8F.E4.B8.91",
"2015-01-17",
"2015-12-31",
"18:00",
"19:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"曜日任務(碰碰吉)",
"http://zh.nekowiz.wikia.com/wiki/%E6%9B%9C%E6%97%A5%E4%BB%BB%E5%8B%99#.E9.80.B1.E4.B8.80.E7.9A.84.E8.88.9E.E8.80.85",
"2015-01-17",
"2015-12-31",
"19:00",
"20:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"曜日任務(花)",
"http://zh.nekowiz.wikia.com/wiki/%E6%9B%9C%E6%97%A5%E4%BB%BB%E5%8B%99#.E9.80.B1.E4.BA.8C.E7.9A.84.E5.BD.A9.E8.8A.B1",
"2015-01-17",
"2015-12-31",
"20:00",
"21:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"曜日任務(蘑菇)",
"http://zh.nekowiz.wikia.com/wiki/%E6%9B%9C%E6%97%A5%E4%BB%BB%E5%8B%99#.E6.B0.B4.E6.9B.9C.E3.81.AE.E9.9D.99.E9.9C.8A",
"2015-01-17",
"2015-12-31",
"21:00",
"22:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"曜日任務(樹)",
"http://zh.nekowiz.wikia.com/wiki/%E6%9B%9C%E6%97%A5%E4%BB%BB%E5%8B%99#.E6.9C.A8.E6.9B.9C.E3.81.AE.E7.A5.9E.E6.A8.B9",
"2015-01-17",
"2015-12-31",
"22:00",
"23:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"曜日任務(狸貓)",
"http://zh.nekowiz.wikia.com/wiki/%E6%9B%9C%E6%97%A5%E4%BB%BB%E5%8B%99#.E9.80.B1.E4.BA.94.E7.9A.84.E5.B0.8F.E4.B8.91",
"2015-01-17",
"2015-12-31",
"23:00",
"24:00",
7,
"days"));

// 緊急任務
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(火)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E8.B5.A4.E8.89.B2.E7.87.83.E7.87.92.E7.9A.84.E7.81.BC.E7.86.B1.E4.B9.8B.E6.9B.B8",
"2015-01-19",
"2015-12-31",
"09:00",
"11:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(火)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E8.B5.A4.E8.89.B2.E7.87.83.E7.87.92.E7.9A.84.E7.81.BC.E7.86.B1.E4.B9.8B.E6.9B.B8",
"2015-01-19",
"2015-12-31",
"12:00",
"14:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(火)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E8.B5.A4.E8.89.B2.E7.87.83.E7.87.92.E7.9A.84.E7.81.BC.E7.86.B1.E4.B9.8B.E6.9B.B8",
"2015-01-19",
"2015-12-31",
"15:00",
"17:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(火)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E8.B5.A4.E8.89.B2.E7.87.83.E7.87.92.E7.9A.84.E7.81.BC.E7.86.B1.E4.B9.8B.E6.9B.B8",
"2015-01-19",
"2015-12-31",
"19:00",
"21:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(火)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E8.B5.A4.E8.89.B2.E7.87.83.E7.87.92.E7.9A.84.E7.81.BC.E7.86.B1.E4.B9.8B.E6.9B.B8",
"2015-01-19",
"2015-12-31",
"22:00",
"24:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(水)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E9.9D.92.E8.89.B2.E7.A5.9E.E7.A5.95.E7.9A.84.E6.B7.B1.E6.B5.B7.E4.B9.8B.E6.9B.B8",
"2015-01-20",
"2015-12-31",
"09:00",
"11:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(水)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E9.9D.92.E8.89.B2.E7.A5.9E.E7.A5.95.E7.9A.84.E6.B7.B1.E6.B5.B7.E4.B9.8B.E6.9B.B8",
"2015-01-20",
"2015-12-31",
"12:00",
"14:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(水)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E9.9D.92.E8.89.B2.E7.A5.9E.E7.A5.95.E7.9A.84.E6.B7.B1.E6.B5.B7.E4.B9.8B.E6.9B.B8",
"2015-01-20",
"2015-12-31",
"15:00",
"17:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(水)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E9.9D.92.E8.89.B2.E7.A5.9E.E7.A5.95.E7.9A.84.E6.B7.B1.E6.B5.B7.E4.B9.8B.E6.9B.B8",
"2015-01-20",
"2015-12-31",
"19:00",
"21:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(水)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E9.9D.92.E8.89.B2.E7.A5.9E.E7.A5.95.E7.9A.84.E6.B7.B1.E6.B5.B7.E4.B9.8B.E6.9B.B8",
"2015-01-20",
"2015-12-31",
"22:00",
"24:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(雷)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E9.BB.83.E8.89.B2.E8.BC.9D.E7.85.8C.E7.9A.84.E5.85.89.E8.BC.9D.E4.B9.8B.E6.9B.B8",
"2015-01-14",
"2015-12-31",
"09:00",
"11:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(雷)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E9.BB.83.E8.89.B2.E8.BC.9D.E7.85.8C.E7.9A.84.E5.85.89.E8.BC.9D.E4.B9.8B.E6.9B.B8",
"2015-01-14",
"2015-12-31",
"12:00",
"14:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(雷)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E9.BB.83.E8.89.B2.E8.BC.9D.E7.85.8C.E7.9A.84.E5.85.89.E8.BC.9D.E4.B9.8B.E6.9B.B8",
"2015-01-14",
"2015-12-31",
"15:00",
"17:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(雷)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E9.BB.83.E8.89.B2.E8.BC.9D.E7.85.8C.E7.9A.84.E5.85.89.E8.BC.9D.E4.B9.8B.E6.9B.B8",
"2015-01-14",
"2015-12-31",
"19:00",
"21:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(雷)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E9.BB.83.E8.89.B2.E8.BC.9D.E7.85.8C.E7.9A.84.E5.85.89.E8.BC.9D.E4.B9.8B.E6.9B.B8",
"2015-01-14",
"2015-12-31",
"22:00",
"24:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(火)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E8.B5.A4.E8.89.B2.E7.87.83.E7.87.92.E7.9A.84.E7.81.BC.E7.86.B1.E4.B9.8B.E6.9B.B8",
"2015-01-15",
"2015-12-31",
"09:00",
"11:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(火)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E8.B5.A4.E8.89.B2.E7.87.83.E7.87.92.E7.9A.84.E7.81.BC.E7.86.B1.E4.B9.8B.E6.9B.B8",
"2015-01-15",
"2015-12-31",
"12:00",
"14:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(火)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E8.B5.A4.E8.89.B2.E7.87.83.E7.87.92.E7.9A.84.E7.81.BC.E7.86.B1.E4.B9.8B.E6.9B.B8",
"2015-01-15",
"2015-12-31",
"15:00",
"17:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(火)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E8.B5.A4.E8.89.B2.E7.87.83.E7.87.92.E7.9A.84.E7.81.BC.E7.86.B1.E4.B9.8B.E6.9B.B8",
"2015-01-15",
"2015-12-31",
"19:00",
"21:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(火)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E8.B5.A4.E8.89.B2.E7.87.83.E7.87.92.E7.9A.84.E7.81.BC.E7.86.B1.E4.B9.8B.E6.9B.B8",
"2015-01-15",
"2015-12-31",
"22:00",
"24:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(水)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E9.9D.92.E8.89.B2.E7.A5.9E.E7.A5.95.E7.9A.84.E6.B7.B1.E6.B5.B7.E4.B9.8B.E6.9B.B8",
"2015-01-16",
"2015-12-31",
"09:00",
"11:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(水)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E9.9D.92.E8.89.B2.E7.A5.9E.E7.A5.95.E7.9A.84.E6.B7.B1.E6.B5.B7.E4.B9.8B.E6.9B.B8",
"2015-01-16",
"2015-12-31",
"12:00",
"14:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(水)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E9.9D.92.E8.89.B2.E7.A5.9E.E7.A5.95.E7.9A.84.E6.B7.B1.E6.B5.B7.E4.B9.8B.E6.9B.B8",
"2015-01-16",
"2015-12-31",
"15:00",
"17:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(水)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E9.9D.92.E8.89.B2.E7.A5.9E.E7.A5.95.E7.9A.84.E6.B7.B1.E6.B5.B7.E4.B9.8B.E6.9B.B8",
"2015-01-16",
"2015-12-31",
"19:00",
"21:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(水)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E9.9D.92.E8.89.B2.E7.A5.9E.E7.A5.95.E7.9A.84.E6.B7.B1.E6.B5.B7.E4.B9.8B.E6.9B.B8",
"2015-01-16",
"2015-12-31",
"22:00",
"24:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(雷)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E9.BB.83.E8.89.B2.E8.BC.9D.E7.85.8C.E7.9A.84.E5.85.89.E8.BC.9D.E4.B9.8B.E6.9B.B8",
"2015-01-17",
"2015-12-31",
"09:00",
"11:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(雷)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E9.BB.83.E8.89.B2.E8.BC.9D.E7.85.8C.E7.9A.84.E5.85.89.E8.BC.9D.E4.B9.8B.E6.9B.B8",
"2015-01-17",
"2015-12-31",
"12:00",
"14:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(雷)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E9.BB.83.E8.89.B2.E8.BC.9D.E7.85.8C.E7.9A.84.E5.85.89.E8.BC.9D.E4.B9.8B.E6.9B.B8",
"2015-01-17",
"2015-12-31",
"15:00",
"17:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(雷)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E9.BB.83.E8.89.B2.E8.BC.9D.E7.85.8C.E7.9A.84.E5.85.89.E8.BC.9D.E4.B9.8B.E6.9B.B8",
"2015-01-17",
"2015-12-31",
"19:00",
"21:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(雷)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99#.E9.BB.83.E8.89.B2.E8.BC.9D.E7.85.8C.E7.9A.84.E5.85.89.E8.BC.9D.E4.B9.8B.E6.9B.B8",
"2015-01-17",
"2015-12-31",
"22:00",
"24:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(全)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99",
"2015-01-18",
"2015-12-31",
"09:00",
"11:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(全)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99",
"2015-01-18",
"2015-12-31",
"12:00",
"14:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(全)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99",
"2015-01-18",
"2015-12-31",
"15:00",
"17:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(全)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99",
"2015-01-18",
"2015-12-31",
"19:00",
"21:00",
7,
"days"));
wizneko_events = wizneko_events.concat(gen_repeat_event_array(
"魔導書(全)",
"http://zh.nekowiz.wikia.com/wiki/%E7%B7%8A%E6%80%A5%E4%BB%BB%E5%8B%99",
"2015-01-18",
"2015-12-31",
"22:00",
"24:00",
7,
"days"));
