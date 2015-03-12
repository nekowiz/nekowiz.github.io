var Card, Enemy, attack_penal, cards, check_all_cards_loaded, check_stage_clear, check_stage_fail, combo, current_enemies, current_stage, disable_attacks, enable_attacks, enemies_one_turn_pass, inital_enemy_data, load_card_info_to_input, load_cards, load_enemy_info_to_input, monsters, panel_color, play_stage, player_action, player_attack, props, randomNum, randomTurn, stage_all_clear, stages, start;

randomNum = function(max, min) {
  if (min == null) {
    min = 0;
  }
  return Math.floor(Math.random() * (max - min) + min);
};

cards = [];

combo = 0;

panel_color = 1;

current_stage = 0;

current_enemies = [];

check_all_cards_loaded = function() {
  var card, _i, _len;
  for (_i = 0, _len = cards.length; _i < _len; _i++) {
    card = cards[_i];
    if (card.load_done === false) {
      return;
    }
  }
  return start();
};

Card = (function() {
  function Card(_at_id) {
    this.id = _at_id;
    this.load_done = false;
    $.ajax({
      url: "http://zh.nekowiz.wikia.com/wiki/%E6%A8%A1%E6%9D%BF:Card/Data/" + this.id + "?action=raw",
      cache: false,
      success: (function(_this) {
        return function(data) {
          var line, store_data, _i, _len, _ref, _ref1;
          store_data = function(line) {
            var index, value;
            index = line.slice(0, line.indexOf("="));
            value = line.slice(line.indexOf("=") + 1);
            if (index !== "") {
              return _this[index] = value;
            }
          };
          _ref = data.split("|").slice(1, -1);
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            line = _ref[_i];
            store_data($.trim(line));
          }
          _this.current_hp = _this.max_hp;
          _this.current_cd = (_ref1 = _this.ss_cd === "") != null ? _ref1 : {
            "0": _this.ss_cd
          };
          _this.as_data = {};
          _this.ss_data = {};
          $.ajax({
            url: "http://zh.nekowiz.wikia.com/wiki/Template:Skill/Answer/Data?action=raw",
            cache: false,
            async: false,
            success: function(data) {
              var index, lines, skill_name, status, value, _j, _len1, _results;
              lines = data.split("\n");
              status = 0;
              _results = [];
              for (_j = 0, _len1 = lines.length; _j < _len1; _j++) {
                line = lines[_j];
                line = $.trim(line);
                if (line.indexOf("#switch: {{{data}}}") !== -1) {
                  skill_name = line.slice(1, +(line.indexOf("=") - 1) + 1 || 9e9);
                  if (skill_name === _this.as) {
                    _results.push(status = 1);
                  } else {
                    _results.push(void 0);
                  }
                } else if (status === 1) {
                  if (line.indexOf("}}") !== -1) {
                    _results.push(status = 0);
                  } else {
                    index = line.slice(line.indexOf("|") + 1, +(line.indexOf("=") - 1) + 1 || 9e9);
                    value = line.slice(line.indexOf("=") + 1);
                    if (index !== "") {
                      _results.push(_this["as_data"][index] = value);
                    } else {
                      _results.push(void 0);
                    }
                  }
                } else {
                  _results.push(void 0);
                }
              }
              return _results;
            }
          });
          $.ajax({
            url: "http://zh.nekowiz.wikia.com/wiki/Template:Skill/Special/Data?action=raw",
            cache: false,
            async: false,
            success: function(data) {
              var index, lines, skill_name, status, value, _j, _len1, _results;
              lines = data.split("\n");
              status = 0;
              _results = [];
              for (_j = 0, _len1 = lines.length; _j < _len1; _j++) {
                line = lines[_j];
                line = $.trim(line);
                if (line.indexOf("#switch: {{{data}}}") !== -1) {
                  skill_name = line.slice(1, +(line.indexOf("=") - 1) + 1 || 9e9);
                  if (skill_name === _this.ss) {
                    _results.push(status = 1);
                  } else {
                    _results.push(void 0);
                  }
                } else if (status === 1) {
                  if (line.indexOf("}}") !== -1) {
                    _results.push(status = 0);
                  } else {
                    index = line.slice(line.indexOf("|") + 1, +(line.indexOf("=") - 1) + 1 || 9e9);
                    value = line.slice(line.indexOf("=") + 1);
                    if (index !== "") {
                      _results.push(_this["ss_data"][index] = value);
                    } else {
                      _results.push(void 0);
                    }
                  }
                } else {
                  _results.push(void 0);
                }
              }
              return _results;
            }
          });
          _this.buffs = [];
          _this.attack_info = {};
          _this.load_done = true;
          return check_all_cards_loaded();
        };
      })(this)
    });
  }

  Card.prototype.attack = function(enemies) {
    var atk, atk_value, attack_ratio, enemies_alive_count, enemy, i, target_enemy, _i, _j, _k, _len, _len1, _ref, _results;
    _results = [];
    for (i = _i = 1, _ref = this.attack_info.atk_times; 1 <= _ref ? _i <= _ref : _i >= _ref; i = 1 <= _ref ? ++_i : --_i) {
      if (this.attack_info.target_num === 1) {
        target_enemy = enemies[0];
        if (this.target !== -1) {
          if (enemies[this.target].is_dead()) {
            this.target = -1;
          }
        }
        if (this.target === -1) {
          for (_j = 0, _len = enemies.length; _j < _len; _j++) {
            enemy = enemies[_j];
            if (!enemy.is_dead()) {
              target_enemy = enemy;
              break;
            }
          }
        } else {
          target_enemy = enemies[this.target];
        }
        attack_ratio = this.attack_info.atk_ratio;
        if (this.attack_info.prop_atk.indexOf(enemy.prop) !== -1) {
          attack_ratio *= this.attack_info.prop_atk_ratio;
        }
        atk = Math.floor(this.max_atk * attack_ratio * (100 + combo) / 100);
        atk_value = enemy.damage(atk, this.prop);
        this.current_hp += atk_value * this.attack_info.life_drain;
        if (this.current_hp >= this.max_hp) {
          this.current_hp = this.max_hp;
        }
        _results.push(this.current_hp = Math.floor(this.current_hp));
      } else {
        atk = this.max_atk * this.attack_info.atk_ratio * (100 + combo) / 100;
        enemies_alive_count = 0;
        for (_k = 0, _len1 = enemies.length; _k < _len1; _k++) {
          enemy = enemies[_k];
          if (!enemy.is_dead()) {
            enemies_alive_count += 1;
          }
        }
        if (this.attack_info.target_all_average !== 0) {
          atk /= enemies_alive_count;
        }
        atk = Math.floor(atk);
        _results.push((function() {
          var _l, _len2, _results1;
          _results1 = [];
          for (_l = 0, _len2 = enemies.length; _l < _len2; _l++) {
            enemy = enemies[_l];
            _results1.push(enemy.damage(atk, this.prop));
          }
          return _results1;
        }).call(this));
      }
    }
    return _results;
  };

  Card.prototype.attack_info_set = function(prop, as_enable) {
    var atk_ratio, card, elmts_count, elmts_num, index, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _results, _results1;
    if (prop.indexOf(this.prop) !== -1) {
      if (as_enable) {
        switch (this.as_data.type) {
          case "攻擊上升":
            return this.attack_info.atk_ratio *= this.as_data.ratio / 100;
          case "連續攻擊":
            this.attack_info.atk_ratio *= this.as_data.ratio / 100 / this.as_data.atks;
            return this.attack_info.atk_times = this.as_data.atks;
          case "屬性特效":
            this.attack_info.prop_atk = this.as_data.elmts;
            return this.attack_info.prop_atk_ratio = this.as_data.ratio;
          case "全體攻擊（分散）":
            this.attack_info.atk_ratio *= this.as_data.ratio;
            this.attack_info.target_num = 5;
            return this.attack_info.target_all_average = 1;
          case "全體攻擊（不分散）":
            this.attack_info.atk_ratio *= this.as_data.ratio;
            this.attack_info.target_num = 5;
            return this.attack_info.target_all_average = 0;
          case "隨機攻擊":
            return this.attack_info.atk_ratio *= randomNum(this.as_data.ratio, 100) / 100;
          case "吸收":
            return this.attack_info.life_drain = this.as_data.ratio / 100;
          case "連段數攻擊上升":
            if (combo >= this.as_data.combo) {
              return this.attack_info.atk_ratio *= this.as_data.ratio / 100;
            }
            break;
          case "瀕死攻擊上升":
            if ((this.current_hp / this.max_hp) <= (this.as_data.hp / 100)) {
              return this.attack_info.atk_ratio *= this.as_data.ratio / 100;
            }
            break;
          case "快調攻擊上升":
            if ((this.current_hp / this.max_hp) >= (this.as_data.hp / 100)) {
              return this.attack_info.atk_ratio *= this.as_data.ratio / 100;
            }
            break;
          case "隊伍屬性攻擊上升":
            _results = [];
            for (_i = 0, _len = cards.length; _i < _len; _i++) {
              card = cards[_i];
              if (this.as_data.elmts.indexOf(card.prop) !== -1) {
                _results.push(card.attack_info.atk_ratio *= this.as_data.ratio / 100);
              } else {
                _results.push(void 0);
              }
            }
            return _results;
            break;
          case "戰鬥不能攻擊上升":
            atk_ratio = 1;
            for (_j = 0, _len1 = cards.length; _j < _len1; _j++) {
              card = cards[_j];
              if (card.current_hp === 0) {
                atk_ratio += this.as_data.ratio / 100;
              }
            }
            return this.attack_info.atk_ratio *= atk_ratio;
          case "問答屬性數攻擊上升":
            index = "ratio" + panel_color;
            return this.attack_info.atk_ratio *= this.as_data[index];
          case "隊伍屬性數攻擊上升":
            elmts_count = {
              "火": 0,
              "水": 0,
              "雷": 0
            };
            _ref = cards.slice(0, -1);
            for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
              card = _ref[_k];
              elmts_count[card.prop] = 1;
            }
            elmts_num = elmts_count["火"] + elmts_count["水"] + elmts_count["雷"];
            index = "ratio" + elmts_num;
            return this.attack_info.atk_ratio *= this.as_data[index];
          case "自身回復":
            if (this.as_data.mode === "%數") {
              this.current_hp += this.max_hp * this.as_data.ratio / 100;
            } else if (this.as_data.mode === "絕對值") {
              this.current_hp += this.as_data.ratio;
            }
            this.current_hp = Math.floor(this.current_hp);
            if (this.current_hp > this.max_hp) {
              return this.current_hp = this.max_hp;
            }
            break;
          case "屬性回復":
            _ref1 = cards.slice(0, -1);
            _results1 = [];
            for (_l = 0, _len3 = _ref1.length; _l < _len3; _l++) {
              card = _ref1[_l];
              if (this.as_data.elmts.indexOf(card.prop) !== -1) {
                if (this.as_data.mode === "%數") {
                  card.current_hp += card.max_hp * this.as_data.ratio / 100;
                } else if (this.as_data.mode === "絕對值") {
                  card.current_hp += this.as_data.ratio;
                }
                card.current_hp = Math.floor(card.current_hp);
                if (card.current_hp > card.max_hp) {
                  _results1.push(card.current_hp = card.max_hp);
                } else {
                  _results1.push(void 0);
                }
              } else {
                _results1.push(void 0);
              }
            }
            return _results1;
        }
      }
    } else {
      return this.attack_info.atk_ratio = 0;
    }
  };

  Card.prototype.target_reset = function() {
    return this.target = -1;
  };

  Card.prototype.target_set = function(target_index) {
    return this.target = target_index;
  };

  Card.prototype.attack_info_reset = function() {
    this.attack_info.atk_ratio = 1;
    this.attack_info.target_num = 1;
    this.attack_info.target_all_average = 0;
    this.attack_info.atk_times = 1;
    this.attack_info.prop_atk = "";
    this.attack_info.prop_atk_ratio = 1;
    return this.attack_info.life_drain = 0;
  };

  Card.prototype.damage = function(atk, prop) {
    var atk_value;
    atk_value = atk * props[prop][this.prop];
    if (atk_value > this.current_hp) {
      atk_value = this.current_hp;
    }
    atk_value = Math.floor(atk_value);
    this.current_hp -= atk_value;
    return atk_value;
  };

  Card.prototype.is_dead = function() {
    return this.current_hp === 0;
  };

  return Card;

})();

