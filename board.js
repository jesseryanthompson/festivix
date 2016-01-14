var five = require('johnny-five');

var board = new five.Board();

board.on("ready", function() {

  // Options object with pin property
  var led = new five.Led({
    pin: 10
  });

  var fog = new five.Relay({
    pin: 2
  });
  fog.close();

  var saw = new five.Relay({
    pin: 3
  });
  saw.close();

  this.repl.inject({
    led: led,
    saw: saw,
    fog: fog
  });

  led.blink();
});
