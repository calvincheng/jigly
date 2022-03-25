var ge=Object.defineProperty,me=Object.defineProperties;var we=Object.getOwnPropertyDescriptors;var U=Object.getOwnPropertySymbols;var ye=Object.prototype.hasOwnProperty,ve=Object.prototype.propertyIsEnumerable;var Y=(e,t,o)=>t in e?ge(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,k=(e,t)=>{for(var o in t||(t={}))ye.call(t,o)&&Y(e,o,t[o]);if(U)for(var o of U(t))ve.call(t,o)&&Y(e,o,t[o]);return e},S=(e,t)=>me(e,we(t));import{r as a,m as I,B as be,j as y,D as Ce,W as ke,l as Ee,a as Pe,b as x,c as $,d as m,A as B,e as L,f as V,g as Q,V as Se,T as J,R as Ae,F as ee,Y as Le,u as te,h as oe,i as Me,k as je}from"./vendor.e86db4f6.js";const De=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function o(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerpolicy&&(s.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?s.credentials="include":n.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(n){if(n.ep)return;n.ep=!0;const s=o(n);fetch(n.href,s)}};De();var X="/jigly/assets/greatWaveHD.da1fcc6d.jpeg";const ne=a.exports.createContext(null),$e=()=>a.exports.useContext(ne),ze=({pieces:e,children:t})=>{const o=I.exports.useApp(),[r,n]=a.exports.useState({});return a.exports.useEffect(()=>{o.loader.reset(),o.loader.add("jigsaw",X),o.loader.load(()=>{const s={};["jigsaw"].forEach(c=>{const i=o.loader.resources[c];s[c]=be.from(i.url)}),n(s)})},[X]),y(ne.Provider,{value:{baseTextures:r,pieces:e},children:t})},z=new Ce,Ie="wss://demos.yjs.dev",M=new ke(Ie,"jigly-demo",z,{connect:!0}),C=M.awareness,Fe=()=>{const[e,t]=a.exports.useState({});return a.exports.useEffect(()=>{const o=()=>{const r={};C.getStates().forEach((n,s)=>{r[s]=n}),t(r)};return C.on("change",o),()=>C.off("change",o)},[]),{users:e}},se=5e3,re=5e3,We=["#F28FAD","#FAE3B0","#B5E8E0","#96CDFB","#89DCEB","#F5C2E7"],H=["\u{1F437}","\u{1F43C}","\u{1F436}","\u{1F984}","\u{1F98A}","\u{1F414}","\u{1F439}","\u{1F42E}","\u{1F435}"],O=16;function Re(e){const t=Math.floor(Math.random()*e.length);return e[t]}const Te=e=>{const[t,o]=a.exports.useState(),[r,n]=a.exports.useState(!1),[s,c]=a.exports.useState([0,0]),[i,l]=a.exports.useState(!1),u=a.exports.useCallback(()=>{o(C.getLocalState())},[C]),d=()=>M.connect(),p=()=>M.disconnect(),f=a.exports.useCallback(g=>{C.setLocalStateField("name",g),u()},[C]),h=a.exports.useCallback(g=>{C.setLocalStateField("chat",g),u()},[C]),w=a.exports.useCallback(g=>{C.setLocalStateField("active",g),u()},[C]);return a.exports.useEffect(()=>{n(M.wsconnected)},[M.wsconnected]),a.exports.useEffect(()=>{const g={id:C.clientID.toString(),pos:[0,0],chat:"",active:!0,color:Re(We),name:"",created:Date.now()};return C.setLocalState(g),o(g),()=>{C.setLocalState(null)}},[]),a.exports.useEffect(()=>{const g=()=>{w(!0)},v=()=>{w(!1)};return document.addEventListener("pointerenter",g),document.addEventListener("pointerleave",v),()=>{document.removeEventListener("pointerenter",g),document.removeEventListener("pointerleave",v)}},[]),a.exports.useEffect(()=>{const g=()=>{l(!1),C.setLocalStateField("chat",""),u()};return document.addEventListener("pointerdown",g),()=>{document.removeEventListener("pointerdown",g)}},[]),a.exports.useEffect(()=>{const g=Ee(([E,A])=>{const{x:b,y:P}=e.toWorld({x:E,y:A});C.setLocalStateField("pos",[b,P]),u()},50),v=E=>{const{clientX:A,clientY:b}=E;c([A,b]),e&&!e.moving&&g([A,b])};return document.addEventListener("pointermove",v),()=>document.removeEventListener("pointermove",v)},[e]),a.exports.useEffect(()=>{const g=v=>{switch(v.key){case"/":i||(v.preventDefault(),l(!0));break;case"Escape":h(""),l(!1);break;case"Enter":h("");break}};return document.addEventListener("keydown",g),()=>document.removeEventListener("keydown",g)},[i]),[{user:t,pos:s,chatting:i,loggedIn:r},{updateChat:h,updateActive:w,updateName:f,login:d,logout:p}]},ce=.35,He={initial:{y:"-55%",x:"-50%",opacity:0},animate:{y:"-50%",x:"-50%",opacity:1},exit:{y:"-55%",x:"-50%",opacity:0},transition:{duration:ce}},Oe={initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:ce}},Ne=({show:e,onHide:t=()=>{console.warn("Please implement onHide handler")},minWidth:o=240,children:r})=>Pe.exports.createPortal(x(B,{children:e&&x($.div,S(k({css:m`
            height: 100%;
            width: 100%;
            position: fixed;
            z-index: 0;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.45);
          `},Oe),{children:x($.div,S(k({css:m`
              position: absolute;
              top: 50%;
              left: 50%;
              display: flex;
              flex-direction: column;
              gap: 20px;
              padding: 20px;
              border-radius: 10px;
              overflow: hidden;
              min-width: ${o}px;
              outline: 0;
              color: white;
              background: var(--color-black3);
            `},He),{onClick:n=>n.stopPropagation(),children:r}),"modal-body")}),"modal-backdrop")}),document.body),Z=140,Be=({show:e,onHide:t})=>{const[o,r]=a.exports.useState(""),{login:n,updateName:s}=de(),c=()=>{s(o),n(),t()};return x(Ne,{show:e,onHide:t,children:x("div",{css:m`
          position: relative;
          height: ${Z}px;
          width: 240px;
          overflow: hidden;
        `,children:x(B,{initial:!1,children:L($.div,{css:m`
              height: ${Z}px;
              width: 100%;
              position: absolute;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            `,children:[x("div",{children:x("b",{children:"What's your name?"})}),x("input",{autoFocus:!0,placeholder:"Anonymous",value:o,maxLength:40,css:m`
                padding: 12px;
                border-radius: 8px;
              `,onChange:i=>r(i.target.value),onKeyDown:i=>{i.key==="Enter"&&c()}}),x("div",{css:m`
                display: flex;
                flex-direction: column;
                gap: 8px;
              `,children:x("button",{css:m`
                  background: var(--color-green);
                  color: var(--color-black0);
                `,onClick:c,children:"Let's go!"})})]})})})})},ie=a.exports.createContext({}),ae=a.exports.createContext({}),le=()=>a.exports.useContext(ie),de=()=>a.exports.useContext(ae),Ve=({viewport:e,children:t})=>{const[o,r]=a.exports.useState(!0),[{user:n,loggedIn:s,pos:c,chatting:i},{login:l,logout:u,updateChat:d,updateActive:p,updateName:f}]=Te(e),{users:h}=Fe(),w=a.exports.useMemo(()=>({user:{user:n,loggedIn:s,pos:c,chatting:i},users:h}),[n,h,s,c,i]),g=a.exports.useMemo(()=>({login:l,logout:u,updateChat:d,updateActive:p,updateName:f}),[d,p,f]);return y(ae.Provider,{value:g,children:V(ie.Provider,{value:w,children:[y(Be,{show:o,onHide:()=>r(!1)}),t]})})},Ue=()=>{const[e,t]=a.exports.useState(window.innerWidth),[o,r]=a.exports.useState(window.innerHeight);return a.exports.useEffect(()=>{const n=Q(()=>{t(window.innerWidth),r(window.innerHeight)},100);return window.addEventListener("resize",n),()=>window.removeEventListener("resize",n)},[]),{width:e,height:o}},Ye=()=>{const[e,t]=a.exports.useState([]);return a.exports.useEffect(()=>{const o=z.getArray("pieces");o.observe(()=>{t(o.toArray())}),M.on("sync",()=>{console.log("synced"),t(o.toArray())})},[]),{pieces:e}},Je=e=>{const[t,o]=a.exports.useState(e.get("pos")),r=n=>{e.set("pos",n),o(n)};return a.exports.useEffect(()=>{const n=()=>{o(e.get("pos"))};return e.observe(n),n(),()=>e.unobserve(n)},[e]),[{pos:t,size:e.get("size"),index:e.get("index"),edges:e.get("edges")},{updatePos:r}]},Xe=I.exports.PixiComponent("Viewport",{create:e=>{const{screenWidth:t,screenHeight:o,worldWidth:r,worldHeight:n}=e,s=new Se(S(k(k(k(k({},t?{screenWidth:t}:{}),o?{screenHeight:o}:{}),r?{worldWidth:r}:{}),n?{worldHeight:n}:{}),{passiveWheel:!1,interaction:e.app.renderer.plugins.interaction}));s.drag().decelerate().pinch().wheel({trackpadPinch:!0,wheelZoom:!1}).clampZoom({minScale:e.minScale,maxScale:e.maxScale}),s.moving=!1;const c=()=>{s.moving||(s.moving=!0)},i=Q(()=>{s.moving=!1;const u={corner:s.corner,scale:s.scaled};localStorage.setItem("lastViewportMove",JSON.stringify(u))},150);s.on("moved",c),s.on("moved-end",i);const l=localStorage.getItem("lastViewportMove");if(l!==null){const{corner:u,scale:d}=JSON.parse(l);s.setZoom(d),s.moveCorner(u)}else s.fit(),s.moveCenter(r/2,n/2);return s},didMount:(e,t)=>{},willUnmount:(e,t)=>{},applyProps:(e,t,o)=>{const{screenHeight:r,screenWidth:n,worldHeight:s,worldWidth:c}=o;e.resize(n,r,c,s)},config:{destroy:!0,destroyChildren:!0}}),ue=a.exports.createContext(null),Ze=()=>a.exports.useContext(ue),_e=a.exports.forwardRef((e,t)=>{const o=I.exports.useApp();return y(ue.Provider,{value:t.current,children:y(Xe,S(k({app:o},e),{ref:t}))})});function Ge(e,t,{tolerance:o=20}={}){const[r,n]=e.get("pos"),[s,c]=e.get("index"),i=e.get("size"),l=t.filter(p=>{const[f,h]=p.get("index");return s!==f||c!==h}),d=["topleft","topright","bottomleft","bottomright"].map(p=>({target:p,candidate:Ke(e,l,p,o)})).filter(p=>Boolean(p.candidate));if(d.length>0){const p=d.reduce((g,v)=>{const{candidate:{vertex:[E,A]}}=v,{candidate:{vertex:[b,P]}}=v,j=(r-E)**2+(n-A)**2,D=(r-b)**2+(n-P)**2;return j<D?v:g},d[0]),{target:f,candidate:{vertex:[h,w]}}=p;switch(f){case"topleft":e.set("pos",[h,w]);break;case"topright":e.set("pos",[h-i,w]);break;case"bottomleft":e.set("pos",[h,w-i]);break;case"bottomright":e.set("pos",[h-i,w-i]);break}}}function Ke(e,t,o="topleft",r=20){let[n,s]=e.get("pos");const c=e.get("size");(o==="topright"||o==="bottomright")&&(n+=c),(o==="bottomright"||o==="bottomleft")&&(s+=c);const i=[];t.forEach(d=>{const[p,f]=d.get("pos");let h=[0,0];switch(o){case"topleft":h=[p,f+c];break;case"topright":h=[p,f];break;case"bottomleft":h=[p+c,f+c];break;case"bottomright":h=[p+c,f];break}i.push({piece:d,vertex:h})});const l=i.filter(({vertex:d})=>{const[p,f]=d;return(n-p)**2+(s-f)**2<r**2});return l.length===0?null:l.reduce((d,p)=>{const{vertex:[f,h]}=p,{vertex:[w,g]}=d,v=(n-f)**2+(s-h)**2,E=(n-w)**2+(s-g)**2;return v<E?p:d},l[0])}function qe(e){if(e.length===0)return{correct:!0,incorrectPiece:null};const t=e[0].get("size"),o=2;for(let r=0;r<e.length-1;r+=1){const n=e[r],s=e[r+1],[c,i]=n.get("pos"),[l,u]=n.get("index"),[d,p]=s.get("pos"),[f,h]=s.get("index");if(!(Math.abs((h-u)*t-(d-c))<o&&Math.abs((f-l)*t-(p-i))<o))return{correct:!1,incorrectPiece:s}}return{correct:!0,incorrectPiece:null}}const Qe=[{cx1:0,cy1:0,cx2:35,cy2:15,ex:37,ey:5},{cx1:37,cy1:5,cx2:40,cy2:0,ex:38,ey:-5},{cx1:38,cy1:-5,cx2:20,cy2:-20,ex:50,ey:-20},{cx1:50,cy1:-20,cx2:80,cy2:-20,ex:62,ey:-5},{cx1:62,cy1:-5,cx2:60,cy2:0,ex:63,ey:5},{cx1:63,cy1:5,cx2:65,cy2:15,ex:100,ey:0}];function et(e,t,o){const r=t.get("size"),n=t.get("edges"),s=r*.2,c=r/100,i=tt(Qe,c),l=F(W(i,{y:n[0]}),{dx:s,dy:s}),u=F(_(W(i,{y:-n[1]})),{dx:s+r,dy:s}),d=F(W(i,{x:-1,y:-n[2]}),{dx:s+r,dy:s+r}),p=F(_(W(i,{x:-1,y:n[3]})),{dx:s,dy:s+r});e.beginTextureFill({texture:o}),e.moveTo(s,s),R(e,l),R(e,u),R(e,d),R(e,p),e.closePath()}function F(e,{dx:t=0,dy:o=0}){return e.map(({cx1:r,cy1:n,cx2:s,cy2:c,ex:i,ey:l})=>({cx1:r+t,cy1:n+o,cx2:s+t,cy2:c+o,ex:i+t,ey:l+o}))}function tt(e,t){return e.map(({cx1:o,cy1:r,cx2:n,cy2:s,ex:c,ey:i})=>({cx1:o*t,cy1:r*t,cx2:n*t,cy2:s*t,ex:c*t,ey:i*t}))}function W(e,{x:t=1,y:o=1}={}){return e.map(({cx1:r,cy1:n,cx2:s,cy2:c,ex:i,ey:l})=>{const u=t,d=o;return{cx1:r*u,cy1:n*d,cx2:s*u,cy2:c*d,ex:i*u,ey:l*d}})}function _(e){return e.map(({cx1:t,cy1:o,cx2:r,cy2:n,ex:s,ey:c})=>({cx1:o,cy1:t,cx2:n,cy2:r,ex:c,ey:s}))}function R(e,t){t.forEach(o=>{const{cx1:r,cy1:n,cx2:s,cy2:c,ex:i,ey:l}=o;e.bezierCurveTo(r,n,s,c,i,l)})}const ot=({piece:e})=>{const t=Ze(),{baseTextures:{jigsaw:o},pieces:r}=$e(),[{pos:[n,s],index:[c,i],size:l},{updatePos:u}]=Je(e),d=a.exports.useRef(!1),p=a.exports.useRef(null),[f,h]=a.exports.useState(J.WHITE),w=l*.2,g=a.exports.useCallback(b=>{switch(b.data.button){default:const{x:P,y:j}=t.toWorld(b.data.global),D=[P-n,j-s];d.current=!0,p.current=D,t.drag({pressDrag:!1});break}},[n,s]),v=a.exports.useCallback(()=>{d.current=!1,p.current=null,t.drag({pressDrag:!0}),Ge(e,r,{tolerance:20/t.scaled});const{correct:b,incorrectPiece:P}=qe(r);console.log(`Complete: ${b}`),console.log("incorrectPiece:",P)},[e,r]),E=a.exports.useCallback(b=>{if(!d.current)return;const{x:P,y:j}=t.toWorld(b.data.global),[D,he]=p.current,xe=P-D,fe=j-he;u([xe,fe])},[u]);a.exports.useEffect(()=>{if(!o)return;const b=new Ae(i*l-w,c*l-w,l+w*2,l+w*2);h(new J(o,b))},[o,c,i,l]);const A=a.exports.useCallback(b=>{et(b,e,f)},[f,c,i,l]);return o?y(I.exports.Graphics,{draw:A,x:n,y:s,interactive:!0,pointerdown:g,pointerup:v,pointerupoutside:v,pointermove:E}):null};var nt=a.exports.memo(ot);const st=({fill:e="white",stroke:t="#161320"})=>y("svg",{width:"24",height:"34",viewBox:"0 0 1000 1410",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:y("path",{d:"M18.4444 16.5569c.0142-.0106.0282-.021.042-.0312.0502-.0146.1038-.0297.1607-.0452.8847.7126 2.0524 1.6903 3.5712 3.0195 6.982 6.1102 19.2077 17.7025 41.4779 39.5413C108.081 102.567 191.228 185.665 349.473 344.01l.007.007C515.589 510.026 598.667 593.055 640.242 635.56c20.925 21.394 30.897 32.081 35.648 37.805.551.664.991 1.213 1.339 1.661-.05.257-.106.51-.167.755-.04.165-.08.314-.118.446-2.125.434-6.713 1.049-16.215 1.502-23.72 1.133-70.433 1.132-166.186 1.131H293.99c-4.451 0-8.701 1.854-11.728 5.117L151.713 824.665c0 .001-.001.001-.001.002-35.878 38.651-68.9219 74.035-93.2251 99.867-12.1563 12.92-22.1021 23.426-29.1144 30.747-3.5138 3.669-6.2462 6.491-8.1354 8.404.1057.107-.2077.21-.3063.309-.4869-.033-1.0679-.135-1.6858-.336-.3643-.118-.6886-.253-.9692-.391-.0186-.372-.0375-.776-.0565-1.212-.1719-3.935-.3333-9.89-.481-18.233-.2948-16.649-.5279-42.35-.7072-79.416-.3585-74.107-.5011-193.372-.5011-375.896 0-224.09.0501-343.076.5059-406.5301.2284-31.8013.5577-49.3749 1.0165-59.19.1319-2.8218.2677-4.8257.392-6.233ZM678.371 675.854c-.001 0-.001.001-.001.001l.001-.001Zm-.893-3.172c0-.003.001.017.002.066-.002-.04-.002-.063-.002-.066ZM16.3947 14.8001c0-.0001.0043.0024.013.0077-.0086-.005-.013-.0076-.013-.0077Zm2.4056-1.0141c.0035.0076-.0167.1247-.0713.3286.0404-.2342.0677-.3362.0713-.3286Z",fill:e,stroke:t,strokeWidth:"90",strokeLinejoin:"round"})}),rt=({autoFocus:e=!1,placeholder:t,onChange:o,value:r})=>L("div",{css:m`
        display: inline-grid;
        align-items: center;
        justify-items: start;
      `,children:[x("input",{autoFocus:e,spellCheck:"false",autoComplete:"off",type:"text",placeholder:t,value:r,onChange:o,maxLength:60,css:m`
          grid-area: 1 / 1 / 2 / 2;
          margin-top: 0;
          padding: 0;
          width: 100%;

          color: var(--color-black0);
          background: none;
          &::placeholder {
            color: #00000066;
          }
        `}),x("span",{css:m`
          visibility: hidden;
          grid-area: 1 / 1 / 2 / 2;
          font-weight: bold;
          font-size: 13px;
          white-space: pre;
        `,children:r||t})]}),ct=({name:e,text:t,onChange:o=()=>null,background:r="white",chatting:n=!1,isUser:s=!1})=>{const c="0.1s all ease";return L("div",{css:m`
        transform: translate(12px, -14px);
        padding: ${n?"8px 12px":"4px 6px"};
        display: inline-grid;
        gap: 4px;
        border: 2px solid #000000d5;
        border-radius: ${n?15:0}px;
        border-top-left-radius: 0px;
        background: ${r};
        transition: ${c};
      `,children:[e&&x("div",{css:m`
            white-space: pre;
            font-size: ${n?8:10}px;
            font-weight: ${n?600:700};
            transition: ${c};
          `,children:e}),n&&x(rt,{autoFocus:s,value:t,onChange:o,placeholder:"Say something"})]})};var it=a.exports.memo(ct);const at=m`
  top: 0px;
  left: 0px;
  position: fixed;
  height: ${O}px;
  width: ${O}px;
  pointer-events: none;
  z-index: 1; /* react-tippy tooltips are set to z-index 0 */
`,lt=({pos:[e,t],name:o,color:r="var(--color-white)",chat:n="",chatting:s=!1,onChat:c=()=>null,active:i=!0,interpolate:l=!1,isUser:u=!1})=>{const d=i?r:"var(--color-black4)";return L("div",{css:at,style:{transform:`translate(${e}px, ${t}px)`},children:[x(st,{fill:d}),(s||o)&&x(it,{isUser:u,name:o,chatting:s,text:n,onChange:c,background:d})]})};var G=a.exports.memo(lt);const dt=({viewport:e})=>{const{user:{user:t,pos:o,chatting:r},users:n}=le(),{updateChat:s}=de(),[,c]=a.exports.useReducer(l=>!l,!0),i=a.exports.useCallback(l=>s(l.target.value),[s]);return a.exports.useEffect(()=>{if(!!e)return e.on("moved",c),()=>{e.off("moved",c)}},[e]),V(ee,{children:[e&&Object.entries(n).filter(([l])=>l!==(t==null?void 0:t.id)).map(([l,u])=>{const[d,p]=u.pos,{x:f,y:h}=e.toScreen({x:d,y:p});return-O<=f&&f<=e.screenWidth&&-O<=h&&h<=e.screenHeight?y(G,{name:u.name||"Anonymous",pos:[f,h],color:u.color,chatting:u.chat.length>0,chat:u.chat,active:u.active},l):null}),t&&y(G,{pos:o,chatting:r,chat:t.chat,color:t.color,onChat:i,active:t.active,isUser:!0})]})};function ut(e){return JSON.parse(JSON.stringify(e))}function pt(e,t,o=null){return Array.from({length:t},()=>Array.from({length:e},()=>ut(o)))}function K(e){const[t,o]=e;return`${t}-${o}`}function ht(e,t){const o=pt(e,t,[0,0,0,0]),r=new Set,n=[[0,0]];for(;n.length>0;){const s=n.pop(),[c,i]=s;if(r.has(K(s)))continue;r.add(K(s)),[[c-1,i],[c,i+1],[c+1,i],[c,i-1]].forEach((u,d)=>{const[p,f]=u;if(0<=p&&p<t&&0<=f&&f<e){const h=(d+2)%4,w=Math.random()<.5?-1:1;o[c][i][d]=w,o[p][f][h]=-w,n.push(u)}})}return o}function xt(e,t,o){const r=ht(e,t),n=[];for(let u=0;u<t;u+=1)for(let d=0;d<e;d+=1)n.push([u,d]);const s=ft(n),c=2*o,i=[];r.forEach((u,d)=>{u.forEach((p,f)=>{const h=new Le,[w,g]=s.pop(),v=se/2-e*c/2,E=re/2-t*c/2;h.set("pos",[v+g*c,E+w*c]),h.set("index",[d,f]),h.set("size",o),h.set("edges",p),i.push(h)})});const l=z.getArray("pieces");z.transact(()=>{l.delete(0,l.length),l.push(i)})}function ft(e){let t=e.length,o=null;for(;t!=0;)o=Math.floor(Math.random()*t),t-=1,[e[t],e[o]]=[e[o],e[t]];return e}function pe(e){return e.split(" ").slice(0,3).map(o=>o.charAt(0).toLocaleUpperCase()).join("")}const N=36,gt=({id:e,name:t="",color:o,active:r,idxFromEnd:n})=>{const s=te(),c=pe(t)||H[e.charCodeAt(0)%H.length],i=a.exports.useMemo(()=>({initial:{scale:0},animate:{scale:1,background:r?o:"var(--color-black4)"},exit:{scale:0,x:-(N+8)*n},transition:{background:{duration:.1}}}),[r,o,n]);return x(oe.exports.Tooltip,{title:t||"Anonymous",size:"small",position:"bottom",distance:20,duration:0,animation:"none",children:x($.div,S(k({layoutId:e,layout:"position"},i),{css:m`
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-black0);
          position: ${s?"static":"absolute"};
          width: ${N}px;
          height: ${N}px;
          border-radius: 50%;
          font-weight: bold;
          font-size: ${t?13:18}px;
          pointer-events: auto;
        `,children:c}))})};var mt=a.exports.memo(gt);const q=36,wt=({user:e})=>{const t=pe(e.name)||H[e.id.charCodeAt(0)%H.length];return L("li",{css:m`
        display: flex;
        align-items: center;
        gap: 12px;
        user-select: none;
      `,children:[x("div",{css:m`
          background: ${e.color};
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-black0);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          margin: 6px 0;
          font-weight: bold;
          font-size: 13px;
        `,children:t}),x("div",{css:m`
          overflow: hidden;
          max-width: 120px;
          white-space: pre;
          text-overflow: ellipsis;
        `,children:e.name||"Anonymous"})]})},yt=({users:e})=>x("ul",{css:m`
        padding: 0px 6px;
        margin: 0;
        max-height: 120px;
        overflow-y: auto;
      `,children:e.map(t=>x(wt,{user:t},t.id))}),vt={modifiers:{addZIndex:{enabled:!0,order:0,fn:e=>S(k({},e),{styles:S(k({},e.styles),{zIndex:0})})}}},bt={initial:{scale:0},animate:{scale:1},exit:{scale:0},transition:{background:{duration:.1}}},Ct=({users:e})=>{const t=te(),o=`+${e.length}`;return x(oe.exports.Tooltip,{html:x(yt,{users:e}),interactive:!0,position:"bottom",distance:20,duration:0,animation:"none",popperOptions:vt,children:x($.div,S(k({layoutId:"others",layout:"position"},bt),{css:m`
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-black0);
          background: var(--color-white);
          position: ${t?"static":"absolute"};
          width: ${q}px;
          height: ${q}px;
          border-radius: 50%;
          font-weight: bold;
          font-size: 13px;
          pointer-events: auto;
        `,children:o}))})},T=3,kt=()=>{const{users:e={}}=le(),t=a.exports.useMemo(()=>Object.values(e).sort((r,n)=>r.created-n.created),[e]),o=t.length;return x("div",{css:m`
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      `,children:L(B,{children:[t.slice(0,Math.min(o,T)).map((r,n)=>x(mt,{id:r.id,name:r.name,color:r.color,active:r.active,idxFromEnd:o-n-(o>T?2:1)},r.id)),o>T&&x(Ct,{users:t.slice(T,o)},"others")]})})},Et=()=>L("header",{css:m`
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        display: flex;
        justify-content: space-between;
        padding: 20px 24px;
        color: white;
        font-size: 18px;
        font-weight: bold;
        pointer-events: none;
      `,children:[x("div",{children:"Jigly"}),L("div",{css:m`
          display: flex;
          gap: 12px;
        `,children:[x(kt,{}),x("button",{css:m`
            background: var(--color-green);
            color: var(--color-black0);
          `,onClick:()=>{xt(16,11,78)},children:"New"}),x("button",{onClick:()=>{const e=z.getArray("pieces");e.delete(0,e.length)},children:"Clear"})]})]}),Pt=()=>x("a",{href:"https://github.com/calvincheng",target:"_blank",css:m`
        text-decoration: none;
        color: var(--color-grey1);
        font-size: 14px;
        font-weight: 500;
      `,children:"calvincheng"}),St=()=>x("footer",{css:m`
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100vw;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        padding: 20px 24px;
        color: #ffffff88;
        pointer-events: none;
      `,children:x(Pt,{})});function At(){const{width:e,height:t}=Ue(),{pieces:o}=Ye(),r=a.exports.useRef(),n=a.exports.useCallback(i=>{i.preventDefault()},[]),s=e,c=t;return y(ee,{children:V(Ve,{viewport:r.current,children:[y(I.exports.Stage,{width:s,height:c,options:{backgroundColor:1710118},onContextMenu:n,children:y(_e,{screenWidth:e,screenHeight:t,worldWidth:se,worldHeight:re,minScale:.1,maxScale:2,ref:r,children:y(ze,{pieces:o,children:o.map((i,l)=>y(nt,{piece:i},l))})})}),y(Et,{}),y(St,{}),y(dt,{viewport:r.current})]})})}Me.render(y(je.StrictMode,{children:y(At,{})}),document.getElementById("root"));
