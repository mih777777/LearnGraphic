import { Component, OnInit } from '@angular/core';
import { ServiceService, Require, Firm } from '../../service.service'
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-add-require',
  templateUrl: './add-require.component.html',
  styleUrls: ['./add-require.component.scss']
})
export class AddRequireComponent implements OnInit {

  requires: Require[]
  firm: Firm[]
  require: Require
  form: FormGroup
  arrayId = []

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    
    this.fetch()
    this.form = new FormGroup({
      location: new FormControl(''),
      firm: new FormControl('')
    })
    
  }

  createLocation(){
    const formData = {...this.form.value}

    this.service.searchOrCreate({
      location: formData.location,
      firm: formData.firm
    }).subscribe(item => {
      //console.log(item)
      //this.togle = false
      this.firm.push(item)
      this.form.reset()
      this.ngOnInit()
    })
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