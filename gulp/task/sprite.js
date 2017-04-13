var gulp=require("gulp"),
    svgsprite=require("gulp-svg-sprite"),
    rename=require("gulp-rename"),
    del=require("del");

var config={
    mode:{
        css:{
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
gulp.task("copyspritegraphic",["createsprite"],function(){
   return gulp.src("./app/temp/sprite/css/**/*.svg")
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


gulp.task("icon",["beginclean","createsprite","copyspritegraphic","copyspritecss","endclean"]);