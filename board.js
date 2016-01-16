'use strict';
var five = require('johnny-five');
var EventEmitter = require('events');

class Board {
  constructor(options) {
    var self = this;

    this.board = new five.Board();
    this.events = new EventEmitter();

    this.board.on("ready", function() {
      self.saw = new five.Relay({
        pin: 3
      });

      self.proximitySensor = new five.Proximity({
        controller: "HCSR04",
        pin: 7
      });

      self.proximitySensor.on("data", function() {
        // console.log("inches: ", this.inches);
        // console.log("cm: ", this.cm);
        if (this.cm < 30) {
          console.log('change in distance');
        }
      });

      var led = new five.Led({
        pin: 10
      });

      led.blink();

      self.saw.close();

      /*this.repl.inject({
        led: this.led,
        saw: this.saw
      });*/
    });
  }

  toggleSaw(on) {
    var self = this;

    if (self.saw) {
      self.saw.open();

      setTimeout(function() {
        self.saw.close();
      }, 500);
    }
  }
}

module.exports = Board;
