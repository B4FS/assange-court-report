jQuery(document).ready(function($){

    //fix for stupid ie object cover
    if (document.documentMode || /Edge/.test(navigator.userAgent)) {
      jQuery('.featured-box-img-cover').each(function(){
          var t = jQuery(this),
              s = 'url(' + t.attr('src') + ')',
              p = t.parent(),
              d = jQuery('<div></div>');
  
          p.append(d);
          d.css({
              'height'                : '290',
              'background-size'       : 'cover',
              'background-repeat'     : 'no-repeat',
              'background-position'   : '50% 20%',
              'background-image'      : s
          });
          t.hide();
      });
    }

    // alertbar later
    $(document).scroll(function () {
        var y = $(this).scrollTop();
        if (y > 100) {
            //$('.alertbar').fadeOut();
        } else {
            //$('.alertbar').fadeIn();
        }
    });


    // Smooth on external page
    $(function() {
      setTimeout(function() {
        if (location.hash) {
          /* we need to scroll to the top of the window first, because the browser will always jump to the anchor first before JavaScript is ready, thanks Stack Overflow: http://stackoverflow.com/a/3659116 */
          window.scrollTo(0, 0);
          target = location.hash.split('#');
          smoothScrollTo($('#'+target[1]));
        }
      }, 1);

      // taken from: https://css-tricks.com/snippets/jquery/smooth-scrolling/
      $('a[href*=\\#]:not([href=\\#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          smoothScrollTo($(this.hash));
          return false;
        }
      });

      function smoothScrollTo(target) {
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
        }
      }
    });
    
    
    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('nav').outerHeight();

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();
        
        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down            
            $('nav').removeClass('nav-down').addClass('nav-up'); 
            $('.nav-up').css('top', - $('nav').outerHeight() + 'px');
            $('.alertbar').fadeOut();
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {               
                $('nav').removeClass('nav-up').addClass('nav-down');
                $('.nav-up, .nav-down').css('top', '0px');
            }
            var y = $(this).scrollTop();
            if(y<100){
              $('.alertbar').fadeIn();             
            }
        }

        lastScrollTop = st;
    }
        
    $('.site-content').css('margin-top', $('header').outerHeight() + 'px');  
    
    // spoilers
     $(document).on('click', '.spoiler', function() {
        $(this).removeClass('spoiler');
     });
    
 });   

// deferred style loading
var loadDeferredStyles = function () {
  $('.alertbar').fadeIn();
	var addStylesNode = document.getElementById("deferred-styles");
	var replacement = document.createElement("div");
	replacement.innerHTML = addStylesNode.textContent;
	document.body.appendChild(replacement);
	addStylesNode.parentElement.removeChild(addStylesNode);
};
var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
if (raf) raf(function () {
	window.setTimeout(loadDeferredStyles, 0);
});
else window.addEventListener('load', loadDeferredStyles);



    function findImg(img) {
        return gallery_images.indexOf(img);
    }
    // Open the Modal
    function openModal(imgpath) {
        document.getElementById("myModal").style.display = "block";
        slideIndex=findImg(imgpath);
        showSlides();
    }
    
    // Close the Modal
    function closeModal() {
      document.getElementById("myModal").style.display = "none";
      var numberdiv = document.getElementById("number_div");
      var slideimg = document.getElementById("slideimg");
      var captionText = document.getElementById("caption");
      slideimg.src= "";
      numberdiv.innerHTML = "";
      captionText.innerHTML = "";
    }
    
    var slideIndex = 1;
    
    // Next/previous controls
    function plusSlides(e, n) {
        var evt = e ? e:window.event;
        if (evt.stopPropagation)    evt.stopPropagation();
        if (evt.cancelBubble!=null) evt.cancelBubble = true;
        slideIndex=slideIndex+=n;
        if(slideIndex>=gallery_images.length){
            slideIndex=gallery_images.length-1;
        }else if(slideIndex<0){
            slideIndex=0;
        }
      showSlides();

    }
    function openRawImage(e, elem){
        var evt = e ? e:window.event;
        if (evt.stopPropagation)    evt.stopPropagation();
        if (evt.cancelBubble!=null) evt.cancelBubble = true;
        window.open(elem.src);
    }
    function ignoreClick(e){
      var evt = e ? e:window.event;
      if (evt.stopPropagation)    evt.stopPropagation();
      if (evt.cancelBubble!=null) evt.cancelBubble = true;
      
  }   
    function clearSearch() {
      if(document.getElementById("photosearch").value.length>0){
      document.getElementById("photosearch").value="";
      document.getElementById("photosearch").focus();
      searchPhotos();
      }
    }
    const remove_tags = /(?:^|\W)#(\w+)(?!\w)/g;
    function showSlides() {

      
      var numberdiv = document.getElementById("number_div");
      var slideimg = document.getElementById("slideimg");
      var captionContainer = document.getElementById("caption-container");
      captionContainer.style.opacity=0;
      slideimg.style.opacity=0;

      window.setTimeout(function(){
        var slideimg = document.getElementById("slideimg");
        var captionText = document.getElementById("caption");
      
        slideimg.src= gallery_images[slideIndex];
        captionText.innerHTML = gallery_captions[gallery_images[slideIndex]].replaceAll(remove_tags,"") + "<br><i>Credit: " + gallery_credits[gallery_images[slideIndex]] + "</i><br><sup><a class='imgdl' href='" + gallery_images[slideIndex] +"' download>Download Image</a></sup>";
        
      },250);
      numberdiv.innerHTML = (slideIndex+1) + " of " + gallery_images.length;
      
      //Preload next image
      if(slideIndex<gallery_images.length-1){
        preload_img = new Image();
        preload_img.src = gallery_images[slideIndex+1]
      }
      if(slideIndex>0){
        preload_img2 = new Image();
        preload_img2.src = gallery_images[slideIndex-1]
      }
    }
    function fadeIn(){
      window.setTimeout(function(){
        var slideimg = document.getElementById("slideimg");
        var captionContainer = document.getElementById("caption-container");
        captionContainer.style.opacity=0.6;
        slideimg.style.opacity=1;
      
      },250)
          
    }
    function changeLang(elem){
      window.location.href=elem.value;
    }