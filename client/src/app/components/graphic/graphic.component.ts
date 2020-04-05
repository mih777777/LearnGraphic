import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import { ServiceService, Require } from 'src/app/service.service';


@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss']
})
export class GraphicComponent implements AfterViewInit, OnInit {

  requires: Require[]
  
  arr = []
  arr2 = []

  constructor(private service: ServiceService){}

  @ViewChild('myChart', {static: false}) inputRef: ElementRef

  ngOnInit(){
    this.outArray()
    this.graph()
  
  }

  ngAfterViewInit(){
    
    this.outArray()
    this.graph()
    console.log(this.requires)
  }


  graph() {
    var ctx = this.inputRef.nativeElement.getContext('2d');
    //var chart = 
    new Chart(ctx, {
        // The type of chart we want to create
        //type: 'Horizontal',
        type: 'bar',

        // The data for our dataset
        data: {
            labels: this.arr,
            datasets: [{
                barPercentage: 0.5,
                categoryPercentage: 0.8,
                barThickness: 16,
                maxBarThickness: 8,
                minBarLength: 0.5,
              
                borderSkipped: 'bottom',
                borderWidth: '2',
                label: 'must Learn',
                order: 0,
                backgroundColor: '#8B42D6',
                borderColor: 'rgba(0, 0, 0, 0.1)',
                data: this.arr2
            }]
        },

        // Configuration options go here
        options: { 
          tooltips: {
              // mode: 'index',
              // axis: 'y'
              mode: 'dataset'
          },
            scales: {
              xAxes: [{
                  gridLines: {
                      offsetGridLines: true
                  }
              }] 
          },
          legend: {
              labels: {
                  // This more specific font property overrides the global property
                  fontColor: 'black',
                  defaultFontSize: 20
              }
          }

        }

    });
  }

  outArray(){

    this.service.getAll()
    .subscribe(req => {
      this.requires = req
      for(let i = 0; i < this.requires.length; i++){
        this.arr[i] = this.requires[i].title
        this.arr2[i] = this.requires[i].count
      }
    })

  }

}
