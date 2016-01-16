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

  setInterval(function() {
    saw.open();
    setTimeout(function() {
      saw.close();
    }, 500);
  }, 1500);

  var proximitySensor = new five.Proximity({
    controller: "HCSR04",
    pin: 7
  });

  proximitySensor.on("data", function() {
    // console.log("inches: ", this.inches);
    // console.log("cm: ", this.cm);
    if (this.cm < 30) {
      console.log('change in distance');
    }
  });

  this.repl.inject({
    led: led,
    saw: saw,
    fog: fog
  });

  led.blink();
});
