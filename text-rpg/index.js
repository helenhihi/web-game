const startScreen = document.querySelector("#start-screen");
const gameMenu = document.querySelector("#game-menu");
const battleMenu = document.querySelector("#battle-menu");
const heroName = document.querySelector("#hero-name");
const heroLevel = document.querySelector("#hero-level");
const heroHp = document.querySelector("#hero-hp");
const heroXp = document.querySelector("#hero-xp");
const heroAtt = document.querySelector("#hero-att");
const monsterName = document.querySelector("#monster-name");
const monsterHp = document.querySelector("#monster-hp");
const monsterAtt = document.querySelector("#monster-att");
const message = document.querySelector("#message");

const hero = {
  name: "",
  lev: 1,
  maxHp: 100,
  hp: 100, // 현재 체력
  xp: 0, // 경험치
  att: 10, // 공격력
  attack: function(monster) {
    monster.hp -= this.att;
    this.hp -= monster.att;
  },
  heal: function(monster) {
    this.hp += 20;
    this.hp -= monster.att;
  },
};

let monster = null;
const monsterList = [
  { name: "슬라임", hp: 25, att: 10, xp: 10 },
  { name: "스켈레톤", hp: 50, att: 15, xp: 20 },
  { name: "마왕", hp: 150, att: 35, xp: 50 },
];

startScreen.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = event.target["name-input"].value;
  startScreen.classList.add("hidden");
  gameMenu.classList.remove("hidden");
  heroName.innerText = name;
  heroLevel.innerText = `${hero.lev}Lev`;
  heroHp.innerText = `HP: ${hero.hp}/${hero.maxHp}`;
  heroXp.innerText = `XP: ${hero.xp}/${15 * hero.lev}`;
  heroAtt.innerText = `ATT: ${hero.att}`;
  hero.name = name;
});

gameMenu.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = event.target["menu-input"].value;
  if (input === "1") { // 모험
    gameMenu.classList.add("hidden");
    battleMenu.classList.remove("hidden");
    monster = JSON.parse(
      JSON.stringify(monsterList[Math.floor(Math.random() * monsterList.length)])
    );
    monster.maxHp = monster.hp;
    monsterName.innerText = monster.name;
    monsterHp.innerText = `HP: ${monster.hp}/${monster.maxHp}`;
    monsterAtt.innerText = `ATT: ${monster.att}`;
  } else if (input === "2") { // 휴식

  } else if (input === "3") { // 종료

  }
});

battleMenu.addEventListener("submit", (event) => {
  const input = event.target["battle-input"].value;
  if (input === "1") { // 공격
    hero.attack(monster);
    monster.attack(hero);
    heroHp.innerText = `HP: ${hero.hp}/${hero.maxHp}`;
    monsterHp.innerText = `HP: ${monster.hp}/${monster.maxHp}`;
    message.innerText = `${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았다.`;
  } else if (input === "2") { // 회복

  } else if (input === "3") { // 도망

  }
});




