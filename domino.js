
const circuitModules = [];

function cellularAutomatonUI(cellularAutomatonId, worldWidth, worldHeight, initialScale, initialSpeed, uiControls, circuitWriter) {
  cellularAutomatonUI2({cellularAutomatonId, worldWidth, worldHeight, initialScale, initialSpeed, uiControls, circuitWriter});
}

function cellularAutomatonUI2({
  cellularAutomatonId,
  worldWidth = 1, worldHeight = 1,
  initialScale = 1, initialSpeed = 1,
  initialPosition = null,
  uiControls,
  circuitWriter,
}) {
  const cellularAutomatonElement = document.getElementById(cellularAutomatonId);

  const wrapperElement = document.createElement("div");
  wrapperElement.className = "world-wrapper";
  cellularAutomatonElement.insertAdjacentElement("beforeend", wrapperElement);

  const worldElement = document.createElement("div");
  worldElement.className = "world";
  wrapperElement.insertAdjacentElement("beforeend", worldElement);

  let counterElement = undefined;
  let speedButtons = [];

  class CellularAutomatonUI {

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // ##   ##   ## ##   ### ##   ### ###  ####     
  //  ## ##   ##   ##   ##  ##   ##  ##   ##      
  // # ### #  ##   ##   ##  ##   ##       ##      
  // ## # ##  ##   ##   ##  ##   ## ##    ##      
  // ##   ##  ##   ##   ##  ##   ##       ##      
  // ##   ##  ##   ##   ##  ##   ##  ##   ##  ##  
  // ##   ##   ## ##   ### ##   ### ###  ### ###  
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  class WorldModel {
    constructor(lineCount, colCount) {
      this.lineCount = lineCount;
      this.colCount = colCount;
      this.size = lineCount * colCount;
      this.baseX = 0;
      this.baseY = 2;
      this.counter = 0;
      this.reset();
    }
    reset() {
      this.counter = 0;
      this.nodes = new Array(this.lineCount * this.colCount);
      this.queue = new Array();
      this.dirtyQueue = new Array();
      for (var i = 0; i < this.lineCount; i++) {
        for (var j = 0; j < this.colCount; j++) {
          const idx = i * this.colCount + j;
          const node = new NodeModel(idx);
          this.nodes[idx] = node;
        }
      }
    }
    insertLinesUpper(count) {
      const lineCount = this.lineCount + count;
      const colCount = this.colCount;
      const size = lineCount * colCount;
      const nodes = new Array(lineCount * colCount);
      const delta = count * colCount;
      for (var i = 0; i < this.lineCount; i++) {
        for (var j = 0; j < this.colCount; j++) {
          const idx = i * this.colCount + j;
          const idx2 = (count + i) * colCount + j;
          const node = this.nodes[idx];
          node.nodeIndex += delta;
          if (node.src1 > 0) node.src1 += delta;
          if (node.src2 > 0) node.src2 += delta;
          if (node.dst1 > 0) node.dst1 += delta;
          if (node.dst2 > 0) node.dst2 += delta;
          nodes[idx2] = node;
        }
      }
      for (var i = 0; i < count; i++) {
        for (var j = 0; j < colCount; j++) {
          const idx2 = i * colCount + j;
          nodes[idx2] = new NodeModel(idx2);
        }
      }
      this.lineCount = lineCount;
      this.colCount = colCount;
      this.size = size;
      this.nodes = nodes;
      this.baseY += count;
    }
    insertLinesLower(count) {
      const lineCount = this.lineCount + count;
      const colCount = this.colCount;
      const size = lineCount * colCount;
      const nodes = new Array(lineCount * colCount);
      for (var i = 0; i < this.lineCount; i++) {
        for (var j = 0; j < this.colCount; j++) {
          const idx = i * this.colCount + j;
          const idx2 = i * colCount + j;
          const node = this.nodes[idx];
          nodes[idx2] = node;
        }
      }
      for (var i = 0; i < count; i++) {
        for (var j = 0; j < colCount; j++) {
          const idx2 = (this.lineCount + i) * colCount + j;
          nodes[idx2] = new NodeModel(idx2);
        }
      }
      this.lineCount = lineCount;
      this.colCount = colCount;
      this.size = size;
      this.nodes = nodes;
    }
    insertColumnsLeft(count) {
      const lineCount = this.lineCount;
      const colCount = this.colCount + count;
      const size = lineCount * colCount;
      const nodes = new Array(lineCount * colCount);
      for (var i = 0; i < this.lineCount; i++) {
        for (var j = 0; j < this.colCount; j++) {
          const idx = i * this.colCount + j;
          const idx2 = i * colCount + (count + j);
          const node = this.nodes[idx];
          const delta = idx2 - idx;
          if (node.src1 > 0) node.src1 += delta;
          if (node.src2 > 0) node.src2 += (node.src2 < node.nodeIndex ? delta - count : delta + count);
          if (node.dst1 > 0) node.dst1 += delta;
          if (node.dst2 > 0) node.dst2 += (node.dst2 < node.nodeIndex ? delta - count : delta + count);
          node.nodeIndex += delta;
          nodes[idx2] = node;
        }
      }
      for (var i = 0; i < lineCount; i++) {
        for (var j = 0; j < count; j++) {
          const idx2 = i * colCount + j;
          nodes[idx2] = new NodeModel(idx2);
        }
      }
      this.lineCount = lineCount;
      this.colCount = colCount;
      this.size = size;
      this.nodes = nodes;
      this.baseX += count;
    }
    insertColumnsRight(count) {
      const lineCount = this.lineCount;
      const colCount = this.colCount + count;
      const size = lineCount * colCount;
      const nodes = new Array(lineCount * colCount);
      for (var i = 0; i < this.lineCount; i++) {
        for (var j = 0; j < this.colCount; j++) {
          const idx = i * this.colCount + j;
          const idx2 = i * colCount + j;
          const node = this.nodes[idx];
          const delta = idx2 - idx;
          if (node.src1 > 0) node.src1 += delta;
          if (node.src2 > 0) node.src2 += (node.src2 < node.nodeIndex ? delta - count : delta + count);
          if (node.dst1 > 0) node.dst1 += delta;
          if (node.dst2 > 0) node.dst2 += (node.dst2 < node.nodeIndex ? delta - count : delta + count);
          node.nodeIndex += delta;
          nodes[idx2] = node;
        }
      }
      for (var i = 0; i < lineCount; i++) {
        for (var j = 0; j < count; j++) {
          const idx2 = i * colCount + (this.colCount + j);
          nodes[idx2] = new NodeModel(idx2);
        }
      }
      this.lineCount = lineCount;
      this.colCount = colCount;
      this.size = size;
      this.nodes = nodes;
    }
    getNode(nodeIndex) {
      return this.nodes[nodeIndex];
    }
    getNode2(nodeIndex) {
      var idx = nodeIndex;
      if (idx < 0) {
        idx += this.size;
      } else if (idx >= this.size) {
        idx -= this.size;
      }
      return this.nodes[idx];
    }
    isQueueEmpty() {
      if (this.queue.length == 0)
        return true;
      else
        return false;
    }
    enqueueExecution(node) {
      if (node.queued) return;
      node.queued = true;
      this.queue.push(node);
    }
    enqueueDirty(node) {
      if (node.dirty) return;
      node.dirty = true;
      this.dirtyQueue.push(node);
    }
    step() {
      const queue = this.queue;
      this.queue = new Array();
      for (const node of queue) {
        node.queued = false;
      }
      for (const node of queue) {
        node.step1(this);
      }
      for (const node of queue) {
        node.step2(this);
      }
      this.counter++;
    }
    fetchDirtyNodes() {
      const dirtyQueue = this.dirtyQueue;
      this.dirtyQueue = new Array();
      const dirtyQueue2 = new Array();
      for (const node of dirtyQueue) {
        node.dirty = false;
        if (node.statusH != node.statusH3 || node.statusV != node.statusV3 || node.reverse != node.reverse3) {
          dirtyQueue2.push(node);
          node.statusH3 = node.statusH;
          node.statusV3 = node.statusV;
          node.reverse3 = node.reverse;
        }
      }
      return dirtyQueue2;
    }

    _throwIllegalPosition(e) {
      console.log(e.stack);
    }

    setText(x, y, text) {
      if (x < 0 || x >= this.colCount) throw "Illegal Position";
      if (y < 0 || y >= this.lineCount) throw "Illegal Position";
      const idx = y * this.colCount + x;
      const node = this.nodes[idx];
      node.text = text;
      node.infos.push(new Error("Cell Info Text:").stack);
      this.enqueueDirty(node);
    }

    setReverse(x, y, value=null) {
      if (x < 0 || x >= this.colCount) throw "Illegal Position";
      if (y < 0 || y >= this.lineCount) throw "Illegal Position";
      const idx = y * this.colCount + x;
      const node = this.nodes[idx];
      if (node.cross) {
        this._throwIllegalPosition(new Error("Overwrite!"));
        return;
      }
      if (node.sofaA) {
        this._throwIllegalPosition(new Error("Overwrite!"));
        return;
      }
      node.reverse = !node.reverse;
      if (value != null) this.setValue(x, y, value);
      node.infos.push(new Error("Cell Info Reverse:").stack);
      this.enqueueExecution(node);
      this.enqueueDirty(node);
    }

    setCross(x, y) {
      if (x < 0 || x >= this.colCount) throw "Illegal Position";
      if (y < 0 || y >= this.lineCount) throw "Illegal Position";
      const idx = y * this.colCount + x;
      const node = this.nodes[idx];
      if (node.src1 == 0 || node.src2 == 0 || node.dst1 == 0 || node.dst2 == 0) {
        return;
      }
      if (node.reverse) {
        this._throwIllegalPosition(new Error("Overwrite!"));
        return;
      }
      if (node.sofaA) {
        this._throwIllegalPosition(new Error("Overwrite!"));
        return;
      }
      node.cross = true;
      node.infos.push(new Error("Cell Info Cross:").stack);
      this.enqueueExecution(node);
      this.enqueueDirty(node);
    }

    setValue(x, y, value) {
      if (x < 0 || x >= this.colCount) throw "Illegal Position";
      if (y < 0 || y >= this.lineCount) throw "Illegal Position";
      const idx = y * this.colCount + x;
      const node = this.nodes[idx];
      node.statusH = value;
      node.statusV = value;
      node.statusH2 = value;
      node.statusV2 = value;
      node.infos.push(new Error("Cell Info Value:").stack);
      this.enqueueExecution(node);
      this.enqueueDirty(node);
    }

    setButton(x, y, size) {
      if (x < 0 || x >= this.colCount) throw "Illegal Position";
      if (y < 0 || y >= this.lineCount) throw "Illegal Position";
      const idx = y * this.colCount + x;
      const node = this.nodes[idx];
      if (node.cross) {
        this._throwIllegalPosition(new Error("Overwrite!"));
        return;
      }
      node.button = size;
      node.infos.push(new Error("Cell Info Button:").stack);
      this.enqueueExecution(node);
      this.enqueueDirty(node);
    }

    setSofa(x, y) {
      if (x < 0 || x >= this.colCount) throw "Illegal Position";
      if (y < 0 || y >= this.lineCount) throw "Illegal Position";
      const idx = y * this.colCount + x;
      const node = this.nodes[idx];
      if (node.cross) {
        this._throwIllegalPosition(new Error("Overwrite!"));
        return;
      }
      if (node.reverse) {
        this._throwIllegalPosition(new Error("Overwrite!"));
        return;
      }
      node.sofaA = true;
      node.infos.push(new Error("Cell Info Sofa:").stack);
      this.enqueueExecution(node);
      this.enqueueDirty(node);
    }

    clickButton(node) {
      node.reverse = !node.reverse;
      this.enqueueExecution(node);
      this.enqueueDirty(node);
    }

    drawRight(x, y) {
      if (x < 0 || x + 1 >= this.colCount) throw "Illegal Position";
      if (y < 0 || y >= this.lineCount) throw "Illegal Position";
      const idx1 = y * this.colCount + x;
      const idx2 = y * this.colCount + x + 1;
      const node1 = this.nodes[idx1];
      const node2 = this.nodes[idx2];
      if (node1.dst1 != 0) {
        this._throwIllegalPosition(new Error("Overwrite!"));
        return;
      }
      if (node2.src1 != 0) {
        this._throwIllegalPosition(new Error("Overwrite!"));
        return;
      }
      node1.dst1 = idx2;
      node2.src1 = idx1;
      node1.infos.push(new Error("Cell Info Right:").stack);
      node2.infos.push(new Error("Cell Info Right:").stack);
      this.enqueueExecution(node1);
      this.enqueueExecution(node2);
      this.enqueueDirty(node1);
      this.enqueueDirty(node2);
    }
    drawLeft(x, y) {
      if (x - 1 < 0 || x >= this.colCount) throw "Illegal Position";
      if (y < 0 || y >= this.lineCount) throw "Illegal Position";
      const idx1 = y * this.colCount + x;
      const idx2 = y * this.colCount + x - 1;
      const node1 = this.nodes[idx1];
      const node2 = this.nodes[idx2];
      if (node1.dst1 != 0) {
        this._throwIllegalPosition(new Error("Overwrite!"));
        return;
      }
      if (node2.src1 != 0) {
        this._throwIllegalPosition(new Error("Overwrite!"));
        return;
      }
      node1.dst1 = idx2;
      node2.src1 = idx1;
      node1.infos.push(new Error("Cell Info Left:").stack);
      node2.infos.push(new Error("Cell Info Left:").stack);
      this.enqueueExecution(node1);
      this.enqueueExecution(node2);
      this.enqueueDirty(node1);
      this.enqueueDirty(node2);
    }
    drawLower(x, y) {
      if (x < 0 || x >= this.colCount) throw "Illegal Position";
      if (y < 0 || y + 1 >= this.lineCount) throw "Illegal Position";
      const idx1 = y * this.colCount + x;
      const idx2 = (y + 1) * this.colCount + x;
      const node1 = this.nodes[idx1];
      const node2 = this.nodes[idx2];
      if (node1.dst2 != 0) {
        this._throwIllegalPosition(new Error("Overwrite!"));
        return;
      }
      if (node2.src2 != 0) {
        this._throwIllegalPosition(new Error("Overwrite!"));
        return;
      }
      node1.dst2 = idx2;
      node2.src2 = idx1;
      node1.infos.push(new Error("Cell Info Lower:").stack);
      node2.infos.push(new Error("Cell Info Lower:").stack);
      this.enqueueExecution(node1);
      this.enqueueExecution(node2);
      this.enqueueDirty(node1);
      this.enqueueDirty(node2);
    }
    drawUpper(x, y) {
      if (x < 0 || x >= this.colCount) throw "Illegal Position";
      if (y - 1 < 0 || y >= this.lineCount) throw "Illegal Position";
      const idx1 = y * this.colCount + x;
      const idx2 = (y - 1) * this.colCount + x;
      const node1 = this.nodes[idx1];
      const node2 = this.nodes[idx2];
      if (node1.dst2 != 0) {
        this._throwIllegalPosition(new Error("Overwrite!"));
        return;
      }
      if (node2.src2 != 0) {
        this._throwIllegalPosition(new Error("Overwrite!"));
        return;
      }
      node1.dst2 = idx2;
      node2.src2 = idx1;
      node1.infos.push(new Error("Cell Info Upper:").stack);
      node2.infos.push(new Error("Cell Info Upper:").stack);
      this.enqueueExecution(node1);
      this.enqueueExecution(node2);
      this.enqueueDirty(node1);
      this.enqueueDirty(node2);
    }
    cut(x, y) {
      if (x < 0 || x >= this.colCount) throw "Illegal Position";
      if (y < 0 || y >= this.lineCount) throw "Illegal Position";
      const idx1 = y * this.colCount + x;
      const node1 = this.nodes[idx1];
      if (node1.dst1 != 0) {
        const node2 = this.nodes[node1.dst1];
        node1.dst1 = 0;
        node2.src1 = 0;
        node2.infos.push(new Error("Cell Info Cut:").stack);
        this.enqueueExecution(node2);
        this.enqueueDirty(node2);
      }
      if (node1.dst2 != 0) {
        const node2 = this.nodes[node1.dst2];
        node1.dst2 = 0;
        node2.src2 = 0;
        node2.infos.push(new Error("Cell Info Cut:").stack);
        this.enqueueExecution(node2);
        this.enqueueDirty(node2);
      }
      node1.infos.push(new Error("Cell Info Cut:").stack);
      this.enqueueExecution(node1);
      this.enqueueDirty(node1);
    }
  }
  class NodeModel {
    constructor(nodeIndex) {
      this.nodeIndex = nodeIndex;
      this.src1 = 0;
      this.src2 = 0;
      this.dst1 = 0;
      this.dst2 = 0;
      this.reverse = false;
      this.reverse3 = false;
      this.cross = false;
      this.button = 0;
      this.sofaA = false;
      this.sofaB = false;
      this.statusH = false;
      this.statusV = false;
      this.statusH2 = false;
      this.statusV2 = false;
      this.statusH3 = null;
      this.statusV3 = null;
      this.queued = false;
      this.dirty = false;
      this.radius = null;
      this.text = null;
      this.infos = [];
    }
    step1(worldModel) {
      if (this.cross) {
        const resultH = worldModel.getNode(this.src1).statusH;
        if (this.statusH != resultH) {
          this.statusH2 = resultH;
          worldModel.enqueueExecution(worldModel.getNode(this.dst1));
          worldModel.enqueueDirty(this);
        }
        const resultV = worldModel.getNode(this.src2).statusV;
        if (this.statusV != resultV) {
          this.statusV2 = resultV;
          worldModel.enqueueExecution(worldModel.getNode(this.dst2));
          worldModel.enqueueDirty(this);
        }
      } else {
        var result = false;
        if (worldModel.getNode(this.src1).statusH) {
          result = true;
        } else if (worldModel.getNode(this.src2).statusV) {
          result = true;
        }
        if (this.sofaA) {
          if (!result && this.statusH) {
            if (this.sofaB) {
              this.sofaB = false;
            } else {
              this.sofaB = true;
              result = true;
              worldModel.enqueueExecution(this);
            }
          } else {
            this.sofaB = false;
          }
        } else if (this.button) {
          if (this.reverse) {
            if (result) {
              result = true;
              this.reverse = false;
              worldModel.enqueueDirty(this);
            } else {
              result = true;
            }
          }
        } else {
          if (this.reverse) {
            result = !result;
          }
        }
        if (this.statusH != result) {
          this.statusH2 = result;
          this.statusV2 = result;
          worldModel.enqueueExecution(worldModel.getNode(this.dst1));
          worldModel.enqueueExecution(worldModel.getNode(this.dst2));
          worldModel.enqueueDirty(this);
        }
      }
    }
    step2(worldModel) {
      this.statusH = this.statusH2;
      this.statusV = this.statusV2;
    }
    calcRadius() {
      let s = "";

      if (this.src1 > 0 && this.src1 < this.nodeIndex) {
        s += "left-in.";
      } else if (this.dst1 > 0 && this.dst1 < this.nodeIndex) {
        s += "left-out.";
      }
      if (this.src2 > 0 && this.src2 < this.nodeIndex) {
        s += "top-in.";
      } else if (this.dst2 > 0 && this.dst2 < this.nodeIndex) {
        s += "top-out.";
      }
      if (this.src1 > this.nodeIndex) {
        s += "right-in.";
      } else if (this.dst1 > this.nodeIndex) {
        s += "right-out.";
      }
      if (this.src2 > this.nodeIndex) {
        s += "bottom-in.";
      } else if (this.dst2 > this.nodeIndex) {
        s += "bottom-out.";
      }
      switch (s) {
        case "left-in."                     : return "right";
        case "left-in.top-in.right-out."    : return null;
        case "left-in.top-in.bottom-out."   : return null;
        case "left-in.top-out."             : return "bottom-right";
        case "left-in.top-out.right-out."   : return null;
        case "left-in.top-out.bottom-in."   : return null;
        case "left-in.right-out.bottom-in." : return null;
        case "left-in.right-out.bottom-out.": return null;
        case "left-in.bottom-out."          : return "top-right";
        case "left-out."                    : return null;
        case "left-out.top-in."             : return "bottom-right";
        case "left-out.top-in.right-in."    : return null;
        case "left-out.top-in.bottom-out."  : return null;
        case "left-out.top-out.right-in."   : return null;
        case "left-out.top-out.bottom-out." : return null;
        case "left-out.right-in.bottom-in." : return null;
        case "left-out.right-in.bottom-out.": return null;
        case "left-out.bottom-in."          : return "top-right";
        case "top-in."                      : return "bottom";
        case "top-in.right-in.bottom-out."  : return null;
        case "top-in.right-out."            : return "bottom-left";
        case "top-in.right-out.bottom-out." : return null;
        case "top-out."                     : return null;
        case "top-out.right-out.bottom-in." : return null;
        case "top-out.right-in."            : return "bottom-left";
        case "top-out.right-in.bottom-in."  : return null;
        case "right-in."                    : return "left";
        case "right-in.bottom-out."         : return "top-left";
        case "right-out."                   : return null;
        case "right-out.bottom-in."         : return "top-left";
        case "bottom-in."                   : return "top";
        case "bottom-out."                  : return null;
      }
      return null;
    }
    getRadiusClassNameForView() {
      if (this.radius == null) {
        const r = this.calcRadius();
        if (r == null) {
          this.radius = "";
        } else {
          this.radius = " radius-" + r;
        }
      }
      return this.radius;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // ### ###    ####   ### ###  ##   ##  
  //  ##  ##     ##     ##  ##  ##   ##  
  //  ##  ##     ##     ##      ##   ##  
  //  ##  ##     ##     ## ##   ## # ##  
  //  ### ##     ##     ##      # ### #  
  //   ###       ##     ##  ##   ## ##   
  //    ##      ####   ### ###  ##   ##  
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  class WorldView {
    constructor(worldModel) {
      this.worldModel = worldModel;
    }
    buildDOMElements(worldElement) {
      worldElement.replaceChildren();
      for (var i = 2; i < this.worldModel.lineCount; i++) {
        const row1Div = document.createElement("div");
        row1Div.className = "world-line1";
        for (var j = 0; j < this.worldModel.colCount; j++) {
          const nodeIndex = i * this.worldModel.colCount + j;
          const nodeDiv = document.createElement("div");
          nodeDiv.className = this.defaultNodeClass();
          nodeDiv.dataset.nodeIndex = nodeIndex;
          nodeDiv.addEventListener("click", (event) => {
            this.printNodeInfo(nodeIndex);
          });
          row1Div.insertAdjacentElement("beforeend", nodeDiv);
          const horiDiv = document.createElement("div");
          horiDiv.className = this.defaultHoriClass();
          row1Div.insertAdjacentElement("beforeend", horiDiv);
        }
        worldElement.insertAdjacentElement("beforeend", row1Div);

        const row2Div = document.createElement("div");
        row2Div.className = "world-line2";
        for (var j = 0; j < this.worldModel.colCount; j++) {
          const vertDiv = document.createElement("div");
          vertDiv.className = this.defaultVertClass();
          row2Div.insertAdjacentElement("beforeend", vertDiv);
          const spaceDiv = document.createElement("div");
          spaceDiv.className = this.defaultSpaceClass();
          row2Div.insertAdjacentElement("beforeend", spaceDiv);
        }
        worldElement.insertAdjacentElement("beforeend", row2Div);
      }
    }
    refreshDOMElements1(worldElement, counterElement) {
      const dirtyQueue = this.worldModel.fetchDirtyNodes();
      this._refreshDOMElementsSub1(worldElement, dirtyQueue);
      this._refreshDOMElementsSub2(worldElement, dirtyQueue);
      if (counterElement) {
        counterElement.innerText = this.worldModel.counter;
      }
    }
    refreshDOMElements2(worldElement, counterElement) {
      const dirtyQueue = this.worldModel.fetchDirtyNodes();
      this._refreshDOMElementsSub2(worldElement, dirtyQueue);
      if (counterElement) {
        counterElement.innerText = this.worldModel.counter;
      }
    }
    _refreshDOMElementsSub1(worldElement, dirtyQueue) {
      for (const node of dirtyQueue) {
        const i = Math.floor(node.nodeIndex / this.worldModel.colCount) - 2;
        const j = node.nodeIndex % this.worldModel.colCount;
        const element = worldElement.children[2 * i].children[2 * j];
        element.replaceChildren();
        if (node.text != null) {
          const textElement = document.createElement("div");
          textElement.className = "text";
          textElement.innerText = node.text;
          element.insertAdjacentElement("beforeend", textElement);
        }
        if (node.button > 0) {
          const buttonElement = document.createElement("div");
          buttonElement.className = "button button-size-" + node.button;
          buttonElement.addEventListener("click", (event) => {
            this.worldModel.clickButton(node);
            this.refreshDOMElements2(worldElement, null);
            setSpeed(speed);
          });
          element.insertAdjacentElement("beforeend", buttonElement);
        }
      }
    }
    _refreshDOMElementsSub2(worldElement, dirtyQueue) {
      for (const node of dirtyQueue) {
        if (true) {
          const i = Math.floor(node.nodeIndex / this.worldModel.colCount) - 2;
          const j = node.nodeIndex % this.worldModel.colCount;
          const element = worldElement.children[2 * i].children[2 * j];
          element.className = this.calcNodeClass(node);
        }
        if (viewScale >= 55) {
          // nop
        } else if (node.dst1 == node.nodeIndex + 1) {
          const i = Math.floor(node.nodeIndex / this.worldModel.colCount) - 2;
          const j = node.nodeIndex % this.worldModel.colCount;
          const element = worldElement.children[2 * i].children[2 * j + 1];
          element.className = this.calcHoriClass(node, i, j);
        } else if (node.dst1 == node.nodeIndex - 1) {
          const i = Math.floor(node.dst1 / this.worldModel.colCount) - 2;
          const j = node.dst1 % this.worldModel.colCount;
          const element = worldElement.children[2 * i].children[2 * j + 1];
          element.className = this.calcHoriClass(node, i, j);
        }
        if (viewScale >= 55) {
          // nop
        } else if (node.dst2 == node.nodeIndex + this.worldModel.colCount) {
          const i = Math.floor(node.nodeIndex / this.worldModel.colCount) - 2;
          const j = node.nodeIndex % this.worldModel.colCount;
          const element = worldElement.children[2 * i + 1].children[2 * j];
          element.className = this.calcVertClass(node, i, j);
        } else if (node.dst2 == node.nodeIndex - this.worldModel.colCount) {
          const i = Math.floor(node.dst2 / this.worldModel.colCount) - 2;
          const j = node.dst2 % this.worldModel.colCount;
          const element = worldElement.children[2 * i + 1].children[2 * j];
          element.className = this.calcVertClass(node, i, j);
        }
      }
    }
    defaultNodeClass() {
      return "node";
    }
    calcNodeClass(node) {
      var cls = "node";
      if (!node.reverse && node.src1 == 0 && node.src2 == 0 && node.dst1 == 0 && node.dst2 == 0) {
        return cls;
      }
      if (node.cross) {
        cls += " cross";
        return cls;
      }
      if (node.src1 != 0 && node.src2 != 0) {
        cls += " cross";
      } else if (node.dst1 != 0 && node.dst2 != 0) {
        cls += " cross";
      } else if (node.sofaA) {
        cls += " cross";
      }
      if (node.reverse) {
        cls += " reverse";
      } else if (node.statusH) {
        cls += " on";
      } else {
        cls += " off";
      }
      cls += node.getRadiusClassNameForView();
      return cls;
    }
    defaultHoriClass() {
      return "hori";
    }
    calcHoriClass(node, x, y) {
      var cls = "hori";
      if (node.statusH) {
        cls += " on-hori";
      } else {
        cls += " off-hori";
      }
      if (node.dst1 > node.nodeIndex) {
        cls += " to-right"
      } else {
        cls += " to-left"
      }
      return cls;
    }
    defaultVertClass() {
      return "vert";
    }
    calcVertClass(node, x, y) {
      var cls = "vert";
      if (node.statusV) {
        cls += " on-vert";
      } else {
        cls += " off-vert";
      }
      if (node.dst2 > node.nodeIndex) {
        cls += " to-bottom"
      } else {
        cls += " to-top"
      }
      return cls;
    }
    defaultSpaceClass() {
      return "space";
    }
    getCellSize(worldElement) {
      const nodeElement = worldElement.children[0].children[0];
      const horiElement = worldElement.children[0].children[1];
      return nodeElement.offsetWidth + horiElement.offsetWidth;
    }
    refreshDOMSize(worldElement) {
      const width = (this.getCellSize(worldElement)) * this.colCount;
      worldElement.style.width = width + "px";
    }

    printNodeInfo(nodeIndex) {
      const node = this.worldModel.getNode(nodeIndex);
      const i = Math.floor(node.nodeIndex / this.worldModel.colCount) - this.worldModel.baseY;
      const j = node.nodeIndex % this.worldModel.colCount - this.worldModel.baseX;
      console.log("{x:" + j + ", y:" + i + "}");
      for (const info of node.infos) {
        console.log(info);
      }
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  //  ## ##     ####   ### ##    ## ##   ##  ###    ####   #### ##  
  // ##   ##     ##     ##  ##  ##   ##  ##   ##     ##    # ## ##  
  // ##          ##     ##  ##  ##       ##   ##     ##      ##     
  // ##          ##     ## ##   ##       ##   ##     ##      ##     
  // ##          ##     ## ##   ##       ##   ##     ##      ##     
  // ##   ##     ##     ##  ##  ##   ##  ##   ##     ##      ##     
  //  ## ##     ####   #### ##   ## ##    ## ##     ####    ####    
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  class Circuit {
    constructor(worldModel) {
      this.worldModel = worldModel;
      this.offsetX = 0;
      this.offsetY = 0;
      this.offsetDirection = 0;
      this.flip = false;
    }

    xy(x, y) {
      return this.sub({x: x, y: y});
    }
    rot(rotation) {
      return this.sub({x: 0, y: 0}, rotation, false);
    }
    flip() {
      return this.sub({x: 0, y: 0}, 0, true);
    }

    sub(xy, direction = 0, flip = false) {
      const {x, y} = this._convertToRaw(xy);

      if (!this.flip && !flip) {
        direction = (this.offsetDirection + direction) % 4;
        if (direction < 0) {
          direction += 4;
        }
        flip = false;
      } else if (!this.flip && flip) {
        direction = -(this.offsetDirection + direction) % 4;
        if (direction < 0) {
          direction += 4;
        }
        flip = true;
      } else if (this.flip && !flip) {
        direction = (this.offsetDirection + direction) % 4;
        if (direction < 0) {
          direction += 4;
        }
        flip = true;
      } else if (this.flip && flip) {
        direction = -(this.offsetDirection + direction) % 4;
        if (direction < 0) {
          direction += 4;
        }
        flip = false;
      }

      const ret = new Circuit(this.worldModel);
      ret.offsetX = x;
      ret.offsetY = y;
      ret.offsetDirection = direction;
      ret.flip = flip;

      return ret;
    }

    _convertToRaw({x, y}) {
      if (this.flip) {
        if (this.offsetDirection == 0) {
          return {x: this.offsetX - x, y: this.offsetY + y};
        } else if (this.offsetDirection == 1) {
          return {x: this.offsetX + y, y: this.offsetY + x};
        } else if (this.offsetDirection == 2) {
          return {x: this.offsetX + x, y: this.offsetY - y};
        } else if (this.offsetDirection == 3) {
          return {x: this.offsetX - y, y: this.offsetY - x};
        } else {
          throw "Illegal direction: " + this.offsetDirection;
        }
      } else {
        if (this.offsetDirection == 0) {
          return {x: this.offsetX + x, y: this.offsetY + y};
        } else if (this.offsetDirection == 1) {
          return {x: this.offsetX - y, y: this.offsetY + x};
        } else if (this.offsetDirection == 2) {
          return {x: this.offsetX - x, y: this.offsetY - y};
        } else if (this.offsetDirection == 3) {
          return {x: this.offsetX + y, y: this.offsetY - x};
        } else {
          throw "Illegal direction: " + this.offsetDirection;
        }
      }
    }

    expand(xy) {
      const m = this.worldModel;
      const {x, y} = this._convertToRaw(xy);
      if (x + m.baseX < 0) {
        m.insertColumnsLeft(-(x + m.baseX));
      } else if (x + m.baseX >= m.colCount) {
        m.insertColumnsRight(x + m.baseX - m.colCount + 1);
      }
      if (y + m.baseY < 2) {
        m.insertLinesUpper(2 - y - m.baseY);
      } else if (y + m.baseY >= m.lineCount) {
        m.insertLinesLower(y + m.baseY - m.lineCount + 1);
      }
    }

    setText(xy, text) {
      const m = this.worldModel;
      const {x, y} = this._convertToRaw(xy);
      m.setText(x + m.baseX, y + m.baseY, text);
    }

    setReverse(xy, value=null) {
      const m = this.worldModel;
      const {x, y} = this._convertToRaw(xy);
      m.setReverse(x + m.baseX, y + m.baseY, value);
    }

    setCross(xy) {
      const m = this.worldModel;
      const {x, y} = this._convertToRaw(xy);
      m.setCross(x + m.baseX, y + m.baseY);
    }

    setButton(xy, size) {
      const m = this.worldModel;
      const {x, y} = this._convertToRaw(xy);
      m.setButton(x + m.baseX, y + m.baseY, size);
    }

    setValue(xy, value) {
      const m = this.worldModel;
      const {x, y} = this._convertToRaw(xy);
      m.setValue(x + m.baseX, y + m.baseY, value);
    }

    setSofa(xy) {
      const m = this.worldModel;
      const {x, y} = this._convertToRaw(xy);
      m.setSofa(x + m.baseX, y + m.baseY);
    }

    setLine(xy, direction) {
      const m = this.worldModel;
      const {x, y} = this._convertToRaw(xy);
      direction = (this.offsetDirection + direction) % 4;
      if (direction < 0) {
        direction += 4;
      }
      if (direction == 0) {
        if (this.flip) {
          m.drawLeft(x + m.baseX, y + m.baseY);
        } else {
          m.drawRight(x + m.baseX, y + m.baseY);
        }
      } else if (direction == 1) {
        m.drawLower(x + m.baseX, y + m.baseY);
      } else if (direction == 2) {
        if (this.flip) {
          m.drawRight(x + m.baseX, y + m.baseY);
        } else {
          m.drawLeft(x + m.baseX, y + m.baseY);
        }
      } else if (direction == 3) {
        m.drawUpper(x + m.baseX, y + m.baseY);
      }
    }

    cut(xy) {
      if (xy == undefined) {
        xy = {x:0, y:0};
      }
      const m = this.worldModel;
      const {x, y} = this._convertToRaw(xy);
      m.cut(x + m.baseX, y + m.baseY);
    }
  }

  for (const mod of circuitModules) {
    mod(Circuit);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // ##  ###    ####   
  // ##   ##     ##    
  // ##   ##     ##    
  // ##   ##     ##    
  // ##   ##     ##    
  // ##   ##     ##    
  //  ## ##     ####   
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  let viewScale = initialScale;
  const viewScaleLimit = 5;

  let startFlag = false;
  let startCounter = 0;
  let speed = initialSpeed;

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // ##   ##   ## ##   ##  ###   ## ##   ### ###  
  //  ## ##   ##   ##  ##   ##  ##   ##   ##  ##  
  // # ### #  ##   ##  ##   ##  ####      ##      
  // ## # ##  ##   ##  ##   ##   #####    ## ##   
  // ##   ##  ##   ##  ##   ##      ###   ##      
  // ##   ##  ##   ##  ##   ##  ##   ##   ##  ##  
  // ##   ##   ## ##    ## ##    ## ##   ### ###  
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  (() => {
    let dragging = false;
    let moving = false;
    let dragX;
    let dragY;
    let scrollLeft;
    let scrollTop;
    wrapperElement.addEventListener("mousedown", event => {
      event.preventDefault();
      dragging = true;
      moving = false;
      dragX = event.clientX;
      dragY = event.clientY;
      scrollLeft = wrapperElement.scrollLeft;
      scrollTop = wrapperElement.scrollTop;
    });
    wrapperElement.addEventListener("click", event => {
      if (moving) {
        return false;
      }
    });
    document.addEventListener("mousemove", event => {
      if (dragging) {
        event.preventDefault();
        let mx = dragX - event.clientX;
        let my = dragY - event.clientY;
        if (mx == 0 && my == 0) return;
        moving = true;
        wrapperElement.scrollLeft = scrollLeft + mx;
        wrapperElement.scrollTop = scrollTop + my;
      }
    });
    document.addEventListener("mouseup", event => {
      dragging = false;
      moving = false;
      return false;
    });

    wrapperElement.addEventListener("mousewheel", event => {
      if (event.ctrlKey) {
        event.preventDefault();
        if (event.deltaY > 0) {
          // 縮小
          changeZoom(true, event.clientX, event.clientY);
        } else if (event.deltaY < 0) {
          // 拡大
          changeZoom(false, event.clientX, event.clientY);
        }
        return false;
      }
    });
  })();

  ////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // ### ###  ##  ##   ### ###   ## ##   ##  ###  #### ##  ### ###  
  //  ##  ##  ### ##    ##  ##  ##   ##  ##   ##  # ## ##   ##  ##  
  //  ##       ###      ##      ##       ##   ##    ##      ##      
  //  ## ##     ###     ## ##   ##       ##   ##    ##      ## ##   
  //  ##         ###    ##      ##       ##   ##    ##      ##      
  //  ##  ##  ##  ###   ##  ##  ##   ##  ##   ##    ##      ##  ##  
  // ### ###  ##   ##  ### ###   ## ##    ## ##    ####    ### ###  
  //
  ////////////////////////////////////////////////////////////////////////////////////////////////////

  const worldModel = new WorldModel(worldHeight + 2, worldWidth);
  const worldView = new WorldView(worldModel);

  circuitWriter(new Circuit(worldModel));

  worldView.buildDOMElements(worldElement);
  worldView.refreshDOMElements1(worldElement, counterElement);

  function refreshNodeSize() {
    worldElement.className = "world world-size-" + viewScale;
    worldView.refreshDOMSize(worldElement);
  }

  setTimeout(() => {
    refreshNodeSize();

    if (initialPosition) {
      const cellSize = worldView.getCellSize(worldElement);
      wrapperElement.scrollLeft =  -wrapperElement.clientWidth / 2 + cellSize * (initialPosition.x + worldModel.baseX);
      wrapperElement.scrollTop =  -wrapperElement.clientHeight / 2 + cellSize * (initialPosition.y + worldModel.baseY);
    }
  }, 1);

  function changeSpeedButton(speed) {
    for (const btn of speedButtons) {
      if (btn) {
        btn.className = "speed-button";
      }
    }
    if (speedButtons[speed]) {
      speedButtons[speed].className = "speed-button active-button";
    }
  }
  function stopWorld() {
    startFlag = false;
    startCounter++;
    changeSpeedButton(0);
  }

  if (uiControls.includes("reset")) {
    const buttonElement = document.createElement("input");
    buttonElement.type = "button";
    buttonElement.value = "Reset";
    buttonElement.className = "control-button";
    wrapperElement.insertAdjacentElement("beforebegin", buttonElement);
    buttonElement.addEventListener("click", event => {
      event.preventDefault();
      stopWorld();
      worldModel.reset();
      circuitWriter(new Circuit(worldModel));
      worldView.refreshDOMElements1(worldElement, counterElement);
      return false;
    });
  }

  if (uiControls.includes("stop")) {
    const buttonElement = document.createElement("input");
    buttonElement.type = "button";
    buttonElement.value = "Stop";
    wrapperElement.insertAdjacentElement("beforebegin", buttonElement);
    speedButtons.push(buttonElement);
    buttonElement.addEventListener("click", event => {
      event.preventDefault();
      stopWorld();
      return false;
    });
  }

  if (uiControls.includes("step")) {
    const buttonElement = document.createElement("input");
    buttonElement.type = "button";
    buttonElement.value = "Step";
    buttonElement.className = "control-button";
    wrapperElement.insertAdjacentElement("beforebegin", buttonElement);
    buttonElement.addEventListener("click", event => {
      event.preventDefault();
      if (startFlag) {
        stopWorld();
      }
      worldModel.step();
      worldView.refreshDOMElements2(worldElement, counterElement);
      return false;
    });
  }

  function setSpeed(sp) {
    speed = sp;
    changeSpeedButton(sp);
    if (!startFlag) {
      startFlag = true;
      function step(counter) {
        if (startCounter != counter) return;
        if (worldModel.isQueueEmpty()) {
          stopWorld();
          return false;
        }
        const [intervalMiliseconds, intervalStepCount] = (() => {
          let sizeIdx = 0;
          if (worldModel.size >= 10000) {
            sizeIdx = 1;
          }
          return ([
            [[500,    1], [500,    1]],
            [[100,    1], [100,    1]],
            [[ 50,    2], [ 50,    2]],
            [[ 50,    8], [ 50,    8]],
            [[ 50,   32], [100,   64]],
            [[ 50,  128], [200,  512]],
            [[ 50,  512], [200, 2048]],
          ])[speed-1][sizeIdx];
        })();
        const startTime = Date.now();
        for (let i = 0; i < intervalStepCount; i++) {
          worldModel.step();
        }
        worldView.refreshDOMElements2(worldElement, counterElement);
        const endTime = Date.now();
        let interval = 1;
        if (endTime - startTime < intervalMiliseconds) {
          interval = intervalMiliseconds - (endTime - startTime);
        }
        setTimeout(() => {step(counter)}, interval);
      }
      setTimeout(() => {step(startCounter)}, 1);
    }
  }

  for (let sp = 1; sp <= 7; sp++) {
    if (!uiControls.includes("speed" + sp)) {
      speedButtons.push(null);
      continue;
    }
    const buttonElement = document.createElement("input");
    buttonElement.type = "button";
    buttonElement.value = "Speed " + sp;
    wrapperElement.insertAdjacentElement("beforebegin", buttonElement);
    speedButtons.push(buttonElement);
    buttonElement.addEventListener("click", event => {
      event.preventDefault();
      setSpeed(sp);
      return false;
    });
  }
  changeSpeedButton(0);

  function getCellSize() {
    const nodeElement = worldElement.children[0].children[0];
    const horiElement = worldElement.children[0].children[1];
    return nodeElement.offsetWidth + horiElement.offsetWidth;
  }

  function changeZoom(isZoomOut, eventX, eventY) {
    if (eventX == null) {
      eventX = wrapperElement.clientWidth / 2;
    }
    if (eventY == null) {
      eventY = wrapperElement.clientHeight / 2;
    }

    if (isZoomOut) {
      // 縮小
      if (viewScale < viewScaleLimit) {
        viewScale++;
      }
    } else {
      // 拡大
      if (viewScale > 1) {
        viewScale--;
      }
    }

    const currScrollLeft = wrapperElement.scrollLeft;
    const currScrollTop = wrapperElement.scrollTop;

    const cellSizeBefore = getCellSize();

    refreshNodeSize();

    const cellSizeAfter = getCellSize();

    const newScrollLeft = (currScrollLeft + eventX) / cellSizeBefore * cellSizeAfter - eventX;
    const newScrollTop = (currScrollTop + eventY) / cellSizeBefore * cellSizeAfter - eventY;
    wrapperElement.scrollLeft = newScrollLeft;
    wrapperElement.scrollTop = newScrollTop;
  }

  if (uiControls.includes("zoom")) {
    const buttonElement = document.createElement("input");
    buttonElement.type = "button";
    buttonElement.value = "Zoom In";
    buttonElement.className = "control-button";
    wrapperElement.insertAdjacentElement("beforebegin", buttonElement);
    buttonElement.addEventListener("click", event => {
      event.preventDefault();
      changeZoom(false, null, null);
      return false;
    });
  }
  if (uiControls.includes("zoom")) {
    const buttonElement = document.createElement("input");
    buttonElement.type = "button";
    buttonElement.value = "Zoom Out";
    buttonElement.className = "control-button";
    wrapperElement.insertAdjacentElement("beforebegin", buttonElement);
    buttonElement.addEventListener("click", event => {
      event.preventDefault();
      changeZoom(true, null, null);
      return false;
    });
  }

  if (uiControls.includes("counter")) {
    counterElement = document.createElement("span");
    counterElement.innerText = "0";
    counterElement.class = "counter";
    wrapperElement.insertAdjacentElement("beforebegin", counterElement);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////

  return new CellularAutomatonUI();
}
