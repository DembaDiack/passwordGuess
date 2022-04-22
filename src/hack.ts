import Person from "./Person";
class Hack {
  public callback: any;

  /**
   * @param person la personne
   * @param combinations le nombre de combinaisons des differents champs par example 2:nom+prenom , 3:nom+prenom+nom ou nom+prenom+jour
   * @param tries nombre dessaies/iterations jusqua trouver le mdp ou echouer
   * @param useSubString couper et prendre des parties de champs pour les mdps complexes comme demb1998 aulieu de demba1998
   * @param useIterativeCombinations gravir les combinaison iterativement , essais * nbr combinaisons
   * @param useRandomCombinations prendre au hasard les combinaisons allant jusqua la valeur donne au 2eme parametre
   */
  constructor(
    public person: Person,
    private password:string,
    public combinations: number = 3,
    public tries: number = 1000,
    public useSubString: boolean = false,
    public useIterativeCombinations: boolean = false,
    public useRandomCombinations: boolean = false
  ) {
    if (
      this.useIterativeCombinations == true &&
      this.useRandomCombinations == true
    ) {
      this.useRandomCombinations = !this.useRandomCombinations;
    }
    console.log("hacking params",this);

    //enlever les espaces du mdp au cas ou
    this.password = this.password.trim();
    console.log(this);
  }

  //commencer le processus
  startJob() {
    if (this.useIterativeCombinations) {
      for (let k = 1; k <= this.combinations; k++) {
        this.tryPasswords(k);
      }
    } else {
      this.tryPasswords(this.combinations);
    }
  }

  //combiner et verifier le mot de passe generer avec lactuel mdp
  tryPasswords(k: number) {
    for (let i = 0; i < this.tries; i++) {
      const password: string = this.combine(k);
      if (this.callback) {
        this.callback({
          password : password,
          i : i
        });
      }
      if (password == this.password) {
        console.log(`found after ${i} tries`); 
        break;
      }
    }
  }

  //cette fonction prend un element au hasard du dictionaire et concatene autant de combinaisons
  combine(combinations = this.combinations) {
    let word: string = "";
    combinations = this.useRandomCombinations
      ? this.getRandomRange(1, this.combinations)
      : combinations;
    for (let i = 0; i < combinations; i++) {
      const random: number = this.getRandomRange(this.person.dictionary.length);
      let part = this.person.dictionary[random];
      if (this.useSubString) {
        /** il est preferable de ne pas couper tout les mots qui viennent maislun d'eux au hasard */
        if (Math.random() < 0.5) {
          part = part.substring(0, this.getRandomRange(part.length - 1));
        }
      }
      word += part;
    }
    return word;
  }

  //avoit un chiffre au hasard entre min et max
  getRandomRange(max: number, min: number = 0): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  //attacher une fonction a appeler apres chaque iteration
  setCallBack(callback:any):Hack
  {
    this.callback = callback;
    return this;
  }
}

export default Hack;