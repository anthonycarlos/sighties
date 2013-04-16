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
      var queryStr = '?' + opts + '=true';
      $.getJSON('lists/' + 1 + '/words.json' + queryStr, function(data) {
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

