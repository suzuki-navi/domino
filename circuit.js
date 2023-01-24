
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

  Circuit.prototype.registerToggle = function (value=false) {
    const circuit = this;
    circuit.register(value);
    circuit.xy(0, 2).line([-1, 2]);
    circuit.xy(-1, 0).reverse();
  }

  Circuit.prototype.registerChip = function (bitCount, value) {
    const circuit = this;
    const gridHeight = 4;
    let n = value;
    for (let i = 0; i < bitCount; i++) {
      const cir = circuit.xy(0, i * gridHeight);
      cir.xy(4, -1).line([-3]);
      cir.register(n % 2 == 1);
      n = n >> 1;
    }
    circuit.xy(4, -1).line([0, gridHeight * (bitCount-1)]);
  }

  Circuit.prototype.counter = function (bitCount, value = 0) {
    const circuit = this;
    const gridHeight = 4;
    let n = value;
    for (let i = 0; i < bitCount; i++) {
      const cir = circuit.xy(0, i * gridHeight);
      cir.xy(-4, -1).line([3]);
      cir.xy(0, 0).flip().register(n % 2 == 1);
      cir.xy(0, 2).line([1, -2]);
      cir.xy(1, 0).reverse();
      if (i > 0) {
        cir.xy(-4, -5).line([0, 4]);
        cir.xy(-3, -3).line([-2, -1, -1]);
        cir.xy(-5, -2).reverse(true);
        cir.xy(-4, -4).reverse();
        cir.xy(-4, -2).reverse();
      }
      n = n >> 1;
    }
  }

  Circuit.prototype.counterTen = function (bitCount) {
    const circuit = this;
    circuit.counter(4);
    circuit.xy(-3, 12).line([-4, 9, 3]);
    circuit.xy(-4, 2).reverse(true);
    circuit.xy(-4, 3).reverse();

    circuit.xy(-4, 0).line([-2, -11, -2]);
    circuit.xy(-5, 1).line([-2, 2, 1, 1]);
    circuit.xy(-7, 3).line([0, -1, 1]);
    circuit.xy(-5, 1).reverse(true);
    circuit.xy(-5, 2).reverse();
    circuit.xy(-7, 2).reverse(true);
    circuit.xy(-6, 2).reverse();
  }


  Circuit.prototype.counterSix = function (bitCount) {
    const circuit = this;
    circuit.counter(3);

    circuit.xy(-3, 8).line([-4, 5, 3]);
    circuit.xy(-4, 2).reverse(true);
    circuit.xy(-4, 3).reverse();

    circuit.xy(-4, 0).line([-2, -7, -2]);
    circuit.xy(-5, 1).line([-2, 2, 1, 1]);
    circuit.xy(-7, 3).line([0, -1, 1]);
    circuit.xy(-5, 1).reverse(true);
    circuit.xy(-5, 2).reverse();
    circuit.xy(-7, 2).reverse(true);
    circuit.xy(-6, 2).reverse();
  }

  Circuit.prototype.resetableCounter = function (bitCount, value = 0) {
    const circuit = this;
    circuit.flip().counter(bitCount, value);

    const gridHeight = 4;
    for (let i = 0; i < bitCount; i++) {
      const cir = circuit.xy(0, i * gridHeight);
      cir.xy(-4, 0).line([3]);
      cir.xy(-3, -3).line([0, 4, -2]);
      cir.xy(-3, -1).line([1, 1]);
      cir.xy(-1, 2).reverse(true);
      cir.xy(-1, 1).reverse();
      cir.xy(-2, -1).reverse();
      cir.xy(-2, 0).reverse();
      if (i == bitCount - 1) {
        cir.xy(3, 1).line([4]);
      } else {
        cir.xy(6, -2).line([0, 4, 1]);
        cir.xy(5, 1).line([2]);
      }
    }
  }

  Circuit.prototype.selector1 = function ({bitCount, values, start, end, inputInterval = 2, outputInterval = 2}) {
    const circuit = this;

    if (start != undefined && end != undefined) {
      values = [];
      for (let i = start; i < end; i++) {
        values.push(i);
      }
    }

    for (let i = 0; i < values.length; i++) {
      let v = values[i];
      for (let j = 0; j < bitCount; j++) {
        if (typeof(v) == "number") {
          circuit.xy(outputInterval*i, inputInterval*j).line([0, 1, -1]);
          if (v % 2 != 0) {
            circuit.xy(outputInterval*i, inputInterval*j+1).reverse();
          }
          v = v >> 1;
        } else {
          if (v[j] == null) {
            // nothing
          } else if (v[j]) {
            circuit.xy(outputInterval*i, inputInterval*j).line([0, 1, -1]);
            circuit.xy(outputInterval*i, inputInterval*j+1).reverse();
          } else {
            circuit.xy(outputInterval*i, inputInterval*j).line([0, 1, -1]);
          }
        }
      }
      circuit.xy(outputInterval*i+1, 1).line([0, inputInterval*(bitCount-1)]);
      circuit.xy(outputInterval*i+1, inputInterval*(bitCount-1)+1).reverse();
    }
  }

  Circuit.prototype.selector3 = function (length, {input, output, series}) {
    const circuit = this;

    for (let i = 0; i < series.length; i++) {
      if (!series[i].pos) {
        series[i].pos = [];
        series[i].cond = [];
      }
      for (let j = 0; j < series[i].cond.length; j++) {
        if (series[i].cond[j] == null) {
          series[i].cond[j] = [];
        } else if (typeof(series[i].cond[j]) == "string") {
          series[i].cond[j] = [series[i].cond[j]];
        }
      }
      if (series[i].opts && series[i].opts.length > 0) {
        for (let j = 1; j < series[i].opts.length; j++) {
          series[i].cond[j-1] = series[i].cond[j-1].concat(series[i].opts[j]);
        }
        series[i].opts = series[i].opts[0];
      } else {
        series[i].opts = [];
      }
    }

    let maxPosition = 0;
    for (let i = 0; i < input.length; i++) {
      const p = input[i];
      if (maxPosition < p) {
        maxPosition = p;
      }
    }
    for (let i = 0; i < output.length; i++) {
      const p = output[i];
      if (maxPosition < p) {
        maxPosition = p;
      }
    }
    for (let i = 0; i < series.length; i++) {
      for (let j = 0; j < series[i].pos.length; j++) {
        const p = series[i].pos[j];
        if (maxPosition < p) {
          maxPosition = p;
        }
      }
    }

    const lineLastIndexList = [];
    const lineStartEndPositionList = [];
    for (let i = 0; i <= maxPosition; i++) {
      lineLastIndexList.push(-1);
      lineStartEndPositionList.push({start:-1, end:-1});
    }
    for (let i = 0; i < series.length; i++) {
      for (let j = 0; j < series[i].pos.length; j++) {
        const p = series[i].pos[j];
        lineLastIndexList[p] = i;
      }
    }
    for (let i = 0; i < output.length; i++) {
      const p = output[i];
      lineLastIndexList[p] = series.length;
    }
    for (let i = 0; i < input.length; i++) {
      const p = input[i];
      lineStartEndPositionList[p].start = 0;
    }

    const notStatus = [];
    for (let i = 0; i < maxPosition; i++) {
      notStatus.push(false);
    }

    let elemPos = 0;
    for (let seriesIdx = 0; seriesIdx < series.length; seriesIdx++) {
      const elem = series[seriesIdx];

      if (elem.endOut != undefined) {
        notStatus[elem.endOut] = false;
        const prev = lineStartEndPositionList[elem.endOut];
        lineStartEndPositionList[elem.endOut] = {start:-1, end:-1, prev};
      }

      let outIdx = -1;
      for (let i = 0; i < elem.cond.length; i++) {
        if (elem.cond[i].includes("out")) {
          outIdx = i;
          break;
        }
      }
      if (outIdx < 0) {
        if (elem.skip == undefined) {
          elem.skip = 0;
        }
        elemPos += elem.skip;
        continue;
      }

      let inIdxs = [];
      for (let i = 0; i < elem.cond.length; i++) {
        if (elem.cond[i].includes("in0") || elem.cond[i].includes("in1")) {
          inIdxs.push(i);
        }
      }

      const outPos = elem.pos[outIdx];

      let existsUpper = false;
      let existsLower = false;
      let posMin = outPos;
      let posMax = outPos;

      for (let i = 0; i < inIdxs.length; i++) {
        const pos = elem.pos[inIdxs[i]];
        if (posMin > pos) {
          existsUpper = true;
          posMin = pos;
        } else if (posMax < pos) {
          existsLower = true;
          posMax = pos;
        }
      }

      let isOutUpper = elem.cond[outIdx].includes("upper");
      if (elem.cond[outIdx].includes("lower")) {
        isOutUpper = false;
      } else if (!existsLower) {
        isOutUpper = true;
      }

      let outNotPosition = null;
      for (let i = 0; i < elem.cond[outIdx].length; i++) {
        if (elem.cond[outIdx][i].startsWith("notPos")) {
          outNotPosition = parseInt(elem.cond[outIdx][i].substring(6));
        }
      }
      if (outNotPosition == null) {
        if (lineStartEndPositionList[outPos].start < 0) {
          outNotPosition = 0;
        } else {
          outNotPosition = 1;
        }
      }
      if (isOutUpper) {
        outNotPosition = -outNotPosition;
      }

      if (inIdxs.length == 1) {
        if (existsUpper) {
          if (elem.skip == undefined) {
            elem.skip = 1;
          }
        } else {
          elemPos--;
        }
      }

      for (const isUpperSide of [true, false]) {
        let upperSideFlagSign;
        if (isUpperSide) {
          upperSideFlagSign = +1;
        } else {
          upperSideFlagSign = -1;
        }
        for (let i = 0; i < inIdxs.length; i++) {
          const pos = elem.pos[inIdxs[i]];
          if ((pos >= elem.pos[outIdx]) == isUpperSide) continue;
          if (pos == posMin && isUpperSide || pos == posMax && !isUpperSide) {
            let len;
            if (isUpperSide) {
              len = elem.pos[outIdx] - posMin;
            } else {
              len = posMax - elem.pos[outIdx];
            }
            if (elem.opts.includes("reverse") == isUpperSide) {
              if (isOutUpper == isUpperSide) {
                circuit.xy(elemPos + 1, pos).line([0, (len - 1) * upperSideFlagSign]);
              } else {
                circuit.xy(elemPos + 1, pos).line([0, (len + 1) * upperSideFlagSign, +upperSideFlagSign]);
              }
            } else {
              if (isOutUpper == isUpperSide) {
                circuit.xy(elemPos + 0, pos).line([0, (len - 1) * upperSideFlagSign]);
              } else {
                circuit.xy(elemPos + 0, pos).line([0, (len + 1) * upperSideFlagSign, -upperSideFlagSign]);
              }
            }
            if (inIdxs.length > 1) {
              if (notStatus[pos] != elem.cond[inIdxs[i]].includes("in1")) {
                if (elem.opts.includes("reverse") == isUpperSide) {
                  circuit.xy(elemPos + 1, pos).reverse();
                } else {
                  circuit.xy(elemPos + 0, pos).reverse();
                }
                notStatus[pos] = elem.cond[inIdxs[i]].includes("in1");
              }
            } else {
              if (notStatus[pos] == elem.cond[inIdxs[i]].includes("in1")) {
                if (elem.opts.includes("reverse") == isUpperSide) {
                  circuit.xy(elemPos + 1, pos).reverse();
                } else {
                  circuit.xy(elemPos + 0, pos).reverse();
                }
                notStatus[pos] = !elem.cond[inIdxs[i]].includes("in1");
              }
            }
            if (elem.opts.includes("reverse") == isUpperSide) {
              if (lineStartEndPositionList[pos].end < elemPos + 1) {
                lineStartEndPositionList[pos].end = elemPos + 1;
              }
            } else {
              if (lineStartEndPositionList[pos].end < elemPos + 0) {
                lineStartEndPositionList[pos].end = elemPos + 0;
              }
            }
          } else {
            if (elem.opts.includes("reverse") == isUpperSide) {
              circuit.xy(elemPos + 0, pos).line([0, 1, -1]);
            } else {
              circuit.xy(elemPos + 1, pos).line([0, 1, +1]);
            }
            if (notStatus[pos] != elem.cond[inIdxs[i]].includes("in1")) {
              if (elem.opts.includes("reverse") == isUpperSide) {
                circuit.xy(elemPos + 0, pos).reverse();
              } else {
                circuit.xy(elemPos + 1, pos).reverse();
              }
              notStatus[pos] = elem.cond[inIdxs[i]].includes("in1");
            }
            if (elem.opts.includes("reverse") == isUpperSide) {
              if (lineStartEndPositionList[pos].end < elemPos + 0) {
                lineStartEndPositionList[pos].end = elemPos + 0;
              }
            } else {
              if (lineStartEndPositionList[pos].end < elemPos + 1) {
                lineStartEndPositionList[pos].end = elemPos + 1;
              }
            }
          }
        }
      }

      if (inIdxs.length > 1) {
        if (elem.opts.includes("reverse") == isOutUpper) {
          circuit.xy(elemPos + 1, outPos + outNotPosition).reverse();
        } else {
          circuit.xy(elemPos + 0, outPos + outNotPosition).reverse();
        }
      }
      let isOutUpperSignFlag;
      if (isOutUpper) {
        isOutUpperSignFlag = +1;
      } else {
        isOutUpperSignFlag = -1;
      }
      if (elem.opts.includes("reverse") == isOutUpper) {
        circuit.xy(elemPos + 1, outPos - isOutUpperSignFlag).line([0, isOutUpperSignFlag]);
        if (lineStartEndPositionList[outPos].start < 0) {
          lineStartEndPositionList[outPos].start = elemPos + 1;
        }
      } else {
        circuit.xy(elemPos + 0, outPos - isOutUpperSignFlag).line([0, isOutUpperSignFlag]);
        if (lineStartEndPositionList[outPos].start < 0) {
          lineStartEndPositionList[outPos].start = elemPos + 0;
        }
      }

      if (elem.skip == undefined) {
        if (inIdxs.length > 0) {
          elem.skip = 2;
        } else {
          elem.skip = 0;
        }
      }
      elemPos += elem.skip;
    } // for (let seriesIdx = 0; seriesIdx < series.length; seriesIdx++)

    elemPos--;
    if (elemPos > length) {
      throw "length shortage";
    }
    for (let i = 0; i < output.length; i++) {
      const p = output[i];
      lineStartEndPositionList[p].end = length;
    }

    for (let i = 0; i < lineStartEndPositionList.length; i++) {
      writeHorizontalLine(lineStartEndPositionList[i]);
      function writeHorizontalLine(posInfo) {
        if (posInfo.start >= 0 && posInfo.end >= 0) {
          circuit.xy(posInfo.start, i).line([posInfo.end - posInfo.start]);
        }
        if (posInfo.prev) {
          writeHorizontalLine(posInfo.prev);
        }
      }
    }
  }
});

