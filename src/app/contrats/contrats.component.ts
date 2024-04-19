import { Component } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ContratService } from '../_services/contrat.service';

@Component({
  selector: 'app-contrats',
  templateUrl: './contrats.component.html',
  styleUrl: './contrats.component.css'
})
export class ContratsComponent {

  user: any
  contrats: any
  id: any
  selectedContrat: any; // Contrat sélectionné pour le paiement


  constructor(private token: TokenStorageService, private contratService: ContratService) { }


  ngOnInit(): void {
    this.user = this.token.getUser();
    this.id = this.user.id;
    this.getContrats(this.user.id);
  }

  getContrats(id: any) {
    this.contratService.getUserContrats(id).subscribe(
      data => {
        console.log("this is data :" + data);
        console.log(data);
        this.contrats = data;
        console.log("contrat:" + this.contrats);

      },
      err => {
        console.log(err);
        console.log("there is error here");

      }
    );
  }


  showPaymentButton(contrat: any) {
    // Mettre à jour le contrat sélectionné lorsqu'une ligne est cliquée
    this.selectedContrat = contrat;
  }

  payerContrat(contrat: any) {
    // Logique pour effectuer le paiement du contrat
    // Vous pouvez implémenter la logique ici pour le paiement du contrat
    console.log('Payer le contrat :', contrat);
    // Par exemple, vous pouvez appeler une méthode du service pour effectuer le paiement
  }


}
