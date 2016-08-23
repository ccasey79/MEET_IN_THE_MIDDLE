$(function() {
  $(".form-group.repeater button").on('click', function() {
    console.log("clicked");
    var $form = $(this).parents('form');
    var $repeater = $(this).parents('.repeater');
    

    if($(this).hasClass('add')) {
      var $newGroup = $repeater.clone(true);
      $newGroup.appendTo('.people');
    }

    if($(this).hasClass('remove')) {
      $repeater.remove();
    }
  });
});