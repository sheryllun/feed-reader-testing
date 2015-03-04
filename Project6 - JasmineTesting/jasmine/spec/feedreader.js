/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*This test makes sure that each feed in the allFeeds object
         *has a URL defined, and the URL string must contain 'http://'.
         */

         it('contain a URL', function() {
            allFeeds.forEach(function(value, index) {
                expect(allFeeds[index].url).toBeDefined();
                expect(allFeeds[index].url).toContain('http://');
            });
         });

        /* This test makes sure that each feed in the allFeeds object
         *has a name defined and the name is greater than one letter long.
         */

         it('have names', function() {
            allFeeds.forEach(function(value, index) {
                expect(allFeeds[index].name).toBeDefined();
                expect(allFeeds[index].name.length).toBeGreaterThan(1);
            });
         });
    });


    describe('The menu', function() {

        var bodyClass = $('body').hasClass('menu-hidden');


        /* Tests to make sure the menu is hidden when the page loads
         */
         it('is hidden by default', function() {
            expect(bodyClass).toBe(true);
         });

         /* Tests to see if the menu icon will toggle the menu
          */

          it('is toggle-able', function() {
            var menuButton = $('.menu-icon-link');
            menuButton.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuButton.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
          });

    });

    describe('Initial entries', function() { 
        var numEntries = $('.feed').length;

        //call loadFeed for first feed. loadFeed has a second paramater for a callback.
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* This test checks that after the initial feed is loaded, there are 
        * entries appearing.
         */
        it('have at least one entry', function(done) {
            expect(numEntries).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() { 
        var headlineText;

        beforeEach(function(done) {
            //get all the headlines and store them in a variable
            headlineText = $('.entry').children('h2').text();
            loadFeed(1, done);
        });
        /* Checks to make sure that when user clicks on a new feed, the new 
         *feed loads and the entries on the page change to reflect the new feed.
         */
         it('changes when a new feed is loaded', function(done) {
            var newHeadlineText = $('.entry').children('h2').text();
            expect(newHeadlineText).not.toEqual(headlineText);
            done();
         });
    });
}());
