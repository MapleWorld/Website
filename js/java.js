var slideshow;

var content = {};

function notice(data, ms) {
    new jBox('Notice', {
        content: data,
        autoClose: ms
    });
}
				
$(document).ready(function(){
			
	$("html").removeClass("no-js");
	
	sidebar.ready();
	content.slideshow = ltSlideshow();
	content.slideshow.ready();	

	// CSS for contact form
	$("#gallery-content").css({opacity: 0, display: "block"}).animate({opacity: 1 }, 750);
	$("#gallery-supplies,#gallery").hide().fadeIn(500);
	
	if ($("#gallery-content").length){
		$("html").addClass('hasContent');
		$("#gallery-content").setDocumentHeight();	
	} else {
		$("html").removeClass('hasContent');
	}

	// Fadein when hover over sidebar menu item for longer than 1 second
	$("div#sidebar div.sidebar div.item").hoverIntent({    
		over: function () {
	    	var el = $(this);
	    	el.children("a").fadeTo(300,1); 
	    	el.children("div.item_bg").animate({ opacity: 0 }, 1100);
	  	},
	    timeout: 200, 
	    out: function () {
	    	$(this).children("div.item_bg").animate({ opacity: 0.8 }, 800);	 
	    	$(this).children("a").fadeTo(800,0.4);    	
	  	} 
	});
	
	// Enable fullscreen for the pictures
	if($.support.fullscreen){
		
		$("body").addClass("supportFullscreen");
		
		$(".gallery-fullsreen").live("click",function(e){
			
			if ( $(".gallery-fullsreen span.gallery-fullsreen-text").text() == "exit" ){
  				$(".gallery-fullsreen span.gallery-fullsreen-text").text("Fullscreen");
			}
			
			$("#page").fullScreen({
				'callback': function(isFullScreen){ 
					if (isFullScreen){
						$(".gallery-fullsreen span.gallery-fullsreen-text").text("exit");
					} else {
						$(".gallery-fullsreen span.gallery-fullsreen-text").text("Fullscreen");
					}
					$(window).trigger('resize'); 
				}
			});
			
			e.preventDefault();
		});		
	}

	// Submit contact form information
	$("#formContactSubmit").click(function(e) { 
		$("#result").slideUp();
		
		//get input field values
		var user_name       = $('input[name=formContactName]').val();
		var user_email      = $('input[name=formContactTask]').val();
		var user_subject    = $('input[name=formContactSubject]').val();
		var user_message    = $('textarea[name=formContactMessage]').val();
		
		//simple validation at client's end
		//we simply change border color to red if empty field using .css()
		var proceed = true;
		
		if(user_name==""){ 
			$('input[name=formContactName]').css('border-color','red'); 
			proceed = false;
		}
		
		if(user_email==""){ 
			$('input[name=formContactTask]').css('border-color','red'); 
			proceed = false;
		}
		if(user_subject=="") {   
			$('input[name=formContactSubject]').css('border-color','red');  
			proceed = false;
		}
		if(user_message=="") {  
			$('textarea[name=formContactMessage]').css('border-color','red'); 
			proceed = false;
		}

		//everything looks good! proceed...
		if(proceed){
			//data to be sent to server
			post_data = {'userName':user_name, 'userEmail':user_email, 'userSubject':user_subject, 'userMessage':user_message};

			//Ajax post data to server
			$.post("contact_me.php", post_data, function(response){  
				
                //load json data from server and output message     
                if(response.type == 'error') {
                    output = '<div class="error">'+response.text+'</div>';
                } else {
                    output = '<div class="success">'+response.text+'</div>';
                    //reset values in all input fields
                    $('.ajaxform input').val(''); 
                    $('.ajaxform textarea').val(''); 
                    
                    // Show notice for second then close it.
					notice(output, "2000");
                }
                $("#result").hide().html(output).slideDown();
			}, 'json');
		}
		// Prevent page from rendering
		e.preventDefault();
	});
	
	// Reset previously set border colors and hide all message on .keyup() for contact form
    $(".ajaxform input, .ajaxform textarea").keyup(function() { 
        $(".ajaxform input, .ajaxform textarea").css('border-color',''); 
        $("#result").slideUp();
    });
	
});
	
// Control sidebar responsive-ness
var sidebar = {
	
	ready: function(){
		
		var that = this;
		
		that.onResize();
		
		$(window).resize(function() { 
			that.onResize();
		});
		
		$(document).scroll(function() { 
			that.onScroll();
		});	
						
		$("div.scroll").live("click",function(){
			$.scrollTo( $(this).data("value"), 400 );
		});
			
		$("body").addClass("startup").delay(1500).queue(function () {
			$(this).removeClass("startup");
			$(this).dequeue();
		});
	
	},
	onResize: function(){
		if ( $(document).height() > $("#page").height() ) {
			$(".scroll-bottom").fadeIn(250);
			$(".sidebar-items").css({paddingBottom: 19 + 'px'});
		} else {
			$(".scroll-bottom").fadeOut(250);
			$(".sidebar-items").css({paddingBottom: 0 + 'px'});
		}		
	},
	onScroll: function(){
		if ( $(document).scrollTop() > 0 ){
			$(".scroll-top").fadeIn(250);
		} else {
			$(".scroll-top").fadeOut(250);
		}
		if ( $(document).scrollTop() == $(document).height() - $(window).height() ){
			$(".scroll-bottom").fadeOut(250);
			$(".sidebar-items").css({paddingBottom: 0 + 'px'});		
		} else {
			$(".scroll-bottom").fadeIn(250);
			$(".sidebar-items").css({paddingBottom: 19 + 'px'});			
		}	
	}	
	
}

