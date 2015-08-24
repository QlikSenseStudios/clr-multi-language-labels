/**
 * @description The watch task will:
 * - lint modified JS files
 * - copy modified files to the build folder
 * - run SASS
 * - copy all files to the Qlik Sense extension folder in your VM
 * @param       {Object} Grunt
 * @return      {Object}
 * @author      André R. Ferreira <andre.ferreira@qlik.com>
 * @copyright   All rights reserved - Qlik 2014-2015
 */
module.exports = function (grunt) {
  'use strict';


  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.config('watch', {
    all: {
      files: [
        '../source/**/**.*',
        'Gruntfile.js',
        'task-*',
        '!../source/vendor/**/*'
      ],
      tasks: [
        'jshint:all',
        'clean:buildFolder',
        'clean:qlikVMExtensionPathFolder',
        'copy:buildFolder',
        'sass:dev',
        'replace:dev',
        'copy:qlikVMExtensionPathFolder'
      ],
      options : {
        debounceDelay: 250,
        event: ['all'],
        interval: 100,
        interrupt: true,
        reload: true,
        dateFormat: function(time) {
          grunt.log.writeln('::::: QLIK CONSUNTANCY - WATCH TASK COMPLETED :::::');
          grunt.log.writeln('Watch task finished in ' + time + 'ms at' + (new Date()).toString());
          grunt.log.writeln('::::: QLIK CONSUNTANCY - Waiting for more changes :::::');
        },
      }
    }
  });

};

