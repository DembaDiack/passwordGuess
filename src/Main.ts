import Hack from "./hack";
import Person from "./Person";

//creons une personne
const person:Person = new Person("Demba","Diack","Nouakchott","22/07/1998");

//une instance de Hack
const hack:Hack = new Hack(person,"dembadiack22",3,10000);
//une fonction qui recoit des donnee, et affiche dans la console 
const doSomethingEveryIteration = (receivedData:string) => {
    console.log(receivedData);
}

//attacher la fonction a appeler a chaque iteration
hack.setCallBack(doSomethingEveryIteration);

//demarrons les essais
hack.startJob();