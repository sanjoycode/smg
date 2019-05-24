        var width = $(window).width();

        // Hide and show sidebar when viewport is gose smaller than tab size  
        function sidebar() {
            if (width < 750) {
                $(".sidebar").addClass('d-none');

            } else if (width > 750) {
                $(".sidebar").removeClass('d-none');
            }
        }

        //add_staff page's additional information pannel innitialy hidden 
        //pannel will showne when head is clicked
        function pannel_opener() {
            $('.acc_pannel').hide();


            $('.acc_head').click(function () {
                if ($('.acc_pannel').hasClass('active')) {
                    console.log($('.acc_head').filter('i'));
                    $('.acc_pannel').removeClass('active').slideUp();
                    $('.acc_head').find('i').removeClass('fa-minus');
                    $('.acc_head').find('i').addClass('fa-plus');
                } else {
                    $('.acc_pannel').addClass('active').slideDown();

                    $('.acc_head').find('i').removeClass('fa-plus');
                    $('.acc_head').find('i').addClass('fa-minus');
                }
            });
        }

        //System setting page's edit to save button toggler
        //when edit button is showne then input fields are disable and vicvarsa
        function setting_btn_toggler() {
            $(".system_settings_btn").click(function () {
                if ($(".system_settings_btn").hasClass('save')) {
                    $(".system_settings_btn").removeClass("save");
                    $(".system_settings_btn").removeClass('btn-success');
                    $(".system_settings_btn").addClass('btn-warning');
                    $(".system_settings_btn").text("Edit");
                    $('.input_filds .form-control').attr("disabled", "true");
                } else {
                    $(".system_settings_btn").addClass("save");
                    $(".system_settings_btn").removeClass('btn-warning');
                    $(".system_settings_btn").addClass('btn-success');
                    $(".system_settings_btn").text("Save");
                    $('.input_filds .form-control').removeAttr("disabled");
                }

            });
        }

        //System setting page's image to file input field toggler
        function change_logo() {
            $('.change_logo').click(function () {
                if ($('.change_logo').hasClass('changed')) {
                    $('.change_logo').removeClass('changed');
                    $(".school_logo label").remove();
                    $(".school_logo input").remove();
                    $(".school_logo").html('<img class="img-fluid p-2" src="../../myimage/school_logo.png">');

                } else {
                    $('.change_logo').addClass('changed');
                    $(".school_logo").find('img').remove();
                    $(".school_logo:first-child").html(
                        '<label class="form-control-label text-muted">choolse photo</label><input class="form-control-file" type="file"/>'
                    );
                }
            });
        }

        //pannel opener by handelin many page
        function open_pannel() {
            $('.controled_pannel').hide();
            $('.handel').click(function () {
                $('.controled_pannel').show();

            });
        }

        //date complication in option element 
        function no_of_day_in_month() {
            $('.staff_admission_report').hide();
            var current_year = new Date().getFullYear(),
                start_year = current_year - 5,
                end_year = current_year + 5;
            if ($('.dashbord').find('.year').hasClass('year')) {
                for (var i = start_year; i <= end_year; i++) {
                    var element = document.createElement('option');
                    element.innerHTML = i;
                    element.setAttribute("option", i);
                    document.querySelector('.year').appendChild(element);
                }
            }



            var selected_month, selected_year;
            $('.month').change(function () {
                selected_month = $(this).val();
            });
            $('.year').change(function () {
                selected_year = $(this).val();
            });

            $('.get_date').click(function () {
                console.log(selected_month);
                if (selected_month != null || selected_year != null) {
                    //console.log(selected_month+","+selected_year);
                    var no_day = new Date(selected_year, selected_month, 0).getDate();
                    for (var i = 1; i <= no_day; i++) {
                        var th = document.createElement('th');
                        th.innerHTML = i;
                        th.setAttribute("scope", "col");
                        document.querySelector('.date_cont').appendChild(th);
                    }
                    $('.staff_admission_report').show();
                } else {
                    alert('select values');
                }
            });
        }

        $(document).ready(function () {
            //add_staff page pannel togglear
            pannel_opener();
            ///System setting page's button toggler
            setting_btn_toggler();
            //System setting page's logo to input
            change_logo();
            //pannel openerin many page
            open_pannel();
            //findng no of days in month and finding years
            no_of_day_in_month();
            /*----------------------------staff page accordination----------------------*/

            $('.accordination').each(function () {

                //hiding pannel by default
                $(".accordination-pannel").hide();

                // bind click event handeler

                $(".accordination-head").click(function () {
                    // get elements
                    var thisAccordination = $(this).parent().parent();
                    var thisHead = $(this);
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

            $('.navigation .dropdown').click(function () {
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
            $(window).resize(function () {
                sidebar();
            });

            // hiding and showing sidebar respect to view port
            // since hasclass function is not working thats why i use even odd checking for toggling
            var count = 0;

            $('.toggle').click(function () {

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
            $('.tree_head', this).click(function () {



                var this_accordination = $(this).parent().parent(),
                    tree_head = $(this),
                    tree_pannel = tree_head.siblings('.tree_pannel'),
                    left_icon = tree_head.find('.icofont-rounded-right'),
                    down_icon = tree_head.find('.icofont-rounded-down');

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

            $('.tree_head').mouseout(function () {
                $(this).addClass('focus');
            });

            $('.tree_head').mouseover(function () {
                $('.sidebar_accordination').find('.tree_head').not(this).removeClass('focus');
            });

        });