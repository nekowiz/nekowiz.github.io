randomNum = (max,min=0) ->
	return Math.floor(Math.random() * (max - min) + min)

cards = []
combo = 0
panel_color = 1
current_stage = 0
current_enemies = []

check_all_cards_loaded = () ->
	for card in cards
		if card.load_done == false
			return
	start()

class Card
	constructor: (@id) ->
		# Call ajax to find card hp, atk, as, ss
		@load_done = false
		$.ajax
			url: "http://zh.nekowiz.wikia.com/wiki/%E6%A8%A1%E6%9D%BF:Card/Data/#{@id}?action=raw"
			cache: false
			success: (data) =>
				store_data = (line) ->
					index = line.slice(0, line.indexOf("="))
					value = line.slice(line.indexOf("=")+1)
					if index != ""
						_this[index] = value
				store_data $.trim(line) for line in data.split("|")[1..-2]
				@current_hp = @max_hp
				@current_cd = (@ss_cd == "") ? "0" : @ss_cd
				
				@as_data = {}
				@ss_data = {}
				
				# 讀取 AS 技能資料
				$.ajax
					url: "http://zh.nekowiz.wikia.com/wiki/Template:Skill/Answer/Data?action=raw"
					cache: false
					async: false
					success: (data) =>
						lines = data.split("\n")
						status = 0
						for line in lines
							line = $.trim(line)
							if line.indexOf("#switch: {{{data}}}") != -1
								skill_name = line[1..line.indexOf("=")-1]
								if skill_name == @as
									status = 1
							else if status == 1
								if line.indexOf("}}") != -1
									status = 0
								else
									index = line[line.indexOf("|") + 1..line.indexOf("=")-1]
									value = line[line.indexOf("=") + 1..]
									if index != ""
										_this["as_data"][index] = value
				
				# 讀取 SS 資料
				$.ajax
					url: "http://zh.nekowiz.wikia.com/wiki/Template:Skill/Special/Data?action=raw"
					cache: false
					async: false
					success: (data) =>
						lines = data.split("\n")
						status = 0
						for line in lines
							line = $.trim(line)
							if line.indexOf("#switch: {{{data}}}") != -1
								skill_name = line[1..line.indexOf("=")-1]
								if skill_name == @ss
									status = 1
							else if status == 1
								if line.indexOf("}}") != -1
									status = 0
								else
									index = line[line.indexOf("|") + 1..line.indexOf("=")-1]
									value = line[line.indexOf("=") + 1..]
									if index != ""
										_this["ss_data"][index] = value
				@buffs = []
				@attack_info = {}
				@load_done = true
				check_all_cards_loaded()
	attack: (enemies) ->
		for i in [1..@attack_info.atk_times]
			# 打單體
			if @attack_info.target_num == 1
				target_enemy = enemies[0]
				if @target != -1
					if enemies[@target].is_dead()
						@target = -1
				if @target == -1
					for enemy in enemies
						if not enemy.is_dead()
							target_enemy = enemy
							break
				else
					target_enemy = enemies[@target]
				
				attack_ratio = @attack_info.atk_ratio
				# 檢查屬性特攻
				if @attack_info.prop_atk.indexOf(enemy.prop) != -1
					attack_ratio *= @attack_info.prop_atk_ratio
				
				atk = Math.floor(@max_atk * attack_ratio * (100 + combo) / 100)
				atk_value = enemy.damage(atk, @prop)
				# 吸血
				@current_hp += atk_value * @attack_info.life_drain
				if @current_hp >= @max_hp
					@current_hp = @max_hp
				@current_hp = Math.floor(@current_hp)
							
			# 打全體
			else
				atk = @max_atk * @attack_info.atk_ratio * (100 + combo) / 100
				enemies_alive_count = 0
				for enemy in enemies
					if not enemy.is_dead()
						enemies_alive_count += 1
				if @attack_info.target_all_average != 0
					atk /= enemies_alive_count
				atk = Math.floor(atk)
				for enemy in enemies
					enemy.damage(atk, @prop)
		
	attack_info_set: (prop, as_enable) ->
		if prop.indexOf(@prop) != -1
			if as_enable
				switch @as_data.type
					when "攻擊上升"
						@attack_info.atk_ratio *= (@as_data.ratio/100)
					when "連續攻擊"
						@attack_info.atk_ratio *= (@as_data.ratio/100/@as_data.atks)
						@attack_info.atk_times = @as_data.atks
					when "屬性特效"
						@attack_info.prop_atk = @as_data.elmts
						@attack_info.prop_atk_ratio = @as_data.ratio
					when "全體攻擊（分散）"
						@attack_info.atk_ratio *= @as_data.ratio
						@attack_info.target_num = 5
						@attack_info.target_all_average = 1
					when "全體攻擊（不分散）"
						@attack_info.atk_ratio *= @as_data.ratio
						@attack_info.target_num = 5
						@attack_info.target_all_average = 0
					when "隨機攻擊"
						@attack_info.atk_ratio *= (randomNum(@as_data.ratio, 100)/100)
					when "吸收"
						@attack_info.life_drain = @as_data.ratio / 100
					when "連段數攻擊上升"
						if combo >= @as_data.combo
							@attack_info.atk_ratio *= (@as_data.ratio/100)
					when "瀕死攻擊上升"
						if (@current_hp/@max_hp) <= (@as_data.hp/100)
							@attack_info.atk_ratio *= (@as_data.ratio/100)
					when "快調攻擊上升"
						if (@current_hp/@max_hp) >= (@as_data.hp/100)
							@attack_info.atk_ratio *= (@as_data.ratio/100)
					when "隊伍屬性攻擊上升"
						for card in cards
							if @as_data.elmts.indexOf(card.prop) != -1
								card.attack_info.atk_ratio *= (@as_data.ratio/100)
					when "戰鬥不能攻擊上升"
						atk_ratio = 1
						for card in cards
							if card.current_hp == 0
								atk_ratio += (@as_data.ratio/100)
						@attack_info.atk_ratio *= atk_ratio
					when "問答屬性數攻擊上升"
						index = "ratio#{panel_color}"
						@attack_info.atk_ratio *= @as_data[index]
					when "隊伍屬性數攻擊上升"
						elmts_count = {"火":0, "水":0, "雷":0}
						for card in cards[..-2]
							elmts_count[card.prop] = 1
						elmts_num = elmts_count["火"] + elmts_count["水"] + elmts_count["雷"]
						index = "ratio#{elmts_num}"
						@attack_info.atk_ratio *= @as_data[index]
					when "自身回復"
						if @as_data.mode == "%數"
							@current_hp += @max_hp * @as_data.ratio / 100
						else if @as_data.mode == "絕對值"
							@current_hp += @as_data.ratio
						@current_hp = Math.floor(@current_hp)
						if @current_hp > @max_hp
							@current_hp = @max_hp
					when "屬性回復"
						for card in cards[..-2]
							if @as_data.elmts.indexOf(card.prop) != -1
								if @as_data.mode == "%數"
									card.current_hp += card.max_hp * @as_data.ratio / 100
								else if @as_data.mode == "絕對值"
									card.current_hp += @as_data.ratio
								card.current_hp = Math.floor(card.current_hp)
								if card.current_hp > card.max_hp
									card.current_hp = card.max_hp
	target_reset: () ->
		@target = -1
	target_set: (target_index) ->
		@target = target_index
	attack_info_reset: () ->
		@attack_info.atk_ratio = 1
		@attack_info.target_num = 1
		@attack_info.target_all_average = 0
		@attack_info.atk_times = 1
		@attack_info.prop_atk = ""
		@attack_info.prop_atk_ratio = 1
		@attack_info.life_drain = 0
	damage: (atk, prop) ->
		atk_value = atk * props[prop][@prop]
		if atk_value > @current_hp
			atk_value = @current_hp
		atk_value = Math.floor(atk_value)
		@current_hp -= atk_value
		return atk_value
	is_dead: () ->
		return @current_hp == 0
				

