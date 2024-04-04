import { Component } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ContratService } from '../_services/contrat.service';

@Component({
  selector: 'app-reclamations',
  templateUrl: './reclamations.component.html',
  styleUrl: './reclamations.component.css'
})
export class ReclamationsComponent {

  user:any
  contrats:any
  id:any

  constructor(private token: TokenStorageService , private contratService:ContratService) { }

  ngOnInit(): void {
    this.user = this.token.getUser();
    this.id=this.user.id;

  }

}
