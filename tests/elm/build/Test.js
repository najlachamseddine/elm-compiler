Elm.Main = Elm.Main || {};
Elm.Main.make = function (_elm) {
   "use strict";
   _elm.Main = _elm.Main || {};
   if (_elm.Main.values)
   return _elm.Main.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Main";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var ElmTest = ElmTest || {};
   ElmTest.Assertion = Elm.ElmTest.Assertion.make(_elm);
   var ElmTest = ElmTest || {};
   ElmTest.Run = Elm.ElmTest.Run.make(_elm);
   var ElmTest = ElmTest || {};
   ElmTest.Runner = ElmTest.Runner || {};
   ElmTest.Runner.Console = Elm.ElmTest.Runner.Console.make(_elm);
   var ElmTest = ElmTest || {};
   ElmTest.Test = Elm.ElmTest.Test.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var IO = IO || {};
   IO.IO = Elm.IO.IO.make(_elm);
   var IO = IO || {};
   IO.Runner = Elm.IO.Runner.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var _op = {};
   var responses = Native.Ports.portIn("responses",
   Native.Ports.incomingSignal(function (v) {
      return v === null ? Maybe.Nothing : Maybe.Just(typeof v === "string" || typeof v === "object" && v instanceof String ? v : _E.raise("invalid input, expecting JSString but got " + v));
   }));
   var tests = _L.fromArray([A2(ElmTest.Test.equals,
   0,
   1)]);
   var console = ElmTest.Runner.Console.runDisplay(tests);
   var requests = Native.Ports.portOut("requests",
   Native.Ports.outgoingSignal(function (v) {
      return _L.toArray(v).map(function (v) {
         return {mPut: v.mPut.ctor === "Nothing" ? null : v.mPut._0
                ,mExit: v.mExit.ctor === "Nothing" ? null : v.mExit._0
                ,mGet: v.mGet};
      });
   }),
   A2(IO.Runner.run,
   responses,
   console));
   _elm.Main.values = {_op: _op
                      ,tests: tests
                      ,console: console};
   return _elm.Main.values;
};Elm.IO = Elm.IO || {};
Elm.IO.Runner = Elm.IO.Runner || {};
Elm.IO.Runner.make = function (_elm) {
   "use strict";
   _elm.IO = _elm.IO || {};
   _elm.IO.Runner = _elm.IO.Runner || {};
   if (_elm.IO.Runner.values)
   return _elm.IO.Runner.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "IO.Runner";
   var Automaton = Elm.Automaton.make(_elm);
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Either = Elm.Either.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var IO = IO || {};
   IO.IO = Elm.IO.IO.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var _op = {};
   var put = F2(function (s,_v0) {
      return function () {
         return {ctor: "_Tuple2"
                ,_0: s
                ,_1: {ctor: "_Tuple0"}};
      }();
   });
   var ask = function (s) {
      return {ctor: "_Tuple2"
             ,_0: s
             ,_1: s};
   };
   _op[">>="] = F3(function (f,
   k,
   s) {
      return function () {
         var $ = f(s),
         s$ = $._0,
         y = $._1;
         return A2(k,y,s$);
      }();
   });
   var pure = F2(function (x,s) {
      return {ctor: "_Tuple2"
             ,_0: s
             ,_1: x};
   });
   var empty = {_: {}
               ,mExit: Maybe.Nothing
               ,mGet: false
               ,mPut: Maybe.Nothing};
   var putS = function (s) {
      return _U.replace([["mPut"
                         ,Maybe.Just(s)]],
      empty);
   };
   var exit = function (n) {
      return _U.replace([["mExit"
                         ,Maybe.Just(n)]],
      empty);
   };
   var getS = _U.replace([["mGet"
                          ,true]],
   empty);
   var extractRequests = function (io) {
      return function () {
         switch (io.ctor)
         {case "Impure":
            return function () {
                 switch (io._0.ctor)
                 {case "Exit":
                    return pure({ctor: "_Tuple2"
                                ,_0: _L.fromArray([exit(io._0._0)])
                                ,_1: io});
                    case "GetC":
                    return A2(_op[">>="],
                      ask,
                      function (st) {
                         return function () {
                            var _v10 = String.uncons(st.buffer);
                            switch (_v10.ctor)
                            {case "Just":
                               switch (_v10._0.ctor)
                                 {case "_Tuple2":
                                    return A2(_op[">>="],
                                      put({_: {},buffer: _v10._0._1}),
                                      function (_v14) {
                                         return function () {
                                            return extractRequests(io._0._0(_v10._0._0));
                                         }();
                                      });}
                                 break;
                               case "Nothing":
                               return pure({ctor: "_Tuple2"
                                           ,_0: _L.fromArray([getS])
                                           ,_1: io});}
                            _E.Case($moduleName,
                            "between lines 51 and 55");
                         }();
                      });
                    case "PutC":
                    return A2(_op[">>="],
                      extractRequests(io._0._1),
                      function (_v16) {
                         return function () {
                            switch (_v16.ctor)
                            {case "_Tuple2":
                               return pure({ctor: "_Tuple2"
                                           ,_0: {ctor: "::"
                                                ,_0: putS(A2(String.cons,
                                                io._0._0,
                                                ""))
                                                ,_1: _v16._0}
                                           ,_1: _v16._1});}
                            _E.Case($moduleName,
                            "on line 47, column 22 to 61");
                         }();
                      });}
                 _E.Case($moduleName,
                 "between lines 45 and 55");
              }();
            case "Pure":
            return pure({ctor: "_Tuple2"
                        ,_0: _L.fromArray([exit(0)])
                        ,_1: IO.IO.Pure(io._0)});}
         _E.Case($moduleName,
         "between lines 43 and 55");
      }();
   };
   var step = F2(function (resp,
   _v20) {
      return function () {
         switch (_v20.ctor)
         {case "_Tuple2":
            return function () {
                 var newST = function () {
                    switch (resp.ctor)
                    {case "Just":
                       return _U.replace([["buffer"
                                          ,A2(String.append,
                                          _v20._1.buffer,
                                          resp._0)]],
                         _v20._1);
                       case "Nothing": return _v20._1;}
                    _E.Case($moduleName,
                    "between lines 59 and 62");
                 }();
                 var _ = A2(extractRequests,
                 _v20._0,
                 newST);
                 var k = function () {
                    switch (_.ctor)
                    {case "_Tuple2":
                       switch (_._1.ctor)
                         {case "_Tuple2":
                            return _._1._1;}
                         break;}
                    _E.Case($moduleName,
                    "on line 62, column 27 to 51");
                 }();
                 var newST$ = function () {
                    switch (_.ctor)
                    {case "_Tuple2":
                       switch (_._1.ctor)
                         {case "_Tuple2": return _._0;}
                         break;}
                    _E.Case($moduleName,
                    "on line 62, column 27 to 51");
                 }();
                 var rs = function () {
                    switch (_.ctor)
                    {case "_Tuple2":
                       switch (_._1.ctor)
                         {case "_Tuple2":
                            return _._1._0;}
                         break;}
                    _E.Case($moduleName,
                    "on line 62, column 27 to 51");
                 }();
                 return {ctor: "_Tuple2"
                        ,_0: {ctor: "_Tuple2"
                             ,_0: k
                             ,_1: newST$}
                        ,_1: rs};
              }();}
         _E.Case($moduleName,
         "between lines 59 and 63");
      }();
   });
   var start = {_: {},buffer: ""};
   var run = F2(function (resps,
   io) {
      return A3(Automaton.run,
      A2(Automaton.hiddenState,
      {ctor: "_Tuple2"
      ,_0: io
      ,_1: start},
      step),
      _L.fromArray([]),
      resps);
   });
   var orSig = F2(function (s1,
   s2) {
      return A2(Signal.merge,
      A2(Signal._op["<~"],
      Either.Left,
      s1),
      A2(Signal._op["<~"],
      Either.Right,
      s2));
   });
   var IOState = function (a) {
      return {_: {},buffer: a};
   };
   var Request = F3(function (a,
   b,
   c) {
      return {_: {}
             ,mExit: b
             ,mGet: c
             ,mPut: a};
   });
   _elm.IO.Runner.values = {_op: _op
                           ,orSig: orSig
                           ,start: start
                           ,run: run
                           ,empty: empty
                           ,putS: putS
                           ,exit: exit
                           ,getS: getS
                           ,extractRequests: extractRequests
                           ,step: step
                           ,pure: pure
                           ,ask: ask
                           ,put: put
                           ,Request: Request
                           ,IOState: IOState};
   return _elm.IO.Runner.values;
};Elm.Automaton = Elm.Automaton || {};
Elm.Automaton.make = function (_elm) {
   "use strict";
   _elm.Automaton = _elm.Automaton || {};
   if (_elm.Automaton.values)
   return _elm.Automaton.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Automaton";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var _op = {};
   var dequeue = function (q) {
      return function () {
         switch (q.ctor)
         {case "_Tuple2":
            switch (q._0.ctor)
              {case "[]": switch (q._1.ctor)
                   {case "[]":
                      return Maybe.Nothing;}
                   break;}
              switch (q._1.ctor)
              {case "::":
                 return Maybe.Just({ctor: "_Tuple2"
                                   ,_0: q._1._0
                                   ,_1: {ctor: "_Tuple2"
                                        ,_0: q._0
                                        ,_1: q._1._1}});
                 case "[]":
                 return dequeue({ctor: "_Tuple2"
                                ,_0: _L.fromArray([])
                                ,_1: List.reverse(q._0)});}
              break;}
         _E.Case($moduleName,
         "between lines 116 and 121");
      }();
   };
   var enqueue = F2(function (x,
   _v5) {
      return function () {
         switch (_v5.ctor)
         {case "_Tuple2":
            return {ctor: "_Tuple2"
                   ,_0: {ctor: "::"
                        ,_0: x
                        ,_1: _v5._0}
                   ,_1: _v5._1};}
         _E.Case($moduleName,
         "on line 115, column 22 to 31");
      }();
   });
   var empty = {ctor: "_Tuple2"
               ,_0: _L.fromArray([])
               ,_1: _L.fromArray([])};
   var Step = function (a) {
      return {ctor: "Step",_0: a};
   };
   var run = F3(function (auto,
   base,
   inputs) {
      return function () {
         var step = F2(function (a,
         _v9) {
            return function () {
               switch (_v9.ctor)
               {case "_Tuple2":
                  switch (_v9._0.ctor)
                    {case "Step":
                       return _v9._0._0(a);}
                    break;}
               _E.Case($moduleName,
               "on line 43, column 28 to 31");
            }();
         });
         return A2(Signal.lift,
         function (_v14) {
            return function () {
               switch (_v14.ctor)
               {case "_Tuple2":
                  return _v14._1;}
               _E.Case($moduleName,
               "on line 44, column 23 to 24");
            }();
         },
         A3(Signal.foldp,
         step,
         {ctor: "_Tuple2"
         ,_0: auto
         ,_1: base},
         inputs));
      }();
   });
   var step = F2(function (a,
   _v18) {
      return function () {
         switch (_v18.ctor)
         {case "Step":
            return _v18._0(a);}
         _E.Case($moduleName,
         "on line 48, column 19 to 22");
      }();
   });
   var andThen = F2(function (f,
   g) {
      return Step(function (a) {
         return function () {
            var $ = A2(step,a,f),
            f$ = $._0,
            b = $._1;
            var $ = A2(step,b,g),
            g$ = $._0,
            c = $._1;
            return {ctor: "_Tuple2"
                   ,_0: A2(andThen,f$,g$)
                   ,_1: c};
         }();
      });
   });
   var loop = F2(function (state,
   auto) {
      return Step(function (input) {
         return function () {
            var _ = A2(step,
            {ctor: "_Tuple2"
            ,_0: input
            ,_1: state},
            auto);
            var auto$ = function () {
               switch (_.ctor)
               {case "_Tuple2":
                  switch (_._1.ctor)
                    {case "_Tuple2": return _._0;}
                    break;}
               _E.Case($moduleName,
               "on line 68, column 54 to 77");
            }();
            var output = function () {
               switch (_.ctor)
               {case "_Tuple2":
                  switch (_._1.ctor)
                    {case "_Tuple2":
                       return _._1._0;}
                    break;}
               _E.Case($moduleName,
               "on line 68, column 54 to 77");
            }();
            var state$ = function () {
               switch (_.ctor)
               {case "_Tuple2":
                  switch (_._1.ctor)
                    {case "_Tuple2":
                       return _._1._1;}
                    break;}
               _E.Case($moduleName,
               "on line 68, column 54 to 77");
            }();
            return {ctor: "_Tuple2"
                   ,_0: A2(loop,state$,auto$)
                   ,_1: output};
         }();
      });
   });
   var combine = function (autos) {
      return Step(function (a) {
         return function () {
            var $ = List.unzip(A2(List.map,
            step(a),
            autos)),
            autos$ = $._0,
            bs = $._1;
            return {ctor: "_Tuple2"
                   ,_0: combine(autos$)
                   ,_1: bs};
         }();
      });
   };
   var pure = function (f) {
      return Step(function (x) {
         return {ctor: "_Tuple2"
                ,_0: pure(f)
                ,_1: f(x)};
      });
   };
   var state = F2(function (s,f) {
      return Step(function (x) {
         return function () {
            var s$ = A2(f,x,s);
            return {ctor: "_Tuple2"
                   ,_0: A2(state,s$,f)
                   ,_1: s$};
         }();
      });
   });
   var count = A2(state,
   0,
   F2(function (_v36,c) {
      return function () {
         return c + 1;
      }();
   }));
   var hiddenState = F2(function (s,
   f) {
      return Step(function (x) {
         return function () {
            var $ = A2(f,x,s),
            s$ = $._0,
            out = $._1;
            return {ctor: "_Tuple2"
                   ,_0: A2(hiddenState,s$,f)
                   ,_1: out};
         }();
      });
   });
   var average = function (k) {
      return function () {
         var stepFull = F2(function (n,
         _v38) {
            return function () {
               switch (_v38.ctor)
               {case "_Tuple3":
                  return function () {
                       var _v43 = dequeue(_v38._0);
                       switch (_v43.ctor)
                       {case "Just":
                          switch (_v43._0.ctor)
                            {case "_Tuple2":
                               return function () {
                                    var sum$ = _v38._2 + n - _v43._0._0;
                                    return {ctor: "_Tuple2"
                                           ,_0: {ctor: "_Tuple3"
                                                ,_0: A2(enqueue,n,_v43._0._1)
                                                ,_1: _v38._1
                                                ,_2: sum$}
                                           ,_1: sum$ / Basics.toFloat(_v38._1)};
                                 }();}
                            break;
                          case "Nothing":
                          return {ctor: "_Tuple2"
                                 ,_0: {ctor: "_Tuple3"
                                      ,_0: _v38._0
                                      ,_1: _v38._1
                                      ,_2: _v38._2}
                                 ,_1: 0};}
                       _E.Case($moduleName,
                       "between lines 128 and 132");
                    }();}
               _E.Case($moduleName,
               "between lines 128 and 132");
            }();
         });
         var step = F2(function (n,
         _v47) {
            return function () {
               switch (_v47.ctor)
               {case "_Tuple3":
                  return _U.eq(_v47._1,
                    k) ? A2(stepFull,
                    n,
                    {ctor: "_Tuple3"
                    ,_0: _v47._0
                    ,_1: _v47._1
                    ,_2: _v47._2}) : {ctor: "_Tuple2"
                                     ,_0: {ctor: "_Tuple3"
                                          ,_0: A2(enqueue,n,_v47._0)
                                          ,_1: _v47._1 + 1
                                          ,_2: _v47._2 + n}
                                     ,_1: (_v47._2 + n) / (Basics.toFloat(_v47._1) + 1)};}
               _E.Case($moduleName,
               "between lines 125 and 126");
            }();
         });
         return A2(hiddenState,
         {ctor: "_Tuple3"
         ,_0: empty
         ,_1: 0
         ,_2: 0},
         step);
      }();
   };
   _elm.Automaton.values = {_op: _op
                           ,pure: pure
                           ,state: state
                           ,hiddenState: hiddenState
                           ,run: run
                           ,step: step
                           ,andThen: andThen
                           ,combine: combine
                           ,loop: loop
                           ,count: count
                           ,average: average};
   return _elm.Automaton.values;
};Elm.ElmTest = Elm.ElmTest || {};
Elm.ElmTest.Runner = Elm.ElmTest.Runner || {};
Elm.ElmTest.Runner.Console = Elm.ElmTest.Runner.Console || {};
Elm.ElmTest.Runner.Console.make = function (_elm) {
   "use strict";
   _elm.ElmTest = _elm.ElmTest || {};
   _elm.ElmTest.Runner = _elm.ElmTest.Runner || {};
   _elm.ElmTest.Runner.Console = _elm.ElmTest.Runner.Console || {};
   if (_elm.ElmTest.Runner.Console.values)
   return _elm.ElmTest.Runner.Console.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "ElmTest.Runner.Console";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var ElmTest = ElmTest || {};
   ElmTest.Runner = ElmTest.Runner || {};
   ElmTest.Runner.String = Elm.ElmTest.Runner.String.make(_elm);
   var ElmTest = ElmTest || {};
   ElmTest.Test = Elm.ElmTest.Test.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var IO = IO || {};
   IO.IO = Elm.IO.IO.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var _op = {};
   var runDisplay = function (tests) {
      return function () {
         var $ = ElmTest.Runner.String.runDisplay(tests),
         allPassed = $._0,
         results = $._1;
         return A2(IO.IO._op[">>"],
         IO.IO.putStrLn(results),
         function () {
            switch (allPassed)
            {case false:
               return IO.IO.exit(1);
               case true:
               return IO.IO.exit(0);}
            _E.Case($moduleName,
            "between lines 23 and 25");
         }());
      }();
   };
   _elm.ElmTest.Runner.Console.values = {_op: _op
                                        ,runDisplay: runDisplay};
   return _elm.ElmTest.Runner.Console.values;
};Elm.ElmTest = Elm.ElmTest || {};
Elm.ElmTest.Runner = Elm.ElmTest.Runner || {};
Elm.ElmTest.Runner.String = Elm.ElmTest.Runner.String || {};
Elm.ElmTest.Runner.String.make = function (_elm) {
   "use strict";
   _elm.ElmTest = _elm.ElmTest || {};
   _elm.ElmTest.Runner = _elm.ElmTest.Runner || {};
   _elm.ElmTest.Runner.String = _elm.ElmTest.Runner.String || {};
   if (_elm.ElmTest.Runner.String.values)
   return _elm.ElmTest.Runner.String.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "ElmTest.Runner.String";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var ElmTest = ElmTest || {};
   ElmTest.Run = Elm.ElmTest.Run.make(_elm);
   var ElmTest = ElmTest || {};
   ElmTest.Test = Elm.ElmTest.Test.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var _op = {};
   var pretty = F2(function (_v0,
   r) {
      return function () {
         switch (_v0.ctor)
         {case "TestCase":
            return function () {
                 switch (r.ctor)
                 {case "Just":
                    return _L.append(_v0._0,
                      _L.append(": FAILED. ",r._0));
                    case "Nothing":
                    return _L.append(_v0._0,
                      ": passed.");}
                 _E.Case($moduleName,
                 "between lines 29 and 33");
              }();}
         _E.Case($moduleName,
         "between lines 29 and 33");
      }();
   });
   var replicate = F2(function (n,
   c) {
      return function () {
         var go = function (n) {
            return _U.cmp(n,
            0) < 1 ? _L.fromArray([]) : {ctor: "::"
                                        ,_0: c
                                        ,_1: go(n - 1)};
         };
         return String.fromList(go(n));
      }();
   });
   var vcat = function ($) {
      return List.concat(List.intersperse("\n")($));
   };
   var indent = function (n) {
      return function () {
         var indents = A2(replicate,
         n,
         _U.chr(" "));
         return function ($) {
            return vcat(List.map(String.append(indents))(String.lines($)));
         };
      }();
   };
   var runDisplay = function (ts) {
      return function () {
         var r = ElmTest.Run.report(ts);
         var passed = List.length(r.passes);
         var failed = List.length(r.failures);
         var summary = vcat(List.map(indent(2))(_L.fromArray([_L.append(String.show(List.length(ts)),
                                                             " tests executed")
                                                             ,_L.append(String.show(passed),
                                                             " tests passed")
                                                             ,_L.append(String.show(failed),
                                                             " tests failed")])));
         var pass = _U.eq(failed,0);
         var results = pass ? _L.fromArray([]) : A3(List.zipWith,
         pretty,
         ts,
         r.results);
         return {ctor: "_Tuple2"
                ,_0: pass
                ,_1: vcat({ctor: "::"
                          ,_0: summary
                          ,_1: results})};
      }();
   };
   _elm.ElmTest.Runner.String.values = {_op: _op
                                       ,runDisplay: runDisplay};
   return _elm.ElmTest.Runner.String.values;
};Elm.ElmTest = Elm.ElmTest || {};
Elm.ElmTest.Run = Elm.ElmTest.Run || {};
Elm.ElmTest.Run.make = function (_elm) {
   "use strict";
   _elm.ElmTest = _elm.ElmTest || {};
   _elm.ElmTest.Run = _elm.ElmTest.Run || {};
   if (_elm.ElmTest.Run.values)
   return _elm.ElmTest.Run.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "ElmTest.Run";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var ElmTest = ElmTest || {};
   ElmTest.Assertion = Elm.ElmTest.Assertion.make(_elm);
   var ElmTest = ElmTest || {};
   ElmTest.Test = Elm.ElmTest.Test.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var _op = {};
   var pass = function (m) {
      return function () {
         switch (m.ctor)
         {case "Just": return false;
            case "Nothing": return true;}
         _E.Case($moduleName,
         "between lines 33 and 37");
      }();
   };
   var fail = function ($) {
      return Basics.not(pass($));
   };
   var run = function (_v2) {
      return function () {
         switch (_v2.ctor)
         {case "TestCase":
            return function () {
                 var runAssertion = F2(function (t,
                 m) {
                    return t({ctor: "_Tuple0"}) ? Maybe.Nothing : Maybe.Just(m);
                 });
                 return function () {
                    switch (_v2._1.ctor)
                    {case "AssertEqual":
                       return runAssertion(_v2._1._0)(_L.append("Expected: ",
                         _L.append(_v2._1._1,
                         _L.append("; got: ",
                         _v2._1._2))));
                       case "AssertFalse":
                       return runAssertion(_v2._1._0)("not False");
                       case "AssertNotEqual":
                       return runAssertion(_v2._1._0)(_L.append(_v2._1._1,
                         _L.append(" equals ",
                         _v2._1._2)));
                       case "AssertTrue":
                       return runAssertion(_v2._1._0)("not True");}
                    _E.Case($moduleName,
                    "between lines 25 and 31");
                 }();
              }();}
         _E.Case($moduleName,
         "between lines 22 and 31");
      }();
   };
   var report = function (ts) {
      return function () {
         var results = A2(List.map,
         run,
         ts);
         var $ = A2(List.partition,
         pass,
         results),
         passes = $._0,
         fails = $._1;
         return {_: {}
                ,failures: fails
                ,passes: passes
                ,results: results};
      }();
   };
   var Report = F3(function (a,
   b,
   c) {
      return {_: {}
             ,failures: c
             ,passes: b
             ,results: a};
   });
   _elm.ElmTest.Run.values = {_op: _op
                             ,run: run
                             ,pass: pass
                             ,fail: fail
                             ,report: report
                             ,Report: Report};
   return _elm.ElmTest.Run.values;
};Elm.ElmTest = Elm.ElmTest || {};
Elm.ElmTest.Test = Elm.ElmTest.Test || {};
Elm.ElmTest.Test.make = function (_elm) {
   "use strict";
   _elm.ElmTest = _elm.ElmTest || {};
   _elm.ElmTest.Test = _elm.ElmTest.Test || {};
   if (_elm.ElmTest.Test.values)
   return _elm.ElmTest.Test.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "ElmTest.Test";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var ElmTest = ElmTest || {};
   ElmTest.Assertion = Elm.ElmTest.Assertion.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var _op = {};
   var TestCase = F2(function (a,
   b) {
      return {ctor: "TestCase"
             ,_0: a
             ,_1: b};
   });
   var test = F2(function (name,
   a) {
      return A2(TestCase,name,a);
   });
   var defaultTest = function (a) {
      return function () {
         var name = function () {
            switch (a.ctor)
            {case "AssertEqual":
               return _L.append(a._1,
                 _L.append(" == ",a._2));
               case "AssertNotEqual":
               return _L.append(a._1,
                 _L.append(" /= ",a._2));
               case "AssertTrue":
               return "True";}
            _E.Case($moduleName,
            "between lines 25 and 30");
         }();
         return A2(test,name,a);
      }();
   };
   var equals = F2(function (a,b) {
      return defaultTest(A2(ElmTest.Assertion.assertEqual,
      a,
      b));
   });
   _elm.ElmTest.Test.values = {_op: _op
                              ,equals: equals
                              ,test: test
                              ,defaultTest: defaultTest
                              ,TestCase: TestCase};
   return _elm.ElmTest.Test.values;
};Elm.ElmTest = Elm.ElmTest || {};
Elm.ElmTest.Assertion = Elm.ElmTest.Assertion || {};
Elm.ElmTest.Assertion.make = function (_elm) {
   "use strict";
   _elm.ElmTest = _elm.ElmTest || {};
   _elm.ElmTest.Assertion = _elm.ElmTest.Assertion || {};
   if (_elm.ElmTest.Assertion.values)
   return _elm.ElmTest.Assertion.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "ElmTest.Assertion";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var _op = {};
   var AssertNotEqual = F3(function (a,
   b,
   c) {
      return {ctor: "AssertNotEqual"
             ,_0: a
             ,_1: b
             ,_2: c};
   });
   var assertNotEqual = F2(function (a,
   b) {
      return A3(AssertNotEqual,
      function (_v0) {
         return function () {
            return !_U.eq(a,b);
         }();
      },
      String.show(a),
      String.show(b));
   });
   var AssertEqual = F3(function (a,
   b,
   c) {
      return {ctor: "AssertEqual"
             ,_0: a
             ,_1: b
             ,_2: c};
   });
   var assertEqual = F2(function (a,
   b) {
      return A3(AssertEqual,
      function (_v2) {
         return function () {
            return _U.eq(a,b);
         }();
      },
      String.show(a),
      String.show(b));
   });
   var assertionList = F2(function (xs,
   ys) {
      return A3(List.zipWith,
      assertEqual,
      xs,
      ys);
   });
   var AssertFalse = function (a) {
      return {ctor: "AssertFalse"
             ,_0: a};
   };
   var AssertTrue = function (a) {
      return {ctor: "AssertTrue"
             ,_0: a};
   };
   var assertT = AssertTrue;
   var assert = function (b) {
      return AssertTrue(function (_v4) {
         return function () {
            return b;
         }();
      });
   };
   _elm.ElmTest.Assertion.values = {_op: _op
                                   ,assertT: assertT
                                   ,assert: assert
                                   ,assertEqual: assertEqual
                                   ,assertionList: assertionList
                                   ,assertNotEqual: assertNotEqual
                                   ,AssertTrue: AssertTrue
                                   ,AssertFalse: AssertFalse
                                   ,AssertEqual: AssertEqual
                                   ,AssertNotEqual: AssertNotEqual};
   return _elm.ElmTest.Assertion.values;
};Elm.IO = Elm.IO || {};
Elm.IO.IO = Elm.IO.IO || {};
Elm.IO.IO.make = function (_elm) {
   "use strict";
   _elm.IO = _elm.IO || {};
   _elm.IO.IO = _elm.IO.IO || {};
   if (_elm.IO.IO.values)
   return _elm.IO.IO.values;
   var _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "IO.IO";
   var Basics = Elm.Basics.make(_elm);
   var Color = Elm.Color.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Collage = Elm.Graphics.Collage.make(_elm);
   var Graphics = Graphics || {};
   Graphics.Element = Elm.Graphics.Element.make(_elm);
   var List = Elm.List.make(_elm);
   var Maybe = Elm.Maybe.make(_elm);
   var Native = Native || {};
   Native.Json = Elm.Native.Json.make(_elm);
   var Native = Native || {};
   Native.Ports = Elm.Native.Ports.make(_elm);
   var Signal = Elm.Signal.make(_elm);
   var String = Elm.String.make(_elm);
   var Text = Elm.Text.make(_elm);
   var Time = Elm.Time.make(_elm);
   var _op = {};
   var Impure = function (a) {
      return {ctor: "Impure"
             ,_0: a};
   };
   var Pure = function (a) {
      return {ctor: "Pure",_0: a};
   };
   var Exit = function (a) {
      return {ctor: "Exit",_0: a};
   };
   var GetC = function (a) {
      return {ctor: "GetC",_0: a};
   };
   var PutC = F2(function (a,b) {
      return {ctor: "PutC"
             ,_0: a
             ,_1: b};
   });
   var mapF = F2(function (f,iof) {
      return function () {
         switch (iof.ctor)
         {case "Exit":
            return Exit(iof._0);
            case "GetC":
            return GetC(function ($) {
                 return f(iof._0($));
              });
            case "PutC": return A2(PutC,
              iof._0,
              f(iof._1));}
         _E.Case($moduleName,
         "between lines 77 and 80");
      }();
   });
   var foldIO = F3(function (pur,
   impur,
   io) {
      return function () {
         switch (io.ctor)
         {case "Impure":
            return impur(A2(mapF,
              A2(foldIO,pur,impur),
              io._0));
            case "Pure": return pur(io._0);}
         _E.Case($moduleName,
         "between lines 84 and 86");
      }();
   });
   var bind = F2(function (io,f) {
      return function () {
         switch (io.ctor)
         {case "Impure":
            return Impure(A2(mapF,
              A2(Basics.flip,bind,f),
              io._0));
            case "Pure": return f(io._0);}
         _E.Case($moduleName,
         "between lines 52 and 54");
      }();
   });
   _op[">>="] = bind;
   var seq = F2(function (x,y) {
      return A2(_op[">>="],
      x,
      function (_v11) {
         return function () {
            return y;
         }();
      });
   });
   _op[">>"] = seq;
   var forever = function (m) {
      return A2(_op[">>="],
      m,
      function (_v13) {
         return function () {
            return forever(m);
         }();
      });
   };
   var pure = Pure;
   var apply = F2(function (iof,
   iom) {
      return A2(_op[">>="],
      iof,
      function (f) {
         return A2(_op[">>="],
         iom,
         function (m) {
            return pure(f(m));
         });
      });
   });
   _op["<*>"] = apply;
   var mapIO = F2(function (f,xs) {
      return A3(List.foldr,
      function ($) {
         return F2(function (x,y) {
            return A2(_op[">>"],x,y);
         })(f($));
      },
      pure({ctor: "_Tuple0"}),
      xs);
   });
   var map = F2(function (f,io) {
      return function () {
         switch (io.ctor)
         {case "Impure":
            return Impure(A2(mapF,
              map(f),
              io._0));
            case "Pure":
            return Pure(f(io._0));}
         _E.Case($moduleName,
         "between lines 33 and 35");
      }();
   });
   var exit = function ($) {
      return Impure(Exit($));
   };
   var getChar = Impure(GetC(Pure));
   var readUntil = function (end) {
      return function () {
         var go = function (s) {
            return A2(_op[">>="],
            getChar,
            function (c) {
               return _U.eq(c,
               end) ? pure(s) : go(A2(String.append,
               s,
               A2(String.cons,c,"")));
            });
         };
         return go("");
      }();
   };
   var getLine = readUntil(_U.chr("\n"));
   var putChar = function (c) {
      return Impure(A2(PutC,
      c,
      Pure({ctor: "_Tuple0"})));
   };
   var putStr = function ($) {
      return mapIO(putChar)(String.toList($));
   };
   var putStrLn = function (s) {
      return A2(_op[">>"],
      putStr(s),
      putChar(_U.chr("\n")));
   };
   _elm.IO.IO.values = {_op: _op
                       ,putChar: putChar
                       ,getChar: getChar
                       ,exit: exit
                       ,putStr: putStr
                       ,putStrLn: putStrLn
                       ,readUntil: readUntil
                       ,getLine: getLine
                       ,map: map
                       ,mapIO: mapIO
                       ,pure: pure
                       ,apply: apply
                       ,bind: bind
                       ,seq: seq
                       ,forever: forever
                       ,mapF: mapF
                       ,foldIO: foldIO
                       ,PutC: PutC
                       ,GetC: GetC
                       ,Exit: Exit
                       ,Pure: Pure
                       ,Impure: Impure};
   return _elm.IO.IO.values;
};