load_cards = () ->
	for i in [1..6]
		card_id = $("#card#{i}").val()
		cards[i-1] = new Card card_id

props = {
	"火": {
		"火": 1.0
		"水": 0.5
		"雷": 1.5
	}
	"水": {
		"火": 1.5
		"水": 1.0
		"雷": 0.5
	}
	"雷": {
		"火": 0.5
		"水": 1.5
		"雷": 1.0
	}
}
		
monsters = {
	997: {
		name: "黃金色武士亡靈"
		prop: "雷"
	}
	104: {
		name: "閃電之魔導書"
		prop: "雷"
	}
	998: {
		name: "奮起於月夜中的鎧甲武士"
		prop: "雷"
	}
	107: {
		name: "白銀寶壺"
		prop: "雷"
	}
	995: {
		name: "蒼色武士亡靈"
		prop: "水"
	}
}

stages = [
	[
		[997, 8000, 1, 1, 400, [0]],
		[997, 8000, 1, 1, 400, [0]],
		[104, 5500, 1, 5, 150, [0]]
	],
	[
		[998, 12000, 2, 1, 400, [0]],
		[107, 10000, 1, 1, 600, [0]],
		[995, 6000, 2, 1, 675, [0]]
	]
]

randomTurn = (turn) ->
	max = turn + 1
	min = turn - 1
	if min <= 0
		min = 1
	return randomNum(max, min)

