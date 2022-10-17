if(!window.NexT)window.NexT={};(function(){const o="next-config";const i={};let c={};const r=e=>JSON.parse(e||"{}");const s=e=>{const t=document.querySelector(`.${o}[data-name="${e}"]`);if(!t)return;const n=r(t.text);if(e==="main"){Object.assign(i,n)}else{c[e]=n}};s("main");window.CONFIG=new Proxy({},{get(e,t){let n;if(t in i){n=i[t]}else{if(!(t in c))s(t);n=c[t]}if(!(t in e)&&typeof n==="object"){e[t]={}}if(t in e){const o=e[t];if(typeof o==="object"&&typeof n==="object"){return new Proxy({...n,...o},{set(e,t,n){e[t]=n;o[t]=n;return true}})}return o}return n}});document.addEventListener("pjax:success",()=>{c={}})})();window.addEventListener("tabs:register",()=>{let{activeClass:t}=CONFIG.comments;if(CONFIG.comments.storage){t=localStorage.getItem("comments_active")||t}if(t){const e=document.querySelector(`a[href="#comment-${t}"]`);if(e){e.click()}}});if(CONFIG.comments.storage){window.addEventListener("tabs:click",t=>{if(!t.target.matches(".tabs-comment .tab-content .tab-pane"))return;const e=t.target.classList[1];localStorage.setItem("comments_active",e)})}HTMLElement.prototype.wrap=function(e){this.parentNode.insertBefore(e,this);this.parentNode.removeChild(this);e.appendChild(this)};(function(){const e=()=>document.dispatchEvent(new Event("page:loaded",{bubbles:true}));if(document.readyState==="loading"){document.addEventListener("readystatechange",e,{once:true})}else{e()}document.addEventListener("pjax:success",e)})();NexT.utils={registerExtURL:function(){document.querySelectorAll("span.exturl").forEach(e=>{const t=document.createElement("a");t.href=decodeURIComponent(atob(e.dataset.url).split("").map(e=>{return"%"+("00"+e.charCodeAt(0).toString(16)).slice(-2)}).join(""));t.rel="noopener external nofollow noreferrer";t.target="_blank";t.className=e.className;t.title=e.title;t.innerHTML=e.innerHTML;e.parentNode.replaceChild(t,e)})},registerCopyCode:function(){let e=document.querySelectorAll("figure.highlight");if(e.length===0)e=document.querySelectorAll("pre:not(.mermaid)");e.forEach(r=>{r.querySelectorAll(".code .line span").forEach(t=>{t.classList.forEach(e=>{t.classList.replace(e,`hljs-${e}`)})});if(!CONFIG.copycode.enable)return;let e=r;if(CONFIG.copycode.style!=="mac")e=r.querySelector(".table-container")||r;e.insertAdjacentHTML("beforeend",'<div class="copy-btn"><i class="fa fa-copy fa-fw"></i></div>');const i=r.querySelector(".copy-btn");i.addEventListener("click",()=>{const e=r.querySelector(".code")||r.querySelector("code");const t=e.innerText;if(navigator.clipboard){navigator.clipboard.writeText(t).then(()=>{i.querySelector("i").className="fa fa-check-circle fa-fw"},()=>{i.querySelector("i").className="fa fa-times-circle fa-fw"})}else{const n=document.createElement("textarea");n.style.top=window.scrollY+"px";n.style.position="absolute";n.style.opacity="0";n.readOnly=true;n.value=t;document.body.append(n);n.select();n.setSelectionRange(0,t.length);n.readOnly=false;const o=document.execCommand("copy");i.querySelector("i").className=o?"fa fa-check-circle fa-fw":"fa fa-times-circle fa-fw";n.blur();i.blur();document.body.removeChild(n)}});r.addEventListener("mouseleave",()=>{setTimeout(()=>{i.querySelector("i").className="fa fa-copy fa-fw"},300)})})},wrapTableWithBox:function(){document.querySelectorAll("table").forEach(e=>{const t=document.createElement("div");t.className="table-container";e.wrap(t)})},registerVideoIframe:function(){document.querySelectorAll("iframe").forEach(t=>{const e=["www.youtube.com","player.vimeo.com","player.youku.com","player.bilibili.com","www.tudou.com"].some(e=>t.src.includes(e));if(e&&!t.parentNode.matches(".video-container")){const n=document.createElement("div");n.className="video-container";t.wrap(n);const o=Number(t.width);const r=Number(t.height);if(o&&r){n.style.paddingTop=r/o*100+"%"}}})},registerScrollPercent:function(){const o=document.querySelector(".back-to-top");const r=document.querySelector(".reading-progress-bar");window.addEventListener("scroll",()=>{if(o||r){const t=document.body.scrollHeight-window.innerHeight;const n=t>0?Math.min(100*window.scrollY/t,100):0;if(o){o.classList.toggle("back-to-top-on",Math.round(n)>=5);o.querySelector("span").innerText=Math.round(n)+"%"}if(r){r.style.setProperty("--progress",n.toFixed(2)+"%")}}if(!Array.isArray(NexT.utils.sections))return;let e=NexT.utils.sections.findIndex(e=>{return e&&e.getBoundingClientRect().top>10});if(e===-1){e=NexT.utils.sections.length-1}else if(e>0){e--}this.activateNavByIndex(e)},{passive:true});o&&o.addEventListener("click",()=>{window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:0})})},registerTabsTag:function(){document.querySelectorAll(".tabs ul.nav-tabs .tab").forEach(r=>{r.addEventListener("click",e=>{e.preventDefault();if(r.classList.contains("active"))return;const t=r.parentNode;[...t.children].forEach(e=>{e.classList.toggle("active",e===r)});const n=document.getElementById(r.querySelector("a").getAttribute("href").replace("#",""));[...n.parentNode.children].forEach(e=>{e.classList.toggle("active",e===n)});n.dispatchEvent(new Event("tabs:click",{bubbles:true}));if(!CONFIG.stickytabs)return;const o=t.parentNode.getBoundingClientRect().top+window.scrollY+10;window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:o})})});window.dispatchEvent(new Event("tabs:register"))},registerCanIUseTag:function(){window.addEventListener("message",({data:e})=>{if(typeof e==="string"&&e.includes("ciu_embed")){const t=e.split(":")[1];const n=e.split(":")[2];document.querySelector(`iframe[data-feature=${t}]`).style.height=parseInt(n,10)+5+"px"}},false)},registerActiveMenuItem:function(){document.querySelectorAll(".menu-item a[href]").forEach(e=>{const t=e.pathname===location.pathname||e.pathname===location.pathname.replace("index.html","");const n=!CONFIG.root.startsWith(e.pathname)&&location.pathname.startsWith(e.pathname);e.classList.toggle("menu-item-active",e.hostname===location.hostname&&(t||n))})},registerLangSelect:function(){const e=document.querySelectorAll(".lang-select");e.forEach(e=>{e.value=CONFIG.page.lang;e.addEventListener("change",()=>{const t=e.options[e.selectedIndex];document.querySelectorAll(".lang-select-label span").forEach(e=>{e.innerText=t.text});window.location.href=t.dataset.href})})},registerSidebarTOC:function(){this.sections=[...document.querySelectorAll(".post-toc li a.nav-link")].map(n=>{const o=document.getElementById(decodeURI(n.getAttribute("href")).replace("#",""));n.addEventListener("click",e=>{e.preventDefault();const t=o.getBoundingClientRect().top+window.scrollY;window.anime({targets:document.scrollingElement,duration:500,easing:"linear",scrollTop:t,complete:()=>{history.pushState(null,document.title,n.href)}})});return o})},registerPostReward:function(){const e=document.querySelector(".reward-container button");if(!e)return;e.addEventListener("click",()=>{document.querySelector(".post-reward").classList.toggle("active")})},activateNavByIndex:function(e){const t=document.querySelectorAll(".post-toc li a.nav-link")[e];if(!t||t.classList.contains("active-current"))return;document.querySelectorAll(".post-toc .active").forEach(e=>{e.classList.remove("active","active-current")});t.classList.add("active","active-current");let n=t.parentNode;while(!n.matches(".post-toc")){if(n.matches("li"))n.classList.add("active");n=n.parentNode}const o=document.querySelector(".sidebar-panel-container");if(!o.parentNode.classList.contains("sidebar-toc-active"))return;window.anime({targets:o,duration:200,easing:"linear",scrollTop:o.scrollTop-o.offsetHeight/2+t.getBoundingClientRect().top-o.getBoundingClientRect().top})},updateSidebarPosition:function(){if(window.innerWidth<992||CONFIG.scheme==="Pisces"||CONFIG.scheme==="Gemini")return;const e=document.querySelector(".post-toc");let t=CONFIG.page.sidebar;if(typeof t!=="boolean"){t=CONFIG.sidebar.display==="always"||CONFIG.sidebar.display==="post"&&e}if(t){window.dispatchEvent(new Event("sidebar:show"))}},activateSidebarPanel:function(e){const t=200;const n=document.querySelector(".sidebar-inner");const o=document.querySelector(".sidebar-panel-container");const r=["sidebar-toc-active","sidebar-overview-active"];if(n.classList.contains(r[e]))return;window.anime({duration:t,targets:o,easing:"linear",opacity:0,translateY:[0,-20],complete:()=>{n.classList.replace(r[1-e],r[e]);window.anime({duration:t,targets:o,easing:"linear",opacity:[0,1],translateY:[-20,0]})}})},getScript:function(i,e={},t){if(typeof e==="function"){return this.getScript(i,{condition:t}).then(e)}const{condition:c=false,attributes:{id:a="",async:s=false,defer:l=false,crossOrigin:d="",dataset:u={},...m}={},parentNode:f=null}=e;return new Promise((e,t)=>{if(c){e()}else{const n=document.createElement("script");if(a)n.id=a;if(d)n.crossOrigin=d;n.async=s;n.defer=l;Object.assign(n.dataset,u);Object.entries(m).forEach(([e,t])=>{n.setAttribute(e,String(t))});n.onload=e;n.onerror=t;if(typeof i==="object"){const{url:o,integrity:r}=i;n.src=o;if(r){n.integrity=r;n.crossOrigin="anonymous"}}else{n.src=i}(f||document.head).appendChild(n)}})},loadComments:function(n,e){if(e){return this.loadComments(n).then(e)}return new Promise(o=>{const e=document.querySelector(n);if(!CONFIG.comments.lazyload||!e){o();return}const t=new IntersectionObserver((e,t)=>{const n=e[0];if(!n.isIntersecting)return;o();t.disconnect()});t.observe(e)})}};document.addEventListener("DOMContentLoaded",()=>{const e=CONFIG.sidebar.position==="right";const i={mouse:{},init:function(){window.addEventListener("mousedown",this.mousedownHandler.bind(this));window.addEventListener("mouseup",this.mouseupHandler.bind(this));document.querySelector(".sidebar-dimmer").addEventListener("click",this.clickHandler.bind(this));document.querySelector(".sidebar-toggle").addEventListener("click",this.clickHandler.bind(this));window.addEventListener("sidebar:show",this.showSidebar);window.addEventListener("sidebar:hide",this.hideSidebar)},mousedownHandler:function(e){this.mouse.X=e.pageX;this.mouse.Y=e.pageY},mouseupHandler:function(e){const i=e.pageX-this.mouse.X;const t=e.pageY-this.mouse.Y;const s=Math.hypot(i,t)<20&&e.target.matches(".main");if(s||e.target.matches("img.medium-zoom-image")){this.hideSidebar()}},clickHandler:function(){document.body.classList.contains("sidebar-active")?this.hideSidebar():this.showSidebar()},showSidebar:function(){document.body.classList.add("sidebar-active");const t=e?"fadeInRight":"fadeInLeft";document.querySelectorAll(".sidebar .animated").forEach((e,i)=>{e.style.animationDelay=100*i+"ms";e.classList.remove(t);setTimeout(()=>{e.classList.add(t)})})},hideSidebar:function(){document.body.classList.remove("sidebar-active")}};if(CONFIG.sidebar.display!=="remove")i.init();function t(){const e=document.querySelector(".footer");const i=document.querySelector("header.header").offsetHeight+document.querySelector(".main").offsetHeight+e.offsetHeight;e.classList.toggle("footer-fixed",i<=window.innerHeight)}t();window.addEventListener("resize",t);window.addEventListener("scroll",t,{passive:true})});NexT.boot={};NexT.boot.registerEvents=function(){NexT.utils.registerScrollPercent();NexT.utils.registerCanIUseTag();document.querySelector(".site-nav-toggle .toggle").addEventListener("click",e=>{e.currentTarget.classList.toggle("toggle-close");const t=document.querySelector(".site-nav");if(!t)return;t.style.setProperty("--scroll-height",t.scrollHeight+"px");document.body.classList.toggle("site-nav-on")});document.querySelectorAll(".sidebar-nav li").forEach((e,t)=>{e.addEventListener("click",()=>{NexT.utils.activateSidebarPanel(t)})});window.addEventListener("hashchange",()=>{const e=location.hash;if(e!==""&&!e.match(/%\S{2}/)){const t=document.querySelector(`.tabs ul.nav-tabs li a[href="${e}"]`);t&&t.click()}})};NexT.boot.refresh=function(){CONFIG.prism&&window.Prism.highlightAll();CONFIG.mediumzoom&&window.mediumZoom(".post-body :not(a) > img, .post-body > img",{background:"var(--content-bg-color)"});CONFIG.lazyload&&window.lozad(".post-body img").observe();CONFIG.pangu&&window.pangu.spacingPage();CONFIG.exturl&&NexT.utils.registerExtURL();NexT.utils.wrapTableWithBox();NexT.utils.registerCopyCode();NexT.utils.registerTabsTag();NexT.utils.registerActiveMenuItem();NexT.utils.registerLangSelect();NexT.utils.registerSidebarTOC();NexT.utils.registerPostReward();NexT.utils.registerVideoIframe()};NexT.boot.motion=function(){if(CONFIG.motion.enable){NexT.motion.integrator.add(NexT.motion.middleWares.header).add(NexT.motion.middleWares.postList).add(NexT.motion.middleWares.sidebar).add(NexT.motion.middleWares.footer).bootstrap()}NexT.utils.updateSidebarPosition()};document.addEventListener("DOMContentLoaded",()=>{NexT.boot.registerEvents();NexT.boot.refresh();NexT.boot.motion()});document.addEventListener("DOMContentLoaded",()=>{if(!CONFIG.path){console.warn("`hexo-generator-searchdb` plugin is not installed!");return}const n=new LocalSearch({path:CONFIG.path,top_n_per_article:CONFIG.localsearch.top_n_per_article,unescape:CONFIG.localsearch.unescape});const o=document.querySelector(".search-input");const t=()=>{if(!n.isfetched)return;const e=o.value.trim().toLowerCase();const t=e.split(/[-\s]+/);const s=document.querySelector(".search-result-container");let c=[];if(e.length>0){c=n.getResultItems(t)}if(t.length===1&&t[0]===""){s.classList.add("no-result");s.innerHTML='<div class="search-result-icon"><i class="fa fa-search fa-5x"></i></div>'}else if(c.length===0){s.classList.add("no-result");s.innerHTML='<div class="search-result-icon"><i class="far fa-frown fa-5x"></i></div>'}else{c.sort((e,t)=>{if(e.includedCount!==t.includedCount){return t.includedCount-e.includedCount}else if(e.hitCount!==t.hitCount){return t.hitCount-e.hitCount}return t.id-e.id});const r=CONFIG.i18n.hits.replace("${hits}",c.length);s.classList.remove("no-result");s.innerHTML=`<div class="search-stats">${r}</div>
        <hr>
        <ul class="search-result-list">${c.map(e=>e.item).join("")}</ul>`;if(typeof pjax==="object")pjax.refresh(s)}};n.highlightSearchWords(document.querySelector(".post-body"));if(CONFIG.localsearch.preload){n.fetchData()}if(CONFIG.localsearch.trigger==="auto"){o.addEventListener("input",t)}else{document.querySelector(".search-icon").addEventListener("click",t);o.addEventListener("keypress",e=>{if(e.key==="Enter"){t()}})}window.addEventListener("search:loaded",t);document.querySelectorAll(".popup-trigger").forEach(e=>{e.addEventListener("click",()=>{document.body.classList.add("search-active");setTimeout(()=>o.focus(),500);if(!n.isfetched)n.fetchData()})});const s=()=>{document.body.classList.remove("search-active")};document.querySelector(".search-pop-overlay").addEventListener("click",e=>{if(e.target===document.querySelector(".search-pop-overlay")){s()}});document.querySelector(".popup-btn-close").addEventListener("click",s);document.addEventListener("pjax:success",()=>{n.highlightSearchWords(document.querySelector(".post-body"));s()});window.addEventListener("keyup",e=>{if(e.key==="Escape"){s()}})});document.addEventListener("page:loaded",()=>{const e=document.querySelectorAll(".mermaid");if(e.length){NexT.utils.getScript(CONFIG.mermaid.js,{condition:window.mermaid}).then(()=>{e.forEach(e=>{const a=document.createElement("div");a.innerHTML=e.innerHTML;a.className=e.className;const t=e.parentNode;if(t.matches("pre")){t.parentNode.replaceChild(a,t)}else{t.replaceChild(a,e)}});mermaid.initialize({theme:CONFIG.darkmode&&window.matchMedia("(prefers-color-scheme: dark)").matches?CONFIG.mermaid.theme.dark:CONFIG.mermaid.theme.light,logLevel:4,flowchart:{curve:"linear"},gantt:{axisFormat:"%m/%d/%Y"},sequence:{actorMargin:50}});mermaid.init()})}});(function(){if(typeof CONFIG.quicklink.ignores==="string"){const e=`[${CONFIG.quicklink.ignores}]`;CONFIG.quicklink.ignores=JSON.parse(e)}let n=null;const i=()=>{if(n)n();if(!CONFIG.quicklink.enable)return;let i=CONFIG.quicklink.ignores||[];if(!Array.isArray(i)){i=[i]}n=quicklink.listen({timeout:CONFIG.quicklink.timeout,priority:CONFIG.quicklink.priority,ignores:[i=>i.includes("#"),i=>i===CONFIG.quicklink.url,...i]})};if(CONFIG.quicklink.delay){window.addEventListener("load",i);document.addEventListener("pjax:success",i)}else{document.addEventListener("page:loaded",i)}})();document.addEventListener("page:loaded",()=>{if(!CONFIG.page.comments)return;NexT.utils.loadComments("#disqus_thread").then(()=>NexT.utils.getScript(CONFIG.disqusjs.js,{condition:window.DisqusJS})).then(()=>{window.dsqjs=new DisqusJS({api:CONFIG.disqusjs.api||"https://disqus.com/api/",apikey:CONFIG.disqusjs.apikey,shortname:CONFIG.disqusjs.shortname,url:CONFIG.page.permalink,identifier:CONFIG.page.path,title:CONFIG.page.title});window.dsqjs.render(document.querySelector(".disqusjs"))})});document.addEventListener("pjax:send",()=>{if(window.dsqjs)window.dsqjs.destroy()});