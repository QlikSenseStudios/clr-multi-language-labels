/**
 * @description The task will display the elapsed execution time of grunt tasks
 *              Tasks that take less than 1% of the total time are hidden to reduce clutter
 * @param       {Object} Grunt
 * @return      {Object}
 * @author      André R. Ferreira <andre.ferreira@qlik.com>
 * @copyright   All rights reserved - Qlik 2014-2015
 */
module.exports = function (grunt) {
  'use strict';


  require('time-grunt')(grunt);

};

