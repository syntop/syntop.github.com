$( document ).ready(function() {
  function GetURLParameter(sParam){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
      var sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] == sParam)
      {
        return sParameterName[1];
      }
    }
  }
  
  function switchLanguage(newLanguage){
    
    var newLang = newLanguage;
    var prevLang = $('html').prop('lang');
    $('html').prop('lang', newLang);
    var prevLangParam = "?lang="+prevLang;
    var newLangParam = "?lang="+newLang;
    var newurl = (window.location.href + newLangParam).replace(prevLangParam, "");
    if(prevLang !== newLang){
      window.history.pushState("", "", newurl);
    }

   $("a[class=project-link]").attr('href',
   function(i, h) {
     if (newLangParam !== prevLangParam){
     return (h + newLangParam).replace(prevLangParam, "");
   } else {
     return (h + newLangParam);
   }
   });
  }
  
  
  var userLang = navigator.language || navigator.userLanguage; 
  userLang = userLang.split("-")[0];
  
  var urlparam = GetURLParameter("lang");
  if (urlparam !== undefined){
    $('html').prop('lang', urlparam);
    switchLanguage(urlparam);
  } else {
    if(userLang){
      if (userLang === "de"){
      switchLanguage(userLang);
    } 
    } 
  }
  $('.language-switch li').each( function() {
     $(this).click(function() {
        var newLang = $(this).attr('tlan');
        switchLanguage(newLang);
        return false;
    });
  });
});
