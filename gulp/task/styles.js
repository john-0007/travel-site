var gulp = require("gulp"),
postcss=require("gulp-postcss"),
autoprefixer=require("autoprefixer"),
cssvar=require("postcss-simple-vars"),
nested=require("postcss-nested"),
cssImport=require("postcss-import"),
mixins=require("postcss-mixins"),
hexrgba=require("postcss-hexrgba");


gulp.task("styles",function(){
   return gulp.src("./app/assets/styles/styles.css")
   .pipe(postcss([cssImport,mixins,cssvar,nested,hexrgba,autoprefixer]))
   .on("error",function(errorInfo){
     this.emit("end");
     console.log(errorInfo.toString());
   })
   .pipe(gulp.dest("./app/temp/styles"));
});
