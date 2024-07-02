(function($){

	'use strict';
	/* Restore jQUery.browser */
	(function(){var uaMatch=function(ua){ua=ua.toLowerCase();var match=/(chrome)[ \/]([\w.]+)/.exec(ua)||/(webkit)[ \/]([\w.]+)/.exec(ua)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua)||/(msie)([\w.]+)/.exec(ua)||ua.indexOf("compatible")<0 &&/(mozilla)(?:.*?rv:([\w.]+)|)/.exec(ua)||[];return{browser:match[1]||"",version:match[2]||"0"};};if(!$.browser){var browser={};var matched=uaMatch(navigator.userAgent);if(matched.browser){browser[matched.browser]=true;browser.version=matched.version;}if(browser.chrome){browser.webkit=true;}else if(browser.webkit){browser.safari=true;}$.browser=browser;}})();

	/**
	 * initGroup
	 */
	var initGroup = function(){
		var $group = $('#header').find('.utility .group')
		  , $wrapper = $('.jqTransformSelectWrapper')
		  , $list = $wrapper.find('ul li')
		  , $link = $list.find('a')
		  , $option = $wrapper.find('select option');

		$list.each(function(i){
			var className = $option.eq(i).attr('class');
			var val = $option.eq(i).val();
			$(this).find('a').addClass(className);
            $(this).find('a').attr('href', val);
            $(this).find('a').click(function () {
                $('#pc_form_channel').submit();
            });
		});

		$group.css({display:'inline-block'});
		$group.find('.jqTransformSelectWrapper > div > span').removeAttr('style');

        /* Select channel sp */
        $('#sp_select_channel').change(function () {
            $('#sp_form_channel').submit();
        });
	}


	/**
	 * setupPlaceholder
	 */
	var setupPlaceholder =  function(){
		$('#header .search input[title]').ahPlaceholder({
			placeholderColor : '#a0a0a0',
			placeholderAttr : 'title',
			likeApple : false
		});
	}


	/**
	 * setupSpHeader
	 */
	var setupSpHeader = function(){
		var $memberNav = $('#header').find('.size-sp-header nav.member > ul > li')
		  , $section = $('#header').find('.contents > section');

		$memberNav.on('click', function(){
			var current = $(this).attr('class')
			$memberNav.each(function(){
				if($(this).attr('class') === current){
					if($(this).hasClass('current')){
						$(this).removeClass('current');
					}else{
						$(this).addClass('current');
					}
				}else{
					$(this).removeClass('current');
				}
			});

			$section.each(function(){
				var flg = $(this).hasClass(current);

				if(flg){
					$(this).css({display:'block'});
				}else{
					$(this).css({display:'none'});
				}
			});
		});
	}


	/**
	 * addPopupBox
	 */
	$.fn.addPopupBox = function(href){
		$(this).fancybox({
			'titleShow'			: false,
			'transitionIn'		: 'none',
			'transitionOut'		: 'none',
			'autoScale'			: true,
			'showCloseButton'	: false,
			'margin'			: 10,
			'padding'			: 0,
			'overlayColor'		: '#fff',
			'hideOnOverlayClick': false,
			'enableEscapeButton': false,
			'type'				: 'inline',
			'href'				: href
		});
	}


	/**
	* Equalize heights.
	*/
	$.fn.equalHeights = function() {
		var self = $.fn.equalHeights;
		self.initialized  = self.initialized || false;
		self.group = self.group || [];

		var equalize = function($that) {
		var highest = 0;
		$that
			.height('auto')
			.each(function() {
				if($(this).height() > highest) {
					highest = $(this).height();
				}
			})
			.height(highest)
		;
	};

	var autoEqualize = function() {
		$.each(self.group, function(i, set) {
			equalize(set);
		});
	};

	equalize(this);
	self.group.push(this);

	if(!self.initialized) {
		self.initialized = true;
		$.fontSizeDetector.addEventListener(autoEqualize);
	}

	return this;
	};

	/**
	* Setup equalize item heights.
	*/
	var setupEqualizeItemHeights = function(){
		var item_group = {};
		$('#main').find('.equal-height').each(function(){
		var group = $(this).getClassVar('eh');
			if(!group){
				group = 'offset' + $(this).offset().top;
			}
			if(!(group in item_group)){
				item_group[group] = $([]);
			}
			item_group[group] = item_group[group].add(this);
		});
		$.each(item_group, function(){
			this.equalHeights();
		});
	};

	/**
	* Font size detector
	*/
	$.fontSizeDetector = (function() {
		var interval = 1000
		  , initialized = false
		  , listeners = []
		  , temp_size = -1
		  , last_size = 0
		  , timer
		  , $check_el;

		var detect = function() {
			clearTimeout(timer);
			temp_size = $check_el.width();
			if(last_size === temp_size) {
				return;
			}
			last_size = temp_size;
			runEvents();
			setTimeout(detect, interval);
		};

		var runEvents = function() {
			$.each(listeners, function(i, listener) {
				listener();
			});
		};

		var initialize = function() {
			$check_el = $('<span id="sizeCheck"></span>')
				.attr('style', 'width:1em;height:1px;font-size:1000%;position:absolute;top:-1em;left:-1em;font-family:monospace')
				.appendTo('body');
		};

		if(!initialized) {
			initialized = true;
			initialize();
		}

		return {
			detect : function() {
				return detect();
			},
			addEventListener : function(fn) {
				listeners[listeners.length] = fn;
				return detect();
			}
		}
	})();

	/**
	* Get var by class name.
	* @param {string} prefix key class prefix.
	*/
	$.fn.getClassVar = function(prefix) {
		var klass = ($(this).attr('class')+' ').split(' ')
		  , target  = new RegExp('^' + prefix);
		for(var i=0,len=klass.length; i<len; i++) {
			if(klass[i].match(target)) {
				return klass[i].replace(prefix + '-', '');
			}
		}
		return null;
	};


	var datePicker = function(){
		$('.datepicker').datepicker({
			showOn: "focus",
			dateFormat: "yy/mm/dd",
			timeFormat: "HH:mm",
			dayNamesMin: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
			altField: $(this),
			onClose : function(date){
				if(date.length > 0){
					$(this).val(date);
				}
			}
		});
	}

    var dateTimePicker = function(){
        $('.datetimepicker').datetimepicker({
            controlType: 'select',
            oneLine: true,
            dateFormat: "yy/mm/dd",
            timeFormat: "HH:mm",
            dayNamesMin: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
            onClose : function(date) {
                if(date.length > 0){
                    $(this).val(date);
                }
            }
        });
    }

    var addUploadBox = function(){
		$.fancybox({
			'titleShow'			: false,
			'transitionIn'		: 'none',
			'transitionOut'		: 'none',
			'autoScale'			: true,
			'showCloseButton'	: false,
			'margin'			: 10,
			'padding'			: 0,
			'overlayColor'		: '#fff',
			'hideOnOverlayClick': false,
			'enableEscapeButton': false,
			'type'				: 'inline',
			'href'				: '#uploadBox'
		});
	}

        /*
         *
         * Upload video
         */

        var uploadVideo = function(){
            $('#upload_video').on('click', function(e){
                $(".error_message").html('');
                $(".error").each(function(i, el) {
                    $(el).text('');
                });
                e.preventDefault();
                var video_max_size = window.video_max_size;
                var file_data = $('#upload')[0].files[0];
                var time_video = $('#time-video').val();
                var type_post = $('#type-post').val();
                var hash_code = $('#hash_code').val();
                var url_select_thumb = $('#url-select-thumb').val();

                if (type_post === 'admin' && hash_code === '') {
                    alert('Hash Code not null')
                    return false;
                }
                if (file_data) {
                    var type = file_data.type;
                    var size = file_data.size;
                    var match = ["video/mp4"];
                    if (type == match[0] && type) {
                        var form_data = new FormData();
                        var url = $('#url').val();
                        form_data.append('video', file_data);
                        form_data.append('time_video', time_video);
                        form_data.append('type_post', type_post);
                        form_data.append('hash_code', hash_code);
                        form_data.append('_token', $("input[name=_token]").val());

                        $.ajax({
                            url: url,
                            cache: false,
                            contentType: false,
                            processData: false,
                            data: form_data,
                            type: 'POST',
                            beforeSend: function() {
                                addUploadBox();
                            },
                            success: function (res) {
                                if (res.sucess === true) {
                                    var totalRequest = 0;
                                    var MaxRequest = 60;
                                    var flag = false;
                                    var storeTimeInterval = setInterval(function(){
                                        if ((totalRequest < MaxRequest) && (flag === false)) {
                                            totalRequest = totalRequest + 1;
                                            var url_s3 = $('#url-check-s3').val();
                                            var dataS3 = new FormData();
                                            dataS3.append('name_video', res.name_video);
                                            dataS3.append('_token', $("input[name=_token]").val());
                                            $.ajax({
                                                url: url_s3,
                                                contentType: false,
                                                processData: false,
                                                data: dataS3,
                                                type: 'POST',
                                                success: function(data){
                                                    if (data.sucess === true) {
                                                        flag = true;
                                                        clearInterval(storeTimeInterval);
                                                        $.fancybox.close();
                                                        window.location.replace(url_select_thumb);
                                                    }
                                                },
                                                error: function(){
                                                    $.fancybox.close();
                                                    $('#upload').val('');
                                                    clearInterval(storeTimeInterval);
                                                }
                                            });
                                        }

                                        //stop check images
                                        if (totalRequest == MaxRequest) {
                                            $.fancybox.close();
                                            $('#upload').val('');
                                            clearInterval(storeTimeInterval);
                                            return false;
                                        }
                                    }, 20000);

                                } else {
                                    $.fancybox.close();
                                    $(".error").first().text(res.message);
                                }
                            },
                            error: function(xhr) {
                                $.fancybox.close();
                            }
                        });
                    } else {
                        $(".error_message").html(window.error_post_video_general);
                        $(".error").first().text(window.error_post_video_file);
                        $('#upload').val('');
                        $.fancybox.close();
                    }
                    if(size > video_max_size){
                        $(".error_message").html(window.error_post_video_general);
                        $(".error").last().text(window.error_post_video_max_size);
                        $.fancybox.close();
					}
                    return false;
                } else {
                    $(".error_message").html(window.error_post_video_general);
                    $(".error").first().text(window.error_post_video);
                    $.fancybox.close();
                }
            });

            //change video class
            $('#kind').on('change',function () {
                if(this.value == '1'){
                    $("#public_date_flg").prop("disabled", false);
                }else{
                    $("#public_date_flg").prop("disabled", true);
                }
                $("#public_date_flg").prop("checked", true);

                if ($("#th_video_class_label").length) {
                    $("#th_video_class_label").html($(this).find('option:selected').text().trim());
                }

                if ($("#source_video_class").length) {
                    $("#source_video_class").html($(this).find('option:selected').text().trim());
                }

                if(this.value == '7'){
                    $('#dest_kind').val('').change();
                    $('#powerplay_end_date').val('');
                    $("#powerplay_end_date").prop("disabled", true);
                    $("#dest_kind").prop("disabled", true);

                    $('#overip_start_datetime').val('');
                    $("#overip_start_datetime").prop("disabled", true);
                    $('#overip_end_datetime').val('');
                    $("#overip_end_datetime").prop("disabled", true);
                } else {
                    $("#powerplay_end_date").prop("disabled", false);
                }
            });

            $('#powerplay_end_date').on('change', function (event) {
                var key = event.target.name;
                var value = event.target.value;

                if (value != '') {
                    $('#dest_kind').prop("disabled", false);
                } else {
                    $('#dest_kind').val('').change();
                    $('#dest_kind').prop("disabled", true);
                }
            });
        }

	/**
	 * DOM ready
	 */
	var ready = function(){
	  $.ajaxSetup({
	    headers: {
	        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	    }
	  });

		$('.member .group').jqTransform({imgPath:'/common/images/'});

		initGroup();
		setupPlaceholder();
		setupSpHeader();
		setupEqualizeItemHeights();
		datePicker();
        dateTimePicker();
        uploadVideo();
	}

	$(document).on('ready', ready);

}(jQuery));

