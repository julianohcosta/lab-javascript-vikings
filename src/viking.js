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
    this.health = this.health - damage;
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

  getRandomSaxonAndViking(){
    const viking = this.vikingArmy[Math.floor(Math.random() * this.vikingArmy.length)];
    const saxon = this.saxonArmy[Math.floor(Math.random() * this.saxonArmy.length)];
    return [viking, saxon]
  }

  /**
   *
   * @param {(Viking|Saxon)} attacker
   * @param {(Viking|Saxon)} defender
   * @param {string} attackerType
   * @returns {string}
   */
  dealDamage(attacker, defender, attackerType){
    const message = defender.receiveDamage(attacker.attack());
    if(message.includes("died")){
      if (attackerType === 'viking'){
        this.saxonArmy.splice(this.saxonArmy.indexOf(defender), 1)
      } else if (attackerType === 'saxon'){
        this.vikingArmy.splice(this.vikingArmy.indexOf(defender), 1)
      }
    }
    return message
  }

  vikingAttack() {
    const [viking, saxon] = this.getRandomSaxonAndViking()
    return this.dealDamage(viking, saxon, 'viking')
  }
  saxonAttack() {
    const [viking, saxon] = this.getRandomSaxonAndViking()
    return this.dealDamage(saxon, viking, 'saxon')
  }
  showStatus() {
    if (this.saxonArmy.length === 0){
      return `Vikings have won the war of the century!`
    } else if (this.vikingArmy.length === 0) {
      return `Saxons have fought for their lives and survived another day...`
    }else if (this.saxonArmy.length === 1 && this.vikingArmy.length === 1){
      return `Vikings and Saxons are still in the thick of battle.`
    }
  }
}
