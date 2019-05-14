var width = $(window).width();

        // Hide and show sidebar when viewport is gose smaller than tab size  
        function sidebar() {
            if (width < 750) {
                $(".sidebar").addClass('d-none');

            } else if (width > 750) {
                $(".sidebar").removeClass('d-none');
            }
        }
        $(document).ready(function() {
            
            /*----------------------------staff page accordination----------------------*/
            
            $('.accordination').each(function() {

                //hiding pannel by default
                $(".accordination-pannel").hide();

                // bind click event handeler

                $(".accordination-head").click(function(e) {
                    // get elements
                    var thisAccordination = $(this).parent().parent();
                    var thisHead = $(this);
                    var thisPlus = $(thisHead).hasClass("accordinationPlus");
                    var thisPannel = $(thisHead).siblings(".accordination-pannel");

                    //only current accordination will show
                    thisAccordination.find('.accordination-head').not(this).removeClass('active');
                    thisAccordination.find('.accordination-pannel').not(this).removeClass('active').slideUp();
                    //based on current accordination icons l appear on current
                    thisAccordination.find(".accordinationMinus").not(this).hide();
                    thisAccordination.find(".accordinationPlus").not(this).show();


                    // toggle accordinationPlus
                    if (thisHead.hasClass("active")) {
                        thisHead.removeClass("active");
                        thisHead.children(".accordinationMinus").hide();
                        thisHead.children(".accordinationPlus").show();
                        thisPannel.removeClass("active");
                        thisPannel.slideUp("slow");

                    } else {
                        thisHead.addClass("active");
                        thisPannel.addClass("active");
                        thisHead.children(".accordinationMinus").removeClass("d-none").show();
                        thisHead.children(".accordinationPlus").hide();
                        thisPannel.show("slow");
                    }
                });
            });
            
            /*------------------------------------------------------*/

            $('.navigation .arrow').hide();
            $('.navigation .dropdown_pannel').hide();

            $('.navigation .dropdown').click(function(e) {
                if ($('.navigation .arrow').hasClass('open')) {
                    $('.navigation .arrow').fadeOut();
                    $('.navigation .dropdown_pannel').fadeOut();
                    $('.navigation .arrow').removeClass('open');
                } else {
                    $('.navigation .arrow').fadeIn();
                    $('.navigation .dropdown_pannel').fadeIn();
                    $('.navigation .arrow').addClass('open');
                }
            });

            // toggling hambarger button between small amd wide screen
            if (width < 750) {
                $(".menu_icon").prepend('<i class=" toggle d-inline-block d-none mr-3 icofont-navigation-menu" style="cursor:pointer"></i>');
                $('.sidebar').css({
                    'width': "40%"
                });
            } else {
                $(".menu_icon i").remove();
            }

            // function will work when page is loaded no visual effect 
            sidebar();

            //event is for checking view port compatibility visual effect on the fly for testing
            $(window).resize(function() {
                sidebar();
            });

            // hiding and showing sidebar respect to view port
            // since hasclass function is not working thats why i use even odd checking for toggling
            var count = 0;

            $('.toggle').click(function() {

                count++;
                console.log(count);

                if (count % 2 != 0) {
                    $('.sidebar').removeClass('d-none');
                    $(".content").css({
                        'margin-left': '40%'
                    });

                } else {
                    $('.sidebar').addClass('d-none');;
                    $(".content").css({
                        'margin-left': '0px'
                    });
                }
            });

            //accordination
            //hiding tree_pannels onload
            $('.tree_pannel').hide();

            //open up tree_pannel  when  tree-view is clickd
            // and toggle between right-arrow-icon and down arrow icon.
            $('.tree_head', this).click(function(e) {



                var this_accordination = $(this).parent().parent(),
                    tree_head = $(this),
                    tree_pannel = tree_head.siblings('.tree_pannel'),
                    left_icon = tree_head.find('a i.icofont-rounded-right'),
                    down_icon = tree_head.find('a i.icofont-rounded-down');

                //reset all tree_pannel expect only for current to be showed
                this_accordination.find('.tree_head').not(this).removeClass('active');
                this_accordination.find('.tree_pannel').not(this).removeClass('active').slideUp();



                if (tree_head.hasClass('active')) {
                    tree_head.removeClass('active');
                    tree_pannel.removeClass('active').slideUp();
                    down_icon.removeClass('icofont-rounded-down');
                    down_icon.addClass('icofont-rounded-right');

                } else {
                    tree_head.addClass('active');
                    tree_pannel.addClass('active').slideDown();
                    left_icon.removeClass('icofont-rounded-right');
                    left_icon.addClass('icofont-rounded-down');
                }

            });



            //focus effect on tree-view

            $('.tree_head').mouseout(function() {
                $(this).addClass('focus');
            });

            $('.tree_head').mouseover(function() {
                $('.sidebar_accordination').find('.tree_head').not(this).removeClass('focus');
            });

        });