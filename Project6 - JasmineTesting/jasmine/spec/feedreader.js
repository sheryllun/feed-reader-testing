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
         *has a URL defined, and the URL string is greater than one letter long.
         */

         it('contain a URL', function() {
            allFeeds.forEach(function(value) {
                expect(value.url).toBeDefined();
                expect(value.url.length).toBeGreaterThan(1);
            });
         });

        /* This test makes sure that each feed in the allFeeds object
         *has a name defined and the name is greater than one letter long.
         */

         it('have names', function() {
            allFeeds.forEach(function(value) {
                expect(value.name).toBeDefined();
                expect(value.name.length).toBeGreaterThan(1);
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
        var numEntries;
        //call loadFeed for first feed. loadFeed has a second paramater for a callback.
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        /* This test checks that after the initial feed is loaded, there are 
        * entries appearing.
         */
        it('have at least one entry', function(done) {
            numEntries = $('.feed').find('.entry').length;
            expect(numEntries).toBeGreaterThan(0);
            done();
        });
    });

    describe('New Feed Selection', function() { 
        var headlineText, newHeadlineText;

        beforeEach(function(done) {
            spyOn(window, 'loadFeed').and.callThrough();
            loadFeed(0, done);
        });

        //test to make sure feed 0 loads when called, store the headlines in a variable
        it('loads feed 0 when called', function() {
            expect(window.loadFeed).toHaveBeenCalledWith(0, jasmine.any(Function));
            //access the headlines in this scope and save them to a top-level variable.
            this.headlineText = $('.entry').children('h2').text();
            headlineText = this.headlineText;
        });

        describe('loads a new feed', function() {
            beforeEach(function(done) {
                loadFeed(1, done);
            });

        //test to make sure feed 1 loads when called, store the headlines in a top-level variable.
        it('loads feed 1 when called', function() {
            expect(window.loadFeed).toHaveBeenCalledWith(1, jasmine.any(Function));
            this.headlineText = $('.entry').children('h2').text();
            newHeadlineText = this.headlineText;
        });
        /* Checks to make sure that headlines from feed 1 are not the same as headlines from feed 0. I.e., 
         * make sure different feeds were loaded by loadFeed().
         */
         it('Feed headlines should not match', function() {
            expect(newHeadlineText).not.toEqual(headlineText);
         });
        });
    });
}());
