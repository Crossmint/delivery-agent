"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@goat-sdk+wallet-solana@0.2.13_@goat-sdk+core@0.4.6_zod@3.23.8__@solana+web3.js@1.95.8_buffer_g2v5gffd5qyvxourveycggr74e";
exports.ids = ["vendor-chunks/@goat-sdk+wallet-solana@0.2.13_@goat-sdk+core@0.4.6_zod@3.23.8__@solana+web3.js@1.95.8_buffer_g2v5gffd5qyvxourveycggr74e"];
exports.modules = {

/***/ "(rsc)/./node_modules/.pnpm/@goat-sdk+wallet-solana@0.2.13_@goat-sdk+core@0.4.6_zod@3.23.8__@solana+web3.js@1.95.8_buffer_g2v5gffd5qyvxourveycggr74e/node_modules/@goat-sdk/wallet-solana/dist/chunk-2PHMAGLI.mjs":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@goat-sdk+wallet-solana@0.2.13_@goat-sdk+core@0.4.6_zod@3.23.8__@solana+web3.js@1.95.8_buffer_g2v5gffd5qyvxourveycggr74e/node_modules/@goat-sdk/wallet-solana/dist/chunk-2PHMAGLI.mjs ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   a: () => (/* binding */ l)\n/* harmony export */ });\n/* harmony import */ var _chunk_YSXGDEY5_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chunk-YSXGDEY5.mjs */ \"(rsc)/./node_modules/.pnpm/@goat-sdk+wallet-solana@0.2.13_@goat-sdk+core@0.4.6_zod@3.23.8__@solana+web3.js@1.95.8_buffer_g2v5gffd5qyvxourveycggr74e/node_modules/@goat-sdk/wallet-solana/dist/chunk-YSXGDEY5.mjs\");\n/* harmony import */ var _goat_sdk_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @goat-sdk/core */ \"(rsc)/./node_modules/.pnpm/@goat-sdk+core@0.4.6_zod@3.23.8/node_modules/@goat-sdk/core/dist/chunk-N6ZU3WNV.mjs\");\n/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @solana/web3.js */ \"(rsc)/./node_modules/.pnpm/@solana+web3.js@1.95.8_bufferutil@4.0.9_utf-8-validate@5.0.10/node_modules/@solana/web3.js/lib/index.esm.js\");\n/* harmony import */ var viem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! viem */ \"(rsc)/./node_modules/.pnpm/viem@2.21.49_bufferutil@4.0.9_typescript@5.7.3_utf-8-validate@5.0.10_zod@3.23.8/node_modules/viem/_esm/utils/unit/formatUnits.js\");\nvar l=class extends _goat_sdk_core__WEBPACK_IMPORTED_MODULE_1__.a{static{(0,_chunk_YSXGDEY5_mjs__WEBPACK_IMPORTED_MODULE_2__.a)(this,\"SolanaWalletClient\")}connection;constructor(e){super(),this.connection=e.connection}getChain(){return{type:\"solana\"}}getConnection(){return this.connection}async balanceOf(e){let s=new _solana_web3_js__WEBPACK_IMPORTED_MODULE_0__.PublicKey(e),o=await this.connection.getBalance(s);return{decimals:9,symbol:\"SOL\",name:\"Solana\",value:(0,viem__WEBPACK_IMPORTED_MODULE_3__.formatUnits)(BigInt(o),9),inBaseUnits:o.toString()}}async decompileVersionedTransactionToInstructions(e){let s=e.message.addressTableLookups.map(n=>n.accountKey),c={addressLookupTableAccounts:(await Promise.all(s.map(n=>this.connection.getAddressLookupTable(n).then(a=>a.value)))).filter(n=>n!=null)};return _solana_web3_js__WEBPACK_IMPORTED_MODULE_0__.TransactionMessage.decompile(e.message,c).instructions}async getAddressLookupTableAccounts(e){return(await this.connection.getMultipleAccountsInfo(e.map(o=>new _solana_web3_js__WEBPACK_IMPORTED_MODULE_0__.PublicKey(o)))).reduce((o,t,c)=>{let n=e[c];if(t){let a=new _solana_web3_js__WEBPACK_IMPORTED_MODULE_0__.AddressLookupTableAccount({key:new _solana_web3_js__WEBPACK_IMPORTED_MODULE_0__.PublicKey(n),state:_solana_web3_js__WEBPACK_IMPORTED_MODULE_0__.AddressLookupTableAccount.deserialize(t.data)});o.push(a)}return o},new Array)}};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vQGdvYXQtc2RrK3dhbGxldC1zb2xhbmFAMC4yLjEzX0Bnb2F0LXNkaytjb3JlQDAuNC42X3pvZEAzLjIzLjhfX0Bzb2xhbmErd2ViMy5qc0AxLjk1LjhfYnVmZmVyX2cydjVnZmZkNXF5dnhvdXJ2ZXljZ2dyNzRlL25vZGVfbW9kdWxlcy9AZ29hdC1zZGsvd2FsbGV0LXNvbGFuYS9kaXN0L2NodW5rLTJQSE1BR0xJLm1qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFpTyxvQkFBb0IsNkNBQUMsQ0FBQyxPQUFPLHNEQUFDLDRCQUE0QixXQUFXLGVBQWUscUNBQXFDLFdBQVcsT0FBTyxlQUFlLGdCQUFnQix1QkFBdUIsbUJBQW1CLFVBQVUsc0RBQUMsMENBQTBDLE9BQU8sNENBQTRDLGlEQUFDLHdDQUF3QyxxREFBcUQsNERBQTRELHdJQUF3SSxPQUFPLCtEQUFDLHFDQUFxQyx1Q0FBdUMsa0VBQWtFLHNEQUFDLHdCQUF3QixXQUFXLE1BQU0sVUFBVSxzRUFBQyxFQUFFLFFBQVEsc0RBQUMsVUFBVSxzRUFBQyxxQkFBcUIsRUFBRSxVQUFVLFNBQVMsY0FBNkIiLCJzb3VyY2VzIjpbIi9Vc2Vycy9maWxpcHBvc2x5bXBlcm9wb3Vsb3MvRG9jdW1lbnRzL0Nyb3NzbWludC9nb2F0LW10bmRhby12Mi9ub2RlX21vZHVsZXMvLnBucG0vQGdvYXQtc2RrK3dhbGxldC1zb2xhbmFAMC4yLjEzX0Bnb2F0LXNkaytjb3JlQDAuNC42X3pvZEAzLjIzLjhfX0Bzb2xhbmErd2ViMy5qc0AxLjk1LjhfYnVmZmVyX2cydjVnZmZkNXF5dnhvdXJ2ZXljZ2dyNzRlL25vZGVfbW9kdWxlcy9AZ29hdC1zZGsvd2FsbGV0LXNvbGFuYS9kaXN0L2NodW5rLTJQSE1BR0xJLm1qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnR7YSBhcyB1fWZyb21cIi4vY2h1bmstWVNYR0RFWTUubWpzXCI7aW1wb3J0e1dhbGxldENsaWVudEJhc2UgYXMgZH1mcm9tXCJAZ29hdC1zZGsvY29yZVwiO2ltcG9ydHtBZGRyZXNzTG9va3VwVGFibGVBY2NvdW50IGFzIGksUHVibGljS2V5IGFzIHIsVHJhbnNhY3Rpb25NZXNzYWdlIGFzIHB9ZnJvbVwiQHNvbGFuYS93ZWIzLmpzXCI7aW1wb3J0e2Zvcm1hdFVuaXRzIGFzIEF9ZnJvbVwidmllbVwiO3ZhciBsPWNsYXNzIGV4dGVuZHMgZHtzdGF0aWN7dSh0aGlzLFwiU29sYW5hV2FsbGV0Q2xpZW50XCIpfWNvbm5lY3Rpb247Y29uc3RydWN0b3IoZSl7c3VwZXIoKSx0aGlzLmNvbm5lY3Rpb249ZS5jb25uZWN0aW9ufWdldENoYWluKCl7cmV0dXJue3R5cGU6XCJzb2xhbmFcIn19Z2V0Q29ubmVjdGlvbigpe3JldHVybiB0aGlzLmNvbm5lY3Rpb259YXN5bmMgYmFsYW5jZU9mKGUpe2xldCBzPW5ldyByKGUpLG89YXdhaXQgdGhpcy5jb25uZWN0aW9uLmdldEJhbGFuY2Uocyk7cmV0dXJue2RlY2ltYWxzOjksc3ltYm9sOlwiU09MXCIsbmFtZTpcIlNvbGFuYVwiLHZhbHVlOkEoQmlnSW50KG8pLDkpLGluQmFzZVVuaXRzOm8udG9TdHJpbmcoKX19YXN5bmMgZGVjb21waWxlVmVyc2lvbmVkVHJhbnNhY3Rpb25Ub0luc3RydWN0aW9ucyhlKXtsZXQgcz1lLm1lc3NhZ2UuYWRkcmVzc1RhYmxlTG9va3Vwcy5tYXAobj0+bi5hY2NvdW50S2V5KSxjPXthZGRyZXNzTG9va3VwVGFibGVBY2NvdW50czooYXdhaXQgUHJvbWlzZS5hbGwocy5tYXAobj0+dGhpcy5jb25uZWN0aW9uLmdldEFkZHJlc3NMb29rdXBUYWJsZShuKS50aGVuKGE9PmEudmFsdWUpKSkpLmZpbHRlcihuPT5uIT1udWxsKX07cmV0dXJuIHAuZGVjb21waWxlKGUubWVzc2FnZSxjKS5pbnN0cnVjdGlvbnN9YXN5bmMgZ2V0QWRkcmVzc0xvb2t1cFRhYmxlQWNjb3VudHMoZSl7cmV0dXJuKGF3YWl0IHRoaXMuY29ubmVjdGlvbi5nZXRNdWx0aXBsZUFjY291bnRzSW5mbyhlLm1hcChvPT5uZXcgcihvKSkpKS5yZWR1Y2UoKG8sdCxjKT0+e2xldCBuPWVbY107aWYodCl7bGV0IGE9bmV3IGkoe2tleTpuZXcgcihuKSxzdGF0ZTppLmRlc2VyaWFsaXplKHQuZGF0YSl9KTtvLnB1c2goYSl9cmV0dXJuIG99LG5ldyBBcnJheSl9fTtleHBvcnR7bCBhcyBhfTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/@goat-sdk+wallet-solana@0.2.13_@goat-sdk+core@0.4.6_zod@3.23.8__@solana+web3.js@1.95.8_buffer_g2v5gffd5qyvxourveycggr74e/node_modules/@goat-sdk/wallet-solana/dist/chunk-2PHMAGLI.mjs\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/@goat-sdk+wallet-solana@0.2.13_@goat-sdk+core@0.4.6_zod@3.23.8__@solana+web3.js@1.95.8_buffer_g2v5gffd5qyvxourveycggr74e/node_modules/@goat-sdk/wallet-solana/dist/chunk-YSXGDEY5.mjs":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@goat-sdk+wallet-solana@0.2.13_@goat-sdk+core@0.4.6_zod@3.23.8__@solana+web3.js@1.95.8_buffer_g2v5gffd5qyvxourveycggr74e/node_modules/@goat-sdk/wallet-solana/dist/chunk-YSXGDEY5.mjs ***!
  \******************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   a: () => (/* binding */ d)\n/* harmony export */ });\nvar c=Object.defineProperty;var d=(a,b)=>c(a,\"name\",{value:b,configurable:!0});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vQGdvYXQtc2RrK3dhbGxldC1zb2xhbmFAMC4yLjEzX0Bnb2F0LXNkaytjb3JlQDAuNC42X3pvZEAzLjIzLjhfX0Bzb2xhbmErd2ViMy5qc0AxLjk1LjhfYnVmZmVyX2cydjVnZmZkNXF5dnhvdXJ2ZXljZ2dyNzRlL25vZGVfbW9kdWxlcy9AZ29hdC1zZGsvd2FsbGV0LXNvbGFuYS9kaXN0L2NodW5rLVlTWEdERVk1Lm1qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQUEsNEJBQTRCLHlCQUF5Qix3QkFBd0IsRUFBaUIiLCJzb3VyY2VzIjpbIi9Vc2Vycy9maWxpcHBvc2x5bXBlcm9wb3Vsb3MvRG9jdW1lbnRzL0Nyb3NzbWludC9nb2F0LW10bmRhby12Mi9ub2RlX21vZHVsZXMvLnBucG0vQGdvYXQtc2RrK3dhbGxldC1zb2xhbmFAMC4yLjEzX0Bnb2F0LXNkaytjb3JlQDAuNC42X3pvZEAzLjIzLjhfX0Bzb2xhbmErd2ViMy5qc0AxLjk1LjhfYnVmZmVyX2cydjVnZmZkNXF5dnhvdXJ2ZXljZ2dyNzRlL25vZGVfbW9kdWxlcy9AZ29hdC1zZGsvd2FsbGV0LXNvbGFuYS9kaXN0L2NodW5rLVlTWEdERVk1Lm1qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgYz1PYmplY3QuZGVmaW5lUHJvcGVydHk7dmFyIGQ9KGEsYik9PmMoYSxcIm5hbWVcIix7dmFsdWU6Yixjb25maWd1cmFibGU6ITB9KTtleHBvcnR7ZCBhcyBhfTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/@goat-sdk+wallet-solana@0.2.13_@goat-sdk+core@0.4.6_zod@3.23.8__@solana+web3.js@1.95.8_buffer_g2v5gffd5qyvxourveycggr74e/node_modules/@goat-sdk/wallet-solana/dist/chunk-YSXGDEY5.mjs\n");

/***/ })

};
;