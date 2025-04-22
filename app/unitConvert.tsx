"use client";

import React, { useEffect, useState } from "react";
import * as math from "mathjs";
import { ArrowLeftRight } from "lucide-react";

//prefixes
const prefixFactors: Record<string, number> = {
  "": 1,
  yocto: 1e-24,
  zepto: 1e-21,
  atto: 1e-18,
  femto: 1e-15,
  pico: 1e-12,
  nano: 1e-9,
  micro: 1e-6,
  milli: 1e-3,
  centi: 1e-2,
  deci: 1e-1,
  deka: 1e1,
  hecto: 1e2,
  kilo: 1e3,
  mega: 1e6,
  giga: 1e9,
  tera: 1e12,
  peta: 1e15,
  exa: 1e18,
  zetta: 1e21,
  yotta: 1e24,
};
//map
const siPrefixes = Object.entries(prefixFactors).map(([name, factor]) => ({
  name,
  label: name === "" ? "(none)" : `${name} (${factor.toExponential()})`,
}));

function countSigFigs(value: string): number {
  let v = value.trim().replace(/^[+-]/, "");
  if (/e/i.test(v)) {
    const [mantissa] = v.split(/e/i);
    return mantissa.replace(".", "").replace(/^0+/, "").length;
  }
  if (v.includes(".")) {
    return v.replace(".", "").replace(/^0+/, "").length;
  }
  return v.replace(/^0+/, "").length;
}

const UnitConverter = () => {
  const [baseUnits, setBaseUnits] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("1");
  const [inputPrefix, setInputPrefix] = useState<string>("");
  const [inputUnit, setInputUnit] = useState<string>("meter");
  const [outputPrefix, setOutputPrefix] = useState<string>("");
  const [outputUnit, setOutputUnit] = useState<string>("meter");
  const [validOutputUnits, setValidOutputUnits] = useState<string[]>([]);
  const [outputValue, setOutputValue] = useState<string>("");

  //load all units
  //TODO: remove dups
  useEffect(() => {
    const all = Object.keys(math.Unit.UNITS)
      .map((k) => k)
      .sort();
    setBaseUnits(all);
  }, []);

  //filter outputs
  useEffect(() => {
    const valid = baseUnits.filter((u) => {
      if (u === inputUnit) return false;
      try {
        math.unit(1, inputUnit).to(u);
        return true;
      } catch {
        return false;
      }
    });
    setValidOutputUnits(valid);
    if (!valid.includes(outputUnit)) setOutputUnit(valid[0] || "");
  }, [inputUnit, baseUnits]);

  //conversion
  //sig‑fig + 3‑zero scientific logic
  useEffect(() => {
    try {
      const inF = prefixFactors[inputPrefix] || 1;
      const outF = prefixFactors[outputPrefix] || 1;
      const rawIn = Number(inputValue) * inF;
      const baseResult = math
        .unit(rawIn, inputUnit)
        .to(outputUnit)
        .toNumber(outputUnit);
      const rawOut = baseResult / outF;

      const sigFigs = Math.max(1, countSigFigs(inputValue));
      const absVal = Math.abs(rawOut);

      let formatted: string;
      if (absVal !== 0 && (absVal >= 1e3 || absVal < 1e-3)) {
        formatted = rawOut.toExponential(sigFigs - 1);
      } else {
        //try fixed-form via toPrecision
        //if that slipped into e‑notation, force fixed
        formatted = rawOut.toPrecision(sigFigs);
        if (formatted.includes("e")) {
          const intDigits = Math.floor(Math.log10(absVal)) + 1;
          const decPlaces = Math.max(sigFigs - intDigits, 0);
          formatted = rawOut.toFixed(decPlaces);
        }
      }

      //trim
      if (formatted.includes(".")) {
        formatted = formatted
          .replace(/(\.\d*?[1-9])0+$/, "$1")
          .replace(/\.0+$/, "");
      }

      setOutputValue(formatted);
    } catch {
      setOutputValue("Invalid conversion");
    }
  }, [inputValue, inputPrefix, inputUnit, outputPrefix, outputUnit]);

  //Handle swap in/out
  const handleSwap = () => {
    setInputValue(outputValue);
    setInputPrefix(outputPrefix);
    setInputUnit(outputUnit);
    setOutputPrefix(inputPrefix);
    setOutputUnit(inputUnit);
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h2 className="text-xl font-bold text-center">Unit Converter</h2>
      <div className="grid grid-cols-3 gap-3 items-center">
        {/* Input */}
        <div className="flex flex-col space-y-2 ">
          <label className="font-medium">Input</label>
          <input
            type="number"
            className="border p-2 rounded"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <select
            className="border p-2 rounded "
            value={inputPrefix}
            onChange={(e) => setInputPrefix(e.target.value)}
          >
            {siPrefixes.map((p) => (
              <option key={p.name} value={p.name}>
                {p.label}
              </option>
            ))}
          </select>
          <select
            className="border p-2 rounded"
            value={inputUnit}
            onChange={(e) => setInputUnit(e.target.value)}
          >
            {baseUnits.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSwap}
            className="border p-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700"
          >
            <ArrowLeftRight />
          </button>
        </div>

        {/* Output */}
        <div className="flex flex-col space-y-2">
          <label className="font-medium">Output</label>
          <input
            className="border p-2 rounded bg-gray-100"
            value={outputValue}
            disabled
          />
          <select
            className="border p-2 rounded"
            value={outputPrefix}
            onChange={(e) => setOutputPrefix(e.target.value)}
          >
            {siPrefixes.map((p) => (
              <option key={p.name} value={p.name}>
                {p.label}
              </option>
            ))}
          </select>
          <select
            className="border p-2 rounded"
            value={outputUnit}
            onChange={(e) => setOutputUnit(e.target.value)}
          >
            {validOutputUnits.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
