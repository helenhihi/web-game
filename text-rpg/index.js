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

// const hero = {
//   name: "",
//   lev: 1,
//   maxHp: 100,
//   hp: 100, // 현재 체력
//   xp: 0, // 경험치
//   att: 10, // 공격력
//   attack: function(monster) {
//     monster.hp -= this.att;
//     this.hp -= monster.att;
//   },
//   heal: function(monster) {
//     this.hp += 20;
//     this.hp -= monster.att;
//   },
// };

// let monster = null;
// const monsterList = [
//   { name: "슬라임", hp: 25, att: 10, xp: 10 },
//   { name: "스켈레톤", hp: 50, att: 15, xp: 20 },
//   { name: "마왕", hp: 150, att: 35, xp: 50 },
// ];

// startScreen.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const name = event.target["name-input"].value;
//   startScreen.classList.add("hidden");
//   gameMenu.classList.remove("hidden");
//   heroName.innerText = name;
//   heroLevel.innerText = `${hero.lev}Lev`;
//   heroHp.innerText = `HP: ${hero.hp}/${hero.maxHp}`;
//   heroXp.innerText = `XP: ${hero.xp}/${15 * hero.lev}`;
//   heroAtt.innerText = `ATT: ${hero.att}`;
//   hero.name = name;
// });

// gameMenu.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const input = event.target["menu-input"].value;
//   if (input === "1") { // 모험
//     gameMenu.classList.add("hidden");
//     battleMenu.classList.remove("hidden");
//     monster = JSON.parse(
//       JSON.stringify(monsterList[Math.floor(Math.random() * monsterList.length)])
//     );
//     monster.maxHp = monster.hp;
//     monsterName.innerText = monster.name;
//     monsterHp.innerText = `HP: ${monster.hp}/${monster.maxHp}`;
//     monsterAtt.innerText = `ATT: ${monster.att}`;
//   } else if (input === "2") { // 휴식

//   } else if (input === "3") { // 종료

//   }
// });

// battleMenu.addEventListener("submit", (event) => {
//   const input = event.target["battle-input"].value;
//   if (input === "1") { // 공격
//     hero.attack(monster);
//     monster.attack(hero);
//     heroHp.innerText = `HP: ${hero.hp}/${hero.maxHp}`;
//     monsterHp.innerText = `HP: ${monster.hp}/${monster.maxHp}`;
//     message.innerText = `${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았다.`;
//   } else if (input === "2") { // 회복

//   } else if (input === "3") { // 도망

//   }
// });

class Game {
  constructor(name) {
    this.monster = null;
    this.hero = null;
    this.monsterList = [{
        name: "슬라임",
        hp: 25,
        att: 10,
        xp: 10
      },
      {
        name: "스켈레톤",
        hp: 50,
        att: 15,
        xp: 20
      },
      {
        name: "마왕",
        hp: 150,
        att: 35,
        xp: 50
      },
    ];
    this.start(name);
  }
  start(name) {
    console.log(this);
    gameMenu.addEventListener("submit", this.onGameMenuInput);
    battleMenu.addEventListener("submit", this.onBattleMenuInput);
    this.changeScreen("game");
    this.hero = new Hero(this, name);
    this.updateHeroStat();
  }
  changeScreen(screen) {
    if (screen === "start") {
      startScreen.classList.remove("hidden");
      gameMenu.classList.add("hidden");
      battleMenu.classList.add("hidden");
    } else if (screen === "game") {
      startScreen.classList.add("hidden");
      gameMenu.classList.remove("hidden");
      battleMenu.classList.add("hidden");
    } else if (screen === "battle") {
      startScreen.classList.add("hidden");
      gameMenu.classList.add("hidden");
      battleMenu.classList.remove("hidden");
    }
  }
  onGameMenuInput = (event) => {
    event.preventDefault();
    const input = event.target["menu-input"].value;
    if (input === "1") { // 모험
      this.changeScreen("battle");
      const randomIndex = Math.floor(Math.random() * this.monsterList.length);
      const randomMonster = this.monsterList[randomIndex];
      this.monster = new Monster(
        this,
        randomMonster.name,
        randomMonster.hp,
        randomMonster.att,
        randomMonster.xp,
      );
      this.updateMonsterStat();
      this.showMessage(`몬스터와 마주쳤다. ${this.monster.name}인 것 같다!`);
    } else if (input === "2") { // 휴식
      this.hero.hp = this.hero.maxHp;
      this.updateHeroStat();
      this.showMessage("충분한 휴식을 취했다.");
    } else if (input === "3") { // 종료
      this.showMessage(" ");
      this.quit();
    }
  }
  onBattleMenuInput = (event) => {
    event.preventDefault();
    const input = event.target["battle-input"].value;
    if (input === "1") { //공격
      const {
        hero,
        monster
      } = this;
      hero.attack(monster);
      monster.attack(hero);
      if (hero.hp <= 0) {
        this.showMessage(`${hero.lev} 레벨에서 전사. 새 주인공을 생성하세요.`);
        this.quit();
      } else if (monster.hp <= 0) {
        this.showMessage(`몬스터를 잡아 ${monster.xp} 경험치를 얻었다.`);
        hero.getXp(monster.xp);
        this.monster = null;
        this.changeScreen("game");
      } else { // 전투 진행 중
        this.showMessage(`${hero.att}의 데미지를 주고, ${monster.att}의 데미지를 받았다.`);
      }
      this.updateHeroStat();
      this.updateMonsterStat();
    } else if (input === "2") { // 회복
      const {
        hero,
        monster
      } = this;
      hero.hp = Math.min(hero.maxHp, hero.hp + 20);
      monster.attack(hero);
      this.showMessage("체력을 조금 회복했다!");
      this.updateHeroStat();
    } else if (input === "3") { // 도망
      this.changeScreen("game");
      this.showMessage("부리나케 도망쳤다!");
      this.monster = null;
      this.updateMonsterStat();
    }
  }
  updateHeroStat() {
    const {
      hero
    } = this;
    if (hero === null) {
      heroName.innerText = "";
      heroLevel.innerText = "";
      heroHp.innerText = "";
      heroXp.innerText = "";
      heroAtt.innerText = "";
      return;
    }
    heroName.innerText = hero.name;
    heroLevel.innerText = `${hero.lev}Lev`;
    heroHp.innerText = `HP: ${hero.hp}/${hero.maxHp}`;
    heroXp.innerText = `XP: ${hero.xp}/${15 * hero.lev}`;
    heroAtt.innerText = `ATT: ${hero.att}`;
  }
  updateMonsterStat() {
    const {
      monster
    } = this;
    if (monster === null) {
      monsterName.innerText = "";
      monsterHp.innerText = "";
      monsterAtt.innerText = "";
      return;
    }
    monsterName.innerText = monster.name;
    monsterHp.innerText = `HP: ${monster.hp}/${monster.maxHp}`;
    monsterAtt.innerText = `ATT: ${monster.att}`;
  }
  showMessage(text) {
    message.innerText = text;
  }
  quit() {
    this.hero = null;
    this.monster = null;
    this.updateHeroStat();
    this.updateMonsterStat();
    gameMenu.removeEventListener("submit", this.onGameMenuInput);
    battleMenu.removeEventListener("submit", this.onBattleMenuInput);
    this.changeScreen("start");
    game = null;
  }
}

let game = null;
startScreen.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = event.target["name-input"].value;
  game = new Game(name);
});