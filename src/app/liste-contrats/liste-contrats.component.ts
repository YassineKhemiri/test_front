import { Component } from '@angular/core';
import { ContratService } from '../_services/contrat.service';

@Component({
  selector: 'app-liste-contrats',
  templateUrl: './liste-contrats.component.html',
  styleUrl: './liste-contrats.component.css'
})
export class ListeContratsComponent {

  contrats: any
  id: any


  constructor(private contratService: ContratService) { }


  ngOnInit(): void {
    this.getAllContrats();
  }

  getAllContrats() {
    this.contratService.getAllContrats().subscribe(
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


}
