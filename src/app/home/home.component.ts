import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScreensService } from '../Services/Screens.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,private screenservice:ScreensService) { }

  scrn_names:any[]=[];
  ids:any[]=[];
  show:boolean=false;

  ngOnInit(): void 
  {
    this.screenservice.getAll().subscribe((data:any)=>
    {
      console.log("Data",data);
      for(let i=0;i<=JSON.stringify(data[i]).length;i++)
      {
        this.scrn_names.push(data[i]['screenName']);
        this.ids.push(data[i]['_id']);
      }
    })
  }

  onEdit(id: any)
  {
    console.log("ID:",id);
    this.router.navigate([`${id}`]);
  }
 
  onDelete(id: any)
  {
     this.screenservice.delete(id).subscribe(data=>{{console.log("Data deleted:",data);}});
     window.location.reload();
  }                                                                                                        

  gjsscreen()
  {
    this.router.navigate(['/gjs']);
  }

  existing()
  {
     this.show=true;
     console.log("ids.length",this.ids.length);
  }

}
