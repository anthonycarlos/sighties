window.App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

// Router
App.Router.map(function() {
  this.resource('lists', function() {
    this.resource('list', {path: ':list_id'});
  });
});
App.ListsRoute = Ember.Route.extend({
  model: function() {
    return App.List.find();
  },
  activate: function() {
    alert('App.Lists(plural)Route.activate() called.');
    sightiesApp.loadOrdered();

  }
});
App.ListRoute = Ember.Route.extend({
  activate: function() {
    alert('App.List(singular)Route.activate() called.');
    sightiesApp.loadOrdered();
  }
});

// Controllers
App.ListsController = Ember.ArrayController.extend();

// Models
App.Store = DS.Store.extend({
  revision: 11,
  adapter: 'DS.FixtureAdapter'
});

App.List = DS.Model.extend({
  name:       DS.attr('string'),
  owner_id:   DS.attr('number'),
  created_at: DS.attr('date'),
  updated_at: DS.attr('date')
});

App.List.FIXTURES = [{
  id: 1
}, {
  id: 2
}, {
  id: 3
}, {
  id: 4
}];


$(document).ready(function() {

  sightiesApp = {
    wordList : new Array(),
    wordIndex : 0,
    showNewWord : function() {
      $("#the_word").html(this.wordList[this.wordIndex]);
    },
    updateButtons : function() {
      if (this.wordIndex == 0) {
        $( "#previous" ).button( "option", "disabled", true );
      } else {
        $( "#previous" ).button( "option", "disabled", false );
      }
      if (this.wordIndex == this.wordList.length - 1) {
        $("#next").button( "option", "disabled", true );
      } else {
        $("#next").button( "option", "disabled", false );
      }
    },
    updateDisplay : function() {
      this.updateButtons();
      this.showNewWord();
      $("#word_index").html((this.wordIndex + 1) + " / " + this.wordList.length);
      return true;
    },
    previous : function() {
      this.decrementIndex();
      this.updateDisplay();
    },
    next : function() {
      this.incrementIndex();
      this.updateDisplay();
    },
    decrementIndex : function() {
      if (this.wordIndex > 0) {
        this.wordIndex = this.wordIndex - 1;
      }
    },
    incrementIndex : function() {
      if (this.wordIndex < this.wordList.length - 1) {
        this.wordIndex = this.wordIndex + 1;
      }
    },
    loadOrdered : function() {
      this.load('ordered');
    },
    loadShuffled : function() {
      this.load('shuffled');
    },
    load : function(opts) {
      var qsNum = document.URL.match(/\d+$/g)
      var list
      if (qsNum) {
        list = qsNum[0]
      } else {
        list = "1"
      }
      var queryStr = '?' + opts + '=true';
      $.getJSON('lists/' + list + '/words.json' + queryStr, function(data) {
        var items = new Array();
        var i;

        for (i = 0; i < data.length; i++) {
          items.push(data[i]['name']);
        }
        sightiesApp.wordList = items;
        sightiesApp.wordIndex = 0;
        sightiesApp.updateDisplay();
      });
    }
  };

  sightiesApp.loadOrdered();

  $(document).keydown(function(e){
    if (e.keyCode == 37) { // left arrow
      sightiesApp.previous();
      return false;
    } else if (e.keyCode == 39) { // right arrow
      sightiesApp.next();
      return false;
    }
  });

  $("#previous").click(function(e) {
    sightiesApp.previous();
    return false;
  });

  $("#next").click(function(e) {
    sightiesApp.next();
    return false;
  });

  $("#shuffle").click(function(e) {
    sightiesApp.loadShuffled();
    return false;
  });

  $( "button#previous, button#next" )
    .button()
    .click(function( event ) {
      event.preventDefault();
    });

  $( "#dialog-options" ).dialog({
    autoOpen: false,
    resizable: false,
    height:240,
    modal: true,
    buttons: {
      "OK": function() {
        $( this ).dialog( "close" );
      }
    }
  });

  $( "#options" ).click(function() {
    $( "#dialog-options" ).dialog( "option", "position", [200, 45] );
    $( "#dialog-options" ).dialog( "open" );
  });

});

