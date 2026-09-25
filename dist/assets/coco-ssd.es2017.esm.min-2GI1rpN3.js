import{g as uo,c as pt,a as cs}from"./index-Cc_8oo0X.js";function lo(t,e){for(var n=0;n<e.length;n++){const r=e[n];if(typeof r!="string"&&!Array.isArray(r)){for(const s in r)if(s!=="default"&&!(s in t)){const a=Object.getOwnPropertyDescriptor(r,s);a&&Object.defineProperty(t,s,a.get?a:{enumerable:!0,get:()=>r[s]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}var Or={exports:{}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Up=1e-7,qp=1e-4;class Gp{constructor(e,n){this.backend=e,this.dataMover=n,this.data=new WeakMap,this.dataIdsCount=0}get(e){return this.data.has(e)||this.dataMover.moveData(this.backend,e),this.data.get(e)}set(e,n){this.dataIdsCount++,this.data.set(e,n)}has(e){return this.data.has(e)}delete(e){return this.dataIdsCount--,this.data.delete(e)}numDataIds(){return this.dataIdsCount}}class co{refCount(e){return de("refCount")}incRef(e){return de("incRef")}timerAvailable(){return!0}time(e){return de("time")}read(e){return de("read")}readSync(e){return de("readSync")}readToGPU(e,n){return de("readToGPU")}numDataIds(){return de("numDataIds")}disposeData(e,n){return de("disposeData")}write(e,n,r){return de("write")}move(e,n,r,s,a){return de("move")}createTensorFromGPUData(e,n,r){return de("createTensorFromGPUData")}memory(){return de("memory")}floatPrecision(){return de("floatPrecision")}epsilon(){return this.floatPrecision()===32?Up:qp}dispose(){return de("dispose")}}function de(t){throw new Error(`'${t}' not yet implemented or not found in the registry. This kernel may not be supported by the tfjs backend you have chosen`)}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ho(t){let e=t.length,n=0;for(;e>0;)n=Math.random()*e|0,e--,qn(t,e,n)}function Hp(t,e){if(t.length!==e.length)throw new Error(`Array sizes must match to be shuffled together First array length was ${t.length}Second array length was ${e.length}`);let n=t.length,r=0;for(;n>0;)r=Math.random()*n|0,n--,qn(t,n,r),qn(e,n,r)}function hn(t,e,n){return Math.max(t,Math.min(e,n))}function Kp(t){return t%2===0?t:t+1}function qn(t,e,n){const r=t[e];t[e]=t[n],t[n]=r}function Xp(t){let e=0;for(let n=0;n<t.length;n++)e+=t[n];return e}function Zp(t,e){const n=Math.random();return e*n+(1-n)*t}function Jp(t,e){let n=0;for(let r=0;r<t.length;r++){const s=Number(t[r])-Number(e[r]);n+=s*s}return n}function g(t,e){if(!t)throw new Error(typeof e=="string"?e:e())}function fe(t,e,n=""){g(Re(t,e),()=>n+` Shapes ${t} and ${e} must match`)}function Ft(t){g(t!=null,()=>"The input to the tensor constructor must be a non-null value.")}function W(t){if(t.length===0)return 1;let e=t[0];for(let n=1;n<t.length;n++)e*=t[n];return e}function Yp(t){return t.length===0}function po(t,e){if(t===e)return!0;if(t==null||e==null||t.length!==e.length)return!1;for(let n=0;n<t.length;n++)if(t[n]!==null&&e[n]!==null&&t[n]!==e[n])return!1;return!0}function Re(t,e){if(t===e)return!0;if(t==null||e==null||t.length!==e.length)return!1;for(let n=0;n<t.length;n++)if(t[n]!==e[n])return!1;return!0}function qt(t){return t%1===0}function Qp(t){if(Math.tanh!=null)return Math.tanh(t);if(t===1/0)return 1;if(t===-1/0)return-1;{const e=Math.exp(2*t);return(e-1)/(e+1)}}function ef(t){const e=Math.ceil(Math.sqrt(t));return[e,Math.ceil(t/e)]}function tf(t){const e=new Uint32Array(t);for(let n=0;n<t;++n)e[n]=n;return ho(e),e}function ln(t,e){return e<=t.length?t:t+" ".repeat(e-t.length)}function nf(t,e=s=>0,n,r){return new Promise((s,a)=>{let o=0;const i=()=>{if(t()){s();return}o++;const u=e(o);if(n!=null&&o>=n){a();return}r!=null?r(i,u):setTimeout(i,u)};i()})}function rf(t,e){let n=1,r=-1;for(let a=0;a<t.length;++a)if(t[a]>=0)n*=t[a];else if(t[a]===-1){if(r!==-1)throw Error(`Shapes can only have 1 implicit size. Found -1 at dim ${r} and dim ${a}`);r=a}else if(t[a]<0)throw Error(`Shapes can not be < 0. Found ${t[a]} at dim ${a}`);if(r===-1){if(e>0&&e!==n)throw Error(`Size(${e}) must match the product of shape ${t}`);return t}if(n===0)throw Error(`Cannot infer the missing size in [${t}] when there are 0 elements`);if(e%n!==0)throw Error(`The implicit shape can't be a fractional number. Got ${e} / ${n}`);const s=t.slice();return s[r]=e/n,s}function kn(t,e){const n=e.length;return t=t==null?e.map((r,s)=>s):[].concat(t),g(t.every(r=>r>=-n&&r<n),()=>`All values in axis param must be in range [-${n}, ${n}) but got axis ${t}`),g(t.every(r=>qt(r)),()=>`All values in axis param must be integers but got axis ${t}`),t.map(r=>r<0?n+r:r)}function fo(t,e){const n=[],r=[],s=e!=null&&Array.isArray(e)&&e.length===0,a=e==null||s?null:kn(e,t).sort();let o=0;for(let i=0;i<t.length;++i){if(a!=null){if(a[o]===i&&t[i]!==1)throw new Error(`Can't squeeze axis ${i} since its dim '${t[i]}' is not 1`);(a[o]==null||a[o]>i)&&t[i]===1&&(n.push(t[i]),r.push(i)),a[o]<=i&&o++}t[i]!==1&&(n.push(t[i]),r.push(i))}return{newShape:n,keptDims:r}}function mo(t,e){return hs(t,e)}function hs(t,e){let n=null;if(t==null||t==="float32")n=new Float32Array(e);else if(t==="int32")n=new Int32Array(e);else if(t==="bool")n=new Uint8Array(e);else if(t==="string")n=new Array(e);else throw new Error(`Unknown data type ${t}`);return n}function go(t,e){for(let n=0;n<t.length;n++){const r=t[n];if(isNaN(r)||!isFinite(r))throw Error(`A tensor of type ${e} being uploaded contains ${r}.`)}}function yo(t){return t==="bool"||t==="complex64"||t==="float32"||t==="int32"||t==="string"}function sf(t,e){return!(e==="complex64"||e==="float32"&&t!=="complex64"||e==="int32"&&t!=="float32"&&t!=="complex64"||e==="bool"&&t==="bool")}function Gn(t){if(t==="float32"||t==="int32")return 4;if(t==="complex64")return 8;if(t==="bool")return 1;throw new Error(`Unknown dtype ${t}`)}function bo(t){if(t==null)return 0;let e=0;return t.forEach(n=>e+=n.length),e}function nt(t){return typeof t=="string"||t instanceof String}function wo(t){return typeof t=="boolean"}function No(t){return typeof t=="number"}function _n(t){return Array.isArray(t)?_n(t[0]):t instanceof Float32Array?"float32":t instanceof Int32Array||t instanceof Uint8Array||t instanceof Uint8ClampedArray?"int32":No(t)?"float32":nt(t)?"string":wo(t)?"bool":"float32"}function ot(t){return!!(t&&t.constructor&&t.call&&t.apply)}function Hn(t,e){for(let n=e;n<t;++n)if(t%n===0)return n;return t}function en(t){const e=t.length;if(e<2)return[];const n=new Array(e-1);n[e-2]=t[e-1];for(let r=e-3;r>=0;--r)n[r]=n[r+1]*t[r+1];return n}function So(t,e,n,r=!1){const s=new Array;if(e.length===1){const a=e[0]*(r?2:1);for(let o=0;o<a;o++)s[o]=n[t+o]}else{const a=e[0],o=e.slice(1),i=o.reduce((u,l)=>u*l)*(r?2:1);for(let u=0;u<a;u++)s[u]=So(t+u*i,o,n,r)}return s}function $t(t,e,n=!1){if(t.length===0)return e[0];const r=t.reduce((s,a)=>s*a)*(n?2:1);if(r===0)return[];if(r!==e.length)throw new Error(`[${t}] does not match the input size ${e.length}${n?" for a complex tensor":""}.`);return So(0,t,e,n)}function af(t,e){if(Array.isArray(t))return t;if(e==="float32")return t instanceof Float32Array?t:new Float32Array(t);if(e==="int32")return t instanceof Int32Array?t:new Int32Array(t);if(e==="bool"||e==="string")return Uint8Array.from(new Int32Array(t));throw new Error(`Unknown dtype ${e}`)}function ps(t,e){const n=or(t,e);for(let r=0;r<n.length;r++)n[r]=1;return n}function or(t,e){if(e==null||e==="float32"||e==="complex64")return new Float32Array(t);if(e==="int32")return new Int32Array(t);if(e==="bool")return new Uint8Array(t);throw new Error(`Unknown data type ${e}`)}function of(t,e){const n=t.reduce((r,s)=>r*s,1);if(e==null||e==="float32")return $t(t,new Float32Array(n));if(e==="int32")return $t(t,new Int32Array(n));if(e==="bool")return $t(t,new Uint8Array(n));throw new Error(`Unknown data type ${e}`)}function Se(t){t.forEach(e=>{g(Number.isInteger(e)&&e>=0,()=>`Tensor must have a shape comprised of positive integers but got shape [${t}].`)})}function uf(t,e,n){if(e===0)return 0;if(e===1)return t[0];let r=t[t.length-1];for(let s=0;s<t.length-1;++s)r+=n[s]*t[s];return r}function lf(t,e,n){if(e===0)return[];if(e===1)return[t];const r=new Array(e);for(let s=0;s<r.length-1;++s)r[s]=Math.floor(t/n[s]),t-=r[s]*n[s];return r[r.length-1]=t,r}function it(t){return t&&t.then&&typeof t.then=="function"}/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Da="tfjsflags";class To{constructor(e){this.global=e,this.flags={},this.flagRegistry={},this.urlFlags={},this.getQueryParams=cf,this.populateURLFlags()}setPlatform(e,n){this.platform!=null&&(R().getBool("IS_TEST")||R().getBool("PROD")||console.warn(`Platform ${this.platformName} has already been set. Overwriting the platform with ${e}.`)),this.platformName=e,this.platform=n}registerFlag(e,n,r){if(this.flagRegistry[e]={evaluationFn:n,setHook:r},this.urlFlags[e]!=null){const s=this.urlFlags[e];R().getBool("IS_TEST")||R().getBool("PROD")||console.warn(`Setting feature override from URL ${e}: ${s}.`),this.set(e,s)}}async getAsync(e){return e in this.flags?this.flags[e]:(this.flags[e]=await this.evaluateFlag(e),this.flags[e])}get(e){if(e in this.flags)return this.flags[e];const n=this.evaluateFlag(e);if(it(n))throw new Error(`Flag ${e} cannot be synchronously evaluated. Please use getAsync() instead.`);return this.flags[e]=n,this.flags[e]}getNumber(e){return this.get(e)}getBool(e){return this.get(e)}getString(e){return this.get(e)}getFlags(){return this.flags}get features(){return this.flags}set(e,n){if(this.flagRegistry[e]==null)throw new Error(`Cannot set flag ${e} as it has not been registered.`);this.flags[e]=n,this.flagRegistry[e].setHook!=null&&this.flagRegistry[e].setHook(n)}evaluateFlag(e){if(this.flagRegistry[e]==null)throw new Error(`Cannot evaluate flag '${e}': no evaluation function found.`);return this.flagRegistry[e].evaluationFn()}setFlags(e){this.flags=Object.assign({},e)}reset(){this.flags={},this.urlFlags={},this.populateURLFlags()}populateURLFlags(){if(typeof this.global>"u"||typeof this.global.location>"u"||typeof this.global.location.search>"u")return;const e=this.getQueryParams(this.global.location.search);Da in e&&e[Da].split(",").forEach(r=>{const[s,a]=r.split(":");this.urlFlags[s]=pf(s,a)})}}function cf(t){const e={};return t.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,(n,...r)=>(hf(e,r[0],r[1]),r.join("="))),e}function hf(t,e,n){t[decodeURIComponent(e)]=decodeURIComponent(n||"")}function pf(t,e){const n=e.toLowerCase();return n==="true"||n==="false"?n==="true":`${+n}`===n?+n:e}function R(){return fs}let fs=null;function ff(t){fs=t}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let Er;function $o(){if(Er==null){let t;if(typeof window<"u")t=window;else if(typeof global<"u")t=global;else if(typeof process<"u")t=process;else if(typeof self<"u")t=self;else throw new Error("Could not find a global object");Er=t}return Er}function mf(){const t=$o();return t._tfGlobals==null&&(t._tfGlobals=new Map),t._tfGlobals}function ms(t,e){const n=mf();if(n.has(t))return n.get(t);{const r=e();return n.set(t,r),n.get(t)}}const Eo="Abs",ko="Acos",_o="Acosh",ds="Add",vo="AddN",Io="All",xo="Any",Ao="ArgMax",Oo="ArgMin",Do="Asin",Fo="Asinh",Co="Atan",Ro="Atanh",Po="Atan2",Bo="AvgPool",df="AvgPoolGrad",Lo="AvgPool3D",gf="AvgPool3DGrad",zo="BatchMatMul",Vo="BatchToSpaceND",jo="Bincount",Mo="BitwiseAnd",yf="BroadcastTo",Wo="BroadcastArgs",gs="Cast",Uo="Ceil",qo="ClipByValue",Go="Complex",Ho="ComplexAbs",Ko="Concat",Xo="Conv2D",Zo="Conv2DBackpropFilter",Jo="Conv2DBackpropInput",Yo="Conv3D",bf="Conv3DBackpropFilterV2",Qo="Conv3DBackpropInputV2",ei="Cos",ti="Cosh",ni="Cumprod",ri="Cumsum",si="CropAndResize",ai="DenseBincount",oi="DepthToSpace",ii="DepthwiseConv2dNative",ui="DepthwiseConv2dNativeBackpropFilter",li="DepthwiseConv2dNativeBackpropInput",ci="Diag",hi="Dilation2D",wf="Dilation2DBackpropInput",Nf="Dilation2DBackpropFilter",ys="Draw",pi="RealDiv",fi="Einsum",mi="Elu",Sf="EluGrad",di="Erf",gi="Equal",yi="Exp",bi="ExpandDims",wi="Expm1",Ni="FFT",Si="Fill",Ti="FlipLeftRight",$i="Floor",Ei="FloorDiv",ki="FusedBatchNorm",_i="GatherV2",vi="GatherNd",Ii="Greater",xi="GreaterEqual",bs="Identity",Ai="IFFT",Oi="Imag",Di="IsFinite",Fi="IsInf",Ci="IsNan",Ri="LeakyRelu",Pi="Less",Bi="LessEqual",Li="LinSpace",zi="Log",Vi="Log1p",ji="LogicalAnd",Mi="LogicalNot",Wi="LogicalOr",Tf="LogicalXor",$f="LogSoftmax",Ef="LowerBound",Ui="LRN",kf="LRNGrad",_f="MatrixBandPart",qi="Max",Gi="Maximum",Hi="MaxPool",vf="MaxPoolGrad",Ki="MaxPool3D",If="MaxPool3DGrad",Xi="MaxPoolWithArgmax",Zi="Mean",Ji="Min",Yi="Minimum",Qi="MirrorPad",eu="Mod",tu="Multinomial",nu="Multiply",ru="Neg",su="NotEqual",au="NonMaxSuppressionV3",ou="NonMaxSuppressionV4",iu="NonMaxSuppressionV5",uu="OnesLike",lu="OneHot",cu="Pack",hu="PadV2",xf="Pool",pu="Pow",fu="Prelu",mu="Prod",du="RaggedGather",gu="RaggedRange",yu="RaggedTensorToTensor",bu="Range",wu="Real",Nu="Reciprocal",Su="Relu",Tu="Reshape",$u="ResizeNearestNeighbor",Af="ResizeNearestNeighborGrad",Eu="ResizeBilinear",Of="ResizeBilinearGrad",ku="Relu6",_u="Reverse",vu="Round",Iu="Rsqrt",xu="ScatterNd",Au="TensorScatterUpdate",Ou="SearchSorted",Du="Select",Fu="Selu",Cu="Slice",Ru="Sin",Pu="Sinh",Bu="Sign",Lu="Sigmoid",zu="Softplus",Vu="Sqrt",ju="Sum",Mu="SpaceToBatchND",Wu="SplitV",Uu="Softmax",qu="SparseFillEmptyRows",Gu="SparseReshape",Hu="SparseSegmentMean",Ku="SparseSegmentSum",Xu="SparseToDense",Zu="SquaredDifference",Df="Square",Ju="StaticRegexReplace",Yu="StridedSlice",Qu="StringNGrams",el="StringSplit",tl="StringToHashBucketFast",nl="Sub",rl="Tan",sl="Tanh",ws="Tile",al="TopK",ol="Transform",jn="Transpose",il="Unique",ul="Unpack",ll="UnsortedSegmentSum",Ff="UpperBound",cl="ZerosLike",hl="Step",Dr="FromPixels",pl="RotateWithOffset",Fr="_FusedMatMul",Cr="FusedConv2D",Rr="FusedDepthwiseConv2D";/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function et(...t){R().getBool("IS_TEST")||R().getBool("PROD")||console.warn(...t)}function Cf(...t){R().getBool("IS_TEST")||R().getBool("PROD")||console.log(...t)}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Gt=ms("kernelRegistry",()=>new Map),pn=ms("gradRegistry",()=>new Map);function fn(t,e){const n=Ns(t,e);return Gt.get(n)}function Pr(t){return pn.get(t)}function Kn(t){const e=Gt.entries(),n=[];for(;;){const{done:r,value:s}=e.next();if(r)break;const[a,o]=s,[i]=a.split("_");i===t&&n.push(o)}return n}function fl(t){const{kernelName:e,backendName:n}=t,r=Ns(e,n);Gt.has(r)&&et(`The kernel '${e}' for backend '${n}' is already registered`),Gt.set(r,t)}function Rf(t){const{kernelName:e}=t;pn.has(e)&&R().getBool("DEBUG")&&et(`Overriding the gradient for '${e}'`),pn.set(e,t)}function Pf(t,e){const n=Ns(t,e);if(!Gt.has(n))throw new Error(`The kernel '${t}' for backend '${e}' is not registered`);Gt.delete(n)}function Bf(t){if(!pn.has(t))throw new Error(`The gradient '${t}' for backend is not registered`);pn.delete(t)}function Lf(t,e){Kn(t).forEach(r=>{const s=Object.assign({},r,{backendName:e});fl(s)})}function Ns(t,e){return`${e}_${t}`}/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ml(t){return t instanceof Float32Array||t instanceof Int32Array||t instanceof Uint8Array||t instanceof Uint8ClampedArray}var dl=Z,_e=null;try{_e=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}function Z(t,e,n){this.low=t|0,this.high=e|0,this.unsigned=!!n}Z.prototype.__isLong__;Object.defineProperty(Z.prototype,"__isLong__",{value:!0});function Te(t){return(t&&t.__isLong__)===!0}Z.isLong=Te;var Fa={},Ca={};function Ct(t,e){var n,r,s;return e?(t>>>=0,(s=0<=t&&t<256)&&(r=Ca[t],r)?r:(n=J(t,(t|0)<0?-1:0,!0),s&&(Ca[t]=n),n)):(t|=0,(s=-128<=t&&t<128)&&(r=Fa[t],r)?r:(n=J(t,t<0?-1:0,!1),s&&(Fa[t]=n),n))}Z.fromInt=Ct;function ve(t,e){if(isNaN(t))return e?St:Ie;if(e){if(t<0)return St;if(t>=gl)return wl}else{if(t<=-Pa)return we;if(t+1>=Pa)return bl}return t<0?ve(-t,e).neg():J(t%Ht|0,t/Ht|0,e)}Z.fromNumber=ve;function J(t,e,n){return new Z(t,e,n)}Z.fromBits=J;var Xn=Math.pow;function Ss(t,e,n){if(t.length===0)throw Error("empty string");if(t==="NaN"||t==="Infinity"||t==="+Infinity"||t==="-Infinity")return Ie;if(typeof e=="number"?(n=e,e=!1):e=!!e,n=n||10,n<2||36<n)throw RangeError("radix");var r;if((r=t.indexOf("-"))>0)throw Error("interior hyphen");if(r===0)return Ss(t.substring(1),e,n).neg();for(var s=ve(Xn(n,8)),a=Ie,o=0;o<t.length;o+=8){var i=Math.min(8,t.length-o),u=parseInt(t.substring(o,o+i),n);if(i<8){var l=ve(Xn(n,i));a=a.mul(l).add(ve(u))}else a=a.mul(s),a=a.add(ve(u))}return a.unsigned=e,a}Z.fromString=Ss;function Pe(t,e){return typeof t=="number"?ve(t,e):typeof t=="string"?Ss(t,e):J(t.low,t.high,typeof e=="boolean"?e:t.unsigned)}Z.fromValue=Pe;var Ra=65536,zf=1<<24,Ht=Ra*Ra,gl=Ht*Ht,Pa=gl/2,Ba=Ct(zf),Ie=Ct(0);Z.ZERO=Ie;var St=Ct(0,!0);Z.UZERO=St;var Vt=Ct(1);Z.ONE=Vt;var yl=Ct(1,!0);Z.UONE=yl;var Br=Ct(-1);Z.NEG_ONE=Br;var bl=J(-1,2147483647,!1);Z.MAX_VALUE=bl;var wl=J(-1,-1,!0);Z.MAX_UNSIGNED_VALUE=wl;var we=J(0,-2147483648,!1);Z.MIN_VALUE=we;var I=Z.prototype;I.toInt=function(){return this.unsigned?this.low>>>0:this.low};I.toNumber=function(){return this.unsigned?(this.high>>>0)*Ht+(this.low>>>0):this.high*Ht+(this.low>>>0)};I.toString=function(e){if(e=e||10,e<2||36<e)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(we)){var n=ve(e),r=this.div(n),s=r.mul(n).sub(this);return r.toString(e)+s.toInt().toString(e)}else return"-"+this.neg().toString(e);for(var a=ve(Xn(e,6),this.unsigned),o=this,i="";;){var u=o.div(a),l=o.sub(u.mul(a)).toInt()>>>0,h=l.toString(e);if(o=u,o.isZero())return h+i;for(;h.length<6;)h="0"+h;i=""+h+i}};I.getHighBits=function(){return this.high};I.getHighBitsUnsigned=function(){return this.high>>>0};I.getLowBits=function(){return this.low};I.getLowBitsUnsigned=function(){return this.low>>>0};I.getNumBitsAbs=function(){if(this.isNegative())return this.eq(we)?64:this.neg().getNumBitsAbs();for(var e=this.high!=0?this.high:this.low,n=31;n>0&&!(e&1<<n);n--);return this.high!=0?n+33:n+1};I.isZero=function(){return this.high===0&&this.low===0};I.eqz=I.isZero;I.isNegative=function(){return!this.unsigned&&this.high<0};I.isPositive=function(){return this.unsigned||this.high>=0};I.isOdd=function(){return(this.low&1)===1};I.isEven=function(){return(this.low&1)===0};I.equals=function(e){return Te(e)||(e=Pe(e)),this.unsigned!==e.unsigned&&this.high>>>31===1&&e.high>>>31===1?!1:this.high===e.high&&this.low===e.low};I.eq=I.equals;I.notEquals=function(e){return!this.eq(e)};I.neq=I.notEquals;I.ne=I.notEquals;I.lessThan=function(e){return this.comp(e)<0};I.lt=I.lessThan;I.lessThanOrEqual=function(e){return this.comp(e)<=0};I.lte=I.lessThanOrEqual;I.le=I.lessThanOrEqual;I.greaterThan=function(e){return this.comp(e)>0};I.gt=I.greaterThan;I.greaterThanOrEqual=function(e){return this.comp(e)>=0};I.gte=I.greaterThanOrEqual;I.ge=I.greaterThanOrEqual;I.compare=function(e){if(Te(e)||(e=Pe(e)),this.eq(e))return 0;var n=this.isNegative(),r=e.isNegative();return n&&!r?-1:!n&&r?1:this.unsigned?e.high>>>0>this.high>>>0||e.high===this.high&&e.low>>>0>this.low>>>0?-1:1:this.sub(e).isNegative()?-1:1};I.comp=I.compare;I.negate=function(){return!this.unsigned&&this.eq(we)?we:this.not().add(Vt)};I.neg=I.negate;I.add=function(e){Te(e)||(e=Pe(e));var n=this.high>>>16,r=this.high&65535,s=this.low>>>16,a=this.low&65535,o=e.high>>>16,i=e.high&65535,u=e.low>>>16,l=e.low&65535,h=0,c=0,f=0,m=0;return m+=a+l,f+=m>>>16,m&=65535,f+=s+u,c+=f>>>16,f&=65535,c+=r+i,h+=c>>>16,c&=65535,h+=n+o,h&=65535,J(f<<16|m,h<<16|c,this.unsigned)};I.subtract=function(e){return Te(e)||(e=Pe(e)),this.add(e.neg())};I.sub=I.subtract;I.multiply=function(e){if(this.isZero())return Ie;if(Te(e)||(e=Pe(e)),_e){var n=_e.mul(this.low,this.high,e.low,e.high);return J(n,_e.get_high(),this.unsigned)}if(e.isZero())return Ie;if(this.eq(we))return e.isOdd()?we:Ie;if(e.eq(we))return this.isOdd()?we:Ie;if(this.isNegative())return e.isNegative()?this.neg().mul(e.neg()):this.neg().mul(e).neg();if(e.isNegative())return this.mul(e.neg()).neg();if(this.lt(Ba)&&e.lt(Ba))return ve(this.toNumber()*e.toNumber(),this.unsigned);var r=this.high>>>16,s=this.high&65535,a=this.low>>>16,o=this.low&65535,i=e.high>>>16,u=e.high&65535,l=e.low>>>16,h=e.low&65535,c=0,f=0,m=0,y=0;return y+=o*h,m+=y>>>16,y&=65535,m+=a*h,f+=m>>>16,m&=65535,m+=o*l,f+=m>>>16,m&=65535,f+=s*h,c+=f>>>16,f&=65535,f+=a*l,c+=f>>>16,f&=65535,f+=o*u,c+=f>>>16,f&=65535,c+=r*h+s*l+a*u+o*i,c&=65535,J(m<<16|y,c<<16|f,this.unsigned)};I.mul=I.multiply;I.divide=function(e){if(Te(e)||(e=Pe(e)),e.isZero())throw Error("division by zero");if(_e){if(!this.unsigned&&this.high===-2147483648&&e.low===-1&&e.high===-1)return this;var n=(this.unsigned?_e.div_u:_e.div_s)(this.low,this.high,e.low,e.high);return J(n,_e.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?St:Ie;var r,s,a;if(this.unsigned){if(e.unsigned||(e=e.toUnsigned()),e.gt(this))return St;if(e.gt(this.shru(1)))return yl;a=St}else{if(this.eq(we)){if(e.eq(Vt)||e.eq(Br))return we;if(e.eq(we))return Vt;var o=this.shr(1);return r=o.div(e).shl(1),r.eq(Ie)?e.isNegative()?Vt:Br:(s=this.sub(e.mul(r)),a=r.add(s.div(e)),a)}else if(e.eq(we))return this.unsigned?St:Ie;if(this.isNegative())return e.isNegative()?this.neg().div(e.neg()):this.neg().div(e).neg();if(e.isNegative())return this.div(e.neg()).neg();a=Ie}for(s=this;s.gte(e);){r=Math.max(1,Math.floor(s.toNumber()/e.toNumber()));for(var i=Math.ceil(Math.log(r)/Math.LN2),u=i<=48?1:Xn(2,i-48),l=ve(r),h=l.mul(e);h.isNegative()||h.gt(s);)r-=u,l=ve(r,this.unsigned),h=l.mul(e);l.isZero()&&(l=Vt),a=a.add(l),s=s.sub(h)}return a};I.div=I.divide;I.modulo=function(e){if(Te(e)||(e=Pe(e)),_e){var n=(this.unsigned?_e.rem_u:_e.rem_s)(this.low,this.high,e.low,e.high);return J(n,_e.get_high(),this.unsigned)}return this.sub(this.div(e).mul(e))};I.mod=I.modulo;I.rem=I.modulo;I.not=function(){return J(~this.low,~this.high,this.unsigned)};I.and=function(e){return Te(e)||(e=Pe(e)),J(this.low&e.low,this.high&e.high,this.unsigned)};I.or=function(e){return Te(e)||(e=Pe(e)),J(this.low|e.low,this.high|e.high,this.unsigned)};I.xor=function(e){return Te(e)||(e=Pe(e)),J(this.low^e.low,this.high^e.high,this.unsigned)};I.shiftLeft=function(e){return Te(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?J(this.low<<e,this.high<<e|this.low>>>32-e,this.unsigned):J(0,this.low<<e-32,this.unsigned)};I.shl=I.shiftLeft;I.shiftRight=function(e){return Te(e)&&(e=e.toInt()),(e&=63)===0?this:e<32?J(this.low>>>e|this.high<<32-e,this.high>>e,this.unsigned):J(this.high>>e-32,this.high>=0?0:-1,this.unsigned)};I.shr=I.shiftRight;I.shiftRightUnsigned=function(e){if(Te(e)&&(e=e.toInt()),e&=63,e===0)return this;var n=this.high;if(e<32){var r=this.low;return J(r>>>e|n<<32-e,n>>>e,this.unsigned)}else return e===32?J(n,0,this.unsigned):J(n>>>e-32,0,this.unsigned)};I.shru=I.shiftRightUnsigned;I.shr_u=I.shiftRightUnsigned;I.toSigned=function(){return this.unsigned?J(this.low,this.high,!1):this};I.toUnsigned=function(){return this.unsigned?this:J(this.low,this.high,!0)};I.toBytes=function(e){return e?this.toBytesLE():this.toBytesBE()};I.toBytesLE=function(){var e=this.high,n=this.low;return[n&255,n>>>8&255,n>>>16&255,n>>>24,e&255,e>>>8&255,e>>>16&255,e>>>24]};I.toBytesBE=function(){var e=this.high,n=this.low;return[e>>>24,e>>>16&255,e>>>8&255,e&255,n>>>24,n>>>16&255,n>>>8&255,n&255]};Z.fromBytes=function(e,n,r){return r?Z.fromBytesLE(e,n):Z.fromBytesBE(e,n)};Z.fromBytesLE=function(e,n){return new Z(e[0]|e[1]<<8|e[2]<<16|e[3]<<24,e[4]|e[5]<<8|e[6]<<16|e[7]<<24,n)};Z.fromBytesBE=function(e,n){return new Z(e[4]<<24|e[5]<<16|e[6]<<8|e[7],e[0]<<24|e[1]<<16|e[2]<<8|e[3],n)};const Nl=uo(dl),Vf=lo({__proto__:null,default:Nl},[dl]);/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const bt=Nl||Vf;function vn(t){return bt.fromString(t,!0,16)}const Sl=vn("c3a5c85c97cb3127"),yt=vn("b492b66fbe98f273"),ce=vn("9ae16a3b2f90404f");function Lr(t){return t.xor(t.shru(47))}function Tl(t,e,n){const r=t.slice(e,e+n);return bt.fromBytes(Array.from(r),!0,!0)}function G(t,e){return Tl(t,e,8)}function La(t,e){return Tl(t,e,4)}function se(t,e){return e===0?t:t.shru(e).or(t.shl(64-e))}function at(t,e,n=vn("9ddfea08eb382d69")){let r=t.xor(e).mul(n);r=r.xor(r.shru(47));let s=e.xor(r).mul(n);return s=s.xor(s.shru(47)),s=s.mul(n),s}function jf(t,e,n,r,s,a){s=s.add(t),a=se(a.add(s).add(r),21);const o=s;return s=s.add(e),s=s.add(n),a=a.add(se(s,44)),[s.add(r),a.add(o)]}function Ln(t,e,n,r){return jf(G(t,e),G(t,e+8),G(t,e+16),G(t,e+24),n,r)}function Mf(t,e=t.length){if(e>=8){const n=ce.add(e*2),r=G(t,0).add(ce),s=G(t,e-8),a=se(s,37).mul(n).add(r),o=se(r,25).add(s).mul(n);return at(a,o,n)}if(e>=4){const n=ce.add(e*2),r=La(t,0);return at(r.shl(3).add(e),La(t,e-4),n)}if(e>0){const n=t[0],r=t[e>>1],s=t[e-1],a=n+(r<<8),o=e+(s<<2);return Lr(ce.mul(a).xor(Sl.mul(o))).mul(ce)}return ce}function Wf(t,e=t.length){const n=ce.add(e*2),r=G(t,0).mul(yt),s=G(t,8),a=G(t,e-8).mul(n),o=G(t,e-16).mul(ce);return at(se(r.add(s),43).add(se(a,30)).add(o),r.add(se(s.add(ce),18)).add(a),n)}function Uf(t,e=t.length){const n=ce.add(e*2),r=G(t,0).mul(ce),s=G(t,8),a=G(t,e-8).mul(n),o=G(t,e-16).mul(ce),i=se(r.add(s),43).add(se(a,30)).add(o),u=at(i,r.add(se(s.add(ce),18)).add(a),n),l=G(t,16).mul(n),h=G(t,24),c=i.add(G(t,e-32)).mul(n),f=u.add(G(t,e-24)).mul(n);return at(se(l.add(h),43).add(se(c,30)).add(f),l.add(se(h.add(r),18)).add(c),n)}function qf(t,e=t.length){const n=bt.fromNumber(81,!0);if(e<=32)return e<=16?Mf(t,e):Wf(t,e);if(e<=64)return Uf(t,e);let r=n,s=n.mul(yt).add(113),a=Lr(s.mul(ce).add(113)).mul(ce),o=[bt.UZERO,bt.UZERO],i=[bt.UZERO,bt.UZERO];r=r.mul(ce).add(G(t,0));let u=0;const l=(e-1>>6)*64,h=l+(e-1&63)-63;do r=se(r.add(s).add(o[0]).add(G(t,u+8)),37).mul(yt),s=se(s.add(o[1]).add(G(t,u+48)),42).mul(yt),r=r.xor(i[1]),s=s.add(o[0]).add(G(t,u+40)),a=se(a.add(i[0]),33).mul(yt),o=Ln(t,u,o[1].mul(yt),r.add(i[0])),i=Ln(t,u+32,a.add(i[1]),s.add(G(t,u+16))),[a,r]=[r,a],u+=64;while(u!==l);const c=yt.add(a.and(255).shl(1));return u=h,i[0]=i[0].add(e-1&63),o[0]=o[0].add(i[0]),i[0]=i[0].add(o[0]),r=se(r.add(s).add(o[0]).add(G(t,u+8)),37).mul(c),s=se(s.add(o[1]).add(G(t,u+48)),42).mul(c),r=r.xor(i[1].mul(9)),s=s.add(o[0].mul(9).add(G(t,u+40))),a=se(a.add(i[0]),33).mul(c),o=Ln(t,u,o[1].mul(c),r.add(i[0])),i=Ln(t,u+32,a.add(i[1]),s.add(G(t,u+16))),[a,r]=[r,a],at(at(o[0],i[0],c).add(Lr(s).mul(Sl)).add(a),at(o[1],i[1],c).add(r),c)}/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Gf(t,e){return e==="string"?In(t):ir([t],e)}function Hf(t,e){return t instanceof Float32Array&&e==="float32"||t instanceof Int32Array&&e==="int32"||t instanceof Uint8Array&&e==="bool"}function ir(t,e){if(e==="string")throw new Error("Cannot convert a string[] to a TypedArray");if(Array.isArray(t)&&(t=ut(t)),R().getBool("DEBUG")&&go(t,e),Hf(t,e))return t;if(e==null||e==="float32"||e==="complex64")return new Float32Array(t);if(e==="int32")return new Int32Array(t);if(e==="bool"){const n=new Uint8Array(t.length);for(let r=0;r<n.length;++r)Math.round(t[r])!==0&&(n[r]=1);return n}else throw new Error(`Unknown data type ${e}`)}function mn(){return R().platform.now()}function Kf(t,e){return R().platform.fetch(t,e)}function In(t,e="utf-8"){return e=e||"utf-8",R().platform.encode(t,e)}function Zn(t,e="utf-8"){return e=e||"utf-8",R().platform.decode(t,e)}function ae(t){return R().platform.isTypedArray!=null?R().platform.isTypedArray(t):ml(t)}function ut(t,e=[],n=!1){if(e==null&&(e=[]),typeof t=="boolean"||typeof t=="number"||typeof t=="string"||it(t)||t==null||ae(t)&&n)e.push(t);else if(Array.isArray(t)||ae(t))for(let r=0;r<t.length;++r)ut(t[r],e,n);else{let r=-1;for(const s of Object.keys(t))/^([1-9]+[0-9]*|0)$/.test(s)&&(r=Math.max(r,Number(s)));for(let s=0;s<=r;s++)ut(t[s],e,n)}return e}const Xf=Object.freeze(Object.defineProperty({__proto__:null,arraysEqual:Re,arraysEqualWithNull:po,assert:g,assertNonNegativeIntegerDimensions:Se,assertNonNull:Ft,assertShapesMatch:fe,bytesFromStringArray:bo,bytesPerElement:Gn,checkConversionForErrors:go,clamp:hn,computeStrides:en,convertBackendValuesAndArrayBuffer:af,createScalarValue:Gf,createShuffledIndices:tf,decodeString:Zn,distSquared:Jp,encodeString:In,fetch:Kf,fingerPrint64:qf,flatten:ut,getArrayFromDType:hs,getTypedArrayFromDType:mo,hasEncodingLoss:sf,hexToLong:vn,indexToLoc:lf,inferDtype:_n,inferFromImplicitShape:rf,isBoolean:wo,isFunction:ot,isInt:qt,isNumber:No,isPromise:it,isScalarShape:Yp,isString:nt,isTypedArray:ae,isValidDtype:yo,locToIndex:uf,makeOnesTypedArray:ps,makeZerosNestedTypedArray:of,makeZerosTypedArray:or,nearestDivisor:Hn,nearestLargerEven:Kp,now:mn,parseAxisParam:kn,randUniform:Zp,repeatedTry:nf,rightPad:ln,shuffle:ho,shuffleCombo:Hp,sizeFromShape:W,sizeToSquarishShape:ef,squeezeShape:fo,sum:Xp,swap:qn,tanh:Qp,toNestedArray:$t,toTypedArray:ir},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Zf{constructor(e,n){this.backendTimer=e,this.logger=n,n==null&&(this.logger=new Yf)}profileKernel(e,n,r){let s;const a=()=>{s=r()};let o;const i=mn();if(this.backendTimer.timerAvailable())o=this.backendTimer.time(a);else{a();for(const l of s)l.dataSync();o=Promise.resolve({kernelMs:mn()-i})}if(R().getBool("CHECK_COMPUTATION_FOR_ERRORS"))for(let l=0;l<s.length;l++){const h=s[l];h.data().then(c=>{Jf(c,h.dtype,e)})}return{kernelName:e,outputs:s,inputs:n,timeMs:o.then(l=>l.kernelMs),extraInfo:o.then(l=>l.getExtraProfileInfo!=null?l.getExtraProfileInfo():"")}}logKernelProfile(e){const{kernelName:n,outputs:r,timeMs:s,inputs:a,extraInfo:o}=e;r.forEach(i=>{Promise.all([i.data(),s,o]).then(u=>{this.logger.logKernelProfile(n,i,u[0],u[1],a,u[2])})})}}function Jf(t,e,n){if(e!=="float32")return!1;for(let r=0;r<t.length;r++){const s=t[r];if(isNaN(s)||!isFinite(s))return console.warn(`Found ${s} in the result of '${n}'`),!0}return!1}class Yf{logKernelProfile(e,n,r,s,a,o){const i=typeof s=="number"?ln(`${s}ms`,9):s.error,u=ln(e,25),l=n.rank,h=n.size,c=ln(n.shape.toString(),14);let f="";for(const m in a){const y=a[m];if(y!=null){const S=y.shape||n.shape,b=S.length;f+=`${m}: ${b}D ${b>0?S:""} `}}console.log(`%c${u}	%c${i}	%c${l}D ${c}	%c${h}	%c${f}	%c${o}`,"font-weight:bold","color:red","color:blue","color: orange","color: green","color: steelblue")}}/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Qf(t,e,n){const r={},s={};for(let u=0;u<e.length;u++)r[e[u].id]=!0;for(let u=0;u<t.length;u++){const l=t[u],h=l.inputs;for(const c in h){const f=h[c];let m=!1;for(let y=0;y<e.length;y++)if(r[f.id]){l.outputs.forEach(S=>r[S.id]=!0),m=!0,s[l.id]=!0;break}if(m)break}}const a={};a[n.id]=!0;const o={};for(let u=t.length-1;u>=0;u--){const l=t[u],h=l.inputs;for(let c=0;c<l.outputs.length;c++)if(a[l.outputs[c].id]){for(const f in h)a[h[f].id]=!0,o[l.id]=!0;break}}const i=[];for(let u=0;u<t.length;u++){const l=t[u];if(s[l.id]&&o[l.id]){const h={};for(const f in l.inputs){const m=l.inputs[f];r[m.id]&&(h[f]=m)}const c=Object.assign({},l);c.inputs=h,c.outputs=l.outputs,i.push(c)}}return i}function em(t,e,n,r){for(let s=e.length-1;s>=0;s--){const a=e[s],o=[];if(a.outputs.forEach(u=>{const l=t[u.id];l!=null?o.push(l):o.push(null)}),a.gradient==null)throw new Error(`Cannot compute gradient: gradient function not found for ${a.kernelName}.`);const i=a.gradient(o);for(const u in a.inputs){if(!(u in i))throw new Error(`Cannot backprop through input ${u}. Available gradients found: ${Object.keys(i)}.`);const l=n(()=>i[u]());if(l.dtype!=="float32")throw new Error(`Error in gradient for op ${a.kernelName}. The gradient of input ${u} must have 'float32' dtype, but has '${l.dtype}'`);const h=a.inputs[u];if(!Re(l.shape,h.shape))throw new Error(`Error in gradient for op ${a.kernelName}. The gradient of input '${u}' has shape '${l.shape}', which does not match the shape of the input '${h.shape}'`);if(t[h.id]==null)t[h.id]=l;else{const c=t[h.id];t[h.id]=r(c,l),c.dispose()}}}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const za=20,sn=3,kr=7;function tm(t,e,n,r){const s=en(e),a=nm(t,e,n,s),o=e.length,i=Mn(t,e,n,s,a),u=["Tensor"];return r&&(u.push(`  dtype: ${n}`),u.push(`  rank: ${o}`),u.push(`  shape: [${e}]`),u.push("  values:")),u.push(i.map(l=>"    "+l).join(`
`)),u.join(`
`)}function nm(t,e,n,r){const s=W(e),a=r[r.length-1],o=new Array(a).fill(0),i=e.length,u=n==="complex64"?un(t):t;if(i>1)for(let l=0;l<s/a;l++){const h=l*a;for(let c=0;c<a;c++)o[c]=Math.max(o[c],on(u[h+c],0,n).length)}return o}function on(t,e,n){let r;return Array.isArray(t)?r=`${parseFloat(t[0].toFixed(kr))} + ${parseFloat(t[1].toFixed(kr))}j`:nt(t)?r=`'${t}'`:n==="bool"?r=$l(t):r=parseFloat(t.toFixed(kr)).toString(),ln(r,e)}function $l(t){return t===0?"false":"true"}function Mn(t,e,n,r,s,a=!0){const o=n==="complex64"?2:1,i=e[0],u=e.length;if(u===0){if(n==="complex64"){const S=un(t);return[on(S[0],0,n)]}return n==="bool"?[$l(t[0])]:[t[0].toString()]}if(u===1){if(i>za){const b=sn*o;let T=Array.from(t.slice(0,b)),A=Array.from(t.slice((i-sn)*o,i*o));return n==="complex64"&&(T=un(T),A=un(A)),["["+T.map(($,E)=>on($,s[E],n)).join(", ")+", ..., "+A.map(($,E)=>on($,s[i-sn+E],n)).join(", ")+"]"]}return["["+(n==="complex64"?un(t):Array.from(t)).map((b,T)=>on(b,s[T],n)).join(", ")+"]"]}const l=e.slice(1),h=r.slice(1),c=r[0]*o,f=[];if(i>za){for(let S=0;S<sn;S++){const b=S*c,T=b+c;f.push(...Mn(t.slice(b,T),l,n,h,s,!1))}f.push("...");for(let S=i-sn;S<i;S++){const b=S*c,T=b+c;f.push(...Mn(t.slice(b,T),l,n,h,s,S===i-1))}}else for(let S=0;S<i;S++){const b=S*c,T=b+c;f.push(...Mn(t.slice(b,T),l,n,h,s,S===i-1))}const m=u===2?",":"";f[0]="["+(i>0?f[0]+m:"");for(let S=1;S<f.length-1;S++)f[S]=" "+f[S]+m;let y=`,
`;for(let S=2;S<u;S++)y+=`
`;return f[f.length-1]=" "+f[f.length-1]+"]"+(a?"":y),f}function un(t){const e=[];for(let n=0;n<t.length;n+=2)e.push([t[n],t[n+1]]);return e}/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Jn{constructor(e,n,r){if(this.dtype=n,this.shape=e.slice(),this.size=W(e),r!=null){const s=r.length;g(s===this.size,()=>`Length of values '${s}' does not match the size inferred by the shape '${this.size}'.`)}if(n==="complex64")throw new Error("complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).");this.values=r||hs(n,this.size),this.strides=en(e)}set(e,...n){n.length===0&&(n=[0]),g(n.length===this.rank,()=>`The number of provided coordinates (${n.length}) must match the rank (${this.rank})`);const r=this.locToIndex(n);this.values[r]=e}get(...e){e.length===0&&(e=[0]);let n=0;for(const s of e){if(s<0||s>=this.shape[n]){const a=`Requested out of range element at ${e}.   Buffer shape=${this.shape}`;throw new Error(a)}n++}let r=e[e.length-1];for(let s=0;s<e.length-1;++s)r+=this.strides[s]*e[s];return this.values[r]}locToIndex(e){if(this.rank===0)return 0;if(this.rank===1)return e[0];let n=e[e.length-1];for(let r=0;r<e.length-1;++r)n+=this.strides[r]*e[r];return n}indexToLoc(e){if(this.rank===0)return[];if(this.rank===1)return[e];const n=new Array(this.shape.length);for(let r=0;r<n.length-1;++r)n[r]=Math.floor(e/this.strides[r]),e-=n[r]*this.strides[r];return n[n.length-1]=e,n}get rank(){return this.shape.length}toTensor(){return Oe().makeTensor(this.values,this.shape,this.dtype)}}let Oe=null,Lt=null;function rm(t){Oe=t}function sm(t){Lt=t}class te{constructor(e,n,r,s){this.kept=!1,this.isDisposedInternal=!1,this.shape=e.slice(),this.dtype=n||"float32",this.size=W(e),this.strides=en(e),this.dataId=r,this.id=s,this.rankType=this.rank<5?this.rank.toString():"higher"}get rank(){return this.shape.length}async buffer(){const e=await this.data();return Lt.buffer(this.shape,this.dtype,e)}bufferSync(){return Lt.buffer(this.shape,this.dtype,this.dataSync())}async array(){const e=await this.data();return $t(this.shape,e,this.dtype==="complex64")}arraySync(){return $t(this.shape,this.dataSync(),this.dtype==="complex64")}async data(){this.throwIfDisposed();const e=Oe().read(this.dataId);if(this.dtype==="string"){const n=await e;try{return n.map(r=>Zn(r))}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}}return e}dataToGPU(e){return this.throwIfDisposed(),Oe().readToGPU(this.dataId,e)}dataSync(){this.throwIfDisposed();const e=Oe().readSync(this.dataId);if(this.dtype==="string")try{return e.map(n=>Zn(n))}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}return e}async bytes(){this.throwIfDisposed();const e=await Oe().read(this.dataId);return this.dtype==="string"?e:new Uint8Array(e.buffer)}dispose(){this.isDisposed||(this.kerasMask&&this.kerasMask.dispose(),Oe().disposeTensor(this),this.isDisposedInternal=!0)}get isDisposed(){return this.isDisposedInternal}throwIfDisposed(){if(this.isDisposed)throw new Error("Tensor is disposed.")}print(e=!1){return Lt.print(this,e)}clone(){return this.throwIfDisposed(),Lt.clone(this)}toString(e=!1){const n=this.dataSync();return tm(n,this.shape,this.dtype,e)}cast(e){return this.throwIfDisposed(),Lt.cast(this,e)}variable(e=!0,n,r){return this.throwIfDisposed(),Oe().makeVariable(this,e,n,r)}}Object.defineProperty(te,Symbol.hasInstance,{value:t=>!!t&&t.data!=null&&t.dataSync!=null&&t.throwIfDisposed!=null});function El(){return ms("Tensor",()=>te)}El();class dn extends te{constructor(e,n,r,s){super(e.shape,e.dtype,e.dataId,s),this.trainable=n,this.name=r}assign(e){if(e.dtype!==this.dtype)throw new Error(`dtype of the new value (${e.dtype}) and previous value (${this.dtype}) must match`);if(!Re(e.shape,this.shape))throw new Error(`shape of the new value (${e.shape}) and previous value (${this.shape}) must match`);Oe().disposeTensor(this),this.dataId=e.dataId,Oe().incRef(this,null)}dispose(){Oe().disposeVariable(this),this.isDisposedInternal=!0}}Object.defineProperty(dn,Symbol.hasInstance,{value:t=>t instanceof te&&t.assign!=null&&t.assign instanceof Function});/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var zr;(function(t){t.R0="R0",t.R1="R1",t.R2="R2",t.R3="R3",t.R4="R4",t.R5="R5",t.R6="R6"})(zr||(zr={}));var Vr;(function(t){t.float32="float32",t.int32="int32",t.bool="int32",t.complex64="complex64"})(Vr||(Vr={}));var jr;(function(t){t.float32="float32",t.int32="int32",t.bool="bool",t.complex64="complex64"})(jr||(jr={}));var Mr;(function(t){t.float32="float32",t.int32="float32",t.bool="float32",t.complex64="complex64"})(Mr||(Mr={}));var Wr;(function(t){t.float32="complex64",t.int32="complex64",t.bool="complex64",t.complex64="complex64"})(Wr||(Wr={}));const am={float32:Mr,int32:Vr,bool:jr,complex64:Wr};function ur(t,e){if(t==="string"||e==="string"){if(t==="string"&&e==="string")return"string";throw new Error(`Can not upcast ${t} with ${e}`)}return am[t][e]}function om(t){return ur(t,"int32")}function kl(t){return t!=null&&typeof t=="object"&&"texture"in t&&t.texture instanceof WebGLTexture}function _l(t){return typeof GPUBuffer<"u"&&t!=null&&typeof t=="object"&&"buffer"in t&&t.buffer instanceof GPUBuffer}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ee(t,e){if(t.dtype===e.dtype)return[t,e];const n=ur(t.dtype,e.dtype);return[t.cast(n),e.cast(n)]}function vl(t,e){g(t.dtype===e.dtype,()=>`The dtypes of the first(${t.dtype}) and second(${e.dtype}) input must match`)}function im(t,e){return e.some(n=>n.id===t.id)}function Ts(t){const e=[];return Il(t,e,new Set),e}function Il(t,e,n){if(t==null)return;if(t instanceof te){e.push(t);return}if(!um(t))return;const r=t;for(const s in r){const a=r[s];n.has(a)||(n.add(a),Il(a,e,n))}}function um(t){return Array.isArray(t)||typeof t=="object"}const lm=Object.freeze(Object.defineProperty({__proto__:null,assertTypesMatch:vl,getTensorsInContainer:Ts,isTensorInList:im,makeTypesMatch:ee},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function _r(t){return t.kernelName!=null}class Va{constructor(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null,get kernelNames(){return Array.from(new Set(this.kernels.map(e=>e.name)))}}}dispose(){for(const e in this.registeredVariables)this.registeredVariables[e].dispose()}}class Kt{constructor(e){this.ENV=e,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new Va}async ready(){if(this.pendingBackendInit!=null)return this.pendingBackendInit.then(()=>{});if(this.backendInstance!=null)return;const e=this.getSortedBackends();for(let n=0;n<e.length;n++){const r=e[n];if(await this.initializeBackend(r).success){await this.setBackend(r);return}}throw new Error("Could not initialize any backends, all backend initializations failed.")}get backend(){if(this.pendingBackendInit!=null)throw new Error(`Backend '${this.backendName}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);if(this.backendInstance==null){const{name:e,asyncInit:n}=this.initializeBackendsAndReturnBest();if(n)throw new Error(`The highest priority backend '${e}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);this.setBackend(e)}return this.backendInstance}backendNames(){return Object.keys(this.registryFactory)}findBackend(e){if(!(e in this.registry))if(e in this.registryFactory){const{asyncInit:n}=this.initializeBackend(e);if(n)return null}else return null;return this.registry[e]}findBackendFactory(e){return e in this.registryFactory?this.registryFactory[e].factory:null}registerBackend(e,n,r=1){return e in this.registryFactory?(et(`${e} backend was already registered. Reusing existing backend factory.`),!1):(this.registryFactory[e]={factory:n,priority:r},!0)}async setBackend(e){if(this.registryFactory[e]==null)throw new Error(`Backend name '${e}' not found in registry`);if(this.backendName=e,this.registry[e]==null){this.backendInstance=null;const{success:n,asyncInit:r}=this.initializeBackend(e);if(!(r?await n:n))return!1}return this.backendInstance=this.registry[e],this.setupRegisteredKernels(),this.profiler=new Zf(this.backendInstance),!0}setupRegisteredKernels(){Kn(this.backendName).forEach(n=>{n.setupFunc!=null&&n.setupFunc(this.backendInstance)})}disposeRegisteredKernels(e){Kn(e).forEach(r=>{r.disposeFunc!=null&&r.disposeFunc(this.registry[e])})}initializeBackend(e){const n=this.registryFactory[e];if(n==null)throw new Error(`Cannot initialize backend ${e}, no registration found.`);try{const r=n.factory();if(r&&!(r instanceof co)&&typeof r.then=="function"){const s=++this.pendingBackendInitId,a=r.then(o=>s<this.pendingBackendInitId?!1:(this.registry[e]=o,this.pendingBackendInit=null,!0)).catch(o=>(s<this.pendingBackendInitId||(this.pendingBackendInit=null,et(`Initialization of backend ${e} failed`),et(o.stack||o.message)),!1));return this.pendingBackendInit=a,{success:a,asyncInit:!0}}else return this.registry[e]=r,{success:!0,asyncInit:!1}}catch(r){return et(`Initialization of backend ${e} failed`),et(r.stack||r.message),{success:!1,asyncInit:!1}}}removeBackend(e){if(!(e in this.registryFactory))throw new Error(`${e} backend not found in registry`);this.backendName===e&&this.pendingBackendInit!=null&&this.pendingBackendInitId++,e in this.registry&&(this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e]),delete this.registryFactory[e],this.backendName===e&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)}getSortedBackends(){if(Object.keys(this.registryFactory).length===0)throw new Error("No backend found in registry.");return Object.keys(this.registryFactory).sort((e,n)=>this.registryFactory[n].priority-this.registryFactory[e].priority)}initializeBackendsAndReturnBest(){const e=this.getSortedBackends();for(let n=0;n<e.length;n++){const r=e[n],{success:s,asyncInit:a}=this.initializeBackend(r);if(a||s)return{name:r,asyncInit:a}}throw new Error("Could not initialize any backends, all backend initializations failed.")}moveData(e,n){const r=this.state.tensorInfo.get(n),s=r.backend,a=this.readSync(n),o=s.refCount(n);s.disposeData(n,!0),r.backend=e,e.move(n,a,r.shape,r.dtype,o),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++}tidy(e,n){let r=null;if(n==null){if(typeof e!="function")throw new Error("Please provide a function to tidy()");n=e}else{if(typeof e!="string"&&!(e instanceof String))throw new Error("When calling with two arguments, the first argument to tidy() must be a string");if(typeof n!="function")throw new Error("When calling with two arguments, the 2nd argument to tidy() must be a function");r=e}let s;return this.scopedRun(()=>this.startScope(r),()=>this.endScope(s),()=>(s=n(),s instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),s))}scopedRun(e,n,r){e();try{const s=r();return n(),s}catch(s){throw n(),s}}nextTensorId(){return Kt.nextTensorId++}nextVariableId(){return Kt.nextVariableId++}clone(e){const n=N.runKernel(bs,{x:e}),r={x:e},s=o=>({x:()=>{const i="float32",u={x:o},l={dtype:i};return N.runKernel(gs,u,l)}}),a=[];return this.addTapeNode(this.state.activeScope.name,r,[n],s,a,{}),n}runKernel(e,n,r){if(this.backendName==null&&this.backend,!(fn(e,this.backendName)!=null))throw new Error(`Kernel '${e}' not registered for backend '${this.backendName}'`);return this.runKernelFunc({kernelName:e,inputs:n,attrs:r})}shouldCheckForMemLeaks(){return this.ENV.getBool("IS_TEST")}checkKernelForMemLeak(e,n,r){const s=this.backend.numDataIds();let a=0;r.forEach(u=>{a+=u.dtype==="complex64"?3:1});const o=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],i=s-n-a-o;if(i>0)throw new Error(`Backend '${this.backendName}' has an internal memory leak (${i} data ids) after running '${e}'`)}runKernelFunc(e){let n,r=[];const s=this.isTapeOn(),a=this.state.numBytes,o=this.state.numTensors;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0);let i;this.backendName==null&&this.backend;let u;const l=_r(e)?e.kernelName:this.state.activeScope!=null?this.state.activeScope.name:"";if(_r(e)){const{kernelName:y,inputs:S,attrs:b}=e;this.backendName==null&&this.backend;const T=fn(y,this.backendName);g(T!=null,()=>`Cannot find registered kernel '${y}' for backend '${this.backendName}'`),i=()=>{const A=this.backend.numDataIds();u=T.kernelFunc({inputs:S,attrs:b,backend:this.backend});const $=Array.isArray(u)?u:[u];this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(y,A,$);const E=$.map(_=>_.rank!=null?_:this.makeTensorFromTensorInfo(_));if(s){const _=this.getTensorsForGradient(y,S,E);r=this.saveTensorsForBackwardMode(_)}return E}}else{const{forwardFunc:y}=e,S=b=>{s&&(r=b.map(T=>this.keep(this.clone(T))))};i=()=>{const b=this.backend.numDataIds();u=this.tidy(()=>y(this.backend,S));const T=Array.isArray(u)?u:[u];return this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(l,b,T),T}}const{inputs:h,attrs:c}=e,f=_r(e)?null:e.backwardsFunc;let m;return this.scopedRun(()=>this.state.kernelDepth++,()=>this.state.kernelDepth--,()=>{!this.ENV.getBool("DEBUG")&&!this.state.profiling?n=i():(m=this.profiler.profileKernel(l,h,()=>i()),this.ENV.getBool("DEBUG")&&this.profiler.logKernelProfile(m),n=m.outputs)}),s&&this.addTapeNode(l,h,n,f,r,c),this.state.profiling&&this.state.activeProfile.kernels.push({name:l,bytesAdded:this.state.numBytes-a,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-o,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(h).map(y=>h[y]!=null?h[y].shape:null),outputShapes:n.map(y=>y.shape),kernelTimeMs:m.timeMs,extraInfo:m.extraInfo}),Array.isArray(u)?n:n[0]}saveTensorsForBackwardMode(e){return e.map(r=>this.keep(this.clone(r)))}getTensorsForGradient(e,n,r){const s=Pr(e);if(s!=null){const a=s.inputsToSave||[],o=s.outputsToSave||[];let i;s.saveAllInputs?(g(Array.isArray(n),()=>"saveAllInputs is true, expected inputs to be an array."),i=Object.keys(n).map(l=>n[l])):i=a.map(l=>n[l]);const u=r.filter((l,h)=>o[h]);return i.concat(u)}return[]}makeTensor(e,n,r,s){if(e==null)throw new Error("Values passed to engine.makeTensor() are null");r=r||"float32",s=s||this.backend;let a=e;r==="string"&&nt(e[0])&&(a=e.map(u=>In(u)));const o=s.write(a,n,r),i=new te(n,r,o,this.nextTensorId());if(this.trackTensor(i,s),r==="string"){const u=this.state.tensorInfo.get(o),l=bo(a);this.state.numBytes+=l-u.bytes,u.bytes=l}return i}makeTensorFromDataId(e,n,r,s){r=r||"float32";const a={dataId:e,shape:n,dtype:r};return this.makeTensorFromTensorInfo(a,s)}makeTensorFromTensorInfo(e,n){const{dataId:r,shape:s,dtype:a}=e,o=new te(s,a,r,this.nextTensorId());return this.trackTensor(o,n),o}makeVariable(e,n=!0,r,s){r=r||this.nextVariableId().toString(),s!=null&&s!==e.dtype&&(e=e.cast(s));const a=new dn(e,n,r,this.nextTensorId());if(this.state.registeredVariables[a.name]!=null)throw new Error(`Variable with name ${a.name} was already registered`);return this.state.registeredVariables[a.name]=a,this.incRef(a,this.backend),a}trackTensor(e,n){this.state.numTensors++,e.dtype==="string"&&this.state.numStringTensors++;let r=0;e.dtype!=="complex64"&&e.dtype!=="string"&&(r=e.size*Gn(e.dtype)),this.state.numBytes+=r,this.state.tensorInfo.has(e.dataId)||(this.state.numDataBuffers++,this.state.tensorInfo.set(e.dataId,{backend:n||this.backend,dtype:e.dtype,shape:e.shape,bytes:r})),e instanceof dn||this.track(e)}incRef(e,n){this.trackTensor(e,n),this.backend.incRef(e.dataId)}removeDataId(e,n){this.state.tensorInfo.has(e)&&this.state.tensorInfo.get(e).backend===n&&(this.state.tensorInfo.delete(e),this.state.numDataBuffers--)}disposeTensor(e){if(!this.state.tensorInfo.has(e.dataId))return;const n=this.state.tensorInfo.get(e.dataId);if(this.state.numTensors--,e.dtype==="string"&&(this.state.numStringTensors--,this.state.numBytes-=n.bytes),e.dtype!=="complex64"&&e.dtype!=="string"){const r=e.size*Gn(e.dtype);this.state.numBytes-=r}n.backend.disposeData(e.dataId)&&this.removeDataId(e.dataId,n.backend)}disposeVariables(){for(const e in this.state.registeredVariables){const n=this.state.registeredVariables[e];this.disposeVariable(n)}}disposeVariable(e){this.disposeTensor(e),this.state.registeredVariables[e.name]!=null&&delete this.state.registeredVariables[e.name]}memory(){const e=this.backend.memory();return e.numTensors=this.state.numTensors,e.numDataBuffers=this.state.numDataBuffers,e.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(e.unreliable=!0,e.reasons==null&&(e.reasons=[]),e.reasons.push("Memory usage by string tensors is approximate (2 bytes per character)")),e}async profile(e){this.state.profiling=!0;const n=this.state.numBytes,r=this.state.numTensors;this.state.activeProfile.kernels=[],this.state.activeProfile.result=await e(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max(...this.state.activeProfile.kernels.map(s=>s.totalBytesSnapshot)),this.state.activeProfile.newBytes=this.state.numBytes-n,this.state.activeProfile.newTensors=this.state.numTensors-r;for(const s of this.state.activeProfile.kernels)s.kernelTimeMs=await s.kernelTimeMs,s.extraInfo=await s.extraInfo;return this.state.activeProfile}isTapeOn(){return this.state.gradientDepth>0&&this.state.kernelDepth===0}addTapeNode(e,n,r,s,a,o){const i={id:this.state.nextTapeNodeId++,kernelName:e,inputs:n,outputs:r,saved:a},u=Pr(e);u!=null&&(s=u.gradFunc),s!=null&&(i.gradient=l=>(l=l.map((h,c)=>{if(h==null){const f=r[c],m=or(f.size,f.dtype);return this.makeTensor(m,f.shape,f.dtype)}return h}),s(l.length>1?l:l[0],a,o))),this.state.activeTape.push(i)}keep(e){return e.kept=!0,e}startTape(){this.state.gradientDepth===0&&(this.state.activeTape=[]),this.state.gradientDepth++}endTape(){this.state.gradientDepth--}startScope(e){const n={track:[],name:"unnamed scope",id:this.state.nextScopeId++};e&&(n.name=e),this.state.scopeStack.push(n),this.state.activeScope=n}endScope(e){const n=Ts(e),r=new Set(n.map(a=>a.id));for(let a=0;a<this.state.activeScope.track.length;a++){const o=this.state.activeScope.track[a];!o.kept&&!r.has(o.id)&&o.dispose()}const s=this.state.scopeStack.pop();this.state.activeScope=this.state.scopeStack.length===0?null:this.state.scopeStack[this.state.scopeStack.length-1],n.forEach(a=>{!a.kept&&a.scopeId===s.id&&this.track(a)})}gradients(e,n,r,s=!1){if(g(n.length>0,()=>"gradients() received an empty list of xs."),r!=null&&r.dtype!=="float32")throw new Error(`dy must have 'float32' dtype, but has '${r.dtype}'`);const a=this.scopedRun(()=>this.startTape(),()=>this.endTape(),()=>this.tidy("forward",e));g(a instanceof te,()=>"The result y returned by f() must be a tensor.");const o=Qf(this.state.activeTape,n,a);if(!s&&o.length===0&&n.length>0)throw new Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");return this.tidy("backward",()=>{const i={};i[a.id]=r??cm(a.shape),em(i,o,l=>this.tidy(l),hm);const u=n.map(l=>i[l.id]);return this.state.gradientDepth===0&&(this.state.activeTape.forEach(l=>{for(const h of l.saved)h.dispose()}),this.state.activeTape=null),{value:a,grads:u}})}customGrad(e){return g(ot(e),()=>"The f passed in customGrad(f) must be a function."),(...n)=>{g(n.every(i=>i instanceof te),()=>"The args passed in customGrad(f)(x1, x2,...) must all be tensors");let r;const s={};n.forEach((i,u)=>{s[u]=i});const a=(i,u)=>(r=e(...n,u),g(r.value instanceof te,()=>"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"),g(ot(r.gradFunc),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."),r.value),o=(i,u)=>{const l=r.gradFunc(i,u),h=Array.isArray(l)?l:[l];g(h.length===n.length,()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."),g(h.every(f=>f instanceof te),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors.");const c={};return h.forEach((f,m)=>{c[m]=()=>f}),c};return this.runKernelFunc({forwardFunc:a,backwardsFunc:o,inputs:s})}}readSync(e){return this.state.tensorInfo.get(e).backend.readSync(e)}read(e){return this.state.tensorInfo.get(e).backend.read(e)}readToGPU(e,n){return this.state.tensorInfo.get(e).backend.readToGPU(e,n)}async time(e){const n=mn(),r=await this.backend.time(e);return r.wallMs=mn()-n,r}track(e){return this.state.activeScope!=null&&(e.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(e)),e}get registeredVariables(){return this.state.registeredVariables}reset(){this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new Va;for(const e in this.registry)this.disposeRegisteredKernels(e),this.registry[e].dispose(),delete this.registry[e];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null}}Kt.nextTensorId=0;Kt.nextVariableId=0;function cm(t){const e=ps(W(t),"float32");return N.makeTensor(e,t,"float32")}function xl(){const t=$o();if(t._tfengine==null){const e=new To(t);t._tfengine=new Kt(e)}return ff(t._tfengine.ENV),rm(()=>t._tfengine),t._tfengine}const N=xl();function hm(t,e){const n={a:t,b:e};return N.runKernel(ds,n)}/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function pm(){return typeof navigator<"u"&&navigator!=null}let Ur;function fm(t){Ur=t}function mm(t){if(Ur!==void 0)return Ur;if(t||pm()){if(t||(t=navigator),t.product==="ReactNative")return!0;const e=t.userAgent||t.vendor||(typeof window<"u"?window.opera:"");if(!e){const n=t;return n.userAgentData&&n.userAgentData.mobile}return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4))}return!1}function Al(){return typeof window<"u"&&window.document!=null||typeof WorkerGlobalScope<"u"}const dm=Object.freeze(Object.defineProperty({__proto__:null,isBrowser:Al,isMobile:mm,mockIsMobile:fm},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const me=R();me.registerFlag("DEBUG",()=>!1,t=>{t&&console.warn("Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.")});me.registerFlag("IS_BROWSER",()=>Al());me.registerFlag("IS_NODE",()=>typeof process<"u"&&typeof process.versions<"u"&&typeof process.versions.node<"u");me.registerFlag("IS_CHROME",()=>typeof navigator<"u"&&navigator!=null&&navigator.userAgent!=null&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor));me.registerFlag("IS_SAFARI",()=>typeof navigator<"u"&&navigator!=null&&navigator.userAgent!=null&&/Safari/.test(navigator.userAgent)&&/Apple/.test(navigator.vendor));me.registerFlag("PROD",()=>!1);me.registerFlag("TENSORLIKE_CHECK_SHAPE_CONSISTENCY",()=>me.getBool("DEBUG"));me.registerFlag("DEPRECATION_WARNINGS_ENABLED",()=>!0);me.registerFlag("IS_TEST",()=>!1);me.registerFlag("CHECK_COMPUTATION_FOR_ERRORS",()=>me.getBool("DEBUG"));me.registerFlag("WRAP_TO_IMAGEBITMAP",()=>!1);me.registerFlag("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU",()=>!1);me.registerFlag("USE_SETTIMEOUTCUSTOM",()=>!1);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ze(t,e){let n=t;if(ae(t))return e==="string"?[]:[t.length];if(kl(t)){const s=t.channels||"RGBA";return[t.height,t.width*s.length]}else if(_l(t))return[t.buffer.size/(e==null?4:Gn(e))];if(!Array.isArray(t))return[];const r=[];for(;Array.isArray(n)||ae(n)&&e!=="string";)r.push(n.length),n=n[0];return Array.isArray(t)&&R().getBool("TENSORLIKE_CHECK_SHAPE_CONSISTENCY")&&Ol(t,r,[]),r}function Ol(t,e,n){if(n=n||[],!Array.isArray(t)&&!ae(t)){g(e.length===0,()=>`Element arr[${n.join("][")}] is a primitive, but should be an array/TypedArray of ${e[0]} elements`);return}g(e.length>0,()=>`Element arr[${n.join("][")}] should be a primitive, but is an array of ${t.length} elements`),g(t.length===e[0],()=>`Element arr[${n.join("][")}] should have ${e[0]} elements, but has ${t.length} elements`);const r=e.slice(1);for(let s=0;s<t.length;++s)Ol(t[s],r,n.concat(s))}function ja(t,e,n,r){if(t!=="string_or_numeric"){if(t==null)throw new Error("Expected dtype cannot be null.");if(t!=="numeric"&&t!==e||t==="numeric"&&e==="string")throw new Error(`Argument '${n}' passed to '${r}' must be ${t} tensor, but got ${e} tensor`)}}function d(t,e,n,r="numeric"){if(t instanceof El())return ja(r,t.dtype,e,n),t;let s=_n(t);if(s!=="string"&&["bool","int32","float32"].indexOf(r)>=0&&(s=r),ja(r,s,e,n),t==null||!ae(t)&&!Array.isArray(t)&&typeof t!="number"&&typeof t!="boolean"&&typeof t!="string"){const u=t==null?"null":t.constructor.name;throw new Error(`Argument '${e}' passed to '${n}' must be a Tensor or TensorLike, but got '${u}'`)}const a=ze(t,s);!ae(t)&&!Array.isArray(t)&&(t=[t]);const i=s!=="string"?ir(t,s):ut(t,[],!0);return N.makeTensor(i,a,s)}function gn(t,e,n,r="numeric"){if(!Array.isArray(t))throw new Error(`Argument ${e} passed to ${n} must be a \`Tensor[]\` or \`TensorLike[]\``);return t.map((a,o)=>d(a,`${e}[${o}]`,n,r))}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const $s="__op";function w(t){const e=Object.keys(t);if(e.length!==1)throw new Error(`Please provide an object with a single key (operation name) mapping to a function. Got an object with ${e.length} keys.`);let n=e[0];const r=t[n];n.endsWith("_")&&(n=n.substring(0,n.length-1)),n=n+$s;const s=(...a)=>{N.startScope(n);try{const o=r(...a);return it(o)&&console.error("Cannot return a Promise inside of tidy."),N.endScope(o),o}catch(o){throw N.endScope(null),o}};return Object.defineProperty(s,"name",{value:n,configurable:!0}),s}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function gm(t,e){const n=d(t,"real","complex"),r=d(e,"imag","complex");fe(n.shape,r.shape,`real and imag shapes, ${n.shape} and ${r.shape}, must match in call to tf.complex().`);const s={real:n,imag:r};return N.runKernel(Go,s)}const Je=w({complex_:gm});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ft(t,e,n,r){if(r==null)r=_n(t);else if(r==="complex64")throw new Error("Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).");if(_l(t)||kl(t)){if(r!=="float32"&&r!=="int32")throw new Error(`Creating tensor from GPU data only supports 'float32'|'int32' dtype, while the dtype is ${r}.`);return N.backend.createTensorFromGPUData(t,e||n,r)}if(!ae(t)&&!Array.isArray(t)&&typeof t!="number"&&typeof t!="boolean"&&typeof t!="string")throw new Error("values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray");if(e!=null){Se(e);const s=W(e),a=W(n);g(s===a,()=>`Based on the provided shape, [${e}], the tensor should have ${s} values but has ${a}`);for(let o=0;o<n.length;++o){const i=n[o],u=o===n.length-1?i!==W(e.slice(o)):!0;g(n[o]===e[o]||!u,()=>`Error creating a new Tensor. Inferred shape (${n}) does not match the provided shape (${e}). `)}}return!ae(t)&&!Array.isArray(t)&&(t=[t]),e=e||n,t=r!=="string"?ir(t,r):ut(t,[],!0),N.makeTensor(t,e,r)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Fe(t,e,n){const r=ze(t,n);return ft(t,e,r,n)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const _t={float32:4,float16:2,int32:4,uint16:2,uint8:1,bool:1,complex64:8};class Be{static join(e){return new Be(e).slice()}constructor(e){if(this.shards=[],this.previousShardIndex=0,e==null||(e instanceof Array||(e=[e]),e=e.map(r=>ae(r)?r.buffer:r),e.length===0))return;this.bufferUniformSize=e[0].byteLength;let n=0;for(let r=0;r<e.length;r++){const s=e[r];r!==e.length-1&&s.byteLength!==this.bufferUniformSize&&(this.bufferUniformSize=void 0);const a=n+s.byteLength;this.shards.push({buffer:s,start:n,end:a}),n=a}this.shards.length===0&&(this.byteLength=0),this.byteLength=this.shards[this.shards.length-1].end}slice(e=0,n=this.byteLength){if(this.shards.length===0)return new ArrayBuffer(0);if(e=isNaN(Number(e))?0:e,n=isNaN(Number(n))?0:n,e=Math.max(0,e),n=Math.min(this.byteLength,n),n<=e)return new ArrayBuffer(0);const r=this.findShardForByte(e);if(r===-1)throw new Error(`Could not find start shard for byte ${e}`);const s=n-e,a=new ArrayBuffer(s),o=new Uint8Array(a);let i=0;for(let u=r;u<this.shards.length;u++){const l=this.shards[u],c=e+i-l.start,f=i,y=Math.min(n,l.end)-l.start,S=new Uint8Array(l.buffer,c,y-c);if(o.set(S,f),i+=S.length,n<l.end)break}return a}findShardForByte(e){if(this.shards.length===0||e<0||e>=this.byteLength)return-1;if(this.bufferUniformSize!=null)return this.previousShardIndex=Math.floor(e/this.bufferUniformSize),this.previousShardIndex;function n(s){return e<s.start?-1:e>=s.end?1:0}if(n(this.shards[this.previousShardIndex])===0)return this.previousShardIndex;const r=ym(this.shards,n);return r===-1?-1:(this.previousShardIndex=r,this.previousShardIndex)}}function ym(t,e){let n=0,r=t.length;for(;n<=r;){const s=Math.floor((r-n)/2)+n,a=e(t[s]);if(a===0)return s;a<0?r=s:n=s+1}return-1}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function bm(){R().set("PROD",!0)}function wm(){R().set("DEBUG",!0)}function Nm(){R().set("DEPRECATION_WARNINGS_ENABLED",!1),console.warn("TensorFlow.js deprecation warnings have been disabled.")}function Sm(t){R().getBool("DEPRECATION_WARNINGS_ENABLED")&&console.warn(t+" You can disable deprecation warnings with tf.disableDeprecationWarnings().")}function Tm(){N.disposeVariables()}function $m(){return N}function Em(){return N.memory()}function km(t){return N.profile(t)}function j(t,e){return N.tidy(t,e)}function pe(t){Ts(t).forEach(n=>n.dispose())}function De(t){return N.keep(t)}function _m(t){return N.time(t)}function vm(t){return N.setBackend(t)}function Im(){return N.ready()}function Dl(){return N.backendName}function xm(t){N.removeBackend(t)}function Am(t){return N.findBackend(t)}function Om(t){return N.findBackendFactory(t)}function Dm(t,e,n=1){return N.registerBackend(t,e,n)}function Fl(){return N.backend}function Fm(t,e){R().setPlatform(t,e)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const lt=4;async function Cm(t,e){const n=[],r=[],s=Array.isArray(t)?t.map(o=>o.name):Object.keys(t);for(let o=0;o<s.length;++o){const i=s[o],u=Array.isArray(t)?t[o].tensor:t[i];if(u.dtype!=="float32"&&u.dtype!=="int32"&&u.dtype!=="bool"&&u.dtype!=="string"&&u.dtype!=="complex64")throw new Error(`Unsupported dtype in weight '${i}': ${u.dtype}`);const l={name:i,shape:u.shape,dtype:u.dtype};if(u.dtype==="string"){const h=new Promise(async c=>{const f=await u.bytes(),m=f.reduce((b,T)=>b+T.length,0)+lt*f.length,y=new Uint8Array(m);let S=0;for(let b=0;b<f.length;b++){const T=f[b],A=new Uint8Array(new Uint32Array([T.length]).buffer);y.set(A,S),S+=lt,y.set(T,S),S+=T.length}c(y)});r.push(h)}else r.push(u.data());e!=null&&(l.group=e),n.push(l)}const a=await Promise.all(r);return{data:Bm(a),specs:n}}function Cl(t,e){const n=new Be(t),r={};let s=0;for(const a of e){const o=Rm(a,(i,u)=>n.slice(s+i,s+u));r[a.name]=Rl(a,n.slice(s,s+o)),s+=o}return r}function Rm(t,e){const n=W(t.shape);let r;if("quantization"in t){const s=t.quantization;r=_t[s.dtype]}else if(t.dtype==="string"){let s=0;for(let a=0;a<n;a++)s+=lt+new Uint32Array(e(s,s+lt))[0];return s}else r=_t[t.dtype];return n*r}async function Pm(t,e){const n=W(t.shape);let r;if("quantization"in t){const s=t.quantization;r=_t[s.dtype]}else if(t.dtype==="string"){let s=0;for(let a=0;a<n;a++)s+=lt+new Uint32Array(await e(s,s+lt))[0];return s}else r=_t[t.dtype];return n*r}function Rl(t,e){const n=t.name,r=t.dtype,s=t.shape,a=W(s);let o,i=0;if("quantization"in t){const u=t.quantization;if(u.dtype==="uint8"||u.dtype==="uint16"){if(!("min"in u&&"scale"in u))throw new Error(`Weight ${t.name} with quantization ${u.dtype} doesn't have corresponding metadata min and scale.`)}else if(u.dtype==="float16"){if(r!=="float32")throw new Error(`Weight ${t.name} is quantized with ${u.dtype} which only supports weights of type float32 not ${r}.`)}else throw new Error(`Weight ${t.name} has unknown quantization dtype ${u.dtype}. Supported quantization dtypes are: 'uint8', 'uint16', and 'float16'.`);const l=_t[u.dtype],h=u.dtype==="uint8"?new Uint8Array(e):new Uint16Array(e);if(r==="float32")if(u.dtype==="uint8"||u.dtype==="uint16"){o=new Float32Array(h.length);for(let c=0;c<h.length;c++){const f=h[c];o[c]=f*u.scale+u.min}}else if(u.dtype==="float16")o=Um()(h);else throw new Error(`Unsupported quantization type ${u.dtype} for weight type float32.`);else if(r==="int32"){if(u.dtype!=="uint8"&&u.dtype!=="uint16")throw new Error(`Unsupported quantization type ${u.dtype} for weight type int32.`);o=new Int32Array(h.length);for(let c=0;c<h.length;c++){const f=h[c];o[c]=Math.round(f*u.scale+u.min)}}else throw new Error(`Unsupported dtype in weight '${n}': ${r}`);i+=a*l}else if(r==="string"){const u=W(t.shape);o=[];for(let l=0;l<u;l++){const h=new Uint32Array(e.slice(i,i+lt))[0];i+=lt;const c=new Uint8Array(e.slice(i,i+h));o.push(c),i+=h}}else{const u=_t[r];if(r==="float32")o=new Float32Array(e);else if(r==="int32")o=new Int32Array(e);else if(r==="bool")o=new Uint8Array(e);else if(r==="complex64"){o=new Float32Array(e);const l=new Float32Array(o.length/2),h=new Float32Array(o.length/2);for(let y=0;y<l.length;y++)l[y]=o[y*2],h[y]=o[y*2+1];const c=Fe(l,s,"float32"),f=Fe(h,s,"float32"),m=Je(c,f);return c.dispose(),f.dispose(),m}else throw new Error(`Unsupported dtype in weight '${n}': ${r}`);i+=a*u}return Fe(o,s,r)}async function Ma(t,e,n){let r=new Uint8Array(e);for(;r.byteLength<n;){const{done:s,value:a}=await t.read();if(s&&a==null){const i=n-r.byteLength;throw new Error(`Reader is done but ${i} bytes are still expected`)}const o=new Uint8Array(r.length+a.byteLength);o.set(r,0),o.set(new Uint8Array(a),r.length),r=o}return r.buffer}async function Pl(t,e){const n={},r=t.getReader();let s=new ArrayBuffer(0);for(const a of e){const o=await Pm(a,async(l,h)=>(s=await Ma(r,s,h),s.slice(l,h)));s=await Ma(r,s,o);const i=s.slice(0,o);s=s.slice(o);const u=Rl(a,i);if(n[a.name]=u,Dl()==="webgpu"){const l=Fl();"uploadToGPU"in l&&W(u.shape)>=R().get("WEBGPU_CPU_HANDOFF_SIZE_THRESHOLD")&&l.uploadToGPU(u.dataId)}}return n}function Bm(t){if(t===null)throw new Error(`Invalid input value: ${JSON.stringify(t)}`);let e=0;const n=[];t.forEach(a=>{if(e+=a.byteLength,n.push(a.byteLength===a.buffer.byteLength?a:new a.constructor(a)),!(a instanceof Float32Array||a instanceof Int32Array||a instanceof Uint8Array))throw new Error(`Unsupported TypedArray subtype: ${a.constructor.name}`)});const r=new Uint8Array(e);let s=0;return n.forEach(a=>{r.set(new Uint8Array(a.buffer),s),s+=a.byteLength}),r.buffer}const Es=typeof Buffer<"u"&&(typeof Blob>"u"||typeof atob>"u"||typeof btoa>"u");function Wa(t){return Es?Buffer.byteLength(t,"utf8"):new Blob([t]).size}function Lm(t){if(Es)return Buffer.from(t).toString("base64");const e=new Uint8Array(t);let n="";for(let r=0,s=e.length;r<s;r++)n+=String.fromCharCode(e[r]);return btoa(n)}function zm(t){if(Es){const r=Buffer.from(t,"base64");return r.buffer.slice(r.byteOffset,r.byteOffset+r.byteLength)}const e=atob(t),n=new Uint8Array(e.length);for(let r=0;r<e.length;++r)n.set([e.charCodeAt(r)],r);return n.buffer}function Vm(t){return Be.join(t)}function Ua(t){const e="/";for(t=t.trim();t.endsWith(e);)t=t.slice(0,t.length-1);const n=t.split(e);return n[n.length-1]}function Bl(t,e){const n={modelTopology:t.modelTopology,format:t.format,generatedBy:t.generatedBy,convertedBy:t.convertedBy,weightsManifest:e};return t.signature!=null&&(n.signature=t.signature),t.userDefinedMetadata!=null&&(n.userDefinedMetadata=t.userDefinedMetadata),t.modelInitializer!=null&&(n.modelInitializer=t.modelInitializer),t.initializerSignature!=null&&(n.initializerSignature=t.initializerSignature),t.trainingConfig!=null&&(n.trainingConfig=t.trainingConfig),n}function ks(t,e,n){const r={modelTopology:t.modelTopology,format:t.format,generatedBy:t.generatedBy,convertedBy:t.convertedBy};if(t.trainingConfig!=null&&(r.trainingConfig=t.trainingConfig),t.weightsManifest!=null){if(!e)throw new Error("modelJSON has weightsManifest but weightSpecs is null");if(!n)throw new Error("modelJSON has weightsManifest but weightData is null");r.weightSpecs=e,r.weightData=n}return t.signature!=null&&(r.signature=t.signature),t.userDefinedMetadata!=null&&(r.userDefinedMetadata=t.userDefinedMetadata),t.modelInitializer!=null&&(r.modelInitializer=t.modelInitializer),t.initializerSignature!=null&&(r.initializerSignature=t.initializerSignature),r}async function _s(t,e){let n,r;return t.weightsManifest!=null&&([n,r]=await e(t.weightsManifest)),ks(t,n,r)}function xn(t){if(t.modelTopology instanceof ArrayBuffer)throw new Error("Expected JSON model topology, received ArrayBuffer.");return{dateSaved:new Date,modelTopologyType:"JSON",modelTopologyBytes:t.modelTopology==null?0:Wa(JSON.stringify(t.modelTopology)),weightSpecsBytes:t.weightSpecs==null?0:Wa(JSON.stringify(t.weightSpecs)),weightDataBytes:t.weightData==null?0:new Be(t.weightData).byteLength}}function Yn(t){const e=[];for(const n of t)e.push(...n.weights);return e}function jm(){const t=n=>{let r=n<<13,s=0;for(;!(r&8388608);)s-=8388608,r<<=1;return r&=-8388609,s+=947912704,r|s},e=new Uint32Array(2048);e[0]=0;for(let n=1;n<1024;n++)e[n]=t(n);for(let n=1024;n<2048;n++)e[n]=939524096+(n-1024<<13);return e}function Mm(){const t=new Uint32Array(64);t[0]=0,t[31]=1199570944,t[32]=2147483648,t[63]=3347054592;for(let e=1;e<31;e++)t[e]=e<<23;for(let e=33;e<63;e++)t[e]=2147483648+(e-32<<23);return t}function Wm(){const t=new Uint32Array(64);for(let e=0;e<64;e++)t[e]=1024;return t[0]=t[32]=0,t}function Um(){const t=jm(),e=Mm(),n=Wm();return r=>{const s=new ArrayBuffer(4*r.length),a=new Uint32Array(s);for(let o=0;o<r.length;o++){const i=r[o],u=t[n[i>>10]+(i&1023)]+e[i>>10];a[o]=u}return new Float32Array(s)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Q{constructor(){this.saveRouters=[],this.loadRouters=[]}static getInstance(){return Q.instance==null&&(Q.instance=new Q),Q.instance}static registerSaveRouter(e){Q.getInstance().saveRouters.push(e)}static registerLoadRouter(e){Q.getInstance().loadRouters.push(e)}static getSaveHandlers(e){return Q.getHandlers(e,"save")}static getLoadHandlers(e,n){return Q.getHandlers(e,"load",n)}static getHandlers(e,n,r){const s=[];return(n==="load"?Q.getInstance().loadRouters:Q.getInstance().saveRouters).forEach(o=>{const i=o(e,r);i!==null&&s.push(i)}),s}}const qm=t=>Q.registerSaveRouter(t),Gm=t=>Q.registerLoadRouter(t),Hm=t=>Q.getSaveHandlers(t),Km=(t,e)=>Q.getLoadHandlers(t,e);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const qr="tensorflowjs",Gr=1,Tt="models_store",rt="model_info_store";function Ll(){if(!R().getBool("IS_BROWSER"))throw new Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");const t=typeof window>"u"?self:window,e=t.indexedDB||t.mozIndexedDB||t.webkitIndexedDB||t.msIndexedDB||t.shimIndexedDB;if(e==null)throw new Error("The current browser does not appear to support IndexedDB.");return e}function Hr(t){const e=t.result;e.createObjectStore(Tt,{keyPath:"modelPath"}),e.createObjectStore(rt,{keyPath:"modelPath"})}class vt{constructor(e){if(this.indexedDB=Ll(),e==null||!e)throw new Error("For IndexedDB, modelPath must not be null, undefined or empty.");this.modelPath=e}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");return this.databaseAction(this.modelPath,e)}async load(){return this.databaseAction(this.modelPath)}databaseAction(e,n){return new Promise((r,s)=>{const a=this.indexedDB.open(qr,Gr);a.onupgradeneeded=()=>Hr(a),a.onsuccess=()=>{const o=a.result;if(n==null){const i=o.transaction(Tt,"readonly"),l=i.objectStore(Tt).get(this.modelPath);l.onsuccess=()=>{if(l.result==null)return o.close(),s(new Error(`Cannot find model with path '${this.modelPath}' in IndexedDB.`));r(l.result.modelArtifacts)},l.onerror=h=>(o.close(),s(l.error)),i.oncomplete=()=>o.close()}else{n.weightData=Be.join(n.weightData);const i=xn(n),u=o.transaction(rt,"readwrite");let l=u.objectStore(rt),h;try{h=l.put({modelPath:this.modelPath,modelArtifactsInfo:i})}catch(f){return s(f)}let c;h.onsuccess=()=>{c=o.transaction(Tt,"readwrite");const f=c.objectStore(Tt);let m;try{m=f.put({modelPath:this.modelPath,modelArtifacts:n,modelArtifactsInfo:i})}catch(y){return s(y)}m.onsuccess=()=>r({modelArtifactsInfo:i}),m.onerror=y=>{l=u.objectStore(rt);const S=l.delete(this.modelPath);S.onsuccess=()=>(o.close(),s(m.error)),S.onerror=b=>(o.close(),s(m.error))}},h.onerror=f=>(o.close(),s(h.error)),u.oncomplete=()=>{c==null?o.close():c.oncomplete=()=>o.close()}}},a.onerror=o=>s(a.error)})}}vt.URL_SCHEME="indexeddb://";const zl=t=>R().getBool("IS_BROWSER")&&!Array.isArray(t)&&t.startsWith(vt.URL_SCHEME)?Xm(t.slice(vt.URL_SCHEME.length)):null;Q.registerSaveRouter(zl);Q.registerLoadRouter(zl);function Xm(t){return new vt(t)}function Zm(t){return t.startsWith(vt.URL_SCHEME)?t.slice(vt.URL_SCHEME.length):t}class Jm{constructor(){this.indexedDB=Ll()}async listModels(){return new Promise((e,n)=>{const r=this.indexedDB.open(qr,Gr);r.onupgradeneeded=()=>Hr(r),r.onsuccess=()=>{const s=r.result,a=s.transaction(rt,"readonly"),i=a.objectStore(rt).getAll();i.onsuccess=()=>{const u={};for(const l of i.result)u[l.modelPath]=l.modelArtifactsInfo;e(u)},i.onerror=u=>(s.close(),n(i.error)),a.oncomplete=()=>s.close()},r.onerror=s=>n(r.error)})}async removeModel(e){return e=Zm(e),new Promise((n,r)=>{const s=this.indexedDB.open(qr,Gr);s.onupgradeneeded=()=>Hr(s),s.onsuccess=()=>{const a=s.result,o=a.transaction(rt,"readwrite"),i=o.objectStore(rt),u=i.get(e);let l;u.onsuccess=()=>{if(u.result==null)return a.close(),r(new Error(`Cannot find model with path '${e}' in IndexedDB.`));{const h=i.delete(e),c=()=>{l=a.transaction(Tt,"readwrite");const m=l.objectStore(Tt).delete(e);m.onsuccess=()=>n(u.result.modelArtifactsInfo),m.onerror=y=>r(u.error)};h.onsuccess=c,h.onerror=f=>(c(),a.close(),r(u.error))}},u.onerror=h=>(a.close(),r(u.error)),o.oncomplete=()=>{l==null?a.close():l.oncomplete=()=>a.close()}},s.onerror=a=>r(s.error)})}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ke="/",zt="tensorflowjs_models",Vl="info",Ym="model_topology",Qm="weight_specs",ed="weight_data",td="model_metadata";function jl(t){return{info:[zt,t,Vl].join(Ke),topology:[zt,t,Ym].join(Ke),weightSpecs:[zt,t,Qm].join(Ke),weightData:[zt,t,ed].join(Ke),modelMetadata:[zt,t,td].join(Ke)}}function Ml(t){for(const e of Object.values(t))window.localStorage.removeItem(e)}function nd(t){const e=t.split(Ke);if(e.length<3)throw new Error(`Invalid key format: ${t}`);return e.slice(1,e.length-1).join(Ke)}function rd(t){return t.startsWith(It.URL_SCHEME)?t.slice(It.URL_SCHEME.length):t}class It{constructor(e){if(!R().getBool("IS_BROWSER")||typeof window>"u"||typeof window.localStorage>"u")throw new Error("The current environment does not support local storage.");if(this.LS=window.localStorage,e==null||!e)throw new Error("For local storage, modelPath must not be null, undefined or empty.");this.modelPath=e,this.keys=jl(this.modelPath)}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");{const n=JSON.stringify(e.modelTopology),r=JSON.stringify(e.weightSpecs),s=xn(e),a=Be.join(e.weightData);try{this.LS.setItem(this.keys.info,JSON.stringify(s)),this.LS.setItem(this.keys.topology,n),this.LS.setItem(this.keys.weightSpecs,r),this.LS.setItem(this.keys.weightData,Lm(a));const o={format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,signature:e.signature!=null?e.signature:void 0,userDefinedMetadata:e.userDefinedMetadata!=null?e.userDefinedMetadata:void 0,modelInitializer:e.modelInitializer!=null?e.modelInitializer:void 0,initializerSignature:e.initializerSignature!=null?e.initializerSignature:void 0,trainingConfig:e.trainingConfig!=null?e.trainingConfig:void 0};return this.LS.setItem(this.keys.modelMetadata,JSON.stringify(o)),{modelArtifactsInfo:s}}catch{throw Ml(this.keys),new Error(`Failed to save model '${this.modelPath}' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes=${s.modelTopologyBytes}, weightSpecsBytes=${s.weightSpecsBytes}, weightDataBytes=${s.weightDataBytes}.`)}}}async load(){const e=JSON.parse(this.LS.getItem(this.keys.info));if(e==null)throw new Error(`In local storage, there is no model with name '${this.modelPath}'`);if(e.modelTopologyType!=="JSON")throw new Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");const n={},r=JSON.parse(this.LS.getItem(this.keys.topology));if(r==null)throw new Error(`In local storage, the topology of model '${this.modelPath}' is missing.`);n.modelTopology=r;const s=JSON.parse(this.LS.getItem(this.keys.weightSpecs));if(s==null)throw new Error(`In local storage, the weight specs of model '${this.modelPath}' are missing.`);n.weightSpecs=s;const a=this.LS.getItem(this.keys.modelMetadata);if(a!=null){const i=JSON.parse(a);n.format=i.format,n.generatedBy=i.generatedBy,n.convertedBy=i.convertedBy,i.signature!=null&&(n.signature=i.signature),i.userDefinedMetadata!=null&&(n.userDefinedMetadata=i.userDefinedMetadata),i.modelInitializer!=null&&(n.modelInitializer=i.modelInitializer),i.initializerSignature!=null&&(n.initializerSignature=i.initializerSignature),i.trainingConfig!=null&&(n.trainingConfig=i.trainingConfig)}const o=this.LS.getItem(this.keys.weightData);if(o==null)throw new Error(`In local storage, the binary weight values of model '${this.modelPath}' are missing.`);return n.weightData=zm(o),n}}It.URL_SCHEME="localstorage://";const Wl=t=>R().getBool("IS_BROWSER")&&!Array.isArray(t)&&t.startsWith(It.URL_SCHEME)?sd(t.slice(It.URL_SCHEME.length)):null;Q.registerSaveRouter(Wl);Q.registerLoadRouter(Wl);function sd(t){return new It(t)}class ad{constructor(){g(R().getBool("IS_BROWSER"),()=>"Current environment is not a web browser"),g(typeof window>"u"||typeof window.localStorage<"u",()=>"Current browser does not appear to support localStorage"),this.LS=window.localStorage}async listModels(){const e={},n=zt+Ke,r=Ke+Vl;for(let s=0;s<this.LS.length;++s){const a=this.LS.key(s);if(a.startsWith(n)&&a.endsWith(r)){const o=nd(a);e[o]=JSON.parse(this.LS.getItem(a))}}return e}async removeModel(e){e=rd(e);const n=jl(e);if(this.LS.getItem(n.info)==null)throw new Error(`Cannot find model at path '${e}'`);const r=JSON.parse(this.LS.getItem(n.info));return Ml(n),r}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const jt="://";class le{constructor(){this.managers={}}static getInstance(){return le.instance==null&&(le.instance=new le),le.instance}static registerManager(e,n){g(e!=null,()=>"scheme must not be undefined or null."),e.endsWith(jt)&&(e=e.slice(0,e.indexOf(jt))),g(e.length>0,()=>"scheme must not be an empty string.");const r=le.getInstance();g(r.managers[e]==null,()=>`A model store manager is already registered for scheme '${e}'.`),r.managers[e]=n}static getManager(e){const n=le.getInstance().managers[e];if(n==null)throw new Error(`Cannot find model manager for scheme '${e}'`);return n}static getSchemes(){return Object.keys(le.getInstance().managers)}}function Wn(t){if(t.indexOf(jt)===-1)throw new Error(`The url string provided does not contain a scheme. Supported schemes are: ${le.getSchemes().join(",")}`);return{scheme:t.split(jt)[0],path:t.split(jt)[1]}}async function Ul(t,e,n=!1){g(t!==e,()=>`Old path and new path are the same: '${t}'`);const r=Q.getLoadHandlers(t);g(r.length>0,()=>`Copying failed because no load handler is found for source URL ${t}.`),g(r.length<2,()=>`Copying failed because more than one (${r.length}) load handlers for source URL ${t}.`);const s=r[0],a=Q.getSaveHandlers(e);g(a.length>0,()=>`Copying failed because no save handler is found for destination URL ${e}.`),g(a.length<2,()=>`Copying failed because more than one (${r.length}) save handlers for destination URL ${e}.`);const o=a[0],i=Wn(t).scheme,u=Wn(t).path,l=i===Wn(t).scheme,h=await s.load();n&&l&&await le.getManager(i).removeModel(u);const c=await o.save(h);return n&&!l&&await le.getManager(i).removeModel(u),c.modelArtifactsInfo}async function od(){const t=le.getSchemes(),e={};for(const n of t){const r=await le.getManager(n).listModels();for(const s in r){const a=n+jt+s;e[a]=r[s]}}return e}async function id(t){const e=Wn(t);return le.getManager(e.scheme).removeModel(e.path)}async function ud(t,e){return Ul(t,e,!1)}async function ld(t,e){return Ul(t,e,!0)}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class cd{constructor(){this.messageName="setTimeoutCustom",this.functionRefs=[],this.handledMessageCount=0,this.hasEventListener=!1}fetch(e,n){return fetch(e,n)}now(){return performance.now()}encode(e,n){if(n!=="utf-8"&&n!=="utf8")throw new Error(`Browser's encoder only supports utf-8, but got ${n}`);return this.textEncoder==null&&(this.textEncoder=new TextEncoder),this.textEncoder.encode(e)}decode(e,n){return new TextDecoder(n).decode(e)}setTimeoutCustom(e,n){if(typeof window>"u"||!R().getBool("USE_SETTIMEOUTCUSTOM")){setTimeout(e,n);return}this.functionRefs.push(e),setTimeout(()=>{window.postMessage({name:this.messageName,index:this.functionRefs.length-1},"*")},n),this.hasEventListener||(this.hasEventListener=!0,window.addEventListener("message",r=>{if(r.source===window&&r.data.name===this.messageName){r.stopPropagation();const s=this.functionRefs[r.data.index];s(),this.handledMessageCount++,this.handledMessageCount===this.functionRefs.length&&(this.functionRefs=[],this.handledMessageCount=0)}},!0))}isTypedArray(e){return ml(e)}}if(R().get("IS_BROWSER")){R().setPlatform("browser",new cd);try{le.registerManager(It.URL_SCHEME,new ad)}catch{}try{le.registerManager(vt.URL_SCHEME,new Jm)}catch{}}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const hd={importFetch:()=>require("node-fetch")};let vr;class pd{constructor(){this.util=require("util"),this.textEncoder=new this.util.TextEncoder}fetch(e,n){return R().global.fetch!=null?R().global.fetch(e,n):(vr==null&&(vr=hd.importFetch()),vr(e,n))}now(){const e=process.hrtime();return e[0]*1e3+e[1]/1e6}encode(e,n){if(n!=="utf-8"&&n!=="utf8")throw new Error(`Node built-in encoder only supports utf-8, but got ${n}`);return this.textEncoder.encode(e)}decode(e,n){return e.length===0?"":new this.util.TextDecoder(n).decode(e)}isTypedArray(e){return this.util.types.isFloat32Array(e)||this.util.types.isInt32Array(e)||this.util.types.isUint8Array(e)||this.util.types.isUint8ClampedArray(e)}}R().get("IS_NODE")&&!R().get("IS_BROWSER")&&R().setPlatform("node",new pd);/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ve(t,e="float32",n){return e=e||"float32",Se(t),new Jn(t,e,n)}/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function fd(t,e){const n=d(t,"x","cast");if(!yo(e))throw new Error(`Failed to cast to unknown dtype ${e}`);if(e==="string"&&n.dtype!=="string"||e!=="string"&&n.dtype==="string")throw new Error("Only strings can be casted to strings");const r={x:n},s={dtype:e};return N.runKernel(gs,r,s)}const X=w({cast_:fd});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function md(t){const n={x:d(t,"x","clone","string_or_numeric")};return N.runKernel(bs,n)}const Xe=w({clone_:md});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function vs(t,e=!1){console.log(t.toString(e))}/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */xl();const dd={buffer:Ve,cast:X,clone:Xe,print:vs};sm(dd);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function gd(t,e){let n=d(t,"a","add"),r=d(e,"b","add");[n,r]=ee(n,r);const s={a:n,b:r};return N.runKernel(ds,s)}const C=w({add_:gd});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function yd(t,e){let n=d(t,"a","floorDiv"),r=d(e,"b","floorDiv");[n,r]=ee(n,r);const s={a:n,b:r};return N.runKernel(Ei,s)}const Is=w({floorDiv_:yd});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function bd(t,e){let n=d(t,"a","div"),r=d(e,"b","div");if([n,r]=ee(n,r),n.dtype==="int32"&&r.dtype==="int32")return Is(n,r);const s={a:n,b:r},a={};return N.runKernel(pi,s,a)}const K=w({div_:bd});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function wd(t,e){let n=d(t,"a","mul"),r=d(e,"b","mul");[n,r]=ee(n,r);const s={a:n,b:r};return N.runKernel(nu,s)}const x=w({mul_:wd});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Nd(t){const e=d(t,"x","abs");if(e.dtype==="complex64"){const n={x:e};return N.runKernel(Ho,n)}else{const n={x:e};return N.runKernel(Eo,n)}}const be=w({abs_:Nd});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Sd(t){const n={x:d(t,"x","acos")};return N.runKernel(ko,n)}const ql=w({acos_:Sd});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Td(t){const n={x:d(t,"x","acosh")};return N.runKernel(_o,n)}const Gl=w({acosh_:Td});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function $d(t){g(Array.isArray(t),()=>"The argument passed to tf.addN() must be a list of tensors"),g(t.length>=1,()=>`Must pass at least one tensor to tf.addN(), but got ${t.length}`);const e=t.map((s,a)=>d(s,`tensors${a}`,"addN")),n=e[0];e.forEach(s=>{if(s.dtype!==n.dtype)throw new Error("All tensors passed to tf.addN() must have the same dtype")}),e.forEach(s=>{if(!Re(s.shape,n.shape))throw new Error("All tensors passed to tf.addN() must have the same shape")});const r=e;return N.runKernel(vo,r)}const Hl=w({addN_:$d});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ed(t,e=null,n=!1){const s={x:d(t,"x","all","bool")},a={axis:e,keepDims:n};return N.runKernel(Io,s,a)}const Kl=w({all_:Ed});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function kd(t,e=null,n=!1){const s={x:d(t,"x","any","bool")},a={axis:e,keepDims:n};return N.runKernel(xo,s,a)}const Xl=w({any_:kd});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function _d(t,e=0){const r={x:d(t,"x","argMax")},s={axis:e};return N.runKernel(Ao,r,s)}const Zl=w({argMax_:_d});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function vd(t,e=0){const r={x:d(t,"x","argMin")},s={axis:e};return N.runKernel(Oo,r,s)}const Jl=w({argMin_:vd});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Id(t){const n={x:d(t,"x","asin")};return N.runKernel(Do,n)}const Yl=w({asin_:Id});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function xd(t){const n={x:d(t,"x","asinh")};return N.runKernel(Fo,n)}const Ql=w({asinh_:xd});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ad(t){const n={x:d(t,"x","atan")};return N.runKernel(Co,n)}const ec=w({atan_:Ad});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Od(t,e){let n=d(t,"a","atan2"),r=d(e,"b","atan2");[n,r]=ee(n,r);const s={a:n,b:r};return N.runKernel(Po,s)}const tc=w({atan2_:Od});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Dd(t){const n={x:d(t,"x","atanh")};return N.runKernel(Ro,n)}const nc=w({atanh_:Dd});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Fd(t,e,n,r,s="NHWC",a){const o=t[3],i=[...e,o],u=ac(s);return An(t,i,n,a,r,null,null,u)}function rc(t,e,n,r,s,a,o="channelsLast"){const[i,u]=yn(e);let l;if(o==="channelsLast")l=[i,u,t[3],t[3]];else if(o==="channelsFirst")l=[i,u,t[1],t[1]];else throw new Error(`Unknown dataFormat ${o}`);return An(t,l,n,r,s,a,!1,o)}function Cd(t,e,n,r,s,a,o="NDHWC"){const[i,u,l]=Kr(e);let h,c;if(o==="NDHWC")c="channelsLast",h=[i,u,l,t[4],t[4]];else if(o==="NCDHW")c="channelsFirst",h=[i,u,l,t[1],t[1]];else throw new Error(`Unknown dataFormat ${o}`);return sc(t,h,n,r,s,!1,c,a)}function An(t,e,n,r,s,a,o=!1,i="channelsLast"){let[u,l,h,c]=[-1,-1,-1,-1];if(i==="channelsLast")[u,l,h,c]=t;else if(i==="channelsFirst")[u,c,l,h]=t;else throw new Error(`Unknown dataFormat ${i}`);const[f,m,,y]=e,[S,b]=yn(n),[T,A]=yn(r),$=Mt(f,T),E=Mt(m,A),{padInfo:_,outHeight:v,outWidth:O}=Bd(s,l,h,S,b,$,E,a,i),D=o?y*c:y;let F;return i==="channelsFirst"?F=[u,D,v,O]:i==="channelsLast"&&(F=[u,v,O,D]),{batchSize:u,dataFormat:i,inHeight:l,inWidth:h,inChannels:c,outHeight:v,outWidth:O,outChannels:D,padInfo:_,strideHeight:S,strideWidth:b,filterHeight:f,filterWidth:m,effectiveFilterHeight:$,effectiveFilterWidth:E,dilationHeight:T,dilationWidth:A,inShape:t,outShape:F,filterShape:e}}function sc(t,e,n,r,s,a=!1,o="channelsLast",i){let[u,l,h,c,f]=[-1,-1,-1,-1,-1];if(o==="channelsLast")[u,l,h,c,f]=t;else if(o==="channelsFirst")[u,f,l,h,c]=t;else throw new Error(`Unknown dataFormat ${o}`);const[m,y,S,,b]=e,[T,A,$]=Kr(n),[E,_,v]=Kr(r),O=Mt(m,E),D=Mt(y,_),F=Mt(S,v),{padInfo:B,outDepth:P,outHeight:M,outWidth:U}=Ld(s,l,h,c,T,A,$,O,D,F,i),Y=a?b*f:b;let re;return o==="channelsFirst"?re=[u,Y,P,M,U]:o==="channelsLast"&&(re=[u,P,M,U,Y]),{batchSize:u,dataFormat:o,inDepth:l,inHeight:h,inWidth:c,inChannels:f,outDepth:P,outHeight:M,outWidth:U,outChannels:Y,padInfo:B,strideDepth:T,strideHeight:A,strideWidth:$,filterDepth:m,filterHeight:y,filterWidth:S,effectiveFilterDepth:O,effectiveFilterHeight:D,effectiveFilterWidth:F,dilationDepth:E,dilationHeight:_,dilationWidth:v,inShape:t,outShape:re,filterShape:e}}function Rd(t,e,n,r,s){r==null&&(r=xs(t,e,n));const a=t[0],o=t[1],i=bn((a-e+2*r)/n+1,s),u=bn((o-e+2*r)/n+1,s);return[i,u]}function Pd(t,e,n,r,s,a){s==null&&(s=xs(t,e[0],r[0]));const o=[0,0,0,n];for(let i=0;i<3;i++)t[i]+2*s>=e[i]&&(o[i]=bn((t[i]-e[i]+2*s)/r[i]+1,a));return o}function xs(t,e,n,r=1){const s=Mt(e,r);return Math.floor((t[0]*(n-1)-n+s)/2)}function yn(t){return typeof t=="number"?[t,t,t]:t.length===2?[t[0],t[1],1]:t}function Kr(t){return typeof t=="number"?[t,t,t]:t}function Mt(t,e){return e<=1?t:t+(t-1)*(e-1)}function Bd(t,e,n,r,s,a,o,i,u){let l,h,c;if(typeof t=="number"){l={top:t,bottom:t,left:t,right:t,type:t===0?"VALID":"NUMBER"};const m=Rd([e,n],a,r,t,i);h=m[0],c=m[1]}else if(t==="same"){h=Math.ceil(e/r),c=Math.ceil(n/s);const f=Math.max(0,(h-1)*r+a-e),m=Math.max(0,(c-1)*s+o-n),y=Math.floor(f/2),S=f-y,b=Math.floor(m/2),T=m-b;l={top:y,bottom:S,left:b,right:T,type:"SAME"}}else if(t==="valid")l={top:0,bottom:0,left:0,right:0,type:"VALID"},h=Math.ceil((e-a+1)/r),c=Math.ceil((n-o+1)/s);else if(typeof t=="object"){const f=u==="channelsLast"?t[1][0]:t[2][0],m=u==="channelsLast"?t[1][1]:t[2][1],y=u==="channelsLast"?t[2][0]:t[3][0],S=u==="channelsLast"?t[2][1]:t[3][1];l={top:f,bottom:m,left:y,right:S,type:f===0&&m===0&&y===0&&S===0?"VALID":"EXPLICIT"},h=bn((e-a+f+m)/r+1,i),c=bn((n-o+y+S)/s+1,i)}else throw Error(`Unknown padding parameter: ${t}`);return{padInfo:l,outHeight:h,outWidth:c}}function Ld(t,e,n,r,s,a,o,i,u,l,h){let c,f,m,y;if(t==="valid"&&(t=0),typeof t=="number"){c={top:t,bottom:t,left:t,right:t,front:t,back:t,type:t===0?"VALID":"NUMBER"};const b=Pd([e,n,r,1],[i,u,l],1,[s,a,o],t,h);f=b[0],m=b[1],y=b[2]}else if(t==="same"){f=Math.ceil(e/s),m=Math.ceil(n/a),y=Math.ceil(r/o);const S=(f-1)*s+i-e,b=(m-1)*a+u-n,T=(y-1)*o+l-r,A=Math.floor(S/2),$=S-A,E=Math.floor(b/2),_=b-E,v=Math.floor(T/2),O=T-v;c={top:E,bottom:_,left:v,right:O,front:A,back:$,type:"SAME"}}else throw Error(`Unknown padding parameter: ${t}`);return{padInfo:c,outDepth:f,outHeight:m,outWidth:y}}function bn(t,e){if(!e)return Math.trunc(t);switch(e){case"round":return Math.round(t);case"ceil":return Math.ceil(t);case"floor":return Math.floor(t);default:throw new Error(`Unknown roundingMode ${e}`)}}function wn(t){const[e,n,r]=yn(t);return e===1&&n===1&&r===1}function Ye(t,e){return wn(t)||wn(e)}function xt(t){return yn(t).every(e=>e>0)}function ac(t){if(t==="NHWC")return"channelsLast";if(t==="NCHW")return"channelsFirst";throw new Error(`Unknown dataFormat ${t}`)}function Ae(t,e,n){if(n!=null){if(typeof e=="string")throw Error(`Error in ${t}: pad must be an integer when using dimRoundingMode ${n} but got pad ${e}.`);if(typeof e=="number")g(qt(e),()=>`Error in ${t}: pad must be an integer when using dimRoundingMode ${n} but got pad ${e}.`);else if(typeof e=="object")e.forEach(r=>{r.forEach(s=>{g(qt(s),()=>`Error in ${t}: pad must be an integer when using dimRoundingMode ${n} but got pad ${s}.`)})});else throw Error(`Error in ${t}: Unknown padding parameter: ${e}`)}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function zd(t,e){const r={x:d(t,"x","reshape","string_or_numeric")},s={shape:e};return N.runKernel(Tu,r,s)}const k=w({reshape_:zd});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Vd(t,e,n,r,s){const a=d(t,"x","avgPool","float32"),o=1;g(Ye(n,o),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${n} and dilations '${o}'`);let i=a,u=!1;a.rank===3&&(u=!0,i=k(a,[1,a.shape[0],a.shape[1],a.shape[2]])),g(i.rank===4,()=>`Error in avgPool: x must be rank 4 but got rank ${i.rank}.`),Ae("avgPool",r,s);const l={x:i},h={filterSize:e,strides:n,pad:r,dimRoundingMode:s};let c=N.runKernel(Bo,l,h);return c=X(c,a.dtype),u?k(c,[c.shape[1],c.shape[2],c.shape[3]]):c}const As=w({avgPool_:Vd});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function jd(t,e,n,r,s,a="NDHWC"){const o=d(t,"x","avgPool3d","float32");let i=o,u=!1;o.rank===4&&(u=!0,i=k(o,[1,o.shape[0],o.shape[1],o.shape[2],o.shape[3]])),g(i.rank===5,()=>`Error in avgPool3d: x must be rank 5 but got rank ${i.rank}.`),g(a==="NDHWC",()=>`Error in avgPool3d: Only NDHWC is currently supported, but got dataFormat of ${a}`),g(typeof n=="number"&&n>0||Array.isArray(n)&&n[0]>0&&n[1]>0&&n[2]>0,()=>`Error in avgPool3d: Stride must be > 0, but got '${n}'`),Ae("avgPool3d",r,s);const l={x:i},h={filterSize:e,strides:n,pad:r,dimRoundingMode:s,dataFormat:a};let c=N.runKernel(Lo,l,h);return c=X(c,i.dtype),u?k(c,[c.shape[1],c.shape[2],c.shape[3],c.shape[4]]):c}const oc=w({avgPool3d_:jd});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Md(t,e=0){g(t.length>=1,()=>"Pass at least one tensor to concat");const n=gn(t,"tensors","concat","string_or_numeric");if(n[0].dtype==="complex64"&&n.forEach(a=>{if(a.dtype!=="complex64")throw new Error(`Cannot concatenate complex64 tensors with a tensor
          with dtype ${a.dtype}. `)}),n.length===1)return Xe(n[0]);const r=n,s={axis:e};return N.runKernel(Ko,r,s)}const ue=w({concat_:Md});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Wd(t,e,n=!1,r=!1){let s=d(t,"a","matMul"),a=d(e,"b","matMul");[s,a]=ee(s,a);const o={a:s,b:a},i={transposeA:n,transposeB:r};return N.runKernel(zo,o,i)}const V=w({matMul_:Wd});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ud(t){const n={x:d(t,"x","sigmoid","float32")};return N.runKernel(Lu,n)}const Et=w({sigmoid_:Ud});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function qd(t,e,n){const r=d(t,"x","slice","string_or_numeric");if(r.rank===0)throw new Error("Slicing scalar is not possible");const s={x:r},a={begin:e,size:n};return N.runKernel(Cu,s,a)}const q=w({slice_:qd});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Gd(t){const n={x:d(t,"x","tanh","float32")};return N.runKernel(sl,n)}const Qn=w({tanh_:Gd});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Hd(t,e,n,r,s,a){const o=d(t,"forgetBias","basicLSTMCell"),i=d(e,"lstmKernel","basicLSTMCell"),u=d(n,"lstmBias","basicLSTMCell"),l=d(r,"data","basicLSTMCell"),h=d(s,"c","basicLSTMCell"),c=d(a,"h","basicLSTMCell"),f=ue([l,c],1),m=V(f,i),y=C(m,u),S=y.shape[0],b=y.shape[1]/4,T=[S,b],A=q(y,[0,0],T),$=q(y,[0,b],T),E=q(y,[0,b*2],T),_=q(y,[0,b*3],T),v=C(x(Et(A),Qn($)),x(h,Et(C(o,E)))),O=x(Qn(v),Et(_));return[v,O]}const ic=w({basicLSTMCell_:Hd});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Kd(t,e,n){const r=d(t,"x","batchToSpaceND"),s=e.reduce((i,u)=>i*u);g(r.rank>=1+e.length,()=>`input rank is ${r.rank} but should be > than blockShape.length ${e.length}`),g(n.length===e.length,()=>`crops.length is ${n.length} but should be equal to blockShape.length  ${e.length}`),g(r.shape[0]%s===0,()=>`input tensor batch is ${r.shape[0]} but is not divisible by the product of the elements of blockShape ${e.join(" * ")} === ${s}`);const a={x:r},o={blockShape:e,crops:n};return N.runKernel(Vo,a,o)}const Os=w({batchToSpaceND_:Kd});function Xd(t){let e;return t.rank===0||t.rank===1?e=k(t,[1,1,1,t.size]):t.rank===2?e=k(t,[1,1,t.shape[0],t.shape[1]]):t.rank===3?e=k(t,[1,t.shape[0],t.shape[1],t.shape[2]]):e=t,e}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Zd(t,e,n,r,s,a){a==null&&(a=.001);const o=d(t,"x","batchNorm"),i=d(e,"mean","batchNorm"),u=d(n,"variance","batchNorm");let l;s!=null&&(l=d(s,"scale","batchNorm"));let h;r!=null&&(h=d(r,"offset","batchNorm")),g(i.rank===u.rank,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),g(h==null||i.rank===h.rank,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),g(l==null||i.rank===l.rank,()=>"Batch normalization gradient requires mean and scale to have equal ranks.");const f={x:Xd(o),scale:l,offset:h,mean:i,variance:u},m={varianceEpsilon:a},y=N.runKernel(ki,f,m);return k(y,o.shape)}const On=w({batchNorm_:Zd});function Jd(t,e,n,r,s,a){const o=d(t,"x","batchNorm"),i=d(e,"mean","batchNorm"),u=d(n,"variance","batchNorm");let l;s!=null&&(l=d(s,"scale","batchNorm"));let h;return r!=null&&(h=d(r,"offset","batchNorm")),g(o.rank===2,()=>`Error in batchNorm2D: x must be rank 2 but got rank ${o.rank}.`),g(i.rank===2||i.rank===1,()=>`Error in batchNorm2D: mean must be rank 2 or rank 1 but got rank ${i.rank}.`),g(u.rank===2||u.rank===1,()=>`Error in batchNorm2D: variance must be rank 2 or rank 1 but got rank ${u.rank}.`),l!=null&&g(l.rank===2||l.rank===1,()=>`Error in batchNorm2D: scale must be rank 2 or rank 1 but got rank ${l.rank}.`),h!=null&&g(h.rank===2||h.rank===1,()=>`Error in batchNorm2D: offset must be rank 2 or rank 1 but got rank ${h.rank}.`),On(o,i,u,h,l,a)}const uc=w({batchNorm2d_:Jd});function Yd(t,e,n,r,s,a){const o=d(t,"x","batchNorm"),i=d(e,"mean","batchNorm"),u=d(n,"variance","batchNorm");let l;s!=null&&(l=d(s,"scale","batchNorm"));let h;return r!=null&&(h=d(r,"offset","batchNorm")),g(o.rank===3,()=>`Error in batchNorm3D: x must be rank 3 but got rank ${o.rank}.`),g(i.rank===3||i.rank===1,()=>`Error in batchNorm3D: mean must be rank 3 or rank 1 but got rank ${i.rank}.`),g(u.rank===3||u.rank===1,()=>`Error in batchNorm3D: variance must be rank 3 or rank 1 but got rank ${u.rank}.`),l!=null&&g(l.rank===3||l.rank===1,()=>`Error in batchNorm3D: scale must be rank 3 or rank 1 but got rank ${l.rank}.`),h!=null&&g(h.rank===3||h.rank===1,()=>`Error in batchNorm3D: offset must be rank 3 or rank 1 but got rank ${h.rank}.`),On(o,i,u,h,l,a)}const lc=w({batchNorm3d_:Yd});function Qd(t,e,n,r,s,a){const o=d(t,"x","batchNorm"),i=d(e,"mean","batchNorm"),u=d(n,"variance","batchNorm");let l;s!=null&&(l=d(s,"scale","batchNorm"));let h;return r!=null&&(h=d(r,"offset","batchNorm")),g(o.rank===4,()=>`Error in batchNorm4D: x must be rank 4 but got rank ${o.rank}.`),g(i.rank===4||i.rank===1,()=>`Error in batchNorm4D: mean must be rank 4 or rank 1 but got rank ${i.rank}.`),g(u.rank===4||u.rank===1,()=>`Error in batchNorm4D: variance must be rank 4 or rank 1 but got rank ${u.rank}.`),l!=null&&g(l.rank===4||l.rank===1,()=>`Error in batchNorm4D: scale must be rank 4 or rank 1 but got rank ${l.rank}.`),h!=null&&g(h.rank===4||h.rank===1,()=>`Error in batchNorm4D: offset must be rank 4 or rank 1 but got rank ${h.rank}.`),On(o,i,u,h,l,a)}const cc=w({batchNorm4d_:Qd});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function eg(t,e,n){const r=d(t,"x","bincount"),s=d(e,"weights","bincount");g(r.dtype==="int32",()=>`Error in bincount: input dtype must be int32, but got ${r.dtype}`),g(n>=0,()=>`size must be non-negative, but got ${n}.`),g(s.size===r.size||s.size===0,()=>`Error in bincount: weights must have the same size as input or0-length, but got input shape: ${r.shape}, weights shape: ${s.shape}.`);const a={x:r,weights:s},o={size:n};return N.runKernel(jo,a,o)}const Ds=w({bincount_:eg});/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function tg(t,e){const n=d(t,"x","bitwiseAnd"),r=d(e,"y","bitwiseAnd");if(!Re(n.shape,r.shape))throw new Error(`BitwiseAnd: Tensors must have the same shape. x: ${n.shape}, y: ${r.shape}`);if(n.dtype!=="int32"||r.dtype!=="int32")throw new Error(`BitwiseAnd: Only supports 'int32' values in tensor, found type of x: ${n.dtype} and type of y: ${r.dtype}`);const s={a:n,b:r};return N.runKernel(Mo,s)}const hc=w({bitwiseAnd_:tg});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ng(t,e){const n=d(t,"s0","broadcastArgs","int32"),r=d(e,"s1","broadcastArgs","int32");if(n.rank!==1)throw new Error(`broadcastArgs(): first input must be a vector (rank=1). Has rank ${n.rank}`);if(r.rank!==1)throw new Error(`broadcastArgs(): second input must be a vector (rank=1). Has rank ${r.rank}`);const s={s0:n,s1:r};return N.runKernel(Wo,s)}const pc=w({broadcastArgs_:ng});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function rg(t,e){let n=d(t,"broadcastTo","x");const r=n.shape;if(Se(e),e.length<n.rank)throw new Error(`broadcastTo(): shape.length=${e.length} < input.rank=${n.rank}.`);if(e.length>n.rank){const l=n.shape.slice();for(;l.length<e.length;)l.unshift(1);n=k(n,l)}const s=n.shape,a=Array.from(e);for(let l=e.length-1;l>=0;l--)if(s[l]===e[l])a[l]=1;else if(n.shape[l]!==1)throw new Error(`broadcastTo(): [${r}] cannot be broadcast to [${e}].`);if(a.map((l,h)=>l>1?h:-1).filter(l=>l>=0).length===0)return Xe(n);const i={x:n},u={reps:a};return N.runKernel(ws,i,u)}const cn=w({broadcastTo_:rg});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function sg(t){const n={x:d(t,"x","ceil","float32")};return N.runKernel(Uo,n)}const fc=w({ceil_:sg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function tn(t,e,n){Se(t),n=n||_n(e);const r={shape:t,value:e,dtype:n};return N.runKernel(Si,{},r)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ag(t,e,n){const r=d(t,"x","clipByValue");if(g(e<=n,()=>`Error in clip: min (${e}) must be less than or equal to max (${n}).`),e===n)return tn(r.shape,e,r.dtype);const s={x:r},a={clipValueMin:e,clipValueMax:n};return N.runKernel(qo,s,a)}const mc=w({clipByValue_:ag});function og(t){return ue(t,0)}const dc=w({concat1d_:og});function ig(t,e){return ue(t,e)}const gc=w({concat2d_:ig});function ug(t,e){return ue(t,e)}const yc=w({concat3d_:ug});function lg(t,e){return ue(t,e)}const bc=w({concat4d_:lg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function cg(t,e,n,r,s="NHWC",a=[1,1],o){const i=d(t,"x","conv2d","float32"),u=d(e,"filter","conv2d","float32");let l=i,h=!1;i.rank===3&&(h=!0,l=k(i,[1,i.shape[0],i.shape[1],i.shape[2]])),g(l.rank===4,()=>`Error in conv2d: input must be rank 4, but got rank ${l.rank}.`),g(u.rank===4,()=>`Error in conv2d: filter must be rank 4, but got rank ${u.rank}.`),Ae("conv2d",r,o);const c=s==="NHWC"?l.shape[3]:l.shape[1];g(c===u.shape[2],()=>`Error in conv2d: depth of input (${c}) must match input depth for filter ${u.shape[2]}.`),g(Ye(n,a),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${n} and dilations '${a}'`),g(xt(a),()=>"Error in conv2D: Dilated rates should be larger than 0."),g(xt(n),()=>"Error in conv2D: Strides should be larger than 0.");const f={x:l,filter:u},m={strides:n,pad:r,dataFormat:s,dilations:a,dimRoundingMode:o},y=N.runKernel(Xo,f,m);return h?k(y,[y.shape[1],y.shape[2],y.shape[3]]):y}const Dn=w({conv2d_:cg});function hg(t,e,n,r,s="NWC",a=1,o){const i=d(t,"x","conv1d"),u=d(e,"filter","conv1d");let l=i,h=!1;i.rank===2&&(h=!0,l=k(i,[1,i.shape[0],i.shape[1]])),g(l.rank===3,()=>`Error in conv1d: input must be rank 3, but got rank ${l.rank}.`),g(u.rank===3,()=>`Error in conv1d: filter must be rank 3, but got rank ${u.rank}.`),Ae("conv1d",r,o),g(l.shape[2]===u.shape[1],()=>`Error in conv1d: depth of input (${l.shape[2]}) must match input depth for filter ${u.shape[1]}.`),g(Ye(n,a),()=>`Error in conv1D: Either stride or dilation must be 1. Got stride ${n} and dilation '${a}'`),g(xt(a),()=>"Error in conv1D: Dilated rates should be larger than 0."),g(xt(n),()=>"Error in conv1D: Stride should be larger than 0."),g(s==="NWC",()=>`Error in conv1d: got dataFormat of ${s} but only NWC is currently supported.`);const c=k(u,[1,u.shape[0],u.shape[1],u.shape[2]]),f=k(l,[l.shape[0],1,l.shape[1],l.shape[2]]),b=Dn(f,c,[1,n],r,"NHWC",[1,a],o);return h?k(b,[b.shape[2],b.shape[3]]):k(b,[b.shape[0],b.shape[2],b.shape[3]])}const wc=w({conv1d_:hg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function pg(t,e,n,r,s,a="NHWC",o){g(t.length===e.rank,()=>`Length of inShape (${t.length}) and rank of dy (${e.rank}) must match`);let i=t,u=e,l=!1;e.rank===3&&(l=!0,u=k(e,[1,e.shape[0],e.shape[1],e.shape[2]]),i=[1,t[0],t[1],t[2]]),g(i.length===4,()=>`Error in conv2dDerInput: inShape must be length 4, but got length ${i.length}.`),g(u.rank===4,()=>`Error in conv2dDerInput: dy must be rank 4, but got rank ${u.rank}`),g(n.rank===4,()=>`Error in conv2dDerInput: filter must be rank 4, but got rank ${n.rank}`);const h=a==="NHWC"?i[3]:i[1],c=a==="NHWC"?u.shape[3]:u.shape[1];g(h===n.shape[2],()=>`Error in conv2dDerInput: depth of input (${h}) must match input depth for filter ${n.shape[2]}.`),g(c===n.shape[3],()=>`Error in conv2dDerInput: depth of output (${c}) must match output depth for filter ${n.shape[3]}.`),Ae("conv2dDerInput",s,o);const f={dy:u,filter:n},m={strides:r,pad:s,dataFormat:a,dimRoundingMode:o,inputShape:i},y=N.runKernel(Jo,f,m);return l?k(y,[y.shape[1],y.shape[2],y.shape[3]]):y}const Nc=w({conv2DBackpropInput_:pg});function fg(t,e,n,r,s,a){const o=d(t,"x","conv2dTranspose"),i=d(e,"filter","conv2dTranspose");return Nc(n,o,i,r,s,"NHWC",a)}const Sc=w({conv2dTranspose_:fg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function mg(t,e,n,r,s="NDHWC",a=[1,1,1]){const o=d(t,"x","conv3d"),i=d(e,"filter","conv3d");let u=o,l=!1;o.rank===4&&(l=!0,u=k(o,[1,o.shape[0],o.shape[1],o.shape[2],o.shape[3]])),g(u.rank===5,()=>`Error in conv3d: input must be rank 5, but got rank ${u.rank}.`),g(i.rank===5,()=>`Error in conv3d: filter must be rank 5, but got rank ${i.rank}.`),g(u.shape[4]===i.shape[3],()=>`Error in conv3d: depth of input (${u.shape[4]}) must match input depth for filter ${i.shape[3]}.`),g(Ye(n,a),()=>`Error in conv3D: Either strides or dilations must be 1. Got strides ${n} and dilations '${a}'`),g(s==="NDHWC",()=>`Error in conv3d: got dataFormat of ${s} but only NDHWC is currently supported.`),g(xt(a),()=>"Error in conv3D: Dilated rates should be larger than 0."),g(xt(n),()=>"Error in conv3D: Strides should be larger than 0.");const h={x:u,filter:i},c={strides:n,pad:r,dataFormat:s,dilations:a},f=N.runKernel(Yo,h,c);return l?k(f,[f.shape[1],f.shape[2],f.shape[3],f.shape[4]]):f}const Tc=w({conv3d_:mg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function dg(t,e,n,r,s){g(t.length===e.rank,()=>`Length of inShape (${t.length}) and rank of dy (${e.rank}) must match`);let a=t,o=e,i=!1;e.rank===4&&(i=!0,o=k(e,[1,e.shape[0],e.shape[1],e.shape[2],e.shape[3]]),a=[1,t[0],t[1],t[2],t[3]]);const u=a[4],l=o.shape[4];g(a.length===5,()=>`Error in conv3dDerInput: inShape must be length 5, but got length ${a.length}.`),g(o.rank===5,()=>`Error in conv3dDerInput: dy must be rank 5, but got rank ${o.rank}`),g(n.rank===5,()=>`Error in conv3dDerInput: filter must be rank 5, but got rank ${n.rank}`),g(u===n.shape[3],()=>`Error in conv3dDerInput: depth of input (${u}) must match input depth for filter ${n.shape[3]}.`),g(l===n.shape[4],()=>`Error in conv3dDerInput: depth of output (${l}) must match output depth for filter ${n.shape[4]}.`);const h={dy:o,filter:n},c={pad:s,strides:r,inputShape:a},f=N.runKernel(Qo,h,c);return i?k(f,[f.shape[1],f.shape[2],f.shape[3],f.shape[4]]):f}const gg=w({conv3DBackpropInput_:dg});function yg(t,e,n,r,s){const a=d(t,"x","conv3dTranspose"),o=d(e,"filter","conv3dTranspose");return gg(n,a,o,r,s)}const $c=w({conv3dTranspose_:yg});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function bg(t){const n={x:d(t,"x","cos","float32")};return N.runKernel(ei,n)}const Ec=w({cos_:bg});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function wg(t){const n={x:d(t,"x","cosh","float32")};return N.runKernel(ti,n)}const kc=w({cosh_:wg});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ng(t,e=0,n=!1,r=!1){const a={x:d(t,"x","cumprod")},o={axis:e,exclusive:n,reverse:r};return N.runKernel(ni,a,o)}const _c=w({cumprod_:Ng});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Sg(t,e=0,n=!1,r=!1){const a={x:d(t,"x","cumsum")},o={axis:e,exclusive:n,reverse:r};return N.runKernel(ri,a,o)}const vc=w({cumsum_:Sg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Tg(t,e,n,r=!1){const s=d(t,"x","denseBincount"),a=d(e,"weights","denseBincount");g(s.dtype==="int32",()=>`Error in denseBincount: input dtype must be int32, but got ${s.dtype}`),g(s.rank<=2,()=>`Error in denseBincount: input must be at most rank 2, but got rank ${s.rank}.`),g(n>=0,()=>`size must be non-negative, but got ${n}.`),g(a.size===s.size||a.size===0,()=>`Error in denseBincount: weights must have the same shape as x or 0-length, but got x shape: ${s.shape}, weights shape: ${a.shape}.`);const o={x:s,weights:a},i={size:n,binaryOutput:r};return N.runKernel(ai,o,i)}const Ic=w({denseBincount_:Tg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function $g(t,e,n="NHWC"){const r=d(t,"x","depthToSpace","float32"),s=n==="NHWC"?r.shape[1]:r.shape[2],a=n==="NHWC"?r.shape[2]:r.shape[3],o=n==="NHWC"?r.shape[3]:r.shape[1];g(e>1,()=>`blockSize should be > 1 for depthToSpace, but was: ${e}`),g(s*e>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${s} and ${e}  for depthToSpace with input shape
    ${r.shape}`),g(a*e>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${a} and ${e} for depthToSpace with input shape
        ${r.shape}`),g(o%(e*e)===0,()=>`Dimension size must be evenly divisible by ${e*e} but is ${o} for depthToSpace with input shape ${r.shape}`);const i={x:r},u={blockSize:e,dataFormat:n};return N.runKernel(oi,i,u)}const xc=w({depthToSpace_:$g});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Eg(t,e,n,r,s="NHWC",a=[1,1],o){const i=d(t,"x","depthwiseConv2d","float32"),u=d(e,"filter","depthwiseConv2d","float32");let l=i,h=!1;i.rank===3&&(h=!0,l=k(i,[1,i.shape[0],i.shape[1],i.shape[2]])),g(l.rank===4,()=>`Error in depthwiseConv2d: input must be rank 4, but got rank ${l.rank}.`),g(u.rank===4,()=>`Error in depthwiseConv2d: filter must be rank 4, but got rank ${u.rank}.`);const c=s==="NHWC"?l.shape[3]:l.shape[1];g(c===u.shape[2],()=>`Error in depthwiseConv2d: number of input channels (${c}) must match the inChannels dimension in filter ${u.shape[2]}.`),Ae("depthwiseConv2d",r,o);const f={x:l,filter:u},m={strides:n,pad:r,dataFormat:s,dilations:a,dimRoundingMode:o},y=N.runKernel(ii,f,m);return h?k(y,[y.shape[1],y.shape[2],y.shape[3]]):y}const lr=w({depthwiseConv2d_:Eg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function kg(t){const n={x:d(t,"x","diag")};return N.runKernel(ci,n)}const Ac=w({diag_:kg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function _g(t,e,n,r,s=[1,1],a="NHWC"){const o=d(t,"x","dilation2d"),i=d(e,"filter","dilation2d");g(o.rank===3||o.rank===4,()=>`Error in dilation2d: input must be rank 3 or 4, but got rank ${o.rank}.`),g(i.rank===3,()=>`Error in dilation2d: filter must be rank 3, but got rank ${i.rank}.`),g(a==="NHWC",()=>`Error in dilation2d: Only NHWC is currently supported, but got dataFormat of ${a}`);let u=o,l=!1;o.rank===3&&(u=k(o,[1,o.shape[0],o.shape[1],o.shape[2]]),l=!0),g(u.shape[3]===i.shape[2],()=>`Error in dilation2d:  input and filter must have the same depth: ${u.shape[3]} vs ${i.shape[2]}`);const h={x:u,filter:i},c={strides:n,pad:r,dilations:s},f=N.runKernel(hi,h,c);return l?k(f,[f.shape[1],f.shape[2],f.shape[3]]):f}const Oc=w({dilation2d_:_g});/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Dc(t,e){const n=t.length,r=[];for(let s=0;s<n;s++){const a=n-1-s,o=t[a]||1;(e[e.length-1-s]||1)>1&&o===1&&r.unshift(a)}return r}function Fs(t,e){const n=[];for(let r=0;r<e.length;r++){const s=t[t.length-r-1],a=e.length-r-1,o=e[a];(s==null||s===1&&o>1)&&n.unshift(a)}return n}function ne(t,e){const n=Math.max(t.length,e.length),r=new Array(n);for(let s=0;s<n;s++){let a=t[t.length-s-1];a==null&&(a=1);let o=e[e.length-s-1];if(o==null&&(o=1),a===1)r[n-s-1]=o;else if(o===1)r[n-s-1]=a;else if(a!==o){const i=`Operands could not be broadcast together with shapes ${t} and ${e}.`;throw Error(i)}else r[n-s-1]=a}return r}const vg=Object.freeze(Object.defineProperty({__proto__:null,assertAndGetBroadcastShape:ne,getBroadcastDims:Dc,getReductionAxes:Fs},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ig(t,e){let n=d(t,"a","equal","string_or_numeric"),r=d(e,"b","equal","string_or_numeric");[n,r]=ee(n,r),ne(n.shape,r.shape);const s={a:n,b:r};return N.runKernel(gi,s)}const Cs=w({equal_:Ig});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function xg(t,e,n){const r=d(e,"a","where"),s=d(n,"b","where"),a=d(t,"condition","where","bool"),o=ne(ne(a.shape,r.shape),s.shape),i=cn(a,o),u=cn(r,o),l=cn(s,o),h={condition:i,t:u,e:l};return N.runKernel(Du,h)}const Ze=w({where_:xg});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ag(t){const n={x:d(t,"x","zerosLike")};return N.runKernel(cl,n)}const Ne=w({zerosLike_:Ag});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Og(t,e){let n=d(t,"a","div"),r=d(e,"b","div");[n,r]=ee(n,r);const s=K(n,r),a=Ne(s),o=Cs(r,a);return Ze(o,a,s)}const Fc=w({divNoNan_:Og});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Dg(t,e){const n=d(t,"t1","dot"),r=d(e,"t2","dot");g((n.rank===1||n.rank===2)&&(r.rank===1||r.rank===2),()=>`Error in dot: inputs must all be rank 1 or 2, but got ranks ${n.rank} and ${r.rank}.`);const s=n.rank===1?n.size:n.shape[1],a=r.rank===1?r.size:r.shape[0];if(g(s===a,()=>`Error in dot: inner dimensions of inputs must match, but got ${s} and ${a}.`),n.rank===1&&r.rank===1){const o=k(n,[1,-1]),i=k(r,[-1,1]),u=V(o,i);return k(u,[])}else if(n.rank===1&&r.rank===2){const o=k(n,[1,-1]),i=k(r,[r.shape[0],r.shape[1]]),u=V(o,i);return k(u,[u.size])}else if(n.rank===2&&r.rank===1){const o=k(r,[-1,1]),i=V(n,o);return k(i,[i.size])}else{const o=k(r,[r.shape[0],r.shape[1]]);return V(n,o)}}const Cc=w({dot_:Dg});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Fg(t,...e){const n=e.map((s,a)=>d(s,`tensors${a}`,"einsum")),r={equation:t};return N.runKernel(fi,n,r)}const wt=w({einsum_:Fg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Cg(t){const n={x:d(t,"x","elu","float32")};return N.runKernel(mi,n)}const Rs=w({elu_:Cg});/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Rg(t,e){const n=d(t,"x","ensureShape","string_or_numeric");if(!po(n.shape,e))throw new Error(`EnsureShape: Shape of tensor ${n.shape} is not compatible with expected shape ${e}`);return t}const Rc=w({ensureShape_:Rg});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Pg(t){let e=d(t,"x","erf");g(e.dtype==="int32"||e.dtype==="float32",()=>"Input dtype must be `int32` or `float32`."),e.dtype==="int32"&&(e=X(e,"float32"));const n={x:e};return N.runKernel(di,n)}const Pc=w({erf_:Pg});/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ps(t,e){for(let n=0;n<t.length;++n)if(t[t.length-n-1]!==e-1-n)return!1;return!0}function Bc(t,e,n){const r=t.length+e.length,s=[];let a=0,o=0;for(let i=0;i<r;i++)n.indexOf(i)===-1?s.push(t[a++]):s.push(e[o++]);return s}function Bg(t,e){const n=[],r=t.length;for(let a=0;a<r;a++)e.indexOf(a)===-1&&n.push(t[a]);const s=e.map(a=>t[a]);return[n,s]}function Fn(t,e){const n=e.map(r=>1);return Bc(t,n,e)}function Lg(t,e,n){g(Ps(e,n),()=>`${t} supports only inner-most axes for now. Got axes ${e} and rank-${n} input.`)}function zg(t,e){if(Ps(t,e))return null;const n=[];for(let r=0;r<e;++r)t.indexOf(r)===-1&&n.push(r);return t.forEach(r=>n.push(r)),n}function Vg(t){return t.map((e,n)=>[n,e]).sort((e,n)=>e[1]-n[1]).map(e=>e[0])}function jg(t,e){const n=[];for(let r=e-t;r<e;++r)n.push(r);return n}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Mg(t,e=null,n=!1){const s={x:d(t,"x","max")},a={reductionIndices:e,keepDims:n};return N.runKernel(qi,s,a)}const kt=w({max_:Mg});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Wg(t,e=null,n=!1){const s={x:d(t,"x","min")},a={axis:e,keepDims:n};return N.runKernel(Ji,s,a)}const er=w({min_:Wg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ug(t,e){let n=d(t,"base","pow"),r=d(e,"exp","pow");[n,r]=ee(n,r);const s={a:n,b:r};return N.runKernel(pu,s)}const Xt=w({pow_:Ug});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function z(t,e){if((ae(t)&&e!=="string"||Array.isArray(t))&&e!=="complex64")throw new Error("Error creating a new Scalar: value must be a primitive (number|boolean|string)");if(e==="string"&&ae(t)&&!(t instanceof Uint8Array))throw new Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return ft(t,[],[],e)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function qg(t){const n={x:d(t,"x","sqrt","float32")};return N.runKernel(Vu,n)}const je=w({sqrt_:qg});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Gg(t){const e=d(t,"x","square"),n={};return N.runKernel("Square",{x:e},n)}const xe=w({square_:Gg});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Hg(t,e=null,n=!1){let r=d(t,"x","sum");r.dtype==="bool"&&(r=X(r,"int32"));const s={x:r},a={axis:e,keepDims:n};return N.runKernel(ju,s,a)}const H=w({sum_:Hg});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Kg(t,e="euclidean",n=null,r=!1){t=d(t,"x","norm");const s=Lc(t,e,n);let a=s.shape;if(r){const o=kn(n,t.shape);a=Fn(s.shape,o)}return k(s,a)}function Lc(t,e,n=null){if(t.rank===0)return be(t);if(t.rank!==1&&n===null)return Lc(k(t,[-1]),e,n);if(t.rank===1||typeof n=="number"||Array.isArray(n)&&n.length===1){if(e===1)return H(be(t),n);if(e===1/0)return kt(be(t),n);if(e===-1/0)return er(be(t),n);if(e==="euclidean"||e===2)return je(H(Xt(be(t),z(2,"int32")),n));throw new Error(`Error in norm: invalid ord value: ${e}`)}if(Array.isArray(n)&&n.length===2){if(e===1)return kt(H(be(t),n[0]),n[1]-1);if(e===1/0)return kt(H(be(t),n[1]),n[0]);if(e===-1/0)return er(H(be(t),n[1]),n[0]);if(e==="fro"||e==="euclidean")return je(H(xe(t),n));throw new Error(`Error in norm: invalid ord value: ${e}`)}throw new Error(`Error in norm: invalid axis: ${n}`)}const Cn=w({norm_:Kg});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Xg(t,e=null,n=!1){return Cn(t,"euclidean",e,n)}const zc=w({euclideanNorm_:Xg});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Zg(t){const n={x:d(t,"x","exp")};return N.runKernel(yi,n)}const ct=w({exp_:Zg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Jg(t,e=0){const n=d(t,"x","expandDims","string_or_numeric");g(e<=n.rank,()=>"Axis must be <= rank of the tensor");const r={input:n},s={dim:e};return N.runKernel(bi,r,s)}const qe=w({expandDims_:Jg});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Yg(t){const n={x:d(t,"x","expm1")};return N.runKernel(wi,n)}const Vc=w({expm1_:Yg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Qg(t,e){const n=d(t,"x","tile","string_or_numeric");g(n.rank===e.length,()=>`Error in transpose: rank of input ${n.rank} must match length of reps ${e}.`);const r={x:n},s={reps:e};return N.runKernel(ws,r,s)}const Wt=w({tile_:Qg});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ey(t,e,n,r="float32"){e==null&&(e=t);const s=Ve([t,e],r),a=t<=e?t:e;for(let i=0;i<a;++i)s.set(1,i,i);const o=k(s.toTensor(),[t,e]);if(n==null)return o;if(n.length===1)return Wt(qe(o,0),[n[0],1,1]);if(n.length===2)return Wt(qe(qe(o,0),0),[n[0],n[1],1,1]);if(n.length===3)return Wt(qe(qe(qe(o,0),0),0),[n[0],n[1],n[2],1,1]);throw new Error(`eye() currently supports only 1D and 2D batchShapes, but received ${n.length}D.`)}const Bs=w({eye_:ey});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ty(t){const n={x:d(t,"x","floor","float32")};return N.runKernel($i,n)}const Ls=w({floor_:ty});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ny(t,e,n=0,r=0){const s=d(t,"x","gather"),a=d(e,"indices","gather","int32"),o={x:s,indices:a},i={axis:n,batchDims:r};return N.runKernel(_i,o,i)}const zs=w({gather_:ny});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ry(t,e){let n=d(t,"a","greater","string_or_numeric"),r=d(e,"b","greater","string_or_numeric");[n,r]=ee(n,r),ne(n.shape,r.shape);const s={a:n,b:r};return N.runKernel(Ii,s)}const Rn=w({greater_:ry});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function sy(t,e){let n=d(t,"a","greaterEqual","string_or_numeric"),r=d(e,"b","greaterEqual","string_or_numeric");[n,r]=ee(n,r),ne(n.shape,r.shape);const s={a:n,b:r};return N.runKernel(xi,s)}const Vs=w({greaterEqual_:sy});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ay(t){const n={input:d(t,"input","imag")};return N.runKernel(Oi,n)}const Pn=w({imag_:ay});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function oy(t){const n={x:d(t,"x","isFinite")};return N.runKernel(Di,n)}const jc=w({isFinite_:oy});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function iy(t){const n={x:d(t,"x","isInf")};return N.runKernel(Fi,n)}const Mc=w({isInf_:iy});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function uy(t){const n={x:d(t,"x","isNaN")};return N.runKernel(Ci,n)}const Wc=w({isNaN_:uy});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ly(t,e=.2){const r={x:d(t,"x","leakyRelu")},s={alpha:e};return N.runKernel(Ri,r,s)}const js=w({leakyRelu_:ly});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function cy(t,e){let n=d(t,"a","less","string_or_numeric"),r=d(e,"b","less","string_or_numeric");[n,r]=ee(n,r),ne(n.shape,r.shape);const s={a:n,b:r};return N.runKernel(Pi,s)}const tr=w({less_:cy});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function hy(t,e){let n=d(t,"a","lessEqual","string_or_numeric"),r=d(e,"b","lessEqual","string_or_numeric");[n,r]=ee(n,r),ne(n.shape,r.shape);const s={a:n,b:r};return N.runKernel(Bi,s)}const cr=w({lessEqual_:hy});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Uc(t,e,n){if(n<=0)throw new Error("The number of values should be positive.");const r={start:t,stop:e,num:n};return N.runKernel(Li,{},r)}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function py(t,e=5,n=1,r=1,s=.5){const a=d(t,"x","localResponseNormalization");g(a.rank===4||a.rank===3,()=>`Error in localResponseNormalization: x must be rank 3 or 4 but got
               rank ${a.rank}.`),g(qt(e),()=>`Error in localResponseNormalization: depthRadius must be an integer but got depthRadius ${e}.`);let o=a,i=!1;a.rank===3&&(i=!0,o=k(a,[1,a.shape[0],a.shape[1],a.shape[2]]));const u={x:o},l={depthRadius:e,bias:n,alpha:r,beta:s},h=N.runKernel(Ui,u,l);return i?k(h,[h.shape[1],h.shape[2],h.shape[3]]):h}const qc=w({localResponseNormalization_:py});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function fy(t){const n={x:d(t,"x","log","float32")};return N.runKernel(zi,n)}const Zt=w({log_:fy});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function my(t){const n={x:d(t,"x","log1p")};return N.runKernel(Vi,n)}const Ms=w({log1p_:my});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function dy(t){return g(ot(t),()=>"The f passed in grad(f) must be a function"),(e,n)=>{const r=d(e,"x","tf.grad","string_or_numeric"),s=n!=null?d(n,"dy","tf.grad"):null;return N.tidy(()=>{const{value:a,grads:o}=N.gradients(()=>t(r),[r],s);return s!=null&&fe(a.shape,s.shape,"The shape of dy passed in grad(f)(x, dy) must match the shape returned by f(x)"),hr(o),o[0]})}}function gy(t){return g(ot(t),()=>"The f passed in grads(f) must be a function"),(e,n)=>{g(Array.isArray(e),()=>"The args passed in grads(f)(args) must be an array of `Tensor`s or `TensorLike`s");const r=gn(e,"args","tf.grads","string_or_numeric"),s=n!=null?d(n,"dy","tf.grads"):null;return N.tidy(()=>{const{value:a,grads:o}=N.gradients(()=>t(...r),r,s);return s!=null&&fe(a.shape,s.shape,"The shape of dy passed in grads(f)([x1,...], dy) must match the shape returned by f([x1,...])"),hr(o),o})}}function yy(t){return g(ot(t),()=>"The f passed in valueAndGrad(f) must be a function"),(e,n)=>{g(e instanceof te,()=>"The x passed in valueAndGrad(f)(x) must be a tensor"),g(n==null||n instanceof te,()=>"The dy passed in valueAndGrad(f)(x, dy) must be a tensor");const{grads:r,value:s}=N.gradients(()=>t(e),[e],n);return hr(r),{grad:r[0],value:s}}}function by(t){return g(ot(t),()=>"The f passed in valueAndGrads(f) must be a function"),(e,n)=>{g(Array.isArray(e)&&e.every(s=>s instanceof te),()=>"The args passed in valueAndGrads(f)(args) must be array of tensors"),g(n==null||n instanceof te,()=>"The dy passed in valueAndGrads(f)(args, dy) must be a tensor");const r=N.gradients(()=>t(...e),e,n);return n!=null&&fe(r.value.shape,n.shape,"The shape of dy passed in valueAndGrads(f)([x1,...], dy) must match the shape returned by f([x1,...])"),hr(r.grads),r}}function Gc(t,e){g(ot(t),()=>"The f passed in variableGrads(f) must be a function"),g(e==null||Array.isArray(e)&&e.every(l=>l instanceof dn),()=>"The varList passed in variableGrads(f, varList) must be an array of variables");const n=e!=null;if(!n){e=[];for(const l in N.registeredVariables)e.push(N.registeredVariables[l])}const r=n?e.filter(l=>!l.trainable):null,s=e.length;e=e.filter(l=>l.trainable),g(e.length>0,()=>`variableGrads() expects at least one of the input variables to be trainable, but none of the ${s} variables is trainable.`);const a=!0,{value:o,grads:i}=N.gradients(t,e,null,a);g(i.some(l=>l!=null),()=>"Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize()."),g(o.rank===0,()=>`The f passed in variableGrads(f) must return a scalar, but it returned a rank-${o.rank} tensor`);const u={};return e.forEach((l,h)=>{i[h]!=null&&(u[l.name]=i[h])}),r!=null&&r.forEach(l=>u[l.name]=null),{value:o,grads:u}}function Me(t){return N.customGrad(t)}function hr(t){if(t.filter(n=>n==null).length>0)throw new Error(`Cannot compute gradient of y=f(x) with respect to x. Make sure that
    the f you passed encloses all operations that lead from x to y.`)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function wy(t){const n={x:d(t,"x","neg")};return N.runKernel(ru,n)}const Ce=w({neg_:wy});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ny(t){const n={x:d(t,"x","softplus")};return N.runKernel(zu,n)}const Ws=w({softplus_:Ny});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Sy(t){const e=d(t,"x","logSigmoid");return Me(r=>({value:Ce(Ws(Ce(r))),gradFunc:o=>x(o,Et(Ce(r)))}))(e)}const Hc=w({logSigmoid_:Sy});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ty(t,e){let n=d(t,"a","sub"),r=d(e,"b","sub");[n,r]=ee(n,r);const s={a:n,b:r};return N.runKernel(nl,s)}const L=w({sub_:Ty});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function $y(t,e=-1){const n=d(t,"logits","logSoftmax");if(e===-1&&(e=n.rank-1),e!==n.rank-1)throw Error(`Log Softmax along a non-last dimension is not yet supported. Logits was rank ${n.rank} and axis was ${e}`);return Me((s,a)=>{const i=kt(s,e,!0),u=L(s,i),l=L(X(u,"float32"),Zt(H(ct(u),e,!0)));return a([l]),{value:l,gradFunc:(c,f)=>{const[m]=f,y=!0,S=ct(m);return L(c,x(H(c,e,y),S))}}})(n)}const Kc=w({logSoftmax_:$y});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ey(t,e=null,n=!1){const r=d(t,"x","logSumExp"),s=kn(e,r.shape),a=kt(r,s,!0),o=L(r,a),i=ct(o),u=H(i,s),l=Zt(u),h=C(k(a,l.shape),l);if(n){const c=Fn(h.shape,s);return k(h,c)}return h}const Us=w({logSumExp_:Ey});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ky(t,e){const n=d(t,"a","logicalAnd","bool"),r=d(e,"b","logicalAnd","bool");ne(n.shape,r.shape);const s={a:n,b:r};return N.runKernel(ji,s)}const Nn=w({logicalAnd_:ky});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function _y(t){const n={x:d(t,"x","logicalNot","bool")};return N.runKernel(Mi,n)}const qs=w({logicalNot_:_y});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function vy(t,e){const n=d(t,"a","logicalOr","bool"),r=d(e,"b","logicalOr","bool");ne(n.shape,r.shape);const s={a:n,b:r};return N.runKernel(Wi,s)}const Gs=w({logicalOr_:vy});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Iy(t,e){const n=d(t,"a","logicalXor","bool"),r=d(e,"b","logicalXor","bool");return ne(n.shape,r.shape),Nn(Gs(t,e),qs(Nn(t,e)))}const Xc=w({logicalXor_:Iy});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const zn=2147483648;function xy(t,e,n="left"){const r=d(t,"sortedSequence","searchSorted"),s=d(e,"values","searchSorted"),a=r.shape[r.shape.length-1],o=s.shape[s.shape.length-1],i=k(r,[-1,a]),u=k(s,[-1,o]);if(i.rank<2)throw new Error("Sorted input argument must be at least 2-dimensional");if(i.shape[0]!==u.shape[0])throw new Error("Leading dimension of 'sortedSequence' and 'values' must match.");if(W(u.shape)>=zn)throw new Error(`values tensor size must less than ${zn}`);if(i.shape[1]>=zn)throw new Error(`trailing dim_size must less than ${zn} for int32 output type, was ${i.shape[1]}`);const l={sortedSequence:i,values:u},h={side:n};return N.runKernel(Ou,l,h)}const pr=w({searchSorted_:xy});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Zc(t,e){return pr(t,e,"left")}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ay(t,e,n,r,s){const a=d(t,"x","maxPool"),o=1;let i=a,u=!1;a.rank===3&&(u=!0,i=k(a,[1,a.shape[0],a.shape[1],a.shape[2]])),g(i.rank===4,()=>`Error in maxPool: input must be rank 4 but got rank ${i.rank}.`),g(Ye(n,o),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${n} and dilations '${o}'`),Ae("maxPool",r,s);const l={x:i},h={filterSize:e,strides:n,pad:r,dimRoundingMode:s},c=N.runKernel(Hi,l,h);return u?k(c,[c.shape[1],c.shape[2],c.shape[3]]):c}const Hs=w({maxPool_:Ay});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Oy(t,e=[1,1,1],n,r,s,a="NDHWC"){const o=d(t,"x","maxPool3d");let i=o,u=!1;o.rank===4&&(u=!0,i=k(o,[1,o.shape[0],o.shape[1],o.shape[2],o.shape[3]])),g(i.rank===5,()=>`Error in maxPool3d: x must be rank 5 but got rank ${i.rank}.`),g(a==="NDHWC",()=>`Error in maxPool3d: Only NDHWC is currently supported, but got dataFormat of ${a}`),Ae("maxPool3d",r,s);const l={x:i},h={filterSize:e,strides:n,pad:r,dimRoundingMode:s,dataFormat:a},c=N.runKernel(Ki,l,h);return u?k(c,[c.shape[1],c.shape[2],c.shape[3],c.shape[4]]):c}const Jc=w({maxPool3d_:Oy});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Dy(t,e,n,r,s=!1){const o={x:d(t,"x","maxPoolWithArgmax")},i={filterSize:e,strides:n,pad:r,includeBatchInIndex:s},u=N.runKernel(Xi,o,i);return{result:u[0],indexes:u[1]}}const Yc=w({maxPoolWithArgmax_:Dy});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Fy(t,e){let n=d(t,"a","maximum"),r=d(e,"b","maximum");[n,r]=ee(n,r),n.dtype==="bool"&&(n=X(n,"int32"),r=X(r,"int32")),ne(n.shape,r.shape);const s={a:n,b:r};return N.runKernel(Gi,s)}const Ks=w({maximum_:Fy});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Cy(t,e=null,n=!1){const s={x:d(t,"x","mean")},a={axis:e,keepDims:n};return N.runKernel(Zi,s,a)}const Sn=w({mean_:Cy});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function At(t,e="float32"){if(Se(t),e==="complex64"){const r=At(t,"float32"),s=At(t,"float32");return Je(r,s)}const n=or(W(t),e);return N.makeTensor(n,t,e)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function st(t,e="float32"){if(Se(t),e==="complex64"){const r=st(t,"float32"),s=At(t,"float32");return Je(r,s)}const n=ps(W(t),e);return N.makeTensor(n,t,e)}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Qc(t,e,{indexing:n="xy"}={}){if(n!=="xy"&&n!=="ij")throw new TypeError(`${n} is not a valid third argument to meshgrid`);if(t===void 0)return[];let r=d(t,"x","meshgrid",t instanceof te?t.dtype:"float32");if(e===void 0)return[r];let s=d(e,"y","meshgrid",e instanceof te?e.dtype:"float32");const a=W(r.shape),o=W(s.shape);return n==="xy"?(r=k(r,[1,-1]),s=k(s,[-1,1]),[V(st([o,1],r.dtype),r),V(s,st([1,a],s.dtype))]):(r=k(r,[-1,1]),s=k(s,[1,-1]),[V(r,st([1,o],r.dtype)),V(st([a,1],s.dtype),s)])}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ry(t,e){let n=d(t,"a","minimum"),r=d(e,"b","minimum");[n,r]=ee(n,r),n.dtype==="bool"&&(n=X(n,"int32"),r=X(r,"int32")),ne(n.shape,r.shape);const s={a:n,b:r};return N.runKernel(Yi,s)}const Tn=w({minimum_:Ry});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Py(t,e,n){g(n==="reflect"||n==="symmetric",()=>`Invalid mode. Mode must be either reflect or symmetric. Got ${n}.`);const r=d(t,"x","mirrorPad");if(r.rank===0)throw new Error("mirrorPad(scalar) is not defined. Pass non-scalar to mirrorPad");g(e.length===r.rank,()=>`Padding doesn't match input. Must be ${r.rank}. Got ${e.length}.`);const s=n==="reflect"?1:0;for(let i=0;i<r.rank;i++)g(e[i].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),g(e[i][0]>=0&&e[i][0]<=r.shape[i]-s&&e[i][1]>=0&&e[i][1]<=r.shape[i]-s,()=>`Padding in dimension ${i} cannot be greater than or equal to ${r.shape[i]-s} or less than 0 for input of shape ${r.shape}`);const a={paddings:e,mode:n},o={x:r};return N.runKernel(Qi,o,a)}const eh=w({mirrorPad_:Py});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function By(t,e){let n=d(t,"a","mod"),r=d(e,"b","mod");[n,r]=ee(n,r);const s={a:n,b:r};return N.runKernel(eu,s)}const th=w({mod_:By});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ly(t,e=null,n=!1){t=d(t,"x","moments");const r=kn(e,t.shape),s=Sn(t,r,n);let a=s.shape;n||(a=Fn(s.shape,r));const o=xe(L(X(t,"float32"),k(s,a))),i=Sn(o,r,n);return{mean:s,variance:i}}const nh=w({moments_:Ly});function zy(t,e,n,r){const s=d(e,"data","multiRNNCell"),a=gn(n,"c","multiRNNCell"),o=gn(r,"h","multiRNNCell");let i=s;const u=[];for(let c=0;c<t.length;c++){const f=t[c](i,a[c],o[c]);u.push(f[0]),u.push(f[1]),i=f[1]}const l=[],h=[];for(let c=0;c<u.length;c+=2)l.push(u[c]),h.push(u[c+1]);return[l,h]}const rh=w({multiRNNCell_:zy});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Vy(t,e,n,r=!1){const s=d(t,"logits","multinomial"),a=s.size,o=s.rank;if(a<2)throw new Error(`Error in multinomial: you need at least 2 outcomes, but got ${a}.`);if(o>2)throw new Error(`Rank of probabilities must be 1 or 2, but is ${o}`);n=n||Math.random();const u={logits:o===1?k(s,[1,-1]):s},l={numSamples:e,seed:n,normalized:r},h=N.runKernel(tu,u,l);return o===1?k(h,[h.size]):h}const sh=w({multinomial_:Vy});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function jy(t,e){let n=d(t,"a","notEqual","string_or_numeric"),r=d(e,"b","notEqual","string_or_numeric");[n,r]=ee(n,r),ne(n.shape,r.shape);const s={a:n,b:r};return N.runKernel(su,s)}const Xs=w({notEqual_:jy});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function My(t,e,n=1,r=0,s="int32"){if(e<2)throw new Error(`Error in oneHot: depth must be >=2, but it is ${e}`);const o={indices:d(t,"indices","oneHot","int32")},i={dtype:s,depth:e,onValue:n,offValue:r};return N.runKernel(lu,o,i)}const nr=w({oneHot_:My});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Wy(t){const n={x:d(t,"x","onesLike")};return N.runKernel(uu,n)}const ah=w({onesLike_:Wy});function Uy(t,e){const n=d(t,"v1","outerProduct"),r=d(e,"v2","outerProduct");g(n.rank===1&&r.rank===1,()=>`Error in outerProduct: inputs must be rank 1, but got ranks ${n.rank} and ${r.rank}.`);const s=k(n,[-1,1]),a=k(r,[1,-1]);return V(s,a)}const oh=w({outerProduct_:Uy});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function qy(t,e,n=0){const r=d(t,"x","pad");if(r.rank===0)throw new Error("pad(scalar) is not defined. Pass non-scalar to pad");const s={paddings:e,constantValue:n},a={x:r};return N.runKernel(hu,a,s)}const nn=w({pad_:qy});function Gy(t,e,n=0){return g(e.length===2,()=>"Invalid number of paddings. Must be length of 2."),nn(t,[e],n)}const ih=w({pad1d_:Gy});function Hy(t,e,n=0){return g(e.length===2&&e[0].length===2&&e[1].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),nn(t,e,n)}const uh=w({pad2d_:Hy});function Ky(t,e,n=0){return g(e.length===3&&e[0].length===2&&e[1].length===2&&e[2].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),nn(t,e,n)}const lh=w({pad3d_:Ky});function Xy(t,e,n=0){return g(e.length===4&&e[0].length===2&&e[1].length===2&&e[2].length===2&&e[3].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),nn(t,e,n)}const ch=w({pad4d_:Xy});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Zy(t,e,n){const r=d(t,"x","spaceToBatchND");g(r.rank>=1+e.length,()=>`input rank ${r.rank} should be > than [blockShape] ${e.length}`),g(n.length===e.length,()=>`paddings.shape[0] ${n.length} must be equal to [blockShape] ${e.length}`),g(r.shape.reduce((o,i,u)=>u>0&&u<=e.length?o&&(i+n[u-1][0]+n[u-1][1])%e[u-1]===0:o,!0),()=>`input spatial dimensions ${r.shape.slice(1)} with paddings ${n.toString()} must be divisible by blockShapes ${e.toString()}`);const s={x:r},a={blockShape:e,paddings:n};return N.runKernel(Mu,s,a)}const Zs=w({spaceToBatchND_:Zy});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Jy(t,e,n,r,s,a,o){s==null&&(s=[1,1]),a==null&&(a=1),r===0&&(r="valid");const i=d(t,"x","maxPool");let u=i,l=!1;i.rank===3&&(l=!0,u=k(i,[1,i.shape[0],i.shape[1],i.shape[2]])),g(Ye(a,s),()=>`Error in pool: Either strides or dilations must be 1. Got strides ${a} and dilations '${s}'`);const h=rc(u.shape,e,a,s,r),c=[h.dilationHeight,h.dilationWidth];let f;r==="same"?f=Qy([h.filterHeight,h.filterWidth],c):f=[[0,0],[0,0]];const m=c[0]===1&&c[1]===1,[y,S]=Yy([h.inHeight,h.inWidth],c,f),b=m?r:"valid",T=m?u:Zs(u,c,y),$=(n==="avg"?()=>As(T,e,a,b,o):()=>Hs(T,e,a,b,o))(),E=m?$:Os($,c,S);return l?k(E,[E.shape[1],E.shape[2],E.shape[3]]):E}function Yy(t,e,n){const r=n.map(h=>h[0]),s=n.map(h=>h[1]),a=t.concat(r,s),o=e.map((h,c)=>(h-a[c]%h)%h),i=s.map((h,c)=>h+o[c]),u=e.map((h,c)=>[r[c],i[c]]),l=e.map((h,c)=>[0,o[c]]);return[u,l]}function Qy(t,e){const r=t.map((o,i)=>o+(o-1)*(e[i]-1)).map(o=>o-1),s=r.map(o=>Math.floor(o/2)),a=r.map((o,i)=>o-s[i]);return r.map((o,i)=>[s[i],a[i]])}const hh=w({pool_:Jy});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function eb(t,e){const n=d(t,"x","prelu"),r=d(e,"alpha","prelu"),s={x:n,alpha:r};return N.runKernel(fu,s)}const Js=w({prelu_:eb});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function tb(t,e=null,n=!1){let r=d(t,"x","prod");r.dtype==="bool"&&(r=X(r,"int32"));const s={x:r},a={axis:e,keepDims:n};return N.runKernel(mu,s,a)}const ph=w({prod_:tb});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function nb(t,e,n,r){const s=t.map((h,c)=>d(h,`tensors${c}`,"raggedGather","int32")),a=d(e,"paramsDenseValues","raggedGather"),o=d(n,"indices","raggedGather","int32"),i={paramsNestedSplits:s,paramsDenseValues:a,indices:o},u={outputRaggedRank:r},l=N.runKernel(du,i,u);return{outputNestedSplits:l.slice(0,l.length-1),outputDenseValues:l[l.length-1]}}const fh=w({raggedGather_:nb});/**
 * @license
 * Copyright 2022 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function rb(t,e,n){const r=d(t,"starts","raggedRange"),s=d(e,"limits","raggedRange",r.dtype),a=d(n,"deltas","raggedRange",r.dtype),o={starts:r,limits:s,deltas:a},i=N.runKernel(gu,o);return{rtNestedSplits:i[0],rtDenseValues:i[1]}}const mh=w({raggedRange_:rb});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function sb(t,e,n,r,s){const a=d(t,"shape","raggedTensorToTensor","int32"),o=d(e,"values","raggedTensorToTensor"),i=d(n,"defaultValue","raggedTensorToTensor",o.dtype),u=r.map((c,f)=>d(c,`tensors${f}`,"raggedTensorToTensor","int32")),l={shape:a,values:o,defaultValue:i,rowPartitionTensors:u},h={rowPartitionTypes:s};return N.runKernel(yu,l,h)}const dh=w({raggedTensorToTensor_:sb});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ab(t,e,n){Se(t);const r=W(t);let s=null;if(n==null||n==="float32")s=new Float32Array(r);else if(n==="int32")s=new Int32Array(r);else if(n==="bool")s=new Uint8Array(r);else throw new Error(`Unknown data type ${n}`);for(let a=0;a<r;a++)s[a]=e();return N.makeTensor(s,t,n)}const gh=w({rand_:ab});var Ys={exports:{}};Ys.exports;(function(t){(function(e,n,r){function s(u){var l=this,h=i();l.next=function(){var c=2091639*l.s0+l.c*23283064365386963e-26;return l.s0=l.s1,l.s1=l.s2,l.s2=c-(l.c=c|0)},l.c=1,l.s0=h(" "),l.s1=h(" "),l.s2=h(" "),l.s0-=h(u),l.s0<0&&(l.s0+=1),l.s1-=h(u),l.s1<0&&(l.s1+=1),l.s2-=h(u),l.s2<0&&(l.s2+=1),h=null}function a(u,l){return l.c=u.c,l.s0=u.s0,l.s1=u.s1,l.s2=u.s2,l}function o(u,l){var h=new s(u),c=l&&l.state,f=h.next;return f.int32=function(){return h.next()*4294967296|0},f.double=function(){return f()+(f()*2097152|0)*11102230246251565e-32},f.quick=f,c&&(typeof c=="object"&&a(c,h),f.state=function(){return a(h,{})}),f}function i(){var u=4022871197,l=function(h){h=String(h);for(var c=0;c<h.length;c++){u+=h.charCodeAt(c);var f=.02519603282416938*u;u=f>>>0,f-=u,f*=u,u=f>>>0,f-=u,u+=f*4294967296}return(u>>>0)*23283064365386963e-26};return l}n&&n.exports?n.exports=o:this.alea=o})(pt,t)})(Ys);var ob=Ys.exports,Qs={exports:{}};Qs.exports;(function(t){(function(e,n,r){function s(i){var u=this,l="";u.x=0,u.y=0,u.z=0,u.w=0,u.next=function(){var c=u.x^u.x<<11;return u.x=u.y,u.y=u.z,u.z=u.w,u.w^=u.w>>>19^c^c>>>8},i===(i|0)?u.x=i:l+=i;for(var h=0;h<l.length+64;h++)u.x^=l.charCodeAt(h)|0,u.next()}function a(i,u){return u.x=i.x,u.y=i.y,u.z=i.z,u.w=i.w,u}function o(i,u){var l=new s(i),h=u&&u.state,c=function(){return(l.next()>>>0)/4294967296};return c.double=function(){do var f=l.next()>>>11,m=(l.next()>>>0)/4294967296,y=(f+m)/(1<<21);while(y===0);return y},c.int32=l.next,c.quick=c,h&&(typeof h=="object"&&a(h,l),c.state=function(){return a(l,{})}),c}n&&n.exports?n.exports=o:this.xor128=o})(pt,t)})(Qs);var ib=Qs.exports,ea={exports:{}};ea.exports;(function(t){(function(e,n,r){function s(i){var u=this,l="";u.next=function(){var c=u.x^u.x>>>2;return u.x=u.y,u.y=u.z,u.z=u.w,u.w=u.v,(u.d=u.d+362437|0)+(u.v=u.v^u.v<<4^(c^c<<1))|0},u.x=0,u.y=0,u.z=0,u.w=0,u.v=0,i===(i|0)?u.x=i:l+=i;for(var h=0;h<l.length+64;h++)u.x^=l.charCodeAt(h)|0,h==l.length&&(u.d=u.x<<10^u.x>>>4),u.next()}function a(i,u){return u.x=i.x,u.y=i.y,u.z=i.z,u.w=i.w,u.v=i.v,u.d=i.d,u}function o(i,u){var l=new s(i),h=u&&u.state,c=function(){return(l.next()>>>0)/4294967296};return c.double=function(){do var f=l.next()>>>11,m=(l.next()>>>0)/4294967296,y=(f+m)/(1<<21);while(y===0);return y},c.int32=l.next,c.quick=c,h&&(typeof h=="object"&&a(h,l),c.state=function(){return a(l,{})}),c}n&&n.exports?n.exports=o:this.xorwow=o})(pt,t)})(ea);var ub=ea.exports,ta={exports:{}};ta.exports;(function(t){(function(e,n,r){function s(i){var u=this;u.next=function(){var h=u.x,c=u.i,f,m;return f=h[c],f^=f>>>7,m=f^f<<24,f=h[c+1&7],m^=f^f>>>10,f=h[c+3&7],m^=f^f>>>3,f=h[c+4&7],m^=f^f<<7,f=h[c+7&7],f=f^f<<13,m^=f^f<<9,h[c]=m,u.i=c+1&7,m};function l(h,c){var f,m=[];if(c===(c|0))m[0]=c;else for(c=""+c,f=0;f<c.length;++f)m[f&7]=m[f&7]<<15^c.charCodeAt(f)+m[f+1&7]<<13;for(;m.length<8;)m.push(0);for(f=0;f<8&&m[f]===0;++f);for(f==8?m[7]=-1:m[f],h.x=m,h.i=0,f=256;f>0;--f)h.next()}l(u,i)}function a(i,u){return u.x=i.x.slice(),u.i=i.i,u}function o(i,u){i==null&&(i=+new Date);var l=new s(i),h=u&&u.state,c=function(){return(l.next()>>>0)/4294967296};return c.double=function(){do var f=l.next()>>>11,m=(l.next()>>>0)/4294967296,y=(f+m)/(1<<21);while(y===0);return y},c.int32=l.next,c.quick=c,h&&(h.x&&a(h,l),c.state=function(){return a(l,{})}),c}n&&n.exports?n.exports=o:this.xorshift7=o})(pt,t)})(ta);var lb=ta.exports,na={exports:{}};na.exports;(function(t){(function(e,n,r){function s(i){var u=this;u.next=function(){var h=u.w,c=u.X,f=u.i,m,y;return u.w=h=h+1640531527|0,y=c[f+34&127],m=c[f=f+1&127],y^=y<<13,m^=m<<17,y^=y>>>15,m^=m>>>12,y=c[f]=y^m,u.i=f,y+(h^h>>>16)|0};function l(h,c){var f,m,y,S,b,T=[],A=128;for(c===(c|0)?(m=c,c=null):(c=c+"\0",m=0,A=Math.max(A,c.length)),y=0,S=-32;S<A;++S)c&&(m^=c.charCodeAt((S+32)%c.length)),S===0&&(b=m),m^=m<<10,m^=m>>>15,m^=m<<4,m^=m>>>13,S>=0&&(b=b+1640531527|0,f=T[S&127]^=m+b,y=f==0?y+1:0);for(y>=128&&(T[(c&&c.length||0)&127]=-1),y=127,S=4*128;S>0;--S)m=T[y+34&127],f=T[y=y+1&127],m^=m<<13,f^=f<<17,m^=m>>>15,f^=f>>>12,T[y]=m^f;h.w=b,h.X=T,h.i=y}l(u,i)}function a(i,u){return u.i=i.i,u.w=i.w,u.X=i.X.slice(),u}function o(i,u){i==null&&(i=+new Date);var l=new s(i),h=u&&u.state,c=function(){return(l.next()>>>0)/4294967296};return c.double=function(){do var f=l.next()>>>11,m=(l.next()>>>0)/4294967296,y=(f+m)/(1<<21);while(y===0);return y},c.int32=l.next,c.quick=c,h&&(h.X&&a(h,l),c.state=function(){return a(l,{})}),c}n&&n.exports?n.exports=o:this.xor4096=o})(pt,t)})(na);var cb=na.exports,ra={exports:{}};ra.exports;(function(t){(function(e,n,r){function s(i){var u=this,l="";u.next=function(){var c=u.b,f=u.c,m=u.d,y=u.a;return c=c<<25^c>>>7^f,f=f-m|0,m=m<<24^m>>>8^y,y=y-c|0,u.b=c=c<<20^c>>>12^f,u.c=f=f-m|0,u.d=m<<16^f>>>16^y,u.a=y-c|0},u.a=0,u.b=0,u.c=-1640531527,u.d=1367130551,i===Math.floor(i)?(u.a=i/4294967296|0,u.b=i|0):l+=i;for(var h=0;h<l.length+20;h++)u.b^=l.charCodeAt(h)|0,u.next()}function a(i,u){return u.a=i.a,u.b=i.b,u.c=i.c,u.d=i.d,u}function o(i,u){var l=new s(i),h=u&&u.state,c=function(){return(l.next()>>>0)/4294967296};return c.double=function(){do var f=l.next()>>>11,m=(l.next()>>>0)/4294967296,y=(f+m)/(1<<21);while(y===0);return y},c.int32=l.next,c.quick=c,h&&(typeof h=="object"&&a(h,l),c.state=function(){return a(l,{})}),c}n&&n.exports?n.exports=o:this.tychei=o})(pt,t)})(ra);var hb=ra.exports,yh={exports:{}};const pb={},fb=Object.freeze(Object.defineProperty({__proto__:null,default:pb},Symbol.toStringTag,{value:"Module"})),mb=cs(fb);(function(t){(function(e,n,r){var s=256,a=6,o=52,i="random",u=r.pow(s,a),l=r.pow(2,o),h=l*2,c=s-1,f;function m(E,_,v){var O=[];_=_==!0?{entropy:!0}:_||{};var D=T(b(_.entropy?[E,$(n)]:E??A(),3),O),F=new y(O),B=function(){for(var P=F.g(a),M=u,U=0;P<l;)P=(P+U)*s,M*=s,U=F.g(1);for(;P>=h;)P/=2,M/=2,U>>>=1;return(P+U)/M};return B.int32=function(){return F.g(4)|0},B.quick=function(){return F.g(4)/4294967296},B.double=B,T($(F.S),n),(_.pass||v||function(P,M,U,Y){return Y&&(Y.S&&S(Y,F),P.state=function(){return S(F,{})}),U?(r[i]=P,M):P})(B,D,"global"in _?_.global:this==r,_.state)}function y(E){var _,v=E.length,O=this,D=0,F=O.i=O.j=0,B=O.S=[];for(v||(E=[v++]);D<s;)B[D]=D++;for(D=0;D<s;D++)B[D]=B[F=c&F+E[D%v]+(_=B[D])],B[F]=_;(O.g=function(P){for(var M,U=0,Y=O.i,re=O.j,Ee=O.S;P--;)M=Ee[Y=c&Y+1],U=U*s+Ee[c&(Ee[Y]=Ee[re=c&re+M])+(Ee[re]=M)];return O.i=Y,O.j=re,U})(s)}function S(E,_){return _.i=E.i,_.j=E.j,_.S=E.S.slice(),_}function b(E,_){var v=[],O=typeof E,D;if(_&&O=="object")for(D in E)try{v.push(b(E[D],_-1))}catch{}return v.length?v:O=="string"?E:E+"\0"}function T(E,_){for(var v=E+"",O,D=0;D<v.length;)_[c&D]=c&(O^=_[c&D]*19)+v.charCodeAt(D++);return $(_)}function A(){try{var E;return f&&(E=f.randomBytes)?E=E(s):(E=new Uint8Array(s),(e.crypto||e.msCrypto).getRandomValues(E)),$(E)}catch{var _=e.navigator,v=_&&_.plugins;return[+new Date,e,v,e.screen,$(n)]}}function $(E){return String.fromCharCode.apply(0,E)}if(T(r.random(),n),t.exports){t.exports=m;try{f=mb}catch{}}else r["seed"+i]=m})(typeof self<"u"?self:pt,[],Math)})(yh);var db=yh.exports,gb=ob,yb=ib,bb=ub,wb=lb,Nb=cb,Sb=hb,Rt=db;Rt.alea=gb;Rt.xor128=yb;Rt.xorwow=bb;Rt.xorshift7=wb;Rt.xor4096=Nb;Rt.tychei=Sb;var sa=Rt;/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Tb=.001,bh=.1;function $b(t,e,n){return n==null&&(n=aa()),Xr(t,e,(r,s)=>oa(r,s,n))}function aa(){return N.backend.floatPrecision()===32?Tb:bh}function Xr(t,e,n){let r=!0;if((ae(t)||ae(e))&&(r=!1),ae(t)&&ae(e)&&(r=!0),r){const o=t.constructor.name,i=e.constructor.name;if(o!==i)throw new Error(`Arrays are of different type. Actual: ${o}. Expected: ${i}`)}if(Array.isArray(t)&&Array.isArray(e)){const o=ze(t),i=ze(e);if(!Re(o,i))throw new Error(`Arrays have different shapes. Actual: [${o}]. Expected: [${i}]`)}const s=ae(t)?t:ut(t),a=ae(e)?e:ut(e);if(s.length!==a.length)throw new Error(`Arrays have different lengths actual: ${s.length} vs expected: ${a.length}.
Actual:   ${s}.
Expected: ${a}.`);for(let o=0;o<a.length;++o){const i=s[o],u=a[o];if(!n(i,u))throw new Error(`Arrays differ: actual[${o}] = ${i}, expected[${o}] = ${u}.
Actual:   ${s}.
Expected: ${a}.`)}typeof expect<"u"&&expect().nothing()}function Eb(t,e){t().then(()=>e.fail(),()=>e()),typeof expect<"u"&&expect().nothing()}function kb(t,e){const n=typeof e=="string"||typeof e=="number"||typeof e=="boolean"?[e]:e;return nt(t)||nt(t[0])||nt(e)||nt(e[0])?Xr(t,n,(r,s)=>r==s):Xr(t,e,(r,s)=>oa(r,s,0))}function _b(t,e,n){if(n==null&&(n=aa()),!oa(t,e,n))throw new Error(`Numbers differ: actual === ${t}, expected === ${e}`);typeof expect<"u"&&expect().nothing()}function oa(t,e,n){return!isFinite(t)&&!isFinite(e)?!0:!(isNaN(t)||isNaN(e)||Math.abs(t-e)>n)}function vb(t,e,n){for(let r=0;r<t.length;r++)if(t[r]<e||t[r]>n)throw new Error(`Value out of range:${t[r]} low: ${e}, high: ${n}`)}function Ib(t,e){const n=new Float32Array(t),r=new Float32Array(e);if(n.length!==r.length)throw new Error(`Expected ArrayBuffer to be of length ${r.length}, but it was ${n.length}`);for(let s=0;s<r.length;s++)if(n[s]!==r[s])throw new Error(`Expected ArrayBuffer value at ${s} to be ${r[s]} but got ${n[s]} instead`)}function wh(t){for(let e=0;e<t.length;e++){const n=t[e];Array.isArray(n)?wh(n):t[e]=In(n)}return t}function xb(t){const e=document.createElement("video");return"playsInline"in e&&(e.playsInline=!0),e.muted=!0,e.loop=!0,e.style.position="fixed",e.style.left="0px",e.style.top="0px",e.preload="auto",e.appendChild(t),new Promise(n=>{e.addEventListener("loadeddata",r=>n(e)),e.load()})}async function Ab(t){await t.play(),"requestVideoFrameCallback"in t&&await new Promise(e=>{t.requestVideoFrameCallback(e)})}const Ob=Object.freeze(Object.defineProperty({__proto__:null,TEST_EPSILON_FLOAT16:bh,createVideoElement:xb,encodeStrings:wh,expectArrayBuffersEqual:Ib,expectArraysClose:$b,expectArraysEqual:kb,expectNumbersClose:_b,expectPromiseToFail:Eb,expectValuesInRange:vb,play:Ab,testEpsilon:aa},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class ia{constructor(e,n,r,s,a){this.mean=e,this.stdDev=n,this.dtype=r,this.nextVal=NaN,this.truncated=s,this.truncated&&(this.upper=this.mean+this.stdDev*2,this.lower=this.mean-this.stdDev*2);const o=a||Math.random();this.random=sa.alea(o.toString())}nextValue(){if(!isNaN(this.nextVal)){const s=this.nextVal;return this.nextVal=NaN,s}let e,n,r=!1;for(;!r;){let s,a,o;do s=2*this.random()-1,a=2*this.random()-1,o=s*s+a*a;while(o>=1||o===0);const i=Math.sqrt(-2*Math.log(o)/o);e=this.mean+this.stdDev*s*i,n=this.mean+this.stdDev*a*i,(!this.truncated||this.isValidTruncated(e))&&(r=!0)}return(!this.truncated||this.isValidTruncated(n))&&(this.nextVal=this.convertValue(n)),this.convertValue(e)}convertValue(e){return this.dtype==null||this.dtype==="float32"?e:Math.round(e)}isValidTruncated(e){return e<=this.upper&&e>=this.lower}}class Db{constructor(e,n,r,s){this.alpha=e,this.beta=1/n,this.dtype=r;const a=s||Math.random();this.randu=sa.alea(a.toString()),this.randn=new ia(0,1,r,!1,this.randu()),e<1?this.d=e+2/3:this.d=e-1/3,this.c=1/Math.sqrt(9*this.d)}nextValue(){let e,n,r,s,a,o;for(;;){do s=this.randn.nextValue(),o=1+this.c*s;while(o<=0);if(o*=o*o,e=s*s,n=1-.331*e*e,r=.5*e+this.d*(1-o+Math.log(o)),a=this.randu(),a<n||Math.log(a)<r)break}return o=1/this.beta*this.d*o,this.alpha<1&&(o*=Math.pow(this.randu(),1/this.alpha)),this.convertValue(o)}convertValue(e){return this.dtype==="float32"?e:Math.round(e)}}class Fb{constructor(e=0,n=1,r,s){if(this.canReturnFloat=()=>this.dtype==null||this.dtype==="float32",this.min=e,this.range=n-e,this.dtype=r,s==null&&(s=Math.random()),typeof s=="number"&&(s=s.toString()),!this.canReturnFloat()&&this.range<=1)throw new Error(`The difference between ${e} - ${n} <= 1 and dtype is not float`);this.random=sa.alea(s)}convertValue(e){return this.canReturnFloat()?e:Math.round(e)}nextValue(){return this.convertValue(this.min+this.range*this.random())}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Cb(t,e,n=1,r="float32",s){if(Se(t),n==null&&(n=1),r==null&&(r="float32"),r!=="float32"&&r!=="int32")throw new Error(`Unsupported data type ${r}`);const a=new Db(e,n,r,s),o=Ve(t,r);for(let i=0;i<o.values.length;i++)o.values[i]=a.nextValue();return o.toTensor()}const Nh=w({randomGamma_:Cb});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Rb(t,e=0,n=1,r,s){if(Se(t),r!=null&&r==="bool")throw new Error(`Unsupported data type ${r}`);const a=new ia(e,n,r,!1,s),o=Ve(t,r);for(let i=0;i<o.values.length;i++)o.values[i]=a.nextValue();return o.toTensor()}const ua=w({randomNormal_:Rb});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Pb(t,e,n){if(e!=null&&e==="bool")throw new Error(`Unsupported data type ${e}`);return ua(t,0,1,e,n)}const Sh=w({randomStandardNormal_:Pb});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Bb(t,e=0,n=1,r="float32",s){Se(t);const a=Ve(t,r),o=new Fb(e,n,null,s);for(let i=0;i<a.values.length;i++)a.values[i]=o.nextValue();return a.toTensor()}const fr=w({randomUniform_:Bb});/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Lb(t,e,n,r){return fr(t,e,n,"int32",r)}const Th=w({randomUniformInt_:Lb});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Jt(t,e,n=1,r="float32"){if(n===0)throw new Error("Cannot have a step of zero");const s={start:t,stop:e,step:n,dtype:r};return N.runKernel(bu,{},s)}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function zb(t){const n={input:d(t,"input","real")};return N.runKernel(wu,n)}const Yt=w({real_:zb});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Vb(t){const n={x:d(t,"x","reciprocal")};return N.runKernel(Nu,n)}const $h=w({reciprocal_:Vb});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function jb(t){const n={x:d(t,"x","relu")};return N.runKernel(Su,n)}const Bn=w({relu_:jb});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Mb(t){const n={x:d(t,"x","relu6")};return N.runKernel(ku,n)}const la=w({relu6_:Mb});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Wb(t,e){const r={x:d(t,"x","reverse")},s={dims:e};return N.runKernel(_u,r,s)}const ht=w({reverse_:Wb});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ub(t){const e=d(t,"x","reverse");return g(e.rank===1,()=>`Error in reverse1D: x must be rank 1 but got rank ${e.rank}.`),ht(e,0)}const Eh=w({reverse1d_:Ub});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function qb(t,e){const n=d(t,"x","reverse");return g(n.rank===2,()=>`Error in reverse2D: x must be rank 2 but got rank ${n.rank}.`),ht(n,e)}const kh=w({reverse2d_:qb});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Gb(t,e){const n=d(t,"x","reverse");return g(n.rank===3,()=>`Error in reverse3D: x must be rank 3 but got rank ${n.rank}.`),ht(n,e)}const _h=w({reverse3d_:Gb});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Hb(t,e){const n=d(t,"x","reverse");return g(n.rank===4,()=>`Error in reverse4D: x must be rank 4 but got rank ${n.rank}.`),ht(n,e)}const vh=w({reverse4d_:Hb});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Kb(t){const n={x:d(t,"x","round")};return N.runKernel(vu,n)}const ca=w({round_:Kb});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Xb(t){const n={x:d(t,"x","rsqrt","float32")};return N.runKernel(Iu,n)}const Ih=w({rsqrt_:Xb});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Zb(t){const n={x:d(t,"x","selu")};return N.runKernel(Fu,n)}const xh=w({selu_:Zb});function Jb(t,e,n,r,s,a=[1,1],o="NHWC"){const i=d(t,"x","separableConv2d"),u=d(e,"depthwiseFilter","separableConv2d"),l=d(n,"pointwiseFilter","separableConv2d");let h=i,c=!1;if(i.rank===3&&(c=!0,h=k(i,[1,i.shape[0],i.shape[1],i.shape[2]])),o==="NCHW")throw new Error("separableConv2d currently does not support dataFormat NCHW; only NHWC is supported");g(h.rank===4,()=>`Error in separableConv2d: input must be rank 4, but got rank ${h.rank}.`),g(u.rank===4,()=>`Error in separableConv2d: depthwise filter must be rank 4, but got rank ${u.rank}.`),g(l.rank===4,()=>`Error in separableConv2d: pointwise filter must be rank 4, but got rank ${u.rank}.`),g(l.shape[0]===1,()=>`Error in separableConv2d: the first dimension of pointwise filter  must be 1, but got ${l.shape[0]}.`),g(l.shape[1]===1,()=>`Error in separableConv2d: the second dimension of pointwise filter must be 1, but got ${l.shape[1]}.`);const f=u.shape[2],m=u.shape[3];g(l.shape[2]===f*m,()=>`Error in separableConv2d: the third dimension of pointwise filter must be ${f*m}, but got ${l.shape[2]}.`);const y=lr(h,u,r,s,o,a),b=Dn(y,l,1,"valid",o);return c?k(b,[b.shape[1],b.shape[2],b.shape[3]]):b}const Ah=w({separableConv2d_:Jb});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function Yb(t,e){const n=d(t,"x","setdiff1d"),r=d(e,"y","setdiff1d");g(n.dtype===r.dtype,()=>`x and y should have the same dtype, but got x (${n.dtype}) and y (${r.dtype}).`),g(n.rank===1,()=>`x should be 1D tensor, but got x (${n.shape}).`),g(r.rank===1,()=>`y should be 1D tensor, but got y (${r.shape}).`);const s=await n.data(),a=await r.data(),o=new Set(a);let i=0;for(let h=0;h<s.length;h++)o.has(s[h])||i++;const u=new Jn([i],n.dtype),l=new Jn([i],"int32");for(let h=0,c=0;h<s.length;h++)o.has(s[h])||(u.values[c]=s[h],l.values[c]=h,c++);return[u.toTensor(),l.toTensor()]}const Oh=Yb;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Qb(t){const n={x:d(t,"x","sign")};return N.runKernel(Bu,n)}const Dh=w({sign_:Qb});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function e0(t){const n={x:d(t,"x","sin","float32")};return N.runKernel(Ru,n)}const Fh=w({sin_:e0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function t0(t){const n={x:d(t,"x","sinh")};return N.runKernel(Pu,n)}const Ch=w({sinh_:t0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function n0(t,e,n){const r=d(t,"x","slice1d");return g(r.rank===1,()=>`slice1d expects a rank-1 tensor, but got a rank-${r.rank} tensor`),q(r,[e],[n])}const Rh=w({slice1d_:n0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function r0(t,e,n){const r=d(t,"x","slice2d");return g(r.rank===2,()=>`slice2d expects a rank-2 tensor, but got a rank-${r.rank} tensor`),q(r,e,n)}const Ph=w({slice2d_:r0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function s0(t,e,n){const r=d(t,"x","slice3d");return g(r.rank===3,()=>`slice3d expects a rank-3 tensor, but got a rank-${r.rank} tensor`),q(r,e,n)}const Bh=w({slice3d_:s0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function a0(t,e,n){const r=d(t,"x","slice4d");return g(r.rank===4,()=>`slice4d expects a rank-4 tensor, but got a rank-${r.rank} tensor`),q(r,e,n)}const Lh=w({slice4d_:a0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function o0(t,e=-1){const n=d(t,"logits","softmax","float32");if(e===-1&&(e=n.rank-1),e!==n.rank-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${n.rank} and dim was ${e}`);const r={logits:n},s={dim:e};return N.runKernel(Uu,r,s)}const zh=w({softmax_:o0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function i0(t){g(t.dtype==="complex64",()=>`The dtype for tf.spectral.fft() must be complex64 but got ${t.dtype}.`);const e={input:t};return N.runKernel(Ni,e)}const mr=w({fft_:i0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function u0(t){g(t.dtype==="complex64",()=>`The dtype for tf.spectral.ifft() must be complex64 but got ${t.dtype}.`);const e={input:t};return N.runKernel(Ai,e)}const $n=w({ifft_:u0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function l0(t){const e=t.shape[t.shape.length-1],n=t.size/e;let r;if(e<=2){const s=k(t,[n,e]);r=$n(s)}else{const s=[n,2*(e-1)],a=k(Yt(t),[n,e]),o=k(Pn(t),[n,e]),i=ht(q(a,[0,1],[n,e-2]),1),u=x(ht(q(o,[0,1],[n,e-2]),1),z(-1)),l=ue([a,i],1),h=ue([o,u],1),c=k(Je(l,h),[s[0],s[1]]);r=$n(c)}if(r=Yt(r),t.rank===3&&t.shape[0]!==0){const s=r,a=t.shape[0];r=k(r,[a,r.shape[0]/a,r.shape[1]]),s.dispose()}return r}const ha=w({irfft_:l0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function c0(t,e,n=0){const s={x:d(t,"x","split")},a={numOrSizeSplits:e,axis:n};return N.runKernel(Wu,s,a)}const Qt=w({split_:c0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function h0(t,e){g(t.dtype==="float32",()=>`The dtype for rfft() must be real value but got ${t.dtype}`);let n=t.shape[t.shape.length-1];const r=t.size/n;let s;if(e!=null&&e<n){const y=t.shape.map(b=>0),S=t.shape.map(b=>b);S[t.shape.length-1]=e,s=q(t,y,S),n=e}else if(e!=null&&e>n){const y=t.shape.map(S=>S);y[t.shape.length-1]=e-n,s=ue([t,At(y)],t.shape.length-1),n=e}else s=t;const a=Ne(s),o=k(Je(s,a),[r,n]),i=mr(o),u=Math.floor(n/2)+1,l=Yt(i),h=Pn(i),c=Qt(l,[u,n-u],l.shape.length-1),f=Qt(h,[u,n-u],h.shape.length-1),m=s.shape.slice();return m[s.shape.length-1]=u,k(Je(c[0],f[0]),m)}const dr=w({rfft_:h0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function p0(t,e){let n=d(t,"a","squaredDifference"),r=d(e,"b","squaredDifference");[n,r]=ee(n,r),ne(n.shape,r.shape);const s={a:n,b:r},a={};return N.runKernel(Zu,s,a)}const pa=w({squaredDifference_:p0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function f0(t,e){const n=d(t,"x","squeeze","string_or_numeric");return k(n,fo(n.shape,e).newShape)}const gr=w({squeeze_:f0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function m0(t,e=0){const n=gn(t,"tensors","stack","string_or_numeric");g(n.length>=1,()=>"Pass at least one tensor to tf.stack"),n.length>0&&g(e<=n[0].rank,()=>"Axis must be <= rank of the tensor");const r=n,s={axis:e};return N.runKernel(cu,r,s)}const We=w({stack_:m0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function d0(t,e=0){const r={x:d(t,"x","step")},s={alpha:e};return N.runKernel(hl,r,s)}const fa=w({step_:d0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function g0(t,e,n,r,s=0,a=0,o=0,i=0,u=0){const h={x:d(t,"x","stridedSlice","string_or_numeric")},c={begin:e,end:n,strides:r,beginMask:s,endMask:a,ellipsisMask:o,newAxisMask:i,shrinkAxisMask:u};return N.runKernel(Yu,h,c)}const Vh=w({stridedSlice_:g0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function y0(t){const n={x:d(t,"x","tan","float32")};return N.runKernel(rl,n)}const jh=w({tan_:y0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function $e(t,e){Ft(t);const n=ze(t,e);if(n.length!==1)throw new Error("tensor1d() requires values to be a flat/TypedArray");return ft(t,null,n,e)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ut(t,e,n){if(Ft(t),e!=null&&e.length!==2)throw new Error("tensor2d() requires shape to have two numbers");const r=ze(t,n);if(r.length!==2&&r.length!==1)throw new Error("tensor2d() requires values to be number[][] or flat/TypedArray");if(r.length===1&&e==null)throw new Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return ft(t,e,r,n)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ma(t,e,n){if(Ft(t),e!=null&&e.length!==3)throw new Error("tensor3d() requires shape to have three numbers");const r=ze(t,n);if(r.length!==3&&r.length!==1)throw new Error("tensor3d() requires values to be number[][][] or flat/TypedArray");if(r.length===1&&e==null)throw new Error("tensor3d() requires shape to be provided when `values` are a flat array");return ft(t,e,r,n)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Mh(t,e,n){if(Ft(t),e!=null&&e.length!==4)throw new Error("tensor4d() requires shape to have four numbers");const r=ze(t,n);if(r.length!==4&&r.length!==1)throw new Error("tensor4d() requires values to be number[][][][] or flat/TypedArray");if(r.length===1&&e==null)throw new Error("tensor4d() requires shape to be provided when `values` are a flat array");return ft(t,e,r,n)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Wh(t,e,n){if(Ft(t),e!=null&&e.length!==5)throw new Error("tensor5d() requires shape to have five numbers");const r=ze(t,n);if(r.length!==5&&r.length!==1)throw new Error("tensor5d() requires values to be number[][][][][] or flat/TypedArray");if(r.length===1&&e==null)throw new Error("tensor5d() requires shape to be provided when `values` are a flat array");return ft(t,e,r,n)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Uh(t,e,n){if(Ft(t),e!=null&&e.length!==6)throw new Error("tensor6d() requires shape to have six numbers");const r=ze(t,n);if(r.length!==6&&r.length!==1)throw new Error("tensor6d() requires values to be number[][][][][][] or flat/TypedArray");if(r.length===1&&e==null)throw new Error("tensor6d() requires shape to be provided when `values` are a flat array");return e=e||r,ft(t,e,r,n)}function da(t,e,n){const r=e.rank>1?e.shape[e.rank-1]:1,s=e.rank>1?e.rank-1:1,a=`Must have updates.shape = indices.shape[:batchDim] + shape[sliceDim:], got updates.shape: ${n.shape}, indices.shape: ${e.shape}, shape: ${t}, sliceDim: ${r}, and batchDim: ${s}.`;if(n.rank<s)throw new Error(a+` update.rank < ${s}. `);if(t.length<r+(n.rank-s))throw new Error(a+` Output shape length < ${r+(n.rank-s)}`);if(n.rank!==s+t.length-r)throw new Error(a+` update.rank != ${s+t.length-r}`);for(let o=0;o<s;++o)if(n.shape[o]!==e.shape[o])throw new Error(a+` updates.shape[${o}] (${n.shape[o]}) != indices.shape[${o}] (${e.shape[o]}).`);for(let o=0;o<n.rank-s;++o)if(n.shape[o+s]!==t[o+r])throw new Error(a+` updates.shape[${o+s}] (${n.shape[o+s]}) != shape[${o+s}] (${t[o+s]})`)}function yr(t,e,n){if(e.rank<1)throw new Error(`tf.scatterND() expects the indices to be rank 1 or higher, but the rank was ${e.rank}.`);if(t.rank<1)throw new Error(`tf.scatterND() expects the updates to be rank 1 or higher, but the rank was ${t.rank}.`);if(e.dtype!=="int32")throw new Error(`The dtype of 'indices' should be int32, but got dtype: ${e.dtype}`);if(n.length<1)throw new Error(`Output rank must be greater or equal to 1, but got shape: ${n}`);if(n.length===0){if(e.size===0)throw new Error(`Indices specified for empty output. indices shape: ${e.shape}`);if(t.size===0)throw new Error(`Updates specified for empty output. updates shape: ${t.shape}`)}da(n,e,t)}function qh(t,e,n){const r=e.shape.length,s=r>1?e.shape[r-1]:1,a=n.length;let o=1;for(let c=s;c<a;++c)o*=n[c];const i=s<1?1:s,u=W(e.shape)/i,l=[...en(n.slice(0,s)),1],h=W(n);return{sliceRank:s,numUpdates:u,sliceSize:o,strides:l,outputSize:h}}const b0=Object.freeze(Object.defineProperty({__proto__:null,calculateShapes:qh,validateInput:yr,validateUpdateShape:da},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function w0(t,e,n){const r=d(t,"tensor","tensorScatterupdate"),s=d(e,"indices","tensorScatterupdate","int32"),a=d(n,"updates","tensorScatterupdate");if(yr(a,s,r.shape),r.dtype!==a.dtype)throw new Error(`tensor and updates must have the same dtype, instead they are ${r.dtype} and ${a.dtype}.`);const o={tensor:r,indices:s,updates:a},i={};return N.runKernel(Au,o,i)}const Gh=w({tensorScatterUpdate_:w0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function N0(t,e=1,n=!0){const r=d(t,"x","topk");if(r.rank===0)throw new Error("topk() expects the input to be of rank 1 or higher");const s=r.shape[r.shape.length-1];if(e<0)throw new Error(`'k' passed to topk() must be >= 0 but got ${e}`);if(e>s)throw new Error(`'k' passed to topk() must be <= the last dimension (${s}) but got ${e}`);const a={x:r},o={k:e,sorted:n},[i,u]=N.runKernel(al,a,o);return{values:i,indices:u}}const Hh=w({topk_:N0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function S0(t,e=0,n=1,r,s){if(Se(t),r!=null&&r==="bool")throw new Error("Unsupported data type $ { dtype }");const a=new ia(e,n,r,!0,s),o=Ve(t,r);for(let i=0;i<o.values.length;i++)o.values[i]=a.nextValue();return o.toTensor()}const Kh=w({truncatedNormal_:S0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function T0(t,e=0){const n=d(t,"x","unique","string_or_numeric");g(n.rank>0,()=>"The input tensor must be at least 1D");const r={x:n},s={axis:e},[a,o]=N.runKernel(il,r,s);return{values:a,indices:o}}const Xh=w({unique_:T0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function $0(t,e,n){const r=d(t,"x","unsortedSegmentSum"),s=d(e,"segmentIds","unsortedSegmentSum","int32");g(qt(n),()=>"numSegments must be of dtype int");const a={x:r,segmentIds:s},o={numSegments:n};return N.runKernel(ll,a,o)}const Zh=w({unsortedSegmentSum_:$0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function E0(t,e=0){const n=d(t,"x","unstack","string_or_numeric");g(e>=-n.shape.length&&e<n.shape.length,()=>`Axis = ${e} is not in [-${n.shape.length}, ${n.shape.length})`);const r={value:n},s={axis:e};return N.runKernel(ul,r,s)}const mt=w({unstack_:E0});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Jh(t,e){return pr(t,e,"right")}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Yh(t,e=!0,n,r){return N.makeVariable(t,e,n,r)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Qh(t,e){const n=[];for(let a=0;a<e.length;a++)e[a]&&n.push(a);const r=Ve(t,"int32"),s=Ve([n.length,t.length],"int32");for(let a=0;a<n.length;a++){const o=r.indexToLoc(n[a]),i=a*t.length;s.values.set(o,i)}return s.toTensor()}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function k0(t){const e=d(t,"condition","whereAsync","bool"),n=await e.data(),r=Qh(e.shape,n);return t!==e&&e.dispose(),r}const ga=k0;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function _0(t,e,n){const r=d(t,"tensor","boolMask"),s=d(e,"mask","boolMask","bool"),a=n??0,o=s.rank,i=r.shape;g(o>0,()=>"mask cannot be scalar"),fe(i.slice(a,a+o),s.shape,"mask's shape must match the first K dimensions of tensor's shape,");let u=1;for(let S=a;S<a+o;S++)u*=i[S];const l=i.slice(0,a).concat([u],i.slice(a+o)),h=k(r,l),c=k(s,[-1]),f=await ga(c),m=gr(f,[1]),y=zs(h,m,a);return t!==r&&r.dispose(),e!==s&&s.dispose(),m.dispose(),h.dispose(),c.dispose(),f.dispose(),y}const ep=_0;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function v0(t,e,n){const r=d(t,"x","transpose");if(e==null&&(e=r.shape.map((o,i)=>i).reverse()),g(r.rank===e.length,()=>`Error in transpose: rank of input ${r.rank} must match length of perm ${e}.`),e.forEach(o=>{g(o>=0&&o<r.rank,()=>`All entries in 'perm' must be between 0 and ${r.rank-1} but got ${e}`)}),r.rank<=1)return r.clone();const s={x:r},a={perm:e};return r.dtype==="complex64"?j(()=>{let o=Yt(r),i=Pn(r);return o=N.runKernel(jn,{x:o},a),i=N.runKernel(jn,{x:i},a),n&&(i=Ce(i)),Je(o,i)}):N.runKernel(jn,s,a)}const En=w({transpose_:v0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function I0(t,e,n,r,s=!0){const a=d(t,"v","movingAverage"),o=d(e,"x","movingAverage"),i=d(n,"decay","movingAverage");vl(a,o),g(Re(a.shape,o.shape),()=>"Shape mismatch in v and x");const u=z(1),l=L(u,i);let h=x(L(o,a),l);if(s){g(r!=null,()=>"When using zeroDebias: true, step is required.");const c=d(r,"step","movingAverage");h=K(h,L(u,Xt(i,c)))}return C(a,h)}const tp=w({movingAverage_:I0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function x0(t,e,n){Se(n);const r=d(t,"indices","scatterND","int32"),s=d(e,"updates","scatterND");yr(s,r,n);const a={indices:r,updates:s},o={shape:n};return N.runKernel(xu,a,o)}const np=w({scatterND_:x0});function A0(t,e,n,r){if(t.dtype!=="int32")throw new Error(`tf.sparseToDense() expects the indices to be int32 type, but the dtype was ${t.dtype}.`);if(t.rank>2)throw new Error(`sparseIndices should be a scalar, vector, or matrix, but got shape ${t.shape}.`);const s=t.rank>0?t.shape[0]:1,a=t.rank>1?t.shape[1]:1;if(n.length!==a)throw new Error(`outputShape has incorrect number of elements:, ${n.length}, should be: ${a}.`);const o=e.size;if(!(e.rank===0||e.rank===1&&o===s))throw new Error(`sparseValues has incorrect shape ${e.shape}, should be [] or [${s}]`);if(e.dtype!==r.dtype)throw new Error("sparseValues.dtype must match defaultValues.dtype")}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function O0(t,e,n,r=0){Se(n);const s=d(t,"sparseIndices","sparseToDense","int32"),a=d(e,"sparseValues","sparseToDense","string_or_numeric"),o=d(r,"defaultValue","sparseToDense",a.dtype);A0(s,a,n,o);const i={sparseIndices:s,sparseValues:a,defaultValue:o},u={outputShape:n};return N.runKernel(Xu,i,u)}const rp=w({sparseToDense_:O0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function D0(t,e){const n=d(e,"indices","gatherND","int32"),s={params:d(t,"x","gatherND","string_or_numeric"),indices:n};return N.runKernel(vi,s)}const sp=w({gatherND_:D0});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function F0(t,e){if(e==null)return t.shape.slice();if(Re(t.shape,e))return e;if(t.shape.length===e.length){const n=[];for(let r=0;r<t.shape.length;r++)e[r]==null&&t.shape[r]!=null?n.push(t.shape[r]):n.push(e[r]);return n}return e}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function C0(t,e,n,r){const s=d(t,"x","dropout");if(g(s.dtype==="float32",()=>`x has to be a floating point tensor since it's going to be scaled, but got a ${s.dtype} tensor instead.`),g(e>=0&&e<1,()=>`rate must be a float in the range [0, 1), but got ${e}.`),e===0)return t instanceof te?s.clone():s;const a=F0(s,n),o=1-e,i=K(Ls(C(fr(a,0,1,"float32",r),o)),o);return x(s,i)}const ap=w({dropout_:C0});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ya(t){return Math.floor(Math.pow(2,Math.ceil(Math.log(t)/Math.log(2))))}function br(t,e,n){const r=1-t%2,s=new Float32Array(t);for(let a=0;a<t;++a){const o=2*Math.PI*a/(t+r-1);s[a]=e-n*Math.cos(o)}return $e(s,"float32")}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function R0(t,e,n=1){const r=d(t,"predictions","inTopK"),s=d(e,"targets","inTopK");g(r.rank>1,()=>`inTopK() expects the predictions to be of rank 2 or higher, but got ${r.rank}`),g(r.rank-1===s.rank,()=>`predictions rank should be 1 larger than targets rank, but got predictions rank ${r.rank} and targets rank ${s.rank}`),fe(r.shape.slice(0,r.shape.length-1),s.shape,"predictions's shape should be align with the targets' shape, except the last dimension.");const a=r.shape[r.shape.length-1];g(n>0&&n<=a,()=>`'k' passed to inTopK() must be > 0 && <= the predictions last dimension (${a}), but got ${n}`);const o=await r.data(),i=await s.data(),[u,l]=[o.length/a,a],h=mo("bool",u);for(let c=0;c<u;c++){const f=c*l,m=o.subarray(f,f+l),y=[];for(let S=0;S<m.length;S++)y.push({value:m[S],index:S});y.sort((S,b)=>b.value-S.value),h[c]=0;for(let S=0;S<n;S++)if(y[S].index===i[c]){h[c]=1;break}}return t!==r&&r.dispose(),e!==s&&s.dispose(),Fe(h,s.shape,"bool")}const op=R0;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function P0(t,e,n,r,s,a="NHWC",o){let i=t;t.rank===3&&(i=k(t,[1,t.shape[0],t.shape[1],t.shape[2]]));let u=e;u.rank===3&&(u=k(e,[1,e.shape[0],e.shape[1],e.shape[2]])),g(i.rank===4,()=>`Error in conv2dDerFilter: input must be rank 4, but got shape ${i.shape}.`),g(u.rank===4,()=>`Error in conv2dDerFilter: dy must be rank 4, but got shape ${u.shape}.`),g(n.length===4,()=>`Error in conv2dDerFilter: filterShape must be length 4, but got ${n}.`);const l=a==="NHWC"?i.shape[3]:i.shape[1],h=a==="NHWC"?u.shape[3]:u.shape[1];g(l===n[2],()=>`Error in conv2dDerFilter: depth of input ${l}) must match input depth in filter (${n[2]}.`),g(h===n[3],()=>`Error in conv2dDerFilter: depth of dy (${h}) must match output depth for filter (${n[3]}).`),Ae("conv2dDerFilter",s,o);const c={x:i,dy:u},f={strides:r,pad:s,dataFormat:a,dimRoundingMode:o,filterShape:n};return N.runKernel(Zo,c,f)}const B0=w({conv2DBackpropFilter_:P0});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function wr(t,e,n){if(n==null||n==="linear")return t;if(n==="relu")return x(t,fa(e));throw new Error(`Cannot compute gradient for fused activation ${n}.`)}function Nr(t,e){let n=e;const r=Fs(t.shape,e.shape);return r.length>0&&(n=H(n,r)),k(n,t.shape)}function Sr(t,e,n,r){if(e==="linear")return t;if(e==="relu")return Bn(t);if(e==="elu")return Rs(t);if(e==="relu6")return la(t);if(e==="prelu")return Js(t,n);if(e==="leakyrelu")return js(t,r);if(e==="sigmoid")return Et(t);throw new Error(`Unknown fused activation ${e}.`)}const Tr=(t,e)=>!(t>0)||e==="linear";/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function L0({x:t,filter:e,strides:n,pad:r,dataFormat:s="NHWC",dilations:a=[1,1],dimRoundingMode:o,bias:i,activation:u="linear",preluActivationWeights:l,leakyreluAlpha:h}){if(u=u||"linear",Tr(N.state.gradientDepth,u)===!1){g(s==="NHWC",()=>`Error in fused conv2d: got dataFormat of ${s} but only NHWC is currently supported for the case of gradient depth is 0 and the activation is not linear.`);let v=Dn(t,e,n,r,s,a,o);return i!=null&&(v=C(v,i)),Sr(v,u,l,h)}const c=d(t,"x","conv2d","float32"),f=d(e,"filter","conv2d","float32");let m=c,y=!1;c.rank===3&&(y=!0,m=k(c,[1,c.shape[0],c.shape[1],c.shape[2]])),g(m.rank===4,()=>`Error in fused conv2d: input must be rank 4, but got rank ${m.rank}.`),g(f.rank===4,()=>`Error in fused conv2d: filter must be rank 4, but got rank ${f.rank}.`),Ae("fused conv2d",r,o);const S=s==="NHWC"?m.shape[3]:m.shape[1];g(f.shape[2]===S,()=>`Error in conv2d: depth of input (${S}) must match input depth for filter ${f.shape[2]}.`),g(Ye(n,a),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${n} and dilations '${a}'`);const b=An(m.shape,f.shape,n,a,r,o);let T;i!=null&&(T=d(i,"bias","fused conv2d"),[T]=ee(T,c),s==="NHWC"?ne(b.outShape,T.shape):(g(T.shape.length<=1,()=>`Error in fused conv2d: only supports scalar or 1-D Tensor bias for NCHW format but got the bias of rank-${T.shape.length}.`),g(T.shape.length===0||T.shape[0]===b.outChannels||T.shape[0]===1,()=>`Error in fused conv2d: bias shape (${T.shape}) is not compatible with the number of output channels (${b.outChannels})`)));let A;if(l!=null){const v=l.shape;if(g(v.length<=1||v.length===3,()=>`Error in fused conv2d: only supports scalar, 1-D Tensor or 3-D Tensor PReLU activation weights but got a tensor of rank-${v.length}.`),v.length===1)g(v[0]===1||v[0]===b.outChannels,()=>`Error in fused conv2d: PReLU activation weights (${v}) is not compatible with the number of output channels (${b.outChannels}).`);else if(v.length===3)try{ne(v,b.outShape)}catch{const D=`Error in fused conv2d: PReLU activation weights (${v}) is not compatible with the output shape of the conv2d (${b.outShape}).`;throw Error(D)}A=d(l,"prelu weights","fused conv2d")}const $=(v,O)=>{g(s==="NHWC",()=>`Error in gradient of fused conv2D: got dataFormat of ${s} but only NHWC is currently supported.`);const[D,F,B,P]=O,M=wr(v,B,u);g(wn(a),()=>`Error in gradient of fused conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '${a}'`);const U=Nc(F.shape,M,D,n,r),Y=B0(F,M,D.shape,n,r),re=[U,Y];if(P!=null){const Ee=Nr(P,M);re.push(Ee)}return re},E={x:m,filter:f,bias:T,preluActivationWeights:A},_={strides:n,pad:r,dataFormat:s,dilations:a,dimRoundingMode:o,activation:u,leakyreluAlpha:h};return i==null?Me((O,D,F)=>{let B=N.runKernel(Cr,E,_);return F([D,O,B]),y&&(B=k(B,[B.shape[1],B.shape[2],B.shape[3]])),{value:B,gradFunc:$}})(m,f):Me((O,D,F,B)=>{let P=N.runKernel(Cr,E,_);return B([D,O,P,F]),y&&(P=k(P,[P.shape[1],P.shape[2],P.shape[3]])),{value:P,gradFunc:$}})(m,f,T)}const z0=w({fusedConv2d_:L0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function V0(t,e,n,r,s,a=[1,1],o){let i=t;t.rank===3&&(i=k(t,[1,t.shape[0],t.shape[1],t.shape[2]]));let u=e;u.rank===3&&(u=k(e,[1,e.shape[0],e.shape[1],e.shape[2]]));const l={x:i,dy:u},h={strides:r,pad:s,dimRoundingMode:o,dilations:a,filterShape:n};return N.runKernel(ui,l,h)}const j0=w({depthwiseConv2dNativeBackpropFilter_:V0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function M0(t,e,n,r,s,a=[1,1],o){let i=e,u=!1;e.rank===3&&(u=!0,i=k(e,[1,e.shape[0],e.shape[1],e.shape[2]]));const l={dy:i,filter:n},h={strides:r,pad:s,dimRoundingMode:o,dilations:a,inputShape:t},c=N.runKernel(li,l,h);return u?k(c,[c.shape[1],c.shape[2],c.shape[3]]):c}const W0=w({depthwiseConv2dNativeBackpropInput_:M0});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function U0({x:t,filter:e,strides:n,pad:r,dataFormat:s="NHWC",dilations:a=[1,1],dimRoundingMode:o,bias:i,activation:u="linear",preluActivationWeights:l,leakyreluAlpha:h}){if(Tr(N.state.gradientDepth,u)===!1){let _=lr(t,e,n,r,s,a,o);return i!=null&&(_=C(_,i)),Sr(_,u,l,h)}const c=d(t,"x","depthwiseConv2d","float32"),f=d(e,"filter","depthwiseConv2d","float32");let m=c,y=!1;c.rank===3&&(y=!0,m=k(c,[1,c.shape[0],c.shape[1],c.shape[2]])),g(m.rank===4,()=>`Error in fused depthwiseConv2d: input must be rank 4, but got rank ${m.rank}.`),g(f.rank===4,()=>`Error in fused depthwiseConv2d: filter must be rank 4, but got rank ${f.rank}.`),g(m.shape[3]===f.shape[2],()=>`Error in fused depthwiseConv2d: number of input channels (${m.shape[3]}) must match the inChannels dimension in filter ${f.shape[2]}.`),a==null&&(a=[1,1]),g(Ye(n,a),()=>`Error in fused depthwiseConv2d: Either strides or dilations must be 1. Got strides ${n} and dilations '${a}'`),Ae("fused depthwiseConv2d",r,o);const S=An(m.shape,f.shape,n,a,r,o,!0);let b;i!=null&&(b=d(i,"bias","fused conv2d"),[b]=ee(b,c),ne(S.outShape,b.shape));let T;l!=null&&(T=d(l,"prelu weights","fused depthwiseConv2d"));const A=(_,v)=>{g(wn(a),()=>`Error in gradient of fused depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '${a}'`);const[O,D,F,B]=v,P=wr(_,F,u),M=W0(D.shape,P,O,n,r,a,o),U=j0(D,P,O.shape,n,r,a,o);if(B!=null){const Y=Nr(b,P);return[M,U,Y]}return[M,U]},$={x:m,filter:f,bias:b,preluActivationWeights:T},E={strides:n,pad:r,dataFormat:s,dilations:a,dimRoundingMode:o,activation:u,leakyreluAlpha:h};return i==null?Me((v,O,D)=>{let F=N.runKernel(Rr,$,E);return D([O,v,F]),y&&(F=k(F,[F.shape[1],F.shape[2],F.shape[3]])),{value:F,gradFunc:A}})(m,f):Me((v,O,D,F)=>{let B=N.runKernel(Rr,$,E);return F([O,v,B,D]),y&&(B=k(B,[B.shape[1],B.shape[2],B.shape[3]])),{value:B,gradFunc:A}})(m,f,b)}const q0=w({fusedDepthwiseConv2d_:U0});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function G0({a:t,b:e,transposeA:n=!1,transposeB:r=!1,bias:s,activation:a="linear",preluActivationWeights:o,leakyreluAlpha:i=.2}){if(Tr(N.state.gradientDepth,a)===!1){let P=V(t,e,n,r);return s!=null&&(P=C(P,s)),Sr(P,a,o,i)}let u=d(t,"a","fused matMul"),l=d(e,"b","fused matMul");[u,l]=ee(u,l);const h=n?u.shape[u.rank-2]:u.shape[u.rank-1],c=r?l.shape[l.rank-1]:l.shape[l.rank-2],f=n?u.shape[u.rank-1]:u.shape[u.rank-2],m=r?l.shape[l.rank-2]:l.shape[l.rank-1],y=u.shape.slice(0,-2),S=l.shape.slice(0,-2),b=W(y),T=W(S);g(h===c,()=>`Error in fused matMul: inner shapes (${h}) and (${c}) of Tensors with shapes ${u.shape} and ${l.shape} and transposeA=${n} and transposeB=${r} must match.`);const $=ne(u.shape.slice(0,-2),l.shape.slice(0,-2)).concat([f,m]),E=n?k(u,[b,h,f]):k(u,[b,f,h]),_=r?k(l,[T,m,c]):k(l,[T,c,m]);let v;s!=null&&(v=d(s,"bias","fused matMul"),[v]=ee(v,u),ne($,v.shape));let O;o!=null&&(O=d(o,"prelu weights","fused matMul"));const D=(P,M)=>{const[U,Y,re,Ee]=M,Ue=wr(k(P,re.shape),re,a);let Pt,Bt;if(!n&&!r?(Pt=V(Ue,Y,!1,!0),Bt=V(U,Ue,!0,!1)):!n&&r?(Pt=V(Ue,Y,!1,!1),Bt=V(Ue,U,!0,!1)):n&&!r?(Pt=V(Y,Ue,!1,!0),Bt=V(U,Ue,!1,!1)):(Pt=V(Y,Ue,!0,!0),Bt=V(Ue,U,!0,!0)),s!=null){const Wp=Nr(Ee,Ue);return[Pt,Bt,Wp]}else return[Pt,Bt]},F={a:E,b:_,bias:v,preluActivationWeights:O},B={transposeA:n,transposeB:r,activation:a,leakyreluAlpha:i};return s==null?Me((M,U,Y)=>{const re=N.runKernel(Fr,F,B);return Y([M,U,re]),{value:k(re,$),gradFunc:D}})(E,_):Me((M,U,Y,re)=>{const Ee=N.runKernel(Fr,F,B);return re([M,U,Ee,Y]),{value:k(Ee,$),gradFunc:D}})(E,_,v)}const H0=w({fusedMatMul_:G0});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ip=Object.freeze(Object.defineProperty({__proto__:null,conv2d:z0,depthwiseConv2d:q0,matMul:H0},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function K0(t){return br(t,.54,.46)}const X0=w({hammingWindow_:K0});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Z0(t){return br(t,.5,.5)}const up=w({hannWindow_:Z0});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function J0(t,e,n,r=!1,s=0){let a=0;const o=[];for(;a+e<=t.size;)o.push(q(t,a,e)),a+=n;if(r)for(;a<t.size;){const i=a+e-t.size,u=ue([q(t,a,e-i),tn([i],s)]);o.push(u),a+=n}return o.length===0?Ut([],[0,e]):k(ue(o),[o.length,e])}const lp=w({frame_:J0});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Y0(t,e,n,r,s=up){r==null&&(r=ya(e));const a=lp(t,e,n),o=x(a,s(e));return dr(o,r)}const Q0=w({stft_:Y0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ew(t,e,n,r,s="bilinear",a=0){const o=d(t,"image","cropAndResize"),i=d(e,"boxes","cropAndResize","float32"),u=d(n,"boxInd","cropAndResize","int32"),l=i.shape[0];g(o.rank===4,()=>`Error in cropAndResize: image must be rank 4,but got rank ${o.rank}.`),g(i.rank===2&&i.shape[1]===4,()=>`Error in cropAndResize: boxes must be have size [${l},4] but had shape ${i.shape}.`),g(u.rank===1&&u.shape[0]===l,()=>`Error in cropAndResize: boxInd must be have size [${l}] but had shape ${i.shape}.`),g(r.length===2,()=>`Error in cropAndResize: cropSize must be of length 2, but got length ${r.length}.`),g(r[0]>=1&&r[1]>=1,()=>`cropSize must be atleast [1,1], but was ${r}`),g(s==="bilinear"||s==="nearest",()=>`method must be bilinear or nearest, but was ${s}`);const h={image:o,boxes:i,boxInd:u},c={method:s,extrapolationValue:a,cropSize:r};return N.runKernel(si,h,c)}const tw=w({cropAndResize_:ew});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function nw(t){const e=d(t,"image","flipLeftRight","float32");g(e.rank===4,()=>`Error in flipLeftRight: image must be rank 4,but got rank ${e.rank}.`);const n={image:e};return N.runKernel(Ti,n,{})}const rw=w({flipLeftRight_:nw});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function sw(t){const e=d(t,"image","grayscaleToRGB"),n=e.rank-1,r=e.shape[n];g(e.rank>=2,()=>`Error in grayscaleToRGB: images must be at least rank 2, but got rank ${e.rank}.`),g(r===1,()=>`Error in grayscaleToRGB: last dimension of a grayscale image should be size 1, but got size ${r}.`);const s=new Array(e.rank);return s.fill(1,0,n),s[n]=3,Wt(e,s)}const aw=w({grayscaleToRGB_:sw});/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ow(t){const e=d(t,"image","RGBToGrayscale"),n=e.rank-1,r=e.shape[n];g(e.rank>=2,()=>`Error in RGBToGrayscale: images must be at least rank 2, but got rank ${e.rank}.`),g(r===3,()=>`Error in RGBToGrayscale: last dimension of an RGB image should be size 3, but got size ${r}.`);const s=e.dtype,a=X(e,"float32"),o=$e([.2989,.587,.114]);let i;switch(e.rank){case 2:i=wt("ij,j->i",a,o);break;case 3:i=wt("ijk,k->ij",a,o);break;case 4:i=wt("ijkl,l->ijk",a,o);break;case 5:i=wt("ijklm,m->ijkl",a,o);break;case 6:i=wt("ijklmn,n->ijklm",a,o);break;default:throw new Error("Not a valid tensor rank.")}return i=qe(i,-1),X(i,s)}const iw=w({rgbToGrayscale_:ow});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function uw(t,e,n=0,r=.5){const s=d(t,"image","rotateWithOffset","float32");g(s.rank===4,()=>`Error in rotateWithOffset: image must be rank 4,but got rank ${s.rank}.`);const a={image:s},o={radians:e,fillValue:n,center:r};return N.runKernel(pl,a,o)}const lw=w({rotateWithOffset_:uw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function rn(t,e,n,r,s,a){r==null&&(r=.5),s==null&&(s=Number.NEGATIVE_INFINITY),a==null&&(a=0);const o=t.shape[0];return n=Math.min(n,o),g(0<=r&&r<=1,()=>`iouThreshold must be in [0, 1], but was '${r}'`),g(t.rank===2,()=>`boxes must be a 2D tensor, but was of rank '${t.rank}'`),g(t.shape[1]===4,()=>`boxes must have 4 columns, but 2nd dimension was ${t.shape[1]}`),g(e.rank===1,()=>"scores must be a 1D tensor"),g(e.shape[0]===o,()=>`scores has incompatible shape with boxes. Expected ${o}, but was ${e.shape[0]}`),g(0<=a&&a<=1,()=>`softNmsSigma must be in [0, 1], but was '${a}'`),{maxOutputSize:n,iouThreshold:r,scoreThreshold:s,softNmsSigma:a}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function cw(t,e,n,r=.5,s=Number.NEGATIVE_INFINITY){const a=d(t,"boxes","nonMaxSuppression","float32"),o=d(e,"scores","nonMaxSuppression","float32"),i=rn(a,o,n,r,s);n=i.maxOutputSize,r=i.iouThreshold,s=i.scoreThreshold;const u={maxOutputSize:n,iouThreshold:r,scoreThreshold:s};return N.runKernel(au,{boxes:a,scores:o},u)}const hw=w({nonMaxSuppression_:cw});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function pw(t,e,n){const r=fw(t,e,n),s=r<0?-(r+1):r;t.splice(s,0,e)}function fw(t,e,n){return dw(t,e,n||mw)}function mw(t,e){return t>e?1:t<e?-1:0}function dw(t,e,n){let r=0,s=t.length,a=0,o=!1;for(;r<s;){a=r+(s-r>>>1);const i=n(e,t[a]);i>0?r=a+1:(s=a,o=!i)}return o?r:-r-1}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function cp(t,e,n,r,s){return ba(t,e,n,r,s,0)}function hp(t,e,n,r,s,a){return ba(t,e,n,r,s,0,!1,a,!0)}function pp(t,e,n,r,s,a){return ba(t,e,n,r,s,a,!0)}function ba(t,e,n,r,s,a,o=!1,i=!1,u=!1){const l=[];for(let b=0;b<e.length;b++)e[b]>s&&l.push({score:e[b],boxIndex:b,suppressBeginIndex:0});l.sort(qa);const h=a>0?-.5/a:0,c=[],f=[];for(;c.length<n&&l.length>0;){const b=l.pop(),{score:T,boxIndex:A,suppressBeginIndex:$}=b;if(T<s)break;let E=!1;for(let _=c.length-1;_>=$;--_){const v=gw(t,A,c[_]);if(v>=r){E=!0;break}if(b.score=b.score*yw(r,h,v),b.score<=s)break}b.suppressBeginIndex=c.length,E||(b.score===T?(c.push(A),f.push(b.score)):b.score>s&&pw(l,b,qa))}const m=c.length,y=n-m;i&&y>0&&(c.push(...new Array(y).fill(0)),f.push(...new Array(y).fill(0)));const S={selectedIndices:c};return o&&(S.selectedScores=f),u&&(S.validOutputs=m),S}function gw(t,e,n){const r=t.subarray(e*4,e*4+4),s=t.subarray(n*4,n*4+4),a=Math.min(r[0],r[2]),o=Math.min(r[1],r[3]),i=Math.max(r[0],r[2]),u=Math.max(r[1],r[3]),l=Math.min(s[0],s[2]),h=Math.min(s[1],s[3]),c=Math.max(s[0],s[2]),f=Math.max(s[1],s[3]),m=(i-a)*(u-o),y=(c-l)*(f-h);if(m<=0||y<=0)return 0;const S=Math.max(a,l),b=Math.max(o,h),T=Math.min(i,c),A=Math.min(u,f),$=Math.max(T-S,0)*Math.max(A-b,0);return $/(m+y-$)}function yw(t,e,n){const r=Math.exp(e*n*n);return n<=t?r:0}function qa(t,e){return t.score-e.score||t.score===e.score&&e.boxIndex-t.boxIndex}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function bw(t,e,n,r=.5,s=Number.NEGATIVE_INFINITY){const a=d(t,"boxes","nonMaxSuppressionAsync"),o=d(e,"scores","nonMaxSuppressionAsync"),i=rn(a,o,n,r,s);n=i.maxOutputSize,r=i.iouThreshold,s=i.scoreThreshold;const u=await Promise.all([a.data(),o.data()]),l=u[0],h=u[1],{selectedIndices:c}=cp(l,h,n,r,s);return a!==t&&a.dispose(),o!==e&&o.dispose(),$e(c,"int32")}const ww=bw;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Nw(t,e,n,r=.5,s=Number.NEGATIVE_INFINITY,a=0){const o=d(t,"boxes","nonMaxSuppression"),i=d(e,"scores","nonMaxSuppression"),u=rn(o,i,n,r,s,a);n=u.maxOutputSize,r=u.iouThreshold,s=u.scoreThreshold,a=u.softNmsSigma;const l={boxes:o,scores:i},h={maxOutputSize:n,iouThreshold:r,scoreThreshold:s,softNmsSigma:a},c=N.runKernel(iu,l,h);return{selectedIndices:c[0],selectedScores:c[1]}}const Sw=w({nonMaxSuppressionWithScore_:Nw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function Tw(t,e,n,r=.5,s=Number.NEGATIVE_INFINITY,a=0){const o=d(t,"boxes","nonMaxSuppressionAsync"),i=d(e,"scores","nonMaxSuppressionAsync"),u=rn(o,i,n,r,s,a);n=u.maxOutputSize,r=u.iouThreshold,s=u.scoreThreshold,a=u.softNmsSigma;const l=await Promise.all([o.data(),i.data()]),h=l[0],c=l[1],{selectedIndices:f,selectedScores:m}=pp(h,c,n,r,s,a);return o!==t&&o.dispose(),i!==e&&i.dispose(),{selectedIndices:$e(f,"int32"),selectedScores:$e(m)}}const $w=Tw;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ew(t,e,n,r=.5,s=Number.NEGATIVE_INFINITY,a=!1){const o=d(t,"boxes","nonMaxSuppression"),i=d(e,"scores","nonMaxSuppression"),u=rn(o,i,n,r,s,null),l=u.maxOutputSize,h=u.iouThreshold,c=u.scoreThreshold,f={boxes:o,scores:i},m={maxOutputSize:l,iouThreshold:h,scoreThreshold:c,padToMaxOutputSize:a},y=N.runKernel(ou,f,m);return{selectedIndices:y[0],validOutputs:y[1]}}const kw=w({nonMaxSuppressionPadded_:Ew});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function _w(t,e,n,r=.5,s=Number.NEGATIVE_INFINITY,a=!1){const o=d(t,"boxes","nonMaxSuppressionAsync"),i=d(e,"scores","nonMaxSuppressionAsync"),u=rn(o,i,n,r,s,null),l=u.maxOutputSize,h=u.iouThreshold,c=u.scoreThreshold,[f,m]=await Promise.all([o.data(),i.data()]),{selectedIndices:y,validOutputs:S}=hp(f,m,l,h,c,a);return o!==t&&o.dispose(),i!==e&&i.dispose(),{selectedIndices:$e(y,"int32"),validOutputs:z(S,"int32")}}const vw=_w;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Iw(t,e,n=!1,r=!1){const s=d(t,"images","resizeBilinear");g(s.rank===3||s.rank===4,()=>`Error in resizeBilinear: x must be rank 3 or 4, but got rank ${s.rank}.`),g(e.length===2,()=>`Error in resizeBilinear: new shape must 2D, but got shape ${e}.`),g(r===!1||n===!1,()=>"Error in resizeBilinear: If halfPixelCenters is true, alignCorners must be false.");let a=s,o=!1;s.rank===3&&(o=!0,a=k(s,[1,s.shape[0],s.shape[1],s.shape[2]]));const i={images:a},u={alignCorners:n,halfPixelCenters:r,size:e},l=N.runKernel(Eu,i,u);return o?k(l,[l.shape[1],l.shape[2],l.shape[3]]):l}const xw=w({resizeBilinear_:Iw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Aw(t,e,n=!1,r=!1){const s=d(t,"images","resizeNearestNeighbor");g(s.rank===3||s.rank===4,()=>`Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank ${s.rank}.`),g(e.length===2,()=>`Error in resizeNearestNeighbor: new shape must 2D, but got shape ${e}.`),g(s.dtype==="float32"||s.dtype==="int32",()=>"`images` must have `int32` or `float32` as dtype"),g(r===!1||n===!1,()=>"Error in resizeNearestNeighbor: If halfPixelCenters is true, alignCorners must be false.");let a=s,o=!1;s.rank===3&&(o=!0,a=k(s,[1,s.shape[0],s.shape[1],s.shape[2]]));const i={images:a},u={alignCorners:n,halfPixelCenters:r,size:e},l=N.runKernel($u,i,u);return o?k(l,[l.shape[1],l.shape[2],l.shape[3]]):l}const Ow=w({resizeNearestNeighbor_:Aw});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Dw(t,e="binary",n=!1,r=.5){const s=d(t,"image","threshold"),a=.2989,o=.587,i=.114,u=s.shape[0]*s.shape[1];let l=x($e([r]),255),h,c,f,m;if(g(s.rank===3,()=>`Error in threshold: image must be rank 3,but got rank ${s.rank}.`),g(s.shape[2]===3||s.shape[2]===1,()=>`Error in threshold: image color channel must be equal to 3 or 1but got ${s.shape[2]}.`),g(s.dtype==="int32"||s.dtype==="float32",()=>`Error in dtype: image dtype must be int32 or float32,but got dtype ${s.dtype}.`),g(e==="otsu"||e==="binary",()=>`Method must be binary or otsu, but was ${e}`),s.shape[2]===3){[h,c,f]=Qt(s,[1,1,1],-1);const b=x(h,a),T=x(c,o),A=x(f,i);m=C(C(b,T),A)}else m=t;if(e==="otsu"){const b=Ds(X(ca(m),"int32"),Fe([]),256);l=Fw(b,u)}const y=n?cr(m,l):Rn(m,l);return X(x(y,255),"int32")}function Fw(t,e){let n=$e([-1]),r=$e([0]),s=$e([0]),a,o,i,u,l,h;for(let c=0;c<t.size-1;c++){a=q(t,0,c+1),o=q(t,c+1),l=K(H(a),e),h=K(H(o),e);const f=H(x(a,Jt(0,a.size)));i=K(f,H(a));const m=tn(o.shape,a.size),y=C(Jt(0,o.size),m),S=x(o,y);u=K(H(S),H(o));const b=L(i,u),T=L(i,u),A=x(l,h);s=x(x(A,b),T);const $=Rn(s,r);r=Ze($,s,r),n=Ze($,$e([c]),n)}return n}const Cw=w({threshold_:Dw});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Rw(t,e,n="nearest",r="constant",s=0,a){const o=d(t,"image","transform","float32"),i=d(e,"transforms","transform","float32");g(o.rank===4,()=>`Error in transform: image must be rank 4,but got rank ${o.rank}.`),g(i.rank===2&&(i.shape[0]===o.shape[0]||i.shape[0]===1)&&i.shape[1]===8,()=>"Error in transform: Input transform should be batch x 8 or 1 x 8"),g(a==null||a.length===2,()=>`Error in transform: outputShape must be [height, width] or null, but got ${a}.`);const u={image:o,transforms:i},l={interpolation:n,fillMode:r,fillValue:s,outputShape:a};return N.runKernel(ol,u,l)}const Pw=w({transform_:Rw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Bw(t,e,n){const r=d(t,"a","bandPart");g(r.rank>=2,()=>`bandPart(): Rank must be at least 2, got ${r.rank}.`);const s=r.shape,[a,o]=r.shape.slice(-2);let i,u;typeof e=="number"?(g(e%1===0,()=>`bandPart(): numLower must be an integer, got ${e}.`),g(e<=a,()=>`bandPart(): numLower (${e}) must not be greater than the number of rows (${a}).`),i=d(e<0?a:e,"numLower","bandPart")):(g(e.dtype==="int32",()=>"bandPart(): numLower's dtype must be an int32."),i=Ze(tr(e,0),a,Tn(e,a))),typeof n=="number"?(g(n%1===0,()=>`bandPart(): numUpper must be an integer, got ${n}.`),g(n<=o,()=>`bandPart(): numUpper (${n}) must not be greater than the number of columns (${o}).`),u=d(n<0?o:n,"numUpper","bandPart")):(g(n.dtype==="int32",()=>"bandPart(): numUpper's dtype must be an int32."),u=Ze(tr(n,0),o,Tn(n,o)));const l=k(Jt(0,a,1,"int32"),[-1,1]),h=Jt(0,o,1,"int32"),c=L(l,h),f=Nn(cr(c,i),Vs(c,Ce(u))),m=At([a,o],r.dtype);return k(We(mt(k(r,[-1,a,o])).map(y=>Ze(f,y,m))),s)}const Lw=w({bandPart_:Bw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function zw(t){let e;if(Array.isArray(t)){e=!1,g(t!=null&&t.length>0,()=>"Gram-Schmidt process: input must not be null, undefined, or empty");const s=t[0].shape[0];for(let a=1;a<t.length;++a)g(t[a].shape[0]===s,()=>`Gram-Schmidt: Non-unique lengths found in the input vectors: (${t[a].shape[0]} vs. ${s})`)}else e=!0,t=Qt(t,t.shape[0],0).map(s=>gr(s,[0]));g(t.length<=t[0].shape[0],()=>`Gram-Schmidt: Number of vectors (${t.length}) exceeds number of dimensions (${t[0].shape[0]}).`);const n=[],r=t;for(let s=0;s<t.length;++s)n.push(N.tidy(()=>{let a=r[s];if(s>0)for(let o=0;o<s;++o){const i=x(H(x(n[o],a)),n[o]);a=L(a,i)}return K(a,Cn(a,"euclidean"))}));return e?We(n,0):n}const Vw=w({gramSchmidt_:zw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function jw(t,e=!1){if(g(t.rank>=2,()=>`qr() requires input tensor to have a rank >= 2, but got rank ${t.rank}`),t.rank===2)return Ga(t,e);{const n=t.shape.slice(0,t.shape.length-2).reduce((u,l)=>u*l),r=mt(k(t,[n,t.shape[t.shape.length-2],t.shape[t.shape.length-1]]),0),s=[],a=[];r.forEach(u=>{const[l,h]=Ga(u,e);s.push(l),a.push(h)});const o=k(We(s,0),t.shape),i=k(We(a,0),t.shape);return[o,i]}}function Ga(t,e=!1){return N.tidy(()=>{g(t.shape.length===2,()=>`qr2d() requires a 2D Tensor, but got a ${t.shape.length}D Tensor.`);const n=t.shape[0],r=t.shape[1];let s=Bs(n),a=Xe(t);const o=Ut([[1]],[1,1]);let i=Xe(o);const u=n>=r?r:n;for(let l=0;l<u;++l){const h=a,c=i,f=s;[i,a,s]=N.tidy(()=>{const m=q(a,[l,l],[n-l,1]),y=Cn(m),S=q(a,[l,l],[1,1]),b=Ze(Rn(S,0),Ut([[-1]]),Ut([[1]])),T=L(S,x(b,y)),A=K(m,T);A.shape[0]===1?i=Xe(o):i=ue([o,q(A,[1,0],[A.shape[0]-1,A.shape[1]])],0);const $=Ce(K(V(b,T),y)),E=q(a,[l,0],[n-l,r]),_=x($,i),v=En(i);if(l===0)a=L(E,V(_,V(v,E)));else{const F=L(E,V(_,V(v,E)));a=ue([q(a,[0,0],[l,r]),F],0)}const O=En(_),D=q(s,[0,l],[n,s.shape[1]-l]);if(l===0)s=L(D,V(V(D,i),O));else{const F=L(D,V(V(D,i),O));s=ue([q(s,[0,0],[n,l]),F],1)}return[i,a,s]}),pe([h,c,f])}return!e&&n>r&&(s=q(s,[0,0],[n,r]),a=q(a,[0,0],[r,r])),[s,a]})}const Mw=w({qr_:jw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var he;(function(t){t[t.NONE=0]="NONE",t[t.MEAN=1]="MEAN",t[t.SUM=2]="SUM",t[t.SUM_BY_NONZERO_WEIGHTS=3]="SUM_BY_NONZERO_WEIGHTS"})(he||(he={}));function Ww(t,e,n=he.SUM_BY_NONZERO_WEIGHTS){const r=d(t,"losses","computeWeightedLoss");let s=null;e!=null&&(s=d(e,"weights","computeWeightedLoss"));const a=s==null?r:x(r,s);if(n===he.NONE)return a;if(n===he.SUM)return H(a);if(n===he.MEAN){if(s==null)return Sn(a);{const o=r.size/s.size,i=K(H(a),H(s));return o>1?K(i,z(o)):i}}if(n===he.SUM_BY_NONZERO_WEIGHTS){if(s==null)return K(H(a),z(r.size));{const o=x(s,st(r.shape)),i=X(H(Xs(o,z(0))),"float32");return K(H(a),i)}}throw Error(`Unknown reduction: ${n}`)}const Qe=w({computeWeightedLoss_:Ww});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Uw(t,e,n,r=he.SUM_BY_NONZERO_WEIGHTS){const s=d(t,"labels","absoluteDifference"),a=d(e,"predictions","absoluteDifference");let o=null;n!=null&&(o=d(n,"weights","absoluteDifference")),fe(s.shape,a.shape,"Error in absoluteDifference: ");const i=be(L(s,a));return Qe(i,o,r)}const qw=w({absoluteDifference_:Uw});function Gw(t,e,n,r,s=he.SUM_BY_NONZERO_WEIGHTS){const a=d(t,"labels","cosineDistance"),o=d(e,"predictions","cosineDistance");let i=null;r!=null&&(i=d(r,"weights","cosineDistance")),fe(a.shape,o.shape,"Error in cosineDistance: ");const u=z(1),l=L(u,H(x(a,o),n,!0));return Qe(l,i,s)}const Hw=w({cosineDistance_:Gw});function Kw(t,e,n,r=he.SUM_BY_NONZERO_WEIGHTS){let s=d(t,"labels","hingeLoss");const a=d(e,"predictions","hingeLoss");let o=null;n!=null&&(o=d(n,"weights","hingeLoss")),fe(s.shape,a.shape,"Error in hingeLoss: ");const i=z(1);s=L(x(z(2),s),i);const u=Bn(L(i,x(s,a)));return Qe(u,o,r)}const Xw=w({hingeLoss_:Kw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Zw(t,e,n,r=1,s=he.SUM_BY_NONZERO_WEIGHTS){const a=d(t,"labels","huberLoss"),o=d(e,"predictions","huberLoss");let i=null;n!=null&&(i=d(n,"weights","huberLoss")),fe(a.shape,o.shape,"Error in huberLoss: ");const u=z(r),l=be(L(o,a)),h=Tn(l,u),c=L(l,h),f=C(x(z(.5),xe(h)),x(u,c));return Qe(f,i,s)}const Jw=w({huberLoss_:Zw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Yw(t,e,n,r=1e-7,s=he.SUM_BY_NONZERO_WEIGHTS){const a=d(t,"labels","logLoss"),o=d(e,"predictions","logLoss");let i=null;n!=null&&(i=d(n,"weights","logLoss")),fe(a.shape,o.shape,"Error in logLoss: ");const u=z(1),l=z(r),h=Ce(x(a,Zt(C(o,l)))),c=x(L(u,a),Zt(C(L(u,o),l))),f=L(h,c);return Qe(f,i,s)}const Qw=w({logLoss_:Yw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function e1(t,e,n,r=he.SUM_BY_NONZERO_WEIGHTS){const s=d(t,"labels","meanSquaredError"),a=d(e,"predictions","meanSquaredError");let o=null;n!=null&&(o=d(n,"weights","meanSquaredError")),fe(s.shape,a.shape,"Error in meanSquaredError: ");const i=pa(s,a);return Qe(i,o,r)}const t1=w({meanSquaredError_:e1});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function n1(t,e){const n=d(t,"labels","sigmoidCrossEntropyWithLogits"),r=d(e,"logits","sigmoidCrossEntropyWithLogits");fe(n.shape,r.shape,"Error in sigmoidCrossEntropyWithLogits: ");const s=Bn(r),a=x(r,n),o=Ms(ct(Ce(be(r))));return C(L(s,a),o)}function r1(t,e,n,r=0,s=he.SUM_BY_NONZERO_WEIGHTS){let a=d(t,"multiClassLabels","sigmoidCrossEntropy");const o=d(e,"logits","sigmoidCrossEntropy");let i=null;if(n!=null&&(i=d(n,"weights","sigmoidCrossEntropy")),fe(a.shape,o.shape,"Error in sigmoidCrossEntropy: "),r>0){const l=z(r),h=z(1),c=z(.5);a=C(x(a,L(h,l)),x(c,l))}const u=n1(a,o);return Qe(u,i,s)}const s1=w({sigmoidCrossEntropy_:r1});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function a1(t,e,n=-1){if(n===-1&&(n=e.rank-1),n!==e.rank-1)throw Error(`Softmax cross entropy along a non-last dimension is not yet supported. Labels / logits was rank ${e.rank} and dim was ${n}`);return Me((s,a,o)=>{const u=Us(a,[n],!0),l=L(X(a,"float32"),u);o([s,l]);const h=Ce(x(l,s));return{value:H(h,[n]),gradFunc:(m,y)=>{const[S,b]=y,T=Fn(m.shape,[n]);return[x(k(m,T),L(X(S,"float32"),ct(b))),x(k(m,T),L(ct(b),X(S,"float32")))]}}})(t,e)}function o1(t,e,n,r=0,s=he.SUM_BY_NONZERO_WEIGHTS){let a=d(t,"onehotLabels","softmaxCrossEntropy");const o=d(e,"logits","softmaxCrossEntropy");let i=null;if(n!=null&&(i=d(n,"weights","softmaxCrossEntropy")),fe(a.shape,o.shape,"Error in softmaxCrossEntropy: "),r>0){const l=z(r),h=z(1),c=z(a.shape[1]);a=C(x(a,L(h,l)),K(l,c))}const u=a1(a,o);return Qe(u,i,s)}const i1=w({softmaxCrossEntropy_:o1});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function u1(t,e,n,r){const s=d(t,"indices","sparseFillEmptyRows","int32"),a=d(e,"values","sparseFillEmptyRows"),o=d(n,"denseShape","sparseFillEmptyRows","int32"),i=d(r,"defaultValue","sparseFillEmptyRows",a.dtype);if(s.rank!==2)throw new Error(`Indices should be Tensor2D but received shape
        ${s.shape}`);if(a.rank!==1)throw new Error(`Values should be Tensor1D but received shape ${a.shape}`);if(o.rank!==1)throw new Error(`Dense shape should be Tensor1D but received shape ${o.shape}`);if(i.rank!==0)throw new Error(`Default value should be a scalar but received shape ${i.shape}`);const u={indices:s,values:a,denseShape:o,defaultValue:i},l=N.runKernel(qu,u);return{outputIndices:l[0],outputValues:l[1],emptyRowIndicator:l[2],reverseIndexMap:l[3]}}const l1=w({sparseFillEmptyRows_:u1});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function c1(t,e,n){const r=d(t,"inputIndices","sparseReshape","int32"),s=d(e,"inputShape","sparseReshape","int32"),a=d(n,"newShape","sparseReshape","int32");if(r.rank!==2)throw new Error(`Input indices should be Tensor2D but received shape
        ${r.shape}`);if(s.rank!==1)throw new Error(`Input shape should be Tensor1D but received shape ${s.shape}`);if(a.rank!==1)throw new Error(`New shape should be Tensor1D but received shape ${a.shape}`);const o={inputIndices:r,inputShape:s,newShape:a},i=N.runKernel(Gu,o);return{outputIndices:i[0],outputShape:i[1]}}const h1=w({sparseReshape_:c1});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function p1(t,e,n){const r=d(t,"data","sparseSegmentMean"),s=d(e,"indices","sparseSegmentMean","int32"),a=d(n,"segmentIds","sparseSegmentMean","int32");if(r.rank<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(s.rank!==1)throw new Error(`Indices should be Tensor1D but received shape
          ${s.shape}`);if(a.rank!==1)throw new Error(`Segment ids should be Tensor1D but received shape
          ${a.shape}`);const o={data:r,indices:s,segmentIds:a};return N.runKernel(Hu,o)}const f1=w({sparseSegmentMean_:p1});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function m1(t,e,n){const r=d(t,"data","sparseSegmentSum"),s=d(e,"indices","sparseSegmentSum","int32"),a=d(n,"segmentIds","sparseSegmentSum","int32");if(r.rank<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(s.rank!==1)throw new Error(`Indices should be Tensor1D but received shape
         ${s.shape}`);if(a.rank!==1)throw new Error(`Segment ids should be Tensor1D but received shape
         ${a.shape}`);const o={data:r,indices:s,segmentIds:a};return N.runKernel(Ku,o)}const d1=w({sparseSegmentSum_:m1});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function g1(t,e,n,r,s,a,o,i){const u=d(t,"data","stringNGrams","string");if(u.dtype!=="string")throw new Error("Data must be of datatype string");if(u.shape.length!==1)throw new Error(`Data must be a vector, saw: ${u.shape}`);const l=d(e,"dataSplits","stringNGrams");if(l.dtype!=="int32")throw new Error("Data splits must be of datatype int32");const h={separator:n,nGramWidths:r,leftPad:s,rightPad:a,padWidth:o,preserveShortSequences:i},c={data:u,dataSplits:l},f=N.runKernel(Qu,c,h);return{nGrams:f[0],nGramsSplits:f[1]}}const y1=w({stringNGrams_:g1});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function b1(t,e,n=!0){const r=d(t,"input","stringSplit","string"),s=d(e,"delimiter","stringSplit","string");if(r.rank!==1)throw new Error(`Input should be Tensor1D but received shape ${r.shape}`);if(s.rank!==0)throw new Error(`Delimiter should be a scalar but received shape ${s.shape}`);const a={skipEmpty:n},o={input:r,delimiter:s},i=N.runKernel(el,o,a);return{indices:i[0],values:i[1],shape:i[2]}}const w1=w({stringSplit_:b1});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function N1(t,e){const n=d(t,"input","stringToHashBucketFast","string"),r={numBuckets:e};if(e<=0)throw new Error("Number of buckets must be at least 1");const s={input:n};return N.runKernel(tl,s,r)}const S1=w({stringToHashBucketFast_:N1});/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function T1(t,e,n,r=!0){const s=d(t,"input","staticRegexReplace","string"),a={pattern:e,rewrite:n,replaceGlobal:r};return N.runKernel(Ju,{x:s},a)}const $1=w({staticRegexReplace_:T1});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const fp={fft:mr,ifft:$n,rfft:dr,irfft:ha},mp={hammingWindow:X0,hannWindow:up,frame:lp,stft:Q0},dp={flipLeftRight:rw,grayscaleToRGB:aw,resizeNearestNeighbor:Ow,resizeBilinear:xw,rgbToGrayscale:iw,rotateWithOffset:lw,cropAndResize:tw,nonMaxSuppression:hw,nonMaxSuppressionAsync:ww,nonMaxSuppressionWithScore:Sw,nonMaxSuppressionWithScoreAsync:$w,nonMaxSuppressionPadded:kw,nonMaxSuppressionPaddedAsync:vw,threshold:Cw,transform:Pw},gp={bandPart:Lw,gramSchmidt:Vw,qr:Mw},yp={absoluteDifference:qw,computeWeightedLoss:Qe,cosineDistance:Hw,hingeLoss:Xw,huberLoss:Jw,logLoss:Qw,meanSquaredError:t1,sigmoidCrossEntropy:s1,softmaxCrossEntropy:i1},bp={sparseFillEmptyRows:l1,sparseReshape:h1,sparseSegmentMean:f1,sparseSegmentSum:d1},wp={stringNGrams:y1,stringSplit:w1,stringToHashBucketFast:S1,staticRegexReplace:$1};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const E1=new Map,Zr=new Map;class Np{getClassName(){return this.constructor.className}static fromConfig(e,n){return new e(n)}}class tt{constructor(){this.classNameMap={}}static getMap(){return tt.instance==null&&(tt.instance=new tt),tt.instance}static register(e){tt.getMap().classNameMap[e.className]=[e,e.fromConfig]}}function Sp(t,e,n){g(t.className!=null,()=>"Class being registered does not have the static className property defined."),g(typeof t.className=="string",()=>"className is required to be a string, but got type "+typeof t.className),g(t.className.length>0,()=>"Class being registered has an empty-string as its className, which is disallowed."),typeof e>"u"&&(e="Custom"),typeof n>"u"&&(n=t.className);const r=n,s=e+">"+r;return tt.register(t),E1.set(s,t),Zr.set(t,s),t}function k1(t){return Zr.has(t)?Zr.get(t):t.className}const _1=Object.freeze(Object.defineProperty({__proto__:null,Serializable:Np,SerializationMap:tt,getRegisteredName:k1,registerClass:Sp},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class dt extends Np{minimize(e,n=!1,r){const{value:s,grads:a}=this.computeGradients(e,r);if(r!=null){const o=r.map(i=>({name:i.name,tensor:a[i.name]}));this.applyGradients(o)}else this.applyGradients(a);return pe(a),n?s:(s.dispose(),null)}get iterations(){return this.iterations_==null&&(this.iterations_=0),this.iterations_}incrementIterations(){this.iterations_=this.iterations+1}computeGradients(e,n){return Gc(e,n)}dispose(){this.iterations_!=null&&pe(this.iterations_)}async saveIterations(){return this.iterations_==null&&(this.iterations_=0),{name:"iter",tensor:z(this.iterations_,"int32")}}async getWeights(){throw new Error("getWeights() is not implemented for this optimizer yet.")}async setWeights(e){throw new Error(`setWeights() is not implemented for this optimizer class ${this.getClassName()}`)}async extractIterations(e){return this.iterations_=(await e[0].tensor.data())[0],e.slice(1)}}Object.defineProperty(dt,Symbol.hasInstance,{value:t=>t.minimize!=null&&t.computeGradients!=null&&t.applyGradients!=null});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class wa extends dt{static get className(){return"Adadelta"}constructor(e,n,r=null){super(),this.learningRate=e,this.rho=n,this.epsilon=r,this.accumulatedGrads=[],this.accumulatedUpdates=[],r==null&&(this.epsilon=N.backend.epsilon())}applyGradients(e){(Array.isArray(e)?e.map(r=>r.name):Object.keys(e)).forEach((r,s)=>{const a=N.registeredVariables[r],o=!1;this.accumulatedGrads[s]==null&&(this.accumulatedGrads[s]={originalName:`${r}/accum_grad`,variable:j(()=>Ne(a).variable(o))}),this.accumulatedUpdates[s]==null&&(this.accumulatedUpdates[s]={originalName:`${r}/accum_var`,variable:j(()=>Ne(a).variable(o))});const i=Array.isArray(e)?e[s].tensor:e[r];if(i==null)return;const u=this.accumulatedGrads[s].variable,l=this.accumulatedUpdates[s].variable;j(()=>{const h=C(x(u,this.rho),x(xe(i),1-this.rho)),c=x(K(je(C(l,this.epsilon)),je(C(u,this.epsilon))),i),f=C(x(l,this.rho),x(xe(c),1-this.rho));u.assign(h),l.assign(f);const m=C(x(c,-this.learningRate),a);a.assign(m)})}),this.incrementIterations()}dispose(){this.accumulatedUpdates!=null&&(pe(this.accumulatedGrads.map(e=>e.variable)),pe(this.accumulatedUpdates.map(e=>e.variable)))}async getWeights(){const e=[...this.accumulatedGrads,...this.accumulatedUpdates];return[await this.saveIterations()].concat(e.map(n=>({name:n.originalName,tensor:n.variable})))}async setWeights(e){e=await this.extractIterations(e);const n=e.length/2,r=!1;this.accumulatedGrads=e.slice(0,n).map(s=>({originalName:s.name,variable:s.tensor.variable(r)})),this.accumulatedUpdates=e.slice(n,n*2).map(s=>({originalName:s.name,variable:s.tensor.variable(r)}))}getConfig(){return{learningRate:this.learningRate,rho:this.rho,epsilon:this.epsilon}}static fromConfig(e,n){return new e(n.learningRate,n.rho,n.epsilon)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Na extends dt{static get className(){return"Adagrad"}constructor(e,n=.1){super(),this.learningRate=e,this.initialAccumulatorValue=n,this.accumulatedGrads=[]}applyGradients(e){(Array.isArray(e)?e.map(r=>r.name):Object.keys(e)).forEach((r,s)=>{const a=N.registeredVariables[r];this.accumulatedGrads[s]==null&&(this.accumulatedGrads[s]={originalName:`${r}/accumulator`,variable:j(()=>tn(a.shape,this.initialAccumulatorValue).variable(!1))});const o=Array.isArray(e)?e[s].tensor:e[r];if(o==null)return;const i=this.accumulatedGrads[s].variable;j(()=>{const u=C(i,xe(o));i.assign(u);const l=C(x(K(o,je(C(u,N.backend.epsilon()))),-this.learningRate),a);a.assign(l)})}),this.incrementIterations()}dispose(){this.accumulatedGrads!=null&&pe(this.accumulatedGrads.map(e=>e.variable))}async getWeights(){return[await this.saveIterations()].concat(this.accumulatedGrads.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e);const n=!1;this.accumulatedGrads=e.map(r=>({originalName:r.name,variable:r.tensor.variable(n)}))}getConfig(){return{learningRate:this.learningRate,initialAccumulatorValue:this.initialAccumulatorValue}}static fromConfig(e,n){return new e(n.learningRate,n.initialAccumulatorValue)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Sa extends dt{static get className(){return"Adam"}constructor(e,n,r,s=null){super(),this.learningRate=e,this.beta1=n,this.beta2=r,this.epsilon=s,this.accumulatedFirstMoment=[],this.accumulatedSecondMoment=[],j(()=>{this.accBeta1=z(n).variable(),this.accBeta2=z(r).variable()}),s==null&&(this.epsilon=N.backend.epsilon())}applyGradients(e){const n=Array.isArray(e)?e.map(r=>r.name):Object.keys(e);j(()=>{const r=L(1,this.accBeta1),s=L(1,this.accBeta2);n.forEach((a,o)=>{const i=N.registeredVariables[a],u=!1;this.accumulatedFirstMoment[o]==null&&(this.accumulatedFirstMoment[o]={originalName:`${a}/m`,variable:j(()=>Ne(i).variable(u))}),this.accumulatedSecondMoment[o]==null&&(this.accumulatedSecondMoment[o]={originalName:`${a}/v`,variable:j(()=>Ne(i).variable(u))});const l=Array.isArray(e)?e[o].tensor:e[a];if(l==null)return;const h=this.accumulatedFirstMoment[o].variable,c=this.accumulatedSecondMoment[o].variable,f=C(x(h,this.beta1),x(l,1-this.beta1)),m=C(x(c,this.beta2),x(xe(l),1-this.beta2)),y=K(f,r),S=K(m,s);h.assign(f),c.assign(m);const b=C(x(K(y,C(je(S),this.epsilon)),-this.learningRate),i);i.assign(b)}),this.accBeta1.assign(x(this.accBeta1,this.beta1)),this.accBeta2.assign(x(this.accBeta2,this.beta2))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.accBeta2.dispose(),this.accumulatedFirstMoment!=null&&pe(this.accumulatedFirstMoment.map(e=>e.variable)),this.accumulatedSecondMoment!=null&&pe(this.accumulatedSecondMoment.map(e=>e.variable))}async getWeights(){const e=[...this.accumulatedFirstMoment,...this.accumulatedSecondMoment];return[await this.saveIterations()].concat(e.map(n=>({name:n.originalName,tensor:n.variable})))}async setWeights(e){e=await this.extractIterations(e),j(()=>{this.accBeta1.assign(Xt(this.beta1,this.iterations_+1)),this.accBeta2.assign(Xt(this.beta2,this.iterations_+1))});const n=e.length/2,r=!1;this.accumulatedFirstMoment=e.slice(0,n).map(s=>({originalName:s.name,variable:s.tensor.variable(r)})),this.accumulatedSecondMoment=e.slice(n,n*2).map(s=>({originalName:s.name,variable:s.tensor.variable(r)}))}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon}}static fromConfig(e,n){return new e(n.learningRate,n.beta1,n.beta2,n.epsilon)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Ta extends dt{static get className(){return"Adamax"}constructor(e,n,r,s=null,a=0){super(),this.learningRate=e,this.beta1=n,this.beta2=r,this.epsilon=s,this.decay=a,this.accumulatedFirstMoment=[],this.accumulatedWeightedInfNorm=[],j(()=>{this.iteration=z(0).variable(),this.accBeta1=z(n).variable()}),s==null&&(this.epsilon=N.backend.epsilon())}applyGradients(e){const n=Array.isArray(e)?e.map(r=>r.name):Object.keys(e);j(()=>{const r=L(1,this.accBeta1),s=K(-this.learningRate,C(x(this.iteration,this.decay),1));n.forEach((a,o)=>{const i=N.registeredVariables[a],u=!1;this.accumulatedFirstMoment[o]==null&&(this.accumulatedFirstMoment[o]={originalName:`${a}/m`,variable:Ne(i).variable(u)}),this.accumulatedWeightedInfNorm[o]==null&&(this.accumulatedWeightedInfNorm[o]={originalName:`${a}/v`,variable:Ne(i).variable(u)});const l=Array.isArray(e)?e[o].tensor:e[a];if(l==null)return;const h=this.accumulatedFirstMoment[o].variable,c=this.accumulatedWeightedInfNorm[o].variable,f=C(x(h,this.beta1),x(l,1-this.beta1)),m=x(c,this.beta2),y=be(l),S=Ks(m,y);h.assign(f),c.assign(S);const b=C(x(K(s,r),K(f,C(S,this.epsilon))),i);i.assign(b)}),this.iteration.assign(C(this.iteration,1)),this.accBeta1.assign(x(this.accBeta1,this.beta1))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.iteration.dispose(),this.accumulatedFirstMoment!=null&&pe(this.accumulatedFirstMoment.map(e=>e.variable)),this.accumulatedWeightedInfNorm!=null&&pe(this.accumulatedWeightedInfNorm.map(e=>e.variable))}async getWeights(){throw new Error("getWeights() is not implemented for Adamax yet.")}async setWeights(e){throw new Error("setWeights() is not implemented for Adamax yet.")}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon,decay:this.decay}}static fromConfig(e,n){return new e(n.learningRate,n.beta1,n.beta2,n.epsilon,n.decay)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class $r extends dt{static get className(){return"SGD"}constructor(e){super(),this.learningRate=e,this.setLearningRate(e)}applyGradients(e){(Array.isArray(e)?e.map(r=>r.name):Object.keys(e)).forEach((r,s)=>{const a=Array.isArray(e)?e[s].tensor:e[r];if(a==null)return;const o=N.registeredVariables[r];j(()=>{const i=C(x(this.c,a),o);o.assign(i)})}),this.incrementIterations()}setLearningRate(e){this.learningRate=e,this.c!=null&&this.c.dispose(),this.c=De(z(-e))}dispose(){this.c.dispose()}async getWeights(){return[await this.saveIterations()]}async setWeights(e){if(e=await this.extractIterations(e),e.length!==0)throw new Error("SGD optimizer does not have settable weights.")}getConfig(){return{learningRate:this.learningRate}}static fromConfig(e,n){return new e(n.learningRate)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class $a extends $r{static get className(){return"Momentum"}constructor(e,n,r=!1){super(e),this.learningRate=e,this.momentum=n,this.useNesterov=r,this.accumulations=[],this.m=z(this.momentum)}applyGradients(e){(Array.isArray(e)?e.map(r=>r.name):Object.keys(e)).forEach((r,s)=>{const a=N.registeredVariables[r];this.accumulations[s]==null&&(this.accumulations[s]={originalName:`${r}/momentum`,variable:j(()=>Ne(a).variable(!1))});const o=this.accumulations[s].variable,i=Array.isArray(e)?e[s].tensor:e[r];i!=null&&j(()=>{let u;const l=C(x(this.m,o),i);this.useNesterov?u=C(x(this.c,C(i,x(l,this.m))),a):u=C(x(this.c,l),a),o.assign(l),a.assign(u)})}),this.incrementIterations()}dispose(){this.m.dispose(),this.accumulations!=null&&pe(this.accumulations.map(e=>e.variable))}setMomentum(e){this.momentum=e}async getWeights(){return[await this.saveIterations()].concat(this.accumulations.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(e){e=await this.extractIterations(e);const n=!1;this.accumulations=e.map(r=>({originalName:r.name,variable:r.tensor.variable(n)}))}getConfig(){return{learningRate:this.learningRate,momentum:this.momentum,useNesterov:this.useNesterov}}static fromConfig(e,n){return new e(n.learningRate,n.momentum,n.useNesterov)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Ea extends dt{static get className(){return"RMSProp"}constructor(e,n=.9,r=0,s=null,a=!1){if(super(),this.learningRate=e,this.decay=n,this.momentum=r,this.epsilon=s,this.accumulatedMeanSquares=[],this.accumulatedMoments=[],this.accumulatedMeanGrads=[],this.centered=a,s==null&&(this.epsilon=N.backend.epsilon()),e==null)throw new Error("learningRate for RMSPropOptimizer must be defined.")}applyGradients(e){(Array.isArray(e)?e.map(r=>r.name):Object.keys(e)).forEach((r,s)=>{const a=N.registeredVariables[r],o=!1;this.accumulatedMeanSquares[s]==null&&(this.accumulatedMeanSquares[s]={originalName:`${r}/rms`,variable:j(()=>Ne(a).variable(o))}),this.accumulatedMoments[s]==null&&(this.accumulatedMoments[s]={originalName:`${r}/momentum`,variable:j(()=>Ne(a).variable(o))}),this.accumulatedMeanGrads[s]==null&&this.centered&&(this.accumulatedMeanGrads[s]={originalName:`${r}/mg`,variable:j(()=>Ne(a).variable(o))});const i=Array.isArray(e)?e[s].tensor:e[r];if(i==null)return;const u=this.accumulatedMeanSquares[s].variable,l=this.accumulatedMoments[s].variable;j(()=>{const h=C(x(u,this.decay),x(xe(i),1-this.decay));if(this.centered){const c=this.accumulatedMeanGrads[s].variable,f=C(x(c,this.decay),x(i,1-this.decay)),m=K(x(i,this.learningRate),je(L(h,C(xe(f),this.epsilon)))),y=C(x(l,this.momentum),m);u.assign(h),c.assign(f),l.assign(y);const S=L(a,y);a.assign(S)}else{const c=C(x(u,this.decay),x(xe(i),1-this.decay)),f=C(x(l,this.momentum),K(x(i,this.learningRate),je(C(c,this.epsilon))));u.assign(c),l.assign(f);const m=L(a,f);a.assign(m)}})}),this.incrementIterations()}dispose(){this.accumulatedMeanSquares!=null&&pe(this.accumulatedMeanSquares.map(e=>e.variable)),this.accumulatedMeanGrads!=null&&this.centered&&pe(this.accumulatedMeanGrads.map(e=>e.variable)),this.accumulatedMoments!=null&&pe(this.accumulatedMoments.map(e=>e.variable))}async getWeights(){const e=[...this.accumulatedMeanSquares,...this.accumulatedMoments];return this.centered&&e.push(...this.accumulatedMeanGrads),[await this.saveIterations()].concat(e.map(n=>({name:n.originalName,tensor:n.variable})))}async setWeights(e){e=await this.extractIterations(e);const n=this.centered?e.length/3:e.length/2,r=!1;this.accumulatedMeanSquares=e.slice(0,n).map(s=>({originalName:s.name,variable:s.tensor.variable(r)})),this.accumulatedMoments=e.slice(n,n*2).map(s=>({originalName:s.name,variable:s.tensor.variable(r)})),this.centered&&(this.accumulatedMeanGrads=e.slice(n*2,n*3).map(s=>({originalName:s.name,variable:s.tensor.variable(r)})))}getConfig(){return{learningRate:this.learningRate,decay:this.decay,momentum:this.momentum,epsilon:this.epsilon,centered:this.centered}}static fromConfig(e,n){return new e(n.learningRate,n.decay,n.momentum,n.epsilon,n.centered)}}/**
 * @license
 * Copyright 2022 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const v1=[wa,Na,Sa,Ta,$a,Ea,$r];function I1(){for(const t of v1)Sp(t)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const x1="model",A1=".json",O1=".weights.bin";function Ha(t){return new Promise(e=>setTimeout(e)).then(t)}class Ot{constructor(e){if(!R().getBool("IS_BROWSER"))throw new Error("browserDownloads() cannot proceed because the current environment is not a browser.");e.startsWith(Ot.URL_SCHEME)&&(e=e.slice(Ot.URL_SCHEME.length)),(e==null||e.length===0)&&(e=x1),this.modelJsonFileName=e+A1,this.weightDataFileName=e+O1}async save(e){if(typeof document>"u")throw new Error("Browser downloads are not supported in this environment since `document` is not present");const n=Be.join(e.weightData),r=window.URL.createObjectURL(new Blob([n],{type:"application/octet-stream"}));if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");{const s=[{paths:["./"+this.weightDataFileName],weights:e.weightSpecs}],a=Bl(e,s),o=window.URL.createObjectURL(new Blob([JSON.stringify(a)],{type:"application/json"})),i=this.modelJsonAnchor==null?document.createElement("a"):this.modelJsonAnchor;if(i.download=this.modelJsonFileName,i.href=o,await Ha(()=>i.dispatchEvent(new MouseEvent("click"))),e.weightData!=null){const u=this.weightDataAnchor==null?document.createElement("a"):this.weightDataAnchor;u.download=this.weightDataFileName,u.href=r,await Ha(()=>u.dispatchEvent(new MouseEvent("click")))}return{modelArtifactsInfo:xn(e)}}}}Ot.URL_SCHEME="downloads://";class D1{constructor(e){if(e==null||e.length<1)throw new Error(`When calling browserFiles, at least 1 file is required, but received ${e}`);this.jsonFile=e[0],this.weightsFiles=e.slice(1)}async load(){return new Promise((e,n)=>{const r=new FileReader;r.onload=s=>{const a=JSON.parse(s.target.result),o=a.modelTopology;if(o==null){n(new Error(`modelTopology field is missing from file ${this.jsonFile.name}`));return}if(a.weightsManifest==null){n(new Error(`weightManifest field is missing from file ${this.jsonFile.name}`));return}if(this.weightsFiles.length===0){e({modelTopology:o});return}const u=_s(a,l=>this.loadWeights(l));e(u)},r.onerror=s=>n(`Failed to read model topology and weights manifest JSON from file '${this.jsonFile.name}'. BrowserFiles supports loading Keras-style tf.Model artifacts only.`),r.readAsText(this.jsonFile)})}loadWeights(e){const n=[],r=[];for(const o of e)n.push(...o.weights),r.push(...o.paths);const s=this.checkManifestAndWeightFiles(e),a=r.map(o=>this.loadWeightsFile(o,s[o]));return Promise.all(a).then(o=>[n,o])}loadWeightsFile(e,n){return new Promise((r,s)=>{const a=new FileReader;a.onload=o=>{const i=o.target.result;r(i)},a.onerror=o=>s(`Failed to weights data from file of path '${e}'.`),a.readAsArrayBuffer(n)})}checkManifestAndWeightFiles(e){const n=[],r=this.weightsFiles.map(a=>Ua(a.name)),s={};for(const a of e)a.paths.forEach(o=>{const i=Ua(o);if(n.indexOf(i)!==-1)throw new Error(`Duplicate file basename found in weights manifest: '${i}'`);if(n.push(i),r.indexOf(i)===-1)throw new Error(`Weight file with basename '${i}' is not provided.`);s[o]=this.weightsFiles[r.indexOf(i)]});if(n.length!==this.weightsFiles.length)throw new Error(`Mismatch in the number of files in weights manifest (${n.length}) and the number of weight files provided (${this.weightsFiles.length}).`);return s}}const F1=t=>R().getBool("IS_BROWSER")&&!Array.isArray(t)&&t.startsWith(Ot.URL_SCHEME)?C1(t.slice(Ot.URL_SCHEME.length)):null;Q.registerSaveRouter(F1);function C1(t="model"){return new Ot(t)}function R1(t){return new D1(t)}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ka(t,e,n,r){o(t),n=n??0,r=r??1,i(n,r);let s=0;const a=u=>(u.then(l=>{const h=n+ ++s/t.length*(r-n);return e(h),l}),u);function o(u){g(u!=null&&Array.isArray(u)&&u.length>0,()=>"promises must be a none empty array")}function i(u,l){g(u>=0&&u<=1,()=>`Progress fraction must be in range [0, 1], but got startFraction ${u}`),g(l>=0&&l<=1,()=>`Progress fraction must be in range [0, 1], but got endFraction ${l}`),g(l>=u,()=>`startFraction must be no more than endFraction, but got startFraction ${u} and endFraction ${l}`)}return Promise.all(t.map(a))}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function Tp(t,e){e==null&&(e={});const n=e.fetchFunc==null?R().platform.fetch:e.fetchFunc,r=t.map(c=>n(c,e.requestInit,{isBinary:!0})),i=(e.onProgress==null?await Promise.all(r):await Ka(r,e.onProgress,0,.5)).map(c=>c.arrayBuffer());return e.onProgress==null?await Promise.all(i):await Ka(i,e.onProgress,.5,1)}function P1(t,e){var n;const r=e.fetchFunc==null?R().platform.fetch:e.fetchFunc;let s=0,a;return(n=e.onProgress)===null||n===void 0||n.call(e,0),new ReadableStream({pull:async o=>{for(var i;s<t.length;){a||(a=(await r(t[s],e.requestInit,{isBinary:!0})).body.getReader());const{done:u,value:l}=await a.read();if(u){s++,a=void 0,(i=e.onProgress)===null||i===void 0||i.call(e,s/t.length);continue}o.enqueue(l);return}o.close()}})}async function B1(t,e="",n,r){return $p(o=>Tp(o,{requestInit:r}))(t,e,n)}function $p(t){return async(e,n="",r)=>{const s=e.map(()=>!1),a={},o=r!=null?r.map(()=>!1):[],i=[];if(e.forEach((m,y)=>{let S=0;m.weights.forEach(b=>{const T="quantization"in b?b.quantization.dtype:b.dtype,A=_t[T]*W(b.shape),$=()=>{s[y]=!0,a[y]==null&&(a[y]=[]),a[y].push({manifestEntry:b,groupOffset:S,sizeBytes:A})};r!=null?r.forEach((E,_)=>{E===b.name&&($(),o[_]=!0)}):$(),i.push(b.name),S+=A})}),!o.every(m=>m)){const m=r.filter((y,S)=>!o[S]);throw new Error(`Could not find weights in manifest with names: ${m.join(", ")}. 
Manifest JSON has weights with names: ${i.join(", ")}.`)}const u=s.reduce((m,y,S)=>(y&&m.push(S),m),[]),l=[];u.forEach(m=>{e[m].paths.forEach(y=>{const S=n+(n.endsWith("/")?"":"/")+y;l.push(S)})});const h=await t(l),c={};let f=0;return u.forEach(m=>{const y=e[m].paths.length,S=new Be(h.slice(f,f+y));a[m].forEach(T=>{const A=S.slice(T.groupOffset,T.groupOffset+T.sizeBytes),$=Cl(A,[T.manifestEntry]);for(const E in $)c[E]=$[E]}),f+=y}),c}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const L1="application/octet-stream",z1="application/json";class ka{constructor(e,n){if(this.DEFAULT_METHOD="POST",n==null&&(n={}),this.weightPathPrefix=n.weightPathPrefix,this.weightUrlConverter=n.weightUrlConverter,n.fetchFunc!=null?(g(typeof n.fetchFunc=="function",()=>"Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"),this.fetch=n.fetchFunc):this.fetch=R().platform.fetch,g(e!=null&&e.length>0,()=>"URL path for http must not be null, undefined or empty."),Array.isArray(e)&&g(e.length===2,()=>`URL paths for http must have a length of 2, (actual length is ${e.length}).`),this.path=e,n.requestInit!=null&&n.requestInit.body!=null)throw new Error("requestInit is expected to have no pre-existing body, but has one.");this.requestInit=n.requestInit||{},this.loadOptions=n}async save(e){if(e.modelTopology instanceof ArrayBuffer)throw new Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");const n=Object.assign({method:this.DEFAULT_METHOD},this.requestInit);n.body=new FormData;const r=[{paths:["./model.weights.bin"],weights:e.weightSpecs}],s=Bl(e,r);if(n.body.append("model.json",new Blob([JSON.stringify(s)],{type:z1}),"model.json"),e.weightData!=null){const o=Be.join(e.weightData);n.body.append("model.weights.bin",new Blob([o],{type:L1}),"model.weights.bin")}const a=await this.fetch(this.path,n);if(a.ok)return{modelArtifactsInfo:xn(e),responses:[a]};throw new Error(`BrowserHTTPRequest.save() failed due to HTTP response status ${a.status}.`)}async loadModelJSON(){const e=await this.fetch(this.path,this.requestInit);if(!e.ok)throw new Error(`Request to ${this.path} failed with status code ${e.status}. Please verify this URL points to the model JSON of the model to load.`);let n;try{n=await e.json()}catch{let o=`Failed to parse model JSON of response from ${this.path}.`;throw this.path.endsWith(".pb")?o+=" Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.":o+=" Please make sure the server is serving valid JSON for this request.",new Error(o)}const r=n.modelTopology,s=n.weightsManifest;if(r==null&&s==null)throw new Error(`The JSON from HTTP path ${this.path} contains neither model topology or manifest for weights.`);return n}async load(){if(this.loadOptions.streamWeights)return this.loadStream();const e=await this.loadModelJSON();return _s(e,n=>this.loadWeights(n))}async loadStream(){const e=await this.loadModelJSON(),n=await this.getWeightUrls(e.weightsManifest),r=Yn(e.weightsManifest),s=()=>P1(n,this.loadOptions);return Object.assign(Object.assign({},e),{weightSpecs:r,getWeightStream:s})}async getWeightUrls(e){const n=Array.isArray(this.path)?this.path[1]:this.path,[r,s]=V1(n),a=this.weightPathPrefix||r,o=[],i=[];for(const u of e)for(const l of u.paths)this.weightUrlConverter!=null?i.push(this.weightUrlConverter(l)):o.push(a+l+s);return this.weightUrlConverter&&o.push(...await Promise.all(i)),o}async loadWeights(e){const n=await this.getWeightUrls(e),r=Yn(e),s=await Tp(n,this.loadOptions);return[r,s]}}ka.URL_SCHEME_REGEX=/^https?:\/\//;function V1(t){const e=t.lastIndexOf("/"),n=t.lastIndexOf("?"),r=t.substring(0,e),s=n>e?t.substring(n):"";return[r+"/",s]}function Jr(t){return t.match(ka.URL_SCHEME_REGEX)!=null}const Ep=(t,e)=>{if(typeof fetch>"u"&&(e==null||e.fetchFunc==null))return null;{let n=!0;if(Array.isArray(t)?n=t.every(r=>Jr(r)):n=Jr(t),n)return _a(t,e)}return null};Q.registerSaveRouter(Ep);Q.registerLoadRouter(Ep);function _a(t,e){return new ka(t,e)}function j1(t,e){return _a(t,e)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Ir{constructor(e){this.modelArtifacts=e}load(){return this.modelArtifacts}}class kp{constructor(e){this.saveHandler=e}save(e){return this.saveHandler(e)}}class M1{constructor(e){e.load&&(this.load=()=>Promise.resolve(e.load())),e.save&&(this.save=n=>Promise.resolve(e.save(n)))}}function W1(t,e,n,r){const s=arguments;return new M1(rr(...s))}function rr(t,e,n,r){return arguments.length===1?t.modelTopology!=null||t.weightSpecs!=null?new Ir(t):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new Ir({modelTopology:t})):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new Ir({modelTopology:t,weightSpecs:e,weightData:n,trainingConfig:r}))}function U1(t){return new kp(t)}function q1(t){return new kp(t)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const va=Object.freeze(Object.defineProperty({__proto__:null,CompositeArrayBuffer:Be,browserFiles:R1,browserHTTPRequest:j1,concatenateArrayBuffers:Vm,copyModel:ud,decodeWeights:Cl,decodeWeightsStream:Pl,encodeWeights:Cm,fromMemory:W1,fromMemorySync:rr,getLoadHandlers:Km,getModelArtifactsForJSON:_s,getModelArtifactsForJSONSync:ks,getModelArtifactsInfoForJSON:xn,getSaveHandlers:Hm,getWeightSpecs:Yn,http:_a,isHTTPScheme:Jr,listModels:od,loadWeights:B1,moveModel:ld,registerLoadRouter:Gm,registerSaveRouter:qm,removeModel:id,weightsLoaderFactory:$p,withSaveHandler:U1,withSaveHandlerSync:q1},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function G1(t,e,n){const r=d(t,"labels","confusionMatrix"),s=d(e,"predictions","confusionMatrix");g(n==null||n>0&&Number.isInteger(n),()=>`If provided, numClasses must be a positive integer, but got ${n}`),g(r.rank===1,()=>`Expected the rank of labels to be 1, but got ${r.rank}`),g(s.rank===1,()=>`Expected the rank of predictions to be 1, but got ${s.rank}`),g(r.shape[0]===s.shape[0],()=>`Mismatch in the number of examples: ${r.shape[0]} vs. ${s.shape[0]}. Labels and predictions should have the same number of elements.`),g(n>0&&Number.isInteger(n),()=>`numClasses is required to be a positive integer, but got ${n}`);const a=nr(X(r,"int32"),n),o=nr(X(s,"int32"),n),i=En(a),u=V(i,o);return X(u,"int32")}const H1=w({confusionMatrix_:G1});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const K1=Object.freeze(Object.defineProperty({__proto__:null,confusionMatrix:H1},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let gt,Xa=!1;function _p(t,e=3){if(e>4)throw new Error("Cannot construct Tensor with more than 4 channels from pixels.");if(t==null)throw new Error("pixels passed to tf.browser.fromPixels() can not be null");let n=!1,r=!1,s=!1,a=!1,o=!1,i=!1;if(t.data instanceof Uint8Array)n=!0;else if(typeof ImageData<"u"&&t instanceof ImageData)r=!0;else if(typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement)s=!0;else if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement)a=!0;else if(t.getContext!=null)o=!0;else if(typeof ImageBitmap<"u"&&t instanceof ImageBitmap)i=!0;else throw new Error(`pixels passed to tf.browser.fromPixels() must be either an HTMLVideoElement, HTMLImageElement, HTMLCanvasElement, ImageData in browser, or OffscreenCanvas, ImageData in webworker or {data: Uint32Array, width: number, height: number}, but was ${t.constructor.name}`);if(fn(Dr,N.backendName)!=null){const y={pixels:t},S={numChannels:e};return N.runKernel(Dr,y,S)}const[l,h]=s?[t.videoWidth,t.videoHeight]:[t.width,t.height];let c;if(o)c=t.getContext("2d").getImageData(0,0,l,h).data;else if(r||n)c=t.data;else if(a||s||i){if(gt==null)if(typeof document>"u")if(typeof OffscreenCanvas<"u"&&typeof OffscreenCanvasRenderingContext2D<"u")gt=new OffscreenCanvas(1,1).getContext("2d");else throw new Error("Cannot parse input in current context. Reason: OffscreenCanvas Context2D rendering is not supported.");else gt=document.createElement("canvas").getContext("2d",{willReadFrequently:!0});gt.canvas.width=l,gt.canvas.height=h,gt.drawImage(t,0,0,l,h),c=gt.getImageData(0,0,l,h).data}let f;if(e===4)f=new Int32Array(c);else{const y=l*h;f=new Int32Array(y*e);for(let S=0;S<y;S++)for(let b=0;b<e;++b)f[S*e+b]=c[S*4+b]}return ma(f,[h,l,e],"int32")}function X1(t){return t!=null&&t.data instanceof Uint8Array}function Z1(){return typeof window<"u"&&typeof ImageBitmap<"u"&&window.hasOwnProperty("createImageBitmap")}function J1(t){return t!=null&&t.width!==0&&t.height!==0}function Y1(t){return Z1()&&!(t instanceof ImageBitmap)&&J1(t)&&!X1(t)}async function Q1(t,e=3){let n=null;if(R().getBool("WRAP_TO_IMAGEBITMAP")&&Y1(t)){let r;try{r=await createImageBitmap(t,{premultiplyAlpha:"none"})}catch{r=null}r!=null&&r.width===t.width&&r.height===t.height?n=r:n=t}else n=t;return _p(n,e)}function vp(t){if(t.rank!==2&&t.rank!==3)throw new Error(`toPixels only supports rank 2 or 3 tensors, got rank ${t.rank}.`);const e=t.rank===2?1:t.shape[2];if(e>4||e===2)throw new Error(`toPixels only supports depth of size 1, 3 or 4 but got ${e}`);if(t.dtype!=="float32"&&t.dtype!=="int32")throw new Error(`Unsupported type for toPixels: ${t.dtype}. Please use float32 or int32 tensors.`)}function eN(t){const e=(t==null?void 0:t.alpha)||1;if(e>1||e<0)throw new Error(`Alpha value ${e} is suppoed to be in range [0 - 1].`)}async function tN(t,e){let n=d(t,"img","toPixels");if(!(t instanceof te)){const l=n;n=X(l,"int32"),l.dispose()}vp(n);const[r,s]=n.shape.slice(0,2),a=n.rank===2?1:n.shape[2],o=await n.data(),i=n.dtype==="float32"?255:1,u=new Uint8ClampedArray(s*r*4);for(let l=0;l<r*s;++l){const h=[0,0,0,255];for(let f=0;f<a;f++){const m=o[l*a+f];if(n.dtype==="float32"){if(m<0||m>1)throw new Error(`Tensor values for a float32 Tensor must be in the range [0 - 1] but encountered ${m}.`)}else if(n.dtype==="int32"&&(m<0||m>255))throw new Error(`Tensor values for a int32 Tensor must be in the range [0 - 255] but encountered ${m}.`);a===1?(h[0]=m*i,h[1]=m*i,h[2]=m*i):h[f]=m*i}const c=l*4;u[c+0]=Math.round(h[0]),u[c+1]=Math.round(h[1]),u[c+2]=Math.round(h[2]),u[c+3]=Math.round(h[3])}if(e!=null){Xa||fn(ys,N.backendName)!=null&&(console.warn("tf.browser.toPixels is not efficient to draw tensor on canvas. Please try tf.browser.draw instead."),Xa=!0),e.width=s,e.height=r;const l=e.getContext("2d"),h=new ImageData(u,s,r);l.putImageData(h,0,0)}return n!==t&&n.dispose(),u}function nN(t,e,n){let r=d(t,"img","draw");if(!(t instanceof te)){const o=r;r=X(o,"int32"),o.dispose()}vp(r),eN(n==null?void 0:n.imageOptions);const s={image:r},a={canvas:e,options:n};N.runKernel(ys,s,a)}const rN=w({fromPixels_:_p}),sN=Object.freeze(Object.defineProperty({__proto__:null,draw:nN,fromPixels:rN,fromPixelsAsync:Q1,toPixels:tN},Symbol.toStringTag,{value:"Module"}));function Ip(t,e){const n=t.shape.length,r=e.shape.length;if(n<1)throw new Error(`tf.gatherND() expects the input to be rank 1 or higher, but the rank was ${n}.`);if(r<1)throw new Error(`tf.gatherND() expects the indices to be rank 1 or higher, but the rank was ${r}.`);if(e.dtype!=="int32")throw new Error(`tf.gatherND() expects the indices to be int32 type, but the dtype was ${e.dtype}.`);if(e.shape[r-1]>n)throw new Error(`index innermost dimension length must be <= tensor rank; saw: ${e.shape[r-1]} vs. ${n}`);if(W(t.shape)===0)throw new Error(`Requested more than 0 entries, but input is empty. Input shape: ${t.shape}.`);const s=e.shape,a=s[s.length-1];let o=1;for(let c=0;c<s.length-1;++c)o*=s[c];const i=t.shape,u=s.slice();u.pop();let l=1;for(let c=a;c<n;++c)l*=i[c],u.push(i[c]);const h=[...en(t.shape).map(c=>c/l),1].slice(0,a);return[u,o,l,h]}const aN=Object.freeze(Object.defineProperty({__proto__:null,prepareAndValidate:Ip},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Yr=-2,oN=-1;function iN(t,e,n){const r=t.shape.length;g(r===e.length,()=>`Error in slice${r}D: Length of begin ${e} must match the rank of the array (${r}).`),g(r===n.length,()=>`Error in slice${r}D: Length of size ${n} must match the rank of the array (${r}).`);for(let s=0;s<r;++s)g(e[s]+n[s]<=t.shape[s],()=>`Error in slice${r}D: begin[${s}] + size[${s}] (${e[s]+n[s]}) would overflow input.shape[${s}] (${t.shape[s]})`)}function uN(t){const e=[];let n=0;for(;t>0;)t&1&&e.push(n),t/=2,n++;return e}function lN(t,e,n){const r=[];for(let s=0;s<t.length;s++)r[s]=Math.ceil((e[s]-t[s])/n[s]);return r}function xp(t,e,n,r){const s=[...t];for(let a=s.length;a<r.length;a++)s.push(1);for(let a=0;a<n;a++)a===0?s[e]=1:(s.splice(e,0,1),s.pop());return s}function Ap(t,e,n){return n<=t?n:n-(e-1)}function Op(t,e){const n=[];for(let r=0;r<t;r++)n.push(e+r);return n}function cN(t,e,n,r,s,a,o,i,u){const l=t.length;let h=new Array(l),c=new Array(l),f=new Array(l);if(e.length&&n>0){const m=e[0],y=n+1;h=Dp(o,m,y,r,t),c=Fp(i,m,y,s,t),f=xp(a,m,y,t)}else for(let m=0;m<l;m++)h[m]=Rp(o,r,a,t,m,u),c[m]=Pp(i,s,a,t,m,u),f[m]=Cp(a,m,u);return{begin:h,end:c,strides:f}}function Dp(t,e,n,r,s){const a=[...s],o=Op(n,e);for(let i=0;i<a.length;i++)if(o.indexOf(i)>-1)a[i]=0;else{const u=Ap(e,n,i);let l=r[u];t&1<<u&&(l=0),a[i]=l}return a}function Fp(t,e,n,r,s){const a=[...s],o=Op(n,e);for(let i=0;i<a.length;i++)if(o.indexOf(i)>-1)a[i]=Number.MAX_SAFE_INTEGER;else{const u=Ap(e,n,i);let l=r[u];t&1<<u&&(l=Number.MAX_SAFE_INTEGER),a[i]=l}for(let i=0;i<a.length;i++){const u=s[i];a[i]<0&&(a[i]+=u),a[i]=hn(0,a[i],s[i])}return a}function Cp(t,e,n){let r=t[e];return(n&1<<e||r==null)&&(r=1),r}function Rp(t,e,n,r,s,a){let o=e[s];const i=n[s]||1;(t&1<<s||a&1<<s||o==null)&&(i>0?o=Number.MIN_SAFE_INTEGER:o=Number.MAX_SAFE_INTEGER);const u=r[s];return o<0&&(o+=u),o=hn(0,o,u-1),o}function Pp(t,e,n,r,s,a){let o=e[s];const i=n[s]||1;(t&1<<s||a&1<<s||o==null)&&(i>0?o=Number.MAX_SAFE_INTEGER:o=Number.MIN_SAFE_INTEGER);const u=r[s];return o<0&&(o+=u),i>0?o=hn(0,o,u):o=hn(-1,o,u-1),o}function hN(t,e,n){let r=n.length;for(let s=0;s<n.length;s++)if(n[s]>1){r=s;break}for(let s=r+1;s<n.length;s++)if(e[s]>0||n[s]!==t[s])return!1;return!0}function pN(t,e){let n=t.length>0?t[t.length-1]:1;for(let r=0;r<t.length-1;r++)n+=t[r]*e[r];return n}function fN(t,e,n){let r;const s=t.shape.length;typeof e=="number"?r=[e,...new Array(s-1).fill(0)]:e.length<s?r=e.concat(new Array(s-e.length).fill(0)):r=e.slice(),r.forEach(o=>{g(o!==-1,()=>"slice() does not support negative begin indexing.")});let a;return n==null?a=new Array(s).fill(-1):typeof n=="number"?a=[n,...new Array(s-1).fill(-1)]:n.length<s?a=n.concat(new Array(s-n.length).fill(-1)):a=n,a=a.map((o,i)=>o>=0?o:(g(o===-1,()=>`Negative size values should be exactly -1 but got ${o} for the slice() size at index ${i}.`),t.shape[i]-r[i])),[r,a]}function mN(t,e,n,r,s,a,o,i,u){let l;if(r==null?(l=new Array(e.length),l.fill(1)):l=r,o!=null&&o&o-1)throw new Error("Multiple ellipses in slice is not allowed.");let h=!1;const c={dims:l.length,numAddAxisAfterEllipsis:0,begin:e.slice(),end:n.slice(),strides:l.slice(),beginMask:s,endMask:a,ellipsisMask:o,newAxisMask:i,shrinkAxisMask:u};for(let $=0;$<c.dims;$++)h&&1<<$&i&&c.numAddAxisAfterEllipsis++,1<<$&o&&(h=!0);h||(c.ellipsisMask|=1<<c.dims,c.dims++);const f={dims:t.length,beginMask:0,endMask:0,beginValid:!1,endValid:!1};dN(c,f);let m=!0,y=!0,S=!0;const b=[],T=[];for(let $=0;$<t.length;++$){if(f.strides[$]===0)throw Error(`strides[${$}] must be non-zero`);const E=!!(f.shrinkAxisMask&1<<$),_=t[$];if(_===-1){b.push(E?1:-1);continue}const v=[f.beginMask&1<<$,f.endMask&1<<$],O=[f.strides[$]>0?0:-1,f.strides[$]>0?_:_-1];if(E&&f.strides[$]<=0)throw Error("only stride 1 allowed on non-range indexing.");S=S&&f.strides[$]===1;const D=!!(f.beginMask&1<<$&&f.endMask&1<<$);if(f.beginValid&&f.endValid){if(E){const M=f.begin[$]<0?_+f.begin[$]:f.begin[$];if(f.begin[$]=M,f.end[$]=f.begin[$]+1,M<0||M>=_)throw Error(`slice index ${f.begin[$]} of dimension ${$} out of bounds.`)}else f.begin[$]=Za(f.begin[$],0,f.strides[$],_,v,O),f.end[$]=Za(f.end[$],1,f.strides[$],_,v,O);const P=f.strides[$]===1&&f.begin[$]===0&&f.end[$]===_;m=m&&P,y=y&&($===0&&f.strides[$]===1||P)}else m=m&&f.strides[$]===1&&D,y=y&&($===0&&f.strides[$]===1||D);let F,B=!1;if(f.beginValid&&f.endValid?(F=f.end[$]-f.begin[$],B=!0):E?(F=1,B=!0):D&&_>=0&&(f.strides[$]<0?F=-_:F=_,B=!0),B){let P;F===0||F<0!=f.strides[$]<0?P=0:P=Math.trunc(F/f.strides[$])+(F%f.strides[$]!==0?1:0),b.push(P)}else b.push(-1)}for(let $=0;$<f.finalShapeGatherIndices.length;++$){const E=f.finalShapeGatherIndices[$];E>=0?T.push(b[E]):E===Yr&&T.push(1)}return{finalShapeSparse:T.filter(($,E)=>f.finalShapeGatherIndices[E]!==Yr),finalShape:T,isIdentity:m,sliceDim0:y,isSimpleSlice:S,begin:f.begin,end:f.end,strides:f.strides}}function dN(t,e){e.beginMask=0,e.endMask=0,e.shrinkAxisMask=0;let n=0;e.beginValid=t.begin!=null,e.endValid=t.end!=null,e.begin=new Array(e.dims),e.end=new Array(e.dims),e.strides=new Array(e.dims),e.finalShapeGatherIndices=[],e.finalShapeGatherIndicesSparse=[],e.inputShapeGatherIndicesSparse=new Array(e.dims);for(let r=0;r<t.dims;r++)if(1<<r&t.ellipsisMask){const s=Math.min(e.dims-(t.dims-r)+1+t.numAddAxisAfterEllipsis,e.dims);for(;n<s;n++)e.begin[n]=0,e.end[n]=0,e.strides[n]=1,e.beginMask|=1<<n,e.endMask|=1<<n,e.finalShapeGatherIndices.push(n),e.finalShapeGatherIndicesSparse.push(-1),e.inputShapeGatherIndicesSparse[n]=r}else if(1<<r&t.newAxisMask)e.finalShapeGatherIndices.push(Yr),e.finalShapeGatherIndicesSparse.push(-1);else{if(n===e.begin.length)throw Error(`Index out of range using input dim ${n}; input has only ${e.dims} dims, ${e.begin.length}.`);t.begin!=null&&(e.begin[n]=t.begin[r]),t.end!=null&&(e.end[n]=t.end[r]),e.strides[n]=t.strides[r],t.beginMask&1<<r&&(e.beginMask|=1<<n),t.endMask&1<<r&&(e.endMask|=1<<n),t.shrinkAxisMask&1<<r?(e.finalShapeGatherIndices.push(oN),e.finalShapeGatherIndicesSparse.push(-1),e.shrinkAxisMask|=1<<n):(e.finalShapeGatherIndices.push(n),e.finalShapeGatherIndicesSparse.push(r)),e.inputShapeGatherIndicesSparse[n]=r,n++}}function Za(t,e,n,r,s,a){if(s[e])return n>0?a[e]:a[e+1&1];{const o=t<0?r+t:t;return o<a[0]?a[0]:o>a[1]?a[1]:o}}const Bp=Object.freeze(Object.defineProperty({__proto__:null,assertParamsValid:iN,computeFlatOffset:pN,computeOutShape:lN,getNormalizedAxes:cN,isSliceContinous:hN,maskToAxes:uN,parseSliceParams:fN,sliceInfo:mN,startForAxis:Rp,startIndicesWithElidedDims:Dp,stopForAxis:Pp,stopIndicesWithElidedDims:Fp,stridesForAxis:Cp,stridesWithElidedDims:xp},Symbol.toStringTag,{value:"Module"}));/** @license See the LICENSE file. */const gN="4.22.0";/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Lp{static sgd(e){return new $r(e)}static momentum(e,n,r=!1){return new $a(e,n,r)}static rmsprop(e,n=.9,r=0,s=null,a=!1){return new Ea(e,n,r,s,a)}static adam(e=.001,n=.9,r=.999,s=null){return new Sa(e,n,r,s)}static adadelta(e=.001,n=.95,r=null){return new wa(e,n,r)}static adamax(e=.002,n=.9,r=.999,s=null,a=0){return new Ta(e,n,r,s,a)}static adagrad(e,n=.1){return new Na(e,n)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const yN=Lp;/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const bN=typeof requestAnimationFrame<"u"?requestAnimationFrame:typeof setImmediate<"u"?setImmediate:t=>t();function wN(){return new Promise(t=>bN(()=>t()))}/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function NN(t,e){const n=t[0].length;t.forEach((s,a)=>{g(s.length===n,()=>`Error in concat${n}D: rank of tensors[${a}] must be the same as the rank of the rest (${n})`)}),g(e>=0&&e<n,()=>`Error in concat${n}D: axis must be between 0 and ${n-1}.`);const r=t[0];t.forEach((s,a)=>{for(let o=0;o<n;o++)g(o===e||s[o]===r[o],()=>`Error in concat${n}D: Shape of tensors[${a}] (${s}) does not match the shape of the rest (${r}) along the non-concatenated axis ${a}.`)})}function SN(t,e){const n=t[0].slice();for(let r=1;r<t.length;r++)n[e]+=t[r][e];return n}/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var Le;(function(t){t[t.FIRST_DIM_SIZE=0]="FIRST_DIM_SIZE",t[t.VALUE_ROWIDS=1]="VALUE_ROWIDS",t[t.ROW_LENGTHS=2]="ROW_LENGTHS",t[t.ROW_SPLITS=3]="ROW_SPLITS",t[t.ROW_LIMITS=4]="ROW_LIMITS",t[t.ROW_STARTS=5]="ROW_STARTS"})(Le||(Le={}));function TN(t,e,n){let r=new Array;if(n==null&&e==null)return r;if(e==null)for(;r.length<t+n.length;)r.push(-1);else r=e.slice();if(n==null)return r;if(t+n.length!==r.length)throw new Error(`rt input.shape and shape=${e} are incompatible: rt input.rank = ${t+n.length}, but shape.rank = ${r.length}`);for(let s=1;s<n.length;++s){const a=n[s],o=r[r.length-n.length+s],i=r[o];if(a>=0)if(i>=0){if(i!==a)throw new Error(`rt input.shape and shape=${e} are incompatible: rt input.shape[${s+t}] = ${a} but shape[${s+t}] = ${i}`)}else r[o]=a}return r}function $N(t){const e={FIRST_DIM_SIZE:Le.FIRST_DIM_SIZE,VALUE_ROWIDS:Le.VALUE_ROWIDS,ROW_LENGTHS:Le.ROW_LENGTHS,ROW_SPLITS:Le.ROW_SPLITS,ROW_LIMITS:Le.ROW_LIMITS,ROW_STARTS:Le.ROW_STARTS},n=[];for(const r of t)if(r in e)n.push(e[r]);else break;return n}function EN(t){return t.length===0?0:t[0]===Le.FIRST_DIM_SIZE?t.length-1:t.length}function kN(t,e){if(t==null||e==null)return;const n=t.length,r=e.length;if(n>=r)throw new Error(`defaultValue.shape=${t} and ragged tensor flatValues.shape=${e}, are incompatible: defaultValue.rank = ${n} must be less than ragged tensor input flatValues.rank = ${r})`);for(let s=0;s<Math.min(n,r-1);++s){const a=t[s],o=e[s+1];if(a>=0&&o>=0&&a!==1&&a!==o)throw new Error(`defaultValue.shape=${t}, and ragged tensor input flatValues.shape=${e} are incompatible: defaultValue.shape[${s-t.length}] = ${a} but ragged tensor input.flatValues.shape[${s-t.length}] = ${o}`)}}/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ia=30;function _N(t){return t<=Ia?t:Hn(t,Math.floor(Math.sqrt(t)))}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function vN(t,e,n){const r=n*(typeof t=="number"?t:t[0]),s=e*(typeof t=="number"?t:t[1]);return[r,s]}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function IN(t,e,n,r=!0){let s=[];if(r)s=s.concat(e.slice(0)),s.push(t[0]/n),s=s.concat(t.slice(1));else{s=s.concat(t[0]);const a=e.length;for(let o=0;o<a;++o)s=s.concat([t[o+1]/e[o],e[o]]);s=s.concat(t.slice(a+1))}return s}function xN(t,e,n=!0){const r=[];if(n){r.push(e);for(let s=e+1;s<t;++s)s<=2*e?(r.push(s),r.push(s-(e+1))):r.push(s)}else{const s=[],a=[];for(let o=1;o<t;++o)o>=e*2+1||o%2===1?a.push(o):s.push(o);r.push(...s),r.push(0),r.push(...a)}return r}function AN(t,e,n,r=!0){const s=[];r?s.push(t[0]/n):s.push(t[0]*n);for(let a=1;a<t.length;++a)a<=e.length?r?s.push(e[a-1]*t[a]):s.push(t[a]/e[a-1]):s.push(t[a]);return s}function ON(t,e){const n=[0];for(let r=0;r<e;++r)n.push(t[r][0]);return n}function DN(t,e,n){const r=t.slice(0,1);for(let s=0;s<n;++s)r.push(t[s+1]-e[s][0]-e[s][1]);return r}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const FN=1.7580993408473768,CN=1.0507009873554805;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const RN=.3275911,PN=.254829592,BN=-.284496736,LN=1.421413741,zN=-1.453152027,VN=1.061405429;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function jN(t,e){if(t.length!==e.length)throw new Error(`Cannot merge real and imag arrays of different lengths. real:${t.length}, imag: ${e.length}.`);const n=new Float32Array(t.length*2);for(let r=0;r<n.length;r+=2)n[r]=t[r/2],n[r+1]=e[r/2];return n}function MN(t){const e=new Float32Array(t.length/2),n=new Float32Array(t.length/2);for(let r=0;r<t.length;r+=2)e[r/2]=t[r],n[r/2]=t[r+1];return{real:e,imag:n}}function WN(t){const e=Math.ceil(t.length/4),n=new Float32Array(e),r=new Float32Array(e);for(let s=0;s<t.length;s+=4)n[Math.floor(s/4)]=t[s],r[Math.floor(s/4)]=t[s+1];return{real:n,imag:r}}function UN(t){const e=Math.floor(t.length/4),n=new Float32Array(e),r=new Float32Array(e);for(let s=2;s<t.length;s+=4)n[Math.floor(s/4)]=t[s],r[Math.floor(s/4)]=t[s+1];return{real:n,imag:r}}function qN(t,e){const n=t[e*2],r=t[e*2+1];return{real:n,imag:r}}function GN(t,e,n,r){t[r*2]=e,t[r*2+1]=n}function HN(t,e){const n=new Float32Array(t/2),r=new Float32Array(t/2);for(let s=0;s<Math.ceil(t/2);s++){const a=(e?2:-2)*Math.PI*(s/t);n[s]=Math.cos(a),r[s]=Math.sin(a)}return{real:n,imag:r}}function KN(t,e,n){const r=(n?2:-2)*Math.PI*(t/e),s=Math.cos(r),a=Math.sin(r);return{real:s,imag:a}}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const xr="->",XN=/->/g,Ja=",",Ya="...";function ZN(t,e){t=t.replace(/\s/g,"");const n=(t.length-t.replace(XN,"").length)/xr.length;if(n<1)throw new Error("Equations without an arrow are not supported.");if(n>1)throw new Error(`Equation must contain exactly one arrow ("${xr}").`);const[r,s]=t.split(xr);g(r.indexOf(Ya)===-1,()=>`The ellipsis notation ("${Ya}") is not supported yet.`);const a=r.split(Ja),o=a.length;if(e!==o)throw new Error(`Expected ${o} input tensors, received ${e}`);if(o>2)throw new Error("Support for more than 2 input tensors is not implemented yet.");const i=[];for(let f=0;f<s.length;++f){const m=s[f];if(!a.some(y=>y.indexOf(m)!==-1))throw new Error(`Output subscripts contain the label ${m} not present in the input subscripts.`);i.indexOf(m)===-1&&i.push(m)}for(let f=0;f<r.length;++f){const m=r[f];i.indexOf(m)===-1&&m!==Ja&&i.push(m)}const u=new Array(a.length);for(let f=0;f<o;++f){if(new Set(a[f].split("")).size!==a[f].length)throw new Error(`Found duplicate axes in input component ${a[f]}. Support for duplicate axes in input is not implemented yet.`);u[f]=[];for(let m=0;m<a[f].length;++m)u[f].push(i.indexOf(a[f][m]))}const l=i.length,h=s.length,c=[];for(let f=h;f<l;++f)c.push(f);return{allDims:i,summedDims:c,idDims:u}}function JN(t,e){let n=new Array(t);n.fill(-1);for(let s=0;s<e.length;++s)n[e[s]]=s;const r=[];for(let s=0;s<t;++s)n[s]===-1&&r.push(s);return n=n.filter(s=>s!==-1),{permutationIndices:n,expandDims:r}}function YN(t,e,n){const r=new Array(t);for(let s=0;s<n.length;++s){const a=n[s].shape;for(let o=0;o<e[s].length;++o)r[e[s][o]]===void 0?r[e[s][o]]=a[o]:g(r[e[s][o]]===a[o],()=>`Expected dimension ${r[e[s][o]]} at axis ${o} of input shaped ${JSON.stringify(a)}, but got dimension ${a[o]}`)}}function QN(t,e){const n=t,r=[];let s=0;t.length===0&&n.push(-1),s=t.length+1;for(let o=0;o<s;++o)r.push([]);const a=[];for(let o=0;o<n.length;++o){const i=n[o],u=tS(e,i);for(const l of u)a.indexOf(l)===-1&&(r[o].push(l),a.push(l))}return{path:n,steps:r}}function eS(t){return t.every((e,n)=>e===n)}function tS(t,e){const n=[];for(let r=0;r<t.length;++r)(t[r].length===0||t[r].indexOf(e)!==-1||e===-1)&&n.push(r);return n}function nS(t,e,n=0){let r=[];if(typeof e=="number")g(t.shape[n]%e===0,()=>"Number of splits must evenly divide the axis."),r=new Array(e).fill(t.shape[n]/e);else{const s=e.reduce((o,i)=>(i===-1&&(o+=1),o),0);g(s<=1,()=>"There should be only one negative value in split array.");const a=e.indexOf(-1);if(a!==-1){const o=e.reduce((i,u)=>u>0?i+u:i);e[a]=t.shape[n]-o}g(t.shape[n]===e.reduce((o,i)=>o+i),()=>"The sum of sizes must match the size of the axis dimension."),r=e}return r}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function rS(t){return`Received SparseTensor with denseShape[0] = 0 but
  indices.shape[0] = ${t}`}function sS(t,e){return`indices(${t}, 0) is invalid: ${e} < 0`}function aS(t,e,n){return`indices(${t}, 0) is invalid: ${e} >= ${n}`}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function oS(t,e){return`only one output dimension may be -1, not both ${t} and ${e}`}function iS(t,e){return`size ${t} must be non-negative, not ${e}`}function uS(){return"reshape cannot infer the missing input size for an empty tensor unless all specified input sizes are non-zero"}function lS(t,e){const n=W(t),r=W(e);return`Input to reshape is a SparseTensor with ${n}
  dense values, but the requested shape requires a multiple of ${r}. inputShape=${t} outputShape= ${e}`}function cS(t,e){const n=W(t),r=W(e);return`Input to reshape is a tensor with ${n} dense values, but the requested shape has ${r}. inputShape=${t} outputShape=${e}`}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function hS(){return"segment ids must be >= 0"}function pS(){return"segment ids are not increasing"}function fS(t,e){return`Segment id ${t} out of range [0, ${e}), possibly because segmentIds input is not sorted.`}function mS(t,e,n){return`Bad: indices[${t}] == ${e} out of range [0, ${n})`}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function dS(t,e){let n=!1,r;for(t<=Ia?(r=t,n=!0):r=Hn(t,Math.floor(Math.sqrt(t)));!n;)r>e||r===t?n=!0:r=Hn(t,r+1);return r}function gS(t,e,n){const r=[],s=t.length;for(let a=0;a<s;a++)a!==e?r.push(t[a]):r.push(n);return r}function yS(t,e,n,r){const s=e.shape.length,a=t.shape.length;if(r!==0&&(r<-s||r>s))throw new Error(`Expect batchDims in the range of [-${s}, ${s}], but got ${r}`);if(r<0&&(r+=s),r>a)throw new Error(`batchDims (${r}) must be less than rank(x) (
    ${a}).`);if(n<r)throw new Error(`batchDims (${r}) must be less than or equal to axis (${n}).`);for(let c=0;c<r;++c)if(t.shape[c]!==e.shape[c])throw new Error(`x.shape[${c}]: ${t.shape[c]} should be equal to indices.shape[${c}]: ${e.shape[c]}.`);const o=t.shape[n],i=[];let u=1,l=1,h=1;for(let c=0;c<r;++c)i.push(t.shape[c]),u*=t.shape[c];for(let c=r;c<n;c++)i.push(t.shape[c]),l*=t.shape[c];for(let c=r;c<s;c++)i.push(e.shape[c]);for(let c=n+1;c<a;c++)i.push(t.shape[c]),h*=t.shape[c];return{batchSize:u,sliceSize:h,outerSize:l,dimSize:o,outputShape:i}}const bS=Object.freeze(Object.defineProperty({__proto__:null,collectGatherOpShapeInfo:yS,computeOutShape:gS,segOpComputeOptimalWindowSize:dS},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function wS(t){try{return t.map(e=>Zn(e))}catch(e){throw new Error(`Failed to decode encoded string bytes into utf-8, error: ${e}`)}}function NS(t){return t.map(e=>In(e))}const SS=Object.freeze(Object.defineProperty({__proto__:null,ERF_A1:PN,ERF_A2:BN,ERF_A3:LN,ERF_A4:zN,ERF_A5:VN,ERF_P:RN,PARALLELIZE_THRESHOLD:Ia,get RowPartitionType(){return Le},SELU_SCALE:CN,SELU_SCALEALPHA:FN,applyActivation:Sr,assertAndGetBroadcastShape:ne,assertAxesAreInnerMostDims:Lg,assertParamsConsistent:NN,assignToTypedArray:GN,axesAreInnerMostDims:Ps,calculateShapes:qh,checkEinsumDimSizes:YN,checkPadOnDimRoundingMode:Ae,combineLocations:Bc,combineRaggedTensorToTensorShapes:TN,complexWithEvenIndex:WN,complexWithOddIndex:UN,computeConv2DInfo:An,computeConv3DInfo:sc,computeDefaultPad:xs,computeDilation2DInfo:Fd,computeOptimalWindowSize:_N,computeOutAndReduceShapes:Bg,computeOutShape:SN,computePool2DInfo:rc,computePool3DInfo:Cd,convertConv2DDataFormat:ac,decodeEinsumEquation:ZN,eitherStridesOrDilationsAreOne:Ye,expandShapeToKeepDim:Fn,exponent:KN,exponents:HN,fromStringArrayToUint8:NS,fromUint8ToStringArray:wS,getAxesPermutation:zg,getBroadcastDims:Dc,getComplexWithIndex:qN,getEinsumComputePath:QN,getEinsumPermutation:JN,getFusedBiasGradient:Nr,getFusedDyActivation:wr,getImageCenter:vN,getInnerMostAxes:jg,getPermuted:xN,getRaggedRank:EN,getReductionAxes:Fs,getReshaped:IN,getReshapedPermuted:AN,getRowPartitionTypesHelper:$N,getSliceBeginCoords:ON,getSliceSize:DN,getSparseFillEmptyRowsIndicesDenseShapeMismatch:rS,getSparseFillEmptyRowsNegativeIndexErrorMessage:sS,getSparseFillEmptyRowsOutOfRangeIndexErrorMessage:aS,getSparseReshapeEmptyTensorZeroOutputDimErrorMessage:uS,getSparseReshapeInputOutputMismatchErrorMessage:cS,getSparseReshapeInputOutputMultipleErrorMessage:lS,getSparseReshapeMultipleNegativeOneOutputDimErrorMessage:oS,getSparseReshapeNegativeOutputDimErrorMessage:iS,getSparseSegmentReductionIndicesOutOfRangeErrorMessage:mS,getSparseSegmentReductionNegativeSegmentIdsErrorMessage:hS,getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage:pS,getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage:fS,getUndoAxesPermutation:Vg,isIdentityPermutation:eS,log:Cf,mergeRealAndImagArrays:jN,prepareAndValidate:Ip,prepareSplitSize:nS,segment_util:bS,shouldFuse:Tr,slice_util:Bp,splitRealAndImagArrays:MN,stridesOrDilationsArePositive:xt,tupleValuesAreOne:wn,upcastType:ur,validateDefaultValueShape:kN,validateInput:yr,validateUpdateShape:da,warn:et},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const TS=Object.freeze(Object.defineProperty({__proto__:null,nonMaxSuppressionV3Impl:cp,nonMaxSuppressionV4Impl:hp,nonMaxSuppressionV5Impl:pp,whereImpl:Qh},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */I1();const $S=Object.freeze(Object.defineProperty({__proto__:null,Abs:Eo,Acos:ko,Acosh:_o,AdadeltaOptimizer:wa,AdagradOptimizer:Na,AdamOptimizer:Sa,AdamaxOptimizer:Ta,Add:ds,AddN:vo,All:Io,Any:xo,ArgMax:Ao,ArgMin:Oo,Asin:Do,Asinh:Fo,Atan:Co,Atan2:Po,Atanh:Ro,AvgPool:Bo,AvgPool3D:Lo,AvgPool3DGrad:gf,AvgPoolGrad:df,BatchMatMul:zo,BatchToSpaceND:Vo,Bincount:jo,BitwiseAnd:Mo,BroadcastArgs:Wo,BroadcastTo:yf,Cast:gs,Ceil:Uo,ClipByValue:qo,Complex:Go,ComplexAbs:Ho,Concat:Ko,Conv2D:Xo,Conv2DBackpropFilter:Zo,Conv2DBackpropInput:Jo,Conv3D:Yo,Conv3DBackpropFilterV2:bf,Conv3DBackpropInputV2:Qo,Cos:ei,Cosh:ti,CropAndResize:si,Cumprod:ni,Cumsum:ri,DataStorage:Gp,DenseBincount:ai,DepthToSpace:oi,DepthwiseConv2dNative:ii,DepthwiseConv2dNativeBackpropFilter:ui,DepthwiseConv2dNativeBackpropInput:li,Diag:ci,Dilation2D:hi,Dilation2DBackpropFilter:Nf,Dilation2DBackpropInput:wf,Draw:ys,get ENV(){return fs},Einsum:fi,Elu:mi,EluGrad:Sf,Environment:To,Equal:gi,Erf:di,Exp:yi,ExpandDims:bi,Expm1:wi,FFT:Ni,Fill:Si,FlipLeftRight:Ti,Floor:$i,FloorDiv:Ei,FromPixels:Dr,FusedBatchNorm:ki,FusedConv2D:Cr,FusedDepthwiseConv2D:Rr,GatherNd:vi,GatherV2:_i,Greater:Ii,GreaterEqual:xi,IFFT:Ai,Identity:bs,Imag:Oi,IsFinite:Di,IsInf:Fi,IsNan:Ci,KernelBackend:co,LRN:Ui,LRNGrad:kf,LeakyRelu:Ri,Less:Pi,LessEqual:Bi,LinSpace:Li,Log:zi,Log1p:Vi,LogSoftmax:$f,LogicalAnd:ji,LogicalNot:Mi,LogicalOr:Wi,LogicalXor:Tf,LowerBound:Ef,MatrixBandPart:_f,Max:qi,MaxPool:Hi,MaxPool3D:Ki,MaxPool3DGrad:If,MaxPoolGrad:vf,MaxPoolWithArgmax:Xi,Maximum:Gi,Mean:Zi,Min:Ji,Minimum:Yi,MirrorPad:Qi,Mod:eu,MomentumOptimizer:$a,Multinomial:tu,Multiply:nu,Neg:ru,NonMaxSuppressionV3:au,NonMaxSuppressionV4:ou,NonMaxSuppressionV5:iu,NotEqual:su,OP_SCOPE_SUFFIX:$s,OneHot:lu,OnesLike:uu,Optimizer:dt,OptimizerConstructors:Lp,Pack:cu,PadV2:hu,Pool:xf,Pow:pu,Prelu:fu,Prod:mu,RMSPropOptimizer:Ea,RaggedGather:du,RaggedRange:gu,RaggedTensorToTensor:yu,Range:bu,get Rank(){return zr},Real:wu,RealDiv:pi,Reciprocal:Nu,get Reduction(){return he},Relu:Su,Relu6:ku,Reshape:Tu,ResizeBilinear:Eu,ResizeBilinearGrad:Of,ResizeNearestNeighbor:$u,ResizeNearestNeighborGrad:Af,Reverse:_u,RotateWithOffset:pl,Round:vu,Rsqrt:Iu,SGDOptimizer:$r,ScatterNd:xu,SearchSorted:Ou,Select:Du,Selu:Fu,Sigmoid:Lu,Sign:Bu,Sin:Ru,Sinh:Pu,Slice:Cu,Softmax:Uu,Softplus:zu,SpaceToBatchND:Mu,SparseFillEmptyRows:qu,SparseReshape:Gu,SparseSegmentMean:Hu,SparseSegmentSum:Ku,SparseToDense:Xu,SplitV:Wu,Sqrt:Vu,Square:Df,SquaredDifference:Zu,StaticRegexReplace:Ju,Step:hl,StridedSlice:Yu,StringNGrams:Qu,StringSplit:el,StringToHashBucketFast:tl,Sub:nl,Sum:ju,Tan:rl,Tanh:sl,Tensor:te,TensorBuffer:Jn,TensorScatterUpdate:Au,Tile:ws,TopK:al,Transform:ol,Transpose:jn,Unique:il,Unpack:ul,UnsortedSegmentSum:ll,UpperBound:Ff,Variable:dn,ZerosLike:cl,_FusedMatMul:Fr,abs:be,acos:ql,acosh:Gl,add:C,addN:Hl,all:Kl,any:Xl,argMax:Zl,argMin:Jl,asin:Yl,asinh:Ql,atan:ec,atan2:tc,atanh:nc,avgPool:As,avgPool3d:oc,backend:Fl,backend_util:SS,basicLSTMCell:ic,batchNorm:On,batchNorm2d:uc,batchNorm3d:lc,batchNorm4d:cc,batchToSpaceND:Os,bincount:Ds,bitwiseAnd:hc,booleanMaskAsync:ep,broadcastArgs:pc,broadcastTo:cn,broadcast_util:vg,browser:sN,buffer:Ve,cast:X,ceil:fc,clipByValue:mc,clone:Xe,complex:Je,concat:ue,concat1d:dc,concat2d:gc,concat3d:yc,concat4d:bc,conv1d:wc,conv2d:Dn,conv2dTranspose:Sc,conv3d:Tc,conv3dTranspose:$c,copyRegisteredKernels:Lf,cos:Ec,cosh:kc,cosineWindow:br,cumprod:_c,cumsum:vc,customGrad:Me,denseBincount:Ic,deprecationWarn:Sm,depthToSpace:xc,depthwiseConv2d:lr,device_util:dm,diag:Ac,dilation2d:Oc,disableDeprecationWarnings:Nm,dispose:pe,disposeVariables:Tm,div:K,divNoNan:Fc,dot:Cc,dropout:ap,einsum:wt,elu:Rs,enableDebugMode:wm,enableProdMode:bm,enclosingPowerOfTwo:ya,engine:$m,ensureShape:Rc,env:R,equal:Cs,erf:Pc,euclideanNorm:zc,exp:ct,expandDims:qe,expm1:Vc,eye:Bs,fft:mr,fill:tn,findBackend:Am,findBackendFactory:Om,floor:Ls,floorDiv:Is,fused:ip,gather:zs,gatherND:sp,gather_util:aN,getBackend:Dl,getGradient:Pr,getKernel:fn,getKernelsForBackend:Kn,grad:dy,grads:gy,greater:Rn,greaterEqual:Vs,ifft:$n,imag:Pn,image:dp,inTopKAsync:op,io:va,irfft:ha,isFinite:jc,isInf:Mc,isNaN:Wc,keep:De,kernel_impls:TS,leakyRelu:js,less:tr,lessEqual:cr,linalg:gp,linspace:Uc,localResponseNormalization:qc,log:Zt,log1p:Ms,logSigmoid:Hc,logSoftmax:Kc,logSumExp:Us,logicalAnd:Nn,logicalNot:qs,logicalOr:Gs,logicalXor:Xc,losses:yp,lowerBound:Zc,matMul:V,math:K1,max:kt,maxPool:Hs,maxPool3d:Jc,maxPoolWithArgmax:Yc,maximum:Ks,mean:Sn,memory:Em,meshgrid:Qc,min:er,minimum:Tn,mirrorPad:eh,mod:th,moments:nh,movingAverage:tp,mul:x,multiRNNCell:rh,multinomial:sh,neg:Ce,nextFrame:wN,norm:Cn,notEqual:Xs,oneHot:nr,ones:st,onesLike:ah,op:w,outerProduct:oh,pad:nn,pad1d:ih,pad2d:uh,pad3d:lh,pad4d:ch,pool:hh,pow:Xt,prelu:Js,print:vs,prod:ph,profile:km,raggedGather:fh,raggedRange:mh,raggedTensorToTensor:dh,rand:gh,randomGamma:Nh,randomNormal:ua,randomStandardNormal:Sh,randomUniform:fr,randomUniformInt:Th,range:Jt,ready:Im,real:Yt,reciprocal:$h,registerBackend:Dm,registerGradient:Rf,registerKernel:fl,relu:Bn,relu6:la,removeBackend:xm,reshape:k,reverse:ht,reverse1d:Eh,reverse2d:kh,reverse3d:_h,reverse4d:vh,rfft:dr,round:ca,rsqrt:Ih,scalar:z,scatterND:np,scatter_util:b0,searchSorted:pr,selu:xh,separableConv2d:Ah,serialization:_1,setBackend:vm,setPlatform:Fm,setdiff1dAsync:Oh,sigmoid:Et,sign:Dh,signal:mp,sin:Fh,sinh:Ch,slice:q,slice1d:Rh,slice2d:Ph,slice3d:Bh,slice4d:Lh,slice_util:Bp,softmax:zh,softplus:Ws,spaceToBatchND:Zs,sparse:bp,sparseToDense:rp,spectral:fp,split:Qt,sqrt:je,square:xe,squaredDifference:pa,squeeze:gr,stack:We,step:fa,stridedSlice:Vh,string:wp,sub:L,sum:H,sumOutType:om,tan:jh,tanh:Qn,tensor:Fe,tensor1d:$e,tensor2d:Ut,tensor3d:ma,tensor4d:Mh,tensor5d:Wh,tensor6d:Uh,tensorScatterUpdate:Gh,tensor_util:lm,test_util:Ob,tidy:j,tile:Wt,time:_m,topk:Hh,train:yN,transpose:En,truncatedNormal:Kh,unique:Xh,unregisterGradient:Bf,unregisterKernel:Pf,unsortedSegmentSum:Zh,unstack:mt,upcastType:ur,upperBound:Jh,util:Xf,valueAndGrad:yy,valueAndGrads:by,variable:Yh,variableGrads:Gc,version_core:gN,where:Ze,whereAsync:ga,zeros:At,zerosLike:Ne},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ES=R();ES.registerFlag("KEEP_INTERMEDIATE_TENSORS",()=>!1,t=>{t&&console.warn("Keep intermediate tensors is ON. This will print the values of all intermediate tensors during model inference. Not all models support this mode. For details, check e2e/benchmarks/ model_config.js. This significantly impacts performance.")});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */var ge;(function(t){t[t.DT_INVALID=0]="DT_INVALID",t[t.DT_FLOAT=1]="DT_FLOAT",t[t.DT_DOUBLE=2]="DT_DOUBLE",t[t.DT_INT32=3]="DT_INT32",t[t.DT_UINT8=4]="DT_UINT8",t[t.DT_INT16=5]="DT_INT16",t[t.DT_INT8=6]="DT_INT8",t[t.DT_STRING=7]="DT_STRING",t[t.DT_COMPLEX64=8]="DT_COMPLEX64",t[t.DT_INT64=9]="DT_INT64",t[t.DT_BOOL=10]="DT_BOOL",t[t.DT_QINT8=11]="DT_QINT8",t[t.DT_QUINT8=12]="DT_QUINT8",t[t.DT_QINT32=13]="DT_QINT32",t[t.DT_BFLOAT16=14]="DT_BFLOAT16",t[t.DT_QINT16=15]="DT_QINT16",t[t.DT_QUINT16=16]="DT_QUINT16",t[t.DT_UINT16=17]="DT_UINT16",t[t.DT_COMPLEX128=18]="DT_COMPLEX128",t[t.DT_HALF=19]="DT_HALF",t[t.DT_RESOURCE=20]="DT_RESOURCE",t[t.DT_VARIANT=21]="DT_VARIANT",t[t.DT_UINT32=22]="DT_UINT32",t[t.DT_UINT64=23]="DT_UINT64",t[t.DT_FLOAT_REF=101]="DT_FLOAT_REF",t[t.DT_DOUBLE_REF=102]="DT_DOUBLE_REF",t[t.DT_INT32_REF=103]="DT_INT32_REF",t[t.DT_UINT8_REF=104]="DT_UINT8_REF",t[t.DT_INT16_REF=105]="DT_INT16_REF",t[t.DT_INT8_REF=106]="DT_INT8_REF",t[t.DT_STRING_REF=107]="DT_STRING_REF",t[t.DT_COMPLEX64_REF=108]="DT_COMPLEX64_REF",t[t.DT_INT64_REF=109]="DT_INT64_REF",t[t.DT_BOOL_REF=110]="DT_BOOL_REF",t[t.DT_QINT8_REF=111]="DT_QINT8_REF",t[t.DT_QUINT8_REF=112]="DT_QUINT8_REF",t[t.DT_QINT32_REF=113]="DT_QINT32_REF",t[t.DT_BFLOAT16_REF=114]="DT_BFLOAT16_REF",t[t.DT_QINT16_REF=115]="DT_QINT16_REF",t[t.DT_QUINT16_REF=116]="DT_QUINT16_REF",t[t.DT_UINT16_REF=117]="DT_UINT16_REF",t[t.DT_COMPLEX128_REF=118]="DT_COMPLEX128_REF",t[t.DT_HALF_REF=119]="DT_HALF_REF",t[t.DT_RESOURCE_REF=120]="DT_RESOURCE_REF",t[t.DT_VARIANT_REF=121]="DT_VARIANT_REF",t[t.DT_UINT32_REF=122]="DT_UINT32_REF",t[t.DT_UINT64_REF=123]="DT_UINT64_REF"})(ge||(ge={}));var Qa;(function(t){(function(e){e[e.LEGACY=0]="LEGACY",e[e.V1=1]="V1",e[e.V2=2]="V2"})(t.CheckpointFormatVersion||(t.CheckpointFormatVersion={}))})(Qa||(Qa={}));/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const xa={};function kS(t,e){const n={tfOpName:t,category:"custom",inputs:[],attrs:[],customExecutor:e};xa[t]=n}function zp(t){return xa[t]}function _S(t){delete xa[t]}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function p(t,e,n,r,s){const a=e.inputParams[t];if(a&&a.inputIndexStart!==void 0){const i=a.inputIndexStart,u=a.inputIndexEnd===0?void 0:a.inputIndexEnd===void 0?i+1:a.inputIndexEnd,l=i<0?e.inputNames.length+i:i;if(a.type==="tensor")return oe(e.inputNames[l],n,r,s);if(a.type==="tensors"){const f=e.inputs.slice(i,u);return e.inputNames.slice(i,u).filter((y,S)=>{var b;return((b=f[S])===null||b===void 0?void 0:b.op)!=="NoOp"}).map(y=>oe(y,n,r,s))}const h=oe(e.inputNames[l],n,r,s),c=h.dataSync();return a.type==="number"?c[0]:$t(h.shape,c)}const o=e.attrParams[t];return o&&o.value}function oe(t,e,n,r){const[s,a]=ye(t,n);if(r!=null){const i=r.getHashTableHandleByName(s);if(i!=null)return i}const o=n.currentContextIds.find(i=>!!e[sr(s,i)]);return o!==void 0?e[sr(s,o)][a]:void 0}function eo(t,e,n){return e[sr(t,n.currentContextId)]}function Ge(t,e){const[n,r,s]=ye(t,e);return[sr(n,e&&e.currentContextId),r,s]}function sr(t,e){return e?`${t}-${e}`:t}function ye(t,e){if(t==="")return["",0,void 0];const n=e!=null&&e.parseNodeNameCache!=null;if(n){const a=e.parseNodeNameCache.get(t);if(a!=null)return a}const r=t.split(":");let s;if(r.length===1)s=[t,0,void 0];else{const a=r[0],o=r.length===3?r[1]:void 0,i=Number(r[r.length-1]);s=[a,i,o]}return n&&e.parseNodeNameCache.set(t,s),s}function Un(t,e,n){let r=p("pad",t,e,n);if(r==="explicit"){r=p("explicitPaddings",t,e,n);const s=[[0,0],[0,0],[0,0],[0,0]];for(let a=0;a<4;a++)s[a][0]=r[a*2],s[a][1]=r[a*2+1];return s}return r}function He(t){return t.kept?t:Xe(t)}/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const vS=[{tfOpName:"Add",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AddV2",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AddN",category:"arithmetic",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}]},{tfOpName:"BiasAdd",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"Sub",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"RealDiv",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Div",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"DivNoNan",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"FloorDiv",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Mul",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Maximum",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Minimum",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Pow",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SquaredDifference",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Mod",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"FloorMod",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}],IS=Object.freeze(Object.defineProperty({__proto__:null,json:vS},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const xS=[{tfOpName:"Abs",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Acos",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Asin",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atan2",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Ceil",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ClipByValue",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"clipValueMin",type:"number"},{start:2,name:"clipValueMax",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Complex",category:"basic_math",inputs:[{start:0,name:"real",type:"tensor"},{start:1,name:"imag",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ComplexAbs",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cos",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cosh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Elu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Exp",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Floor",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Log",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Imag",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"Tout",name:"outputType",type:"dtype",notSupported:!0}]},{tfOpName:"Neg",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Real",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"Tout",name:"outputType",type:"dtype",notSupported:!0}]},{tfOpName:"Prelu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"alpha",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Relu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Relu6",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Selu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sigmoid",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sin",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sinh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sqrt",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Rsqrt",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Square",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Tan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Tanh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sign",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Round",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Expm1",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Log1p",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Reciprocal",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Softplus",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Asinh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Acosh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atanh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Erf",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LeakyRelu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"alpha",name:"alpha",type:"number",defaultValue:.2},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsNan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsFinite",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsInf",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}],AS=Object.freeze(Object.defineProperty({__proto__:null,json:xS},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const OS=[{tfOpName:"EmptyTensorList",category:"control",inputs:[{start:0,name:"elementShape",type:"shape"},{start:1,name:"maxNumElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"LoopCond",category:"control",inputs:[{start:0,name:"pred",type:"tensor"}]},{tfOpName:"Switch",category:"control",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"pred",type:"tensor"}]},{tfOpName:"Merge",category:"control",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}]},{tfOpName:"Enter",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"frame_name",name:"frameName",type:"string"},{tfName:"is_constant",name:"isConstant",type:"bool"}]},{tfOpName:"Exit",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"NextIteration",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayV3",category:"control",inputs:[{start:0,name:"size",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"dynamic_size",name:"dynamicSize",type:"bool"},{tfName:"clear_after_read",name:"clearAfterRead",type:"bool"},{tfName:"identical_element_shapes",name:"identicalElementShapes",type:"bool"},{tfName:"tensor_array_name",name:"name",type:"string"}]},{tfOpName:"TensorArrayWriteV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"tensor",type:"tensor"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayReadV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayGatherV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape",name:"elementShape",type:"shape"}]},{tfOpName:"TensorArrayScatterV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"tensor",type:"tensor"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"TensorArrayConcatV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape_except0",name:"elementShapeExcept0",type:"shape",notSupported:!0}]},{tfOpName:"TensorArraySplitV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"tensor",type:"tensor"},{start:2,name:"lengths",type:"number[]"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"TensorArraySizeV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"flowIn",type:"number"}]},{tfOpName:"TensorArrayCloseV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"}]},{tfOpName:"StatelessIf",category:"control",inputs:[{start:0,name:"cond",type:"tensor"},{start:1,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"then_branch",name:"thenBranch",type:"func"},{tfName:"else_branch",name:"elseBranch",type:"func"}]},{tfOpName:"If",category:"control",inputs:[{start:0,name:"cond",type:"tensor"},{start:1,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"then_branch",name:"thenBranch",type:"func"},{tfName:"else_branch",name:"elseBranch",type:"func"}]},{tfOpName:"StatelessWhile",category:"control",inputs:[{start:0,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"cond",name:"cond",type:"func"},{tfName:"body",name:"body",type:"func"}]},{tfOpName:"While",category:"control",inputs:[{start:0,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"cond",name:"cond",type:"func"},{tfName:"body",name:"body",type:"func"}]},{tfOpName:"TensorListScatter",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListScatterV2",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"},{start:3,name:"numElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListGather",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListGetItem",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListSetItem",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"tensor",type:"tensor"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListReserve",category:"control",inputs:[{start:0,name:"elementShape",type:"shape"},{start:1,name:"numElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListFromTensor",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListStack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"},{tfName:"num_elements",name:"numElements",type:"dtype"}]},{tfOpName:"TensorListSplit",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"elementShape",type:"shape"},{start:2,name:"lengths",type:"number[]"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListConcat",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}],attrs:[{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListConcatV2",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}],attrs:[{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListPopBack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListPushBack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"tensor",type:"tensor"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListLength",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}]},{tfOpName:"TensorListResize",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"size",type:"number"}]}],DS=Object.freeze(Object.defineProperty({__proto__:null,json:OS},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const FS=[{tfOpName:"AvgPool",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPool",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[],notSupported:!0},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPoolWithArgmax",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"include_batch_in_index",name:"includeBatchInIndex",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AvgPool3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPool3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Conv1D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"stride",name:"stride",type:"number"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NWC"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"dilation",name:"dilation",type:"number",defaultValue:1}]},{tfOpName:"Conv2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"useCudnnOnGpu",name:"useCudnnOnGpu",type:"bool"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"_FusedConv2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"use_cudnn_on_gpu",name:"useCudnnOnGpu",type:"bool",defaultValue:!0},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]",defaultValue:[1,1,1,1]},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:1e-4},{tfName:"leakyrelu_alpha",name:"leakyreluAlpha",type:"number",defaultValue:.2}]},{tfOpName:"Conv2DBackpropInput",category:"convolution",inputs:[{start:2,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:0,name:"outputShape",type:"number[]"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]",notSupported:!0}]},{tfOpName:"DepthwiseConv2d",category:"convolution",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"DepthwiseConv2dNative",category:"convolution",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"FusedDepthwiseConv2dNative",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]",defaultValue:[1,1,1,1]},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]}]},{tfOpName:"Conv3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"Dilation2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"rates",name:"dilations",type:"number[]"},{tfName:"padding",name:"pad",type:"string"}]}],CS=Object.freeze(Object.defineProperty({__proto__:null,json:FS},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const RS=[{tfOpName:"Fill",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"},{start:1,name:"value",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"LinSpace",category:"creation",inputs:[{start:0,name:"start",type:"number"},{start:1,name:"stop",type:"number"},{start:2,name:"num",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"OneHot",category:"creation",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"depth",type:"number"},{start:2,name:"onValue",type:"number",defaultValue:1},{start:3,name:"offValue",type:"number",defaultValue:0}],attrs:[{tfName:"axis",name:"axis",type:"number",notSupported:!0},{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"Ones",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"OnesLike",category:"creation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"RandomStandardNormal",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"RandomUniform",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"minval",name:"minval",type:"number",defaultValue:0},{tfName:"maxval",name:"maxval",type:"number",defaultValue:1},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"RandomUniformInt",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"minval",name:"minval",type:"number"},{tfName:"maxval",name:"maxval",type:"number"},{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0}]},{tfOpName:"Range",category:"creation",inputs:[{start:0,name:"start",type:"number"},{start:1,name:"stop",type:"number"},{start:2,name:"step",type:"number",defaultValue:0}],attrs:[{tfName:"Tidx",name:"dtype",type:"dtype"}]},{tfOpName:"TruncatedNormal",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"means",name:"mean",type:"number",defaultValue:0},{tfName:"stddev",name:"stdDev",type:"number",defaultValue:1},{tfName:"seed",name:"seed",type:"number"},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"Zeros",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"ZerosLike",category:"creation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"Multinomial",category:"creation",inputs:[{start:0,name:"logits",type:"tensor"},{start:1,name:"numSamples",type:"number"}],attrs:[{tfName:"seed",name:"seed",type:"number"},{tfName:"seed2",name:"seed2",type:"number"},{tfName:"T",name:"dtype",type:"dtype"},{tfName:"output_dtype",name:"output_dtype",type:"dtype"}]}],PS=Object.freeze(Object.defineProperty({__proto__:null,json:RS},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const BS=[{tfOpName:"NonMaxSuppressionV2",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"}]},{tfOpName:"NonMaxSuppressionV3",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"}]},{tfOpName:"NonMaxSuppressionV4",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"T_threshold",name:"threshold",type:"dtype",notSupported:!0},{tfName:"pad_to_max_output_size",name:"padToMaxOutputSize",type:"bool"}]},{tfOpName:"NonMaxSuppressionV5",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"},{start:5,name:"softNmsSigma",type:"number"}]},{tfOpName:"Where",category:"dynamic",inputs:[{start:0,name:"condition",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ListDiff",category:"dynamic",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}],LS=Object.freeze(Object.defineProperty({__proto__:null,json:BS},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const zS=[{tfOpName:"LowerBound",category:"evaluation",inputs:[{start:0,name:"sortedSequence",type:"tensor"},{start:1,name:"values",type:"tensor"}]},{tfOpName:"TopKV2",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"k",type:"number"}],attrs:[{tfName:"sorted",name:"sorted",type:"bool"}]},{tfOpName:"UpperBound",category:"evaluation",inputs:[{start:0,name:"sortedSequence",type:"tensor"},{start:1,name:"values",type:"tensor"}]},{tfOpName:"Unique",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"UniqueV2",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]}],VS=Object.freeze(Object.defineProperty({__proto__:null,json:zS},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const jS=[{tfOpName:"PlaceholderWithDefault",category:"graph",inputs:[{start:0,name:"default",type:"tensor"}],attrs:[{tfName:"shape",name:"shape",type:"shape"},{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"Placeholder",category:"graph",attrs:[{tfName:"shape",name:"shape",type:"shape"},{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"Const",category:"graph"},{tfOpName:"Identity",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"IdentityN",category:"graph",inputs:[{start:0,end:0,name:"x",type:"tensors"}]},{tfOpName:"Snapshot",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Rank",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Size",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Shape",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"ShapeN",category:"graph",inputs:[{start:0,end:0,name:"x",type:"tensors"}]},{tfOpName:"Print",category:"graph",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"data",type:"tensors"}],attrs:[{tfName:"message",name:"message",type:"string"},{tfName:"first_n",name:"firstN",type:"number",notSupported:!0},{tfName:"summarize",name:"summarize",type:"number",defaultValue:3}]},{tfOpName:"NoOp",category:"graph",inputs:[]},{tfOpName:"StopGradient",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"FakeQuantWithMinMaxVars",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"min",name:"min",type:"number"},{tfName:"max",name:"max",type:"number"}]}],MS=Object.freeze(Object.defineProperty({__proto__:null,json:jS},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const WS=[{tfOpName:"HashTable",category:"hash_table",inputs:[],attrs:[{tfName:"shared_name",name:"sharedName",type:"string"},{tfName:"use_node_name_sharing",name:"useNodeNameSharing",type:"bool"},{tfName:"key_dtype",name:"keyDType",type:"dtype"},{tfName:"value_dtype",name:"valueDType",type:"dtype"}]},{tfOpName:"HashTableV2",category:"hash_table",inputs:[],attrs:[{tfName:"shared_name",name:"sharedName",type:"string"},{tfName:"use_node_name_sharing",name:"useNodeNameSharing",type:"bool"},{tfName:"key_dtype",name:"keyDType",type:"dtype"},{tfName:"value_dtype",name:"valueDType",type:"dtype"}]},{tfOpName:"LookupTableImport",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableImportV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableFind",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableFindV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableSize",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"}]},{tfOpName:"LookupTableSizeV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"}]},{tfOpName:"InitializeTable",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}]},{tfOpName:"InitializeTableV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}]}],US=Object.freeze(Object.defineProperty({__proto__:null,json:WS},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const qS=[{tfOpName:"ResizeBilinear",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"size",type:"number[]"}],attrs:[{tfName:"align_corners",name:"alignCorners",type:"bool"},{tfName:"half_pixel_centers",name:"halfPixelCenters",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ResizeNearestNeighbor",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"size",type:"number[]"}],attrs:[{tfName:"align_corners",name:"alignCorners",type:"bool"},{tfName:"half_pixel_centers",name:"halfPixelCenters",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"CropAndResize",category:"image",inputs:[{start:0,name:"image",type:"tensor"},{start:1,name:"boxes",type:"tensor"},{start:2,name:"boxInd",type:"tensor"},{start:3,name:"cropSize",type:"number[]"}],attrs:[{tfName:"method",name:"method",type:"string"},{tfName:"extrapolation_value",name:"extrapolationValue",type:"number"}]},{tfOpName:"ImageProjectiveTransformV3",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"transforms",type:"tensor"},{start:2,name:"outputShape",type:"number[]"},{start:3,name:"fillValue",type:"number"}],attrs:[{tfName:"interpolation",name:"interpolation",type:"string"},{tfName:"fill_mode",name:"fillMode",type:"string"}]}],GS=Object.freeze(Object.defineProperty({__proto__:null,json:qS},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const HS=[{tfOpName:"Equal",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"NotEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Greater",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"GreaterEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Less",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LessEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalAnd",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalNot",category:"logical",inputs:[{start:0,name:"a",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalOr",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Select",category:"logical",inputs:[{start:0,name:"condition",type:"tensor"},{start:1,name:"a",type:"tensor"},{start:2,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SelectV2",category:"logical",inputs:[{start:0,name:"condition",type:"tensor"},{start:1,name:"a",type:"tensor"},{start:2,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BitwiseAnd",category:"logical",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}]}],KS=Object.freeze(Object.defineProperty({__proto__:null,json:HS},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const XS=[{tfOpName:"_FusedMatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:1e-4},{tfName:"transpose_a",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"transpose_b",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"leakyrelu_alpha",name:"leakyreluAlpha",type:"number",defaultValue:.2},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"transpose_a",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"transpose_b",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BatchMatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"adj_x",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"adj_y",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BatchMatMulV2",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"adj_x",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"adj_y",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Transpose",category:"matrices",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"perm",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Einsum",category:"matrices",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}],attrs:[{tfName:"equation",name:"equation",type:"string"},{tfName:"N",name:"n",type:"number",defaultValue:2},{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"MatrixBandPart",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"numLower",type:"tensor"},{start:1,name:"numUpper",type:"tensor"}]}],ZS=Object.freeze(Object.defineProperty({__proto__:null,json:XS},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const JS=[{tfOpName:"EuclideanNorm",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool",defaultValue:!1}]},{tfOpName:"FusedBatchNorm",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"FusedBatchNormV2",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"FusedBatchNormV3",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"LRN",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"depth_radius",name:"radius",type:"number",defaultValue:5},{tfName:"bias",name:"bias",type:"number",defaultValue:1},{tfName:"alpha",name:"alpha",type:"number",defaultValue:1},{tfName:"beta",name:"beta",type:"number",defaultValue:.5}]},{tfOpName:"Softmax",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"LogSoftmax",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}]}],YS=Object.freeze(Object.defineProperty({__proto__:null,json:JS},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const QS=[{tfOpName:"Bincount",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"size",type:"number"},{start:2,name:"weights",type:"tensor"}]},{tfOpName:"DenseBincount",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"size",type:"number"},{start:2,name:"weights",type:"tensor"}],attrs:[{tfName:"binary_output",name:"binaryOutput",type:"bool"}]},{tfOpName:"Max",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Mean",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Min",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Sum",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"All",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Any",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"ArgMax",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"ArgMin",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"Prod",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cumprod",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}],attrs:[{tfName:"exclusive",name:"exclusive",type:"bool"},{tfName:"reverse",name:"reverse",type:"bool"}]},{tfOpName:"Cumsum",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}],attrs:[{tfName:"exclusive",name:"exclusive",type:"bool"},{tfName:"reverse",name:"reverse",type:"bool"}]}],eT=Object.freeze(Object.defineProperty({__proto__:null,json:QS},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const tT=[{tfOpName:"ConcatV2",category:"slice_join",inputs:[{start:0,end:-1,name:"tensors",type:"tensors"},{start:-1,name:"axis",type:"number"}],attrs:[{tfName:"N",name:"n",type:"number",defaultValue:2}]},{tfOpName:"Concat",category:"slice_join",inputs:[{start:1,end:0,name:"tensors",type:"tensors"},{start:0,name:"axis",type:"number"}],attrs:[{tfName:"N",name:"n",type:"number",defaultValue:2}]},{tfOpName:"GatherV2",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"axis",type:"number",defaultValue:0}],attrs:[{tfName:"batch_dims",name:"batchDims",type:"number",defaultValue:0}]},{tfOpName:"Gather",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",notSupported:!0}]},{tfOpName:"Reverse",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"dims",type:"bool[]"}]},{tfOpName:"ReverseV2",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}]},{tfOpName:"Slice",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"begin",type:"number[]"},{start:2,name:"size",type:"number[]"}]},{tfOpName:"StridedSlice",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"begin",type:"number[]"},{start:2,name:"end",type:"number[]"},{start:3,name:"strides",type:"number[]"}],attrs:[{tfName:"begin_mask",name:"beginMask",type:"number",defaultValue:0},{tfName:"end_mask",name:"endMask",type:"number",defaultValue:0},{tfName:"new_axis_mask",name:"newAxisMask",type:"number",defaultValue:0},{tfName:"ellipsis_mask",name:"ellipsisMask",type:"number",defaultValue:0},{tfName:"shrink_axis_mask",name:"shrinkAxisMask",type:"number",defaultValue:0}]},{tfOpName:"Pack",category:"slice_join",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}],attrs:[{tfName:"axis",name:"axis",type:"number",defaultValue:0}]},{tfOpName:"Unpack",category:"slice_join",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"axis",name:"axis",type:"number",defaultValue:0},{tfName:"num",name:"num",type:"number",defaultValue:0,notSupported:!0}]},{tfOpName:"Tile",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"reps",type:"number[]"}]},{tfOpName:"Split",category:"slice_join",inputs:[{start:0,name:"axis",type:"number",defaultValue:0},{start:1,name:"x",type:"tensor"}],attrs:[{tfName:"num_split",name:"numOrSizeSplits",type:"number",defaultValue:1}]},{tfOpName:"SplitV",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"numOrSizeSplits",type:"number[]"},{start:2,name:"axis",type:"number",defaultValue:0}]},{tfOpName:"ScatterNd",category:"slice_join",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"values",type:"tensor"},{start:2,name:"shape",type:"number[]"}]},{tfOpName:"GatherNd",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"}]},{tfOpName:"SparseToDense",category:"slice_join",inputs:[{start:0,name:"sparseIndices",type:"tensor"},{start:1,name:"outputShape",type:"number[]"},{start:2,name:"sparseValues",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",defaultValue:!1,notSupported:!0}]},{tfOpName:"TensorScatterUpdate",category:"slice_join",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"values",type:"tensor"}]}],nT=Object.freeze(Object.defineProperty({__proto__:null,json:tT},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const rT=[{tfOpName:"SparseFillEmptyRows",category:"sparse",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"values",type:"tensor"},{start:2,name:"denseShape",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}]},{tfOpName:"SparseReshape",category:"sparse",inputs:[{start:0,name:"inputIndices",type:"tensor"},{start:1,name:"inputShape",type:"tensor"},{start:2,name:"newShape",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SparseSegmentMean",category:"sparse",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"segmentIds",type:"tensor"}]},{tfOpName:"SparseSegmentSum",category:"sparse",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"segmentIds",type:"tensor"}]}],sT=Object.freeze(Object.defineProperty({__proto__:null,json:rT},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const aT=[{tfOpName:"FFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"IFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"RFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"fft_length",type:"number",notSupported:!0}]},{tfOpName:"IRFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"fft_length",type:"number",notSupported:!0}]}],oT=Object.freeze(Object.defineProperty({__proto__:null,json:aT},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const iT=[{tfOpName:"StaticRegexReplace",category:"string",inputs:[{start:0,name:"input",type:"tensor"}],attrs:[{tfName:"pattern",name:"pattern",type:"string"},{tfName:"rewrite",name:"rewrite",type:"string"},{tfName:"replace_global",name:"replaceGlobal",type:"bool"}]},{tfOpName:"StringNGrams",category:"string",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"dataSplits",type:"tensor"}],attrs:[{tfName:"separator",name:"separator",type:"string"},{tfName:"ngram_widths",name:"nGramWidths",type:"number[]"},{tfName:"left_pad",name:"leftPad",type:"string"},{tfName:"right_pad",name:"rightPad",type:"string"},{tfName:"pad_width",name:"padWidth",type:"number"},{tfName:"preserve_short_sequences",name:"preserveShortSequences",type:"bool"}],outputs:["ngrams","ngrams_splits"]},{tfOpName:"StringSplit",category:"string",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"delimiter",type:"tensor"}],attrs:[{tfName:"skip_empty",name:"skipEmpty",type:"bool"}],outputs:["indices","values","shape"]},{tfOpName:"StringToHashBucketFast",category:"string",inputs:[{start:0,name:"input",type:"tensor"}],attrs:[{tfName:"num_buckets",name:"numBuckets",type:"number"}]}],uT=Object.freeze(Object.defineProperty({__proto__:null,json:iT},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const lT=[{tfOpName:"Cast",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"SrcT",name:"sdtype",type:"dtype",notSupported:!0},{tfName:"DstT",name:"dtype",type:"dtype"}]},{tfOpName:"ExpandDims",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"MirrorPad",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"}],attrs:[{tfName:"mode",name:"mode",type:"string"}]},{tfOpName:"Pad",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"}],attrs:[{tfName:"constant_value",name:"constantValue",type:"number",defaultValue:0}]},{tfOpName:"PadV2",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"},{start:2,name:"constantValue",type:"number",defaultValue:0}]},{tfOpName:"Reshape",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}]},{tfOpName:"EnsureShape",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}]},{tfOpName:"Squeeze",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"axis",tfDeprecatedName:"squeeze_dims",name:"axis",type:"number[]"}]},{tfOpName:"SpaceToBatchND",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"blockShape",type:"number[]"},{start:2,name:"paddings",type:"number[]"}]},{tfOpName:"BatchToSpaceND",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"blockShape",type:"number[]"},{start:2,name:"crops",type:"number[]"}]},{tfOpName:"DepthToSpace",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"block_size",name:"blockSize",type:"number"},{tfName:"data_format",name:"dataFormat",type:"string"}]},{tfOpName:"BroadcastTo",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}],attrs:[]},{tfOpName:"BroadcastArgs",category:"transformation",inputs:[{start:0,name:"s0",type:"tensor"},{start:1,name:"s1",type:"tensor"}],attrs:[]}],cT=Object.freeze(Object.defineProperty({__proto__:null,json:lT},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class to{static get Instance(){return this._instance||(this._instance=new this)}constructor(){const e=[IS,AS,DS,CS,PS,LS,VS,MS,US,GS,KS,ZS,YS,eT,nT,sT,oT,uT,cT],n=[].concat(...e.map(r=>r.json));this.opMappers=n.reduce((r,s)=>(r[s.tfOpName]=s,r),{})}transformGraph(e,n={}){const r=e.node,s=[],a=[],o=[],i=r.reduce((S,b)=>(S[b.name]=this.mapNode(b),b.op.startsWith("Placeholder")?s.push(S[b.name]):b.op==="Const"?a.push(S[b.name]):(b.input==null||b.input.length===0)&&o.push(S[b.name]),S),{});let u=[];const l=[];let h={},c={};n!=null&&(h=this.mapSignatureEntries(n.inputs),c=this.mapSignatureEntries(n.outputs));const f=Object.keys(i);f.forEach(S=>{const b=i[S];b.inputNames.forEach((T,A)=>{const[$,,E]=Ge(T),_=i[$];if(_.outputs!=null){const v=_.outputs.indexOf(E);if(v!==-1){const O=`${$}:${v}`;b.inputNames[A]=O}}b.inputs.push(_),_.children.push(b)})}),Object.keys(c).length===0?f.forEach(S=>{const b=i[S];b.children.length===0&&l.push(b)}):Object.keys(c).forEach(S=>{const[b]=Ge(S),T=i[b];T!=null&&(T.signatureKey=c[S],l.push(T))}),Object.keys(h).length>0?Object.keys(h).forEach(S=>{const[b]=Ge(S),T=i[b];T&&(T.signatureKey=h[S],u.push(T))}):u=s;let m={};e.library!=null&&e.library.function!=null&&(m=e.library.function.reduce((S,b)=>(S[b.signature.name]=this.mapFunction(b),S),{}));const y={nodes:i,inputs:u,outputs:l,weights:a,placeholders:s,signature:n,functions:m};return o.length>0&&(y.initNodes=o),y}mapSignatureEntries(e){return Object.keys(e||{}).reduce((n,r)=>(n[e[r].name]=r,n),{})}mapNode(e){const n=zp(e.op)||this.opMappers[e.op]||{};e.attr==null&&(e.attr={});const r={name:e.name,op:e.op,category:n.category,inputNames:(e.input||[]).map(s=>s.startsWith("^")?s.slice(1):s),inputs:[],children:[],inputParams:{},attrParams:{},rawAttrs:e.attr,outputs:n.outputs};return n.inputs!=null&&(r.inputParams=n.inputs.reduce((s,a)=>(s[a.name]={type:a.type,inputIndexStart:a.start,inputIndexEnd:a.end},s),{})),n.attrs!=null&&(r.attrParams=n.attrs.reduce((s,a)=>{const o=a.type;let i;switch(a.type){case"string":i=Qr(e.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=Qr(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"string[]":i=os(e.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=os(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"number":i=ts(e.attr,a.tfName,a.defaultValue||0),i===void 0&&a.tfDeprecatedName&&(i=ts(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"number[]":i=as(e.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=as(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"bool":i=es(e.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=es(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"bool[]":i=us(e.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=us(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"shape":i=ss(e.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=ss(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"shape[]":i=is(e.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=is(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"dtype":i=ns(e.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=ns(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"dtype[]":i=rs(e.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=rs(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"func":i=no(e.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=no(e.attr,a.tfDeprecatedName,a.defaultValue));break;case"tensor":case"tensors":break;default:throw new Error(`Unsupported param type: ${a.type} for op: ${e.op}`)}return s[a.name]={value:i,type:o},s},{})),r}mapFunction(e){const n=e.nodeDef,r=[],s=[];let a={};n!=null&&(a=n.reduce((c,f)=>(c[f.name]=this.mapNode(f),f.op==="Const"&&s.push(c[f.name]),c),{}));const o=[],i=[];e.signature.inputArg.forEach(c=>{const[f]=Ge(c.name),m={name:f,op:"Placeholder",inputs:[],inputNames:[],category:"graph",inputParams:{},attrParams:{dtype:{value:Aa(c.type),type:"dtype"}},children:[]};m.signatureKey=c.name,o.push(m),a[f]=m}),Object.keys(a).forEach(c=>{const f=a[c];f.inputNames.forEach((m,y)=>{const[S,,b]=Ge(m),T=a[S];if(T.outputs!=null){const A=T.outputs.indexOf(b);if(A!==-1){const $=`${S}:${A}`;f.inputNames[y]=$}}f.inputs.push(T),T.children.push(f)})});const l=e.ret;e.signature.outputArg.forEach(c=>{const[f,m]=Ge(l[c.name]),y=a[f];y!=null&&(y.defaultOutput=m,i.push(y))});const h=this.mapArgsToSignature(e);return{nodes:a,inputs:o,outputs:i,weights:s,placeholders:r,signature:h}}mapArgsToSignature(e){return{methodName:e.signature.name,inputs:e.signature.inputArg.reduce((n,r)=>(n[r.name]=this.mapArgToTensorInfo(r),n),{}),outputs:e.signature.outputArg.reduce((n,r)=>(n[r.name]=this.mapArgToTensorInfo(r,e.ret),n),{})}}mapArgToTensorInfo(e,n){let r=e.name;return n!=null&&(r=n[r]),{name:r,dtype:e.type}}}function hT(t){const e=R().global;if(typeof e.atob<"u")return e.atob(t);if(typeof Buffer<"u")return new Buffer(t,"base64").toString();throw new Error("Unable to decode base64 in this environment. Missing built-in atob() or Buffer()")}function Vp(t,e){const n=Array.isArray(t)?String.fromCharCode.apply(null,t):hT(t);return e?n:n.toLowerCase()}function Qr(t,e,n,r=!1){const s=t[e];return s!=null?Vp(s.s,r):n}function es(t,e,n){const r=t[e];return r?r.b:n}function ts(t,e,n){const r=t[e]||{},s=r.i!=null?r.i:r.f!=null?r.f:n;return typeof s=="number"?s:parseInt(s,10)}function Aa(t){switch(typeof t=="string"&&(t=ge[t]),t){case ge.DT_FLOAT:case ge.DT_HALF:return"float32";case ge.DT_INT32:case ge.DT_INT64:case ge.DT_INT8:case ge.DT_UINT8:return"int32";case ge.DT_BOOL:return"bool";case ge.DT_DOUBLE:return"float32";case ge.DT_STRING:return"string";case ge.DT_COMPLEX64:case ge.DT_COMPLEX128:return"complex64";default:return null}}function no(t,e,n){const r=t[e];return r&&r.func?r.func.name:n}function ns(t,e,n){const r=t[e];return r&&r.type?Aa(r.type):n}function rs(t,e,n){const r=t[e];return r&&r.list&&r.list.type?r.list.type.map(s=>Aa(s)):n}function jp(t){if(!t.unknownRank)return t.dim!=null?t.dim.map(e=>typeof e.size=="number"?e.size:parseInt(e.size,10)):[]}function ss(t,e,n){const r=t[e];return r&&r.shape?jp(r.shape):n}function as(t,e,n){const r=t[e];return r?((r.list.f&&r.list.f.length?r.list.f:r.list.i)||[]).map(s=>typeof s=="number"?s:parseInt(s,10)):n}function os(t,e,n,r=!1){const s=t[e];return s&&s.list&&s.list.s?s.list.s.map(a=>Vp(a,r)):n}function is(t,e,n){const r=t[e];return r&&r.list&&r.list.shape?r.list.shape.map(s=>jp(s)):n}function us(t,e,n){const r=t[e];return r&&r.list&&r.list.b?r.list.b:n}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class pT{constructor(e,n,r){this.node=e,this.tensorMap=n,this.context=r,this.inputs=[],this.attrs={},this.inputs=e.inputNames.map(s=>this.getInput(s)),e.rawAttrs!=null&&(this.attrs=Object.keys(e.rawAttrs).reduce((s,a)=>(s[a]=this.getAttr(a),s),{}))}getInput(e){return oe(e,this.tensorMap,this.context)}getAttr(e,n){const r=this.node.rawAttrs[e];if(r.tensor!=null)return oe(e,this.tensorMap,this.context);if(r.i!=null||r.f!=null)return ts(this.node.rawAttrs,e,n);if(r.s!=null)return Qr(this.node.rawAttrs,e,n);if(r.b!=null)return es(this.node.rawAttrs,e,n);if(r.shape!=null)return ss(this.node.rawAttrs,e,n);if(r.type!=null)return ns(this.node.rawAttrs,e,n);if(r.list!=null){if(r.list.i!=null||r.list.f!=null)return as(this.node.rawAttrs,e,n);if(r.list.s!=null)return os(this.node.rawAttrs,e,n);if(r.list.shape!=null)return is(this.node.rawAttrs,e,n);if(r.list.b!=null)return us(this.node.rawAttrs,e,n);if(r.list.type!=null)return rs(this.node.rawAttrs,e,n)}return n}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ie=Object.freeze(Object.defineProperty({__proto__:null,OP_SCOPE_SUFFIX:$s,abs:be,acos:ql,acosh:Gl,add:C,addN:Hl,all:Kl,any:Xl,argMax:Zl,argMin:Jl,asin:Yl,asinh:Ql,atan:ec,atan2:tc,atanh:nc,avgPool:As,avgPool3d:oc,basicLSTMCell:ic,batchNorm:On,batchNorm2d:uc,batchNorm3d:lc,batchNorm4d:cc,batchToSpaceND:Os,bincount:Ds,bitwiseAnd:hc,booleanMaskAsync:ep,broadcastArgs:pc,broadcastTo:cn,buffer:Ve,cast:X,ceil:fc,clipByValue:mc,clone:Xe,complex:Je,concat:ue,concat1d:dc,concat2d:gc,concat3d:yc,concat4d:bc,conv1d:wc,conv2d:Dn,conv2dTranspose:Sc,conv3d:Tc,conv3dTranspose:$c,cos:Ec,cosh:kc,cosineWindow:br,cumprod:_c,cumsum:vc,denseBincount:Ic,depthToSpace:xc,depthwiseConv2d:lr,diag:Ac,dilation2d:Oc,div:K,divNoNan:Fc,dot:Cc,dropout:ap,einsum:wt,elu:Rs,enclosingPowerOfTwo:ya,ensureShape:Rc,equal:Cs,erf:Pc,euclideanNorm:zc,exp:ct,expandDims:qe,expm1:Vc,eye:Bs,fft:mr,fill:tn,floor:Ls,floorDiv:Is,fused:ip,gather:zs,gatherND:sp,greater:Rn,greaterEqual:Vs,ifft:$n,imag:Pn,image:dp,inTopKAsync:op,irfft:ha,isFinite:jc,isInf:Mc,isNaN:Wc,leakyRelu:js,less:tr,lessEqual:cr,linalg:gp,linspace:Uc,localResponseNormalization:qc,log:Zt,log1p:Ms,logSigmoid:Hc,logSoftmax:Kc,logSumExp:Us,logicalAnd:Nn,logicalNot:qs,logicalOr:Gs,logicalXor:Xc,losses:yp,lowerBound:Zc,matMul:V,max:kt,maxPool:Hs,maxPool3d:Jc,maxPoolWithArgmax:Yc,maximum:Ks,mean:Sn,meshgrid:Qc,min:er,minimum:Tn,mirrorPad:eh,mod:th,moments:nh,movingAverage:tp,mul:x,multiRNNCell:rh,multinomial:sh,neg:Ce,norm:Cn,notEqual:Xs,oneHot:nr,ones:st,onesLike:ah,op:w,outerProduct:oh,pad:nn,pad1d:ih,pad2d:uh,pad3d:lh,pad4d:ch,pool:hh,pow:Xt,prelu:Js,print:vs,prod:ph,raggedGather:fh,raggedRange:mh,raggedTensorToTensor:dh,rand:gh,randomGamma:Nh,randomNormal:ua,randomStandardNormal:Sh,randomUniform:fr,randomUniformInt:Th,range:Jt,real:Yt,reciprocal:$h,relu:Bn,relu6:la,reshape:k,reverse:ht,reverse1d:Eh,reverse2d:kh,reverse3d:_h,reverse4d:vh,rfft:dr,round:ca,rsqrt:Ih,scalar:z,scatterND:np,searchSorted:pr,selu:xh,separableConv2d:Ah,setdiff1dAsync:Oh,sigmoid:Et,sign:Dh,signal:mp,sin:Fh,sinh:Ch,slice:q,slice1d:Rh,slice2d:Ph,slice3d:Bh,slice4d:Lh,softmax:zh,softplus:Ws,spaceToBatchND:Zs,sparse:bp,sparseToDense:rp,spectral:fp,split:Qt,sqrt:je,square:xe,squaredDifference:pa,squeeze:gr,stack:We,step:fa,stridedSlice:Vh,string:wp,sub:L,sum:H,tan:jh,tanh:Qn,tensor:Fe,tensor1d:$e,tensor2d:Ut,tensor3d:ma,tensor4d:Mh,tensor5d:Wh,tensor6d:Uh,tensorScatterUpdate:Gh,tile:Wt,topk:Hh,transpose:En,truncatedNormal:Kh,unique:Xh,unsortedSegmentSum:Zh,unstack:mt,upperBound:Jh,variable:Yh,where:Ze,whereAsync:ga,zeros:At,zerosLike:Ne},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const fT=(t,e,n,r=ie)=>{switch(t.op){case"BiasAdd":case"AddV2":case"Add":return[r.add(p("a",t,e,n),p("b",t,e,n))];case"AddN":return[r.addN(p("tensors",t,e,n))];case"FloorMod":case"Mod":return[r.mod(p("a",t,e,n),p("b",t,e,n))];case"Mul":return[r.mul(p("a",t,e,n),p("b",t,e,n))];case"RealDiv":case"Div":return[r.div(p("a",t,e,n),p("b",t,e,n))];case"DivNoNan":return[r.divNoNan(p("a",t,e,n),p("b",t,e,n))];case"FloorDiv":return[r.floorDiv(p("a",t,e,n),p("b",t,e,n))];case"Sub":return[r.sub(p("a",t,e,n),p("b",t,e,n))];case"Minimum":return[r.minimum(p("a",t,e,n),p("b",t,e,n))];case"Maximum":return[r.maximum(p("a",t,e,n),p("b",t,e,n))];case"Pow":return[r.pow(p("a",t,e,n),p("b",t,e,n))];case"SquaredDifference":return[r.squaredDifference(p("a",t,e,n),p("b",t,e,n))];default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const mT=(t,e,n,r=ie)=>{switch(t.op){case"Abs":case"ComplexAbs":return[r.abs(p("x",t,e,n))];case"Acos":return[r.acos(p("x",t,e,n))];case"Acosh":return[r.acosh(p("x",t,e,n))];case"Asin":return[r.asin(p("x",t,e,n))];case"Asinh":return[r.asinh(p("x",t,e,n))];case"Atan":return[r.atan(p("x",t,e,n))];case"Atan2":return[r.atan2(p("x",t,e,n),p("y",t,e,n))];case"Atanh":return[r.atanh(p("x",t,e,n))];case"Ceil":return[r.ceil(p("x",t,e,n))];case"Complex":return[r.complex(p("real",t,e,n),p("imag",t,e,n))];case"Cos":return[r.cos(p("x",t,e,n))];case"Cosh":return[r.cosh(p("x",t,e,n))];case"Elu":return[r.elu(p("x",t,e,n))];case"Erf":return[r.erf(p("x",t,e,n))];case"Exp":return[r.exp(p("x",t,e,n))];case"Expm1":return[r.expm1(p("x",t,e,n))];case"Floor":return[r.floor(p("x",t,e,n))];case"Log":return[r.log(p("x",t,e,n))];case"Log1p":return[r.log1p(p("x",t,e,n))];case"Imag":return[r.imag(p("x",t,e,n))];case"Neg":return[r.neg(p("x",t,e,n))];case"Reciprocal":return[r.reciprocal(p("x",t,e,n))];case"Real":return[r.real(p("x",t,e,n))];case"Relu":return[r.relu(p("x",t,e,n))];case"Round":return[r.round(p("x",t,e,n))];case"Selu":return[r.selu(p("x",t,e,n))];case"Sigmoid":return[r.sigmoid(p("x",t,e,n))];case"Sin":return[r.sin(p("x",t,e,n))];case"Sign":return[r.sign(p("x",t,e,n))];case"Sinh":return[r.sinh(p("x",t,e,n))];case"Softplus":return[r.softplus(p("x",t,e,n))];case"Sqrt":return[r.sqrt(p("x",t,e,n))];case"Square":return[r.square(p("x",t,e,n))];case"Tanh":return[r.tanh(p("x",t,e,n))];case"Tan":return[r.tan(p("x",t,e,n))];case"ClipByValue":return[r.clipByValue(p("x",t,e,n),p("clipValueMin",t,e,n),p("clipValueMax",t,e,n))];case"Relu6":return[r.relu6(p("x",t,e,n))];case"Rsqrt":return[r.rsqrt(oe(t.inputNames[0],e,n))];case"LeakyRelu":return[r.leakyRelu(p("x",t,e,n),p("alpha",t,e,n))];case"Prelu":return[r.prelu(p("x",t,e,n),p("alpha",t,e,n))];case"IsNan":return[r.isNaN(oe(t.inputNames[0],e,n))];case"IsInf":return[r.isInf(oe(t.inputNames[0],e,n))];case"IsFinite":return[r.isFinite(oe(t.inputNames[0],e,n))];default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ke(t,e,n=""){if(!(typeof t=="number"||typeof e=="number")){g(t.length===e.length,()=>n+` Shapes ${t} and ${e} must match`);for(let r=0;r<t.length;r++){const s=t[r],a=e[r];g(s<0||a<0||s===a,()=>n+` Shapes ${t} and ${e} must match`)}}}function ro(t){return!(typeof t=="number"||t.some(e=>e<0))}function an(t,e,n){let r=ls(t,n);const s=!ro(r);if(s&&e.length===0)throw new Error(`Tried to calculate elements of an empty list with non-fully-defined elementShape: ${r}`);if(s&&e.forEach(a=>{r=ls(a.shape,r)}),!ro(r))throw new Error(`Non-fully-defined elementShape: ${r}`);return r}function ls(t,e){if(typeof t=="number")return e;if(typeof e=="number")return t;if(t.length!==e.length)throw new Error(`Incompatible ranks during merge: ${t} vs. ${e}`);const n=[];for(let r=0;r<t.length;++r){const s=t[r],a=e[r];if(s>=0&&a>=0&&s!==a)throw new Error(`Incompatible shape during merge: ${t} vs. ${e}`);n[r]=s>=0?s:a}return n}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class dT{constructor(e,n,r,s,a,o,i){this.name=e,this.dtype=n,this.maxSize=r,this.elementShape=s,this.identicalElementShapes=a,this.dynamicSize=o,this.clearAfterRead=i,this.tensors=[],this.closed_=!1,this.idTensor=z(0),De(this.idTensor)}get id(){return this.idTensor.id}get closed(){return this.closed_}clearAndClose(e){this.tensors.forEach(n=>{(e==null||!e.has(n.tensor.id))&&n.tensor.dispose()}),this.tensors=[],this.closed_=!0,this.idTensor.dispose()}size(){return this.tensors.length}read(e){if(this.closed_)throw new Error(`TensorArray ${this.name} has already been closed.`);if(e<0||e>=this.size())throw new Error(`Tried to read from index ${e}, but array size is: ${this.size()}`);const n=this.tensors[e];if(n.cleared)throw new Error(`TensorArray ${this.name}: Could not read index ${e} twice because it was cleared after a previous read (perhaps try setting clear_after_read = false?).`);return this.clearAfterRead&&(n.cleared=!0),n.read=!0,n.tensor}readMany(e){return e.map(n=>this.read(n))}write(e,n){if(this.closed_)throw new Error(`TensorArray ${this.name} has already been closed.`);if(e<0||!this.dynamicSize&&e>=this.maxSize)throw new Error(`Tried to write to index ${e}, but array is not resizeable and size is: ${this.maxSize}`);const r=this.tensors[e]||{};if(n.dtype!==this.dtype)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e},
          because the value dtype is ${n.dtype}, but TensorArray dtype is ${this.dtype}.`);if(this.size()===0&&(this.elementShape==null||this.elementShape.length===0)&&(this.elementShape=n.shape),ke(this.elementShape,n.shape,`TensorArray ${this.name}: Could not write to TensorArray index ${e}.`),r.read)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e}, because it has already been read.`);if(r.written)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${e}, because it has already been written.`);r.tensor=n,De(n),r.written=!0,this.tensors[e]=r}writeMany(e,n){if(e.length!==n.length)throw new Error(`TensorArray ${this.name}: could not write multiple tensors,because the index size: ${e.length} is not the same as tensors size: ${n.length}.`);e.forEach((r,s)=>this.write(r,n[s]))}gather(e,n){if(n&&n!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but gather requested dtype ${n}`);if(e)e=e.slice(0,this.size());else{e=[];for(let s=0;s<this.size();s++)e.push(s)}if(e.length===0)return Fe([],[0].concat(this.elementShape));const r=this.readMany(e);return ke(this.elementShape,r[0].shape,"TensorArray shape mismatch: "),We(r,0)}concat(e){if(e&&e!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but concat requested dtype ${e}`);if(this.size()===0)return Fe([],[0].concat(this.elementShape));const n=[];for(let s=0;s<this.size();s++)n.push(s);const r=this.readMany(n);return ke(this.elementShape,r[0].shape,`TensorArray shape mismatch: tensor array shape (${this.elementShape}) vs first tensor shape (${r[0].shape})`),ue(r,0)}scatter(e,n){if(n.dtype!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${n.dtype}`);if(e.length!==n.shape[0])throw new Error(`Expected len(indices) == tensor.shape[0], but saw: ${e.length} vs. ${n.shape[0]}`);const r=Math.max(...e);if(!this.dynamicSize&&r>=this.maxSize)throw new Error(`Max index must be < array size (${r}  vs. ${this.maxSize})`);this.writeMany(e,mt(n,0))}split(e,n){if(n.dtype!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${n.dtype}`);let r=0;const s=e.map(u=>(r+=u,r));if(r!==n.shape[0])throw new Error(`Expected sum of lengths to be equal to
          tensor.shape[0], but sum of lengths is
        ${r}, and tensor's shape is: ${n.shape}`);if(!this.dynamicSize&&e.length!==this.maxSize)throw new Error(`TensorArray's size is not equal to the size of lengths (${this.maxSize} vs. ${e.length}), and the TensorArray is not marked as dynamically resizeable`);const a=r===0?0:n.size/r,o=[];j(()=>{n=k(n,[1,r,a]);for(let u=0;u<e.length;++u){const h=[0,u===0?0:s[u-1],0],c=[1,e[u],a];o[u]=k(q(n,h,c),this.elementShape)}return o});const i=[];for(let u=0;u<e.length;u++)i[u]=u;this.writeMany(i,o)}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Dt{get id(){return this.idTensor.id}constructor(e,n,r,s=-1){this.tensors=e,this.elementShape=n,this.elementDtype=r,e!=null&&e.forEach(a=>{if(r!==a.dtype)throw new Error(`Invalid data types; op elements ${r}, but list elements ${a.dtype}`);ke(n,a.shape,"TensorList shape mismatch: "),De(a)}),this.idTensor=z(0),this.maxNumElements=s,De(this.idTensor)}copy(){return new Dt([...this.tensors],this.elementShape,this.elementDtype)}clearAndClose(e){this.tensors.forEach(n=>{(e==null||!e.has(n.id))&&n.dispose()}),this.tensors.length=0,this.idTensor.dispose()}size(){return this.tensors.length}stack(e,n,r=-1){if(n!==this.elementDtype)throw new Error(`Invalid data types; op elements ${n}, but list elements ${this.elementDtype}`);if(r!==-1&&this.tensors.length!==r)throw new Error(`Operation expected a list with ${r} elements but got a list with ${this.tensors.length} elements.`);ke(e,this.elementShape,"TensorList shape mismatch: ");const s=an(this.elementShape,this.tensors,e);return j(()=>{const a=this.tensors.map(o=>k(o,s));return We(a,0)})}popBack(e,n){if(n!==this.elementDtype)throw new Error(`Invalid data types; op elements ${n}, but list elements ${this.elementDtype}`);if(this.size()===0)throw new Error("Trying to pop from an empty list.");const r=an(this.elementShape,this.tensors,e),s=this.tensors.pop();return s.kept=!1,ke(s.shape,e,"TensorList shape mismatch: "),k(s,r)}pushBack(e){if(e.dtype!==this.elementDtype)throw new Error(`Invalid data types; op elements ${e.dtype}, but list elements ${this.elementDtype}`);if(ke(e.shape,this.elementShape,"TensorList shape mismatch: "),this.maxNumElements===this.size())throw new Error("Trying to push element into a full list.");De(e),this.tensors.push(e)}resize(e){if(e<0)throw new Error(`TensorListResize expects size to be non-negative. Got: ${e}`);if(this.maxNumElements!==-1&&e>this.maxNumElements)throw new Error(`TensorListResize input size ${e} is greater maxNumElement ${this.maxNumElements}.`);const n=new Dt([],this.elementShape,this.elementDtype,this.maxNumElements);n.tensors.length=e;for(let r=0;r<Math.min(this.tensors.length,e);++r)n.tensors[r]=this.tensors[r];return n}getItem(e,n,r){if(r!==this.elementDtype)throw new Error(`Invalid data types; op elements ${r}, but list elements ${this.elementDtype}`);if(e<0||e>this.tensors.length)throw new Error(`Trying to access element ${e} in a list with ${this.tensors.length} elements.`);if(this.tensors[e]==null)throw new Error(`element at index ${e} is null.`);ke(this.tensors[e].shape,n,"TensorList shape mismatch: ");const s=an(this.elementShape,this.tensors,n);return k(this.tensors[e],s)}setItem(e,n){if(n.dtype!==this.elementDtype)throw new Error(`Invalid data types; op elements ${n.dtype}, but list elements ${this.elementDtype}`);if(e<0||this.maxNumElements!==-1&&e>=this.maxNumElements)throw new Error(`Trying to set element ${e} in a list with max ${this.maxNumElements} elements.`);ke(this.elementShape,n.shape,"TensorList shape mismatch: "),De(n),this.tensors[e]!=null&&(this.tensors[e].kept=!1),this.tensors[e]=n}gather(e,n,r){if(n!==this.elementDtype)throw new Error(`Invalid data types; op elements ${n}, but list elements ${this.elementDtype}`);ke(this.elementShape,r,"TensorList shape mismatch: "),e=e.slice(0,this.size());const s=an(this.elementShape,this.tensors,r);return e.length===0?Fe([],[0].concat(s)):j(()=>{const a=e.map(o=>k(this.tensors[o],s));return We(a,0)})}concat(e,n){if(e&&e!==this.elementDtype)throw new Error(`TensorList dtype is ${this.elementDtype} but concat requested dtype ${e}`);ke(this.elementShape,n,"TensorList shape mismatch: ");const r=an(this.elementShape,this.tensors,n);return this.size()===0?Fe([],[0].concat(r)):j(()=>{const s=this.tensors.map(a=>k(a,r));return ue(s,0)})}}function gT(t,e,n){const r=t.dtype;if(t.shape.length<1)throw new Error(`Tensor must be at least a vector, but saw shape: ${t.shape}`);if(t.dtype!==n)throw new Error(`Invalid data types; op elements ${t.dtype}, but list elements ${n}`);const s=t.shape.slice(1);ke(s,e,"TensorList shape mismatch: ");const a=mt(t);return new Dt(a,e,r)}function yT(t,e,n,r){return new Dt([],t,e,r)}function bT(t,e,n,r){if(e.length!==t.shape[0])throw new Error(`Expected len(indices) == tensor.shape[0], but saw: ${e.length} vs. ${t.shape[0]}`);const s=Math.max(...e);if(r!=null&&r!==-1&&s>=r)throw new Error(`Max index must be < array size (${s}  vs. ${r})`);const a=new Dt([],n,t.dtype,r),o=mt(t,0);return e.forEach((i,u)=>{a.setItem(i,o[u])}),a}function wT(t,e,n){let r=0;const s=e.map(h=>(r+=h,r));if(r!==t.shape[0])throw new Error(`Expected sum of lengths to be equal to
          tensor.shape[0], but sum of lengths is
        ${r}, and tensor's shape is: ${t.shape}`);const a=t.shape.slice(1),o=ls(a,n),i=r===0?0:t.size/r,u=j(()=>{const h=[];t=k(t,[1,r,i]);for(let c=0;c<e.length;++c){const m=[0,c===0?0:s[c-1],0],y=[1,e[c],i];h[c]=k(q(t,m,y),o)}return t.dispose(),h}),l=new Dt([],n,t.dtype,e.length);for(let h=0;h<u.length;h++)l.setItem(h,u[h]);return l}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const NT=async(t,e,n)=>{switch(t.op){case"If":case"StatelessIf":{const r=p("thenBranch",t,e,n),s=p("elseBranch",t,e,n),a=p("cond",t,e,n),o=p("args",t,e,n);return(await a.data())[0]?n.functionMap[r].executeFunctionAsync(o,n.tensorArrayMap,n.tensorListMap):n.functionMap[s].executeFunctionAsync(o,n.tensorArrayMap,n.tensorListMap)}case"While":case"StatelessWhile":{const r=p("body",t,e,n),s=p("cond",t,e,n),a=p("args",t,e,n),o=await n.functionMap[s].executeFunctionAsync(a,n.tensorArrayMap,n.tensorListMap),i=a.map(h=>h.id);let u=await o[0].data();o.forEach(h=>{!h.kept&&i.indexOf(h.id)===-1&&h.dispose()});let l=a;for(;u[0];){const h=l;l=await n.functionMap[r].executeFunctionAsync(l,n.tensorArrayMap,n.tensorListMap);const c=l.map(m=>m.id);h.forEach(m=>{!m.kept&&i.indexOf(m.id)===-1&&c.indexOf(m.id)===-1&&m.dispose()});const f=await n.functionMap[s].executeFunctionAsync(l,n.tensorArrayMap,n.tensorListMap);u=await f[0].data(),f.forEach(m=>{!m.kept&&i.indexOf(m.id)===-1&&c.indexOf(m.id)===-1&&m.dispose()})}return l}case"LoopCond":{const r=p("pred",t,e,n);return[He(r)]}case"Switch":{const r=p("pred",t,e,n);let s=p("data",t,e,n);return s.kept||(s=He(s)),(await r.data())[0]?[void 0,s]:[s,void 0]}case"Merge":{const r=t.inputNames.find(s=>oe(s,e,n)!==void 0);if(r){const s=oe(r,e,n);return[He(s)]}return}case"Enter":{const r=p("frameName",t,e,n),s=p("tensor",t,e,n);return n.enterFrame(r),[He(s)]}case"Exit":{const r=p("tensor",t,e,n);return n.exitFrame(),[He(r)]}case"NextIteration":{const r=p("tensor",t,e,n);return n.nextIteration(),[He(r)]}case"TensorArrayV3":{const r=p("size",t,e,n),s=p("dtype",t,e,n),a=p("elementShape",t,e,n),o=p("dynamicSize",t,e,n),i=p("clearAfterRead",t,e,n),u=p("identicalElementShapes",t,e,n),l=p("name",t,e,n),h=new dT(l,s,r,a,u,o,i);return n.addTensorArray(h),[h.idTensor,z(1)]}case"TensorArrayWriteV3":{const r=p("tensorArrayId",t,e,n),s=p("index",t,e,n),a=p("tensor",t,e,n),o=n.getTensorArray(r.id);return o.write(s,a),[o.idTensor]}case"TensorArrayReadV3":{const r=p("tensorArrayId",t,e,n),s=p("index",t,e,n);return[n.getTensorArray(r.id).read(s)]}case"TensorArrayGatherV3":{const r=p("tensorArrayId",t,e,n),s=p("indices",t,e,n),a=p("dtype",t,e,n);return[n.getTensorArray(r.id).gather(s,a)]}case"TensorArrayScatterV3":{const r=p("tensorArrayId",t,e,n),s=p("indices",t,e,n),a=p("tensor",t,e,n),o=n.getTensorArray(r.id);return o.scatter(s,a),[o.idTensor]}case"TensorArrayConcatV3":{const r=p("tensorArrayId",t,e,n),s=n.getTensorArray(r.id),a=p("dtype",t,e,n);return[s.concat(a)]}case"TensorArraySplitV3":{const r=p("tensorArrayId",t,e,n),s=p("tensor",t,e,n),a=p("lengths",t,e,n),o=n.getTensorArray(r.id);return o.split(a,s),[o.idTensor]}case"TensorArraySizeV3":{const r=p("tensorArrayId",t,e,n),s=n.getTensorArray(r.id);return[z(s.size(),"int32")]}case"TensorArrayCloseV3":{const r=p("tensorArrayId",t,e,n),s=n.getTensorArray(r.id);return s.clearAndClose(),[s.idTensor]}case"TensorListSetItem":{const r=p("tensorListId",t,e,n),s=p("index",t,e,n),a=p("tensor",t,e,n),o=n.getTensorList(r.id);return o.setItem(s,a),[o.idTensor]}case"TensorListGetItem":{const r=p("tensorListId",t,e,n),s=p("index",t,e,n),a=p("elementShape",t,e,n),o=p("elementDType",t,e,n);return[n.getTensorList(r.id).getItem(s,a,o)]}case"TensorListScatterV2":case"TensorListScatter":{const r=p("indices",t,e,n),s=p("tensor",t,e,n),a=p("elementShape",t,e,n),o=p("numElements",t,e,n),i=bT(s,r,a,o);return n.addTensorList(i),[i.idTensor]}case"TensorListReserve":case"EmptyTensorList":{const r=p("elementShape",t,e,n),s=p("elementDType",t,e,n);let a;t.op==="TensorListReserve"?a="numElements":a="maxNumElements";const o=p(a,t,e,n),i=t.op==="TensorListReserve"?-1:o,u=yT(r,s,o,i);return n.addTensorList(u),[u.idTensor]}case"TensorListGather":{const r=p("tensorListId",t,e,n),s=p("indices",t,e,n),a=p("elementShape",t,e,n),o=p("elementDType",t,e,n);return[n.getTensorList(r.id).gather(s,o,a)]}case"TensorListStack":{const r=p("tensorListId",t,e,n),s=p("elementShape",t,e,n),a=p("elementDType",t,e,n),o=p("numElements",t,e,n);return[n.getTensorList(r.id).stack(s,a,o)]}case"TensorListFromTensor":{const r=p("tensor",t,e,n),s=p("elementShape",t,e,n),a=p("elementDType",t,e,n),o=gT(r,s,a);return n.addTensorList(o),[o.idTensor]}case"TensorListConcat":case"TensorListConcatV2":{const r=p("tensorListId",t,e,n),s=n.getTensorList(r.id),a=p("dtype",t,e,n),o=p("elementShape",t,e,n);return[s.concat(a,o)]}case"TensorListPushBack":{const r=p("tensorListId",t,e,n),s=p("tensor",t,e,n),a=n.getTensorList(r.id);return a.pushBack(s),[a.idTensor]}case"TensorListPopBack":{const r=p("tensorListId",t,e,n),s=p("elementShape",t,e,n),a=p("elementDType",t,e,n);return[n.getTensorList(r.id).popBack(s,a)]}case"TensorListSplit":{const r=p("tensor",t,e,n),s=p("elementShape",t,e,n),a=p("lengths",t,e,n),o=wT(r,a,s);return n.addTensorList(o),[o.idTensor]}case"TensorListLength":{const r=p("tensorListId",t,e,n),s=n.getTensorList(r.id);return[z(s.size(),"int32")]}case"TensorListResize":{const r=p("tensorListId",t,e,n),s=p("size",t,e,n),o=n.getTensorList(r.id).resize(s);return n.addTensorList(o),[o.idTensor]}default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function so(t,e,n){const[r,s]=p("fusedOps",t,e,n),a=r==="biasadd",o=!a,i=s==="prelu",u=r==="fusedbatchnorm",l=p("numArgs",t,e,n);if(a){if(i&&l!==2)throw new Error("FusedConv2d and DepthwiseConv2d with BiasAdd and Prelu must have two extra arguments: bias and alpha.");if(!i&&a&&l!==1)throw new Error("FusedConv2d and DepthwiseConv2d with BiasAdd must have one extra argument: bias.")}if(u)throw new Error("FusedConv2d and DepthwiseConv2d with FusedBatchNorm is not supported");const h=p("strides",t,e,n),c=Un(t,e,n),f=p("dataFormat",t,e,n).toUpperCase(),m=p("dilations",t,e,n);let[y,S]=p("args",t,e,n);o&&(S=y,y=void 0);const b=p("leakyreluAlpha",t,e,n);return{stride:h,pad:c,dataFormat:f,dilations:m,biasArg:y,preluArg:S,activationFunc:s,leakyreluAlpha:b}}const ST=(t,e,n,r=ie)=>{switch(t.op){case"Conv1D":{const s=p("stride",t,e,n),a=p("pad",t,e,n),o=p("dataFormat",t,e,n).toUpperCase(),i=p("dilation",t,e,n);return[r.conv1d(p("x",t,e,n),p("filter",t,e,n),s,a,o,i)]}case"Conv2D":{const s=p("strides",t,e,n),a=Un(t,e,n),o=p("dataFormat",t,e,n).toUpperCase(),i=p("dilations",t,e,n);return[r.conv2d(p("x",t,e,n),p("filter",t,e,n),[s[1],s[2]],a,o,[i[1],i[2]])]}case"_FusedConv2D":{const{stride:s,pad:a,dataFormat:o,dilations:i,biasArg:u,preluArg:l,activationFunc:h,leakyreluAlpha:c}=so(t,e,n);return[r.fused.conv2d({x:p("x",t,e,n),filter:p("filter",t,e,n),strides:[s[1],s[2]],pad:a,dataFormat:o,dilations:[i[1],i[2]],bias:u,activation:h,preluActivationWeights:l,leakyreluAlpha:c})]}case"FusedDepthwiseConv2dNative":{const{stride:s,pad:a,dataFormat:o,dilations:i,biasArg:u,preluArg:l,activationFunc:h,leakyreluAlpha:c}=so(t,e,n);return[r.fused.depthwiseConv2d({x:p("x",t,e,n),filter:p("filter",t,e,n),strides:[s[1],s[2]],pad:a,dataFormat:o,dilations:[i[1],i[2]],bias:u,activation:h,preluActivationWeights:l,leakyreluAlpha:c})]}case"Conv2DBackpropInput":case"Conv2dTranspose":{const s=p("outputShape",t,e,n),a=p("strides",t,e,n),o=Un(t,e,n);return[r.conv2dTranspose(p("x",t,e,n),p("filter",t,e,n),s,[a[1],a[2]],o)]}case"DepthwiseConv2dNative":case"DepthwiseConv2d":{const s=p("strides",t,e,n),a=Un(t,e,n),o=p("dilations",t,e,n),i=p("dataFormat",t,e,n).toUpperCase();return[r.depthwiseConv2d(p("input",t,e,n),p("filter",t,e,n),[s[1],s[2]],a,i,[o[1],o[2]])]}case"Conv3D":{const s=p("strides",t,e,n),a=p("pad",t,e,n),o=p("dataFormat",t,e,n).toUpperCase(),i=p("dilations",t,e,n);return[r.conv3d(p("x",t,e,n),p("filter",t,e,n),[s[1],s[2],s[3]],a,o,[i[1],i[2],i[3]])]}case"AvgPool":{const s=p("strides",t,e,n),a=p("pad",t,e,n),o=p("kernelSize",t,e,n);return[r.avgPool(p("x",t,e,n),[o[1],o[2]],[s[1],s[2]],a)]}case"MaxPool":{const s=p("strides",t,e,n),a=p("pad",t,e,n),o=p("kernelSize",t,e,n);return[r.maxPool(p("x",t,e,n),[o[1],o[2]],[s[1],s[2]],a)]}case"MaxPoolWithArgmax":{const s=p("strides",t,e,n),a=p("pad",t,e,n),o=p("kernelSize",t,e,n),i=p("includeBatchInIndex",t,e,n),{result:u,indexes:l}=r.maxPoolWithArgmax(p("x",t,e,n),[o[1],o[2]],[s[1],s[2]],a,i);return[u,l]}case"AvgPool3D":{const s=p("strides",t,e,n),a=p("pad",t,e,n),o=p("kernelSize",t,e,n);return[r.avgPool3d(p("x",t,e,n),[o[1],o[2],o[3]],[s[1],s[2],s[3]],a)]}case"MaxPool3D":{const s=p("strides",t,e,n),a=p("pad",t,e,n),o=p("kernelSize",t,e,n);return[r.maxPool3d(p("x",t,e,n),[o[1],o[2],o[3]],[s[1],s[2],s[3]],a)]}case"Dilation2D":{const s=p("strides",t,e,n),a=p("pad",t,e,n),o=p("dilations",t,e,n),i=s[1],u=s[2],l=o[1],h=o[2];return[r.dilation2d(p("x",t,e,n),p("filter",t,e,n),[i,u],a,[l,h],"NHWC")]}default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const TT=(t,e,n,r=ie)=>{switch(t.op){case"Fill":{const s=p("shape",t,e,n),a=p("dtype",t,e,n),o=p("value",t,e,n);return[r.fill(s,o,a)]}case"LinSpace":{const s=p("start",t,e,n),a=p("stop",t,e,n),o=p("num",t,e,n);return[r.linspace(s,a,o)]}case"Multinomial":{const s=p("logits",t,e,n),a=p("numSamples",t,e,n),o=p("seed",t,e,n);return[r.multinomial(s,a,o)]}case"OneHot":{const s=p("indices",t,e,n),a=p("depth",t,e,n),o=p("onValue",t,e,n),i=p("offValue",t,e,n),u=p("dtype",t,e,n);return[r.oneHot(s,a,o,i,u)]}case"Ones":return[r.ones(p("shape",t,e,n),p("dtype",t,e,n))];case"OnesLike":return[r.onesLike(p("x",t,e,n))];case"RandomStandardNormal":return[r.randomStandardNormal(p("shape",t,e,n),p("dtype",t,e,n),p("seed",t,e,n))];case"RandomUniform":return[r.randomUniform(p("shape",t,e,n),p("minval",t,e,n),p("maxval",t,e,n),p("dtype",t,e,n))];case"RandomUniformInt":return[r.randomUniformInt(p("shape",t,e,n),p("minval",t,e,n),p("maxval",t,e,n),p("seed",t,e,n))];case"Range":{const s=p("start",t,e,n),a=p("stop",t,e,n),o=p("step",t,e,n);return[r.range(s,a,o,p("dtype",t,e,n))]}case"TruncatedNormal":{const s=p("shape",t,e,n),a=p("mean",t,e,n),o=p("stdDev",t,e,n),i=p("seed",t,e,n);return[r.truncatedNormal(s,a,o,p("dtype",t,e,n),i)]}case"Zeros":return[r.zeros(p("shape",t,e,n),p("dtype",t,e,n))];case"ZerosLike":return[r.zerosLike(p("x",t,e,n))];default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ar(t,e,n){const r=p("boxes",t,e,n),s=p("scores",t,e,n),a=p("maxOutputSize",t,e,n),o=p("iouThreshold",t,e,n),i=p("scoreThreshold",t,e,n),u=p("softNmsSigma",t,e,n);return{boxes:r,scores:s,maxOutputSize:a,iouThreshold:o,scoreThreshold:i,softNmsSigma:u}}const $T=async(t,e,n,r,s=ie)=>{switch(t.op){case"NonMaxSuppressionV5":{const{boxes:a,scores:o,maxOutputSize:i,iouThreshold:u,scoreThreshold:l,softNmsSigma:h}=Ar(t,e,n),c=await s.image.nonMaxSuppressionWithScoreAsync(a,o,i,u,l,h);return[c.selectedIndices,c.selectedScores]}case"NonMaxSuppressionV4":{const{boxes:a,scores:o,maxOutputSize:i,iouThreshold:u,scoreThreshold:l}=Ar(t,e,n),h=p("padToMaxOutputSize",t,e,n),c=await s.image.nonMaxSuppressionPaddedAsync(a,o,i,u,l,h);return[c.selectedIndices,c.validOutputs]}case"NonMaxSuppressionV3":case"NonMaxSuppressionV2":{const{boxes:a,scores:o,maxOutputSize:i,iouThreshold:u,scoreThreshold:l}=Ar(t,e,n);return[await s.image.nonMaxSuppressionAsync(a,o,i,u,l)]}case"Where":{const a=s.cast(p("condition",t,e,n),"bool"),o=[await s.whereAsync(a)];return a.dispose(),o}case"ListDiff":return s.setdiff1dAsync(p("x",t,e,n),p("y",t,e,n));default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ET=(t,e,n,r=ie)=>{switch(t.op){case"LowerBound":{const s=p("sortedSequence",t,e,n),a=p("values",t,e,n);return[r.lowerBound(s,a)]}case"TopKV2":{const s=p("x",t,e,n),a=p("k",t,e,n),o=p("sorted",t,e,n),i=r.topk(s,a,o);return[i.values,i.indices]}case"UpperBound":{const s=p("sortedSequence",t,e,n),a=p("values",t,e,n);return[r.upperBound(s,a)]}case"Unique":{const s=p("x",t,e,n),a=r.unique(s);return[a.values,a.indices]}case"UniqueV2":{const s=p("x",t,e,n),a=p("axis",t,e,n),o=r.unique(s,a);return[o.values,o.indices]}default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const kT=(t,e,n,r=ie)=>{switch(t.op){case"Const":return e[t.name];case"PlaceholderWithDefault":const s=p("default",t,e,n);return[oe(t.name,e,n)||s];case"Placeholder":return[oe(t.name,e,n)];case"Identity":case"StopGradient":case"FakeQuantWithMinMaxVars":{const h=p("x",t,e,n);return[He(h)]}case"IdentityN":return p("x",t,e,n).map(h=>He(h));case"Snapshot":const a=p("x",t,e,n);return[He(a)];case"Shape":return[r.tensor1d(p("x",t,e,n).shape,"int32")];case"ShapeN":return p("x",t,e,n).map(h=>r.tensor1d(h.shape));case"Size":return[r.scalar(p("x",t,e,n).size,"int32")];case"Rank":return[r.scalar(p("x",t,e,n).rank,"int32")];case"NoOp":return[r.scalar(1)];case"Print":const o=p("x",t,e,n),i=p("data",t,e,n),u=p("message",t,e,n),l=p("summarize",t,e,n);console.warn("The graph has a tf.print() operation,usually used for debugging, which slows down performance."),console.log(u);for(let h=0;h<i.length;h++)console.log(Array.prototype.slice.call(i[h].dataSync()).slice(0,l));return[o];default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class _T{get id(){return this.handle.id}constructor(e,n){this.keyDType=e,this.valueDType=n,this.handle=z(0),this.tensorMap=new Map,De(this.handle)}clearAndClose(){this.tensorMap.forEach(e=>e.dispose()),this.tensorMap.clear(),this.handle.dispose()}size(){return this.tensorMap.size}tensorSize(){return z(this.size(),"int32")}async import(e,n){this.checkKeyAndValueTensor(e,n);const r=await e.data();return this.tensorMap.forEach(s=>s.dispose()),this.tensorMap.clear(),j(()=>{const s=mt(n),a=r.length,o=s.length;g(a===o,()=>`The number of elements doesn't match, keys has ${a} elements, the values has ${o} elements.`);for(let i=0;i<a;i++){const u=r[i],l=s[i];De(l),this.tensorMap.set(u,l)}return this.handle})}async find(e,n){this.checkKeyAndValueTensor(e,n);const r=await e.data();return j(()=>{const s=[];for(let a=0;a<r.length;a++){const o=r[a],i=this.findWithDefault(o,n);s.push(i)}return We(s)})}findWithDefault(e,n){const r=this.tensorMap.get(e);return r??n}checkKeyAndValueTensor(e,n){if(e.dtype!==this.keyDType)throw new Error(`Expect key dtype ${this.keyDType}, but got ${e.dtype}`);if(n.dtype!==this.valueDType)throw new Error(`Expect value dtype ${this.valueDType}, but got ${n.dtype}`)}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const vT=async(t,e,n,r)=>{switch(t.op){case"HashTable":case"HashTableV2":{const s=r.getHashTableHandleByName(t.name);if(s!=null)return[s];{const a=p("keyDType",t,e,n),o=p("valueDType",t,e,n),i=new _T(a,o);return r.addHashTable(t.name,i),[i.handle]}}case"InitializeTable":case"InitializeTableV2":case"LookupTableImport":case"LookupTableImportV2":{const s=p("tableHandle",t,e,n,r),a=p("keys",t,e,n),o=p("values",t,e,n);return[await r.getHashTableById(s.id).import(a,o)]}case"LookupTableFind":case"LookupTableFindV2":{const s=p("tableHandle",t,e,n,r),a=p("keys",t,e,n),o=p("defaultValue",t,e,n);return[await r.getHashTableById(s.id).find(a,o)]}case"LookupTableSize":case"LookupTableSizeV2":{const s=p("tableHandle",t,e,n,r);return[r.getHashTableById(s.id).tensorSize()]}default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const IT=(t,e,n,r=ie)=>{switch(t.op){case"ResizeBilinear":{const s=p("images",t,e,n),a=p("size",t,e,n),o=p("alignCorners",t,e,n),i=p("halfPixelCenters",t,e,n);return[r.image.resizeBilinear(s,[a[0],a[1]],o,i)]}case"ResizeNearestNeighbor":{const s=p("images",t,e,n),a=p("size",t,e,n),o=p("alignCorners",t,e,n),i=p("halfPixelCenters",t,e,n);return[r.image.resizeNearestNeighbor(s,[a[0],a[1]],o,i)]}case"CropAndResize":{const s=p("image",t,e,n),a=p("boxes",t,e,n),o=p("boxInd",t,e,n),i=p("cropSize",t,e,n),u=p("method",t,e,n),l=p("extrapolationValue",t,e,n);return[r.image.cropAndResize(s,a,o,i,u,l)]}case"ImageProjectiveTransformV3":{const s=p("images",t,e,n),a=p("transforms",t,e,n),o=p("outputShape",t,e,n),i=p("fillValue",t,e,n),u=p("interpolation",t,e,n),l=p("fillMode",t,e,n);return[r.image.transform(s,a,u.toLowerCase(),l.toLowerCase(),i,o)]}default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const xT=(t,e,n,r=ie)=>{switch(t.op){case"Equal":return[r.equal(p("a",t,e,n),p("b",t,e,n))];case"NotEqual":return[r.notEqual(p("a",t,e,n),p("b",t,e,n))];case"Greater":return[r.greater(p("a",t,e,n),p("b",t,e,n))];case"GreaterEqual":return[r.greaterEqual(p("a",t,e,n),p("b",t,e,n))];case"Less":return[r.less(p("a",t,e,n),p("b",t,e,n))];case"LessEqual":return[r.lessEqual(p("a",t,e,n),p("b",t,e,n))];case"LogicalAnd":return[r.logicalAnd(p("a",t,e,n),p("b",t,e,n))];case"LogicalNot":return[r.logicalNot(p("a",t,e,n))];case"LogicalOr":return[r.logicalOr(p("a",t,e,n),p("b",t,e,n))];case"Select":case"SelectV2":return[r.where(p("condition",t,e,n),p("a",t,e,n),p("b",t,e,n))];case"BitwiseAnd":return[r.bitwiseAnd(p("a",t,e,n),p("b",t,e,n))];default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const AT=(t,e,n,r=ie)=>{switch(t.op){case"BatchMatMul":case"BatchMatMulV2":case"MatMul":return[r.matMul(p("a",t,e,n),p("b",t,e,n),p("transposeA",t,e,n),p("transposeB",t,e,n))];case"Einsum":return[r.einsum(p("equation",t,e,n),...p("tensors",t,e,n))];case"Transpose":return[r.transpose(p("x",t,e,n),p("perm",t,e,n))];case"_FusedMatMul":const[s,a]=p("fusedOps",t,e,n),o=s==="biasadd",i=a==="prelu",u=p("numArgs",t,e,n),l=p("leakyreluAlpha",t,e,n);if(o){if(i&&u!==2)throw new Error("Fused MatMul with BiasAdd and Prelu must have two extra arguments: bias and alpha.");if(!i&&u!==1)throw new Error("Fused MatMul with BiasAdd must have one extra argument: bias.")}const[h,c]=p("args",t,e,n);return[r.fused.matMul({a:p("a",t,e,n),b:p("b",t,e,n),transposeA:p("transposeA",t,e,n),transposeB:p("transposeB",t,e,n),bias:h,activation:a,preluActivationWeights:c,leakyreluAlpha:l})];case"MatrixBandPart":return[r.linalg.bandPart(p("a",t,e,n),p("numLower",t,e,n),p("numUpper",t,e,n))];default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const OT=(t,e,n,r=ie)=>{switch(t.op){case"EuclideanNorm":return[r.euclideanNorm(p("x",t,e,n),p("axis",t,e,n),p("keepDims",t,e,n))];case"FusedBatchNorm":case"FusedBatchNormV2":return[r.batchNorm(p("x",t,e,n),p("mean",t,e,n),p("variance",t,e,n),p("offset",t,e,n),p("scale",t,e,n),p("epsilon",t,e,n))];case"FusedBatchNormV3":return[r.batchNorm(p("x",t,e,n),p("mean",t,e,n),p("variance",t,e,n),p("offset",t,e,n),p("scale",t,e,n),p("epsilon",t,e,n))];case"LRN":return[r.localResponseNormalization(p("x",t,e,n),p("radius",t,e,n),p("bias",t,e,n),p("alpha",t,e,n),p("beta",t,e,n))];case"Softmax":return[r.softmax(p("x",t,e,n))];case"LogSoftmax":return[r.logSoftmax(p("x",t,e,n))];default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const DT=(t,e,n,r=ie)=>{switch(t.op){case"RaggedGather":{const{outputNestedSplits:s,outputDenseValues:a}=r.raggedGather(p("paramsNestedSplits",t,e,n),p("paramsDenseValues",t,e,n),p("indices",t,e,n),p("outputRaggedRank",t,e,n));return s.concat(a)}case"RaggedRange":{const{rtNestedSplits:s,rtDenseValues:a}=r.raggedRange(p("starts",t,e,n),p("limits",t,e,n),p("splits",t,e,n));return[s,a]}case"RaggedTensorToTensor":return[r.raggedTensorToTensor(p("shape",t,e,n),p("values",t,e,n),p("defaultValue",t,e,n),p("rowPartitionTensors",t,e,n),p("rowPartitionTypes",t,e,n))];default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const FT=(t,e,n,r=ie)=>{switch(t.op){case"Max":{const i=p("axis",t,e,n),u=p("keepDims",t,e,n);return[r.max(p("x",t,e,n),i,u)]}case"Mean":{const i=p("axis",t,e,n),u=p("keepDims",t,e,n);return[r.mean(p("x",t,e,n),i,u)]}case"Min":{const i=p("axis",t,e,n),u=p("keepDims",t,e,n);return[r.min(p("x",t,e,n),i,u)]}case"Sum":{const i=p("axis",t,e,n),u=p("keepDims",t,e,n);return[r.sum(p("x",t,e,n),i,u)]}case"All":{const i=p("axis",t,e,n),u=p("keepDims",t,e,n);return[r.all(p("x",t,e,n),i,u)]}case"Any":{const i=p("axis",t,e,n),u=p("keepDims",t,e,n);return[r.any(p("x",t,e,n),i,u)]}case"ArgMax":{const i=p("axis",t,e,n);return[r.argMax(p("x",t,e,n),i)]}case"ArgMin":{const i=p("axis",t,e,n);return[r.argMin(p("x",t,e,n),i)]}case"Prod":{const i=p("axis",t,e,n),u=p("keepDims",t,e,n);return[r.prod(p("x",t,e,n),i,u)]}case"Cumprod":{const i=p("axis",t,e,n),u=p("exclusive",t,e,n),l=p("reverse",t,e,n);return[r.cumprod(p("x",t,e,n),i,u,l)]}case"Cumsum":{const i=p("axis",t,e,n),u=p("exclusive",t,e,n),l=p("reverse",t,e,n);return[r.cumsum(p("x",t,e,n),i,u,l)]}case"Bincount":const s=p("x",t,e,n),a=p("weights",t,e,n),o=p("size",t,e,n);return[r.bincount(s,a,o)];case"DenseBincount":{const i=p("x",t,e,n),u=p("weights",t,e,n),l=p("size",t,e,n),h=p("binaryOutput",t,e,n);return[r.denseBincount(i,u,l,h)]}default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const CT=(t,e,n,r=ie)=>{switch(t.op){case"ConcatV2":case"Concat":{const s=p("n",t,e,n),a=p("axis",t,e,n);let o=p("tensors",t,e,n);return o=o.slice(0,s),[r.concat(o,a)]}case"Gather":{const s=p("x",t,e,n),a=p("indices",t,e,n);return[r.gather(s,r.cast(a,"int32"),0)]}case"GatherV2":{const s=p("axis",t,e,n),a=p("batchDims",t,e,n),o=p("x",t,e,n),i=p("indices",t,e,n);return[r.gather(o,r.cast(i,"int32"),s,a)]}case"Reverse":{const s=p("dims",t,e,n),a=[];for(let i=0;i<s.length;i++)s[i]&&a.push(i);const o=p("x",t,e,n);return[r.reverse(o,a)]}case"ReverseV2":{const s=p("axis",t,e,n),a=p("x",t,e,n);return[r.reverse(a,s)]}case"Slice":{const s=p("begin",t,e,n),a=p("size",t,e,n);return[r.slice(p("x",t,e,n),s,a)]}case"StridedSlice":{const s=p("begin",t,e,n),a=p("end",t,e,n),o=p("strides",t,e,n),i=p("beginMask",t,e,n),u=p("endMask",t,e,n),l=p("ellipsisMask",t,e,n),h=p("newAxisMask",t,e,n),c=p("shrinkAxisMask",t,e,n),f=p("x",t,e,n);return[r.stridedSlice(f,s,a,o,i,u,l,h,c)]}case"Pack":return j(()=>{const s=p("axis",t,e,n),a=p("tensors",t,e,n),o=a[0].shape,i=r.squeeze(a[0]).shape,u=a.map(l=>{const h=Re(l.shape,o);if(!h&&!Re(r.squeeze(l).shape,i))throw new Error("the input tensors shape does not match");return h?l:r.reshape(l,o)});return[r.stack(u,s)]});case"Unpack":{const s=p("axis",t,e,n),a=p("tensor",t,e,n);return r.unstack(a,s)}case"Tile":{const s=p("reps",t,e,n);return[r.tile(p("x",t,e,n),s)]}case"Split":case"SplitV":{const s=p("axis",t,e,n),a=p("numOrSizeSplits",t,e,n),o=p("x",t,e,n);return r.split(o,a,s)}case"ScatterNd":{const s=p("indices",t,e,n),a=p("values",t,e,n),o=p("shape",t,e,n);return[r.scatterND(s,a,o)]}case"GatherNd":{const s=p("x",t,e,n),a=p("indices",t,e,n);return[r.gatherND(s,a)]}case"SparseToDense":{const s=p("sparseIndices",t,e,n),a=p("outputShape",t,e,n),o=p("sparseValues",t,e,n),i=p("defaultValue",t,e,n);return[r.sparseToDense(s,o,a,o.dtype===i.dtype?i:r.cast(i,o.dtype))]}case"TensorScatterUpdate":{const s=p("indices",t,e,n),a=p("values",t,e,n),o=p("tensor",t,e,n);return[r.tensorScatterUpdate(o,s,a)]}default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const RT=(t,e,n,r=ie)=>{switch(t.op){case"SparseFillEmptyRows":{const{outputIndices:s,outputValues:a,emptyRowIndicator:o,reverseIndexMap:i}=r.sparse.sparseFillEmptyRows(p("indices",t,e,n),p("values",t,e,n),p("denseShape",t,e,n),p("defaultValue",t,e,n));return[s,a,o,i]}case"SparseReshape":{const{outputIndices:s,outputShape:a}=r.sparse.sparseReshape(p("inputIndices",t,e,n),p("inputShape",t,e,n),p("newShape",t,e,n));return[s,a]}case"SparseSegmentMean":return[r.sparse.sparseSegmentMean(p("data",t,e,n),p("indices",t,e,n),p("segmentIds",t,e,n))];case"SparseSegmentSum":return[r.sparse.sparseSegmentSum(p("data",t,e,n),p("indices",t,e,n),p("segmentIds",t,e,n))];default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const PT=(t,e,n,r=ie)=>{switch(t.op){case"FFT":return[r.fft(p("x",t,e,n))];case"IFFT":return[r.ifft(p("x",t,e,n))];case"RFFT":return[r.rfft(p("x",t,e,n))];case"IRFFT":return[r.irfft(p("x",t,e,n))];default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const BT=(t,e,n,r=ie)=>{switch(t.op){case"StaticRegexReplace":return[r.string.staticRegexReplace(p("input",t,e,n),p("pattern",t,e,n),p("rewrite",t,e,n),p("replaceGlobal",t,e,n))];case"StringNGrams":{const{nGrams:s,nGramsSplits:a}=r.string.stringNGrams(p("data",t,e,n),p("dataSplits",t,e,n),p("separator",t,e,n),p("nGramWidths",t,e,n),p("leftPad",t,e,n),p("rightPad",t,e,n),p("padWidth",t,e,n),p("preserveShortSequences",t,e,n));return[s,a]}case"StringSplit":{const{indices:s,values:a,shape:o}=r.string.stringSplit(p("input",t,e,n),p("delimiter",t,e,n),p("skipEmpty",t,e,n));return[s,a,o]}case"StringToHashBucketFast":return[r.string.stringToHashBucketFast(p("input",t,e,n),p("numBuckets",t,e,n))];default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const LT=(t,e,n,r=ie)=>{switch(t.op){case"Cast":return[r.cast(p("x",t,e,n),p("dtype",t,e,n))];case"ExpandDims":{const s=p("axis",t,e,n);return[r.expandDims(p("x",t,e,n),s)]}case"Squeeze":{const s=p("axis",t,e,n);return[r.squeeze(p("x",t,e,n),s)]}case"Reshape":return[r.reshape(p("x",t,e,n),p("shape",t,e,n))];case"EnsureShape":return[r.ensureShape(p("x",t,e,n),p("shape",t,e,n))];case"MirrorPad":return[r.mirrorPad(p("x",t,e,n),p("padding",t,e,n),p("mode",t,e,n))];case"PadV2":case"Pad":return[r.pad(p("x",t,e,n),p("padding",t,e,n),p("constantValue",t,e,n))];case"SpaceToBatchND":{const s=p("blockShape",t,e,n),a=p("paddings",t,e,n);return[r.spaceToBatchND(p("x",t,e,n),s,a)]}case"BatchToSpaceND":{const s=p("blockShape",t,e,n),a=p("crops",t,e,n);return[r.batchToSpaceND(p("x",t,e,n),s,a)]}case"DepthToSpace":{const s=p("blockSize",t,e,n),a=p("dataFormat",t,e,n).toUpperCase();return[r.depthToSpace(p("x",t,e,n),s,a)]}case"BroadcastTo":return[r.broadcastTo(p("x",t,e,n),p("shape",t,e,n))];case"BroadcastArgs":return[r.broadcastArgs(p("s0",t,e,n),p("s1",t,e,n))];default:throw TypeError(`Node type ${t.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ao(t,e,n,r,s=j){const a=((o,i,u)=>{switch(o.category){case"arithmetic":return s(()=>fT(o,i,u));case"basic_math":return s(()=>mT(o,i,u));case"control":return NT(o,i,u);case"convolution":return s(()=>ST(o,i,u));case"creation":return s(()=>TT(o,i,u));case"dynamic":return $T(o,i,u);case"evaluation":return s(()=>ET(o,i,u));case"image":return s(()=>IT(o,i,u));case"graph":return s(()=>kT(o,i,u));case"logical":return s(()=>xT(o,i,u));case"matrices":return s(()=>AT(o,i,u));case"normalization":return s(()=>OT(o,i,u));case"ragged":return s(()=>DT(o,i,u));case"reduction":return s(()=>FT(o,i,u));case"slice_join":return s(()=>CT(o,i,u));case"sparse":return s(()=>RT(o,i,u));case"spectral":return s(()=>PT(o,i,u));case"string":return s(()=>BT(o,i,u));case"transformation":return s(()=>LT(o,i,u));case"hash_table":return vT(o,i,u,r);case"custom":const l=zp(o.op);if(l&&l.customExecutor)return l.customExecutor(new pT(o,i,u));throw TypeError(`Custom op ${o.op} is not registered.`);default:throw TypeError(`Unknown op '${o.op}'. File an issue at https://github.com/tensorflow/tfjs/issues so we can add it, or register a custom execution with tf.registerOp()`)}})(t,e,n);return it(a)?a.then(o=>[].concat(o)):[].concat(a)}class oo{constructor(e={},n={},r={},s={},a){this.weightMap=e,this.tensorArrayMap=n,this.tensorListMap=r,this.functionMap=s,this.parseNodeNameCache=a,this.rootContext={id:0,frameName:"",iterationId:0},this.contexts=[this.rootContext],this.lastId=0,this.generateCurrentContextIds()}newFrame(e,n){return{id:e,frameName:n,iterationId:0}}set currentContext(e){this.contexts!==e&&(this.contexts=e,this.generateCurrentContextIds())}get currentContext(){return this.contexts}get currentContextId(){return this._currentContextIds[0]}get currentContextIds(){return this._currentContextIds}generateCurrentContextIds(){const e=[];for(let n=0;n<this.contexts.length-1;n++){const r=this.contexts.slice(0,this.contexts.length-n);e.push(this.contextIdforContexts(r))}e.push(""),this._currentContextIds=e}contextIdforContexts(e){return e?e.map(n=>n.id===0&&n.iterationId===0?"":`${n.frameName}-${n.iterationId}`).join("/"):""}enterFrame(e){this.contexts&&(this.lastId++,this.contexts=this.contexts.slice(),this.contexts.push(this.newFrame(this.lastId,e)),this._currentContextIds.unshift(this.contextIdforContexts(this.contexts)))}exitFrame(){if(this.contexts&&this.contexts.length>1)this.contexts=this.contexts.slice(),this.contexts.splice(-1),this.currentContextIds.shift();else throw new Error("Cannot exit frame, the context is empty")}nextIteration(){if(this.contexts&&this.contexts.length>0){this.contexts=this.contexts.slice(),this.lastId++;const e=Object.assign({},this.contexts[this.contexts.length-1]);e.iterationId+=1,e.id=this.lastId,this.contexts.splice(-1,1,e),this._currentContextIds.splice(0,1,this.contextIdforContexts(this.contexts))}else throw new Error("Cannot increase frame iteration, the context is empty")}getWeight(e){return this.weightMap[e]}addTensorArray(e){this.tensorArrayMap[e.id]=e}getTensorArray(e){return this.tensorArrayMap[e]}addTensorList(e){this.tensorListMap[e.id]=e}getTensorList(e){return this.tensorListMap[e]}dispose(e){for(const n in this.tensorArrayMap)this.tensorArrayMap[n].clearAndClose(e);for(const n in this.tensorListMap)this.tensorListMap[n].clearAndClose(e)}}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function io(t,e,n,r){const s=new Set,a=[];let o=null,i=null;const u=new Set,l=new Set(Object.keys(t).map(f=>ye(f)[0]));r=r||[];const h=new Set(r.map(f=>ye(f.name)[0])),c=[...e];for(;c.length>0;){const f=c.pop();if((Nt(f)||GT(f)||HT(f))&&o==null&&(o=f,i=o.children.map(m=>m.name).filter(m=>s.has(m))),s.add(f.name),n[f.name]==null&&!l.has(f.name)&&!h.has(f.name)){if(f.inputs.length===0){a.push(f.name);continue}f.inputs.forEach(m=>{u.has(m.name)||(u.add(m.name),c.push(m))})}}return{inputs:t,outputs:e,usedNodes:s,missingInputs:a,dynamicNode:o,syncInputs:i}}function zT(t,e){const{usedNodes:n,inputs:r}=e,s=Object.keys(r).map(b=>ye(b)[0]).map(b=>t.nodes[b]),a=t.initNodes||[],o=b=>n.has(typeof b=="string"?b:b.name);function i(b){return[...new Map(b.map(T=>[T.name,T])).values()]}const u=i([...s,...t.weights,...a]).filter(o),l=i([...u,...Object.values(t.nodes)]).filter(o),h=new Map(l.map(b=>[b.name,b])),c={};for(const b of l){c[b.name]=c[b.name]||0;for(const T of b.children)o(T)||(c[T.name]=Number.POSITIVE_INFINITY),c[T.name]=(c[T.name]||0)+1}const f=Object.entries(c).filter(([,b])=>b===0).map(([b])=>b),m=[...f];for(;f.length>0;){const b=f.pop(),T=h.get(b);for(const A of T.children.filter(o))--c[A.name]===0&&(m.push(A.name),f.push(A.name))}const y=m.map(b=>h.get(b)),S=VT(y,u);return jT(S,u),S}function VT(t,e){const n=new Map(t.map(o=>[o.name,o])),r=e.map(o=>o.name),s=new Set(r);for(;r.length>0;){const o=r.pop(),i=n.get(o);for(const u of i.children)!n.has(u.name)||s.has(u.name)||(s.add(u.name),r.push(u.name))}return t.filter(o=>s.has(o.name))}class Vn extends Error{constructor(e){super(`NodesExecutionOrderError: ${e}`)}}function jT(t,e){const n=new Map(t.map((i,u)=>[i.name,u])),r=new Set(e.map(i=>i.name)),s=i=>r.has(typeof i=="string"?i:i.name),a=new Set(t.map(i=>i.name)),o=i=>a.has(typeof i=="string"?i:i.name);for(const i of t){for(const u of i.children.filter(o)){if(!n.has(u.name))throw new Vn(`Child ${u.name} of node ${i.name} is unreachable.`);if(n.get(i.name)>n.get(u.name))throw new Vn(`Node ${i.name} is scheduled to run after its child ${u.name}.`)}if(!s(i))for(const u of i.inputs){if(!n.has(u.name))throw new Vn(`Input ${u.name} of node ${i.name} is unreachable.`);if(n.get(u.name)>n.get(i.name))throw new Vn(`Node ${i.name} is scheduled to run before its input ${u.name}.`)}}}function MT(t){const e=new Map(t.map((i,u)=>[i.name,u])),n=Number.MAX_SAFE_INTEGER,r=t.map((i,u)=>Nt(i)?n:u),s=i=>{const u=r[e.get(i.name)];return u??-1},a=t.map((i,u)=>i.children.map(s).reduce((l,h)=>Math.max(l,h),r[u])),o=new Map;for(let i=0;i<t.length;++i){const u=a[i];if(u===n)continue;const l=t[i],h=t[u];o.has(h.name)||o.set(h.name,[]),o.get(h.name).push(l)}return o}const WT=new Set(["Switch","Merge","Enter","Exit","NextIteration","StatelessIf","StatelessWhile","if","While"]),UT=new Set(["NonMaxSuppressionV2","NonMaxSuppressionV3","NonMaxSuppressionV5","Where"]),qT=new Set(["HashTable","HashTableV2","LookupTableImport","LookupTableImportV2","LookupTableFind","LookupTableFindV2","LookupTableSize","LookupTableSizeV2"]);function Nt(t){return WT.has(t.op)}function GT(t){return UT.has(t.op)}function HT(t){return qT.has(t.op)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class ar{get weightIds(){return this.parent?this.parent.weightIds:this._weightIds}get functionExecutorMap(){return this.parent?this.parent.functionExecutorMap:this._functionExecutorMap}get weightMap(){return this.parent?this.parent.weightMap:this._weightMap}set weightMap(e){const n=Object.keys(e).map(r=>e[r].map(s=>s.id));this._weightIds=[].concat(...n),this._weightMap=e}set resourceManager(e){this._resourceManager=e}get inputs(){return this._inputs.map(e=>({name:e.name,shape:e.attrParams.shape?e.attrParams.shape.value:void 0,dtype:e.attrParams.dtype?e.attrParams.dtype.value:void 0}))}get outputs(){return this._outputs.map(e=>({name:e.name,shape:e.attrParams.shape?e.attrParams.shape.value:void 0,dtype:e.attrParams.dtype?e.attrParams.dtype.value:void 0}))}get inputNodes(){return this._inputs.map(e=>e.signatureKey||e.name)}get outputNodes(){return this._outputs.map(e=>{const n=e.signatureKey||e.name;return e.defaultOutput?`${n}:${e.defaultOutput}`:n})}get functions(){return Object.keys(this._functions).reduce((e,n)=>(e[n]=this._functions[n].signature,e),{})}constructor(e,n){this.graph=e,this.parent=n,this.compiledMap=new Map,this.parseNodeNameCache=new Map,this._weightMap={},this.SEPARATOR=",",this._functions={},this._functionExecutorMap={},this.keepIntermediateTensors=!1,this._outputs=e.outputs,this._inputs=e.inputs,this._initNodes=e.initNodes,this._signature=e.signature,this._functions=e.functions,e.functions!=null&&Object.keys(e.functions).forEach(r=>{this._functionExecutorMap[r]=new ar(e.functions[r],this)})}getCompilationKey(e,n){const r=e.map(a=>a.name).sort(),s=n.map(a=>a.name).sort();return r.join(this.SEPARATOR)+"--"+s.join(this.SEPARATOR)}compile(e,n){const r=io(e,n,this.weightMap,this._initNodes),{missingInputs:s,dynamicNode:a,syncInputs:o}=r;if(a!=null)throw new Error(`This execution contains the node '${a.name}', which has the dynamic op '${a.op}'. Please use model.executeAsync() instead. Alternatively, to avoid the dynamic ops, specify the inputs [${o}]`);if(s.length>0){const l=n.map(c=>c.name),h=Object.keys(e);throw new Error(`Cannot compute the outputs [${l}] from the provided inputs [${h}]. Missing the following inputs: [${s}]`)}const i=zT(this.graph,r),u=MT(i);return{orderedNodes:i,nodeLiveUntilMap:u}}cloneAndKeepTensor(e){if(e==null)return null;const n=e.clone();return De(n),n}cloneTensorList(e){return e?e.map(r=>this.cloneAndKeepTensor(r)):null}cloneTensorMap(e){return Object.fromEntries(Object.entries(e).map(([n,r])=>[n,this.cloneTensorList(r)]))}execute(e,n){this.disposeIntermediateTensors(),e=this.mapInputs(e);const r=Object.keys(e).sort();this.checkInputs(e),this.checkInputShapeAndType(e),n=this.mapOutputs(n),this.checkOutputs(n);const s=r.map(f=>this.graph.nodes[ye(f)[0]]),a=n.map(f=>ye(f)[0]),o=new Set(a);let i=a.map(f=>this.graph.nodes[f]);i.length===0&&(i=this._outputs);const u=this.getCompilationKey(s,i);let l=this.compiledMap.get(u);l==null&&(l=this.compile(e,i),this.compiledMap.set(u,l));try{this.keepIntermediateTensors=R().getBool("KEEP_INTERMEDIATE_TENSORS")}catch(f){this.keepIntermediateTensors=!1,console.warn(f.message)}const h={},c={};return j(()=>{const f=new oo(this.weightMap,h,c,this.functionExecutorMap,this.parseNodeNameCache),m=Object.assign({},this.weightMap);this.keepIntermediateTensors&&(this.clonedTensorsMap=this.cloneTensorMap(this.weightMap)),Object.keys(e).forEach(T=>{const[A,$]=ye(T,f),E=[];E[$]=e[T],m[A]=E,this.keepIntermediateTensors&&(this.clonedTensorsMap[A]=this.cloneTensorList(E))});const y=this.getFrozenTensorIds(m),{orderedNodes:S,nodeLiveUntilMap:b}=l;for(const T of S){if(m[T.name])continue;const A=ao(T,m,f,this._resourceManager);if(it(A))throw new Error(`The execution of the op '${T.op}' returned a promise. Please use model.executeAsync() instead.`);m[T.name]=A,this.keepIntermediateTensors&&(this.clonedTensorsMap[T.name]=this.cloneTensorList(A)),this.checkTensorForDisposalWithNodeLiveUntilInfo(T,m,f,y,o,b.get(T.name))}return this.parent==null&&f.dispose(y),n.map(T=>oe(T,m,f))})}getFrozenTensorIds(e){const n=[].concat.apply([],Object.keys(e).map(r=>e[r]).map(r=>r.map(s=>s.id)));return new Set(n)}checkTensorForDisposal(e,n,r,s,a,o,i){if(!(Nt(n)||o.has(e))){for(const u of r[e])u!=null&&(i[u.id]=(i[u.id]||0)+n.children.length);for(const u of n.inputs){if(Nt(u))continue;const l=eo(u.name,r,s);if(l!=null)for(const h of l){if(!h||h.kept||a.has(h.id))continue;const c=i[h.id];c===1?(h.dispose(),delete i[h.id]):c!=null&&i[h.id]--}}}}checkTensorForDisposalWithNodeLiveUntilInfo(e,n,r,s,a,o){function i(u){return Nt(u)||a.has(u.name)}if(!(Nt(e)||o==null))for(const u of o){if(i(u))continue;const l=eo(u.name,n,r);for(const h of l)!h||h.kept||s.has(h.id)||h.dispose()}}async executeAsync(e,n){return this._executeAsync(e,n)}disposeIntermediateTensors(){this.clonedTensorsMap&&(Object.values(this.clonedTensorsMap).forEach(e=>{for(const n of e)n&&!n.isDisposed&&n.dispose()}),this.clonedTensorsMap=null)}getIntermediateTensors(){return this.clonedTensorsMap}async _executeAsync(e,n,r=!1,s={},a={}){this.disposeIntermediateTensors(),r||(e=this.mapInputs(e),this.checkInputs(e),this.checkInputShapeAndType(e),n=this.mapOutputs(n),this.checkOutputs(n));try{this.keepIntermediateTensors=R().getBool("KEEP_INTERMEDIATE_TENSORS")}catch(f){this.keepIntermediateTensors=!1,console.warn(f.message)}const o=new oo(this.weightMap,s,a,this.functionExecutorMap,this.parseNodeNameCache);this.keepIntermediateTensors&&(this.clonedTensorsMap=this.cloneTensorMap(this.weightMap));const i=await this.executeWithControlFlow(e,o,n,r),u=n.map(f=>oe(f,i,o)),l=u.map(f=>f.id),h=Object.keys(e).map(f=>e[f].id),c=new Set([...l,...h,...this.weightIds]);return Object.values(i).forEach(f=>{f.forEach(m=>{m&&!m.isDisposed&&!c.has(m.id)&&m.dispose()})}),this.parent==null&&o.dispose(c),u}async executeFunctionAsync(e,n,r){const s=e.reduce((a,o,i)=>(a[this.inputs[i].name]=o,a),{});return this._executeAsync(s,this.outputNodes,!0,n,r)}async executeWithControlFlow(e,n,r,s){const a=Object.keys(e),o=a.map(E=>this.graph.nodes[ye(E)[0]]),i=r.map(E=>ye(E)[0]),u=new Set(i);let l=i.map(E=>this.graph.nodes[E]);l.length===0&&(l=this._outputs);const{usedNodes:h,missingInputs:c,dynamicNode:f,syncInputs:m}=io(e,l,this.weightMap,this._initNodes),y=[...o,...this.graph.weights,...this._initNodes||[]].map(E=>({node:E,contexts:n.currentContext})),S=Object.assign({},this.weightMap);Object.keys(e).forEach(E=>{const[_,v]=ye(E),O=[];O[v]=e[E],S[_]=O});const b={},T=this.getFrozenTensorIds(S),A={};for(;y.length>0;){const E=this.processStack(o,y,n,S,A,T,u,b,h);await Promise.all(E)}f==null&&!s&&console.warn("This model execution did not contain any nodes with control flow or dynamic output shapes. You can use model.execute() instead.");const $=l.filter(E=>!Nt(E)&&!oe(E.name,S,n)).map(E=>E.name);if($.length>0){let E="";throw f!=null&&(E=`Alternatively, to avoid the dynamic ops, use model.execute() and specify the inputs [${m}]`),new Error(`Cannot compute the outputs [${$}] from the provided inputs [${a}]. Consider providing the following inputs: [${c}]. ${E}`)}return S}processStack(e,n,r,s,a,o,i,u,l){const h=[];for(;n.length>0;){const c=n.pop();r.currentContext=c.contexts;let f="";if(c.node.op==="Enter"&&p("isConstant",c.node,s,r)&&([f]=Ge(c.node.name,r)),s[c.node.name]==null){const m=ao(c.node,s,r,this._resourceManager);f||([f]=Ge(c.node.name,r));const y=r.currentContext;it(m)?h.push(m.then(S=>(s[f]=S,this.keepIntermediateTensors&&(this.clonedTensorsMap[f]=this.cloneTensorList(S)),r.currentContext=y,this.checkTensorForDisposal(f,c.node,s,r,o,i,u),this.processChildNodes(c.node,n,r,s,a,l),S))):(s[f]=m,this.keepIntermediateTensors&&(this.clonedTensorsMap[f]=this.cloneTensorList(m)),this.checkTensorForDisposal(f,c.node,s,r,o,i,u),this.processChildNodes(c.node,n,r,s,a,l))}else this.processChildNodes(c.node,n,r,s,a,l)}return h}processChildNodes(e,n,r,s,a,o){e.children.forEach(i=>{const[u]=Ge(i.name,r);a[u]||!o.has(i.name)||(i.op==="Merge"?i.inputNames.some(l=>!!oe(l,s,r))&&(a[u]=!0,n.push({contexts:r.currentContext,node:i})):i.inputNames.every(l=>!!oe(l,s,r))&&(a[u]=!0,n.push({contexts:r.currentContext,node:i})))})}dispose(){Object.keys(this.weightMap).forEach(e=>this.weightMap[e].forEach(n=>n.dispose()))}checkInputShapeAndType(e){Object.keys(e).forEach(n=>{const r=e[n],[s]=ye(n),a=this.graph.nodes[s];if(a.attrParams.shape&&a.attrParams.shape.value){const o=a.attrParams.shape.value,i=o.length===r.shape.length&&r.shape.every((u,l)=>o[l]===-1||o[l]===u);g(i,()=>`The shape of dict['${a.name}'] provided in model.execute(dict) must be [${o}], but was [${r.shape}]`)}a.attrParams.dtype&&a.attrParams.dtype.value&&g(r.dtype===a.attrParams.dtype.value,()=>`The dtype of dict['${a.name}'] provided in model.execute(dict) must be ${a.attrParams.dtype.value}, but was ${r.dtype}`)})}mapInputs(e){var n,r;const s={};for(const a in e){const o=(r=(n=this._signature)===null||n===void 0?void 0:n.inputs)===null||r===void 0?void 0:r[a];o!=null?s[o.name]=e[a]:s[a]=e[a]}return s}checkInputs(e){const n=Object.keys(e).filter(r=>{const[s]=ye(r);return this.graph.nodes[s]==null});if(n.length>0)throw new Error(`The dict provided in model.execute(dict) has keys: [${n}] that are not part of graph`)}mapOutputs(e){return e.map(n=>{var r,s;const a=(s=(r=this._signature)===null||r===void 0?void 0:r.outputs)===null||s===void 0?void 0:s[n];return a!=null?a.name:n},{})}checkOutputs(e){e.forEach(n=>{const[r]=ye(n);if(!this.graph.nodes[r])throw new Error(`The output '${n}' is not found in the graph`)})}}class KT{constructor(e={},n={}){this.hashTableNameToHandle=e,this.hashTableMap=n}addHashTable(e,n){this.hashTableNameToHandle[e]=n.handle,this.hashTableMap[n.id]=n}getHashTableHandleByName(e){return this.hashTableNameToHandle[e]}getHashTableById(e){return this.hashTableMap[e]}dispose(){for(const e in this.hashTableMap)this.hashTableMap[e].clearAndClose(),delete this.hashTableMap[e];for(const e in this.hashTableNameToHandle)this.hashTableNameToHandle[e].dispose(),delete this.hashTableNameToHandle[e]}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const XT="?tfjs-format=file",ZT="model.json";class Oa{get modelVersion(){return this.version}get inputNodes(){return this.executor.inputNodes}get outputNodes(){return this.executor.outputNodes}get inputs(){return this.executor.inputs}get outputs(){return this.executor.outputs}get weights(){return this.executor.weightMap}get metadata(){return this.artifacts.userDefinedMetadata}get modelSignature(){return this.signature}get modelStructuredOutputKeys(){return this.structuredOutputKeys}constructor(e,n={},r=va){this.modelUrl=e,this.loadOptions=n,this.version="n/a",this.io=r,n==null&&(this.loadOptions={}),this.resourceManager=new KT}findIOHandler(){const e=this.modelUrl;if(e.load!=null)this.handler=e;else if(this.loadOptions.requestInit!=null)this.handler=this.io.browserHTTPRequest(e,this.loadOptions);else{const n=this.io.getLoadHandlers(e,this.loadOptions);if(n.length===0)n.push(this.io.browserHTTPRequest(e,this.loadOptions));else if(n.length>1)throw new Error(`Found more than one (${n.length}) load handlers for URL '${[e]}'`);this.handler=n[0]}}load(){if(this.findIOHandler(),this.handler.load==null)throw new Error("Cannot proceed with model loading because the IOHandler provided does not have the `load` method implemented.");const e=this.handler.load();return it(e)?e.then(n=>n.getWeightStream==null?this.loadSync(n):this.loadStreaming(n)):this.loadSync(e)}loadSync(e){const n=this.io.decodeWeights(e.weightData,e.weightSpecs);return this.loadWithWeightMap(e,n)}async loadStreaming(e){if(e.getWeightStream==null)throw new Error("Model artifacts missing streamWeights function");const n=await Pl(e.getWeightStream(),e.weightSpecs);return this.loadWithWeightMap(e,n)}loadWithWeightMap(e,n){this.artifacts=e;const r=this.artifacts.modelTopology;let s=this.artifacts.signature;if(this.artifacts.userDefinedMetadata!=null){const a=this.artifacts.userDefinedMetadata;a.signature!=null&&(s=a.signature),a.structuredOutputKeys!=null&&(this.structuredOutputKeys=a.structuredOutputKeys)}if(this.signature=s,this.version=`${r.versions.producer}.${r.versions.minConsumer}`,this.executor=new ar(to.Instance.transformGraph(r,this.signature)),this.executor.weightMap=this.convertTensorMapToTensorsMap(n),this.executor.resourceManager=this.resourceManager,e.modelInitializer!=null&&e.modelInitializer.node!=null){const a=to.Instance.transformGraph(e.modelInitializer);this.initializer=new ar(a),this.initializer.weightMap=this.executor.weightMap,this.initializer.resourceManager=this.resourceManager,this.initializerSignature=e.initializerSignature}return!0}async save(e,n){if(typeof e=="string"){const r=this.io.getSaveHandlers(e);if(r.length===0)throw new Error(`Cannot find any save handlers for URL '${e}'`);if(r.length>1)throw new Error(`Found more than one (${r.length}) save handlers for URL '${e}'`);e=r[0]}if(e.save==null)throw new Error("GraphModel.save() cannot proceed because the IOHandler provided does not have the `save` attribute defined.");return e.save(this.artifacts)}addStructuredOutputNames(e){if(this.structuredOutputKeys){const n=e instanceof te?[e]:e,r={};return n.forEach((s,a)=>r[this.structuredOutputKeys[a]]=s),r}return e}predict(e,n){const r=this.execute(e,this.outputNodes);return this.addStructuredOutputNames(r)}async predictAsync(e,n){const r=await this.executeAsync(e,this.outputNodes);return this.addStructuredOutputNames(r)}normalizeInputs(e){var n;if(!(e instanceof te)&&!Array.isArray(e)){const a=(n=this.signature)===null||n===void 0?void 0:n.inputs;if(a!=null)for(const o in a){const i=a[o];i.resourceId!=null&&(e[o]=this.resourceIdToCapturedInput[i.resourceId])}return e}e=Array.isArray(e)?e:[e];const r=Object.keys(this.resourceIdToCapturedInput).length;if(e.length+r!==this.inputNodes.length)throw new Error(`Input tensor count mismatch, the graph model has ${this.inputNodes.length-r} non-resource placeholders, while there are ${e.length} input tensors provided.`);let s=0;return this.inputNodes.reduce((a,o)=>{var i,u,l;const h=(l=(u=(i=this.signature)===null||i===void 0?void 0:i.inputs)===null||u===void 0?void 0:u[o])===null||l===void 0?void 0:l.resourceId;return h!=null?a[o]=this.resourceIdToCapturedInput[h]:a[o]=e[s++],a},{})}normalizeOutputs(e){return e=e||this.outputNodes,Array.isArray(e)?e:[e]}executeInitializerGraph(){return this.initializer==null?[]:this.initializerSignature==null?this.initializer.execute({},[]):this.initializer.execute({},Object.keys(this.initializerSignature.outputs))}async executeInitializerGraphAsync(){return this.initializer==null?[]:this.initializerSignature==null?this.initializer.executeAsync({},[]):this.initializer.executeAsync({},Object.keys(this.initializerSignature.outputs))}setResourceIdToCapturedInput(e){if(this.resourceIdToCapturedInput={},this.initializerSignature){const n=this.initializerSignature.outputs,r=Object.keys(n);for(let s=0;s<r.length;s++){const a=r[s],o=n[a];this.resourceIdToCapturedInput[o.resourceId]=e[s]}}}execute(e,n){this.resourceIdToCapturedInput==null&&this.setResourceIdToCapturedInput(this.executeInitializerGraph()),e=this.normalizeInputs(e),n=this.normalizeOutputs(n);const r=this.executor.execute(e,n);return r.length>1?r:r[0]}async executeAsync(e,n){this.resourceIdToCapturedInput==null&&this.setResourceIdToCapturedInput(await this.executeInitializerGraphAsync()),e=this.normalizeInputs(e),n=this.normalizeOutputs(n);const r=await this.executor.executeAsync(e,n);return r.length>1?r:r[0]}getIntermediateTensors(){return this.executor.getIntermediateTensors()}disposeIntermediateTensors(){this.executor.disposeIntermediateTensors()}convertTensorMapToTensorsMap(e){return Object.keys(e).reduce((n,r)=>(n[r]=[e[r]],n),{})}dispose(){this.executor.dispose(),this.initializer&&(this.initializer.dispose(),this.resourceIdToCapturedInput&&pe(this.resourceIdToCapturedInput)),this.resourceManager.dispose()}}async function JT(t,e={},n=va){if(t==null)throw new Error("modelUrl in loadGraphModel() cannot be null. Please provide a url or an IOHandler that loads the model");e==null&&(e={}),e.fromTFHub&&typeof t=="string"&&(t=QT(t));const r=new Oa(t,e,n);return await r.load(),r}function YT(t){if(t==null)throw new Error("modelUrl in loadGraphModelSync() cannot be null. Please provide model artifacts or an IOHandler that loads the model");let e;if(t instanceof Array){const[r,s]=t;if(!r)throw new Error("modelJSON must be the first element of the array");if(!s||!(s instanceof ArrayBuffer))throw new Error("An ArrayBuffer of weights must be the second element of the array");if(!("modelTopology"in r))throw new Error("Model JSON is missing 'modelTopology'");if(!("weightsManifest"in r))throw new Error("Model JSON is missing 'weightsManifest'");const a=Yn(r.weightsManifest),o=ks(r,a,s);e=rr(o)}else if("load"in t)e=t;else if("modelTopology"in t&&"weightSpecs"in t&&"weightData"in t)e=rr(t);else throw new Error("Unknown model format");const n=new Oa(e);return n.load(),n}function QT(t){return t.endsWith("/")||(t=t+"/"),`${t}${ZT}${XT}`}/** @license See the LICENSE file. */const e$="4.22.0";/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const t$=Object.freeze(Object.defineProperty({__proto__:null,GraphModel:Oa,deregisterOp:_S,loadGraphModel:JT,loadGraphModelSync:YT,registerOp:kS,version_converter:e$},Symbol.toStringTag,{value:"Module"})),n$=cs(t$),r$=cs($S);/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */(function(t,e){(function(n,r){r(e,n$,r$)})(pt,function(n,r,s){const a={1:{name:"/m/01g317",id:1,displayName:"person"},2:{name:"/m/0199g",id:2,displayName:"bicycle"},3:{name:"/m/0k4j",id:3,displayName:"car"},4:{name:"/m/04_sv",id:4,displayName:"motorcycle"},5:{name:"/m/05czz6l",id:5,displayName:"airplane"},6:{name:"/m/01bjv",id:6,displayName:"bus"},7:{name:"/m/07jdr",id:7,displayName:"train"},8:{name:"/m/07r04",id:8,displayName:"truck"},9:{name:"/m/019jd",id:9,displayName:"boat"},10:{name:"/m/015qff",id:10,displayName:"traffic light"},11:{name:"/m/01pns0",id:11,displayName:"fire hydrant"},13:{name:"/m/02pv19",id:13,displayName:"stop sign"},14:{name:"/m/015qbp",id:14,displayName:"parking meter"},15:{name:"/m/0cvnqh",id:15,displayName:"bench"},16:{name:"/m/015p6",id:16,displayName:"bird"},17:{name:"/m/01yrx",id:17,displayName:"cat"},18:{name:"/m/0bt9lr",id:18,displayName:"dog"},19:{name:"/m/03k3r",id:19,displayName:"horse"},20:{name:"/m/07bgp",id:20,displayName:"sheep"},21:{name:"/m/01xq0k1",id:21,displayName:"cow"},22:{name:"/m/0bwd_0j",id:22,displayName:"elephant"},23:{name:"/m/01dws",id:23,displayName:"bear"},24:{name:"/m/0898b",id:24,displayName:"zebra"},25:{name:"/m/03bk1",id:25,displayName:"giraffe"},27:{name:"/m/01940j",id:27,displayName:"backpack"},28:{name:"/m/0hnnb",id:28,displayName:"umbrella"},31:{name:"/m/080hkjn",id:31,displayName:"handbag"},32:{name:"/m/01rkbr",id:32,displayName:"tie"},33:{name:"/m/01s55n",id:33,displayName:"suitcase"},34:{name:"/m/02wmf",id:34,displayName:"frisbee"},35:{name:"/m/071p9",id:35,displayName:"skis"},36:{name:"/m/06__v",id:36,displayName:"snowboard"},37:{name:"/m/018xm",id:37,displayName:"sports ball"},38:{name:"/m/02zt3",id:38,displayName:"kite"},39:{name:"/m/03g8mr",id:39,displayName:"baseball bat"},40:{name:"/m/03grzl",id:40,displayName:"baseball glove"},41:{name:"/m/06_fw",id:41,displayName:"skateboard"},42:{name:"/m/019w40",id:42,displayName:"surfboard"},43:{name:"/m/0dv9c",id:43,displayName:"tennis racket"},44:{name:"/m/04dr76w",id:44,displayName:"bottle"},46:{name:"/m/09tvcd",id:46,displayName:"wine glass"},47:{name:"/m/08gqpm",id:47,displayName:"cup"},48:{name:"/m/0dt3t",id:48,displayName:"fork"},49:{name:"/m/04ctx",id:49,displayName:"knife"},50:{name:"/m/0cmx8",id:50,displayName:"spoon"},51:{name:"/m/04kkgm",id:51,displayName:"bowl"},52:{name:"/m/09qck",id:52,displayName:"banana"},53:{name:"/m/014j1m",id:53,displayName:"apple"},54:{name:"/m/0l515",id:54,displayName:"sandwich"},55:{name:"/m/0cyhj_",id:55,displayName:"orange"},56:{name:"/m/0hkxq",id:56,displayName:"broccoli"},57:{name:"/m/0fj52s",id:57,displayName:"carrot"},58:{name:"/m/01b9xk",id:58,displayName:"hot dog"},59:{name:"/m/0663v",id:59,displayName:"pizza"},60:{name:"/m/0jy4k",id:60,displayName:"donut"},61:{name:"/m/0fszt",id:61,displayName:"cake"},62:{name:"/m/01mzpv",id:62,displayName:"chair"},63:{name:"/m/02crq1",id:63,displayName:"couch"},64:{name:"/m/03fp41",id:64,displayName:"potted plant"},65:{name:"/m/03ssj5",id:65,displayName:"bed"},67:{name:"/m/04bcr3",id:67,displayName:"dining table"},70:{name:"/m/09g1w",id:70,displayName:"toilet"},72:{name:"/m/07c52",id:72,displayName:"tv"},73:{name:"/m/01c648",id:73,displayName:"laptop"},74:{name:"/m/020lf",id:74,displayName:"mouse"},75:{name:"/m/0qjjc",id:75,displayName:"remote"},76:{name:"/m/01m2v",id:76,displayName:"keyboard"},77:{name:"/m/050k8",id:77,displayName:"cell phone"},78:{name:"/m/0fx9l",id:78,displayName:"microwave"},79:{name:"/m/029bxz",id:79,displayName:"oven"},80:{name:"/m/01k6s3",id:80,displayName:"toaster"},81:{name:"/m/0130jx",id:81,displayName:"sink"},82:{name:"/m/040b_t",id:82,displayName:"refrigerator"},84:{name:"/m/0bt_c3",id:84,displayName:"book"},85:{name:"/m/01x3z",id:85,displayName:"clock"},86:{name:"/m/02s195",id:86,displayName:"vase"},87:{name:"/m/01lsmm",id:87,displayName:"scissors"},88:{name:"/m/0kmg4",id:88,displayName:"teddy bear"},89:{name:"/m/03wvsk",id:89,displayName:"hair drier"},90:{name:"/m/012xff",id:90,displayName:"toothbrush"}};class o{constructor(u,l){this.modelPath=l||`https://storage.googleapis.com/tfjs-models/savedmodel/${this.getPrefix(u)}/model.json`}getPrefix(u){return u==="lite_mobilenet_v2"?`ssd${u}`:`ssd_${u}`}async load(){this.model=await r.loadGraphModel(this.modelPath);const u=s.zeros([1,300,300,3],"int32"),l=await this.model.executeAsync(u);await Promise.all(l.map(h=>h.data())),l.map(h=>h.dispose()),u.dispose()}async infer(u,l,h){const c=s.tidy(()=>(u instanceof s.Tensor||(u=s.browser.fromPixels(u)),s.expandDims(u))),f=c.shape[1],m=c.shape[2],y=await this.model.executeAsync(c),S=y[0].dataSync(),b=y[1].dataSync();c.dispose(),s.dispose(y);const[T,A]=this.calculateMaxScores(S,y[0].shape[1],y[0].shape[2]),$=s.getBackend();s.getBackend()==="webgl"&&s.setBackend("cpu");const E=s.tidy(()=>{const v=s.tensor2d(b,[y[1].shape[1],y[1].shape[3]]);return s.image.nonMaxSuppression(v,T,l,h,h)}),_=E.dataSync();return E.dispose(),$!==s.getBackend()&&s.setBackend($),this.buildDetectedObjects(m,f,b,T,_,A)}buildDetectedObjects(u,l,h,c,f,m){const y=f.length,S=[];for(let b=0;b<y;b++){const T=[];for(let v=0;v<4;v++)T[v]=h[4*f[b]+v];const A=T[0]*l,$=T[1]*u,E=T[2]*l,_=T[3]*u;T[0]=$,T[1]=A,T[2]=_-$,T[3]=E-A,S.push({bbox:T,class:a[m[f[b]]+1].displayName,score:c[f[b]]})}return S}calculateMaxScores(u,l,h){const c=[],f=[];for(let m=0;m<l;m++){let y=Number.MIN_VALUE,S=-1;for(let b=0;b<h;b++)u[m*h+b]>y&&(y=u[m*h+b],S=b);c[m]=y,f[m]=S}return[c,f]}async detect(u,l=20,h=.5){return this.infer(u,l,h)}dispose(){this.model!=null&&this.model.dispose()}}n.ObjectDetection=o,n.load=async function(i={}){if(s==null)throw new Error("Cannot find TensorFlow.js. If you are using a <script> tag, please also include @tensorflow/tfjs on the page before using this model.");const u=i.base||"lite_mobilenet_v2",l=i.modelUrl;if(["mobilenet_v1","mobilenet_v2","lite_mobilenet_v2"].indexOf(u)===-1)throw new Error(`ObjectDetection constructed with invalid base model ${u}. Valid names are 'mobilenet_v1', 'mobilenet_v2' and 'lite_mobilenet_v2'.`);const h=new o(u,l);return await h.load(),h},n.version="2.2.3",Object.defineProperty(n,"__esModule",{value:!0})})})(Or,Or.exports);var Mp=Or.exports;const s$=uo(Mp),o$=lo({__proto__:null,default:s$},[Mp]);export{o$ as c};
