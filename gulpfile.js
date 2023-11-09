'use strict';

// import module
const gulp = require('gulp');
const sass = require('gulp-sass') (require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const pug = require('gulp-pug');

//gulp task
const { series,task,src,dest,watch } = gulp;

/*
in-out dir settings
*/

const cssSrcPath = './src/sass';
const cssDestPath = './public/css';
const jsSrcPath = './src/js';
const jsDestPath = './public/js'
const pugSrcPath = './src/pug';
const pugDestPath = './public/';

//run task sass
task('sass',(done)=>{
    console.log('///// sassのタスク実行 /////');
    src(cssSrcPath + '/*.scss')
    .pipe(plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sass({
        outputStyle: 'expanded'    // or compressed
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(autoprefixer())
    .pipe(dest(cssDestPath));
    done();
});

task('pug',(done)=>{
    console.log('***** pugのタスク実行 *****');
    src([`${pugSrcPath}/*.pug` , `!${pugSrcPath}/_*.pug`])
    .pipe(plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(pug({
        pretty: true
    }))
    .pipe(dest(pugDestPath));
    done();
});

task('js',(done)=>{
    console.log('>>>>>>>> jsのタスク実行 <<<<<<<<<');
    src(jsSrcPath + '/*.js')
    .pipe(plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    //授業では特に触れない為、各自でモジュールを追加して環境を組む
    .pipe(dest(jsDestPath));
    done();
});

task('watch',(done)=>{
    console.log('+++++ watchの実行 +++++');
    watch(`${pugSrcPath}/*.pug`,task('pug'));
    watch(`${cssSrcPath}/*.scss`,task('sass'));
    watch(`${jsSrcPath}/*.js`,task('js'));
    done();
});

task('default',series('sass','pug','js'));