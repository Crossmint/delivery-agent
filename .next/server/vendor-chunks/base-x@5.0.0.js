"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/base-x@5.0.0";
exports.ids = ["vendor-chunks/base-x@5.0.0"];
exports.modules = {

/***/ "(rsc)/./node_modules/.pnpm/base-x@5.0.0/node_modules/base-x/src/esm/index.js":
/*!******************************************************************************!*\
  !*** ./node_modules/.pnpm/base-x@5.0.0/node_modules/base-x/src/esm/index.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// base-x encoding / decoding\n// Copyright (c) 2018 base-x contributors\n// Copyright (c) 2014-2018 The Bitcoin Core developers (base58.cpp)\n// Distributed under the MIT software license, see the accompanying\n// file LICENSE or http://www.opensource.org/licenses/mit-license.php.\nfunction base (ALPHABET) {\n  if (ALPHABET.length >= 255) { throw new TypeError('Alphabet too long') }\n  const BASE_MAP = new Uint8Array(256)\n  for (let j = 0; j < BASE_MAP.length; j++) {\n    BASE_MAP[j] = 255\n  }\n  for (let i = 0; i < ALPHABET.length; i++) {\n    const x = ALPHABET.charAt(i)\n    const xc = x.charCodeAt(0)\n    if (BASE_MAP[xc] !== 255) { throw new TypeError(x + ' is ambiguous') }\n    BASE_MAP[xc] = i\n  }\n  const BASE = ALPHABET.length\n  const LEADER = ALPHABET.charAt(0)\n  const FACTOR = Math.log(BASE) / Math.log(256) // log(BASE) / log(256), rounded up\n  const iFACTOR = Math.log(256) / Math.log(BASE) // log(256) / log(BASE), rounded up\n  function encode (source) {\n    // eslint-disable-next-line no-empty\n    if (source instanceof Uint8Array) { } else if (ArrayBuffer.isView(source)) {\n      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength)\n    } else if (Array.isArray(source)) {\n      source = Uint8Array.from(source)\n    }\n    if (!(source instanceof Uint8Array)) { throw new TypeError('Expected Uint8Array') }\n    if (source.length === 0) { return '' }\n    // Skip & count leading zeroes.\n    let zeroes = 0\n    let length = 0\n    let pbegin = 0\n    const pend = source.length\n    while (pbegin !== pend && source[pbegin] === 0) {\n      pbegin++\n      zeroes++\n    }\n    // Allocate enough space in big-endian base58 representation.\n    const size = ((pend - pbegin) * iFACTOR + 1) >>> 0\n    const b58 = new Uint8Array(size)\n    // Process the bytes.\n    while (pbegin !== pend) {\n      let carry = source[pbegin]\n      // Apply \"b58 = b58 * 256 + ch\".\n      let i = 0\n      for (let it1 = size - 1; (carry !== 0 || i < length) && (it1 !== -1); it1--, i++) {\n        carry += (256 * b58[it1]) >>> 0\n        b58[it1] = (carry % BASE) >>> 0\n        carry = (carry / BASE) >>> 0\n      }\n      if (carry !== 0) { throw new Error('Non-zero carry') }\n      length = i\n      pbegin++\n    }\n    // Skip leading zeroes in base58 result.\n    let it2 = size - length\n    while (it2 !== size && b58[it2] === 0) {\n      it2++\n    }\n    // Translate the result into a string.\n    let str = LEADER.repeat(zeroes)\n    for (; it2 < size; ++it2) { str += ALPHABET.charAt(b58[it2]) }\n    return str\n  }\n  function decodeUnsafe (source) {\n    if (typeof source !== 'string') { throw new TypeError('Expected String') }\n    if (source.length === 0) { return new Uint8Array() }\n    let psz = 0\n    // Skip and count leading '1's.\n    let zeroes = 0\n    let length = 0\n    while (source[psz] === LEADER) {\n      zeroes++\n      psz++\n    }\n    // Allocate enough space in big-endian base256 representation.\n    const size = (((source.length - psz) * FACTOR) + 1) >>> 0 // log(58) / log(256), rounded up.\n    const b256 = new Uint8Array(size)\n    // Process the characters.\n    while (source[psz]) {\n      // Decode character\n      let carry = BASE_MAP[source.charCodeAt(psz)]\n      // Invalid character\n      if (carry === 255) { return }\n      let i = 0\n      for (let it3 = size - 1; (carry !== 0 || i < length) && (it3 !== -1); it3--, i++) {\n        carry += (BASE * b256[it3]) >>> 0\n        b256[it3] = (carry % 256) >>> 0\n        carry = (carry / 256) >>> 0\n      }\n      if (carry !== 0) { throw new Error('Non-zero carry') }\n      length = i\n      psz++\n    }\n    // Skip leading zeroes in b256.\n    let it4 = size - length\n    while (it4 !== size && b256[it4] === 0) {\n      it4++\n    }\n    const vch = new Uint8Array(zeroes + (size - it4))\n    let j = zeroes\n    while (it4 !== size) {\n      vch[j++] = b256[it4++]\n    }\n    return vch\n  }\n  function decode (string) {\n    const buffer = decodeUnsafe(string)\n    if (buffer) { return buffer }\n    throw new Error('Non-base' + BASE + ' character')\n  }\n  return {\n    encode,\n    decodeUnsafe,\n    decode\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (base);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vYmFzZS14QDUuMC4wL25vZGVfbW9kdWxlcy9iYXNlLXgvc3JjL2VzbS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0Esa0JBQWtCLHFCQUFxQjtBQUN2QztBQUNBO0FBQ0Esa0JBQWtCLHFCQUFxQjtBQUN2QztBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLDJDQUEyQztBQUMzQywrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQiw2Q0FBNkM7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFlBQVksU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEMsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0EsK0JBQStCLDZDQUE2QztBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxJQUFJIiwic291cmNlcyI6WyIvVXNlcnMvZmlsaXBwb3NseW1wZXJvcG91bG9zL0RvY3VtZW50cy9Dcm9zc21pbnQvZ29hdC1tdG5kYW8tdjIvbm9kZV9tb2R1bGVzLy5wbnBtL2Jhc2UteEA1LjAuMC9ub2RlX21vZHVsZXMvYmFzZS14L3NyYy9lc20vaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gYmFzZS14IGVuY29kaW5nIC8gZGVjb2Rpbmdcbi8vIENvcHlyaWdodCAoYykgMjAxOCBiYXNlLXggY29udHJpYnV0b3JzXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxOCBUaGUgQml0Y29pbiBDb3JlIGRldmVsb3BlcnMgKGJhc2U1OC5jcHApXG4vLyBEaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIHNvZnR3YXJlIGxpY2Vuc2UsIHNlZSB0aGUgYWNjb21wYW55aW5nXG4vLyBmaWxlIExJQ0VOU0Ugb3IgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHAuXG5mdW5jdGlvbiBiYXNlIChBTFBIQUJFVCkge1xuICBpZiAoQUxQSEFCRVQubGVuZ3RoID49IDI1NSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdBbHBoYWJldCB0b28gbG9uZycpIH1cbiAgY29uc3QgQkFTRV9NQVAgPSBuZXcgVWludDhBcnJheSgyNTYpXG4gIGZvciAobGV0IGogPSAwOyBqIDwgQkFTRV9NQVAubGVuZ3RoOyBqKyspIHtcbiAgICBCQVNFX01BUFtqXSA9IDI1NVxuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgQUxQSEFCRVQubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB4ID0gQUxQSEFCRVQuY2hhckF0KGkpXG4gICAgY29uc3QgeGMgPSB4LmNoYXJDb2RlQXQoMClcbiAgICBpZiAoQkFTRV9NQVBbeGNdICE9PSAyNTUpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcih4ICsgJyBpcyBhbWJpZ3VvdXMnKSB9XG4gICAgQkFTRV9NQVBbeGNdID0gaVxuICB9XG4gIGNvbnN0IEJBU0UgPSBBTFBIQUJFVC5sZW5ndGhcbiAgY29uc3QgTEVBREVSID0gQUxQSEFCRVQuY2hhckF0KDApXG4gIGNvbnN0IEZBQ1RPUiA9IE1hdGgubG9nKEJBU0UpIC8gTWF0aC5sb2coMjU2KSAvLyBsb2coQkFTRSkgLyBsb2coMjU2KSwgcm91bmRlZCB1cFxuICBjb25zdCBpRkFDVE9SID0gTWF0aC5sb2coMjU2KSAvIE1hdGgubG9nKEJBU0UpIC8vIGxvZygyNTYpIC8gbG9nKEJBU0UpLCByb3VuZGVkIHVwXG4gIGZ1bmN0aW9uIGVuY29kZSAoc291cmNlKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWVtcHR5XG4gICAgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHsgfSBlbHNlIGlmIChBcnJheUJ1ZmZlci5pc1ZpZXcoc291cmNlKSkge1xuICAgICAgc291cmNlID0gbmV3IFVpbnQ4QXJyYXkoc291cmNlLmJ1ZmZlciwgc291cmNlLmJ5dGVPZmZzZXQsIHNvdXJjZS5ieXRlTGVuZ3RoKVxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICBzb3VyY2UgPSBVaW50OEFycmF5LmZyb20oc291cmNlKVxuICAgIH1cbiAgICBpZiAoIShzb3VyY2UgaW5zdGFuY2VvZiBVaW50OEFycmF5KSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBVaW50OEFycmF5JykgfVxuICAgIGlmIChzb3VyY2UubGVuZ3RoID09PSAwKSB7IHJldHVybiAnJyB9XG4gICAgLy8gU2tpcCAmIGNvdW50IGxlYWRpbmcgemVyb2VzLlxuICAgIGxldCB6ZXJvZXMgPSAwXG4gICAgbGV0IGxlbmd0aCA9IDBcbiAgICBsZXQgcGJlZ2luID0gMFxuICAgIGNvbnN0IHBlbmQgPSBzb3VyY2UubGVuZ3RoXG4gICAgd2hpbGUgKHBiZWdpbiAhPT0gcGVuZCAmJiBzb3VyY2VbcGJlZ2luXSA9PT0gMCkge1xuICAgICAgcGJlZ2luKytcbiAgICAgIHplcm9lcysrXG4gICAgfVxuICAgIC8vIEFsbG9jYXRlIGVub3VnaCBzcGFjZSBpbiBiaWctZW5kaWFuIGJhc2U1OCByZXByZXNlbnRhdGlvbi5cbiAgICBjb25zdCBzaXplID0gKChwZW5kIC0gcGJlZ2luKSAqIGlGQUNUT1IgKyAxKSA+Pj4gMFxuICAgIGNvbnN0IGI1OCA9IG5ldyBVaW50OEFycmF5KHNpemUpXG4gICAgLy8gUHJvY2VzcyB0aGUgYnl0ZXMuXG4gICAgd2hpbGUgKHBiZWdpbiAhPT0gcGVuZCkge1xuICAgICAgbGV0IGNhcnJ5ID0gc291cmNlW3BiZWdpbl1cbiAgICAgIC8vIEFwcGx5IFwiYjU4ID0gYjU4ICogMjU2ICsgY2hcIi5cbiAgICAgIGxldCBpID0gMFxuICAgICAgZm9yIChsZXQgaXQxID0gc2l6ZSAtIDE7IChjYXJyeSAhPT0gMCB8fCBpIDwgbGVuZ3RoKSAmJiAoaXQxICE9PSAtMSk7IGl0MS0tLCBpKyspIHtcbiAgICAgICAgY2FycnkgKz0gKDI1NiAqIGI1OFtpdDFdKSA+Pj4gMFxuICAgICAgICBiNThbaXQxXSA9IChjYXJyeSAlIEJBU0UpID4+PiAwXG4gICAgICAgIGNhcnJ5ID0gKGNhcnJ5IC8gQkFTRSkgPj4+IDBcbiAgICAgIH1cbiAgICAgIGlmIChjYXJyeSAhPT0gMCkgeyB0aHJvdyBuZXcgRXJyb3IoJ05vbi16ZXJvIGNhcnJ5JykgfVxuICAgICAgbGVuZ3RoID0gaVxuICAgICAgcGJlZ2luKytcbiAgICB9XG4gICAgLy8gU2tpcCBsZWFkaW5nIHplcm9lcyBpbiBiYXNlNTggcmVzdWx0LlxuICAgIGxldCBpdDIgPSBzaXplIC0gbGVuZ3RoXG4gICAgd2hpbGUgKGl0MiAhPT0gc2l6ZSAmJiBiNThbaXQyXSA9PT0gMCkge1xuICAgICAgaXQyKytcbiAgICB9XG4gICAgLy8gVHJhbnNsYXRlIHRoZSByZXN1bHQgaW50byBhIHN0cmluZy5cbiAgICBsZXQgc3RyID0gTEVBREVSLnJlcGVhdCh6ZXJvZXMpXG4gICAgZm9yICg7IGl0MiA8IHNpemU7ICsraXQyKSB7IHN0ciArPSBBTFBIQUJFVC5jaGFyQXQoYjU4W2l0Ml0pIH1cbiAgICByZXR1cm4gc3RyXG4gIH1cbiAgZnVuY3Rpb24gZGVjb2RlVW5zYWZlIChzb3VyY2UpIHtcbiAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ3N0cmluZycpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgU3RyaW5nJykgfVxuICAgIGlmIChzb3VyY2UubGVuZ3RoID09PSAwKSB7IHJldHVybiBuZXcgVWludDhBcnJheSgpIH1cbiAgICBsZXQgcHN6ID0gMFxuICAgIC8vIFNraXAgYW5kIGNvdW50IGxlYWRpbmcgJzEncy5cbiAgICBsZXQgemVyb2VzID0gMFxuICAgIGxldCBsZW5ndGggPSAwXG4gICAgd2hpbGUgKHNvdXJjZVtwc3pdID09PSBMRUFERVIpIHtcbiAgICAgIHplcm9lcysrXG4gICAgICBwc3orK1xuICAgIH1cbiAgICAvLyBBbGxvY2F0ZSBlbm91Z2ggc3BhY2UgaW4gYmlnLWVuZGlhbiBiYXNlMjU2IHJlcHJlc2VudGF0aW9uLlxuICAgIGNvbnN0IHNpemUgPSAoKChzb3VyY2UubGVuZ3RoIC0gcHN6KSAqIEZBQ1RPUikgKyAxKSA+Pj4gMCAvLyBsb2coNTgpIC8gbG9nKDI1NiksIHJvdW5kZWQgdXAuXG4gICAgY29uc3QgYjI1NiA9IG5ldyBVaW50OEFycmF5KHNpemUpXG4gICAgLy8gUHJvY2VzcyB0aGUgY2hhcmFjdGVycy5cbiAgICB3aGlsZSAoc291cmNlW3Bzel0pIHtcbiAgICAgIC8vIERlY29kZSBjaGFyYWN0ZXJcbiAgICAgIGxldCBjYXJyeSA9IEJBU0VfTUFQW3NvdXJjZS5jaGFyQ29kZUF0KHBzeildXG4gICAgICAvLyBJbnZhbGlkIGNoYXJhY3RlclxuICAgICAgaWYgKGNhcnJ5ID09PSAyNTUpIHsgcmV0dXJuIH1cbiAgICAgIGxldCBpID0gMFxuICAgICAgZm9yIChsZXQgaXQzID0gc2l6ZSAtIDE7IChjYXJyeSAhPT0gMCB8fCBpIDwgbGVuZ3RoKSAmJiAoaXQzICE9PSAtMSk7IGl0My0tLCBpKyspIHtcbiAgICAgICAgY2FycnkgKz0gKEJBU0UgKiBiMjU2W2l0M10pID4+PiAwXG4gICAgICAgIGIyNTZbaXQzXSA9IChjYXJyeSAlIDI1NikgPj4+IDBcbiAgICAgICAgY2FycnkgPSAoY2FycnkgLyAyNTYpID4+PiAwXG4gICAgICB9XG4gICAgICBpZiAoY2FycnkgIT09IDApIHsgdGhyb3cgbmV3IEVycm9yKCdOb24temVybyBjYXJyeScpIH1cbiAgICAgIGxlbmd0aCA9IGlcbiAgICAgIHBzeisrXG4gICAgfVxuICAgIC8vIFNraXAgbGVhZGluZyB6ZXJvZXMgaW4gYjI1Ni5cbiAgICBsZXQgaXQ0ID0gc2l6ZSAtIGxlbmd0aFxuICAgIHdoaWxlIChpdDQgIT09IHNpemUgJiYgYjI1NltpdDRdID09PSAwKSB7XG4gICAgICBpdDQrK1xuICAgIH1cbiAgICBjb25zdCB2Y2ggPSBuZXcgVWludDhBcnJheSh6ZXJvZXMgKyAoc2l6ZSAtIGl0NCkpXG4gICAgbGV0IGogPSB6ZXJvZXNcbiAgICB3aGlsZSAoaXQ0ICE9PSBzaXplKSB7XG4gICAgICB2Y2hbaisrXSA9IGIyNTZbaXQ0KytdXG4gICAgfVxuICAgIHJldHVybiB2Y2hcbiAgfVxuICBmdW5jdGlvbiBkZWNvZGUgKHN0cmluZykge1xuICAgIGNvbnN0IGJ1ZmZlciA9IGRlY29kZVVuc2FmZShzdHJpbmcpXG4gICAgaWYgKGJ1ZmZlcikgeyByZXR1cm4gYnVmZmVyIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vbi1iYXNlJyArIEJBU0UgKyAnIGNoYXJhY3RlcicpXG4gIH1cbiAgcmV0dXJuIHtcbiAgICBlbmNvZGUsXG4gICAgZGVjb2RlVW5zYWZlLFxuICAgIGRlY29kZVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBiYXNlXG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/base-x@5.0.0/node_modules/base-x/src/esm/index.js\n");

/***/ })

};
;