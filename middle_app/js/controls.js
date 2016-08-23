var gMaps = gMaps || {};

$(function() {
  $(".form-group.repeater button").on('click', function() {
    console.log("clicked");
    var $form = $(this).parents('form');
    var $repeater = $(this).parents('.repeater');
    

    if($(this).hasClass('add')) {
      var $newGroup = $repeater.clone(true);
      $newGroup.find('input').val('');
      $newGroup.appendTo('.people');
      gMaps.addAutoCompleteToRepeater();
    }

    if($(this).hasClass('remove')) {
      $repeater.remove();
    }
  });
});