
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
});