load_cards = function() {
  var card_id, i, _i, _results;
  _results = [];
  for (i = _i = 1; _i <= 6; i = ++_i) {
    card_id = $("#card" + i).val();
    _results.push(cards[i - 1] = new Card(card_id));
  }
  return _results;
};

props = {
  "火": {
    "火": 1.0,
    "水": 0.5,
    "雷": 1.5
  },
  "水": {
    "火": 1.5,
    "水": 1.0,
    "雷": 0.5
  },
  "雷": {
    "火": 0.5,
    "水": 1.5,
    "雷": 1.0
  }
};

monsters = {
  997: {
    name: "黃金色武士亡靈",
    prop: "雷"
  },
  104: {
    name: "閃電之魔導書",
    prop: "雷"
  },
  998: {
    name: "奮起於月夜中的鎧甲武士",
    prop: "雷"
  },
  107: {
    name: "白銀寶壺",
    prop: "雷"
  },
  995: {
    name: "蒼色武士亡靈",
    prop: "水"
  }
};

stages = [[[997, 8000, 1, 1, 400, [0]], [997, 8000, 1, 1, 400, [0]], [104, 5500, 1, 5, 150, [0]]], [[998, 12000, 2, 1, 400, [0]], [107, 10000, 1, 1, 600, [0]], [995, 6000, 2, 1, 675, [0]]]];

