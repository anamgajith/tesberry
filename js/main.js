/* ===================================================================
 * Count - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";
    
    var cfg = {
        scrollDuration : 800, // smoothscroll duration
        mailChimpURL   : 'https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc'   // mailchimp url
    },

    $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);

    // svg fallback
    if (!Modernizr.svg) {
        $(".home-logo img").attr("src", "images/logo.png");
    }


   /* Preloader
    * -------------------------------------------------- */
    var ssPreloader = function() {
        
        $("html").addClass('ss-preload');

        $WIN.on('load', function() {

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            
            // for hero content animations 
            $("html").removeClass('ss-preload');
            $("html").addClass('ss-loaded');
        
        });
    };


   /* info toggle
    * ------------------------------------------------------ */
    var ssInfoToggle = function() {

        //open/close lateral navigation
        $('.info-toggle').on('click', function(event) {

            event.preventDefault();
            $('body').toggleClass('info-is-visible');

        });

    };
   
   

   /* slick slider
    * ------------------------------------------------------ */
    var ssSlickSlider = function() {
        
        $('.home-slider').slick({
            arrows: false,
            dots: false,
            autoplay: true,
            autoplaySpeed: 3000,
            fade: true,
            speed: 3000
        });

    };


   /* placeholder plugin settings
    * ------------------------------------------------------ */
    var ssPlaceholder = function() {
        $('input, textarea, select').placeholder();
    };


   /* final countdown
    * ------------------------------------------------------ */
    var ssFinalCountdown = function() {

        var finalDate =  new Date("July 15, 2024 00:00:00").getTime();
        //-date: "Mar 25 2021",

        $('.home-content__clock').countdown(finalDate)
        .on('update.countdown finish.countdown', function(event) {

            var str = '<div class=\"top\"><div class=\"time days\">' +
                      '%D <span>day%!D</span>' + 
                      '</div></div>' +
                      '<div class=\"time hours\">' +
                      '%H <span>H</span></div>' +
                      '<div class=\"time minutes\">' +
                      '%M <span>M</span></div>' +
                      '<div class=\"time seconds\">' +
                      '%S <span>S</span></div>';

            $(this)
            .html(event.strftime(str));

        });
    };

/*___________________________________________________________*/

$("#mc-form").submit((e) => {
    e.preventDefault();
    var emailInput = $("#mc-email").val();

            // Check if the email input is empty
            if (!emailInput.trim()) {
                $(".subscribe-message").text("Email address is required.").addClass("error").fadeIn();
                return; // Exit function if email is empty
            }

            // Validate the email using a regular expression
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput)) {
                $(".subscribe-message").text("Enter a valid Email Address.").addClass("error").fadeIn();
                return; // Exit function if email is invalid
            }
    $(".subscribe-message").text("Submitting...").removeClass("success error"); 

    $.ajax({
        url: "https://script.google.com/macros/s/AKfycbwjpWVRD1SUhqXoe2W09oUEdJs5gxJkp8MOBsgJyFBdZ-ReJpsP1bkOLRWjNzogWRAuBw/exec",
        data: $("#mc-form").serialize(),
        method: "post",
        success: function(response) {
            $(".subscribe-message").text("We'll keep you informed once the website is launched.").addClass("success"); 
            // console.log("Success class added");


            $("input[type='submit']").val("Subscribed").addClass("set");
            

            
            setTimeout(() => {
                $(".subscribe-message").fadeOut(); 
            }, 3000);
        },
        error: function(err) {
            $(".subscribe-message").text("Something went wrong.").addClass("error");
            console.log("Error class added");

            // Keep the error message visible for 3 seconds
            setTimeout(() => {
                $(".subscribe-message").fadeOut();
            }, 3000); 
        }
    });
});

// ______________________________________________________________

   /* AjaxChimp
    * ------------------------------------------------------ */
    // var ssAjaxChimp = function() {
        
    //     $('#mc-form').ajaxChimp({
    //         language: 'es',
    //         url: cfg.mailChimpURL
    //     });

    //     // Mailchimp translation
    //     //
    //     //  Defaults:
    //     //	 'submit': 'Submitting...',
    //     //  0: 'We have sent you a confirmation email',
    //     //  1: 'Please enter a value',
    //     //  2: 'An email address must contain a single @',
    //     //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
    //     //  4: 'The username portion of the email address is invalid (the portion before the @: )',
    //     //  5: 'This email address looks fake or invalid. Please enter a real email address'

    //     $.ajaxChimp.translations.es = {
    //         'submit': 'Submitting...',
    //         0: '<i class="fas fa-check"></i> We have sent you a confirmation email',
    //         1: '<i class="fas fa-exclamation-triangle"></i> You must enter a valid e-mail address.',
    //         2: '<i class="fas fa-exclamation-triangle"></i> E-mail address is not valid.',
    //         3: '<i class="fas fa-exclamation-triangle"></i> E-mail address is not valid.',
    //         4: '<i class="fas fa-exclamation-triangle"></i> E-mail address is not valid.',
    //         5: '<i class="fas fa-exclamation-triangle"></i> E-mail address is not valid.'
    //     }
    // };

   

   /* initialize
    * ------------------------------------------------------ */
    (function ssInit() {
        
        ssPreloader();
        ssInfoToggle();
        ssSlickSlider();
        ssPlaceholder();
        ssFinalCountdown();
        // ssAjaxChimp();

    })();


})(jQuery);