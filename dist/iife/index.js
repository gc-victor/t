(()=>{var L=Object.defineProperty;var u=(a,l)=>L(a,"name",{value:l,configurable:!0});var f=typeof global!="undefined"&&{}.toString.call(global)==="[object global]",m={};function E(a,...l){let c="",r=0,b=l.length;for(;r<b;){let e=a[r],t=l[r];if(f)c+=e+(Array.isArray(t)?t.join(""):t);else{let n=/on\w+="$/.test(e),o=typeof t=="function",p=n?e.replace(/on(\w+)="$/,`data-_on_="" data-_fn_${r}='${t}' data-_ev_${r}="$1" data-_arg_${r}="`):e,w=o?n?`${r}`:t():t instanceof Element||Array.isArray(t)?`<script data-_replace_='${r}'><\/script>`:t;c+=p+w}r++}if(c+=a[a.length-1],f)return c.replace(/\son\w+=".*?"/g,"").replace(/\skey=".*?"/g,"").replace(/>[\r\n ]+</g,"><").replace(/(<.*?>)|\s+/g,(e,t)=>t||" ").trim();let y=document.createElement("template");y.innerHTML=c;let _=y.content,i=0,g=[..._.querySelectorAll("[data-_replace_]")],v=g.length;for(;i<v;){let e=g[i],t=l[e.getAttribute("data-_replace_")];if(Array.isArray(t)){let n=0,o=t.length;for(;n<o;){let p=t[n]instanceof HTMLElement?t[n]:document.createTextNode(t[n]);e.parentNode.insertBefore(p,e),n++}e.parentNode.removeChild(e)}else e.parentNode.replaceChild(t,e);i++}let s=0,d=[..._.querySelectorAll("[data-_on_]")],$=d.length;for(;s<$;){let e=d[s];Object.keys(d[s].dataset).forEach(t=>{if(/^_ev_/.test(t)){let n=t.replace("_ev_",""),o=e.getAttribute(`data-_ev_${n}`);e.__key__=e.getAttribute("key"),e.__handler__=e.__handler__||{},e.__handler__[o]=l[e.getAttribute(`data-_arg_${n}`)],!m[o]&&document.addEventListener(o,N),m[o]=1,e.removeAttribute("data-_on_"),e.removeAttribute(`data-_fn_${n}`),e.removeAttribute(`data-_arg_${n}`),e.removeAttribute(`data-_ev_${n}`)}}),e.removeAttribute("key"),s++}let h=0,A=[..._.querySelectorAll("[key]")],k=A.length;for(;h<k;){let e=A[h];e.__key__=e.getAttribute("key"),e.removeAttribute("key"),h++}return _.children[0]}u(E,"t");var N=u(a=>{let l=a.target,c=a.type;for(;l!==null;){let r=l.__handler__&&l.__handler__[c];if(r){r(a);return}l=l.parentNode}},"handler"),j=E;})();
