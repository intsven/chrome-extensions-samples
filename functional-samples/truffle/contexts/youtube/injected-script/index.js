import { d } from '../../../chunks/index-34a19201.js';
import { o } from '../../../chunks/create-5399fd46.js';
import '../../../chunks/index-a34e90a0.js';
import '../../../chunks/transframe-provider-e657167f.js';

const n=[],a=[];d.onChange((({value:e})=>{a.forEach((t=>t(e)));}));o({namespace:"truffle-youtube-injected-api-v1",api:{pageInfoGet:(t,n)=>(n&&a.push(n),d.get()),adoptStyleSheetCss:(e,t)=>{var a;if(n.includes(t)||n.length>100)return;const s=new CSSStyleSheet;null===(a=s.replaceSync)||void 0===a||a.call(s,t),document.adoptedStyleSheets=[...document.adoptedStyleSheets,s],n.push(t);}},strictMode:!1});
