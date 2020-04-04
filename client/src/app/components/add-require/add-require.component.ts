import { Component, OnInit } from '@angular/core';
import { ServiceService, Require } from '../../service.service'

@Component({
  selector: 'app-add-require',
  templateUrl: './add-require.component.html',
  styleUrls: ['./add-require.component.scss']
})
export class AddRequireComponent implements OnInit {

  requires: Require[]
  require: Require

  arrayId = []

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.fetch()
    
  }

  fetch(){
    this.service.getAll()
      .subscribe(req => {
        this.requires = req
      })
  }


  changeIsChecked(item: Require ){
    let res = this.arrayId.indexOf(item)
    
    if(res == -1){
      this.arrayId.push(item)
    } else {
      this.arrayId.splice(res, 1)
    }
    
  }
  

  updateMany() {
    for(let i = 0; i < this.arrayId.length; i++){
      this.service.updateRequire(this.arrayId[i]._id, this.arrayId[i].count).subscribe(() => {
        this.ngOnInit()
      })
      
    }
  }


}//end of class