function checkCB() {
    var element = document.getElementById("overip_flg");
    var overipStartDatetime = document.getElementById("overip_start_datetime");
    var overipEndDatetime = document.getElementById("overip_end_datetime");

    flag = element.checked;
    if (flag) {
        overipStartDatetime.disabled = false;
        overipEndDatetime.disabled = false;

        alert(message['VIDEO_OVERIP_MSG']);
    } else {
        overipStartDatetime.value = '';
        overipEndDatetime.value = '';
        overipStartDatetime.disabled = true;
        overipEndDatetime.disabled = true;
    }
};

function alertNotification(message, status, delay) {
    var delay = delay || 5000;
    var alertType = !status ? 'alert-danger' : (status === 2 ? 'alert-info' : 'alert-success');

    $('#notification .close').on('click', function () {
        event.preventDefault();

        $(this).closest('#notification').remove();
    });

    if ($(message).length && $('#notification').length) {
        $('#notification .alert-content').html('');

        $(message).each(function (index, element) {
            $('#notification .alert-content').append('<strong>' + element + '</strong><br>');
        });

        if (!status || (status && status === 2)) {
            $('#notification')
                .toggleClass('hidden')
                .removeClass('alert-success alert-danger alert-info')
                .addClass(alertType)
                .show();
        } else {
            $('#notification')
                .toggleClass('hidden')
                .removeClass('alert-success alert-danger alert-info')
                .addClass(alertType)
                .delay(delay)
                .show(function () {
                    $(this).toggleClass('hidden');
                });
        }
    }
}

function flashMessage(delay) {
    var delay = delay || 10000;
    var message = window.flash_message || null;

    if (message && typeof message.status !== 'undefined' && message.message != '') {
        var e = message;

        alertNotification(e.message, e.status, delay);
    }
}
