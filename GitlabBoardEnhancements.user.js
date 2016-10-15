// ==UserScript==
// @name         Gitlab Board Enhancements
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds doubleclick, automatic label selection, auto refresh to gitlab boards
// @author       You
// @match        https://YOUR_GITLAB_URL/*/board
// @match        https://YOUR_GITLAB_URL/*/issues/new*
// ==/UserScript==
var GITLAB_URL = "YOUR_GITLAB_URL"; // full URL, including trailing slash e.g. https://www.gitlab.com/


function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}


$(document).ready(function() {
    console.log('loading gitlab enhancements...' + Date.now());    
    function popupwindow(url, title, w, h) {
        var left = (screen.width/2)-(w/2);
        var top = (screen.height/2)-(h/2);
        return window.open(url, title, 'width='+w+', height='+h+', top='+top+', left='+left);
    } 
    setTimeout(function() {
        var splitUrl = window.location.pathname.split('/');
        console.log(splitUrl);
        console.log('gitlab enhancements loaded.');
        $('.board-list').dblclick(function() {
            var titleHtml = $(this).parent().find('.board-title').html(); //.replace(/(<([^>]+)>)/ig,"");
            var issueType = titleHtml.substr(0, titleHtml.indexOf('<')).trim();
            popupwindow(GITLAB_URL+splitUrl[1] + "/" + splitUrl[2] + "/issues/new?label="+issueType, "New Issue", 800, 800);
        });
        $('.select2-input').click();
        var clickLabel = decodeURI($_GET('label'));
        setTimeout(function() {
            $('.select2-results').find("div:contains('"+clickLabel+"')").mouseup();
            $('#issue_title').focus();
        }, 10);        
        
        $("[name='commit']").mousedown(function() {
          localStorage.setItem("refreshneeded", "true");  
        });
        
        if(window.location.href.indexOf("issues/new") <= -1) {
            setInterval(function() {
                var refreshNeeded = localStorage.getItem("refreshneeded");
                if (refreshNeeded == "true") {
                    localStorage.setItem("refreshneeded", "");
                    setTimeout(function() {
                        location.reload();
                    }, 100);
                }
            }, 2000);
        }
        $('.boards-list').css("background-color","#9c9c9c");
        $('.board').css("min-width","300px");
        
        
    }, 200);
    
    
    
});
