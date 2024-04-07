import { Component } from '@angular/core';
import { BrancheService } from '../_services/branche.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrl: './branches.component.css'
})
export class BranchesComponent {

  branches: any
  id: any


  constructor(private brancheService: BrancheService,  private router:Router) { }


  ngOnInit(): void {
    this.getAllbranches();
  }

  deleteBranche(id:any){
    this.brancheService.deleteBranche(id).subscribe(
      (response)=>{console.log("here response deleted from BE ",response);
      this.getAllbranches()
      }
    )
  }

  navigate(id:any){
    this.router.navigate(["/add-branche/"+id])
  }

  navigate2(){
    this.router.navigate(["/add-branche/"])
  }

  getAllbranches() {
    this.brancheService.getAllBranches().subscribe(
      data => {
        console.log("this is data :" + data);
        console.log(data);
        this.branches = data;
        console.log("branche:" + this.branches);

      },
      err => {
        console.log(err);
        console.log("there is error here");

      }
    );
  }

}
