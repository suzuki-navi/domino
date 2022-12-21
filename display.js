
circuitModules.push((Circuit) => {
  Circuit.prototype.sevenSegmentDisplay = function () {
    const circuit = this;

    // 赤い下線
    circuit.xy( 5, 27).line([9]);
    circuit.xy(18, 27).line([1]);
    for (const i of [-1, 0, 1, 2, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 18, 19]) {
        circuit.xy(i, 27).reverse();
    }
    for (const i of [0]) {
      circuit.xy(i, 27).value(true);
    }

    // A 上
    circuit.xy(21, 28).line([0, -17, -1, 10]);
    circuit.xy(18, 13).line([3]);
    circuit.xy(21, 27).reverse();
    circuit.xy(17, 28).line([0, -17, -1, 3, -12, 5, 16]);
    circuit.xy(20,  1).line([-16]);
    circuit.xy(18,  1).line([0, -1, -14]);
    circuit.xy(16,  1).line([0, 1, 13]);

    // F 左上
    circuit.xy(-1, 28).line([0, -1, 1, -19, 1]);
    circuit.xy( 1, 12).line([-1]);
    circuit.xy( 1, 12).line([0, -4]);
    circuit.xy( 4, 10).line([-3]);
    circuit.xy(15, 28).line([0, -19, -14]);
    circuit.xy( 0, 12).reverse();
    circuit.xy( 1, 12).reverse();
    circuit.xy( 1, 11).reverse();
    circuit.xy( 2, 10).reverse();
    circuit.xy( 1,  9).reverse();
    circuit.xy( 1,  8).line([0, -5]);
    circuit.xy( 2,  8).line([0, -5]);
    circuit.xy( 1,  8).line([2, -7]);
    circuit.xy( 3,  1).line([-1]);
    circuit.xy( 3,  2).line([-2]);

    // B 右上
    circuit.xy(20, 28).line([0, -16, -2, 1]);
    circuit.xy(14, 13).line([4, -1]);
    circuit.xy(20, 27).reverse();
    circuit.xy(18, 10).line([-1, 8]);
    circuit.xy(18, 11).line([0, -9]);
    circuit.xy(18, 11).line([1, -9]);

    // G
    circuit.xy(16, 28).line([0, -16, -2]);
    circuit.xy( 0, 13).line([14, -1]);
    circuit.xy(16, 27).reverse();
    circuit.xy(14, 12).line([-11]);
    circuit.xy(14, 11).line([-10]);
    circuit.xy(14, 12).line([0, -2, -10]);

    // E
    circuit.xy( 1, 28).line([0, -1, 1, -13]);
    circuit.xy( 2, 23).line([-1, 11]);
    circuit.xy( 2, 24).line([1, -13]);
    circuit.xy( 3, 12).line([-1, 1]);

    // C 右下
    circuit.xy(16, 26).line([3, -2, -1]);
    circuit.xy(20, 24).line([-1]);
    circuit.xy( 0, 25).line([18, -11]);
    circuit.xy(18, 23).line([1, -9]);
    circuit.xy(18, 24).reverse();
    circuit.xy(19, 24).reverse();

    // D 左下
    circuit.xy( 4, 28).line([0, -6, 10]);
    circuit.xy( 4, 23).line([10]);
    circuit.xy( 4, 24).line([10]);
    circuit.xy( 4, 27).reverse();
  }

  Circuit.prototype.sevenSegmentDisplaySelector = function () {
    const circuit = this;

    circuit.selector3(35, {input:[0, 5, 9, 13, 17], output:[1, 3, 6, 17, 18, 19, 22, 23], series:[
      {skip: 1},

      {pos:[ 5,  7], cond:["in1", "out"]},
      {skip:-1},
      {pos:[ 9, 11], cond:["in1", "out"]},
      {skip:-1},
      {pos:[13, 15], cond:["in1", "out"]},
      {skip:-1},
      {pos:[17, 19], cond:["in1", "out"]},
      {skip:-1},

      {pos:[ 0,  7, 11, 15, 17,  1], cond:["in1", "in0", "in1", "in0", "in0", "out"]},

      {pos:[0, 21], cond:["in1", "out"]},

      {pos:[21,  7, 11, 15, 19,  2], cond:["in1", "in0", "in0", "in0", "in0", "out"], opts:[["reverse"]]},
      {skip:-1},
      {pos:[21,  5,  9, 13, 17,  3], cond:["in1", "in0", "in1", "in2", "in0", "out"]},
      {pos:[3, 23], cond:["in1", "out"]},
      {pos:[3, 2], cond:["in1", "out"]},
      {endOut:3},
      {skip:-1},
      {pos:[ 0,  5,  9, 13, 17, 23], cond:["in1", "in1", "in0", "in2", "in0", "out"], opts:[["reverse"]]},
      {pos:[21,  7, 11, 15, 19,  2], cond:["in1", "in0", "in0", "in0", "in1", "out"], opts:[["reverse"]]},
      {skip:-1},

      {pos:[ 0,  5,  9, 13, 17,  3], cond:["in0", "in2", "in2", "in2", "in2", "out"], opts:[[], [], [], [], [], [], ["upper"]]},
      {skip:-1},
      {pos:[21,  5,  9, 13, 17,  3], cond:["in1", "in1", "in0", "in0", "in0", "out"]},
      {pos:[21,  7, 11, 15, 19,  3], cond:["in1", "in0", "in0", "in1", "in0", "out"], opts:[["reverse"]]},
      {skip:-1},
      {pos:[21,  5,  9, 13, 17, 23], cond:["in0", "in2", "in2", "in2", "in2", "out"], opts:[[], [], [], [], [], [], ["upper"]]},
      {skip:-1},
      {pos:[21,  5,  9, 13, 17,  3], cond:["in1", "in1", "in1", "in1", "in0", "out"]},

      {pos:[0, 4], cond:["in1", "out"]},
      {skip:-1},

      {pos:[21,  7, 11, 15, 19, 23], cond:["in1", "in0", "in0", "in1", "in2", "out"]},
      {skip:-1},

      {pos:[ 4,  5,  9, 13, 17, 22], cond:["in1", "in0", "in1", "in2", "in2", "out"], opts:[["reverse"]]},

      {pos:[0, 5, 9, 13, 17, 24], cond:["in2", "in2", "in1", "in0", "in1", "out"]},
      {skip:-1},
      {pos:[0, 5, 9, 15, 19, 24], cond:["in2", "in2", "in2", "in1", "in1", "out"], opts:[["reverse"], [], [], [], [], [], ["notPos3"]]},

      {pos:[ 4,  7, 11, 15, 19, 22], cond:["in1", "in1", "in0", "in1", "in2", "out"]},
      {skip:-1},

      {endOut:21},
      {pos:[ 4,  5,  9, 13, 17, 21], cond:["in1", "in1", "in0", "in1", "in0", "out"], opts:[["reverse"]]},
      {pos:[ 4,  5,  9, 13, 19, 21], cond:["in1", "in0", "in1", "in1", "in0", "out"]},

      {skip:-1},
      {pos:[ 4,  5, 11, 15, 17, 20], cond:["in1", "in2", "in0", "in0", "in0", "out"], opts:[["reverse"]]},
      {pos:[ 4,  7,  9, 15, 17, 20], cond:["in1", "in0", "in2", "in0", "in0", "out"]},
      {skip:-1},
      {pos:[ 4,  5,  9, 13, 17, 20], cond:["in1", "in1", "in1", "in1", "in2", "out"], opts:[["reverse"]]},

      {skip:-4},
      {pos:[24, 23], cond:["in1", "out"]},
      {pos:[24, 22], cond:["in1", "out"]},
      {pos:[24, 20], cond:["in1", "out"]},
      {skip:1},

      {pos:[ 4,  5,  9, 13, 17, 22], cond:["in0", "in2", "in2", "in2", "in2", "out"], opts:[[], [], [], [], [], [], ["upper"]]},
      {pos:[ 4,  5,  9, 13, 17, 20], cond:["in0", "in2", "in2", "in2", "in2", "out"], opts:[[], [], [], [], [], [], ["upper"]]},

      {endOut:7},
      {pos:[4, 7], cond:["in1", "out"]},
      {skip:-1},
      {endOut:15},
      {pos:[17, 15], cond:["in1", "out"]},

      {skip:-1},
      {pos:[20, 18], cond:["in1", "out"]},
      {endOut:19},
      {pos:[21, 19], cond:["in1", "out"]},

      {skip:-1},
      {endOut:17},
      {pos:[7, 5, 9, 13, 15, 17], cond:["in1", "in1", "in1", "in0", "in0", "out"]},
      {skip:-2},
      {endOut:4},
      {pos:[3, 4], cond:["in1", "out"]},
      {endOut:6},
      {pos:[4, 6], cond:["in1", "out"]},
      {skip:-1},
      {endOut:3},
      {pos:[2, 3], cond:["in1", "out"]},
    ]});
  }

});

