import { Component } from '@angular/core'
import { ServiceService, Require } from './service.service'
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  togle = false
  form: FormGroup
  require: Require[]

  constructor(private service: ServiceService){}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(''),
      count: new FormControl()
    })
  }

  addSkill(){
    const formData = {...this.form.value}

    this.service.createRequire({
      title: formData.title,
      count: 1
    }).subscribe(todo => {

      this.require.push(todo)
      this.form.reset()
      //this.togle = false
      this.ngOnInit()
      
    })
  }


} //end of class