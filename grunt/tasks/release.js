/**
 * @description The task will:
 * @param       {Object} Grunt
 * @return      {Object}
 * @author      André R. Ferreira <andre.ferreira@qlik.com>
 * @copyright   All rights reserved - Qlik 2014-2015
 */
module.exports = function (grunt) {
  'use strict';


  grunt.loadNpmTasks('grunt-release');

  grunt.config('release', {
    options: {
      bump: true,
      changelog: '../CHANGELOG.md',
      changelogText: '### Version: <%= version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n\n',
      file: './package.json',
      additionalFiles: ['./bower.json'],
      add: true,
      commit: true,
      tag: true,
      push: true,
      pushTags: true,
      npm: false,
      npmtag: false,
      indentation: '  ',
      tagName: '<%= version %>',
      commitMessage: 'Release <%= version %>',
      tagMessage: 'Version <%= version %>',
      beforeBump: [
        'jshint:all',
        'clean:buildFolder',
        'copy:buildFolder',
        'sass:release'
      ],
      afterBump: ['replace:release'],
      beforeRelease: [
        'mkdir:distributionFolder',
        'copy:distributionFolder',
        'requirejs:distribution',
        'replace:postMinification',
        'clean:currentDistributionFolder',
        'cleanempty:currentDistributionFolder'
      ],
      afterRelease: [
        'jsdoc',
        'plato'
      ],

      github: {
        repo: grunt.option('pkg').repository.url,
        usernameVar: 'githubUsername',
        passwordVar: 'githubPassword'
      }
    }
  });

};

