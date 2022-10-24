

// Soldier
class Soldier {
  /**
   * @param {number} health
   * @param {number} strength
   */
  constructor(health, strength) {
    this.health = health;
    this.strength = strength;
  }

  /**
   * @returns {number}
   */
  attack(){
    return this.strength;
  }

  /**
   * @param {number} damage
   */
  receiveDamage(damage){
    this.health -= damage;
  }
}

// Viking
class Viking extends Soldier{
  constructor(name, health, strength) {
    super(health, strength);

    this.name = name;
  }

  /**
   * @param {number} damage
   * @returns {string}
   */
  receiveDamage(damage){
    this.health = this.health - damage;
    if (this.health > 0) {
      return `${this.name} has received ${damage} points of damage`
    } else {
      return `${this.name} has died in act of combat`
    }
  }

  /**
   * @returns {string}
   */
  battleCry(){
    return `Odin Owns You All!`
  }

}

// Saxon
class Saxon extends Soldier {
  constructor( health, strength) {
    super(health, strength);
  }

  /**
   * @param {number} damage
   * @returns {string}
   */
  receiveDamage(damage){
    this.health = this.health - damage;
    if (this.health > 0) {
      return `A Saxon has received ${damage} points of damage`
    } else {
      return `A Saxon has died in combat`
    }
  }
}

// War
class War {
  constructor() {
    /**
     * @type {Viking[]}
     */
    this.vikingArmy = [];

    /**
     * @type {Saxon[]}
     */
    this.saxonArmy = [];
  }

  /**
   *
   * @param {Viking} viking
   */
  addViking(viking) {
    this.vikingArmy.push(viking);
  }

  /**
   * @param {Saxon} saxon
   */
  addSaxon(saxon) {
    this.saxonArmy.push(saxon);
  }

  /**
   *
   * @param {(Viking[]|Saxon[])} attacker
   * @param {(Viking[]|Saxon[])} defender
   * @returns {string}
   */
  dealDamage(agressorArmy, defenderArmy){

    const agressor = agressorArmy[Math.floor(Math.random() * agressorArmy.length)];
    const defender = defenderArmy[Math.floor(Math.random() * defenderArmy.length)];

    const message = defender.receiveDamage(agressor.attack());
    
    if(defender.health <= 0){
      defenderArmy.splice(defenderArmy.indexOf(defender), 1)
    }
    
    return message
  }

  vikingAttack() {
    return this.dealDamage(this.vikingArmy, this.saxonArmy)
  }
  saxonAttack() {
    return this.dealDamage(this.saxonArmy, this.vikingArmy)
  }
  showStatus() {
    if (this.saxonArmy.length === 0){
      return `Vikings have won the war of the century!`
    } else if (this.vikingArmy.length === 0) {
      return `Saxons have fought for their lives and survived another day...`
    }
    
    return `Vikings and Saxons are still in the thick of battle.`
  }
}
