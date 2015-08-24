/**
 * This file is used to configure Grunt
 * Check the end of the file for the currently available tasks
 * @param       {Object} Grunt
 * @author      André R. Ferreira <andre.ferreira@qlik.com>
 * @copyright   All rights reserved - Qlik 2014-2015
 */
module.exports = function (grunt) {
  'use strict';


  grunt.log.writeln('\n2014-2015 - QLIK CONSULTANCY PRESENTS:\nGrunt, the task runner!\n');

  grunt.option('pkg', grunt.file.readJSON('package.json'));
  grunt.option('project', grunt.file.readJSON('project-config.json'));

  if ((!process.env.githubPassword || !process.env.githubUsername) && grunt.cli.tasks[0] === 'release') {
     grunt.log.warn('You must set the githubPassword environment variable to be able to deploy!' +
      '\nIf using fish shell, run the following 2 commands:' +
      '\ntouch ~/.config/fish/config.fish' +
      '\nset -U -x githubUsername YOUR_GITHUB_USERNAME_HERE' +
      '\nset -U -x githubPassword YOUR_GITHUB_PASSWORD_HERE'
    );
    grunt.fail.fatal('You must set the githubPassword environment variable\n');
  }

  grunt.loadTasks('tasks');

  grunt.registerTask('dev', ['watch']);
  grunt.registerTask('build', [
    'jshint:all',
    'clean:buildFolder',
    'copy:buildFolder',
    'sass:dev',
    'replace:dev'
  ]);
  grunt.registerTask('testDist', ['clean:qlikVMExtensionPathFolder', 'copy:currentDistFolder']);

};

