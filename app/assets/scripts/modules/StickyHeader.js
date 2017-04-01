import $ from "jquery";
import waypoints from "../../../../node_modules/waypoints/lib/noframework.waypoints";
import smoothScroll from "jquery-smooth-scroll";


 class StickyHeader{
     
     constructor(){
         this.lazyImages=$(".lazyload");
         this.siteHeader=$(".site-header");
         this.headerTriggerElement=$(".large-hero__title");
         this.creatHeaderWayPoint();
         this.pageSections=$(".page-section");
         this.headerLink=$(".primary-nav a");
         this.creatPageSectionWaypoints();
         this.addSmoothScrolling();
         this.refreshWaypoints();
     }
     
     refreshWaypoints(){
         this.lazyImages.on(function(){
            Waypoint.refreshAll();                  
                              });
     }
     
     addSmoothScrolling(){
         this.headerLink.smoothScroll({speed:1000});
     }
     
    creatHeaderWayPoint(){
        var that=this;
        new Waypoint({
            element: this.headerTriggerElement[0],
            handler:function(direction){
            if(direction == "down"){
            that.siteHeader.addClass("site-header--dark");
        }else{
             that.siteHeader.removeClass("site-header--dark");
              that.headerLink.removeClass("is-current-link");
        }
            
            
            },
            
            offset:"-35%"
        
        });
    } 
     
     creatPageSectionWaypoints(){
         var that= this;
         this.pageSections.each(function(){
             var currentPageSection=this;
            new Waypoint({
                element:currentPageSection,
                handler:function(direction){
                    if(direction == "down"){
                    var matchingheaderLink=currentPageSection.getAttribute("data-matching-link");
                    that.headerLink.removeClass("is-current-link");
                    $(matchingheaderLink).addClass("is-current-link");
                }
                },
                offset:"15%"
                
            });
             new Waypoint({
                element:currentPageSection,
                handler:function(direction){
                    if(direction == "up"){
                    var matchingheaderLink=currentPageSection.getAttribute("data-matching-link");
                       that.headerLink.removeClass("is-current-link");
                       $(matchingheaderLink).addClass("is-current-link");
                       
    
                }
                
                },
                 offset:"-40%"
                
            });
             
         });
         
         
     }
 }



export default StickyHeader;