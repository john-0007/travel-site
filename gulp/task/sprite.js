var gulp=require("gulp"),
    svgsprite=require("gulp-svg-sprite"),
    rename=require("gulp-rename"),
    del=require("del"),
    svg2png=require("gulp-svg2png");

var config={
    mode:{
        css:{
            variables:{
                replaceSvgWithPng:function(){
                    return function(sprite,render){
                        return render(sprite).split(".svg").join(".png");
                    }
                }
                
            },
            sprite:"sprite.svg",
            render:{
                css:{
                    template:"./gulp/templates/sprites.css"
                }
            }
        }
    }
}

gulp.task("beginclean",function(){
    return del(["./app/temp/sprite","./app/assets/images/sprite"]);
    
});

gulp.task("createsprite",["beginclean"],function(){
   
    return gulp.src("./app/assets/images/icons/**/*.svg")
           .pipe(svgsprite(config))
           .pipe(gulp.dest("./app/temp/sprite/"));
});

gulp.task("createPngCopy",["createsprite"],function(){
   return gulp.src("./app/temp/sprite/css/*.svg")
         .pipe(svg2png())
         .pipe(gulp.dest("./app/temp/sprite/css"));
});
gulp.task("copyspritegraphic",["createPngCopy"],function(){
   return gulp.src("./app/temp/sprite/css/**/*.{svg,png}")
          .pipe(gulp.dest("./app/assets/images/sprite"));
});

gulp.task("copyspritecss",["createsprite"],function(){
   return gulp.src("./app/temp/sprite/css/*.css")
          .pipe(rename("_sprite.css"))
          .pipe(gulp.dest("./app/assets/styles/modules"));
});

gulp.task("endclean",["copyspritegraphic","copyspritecss"],function(){
    return del("./app/temp/sprite");
});


gulp.task("icon",["beginclean","createsprite","createPngCopy","copyspritegraphic","copyspritecss","endclean"]);