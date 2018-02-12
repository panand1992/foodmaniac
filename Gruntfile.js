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
        webpack: {
            options: {
                stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
            },
            prod: webpackConfig
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.registerTask('prod', ['clean', 'sass:dist', 'webpack:prod']);
};