randomTurn = function(turn) {
  var max, min;
  max = turn + 1;
  min = turn - 1;
  if (min <= 0) {
    min = 1;
  }
  return randomNum(max, min);
};

Enemy = (function() {
  function Enemy(enemy_data) {
    this.id = enemy_data[0];
    this.max_hp = enemy_data[1];
    this.current_hp = enemy_data[1];
    this.turn = enemy_data[2];
    this.current_turn = randomTurn(enemy_data[2]);
    this.target = enemy_data[3];
    this.atk = enemy_data[4];
    this.ai = enemy_data[5];
    this.name = monsters[this.id].name;
    this.prop = monsters[this.id].prop;
    this.current_ai_index = 0;
    this.buffs = [];
  }

  Enemy.prototype.is_dead = function() {
    return this.current_hp === 0;
  };

  Enemy.prototype.damage = function(atk, prop) {
    var atk_value;
    atk_value = atk * props[prop][this.prop];
    if (atk_value > this.current_hp) {
      atk_value = this.current_hp;
    }
    atk_value = Math.floor(atk_value);
    this.current_hp -= atk_value;
    return atk_value;
  };

  Enemy.prototype.one_turn_pass = function() {
    if (!this.is_dead()) {
      return this.current_turn -= 1;
    }
  };

  Enemy.prototype.use_skill = function() {
    var current_ai;
    current_ai = this.ai[this.current_ai_index];
    this.current_ai_index += 1;
    return this.current_ai_index %= this.ai.length;
  };

  Enemy.prototype.attack = function() {
    var attack_count, current_ai, i, _i, _len, _ref;
    current_ai = this.ai[this.current_ai_index];
    if (current_ai === 0) {
      attack_count = 0;
      _ref = [0, 1, 2, 3, 4].sort(function() {
        return 0.5 - Math.random();
      });
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        if (attack_count === this.target) {
          break;
        }
        if (!cards[i].is_dead()) {
          cards[i].damage(this.atk, this.prop);
          attack_count += 1;
        }
      }
    }
    if (this.current_turn === 0) {
      return this.current_turn = this.turn;
    }
  };

  return Enemy;

})();

