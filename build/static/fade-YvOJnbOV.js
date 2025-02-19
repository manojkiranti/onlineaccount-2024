import{as as i,c6 as s}from"./index-CZ1dh9Kt.js";const c=new i("antFadeIn",{"0%":{opacity:0},"100%":{opacity:1}}),r=new i("antFadeOut",{"0%":{opacity:1},"100%":{opacity:0}}),u=function(a){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;const{antCls:o}=a,n=`${o}-fade`,t=e?"&":"";return[s(n,c,r,a.motionDurationMid,e),{[`
        ${t}${n}-enter,
        ${t}${n}-appear
      `]:{opacity:0,animationTimingFunction:"linear"},[`${t}${n}-leave`]:{animationTimingFunction:"linear"}}]};export{u as i};
//# sourceMappingURL=fade-YvOJnbOV.js.map