class Enemy
	constructor: (enemy_data) ->
		@id = enemy_data[0]
		@max_hp = enemy_data[1]
		@current_hp = enemy_data[1]
		@turn = enemy_data[2]
		@current_turn = randomTurn(enemy_data[2])
		@target = enemy_data[3]
		@atk = enemy_data[4]
		@ai = enemy_data[5]
		@name = monsters[@id].name
		@prop = monsters[@id].prop
		@current_ai_index = 0
		@buffs = []
	is_dead: () ->
		return @current_hp == 0
	damage: (atk, prop) ->
		atk_value = atk * props[prop][@prop]
		if atk_value > @current_hp
			atk_value = @current_hp
		atk_value = Math.floor(atk_value)
		@current_hp -= atk_value
		return atk_value
	one_turn_pass: () ->
		if not @is_dead()
			@current_turn -= 1
	use_skill: () ->
		current_ai = @ai[@current_ai_index]
		
		# if current_ai == 0
		
		@current_ai_index += 1
		@current_ai_index %= @ai.length
	attack: () ->
		# 檢查 ai
		current_ai = @ai[@current_ai_index]
		if current_ai == 0
			# 普通攻擊，無技能影響，隨機選定目標
			attack_count = 0
			for i in ([0..4].sort () -> 0.5 - Math.random())
				if attack_count == @target
					break
				if not cards[i].is_dead()
					cards[i].damage(@atk, @prop)
					attack_count += 1
		if @current_turn == 0
			@current_turn = @turn
			
enemies_one_turn_pass = () ->
	for enemy in current_enemies
		enemy.one_turn_pass()
	for enemy in current_enemies
		enemy.use_skill()
	for enemy in current_enemies
		enemy.attack()
	

inital_enemy_data = (stage) ->
	return (new Enemy enemy for enemy in stage)

check_stage_clear = (enemies) ->
	for enemy in enemies
		if not enemy.is_dead()
			return false
	return true

check_stage_fail = () ->
	for card in cards
		if not card.is_dead()
			return false
	return true

enable_attacks = () ->
	for i in [1..7]
		index = "#attack_#{i}"
		$(index).attr("disabled", false);
		
disable_attacks = () ->
	for i in [1..7]
		index = "#attack_#{i}"
		$(index).attr("disabled", true);
	
player_action = () ->
	# enable_skills()
	enable_attacks()

###
player_use_skill = (skill) ->
	switch skill.type
		when "單體攻擊"
		when "全體攻擊"
		when "單體百分比攻擊"
		when "全體百分比攻擊"
		when "單體HP消耗攻擊"
		when "毒傷攻擊"
		when "屬性指定回復"
		when "全體回復"
		when "復活"
		when "獻身"
		when "攻擊力增加型"
		when "傷害減輕型"
		when "攻擊回合延遲型"
		when "傷害集中型"
			return
###

player_attack = (prop, as_enable=true) ->
	for card in cards[..-2]
		card.attack(prop, as_enable)
		

play_stage = (stage) ->
	current_enemies = inital_enemy_data stage
	load_enemy_info_to_input()
	# 重設 target
	for card in cards
		card.target_reset()
	player_action()
	###
	enemy_action()
	if check_gameover
		gameover()
		return false
	###

load_card_info_to_input = () ->
	for i in [1..6]
		hp_index = "#card#{i}_hp"
		atk_index = "#card#{i}_atk"
		id_index = "#card#{i}"
		$(hp_index).val(cards[i-1].current_hp)
		$(atk_index).val(cards[i-1].max_atk)
		$(id_index).val(cards[i-1].id)

load_enemy_info_to_input = () ->
	i = 1
	for enemy in current_enemies
		hp_index = "#enemy#{i}_hp"
		$(hp_index).val(enemy.current_hp)
		i += 1

start = () ->
	load_card_info_to_input()
	current_stage = 0
	play_stage(stages[current_stage])
	
stage_all_clear = () ->
	console.log("All stage cleared!!")
	
attack_penal = (prop) ->
	disable_attacks()
	as_enable = $("#as_enable").is(":checked")
	for card in cards[..-2]
		card.attack_info_reset()
	for card in cards[..-2]
		card.attack_info_set(prop, as_enable)
	for card in cards[..-2]
		card.attack(current_enemies)
		if check_stage_clear(current_enemies)
			break
	# 更新怪物 hp
	load_enemy_info_to_input()
	# 檢查是否過關
	if check_stage_clear(current_enemies)
		current_stage += 1
		if current_stage >= stages.length
			stage_all_clear()
		else
			play_stage(stages[current_stage])
	else
		# 換怪物攻擊
		enemies_one_turn_pass()
		# 檢查是否有援助進來
		if not cards[5].is_dead()
			for card,index in cards[..-2]
				if card.is_dead()
					tmp = cards[5]
					cards[5] = cards[index]
					cards[index] = tmp
					break
		# 更新玩家卡片資料
		load_card_info_to_input()
		# 檢查是否全滅
		if check_stage_fail()
			console.log("Stage failed!!")
		else
			# 換玩家行動
			player_action()
			
	

$ ->
	$("#load_card").on "click", ->
		load_cards()
	for i in [1..7]
		index = "#attack_#{i}"
		$(index).on "click", ->
			attack_penal($(index).text())