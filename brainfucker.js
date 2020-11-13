"use strict";
function _incoming(t) {
    var r = this.data,
        s = this.pointer,
        i = this.cursor;
    (this._input += t = t.substring(0, 1)),
        (r[s] = t.charCodeAt(0)),
        process.stdin.removeListener("data", _incoming),
        process.stdin.pause(),
        i < this.source.length ? _step(s, r, i) : this._callback && this._callback(this._error, this.output);
}
function _step(t, r, s) {
    var i,
        e,
        o,
        n = this.source,
        a = r[t],
        c = this._stack,
        u = this._callback;
    switch ((e = n[s++])) {
        case ">":
            r[++t] = r[t] || 0;
            break;
        case "<":
            t > 0 && --t;
            break;
        case "+":
            r[t] = ++a % 256;
            break;
        case "-":
            r[t] = a > 0 ? --a % 256 : a;
            break;
        case ".":
            this.output += String.fromCharCode(r[t]);
            break;
        case ",":
            return (this.cursor = s), (o = process.stdin).setEncoding("ascii"), o.on("data", _incoming), void o.resume();
        case "[":
            if ((("number" == typeof (i = c.top()) && i === s - 1) || c.push(s - 1), !a)) for (var h, p = 1, _ = { "[": 1, "]": -1 }; !_[(h = n[s++])] || (p += _[h]); );
            break;
        case "]":
            "number" != typeof (i = c.top()) ? (this._error = new Error('No preceeding "]"')) : a ? (s = i) : c.pop();
            break;
        default:
            this._error = new Error("Invalid operation: " + e);
    }
    if (((this.cursor = s), (this.pointer = t), s < n.length)) return _step(t, r, s);
    u && u(this._error, this.output);
}
function exec(t, r) {
    (this.data = [(this.pointer = this.cursor = 0)]),
        (this.output = this._input = ""),
        (this.source = t.replace(/[^+-\[\].,<>]+/g, "")),
        (this._callback = "function" == typeof r ? r.bind(this) : void 0),
        (this._stack = []),
        _step(this.pointer, this.data, this.cursor);
}
Array.prototype.top ||
    (Array.prototype.top = function () {
        return this[this.length - 1];
    });
var brainfuck = (module.exports = { _callback: null, _stack: [], _input: "", _error: null, data: [0], source: "", pointer: 0, cursor: 0, exec: exec, output: "" });
(_step = _step.bind(brainfuck)), (_incoming = _incoming.bind(brainfuck));
