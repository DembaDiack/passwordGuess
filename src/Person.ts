class Person {
  public day: string;
  public month: string;
  public year: string;
  public dictionary: Array<string> = new Array<string>();

  /**
   * @param firstname le prenom
   * @param lastname le nom
   * @param birthPlace le lieu de naissance
   * @param birthPlace la date de naissance jj/mm/aaaa
   */
  constructor(
    public firstname: string,
    public lastname: string,
    public birthPlace: string,
    public birthDate: string
  ) {
    this.day = this.birthDate.split("/")[0];
    this.month = this.birthDate.split("/")[1];
    this.year = this.birthDate.split("/")[2];
    this.buildDictionary();
  }

  //creer un tableau des differents champs a combiner
  buildDictionary() {
    this.dictionary.push(
      this.birthPlace.toLowerCase(),
      this.birthPlace[0].toUpperCase() + this.birthPlace.slice(1),
      this.firstname.toLowerCase(),
      this.firstname[0].toUpperCase() + this.firstname.slice(1),
      this.lastname.toLowerCase(),
      this.lastname[0].toUpperCase() + this.lastname.slice(1),
      this.day,
      this.month,
      this.year,
      this.birthDate
    );
  }
}

export default Person;