enemies_one_turn_pass = function() {
  var enemy, _i, _j, _k, _len, _len1, _len2, _results;
  for (_i = 0, _len = current_enemies.length; _i < _len; _i++) {
    enemy = current_enemies[_i];
    enemy.one_turn_pass();
  }
  for (_j = 0, _len1 = current_enemies.length; _j < _len1; _j++) {
    enemy = current_enemies[_j];
    enemy.use_skill();
  }
  _results = [];
  for (_k = 0, _len2 = current_enemies.length; _k < _len2; _k++) {
    enemy = current_enemies[_k];
    _results.push(enemy.attack());
  }
  return _results;
};

inital_enemy_data = function(stage) {
  var enemy;
  return (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = stage.length; _i < _len; _i++) {
      enemy = stage[_i];
      _results.push(new Enemy(enemy));
    }
    return _results;
  })();
};

check_stage_clear = function(enemies) {
  var enemy, _i, _len;
  for (_i = 0, _len = enemies.length; _i < _len; _i++) {
    enemy = enemies[_i];
    if (!enemy.is_dead()) {
      return false;
    }
  }
  return true;
};

check_stage_fail = function() {
  var card, _i, _len;
  for (_i = 0, _len = cards.length; _i < _len; _i++) {
    card = cards[_i];
    if (!card.is_dead()) {
      return false;
    }
  }
  return true;
};

