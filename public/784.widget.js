"use strict";(this.webpackChunkWidget=this.webpackChunkWidget||[]).push([[784],{9784:(e,t,a)=>{a.r(t),a.d(t,{default:()=>d});var n=a(6540),r=a(7403),s=a(7622),c=a(222),i=a(9731),o=a(4848);function l(e){let{inline:t,className:a,children:r,...i}=e;const l=/language-(\w+)/.exec(a||""),[d,u]=(0,n.useState)(!1);return!t&&l?(0,o.jsxs)("div",{className:"relative my-4",children:[(0,o.jsx)("button",{onClick:async()=>{const e=String(r).replace(/\n$/,"");try{await navigator.clipboard.writeText(e),u(!0),setTimeout((()=>u(!1)),2e3)}catch(e){console.error("Failed to copy code: ",e)}},className:"absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded",children:d?"Copied":"Copy"}),(0,o.jsx)(s.A,{language:l[1],style:c.A,PreTag:"div",className:"rounded-lg overflow-x-auto",...i,children:String(r).replace(/\n$/,"")})]}):(0,o.jsx)("code",{className:a,...i,children:r})}function d(e){let{content:t}=e;return(0,o.jsx)("div",{className:"prose max-w-none break-words whitespace-normal mb-2",children:(0,o.jsx)(r.o,{remarkPlugins:[i.A],components:{code:l},children:t})})}}}]);