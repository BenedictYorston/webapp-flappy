var creditsFlag = false;

jQuery("#credits").on("click", function() {
  if (creditsFlag) {
    removeContent();
    creditsFlag = false;
  } else {
    addContent();
    creditsFlag = true;
  }
});

function addContent(){
  var message = "Game created by Benedict Yorston, idea by Jadze Allright";
  jQuery("#creditsContent").append(
    "<p>" + message + "</p>"
  );
}


function removeContent(){
  jQuery("#creditsContent").empty();
}