enable_attacks = function() {
  var i, index, _i, _results;
  _results = [];
  for (i = _i = 1; _i <= 7; i = ++_i) {
    index = "#attack_" + i;
    _results.push($(index).attr("disabled", false));
  }
  return _results;
};

disable_attacks = function() {
  var i, index, _i, _results;
  _results = [];
  for (i = _i = 1; _i <= 7; i = ++_i) {
    index = "#attack_" + i;
    _results.push($(index).attr("disabled", true));
  }
  return _results;
};

player_action = function() {
  return enable_attacks();
};


/*
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
 */

player_attack = function(prop, as_enable) {
  var card, _i, _len, _ref, _results;
  if (as_enable == null) {
    as_enable = true;
  }
  _ref = cards.slice(0, -1);
  _results = [];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    card = _ref[_i];
    _results.push(card.attack(prop, as_enable));
  }
  return _results;
};

play_stage = function(stage) {
  var card, _i, _len;
  current_enemies = inital_enemy_data(stage);
  load_enemy_info_to_input();
  for (_i = 0, _len = cards.length; _i < _len; _i++) {
    card = cards[_i];
    card.target_reset();
  }
  return player_action();

  /*
  	enemy_action()
  	if check_gameover
  		gameover()
  		return false
   */
};

load_card_info_to_input = function() {
  var atk_index, hp_index, i, id_index, _i, _results;
  _results = [];
  for (i = _i = 1; _i <= 6; i = ++_i) {
    hp_index = "#card" + i + "_hp";
    atk_index = "#card" + i + "_atk";
    id_index = "#card" + i;
    $(hp_index).val(cards[i - 1].current_hp);
    $(atk_index).val(cards[i - 1].max_atk);
    _results.push($(id_index).val(cards[i - 1].id));
  }
  return _results;
};

load_enemy_info_to_input = function() {
  var enemy, hp_index, i, _i, _len, _results;
  i = 1;
  _results = [];
  for (_i = 0, _len = current_enemies.length; _i < _len; _i++) {
    enemy = current_enemies[_i];
    hp_index = "#enemy" + i + "_hp";
    $(hp_index).val(enemy.current_hp);
    _results.push(i += 1);
  }
  return _results;
};

start = function() {
  load_card_info_to_input();
  current_stage = 0;
  return play_stage(stages[current_stage]);
};

stage_all_clear = function() {
  return console.log("All stage cleared!!");
};

attack_penal = function(prop) {
  var as_enable, card, index, tmp, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3;
  disable_attacks();
  as_enable = $("#as_enable").is(":checked");
  _ref = cards.slice(0, -1);
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    card = _ref[_i];
    card.attack_info_reset();
  }
  _ref1 = cards.slice(0, -1);
  for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
    card = _ref1[_j];
    card.attack_info_set(prop, as_enable);
  }
  _ref2 = cards.slice(0, -1);
  for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
    card = _ref2[_k];
    card.attack(current_enemies);
    if (check_stage_clear(current_enemies)) {
      break;
    }
  }
  load_enemy_info_to_input();
  if (check_stage_clear(current_enemies)) {
    current_stage += 1;
    if (current_stage >= stages.length) {
      return stage_all_clear();
    } else {
      return play_stage(stages[current_stage]);
    }
  } else {
    enemies_one_turn_pass();
    if (!cards[5].is_dead()) {
      _ref3 = cards.slice(0, -1);
      for (index = _l = 0, _len3 = _ref3.length; _l < _len3; index = ++_l) {
        card = _ref3[index];
        if (card.is_dead()) {
          tmp = cards[5];
          cards[5] = cards[index];
          cards[index] = tmp;
          break;
        }
      }
    }
    load_card_info_to_input();
    if (check_stage_fail()) {
      return console.log("Stage failed!!");
    } else {
      return player_action();
    }
  }
};

$(function() {
  var i, index, _i, _results;
  $("#load_card").on("click", function() {
    return load_cards();
  });
  _results = [];
  for (i = _i = 1; _i <= 7; i = ++_i) {
    index = "#attack_" + i;
    _results.push($(index).on("click", function() {
      return attack_penal($(index).text());
    }));
  }
  return _results;
});

// ---
// generated by coffee-script 1.9.0