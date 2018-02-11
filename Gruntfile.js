const webpackConfig = require('./webpack.config');

module.exports = function(grunt) {
    grunt.initConfig({
        sass: {                              // Task 
            dist: {                            // Target 
                files: [{
                    expand: true,
                    cwd: 'public/stylesheets/foodmaniac/scss',
                    src: ['*.scss'],
                    dest: 'public/stylesheets/foodmaniac/css',
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

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-webpack');
    grunt.registerTask('prod', ['sass:dist', 'webpack:prod']);
};