/**
 * @description The task allows the removal of empty files and folders
 * @param       {Object} Grunt
 * @return      {Object}
 * @author      André R. Ferreira <andre.ferreira@qlik.com>
 * @copyright   All rights reserved - Qlik 2014-2015
 */
module.exports = function (grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-cleanempty');

   grunt.config('cleanempty', {

    options : {
      files : false,
      folders: true,
      force: true,
      noJunk: true
    },

    currentDistributionFolder : {
      src: ['../dist/release-' + grunt.option('pkg').version + '/' + grunt.option('project').extensionName + '/styles']
    }

  });

};