const AGRESSOR = {
  VIKING: "VIKING",
  SAXON: "SAXON"
}

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
  dealDamage(agressor, defender, attackerClass){
    const message = defender.receiveDamage(agressor.attack());
    
    if(message.includes("died")){
      switch(attackerClass){
        case AGRESSOR.VIKING:
          this.saxonArmy.splice(this.saxonArmy.indexOf(defender), 1)
          break
        case AGRESSOR.SAXON:
          this.vikingArmy.splice(this.vikingArmy.indexOf(defender), 1)
          break
        default:
          break
      }
    }
    
    return message
  }

  vikingAttack() {
    const [viking, saxon] = this.getRandomSaxonAndViking()
    return this.dealDamage(viking, saxon, AGRESSOR.VIKING)
  }
  saxonAttack() {
    const [viking, saxon] = this.getRandomSaxonAndViking()
    return this.dealDamage(saxon, viking, AGRESSOR.SAXON)
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
