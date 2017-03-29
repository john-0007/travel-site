import $ from "jquery";
import waypoints from "../../../../node_modules/waypoints/lib/noframework.waypoints";
class RevealOnScroll{
    
    constructor(els,offset){
        this.itemToReveal=els;
//        this.offsetPercentage=offset;
        this.hideInitially();
        this.creatWaypoints(offset);
    }

   hideInitially(){
      this.itemToReveal.addClass("reveal-item");

   }
   creatWaypoints(offset){
//       var that=this;
//         console.log(this);
//       this.itemToReveal
          this.itemToReveal.each(function(){
        var currentItem =this;
        new Waypoint({
            element:currentItem,
            handler:function(){
             $(currentItem).addClass("reveal-item--is-visible");
            },
            offset:offset
         
        });
       });
   }
}



export default RevealOnScroll;