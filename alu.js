
circuitModules.push((Circuit) => {
  Circuit.prototype.halfAdder1a = function () {
    const circuit = this;
    circuit.sub({x:1, y:0}).line([1, 1]);
    circuit.sub({x:0, y:2}).line([4]);
    circuit.sub({x:0, y:2}).line([0, -1, 4, 1]);
    circuit.sub({x:1, y:0}).line([0, 2]);
    circuit.sub({x:0, y:1}).reverse();
    circuit.sub({x:0, y:2}).reverse();
    circuit.sub({x:1, y:2}).reverse();
    circuit.sub({x:1, y:0}).reverse();
    circuit.sub({x:2, y:0}).reverse();
    circuit.sub({x:4, y:1}).reverse();
    circuit.sub({x:4, y:2}).reverse();
  }

  Circuit.prototype.halfAdder1b = function () {
    const circuit = this;
    circuit.sub({x:1, y:0}).line([1, 1]);
    circuit.sub({x:0, y:2}).line([3]);
    circuit.sub({x:0, y:2}).line([0, -1, 3, 1]);
    circuit.sub({x:1, y:0}).line([0, 2]);
    circuit.sub({x:0, y:1}).reverse();
    circuit.sub({x:0, y:2}).reverse();
    circuit.sub({x:1, y:2}).reverse();
    circuit.sub({x:1, y:0}).reverse();
    circuit.sub({x:2, y:0}).reverse();
    circuit.sub({x:3, y:1}).reverse();
    circuit.sub({x:3, y:2}).reverse();
  }

  Circuit.prototype.fullAdder1 = function () {
    const circuit = this;
    circuit.sub({x:0, y:0}).halfAdder1a();
    circuit.sub({x:5, y:0}).halfAdder1b();
    circuit.sub({x:4, y:2}).line([1]);
    circuit.sub({x:3, y:2}).line([0, 1, -3]);
    circuit.sub({x:6, y:2}).line([0, 1]);
  }

  Circuit.prototype.halfAdder2a = function () {
    const circuit = this;
    circuit.sub({x:2, y:0}).line([-1, -1]);
    circuit.sub({x:0, y:1}).line([0, 1, -4]);
    circuit.sub({x:0, y:1}).line([4, 1]);
    circuit.sub({x:2, y:0}).line([0, 2]);
    circuit.sub({x:0, y:2}).reverse();
    circuit.sub({x:1, y:0}).reverse();
    circuit.sub({x:2, y:2}).reverse();
    circuit.sub({x:2, y:0}).reverse();
    circuit.sub({x:4, y:1}).reverse();
    circuit.sub({x:4, y:2}).reverse();
  }

  Circuit.prototype.halfAdder2b = function () {
    const circuit = this;
    circuit.sub({x:2, y:0}).line([-1, -1]);
    circuit.sub({x:0, y:2}).line([4, -1]);
    circuit.sub({x:0, y:2}).line([0, -1, 4]);
    circuit.sub({x:2, y:0}).line([0, 2]);
    circuit.sub({x:0, y:1}).reverse();
    circuit.sub({x:0, y:2}).reverse();
    circuit.sub({x:1, y:0}).reverse();
    circuit.sub({x:2, y:2}).reverse();
    circuit.sub({x:2, y:0}).reverse();
    circuit.sub({x:1, y:1}).reverse();
    circuit.sub({x:4, y:1}).reverse();
  }

  Circuit.prototype.fullAdder2 = function () {
    const circuit = this;
    circuit.sub({x:0, y:0}).halfAdder2a();
    circuit.sub({x:0, y:3}).halfAdder2b();
    circuit.sub({x:4, y:2}).line([0, 1, 2]);
    circuit.sub({x:3, y:2}).line([0, 4, 1]);
    circuit.sub({x:2, y:5}).line([0, 1]);
  }
});

