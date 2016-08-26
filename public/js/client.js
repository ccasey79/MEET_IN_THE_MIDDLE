var MiddleApp = MiddleApp || {};

MiddleApp.API_URL = "/api";

MiddleApp.setRequestHeader = function(jqXHR) {
  var token = window.localStorage.getItem("token");
  if(!!token) return jqXHR.setRequestHeader("Authorization", "Bearer "+token);
  
}

MiddleApp.getTemplate = function(template, data){
  return $.get("/templates/"+ template + ".html").done(function(templateHtml){
    var html = _.template(templateHtml)(data);
    MiddleApp.$main.html(html);
    MiddleApp.updateUI();
    $(".navbar-nav a").click(function(){
        $('.navbar-collapse.in').collapse('hide');
      });
  });
}

MiddleApp.getUser = function(){
  event.preventDefault();

  return $.ajax({
    method: "GET",
    url: MiddleApp.API_URL+"/me",
    beforeSend: MiddleApp.setRequestHeader
  }).done(function(data){
    MiddleApp.getTemplate("users-show", { user: data });
  });
}

MiddleApp.loadPage = function() {
  event.preventDefault();
  MiddleApp.getTemplate($(this).data('template'));
}

MiddleApp.handleForm = function() {
  event.preventDefault();

  $(this).find("button").prop("disabled", true);

  var ajaxOpts = {
    url: MiddleApp.API_URL + $(this).attr("action"),
    method: method = $(this).attr("method"),
    beforeSend: MiddleApp.setRequestHeader
  };

  if($(this).attr('enctype') === 'multipart/form-data') {
    ajaxOpts.data = new FormData(this);
    ajaxOpts.contentType = false;
    ajaxOpts.cache = false;
    ajaxOpts.processData = false;
  } else {
    ajaxOpts.data = $(this).serialize();
  }

  return $.ajax(ajaxOpts).done(function(data){
    if(!!data.token){
      window.localStorage.setItem("token", data.token);
    }

    MiddleApp.getTemplate('map');

  }).fail(MiddleApp.handleFormErrors);

}

MiddleApp.handleFormErrors = function(jqXHR) {
  var $form = $("form");

  for(field in jqXHR.responseJSON.errors){
    $("form").find("input[name=" + field + "]").parent(".form-group").addClass("has-error");
  }

  $form.find('button').removeAttr("disabled");
}

MiddleApp.getEditForm = function() {
  event.preventDefault();

  return $.ajax({
    method: "GET",
    url: MiddleApp.API_URL+"/me",
    beforeSend: MiddleApp.setRequestHeader
  }).done(function(data){
    MiddleApp.getTemplate("users-edit", { user: data });
  });
}

MiddleApp.deleteUser = function() {
  event.preventDefault();

  return $.ajax({
    method: "DELETE",
    url: MiddleApp.API_URL+"/me",
    beforeSend: MiddleApp.setRequestHeader
  }).done(function(){
    MiddleApp.getTemplate('map');
    MiddleApp.logout();
  });
}

MiddleApp.updateUI = function() {
  var loggedIn = !!window.localStorage.getItem("token");

  if(loggedIn) {
    $(".logged-in").removeClass("hidden");
    $(".logged-out").addClass("hidden");
  }
  else {
    $(".logged-in").addClass("hidden");
    $(".logged-out").removeClass("hidden");
  }
}

MiddleApp.logout = function(){
  event.preventDefault();
  window.localStorage.clear();
  MiddleApp.updateUI();
}

MiddleApp.initEventHandlers = function() {
  MiddleApp.$main = $("main");
  this.$main.on("click", ".show-user", this.getUser);

  //any link in the main or outwith the main with a data-template attr, load on-click. 
  $('[data-template]').on('click', this.loadPage);
  this.$main.on('click', '[data-template]', this.loadPage);
  $(".navbar-nav a.show-user").on("click", this.getUser);
  $(".navbar-nav a.logout").on("click", this.logout);
  this.$main.on("submit", "form", this.handleForm);
  this.$main.on("click", "a.edit-user", this.getEditForm);
  this.$main.on("click", "a.delete-user", this.deleteUser);
  this.$main.on("click", "i.fa-refresh", this.loadPage);
  this.$main.on("focus", "form input", function(){
    $(this).parents(".form-group").removeClass("has-error");

  });
};

MiddleApp.init = function() {
  this.initEventHandlers();
  this.updateUI();
  this.getTemplate("home");
}.bind(MiddleApp);


$( document ).ready(function() {
  $(MiddleApp.init);
});
