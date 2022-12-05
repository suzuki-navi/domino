
circuitModules.push((Circuit) => {
  Circuit.prototype.text = function (text=null) {
    this.expand({x:0, y:0});
    this.setText({x:0, y:0}, text);
  }
  Circuit.prototype.reverse = function (value=null) {
    this.expand({x:0, y:0});
    this.setReverse({x:0, y:0}, value);
  }
  Circuit.prototype.cross = function () {
    this.expand({x:0, y:0});
    this.setCross({x:0, y:0});
  }
  Circuit.prototype.button = function (size=1) {
    this.expand({x:0, y:0});
    this.setButton({x:0, y:0}, size);
  }
  Circuit.prototype.value = function (value) {
    this.expand({x:0, y:0});
    this.setValue({x:0, y:0}, value);
  }
  Circuit.prototype.valueH = function (value) {
    this.expand({x:0, y:0});
    this.setValueH({x:0, y:0}, value);
  }
  Circuit.prototype.valueV = function (value) {
    this.expand({x:0, y:0});
    this.setValueV({x:0, y:0}, value);
  }
  Circuit.prototype.sofa = function (value) {
    this.expand({x:0, y:0});
    this.setSofa({x:0, y:0}, value);
  }

  Circuit.prototype.line = function (length) {
    const circuit = this;

    if (typeof(length) == "number") {
      lengthList = [length];
    } else {
      lengthList = length;
      if (lengthList.length == 0) {
        return;
      }
    }

    let cir = circuit;
    let len = lengthList[0];
    if (len < 0) {
      cir = cir.sub({x:0, y:0}, 2);
      len = -len
    }
    cir.expand({x:0, y:0});
    cir.expand({x:len, y:0});
    for (let j = 0; j < len; j++) {
      cir.setLine({x:j, y:0}, 0);
    }
    for (let j = 1; j < len; j++) {
      cir.setCross({x:j, y:0});
    }
    cir = cir.sub({x:len, y:0}, 1);

    cir.line(lengthList.slice(1));
  }

  Circuit.prototype.register = function (value=false) {
    const circuit = this;
    circuit.sub({x: +2, y: +0}).line([1, 2, 3, 1, 2, -1]);
    circuit.sub({x: -1, y: +0}).line([3]);
    circuit.sub({x: +1, y: -1}).line([0, 2]);
    circuit.sub({x: +1, y: -1}).line([-1, -1]);
    circuit.sub({x: +0, y: -1}).reverse(true);
    circuit.sub({x: -1, y: +0}).reverse();
    circuit.sub({x: +0, y: +0}).reverse();
    circuit.sub({x: +0, y: +1}).reverse(true);
    circuit.sub({x: +1, y: +1}).reverse();
    if (value) {
      circuit.sub({x: +0, y: +1}).value(false);
      circuit.sub({x: +1, y: +1}).value(true);
      circuit.sub({x: +2, y: +1}).value(true);
      circuit.sub({x: +2, y: +0}).value(true);
      circuit.sub({x: +3, y: +0}).value(true);
      circuit.sub({x: +3, y: +1}).value(true);
      circuit.sub({x: +3, y: +2}).value(true);
      circuit.sub({x: +2, y: +2}).value(true);
      circuit.sub({x: +1, y: +2}).value(true);
      circuit.sub({x: +0, y: +2}).value(true);
    }
  }

  Circuit.prototype.registerChip = function (bitCount, value) {
    const circuit = this;
    const gridHeight = 4;
    let n = value;
    for (let i = 0; i < bitCount; i++) {
      const cir = circuit.sub({x:0, y: i * gridHeight}, 0);
      cir.sub({x: 4, y: -1}).line([-3]);
      cir.register(n % 2 == 1);
      n = n >> 1;
    }
    circuit.sub({x: 4, y: -1}).line([0, gridHeight * (bitCount-1)]);
  }
});

