import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class Highlight  implements OnInit {

  @Input()  appHighlight:string='';
  private  originalText:string='';

  constructor(private ele:ElementRef, private renderer:Renderer2){}

  ngOnInit(): void {
    this.originalText=this.ele.nativeElement.innerText.trim();

    this.renderer.setStyle(this.ele.nativeElement,'transition','all 0.3s ease-in-out');
  }

  @HostListener('mouseenter')
  onMouseEnter(){
    this.swapText(this.appHighlight);
  }

  @HostListener('mouseleave')
  onMouseLeave(){
    this.swapText(this.originalText);
  }

  private swapText(text:string){
    // fade out
    this.renderer.setStyle(this.ele.nativeElement,'opacity', '0');

    setTimeout(()=>{
      this.ele.nativeElement.innerText=text;

      // fade in
      this.renderer.setStyle(this.ele.nativeElement,'opacity','1')
    },300)
  }

}
