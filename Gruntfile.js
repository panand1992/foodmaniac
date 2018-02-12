const webpackConfig = require('./webpack.config');

module.exports = function(grunt) {
    grunt.initConfig({
        clean: ['public/dist'],
        sass: {                              // Task 
            dist: {                            // Target 
                files: [{
                    expand: true,
                    cwd: 'public/app/stylesheets/foodmaniac/scss',
                    src: ['*.scss'],
                    dest: 'public/dist/stylesheets/css/',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'public/dist/stylesheets/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'public/dist/stylesheets/css',
                    ext: '.min.css'
                }]
            }
        },
        webpack: {
            options: {
                stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
            },
            prod: webpackConfig
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.registerTask('prod', ['clean', 'sass:dist', 'cssmin', 'webpack:prod']);
};