import{_ as B,g as p,o as d,c as i,F as f,d as k,b as _,t as S,n as D,h as w,G as j,i as N,a as P,j as q,k as G,l as m,m as R,r as y,f as T,e as z,p as U,q as E}from"./index-4fd5423a.js";const V={name:"Category",props:{config:{type:Object,default:()=>({品牌:["良品铺子","三只松鼠","百草味"],零食类型:["休闲零食","肉干肉脯","饼干蛋糕","坚果炒货","蜜饯果干","巧克力"]})}},setup(u,{emit:a}){let c=p(new Set),e={};return{search:function(g){let n=g.target.dataset.index;const r=g.target.innerText;e[n]||(e[n]=new Set),e[n].has(r)?e[n].delete(r):e[n].add(r);let s=[];for(let o in e)s.push([...e[o]].join("|"));s=s.map(o=>{if(o)return"(?=.*?("+o+"))"}).join(""),c.value.has(r)?c.value.delete(r):c.value.add(r),a("barChange",s)},checked:c}}},F={class:"categorybar"},L={class:"parent"},O={class:"son"},M=["data-index"],A={key:0,class:"hr"};function H(u,a,c,e,l,g){return d(),i("div",F,[(d(!0),i(f,null,k(c.config,(n,r,s)=>(d(),i("div",{key:s,class:"wrapper"},[_("div",L,S(r),1),_("div",O,[(d(!0),i(f,null,k(n,o=>(d(),i("span",{key:o,class:D(["son_item",e.checked.has(o)?"checked":""]),"data-index":s,onClick:a[0]||(a[0]=(...h)=>e.search&&e.search(...h))},S(o),11,M))),128)),Object.keys(c.config).length-1!==s?(d(),i("div",A)):w("",!0)])]))),128))])}const J=B(V,[["render",H],["__scopeId","data-v-532ebc63"]]);const K={name:"Detail",components:{CategoryBar:J,Goods:j},props:{category:{type:String,default:""}},setup(u){const a=N({page:1,limit:30}),c=P(),e=p([]),l=p(decodeURI(window.location.href.split("?")[0].split("/").pop())),g=q(()=>(l.value=decodeURI(window.location.href.split("?")[0].split("/").pop()),m(l.value,a).then(t=>{n.value=Number(t.totalCount),e.value=t.data}).catch(t=>{throw t}),c.currentRoute.value.fullPath)),n=p(0),r=p(1),s=p(30),o=function(t){s.value=t,a.limit=t,a.page=1,C(l.value,a),b()},h=function(t){a.page=t,C(l.value,a),b()},x=function(t){a.searchLimit=t,C(l.value,a)};function C(t,I){m(t,I).then(v=>{n.value=Number(v.totalCount),e.value=v.data}).catch(v=>{throw v})}function b(){let t=null;t=setInterval(()=>{document.documentElement.scrollTop-=500,document.documentElement.scrollTop<=0&&(clearInterval(t),t=null)},50)}return G(()=>{m(l.value,a).then(t=>{n.value=Number(t.totalCount),e.value=t.data}).catch(t=>{throw t})}),{totalCount:n,currentPage:r,handleSizeChange:o,currentSize:s,handleCurrentChange:h,goodsDatas:e,barChange:x,query:a,isBar:R.includes(l),aa:g}}},Q=u=>(U("data-v-20de410e"),u=u(),E(),u),W={class:"goods"},X={style:{display:"none"}},Y=Q(()=>_("span",null,null,-1)),Z={class:"block"};function $(u,a,c,e,l,g){const n=y("CategoryBar"),r=y("Goods"),s=y("el-pagination");return d(),i(f,null,[e.isBar?(d(),T(n,{key:0,onBarChange:e.barChange},null,8,["onBarChange"])):w("",!0),_("div",W,[(d(!0),i(f,null,k(e.goodsDatas,(o,h)=>(d(),i("div",{key:h,class:"goods_item"},[z(r,{goodsData:o},null,8,["goodsData"])]))),128))]),_("div",X,S(e.aa),1),Y,_("div",Z,[z(s,{currentPage:e.query.page,"onUpdate:currentPage":a[0]||(a[0]=o=>e.query.page=o),"page-size":e.currentSize,"onUpdate:pageSize":a[1]||(a[1]=o=>e.currentSize=o),layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount,"page-sizes":[10,20,30,50,100],"default-page-size":30,onSizeChange:e.handleSizeChange,onCurrentChange:e.handleCurrentChange},null,8,["currentPage","page-size","total","onSizeChange","onCurrentChange"])])],64)}const te=B(K,[["render",$],["__scopeId","data-v-20de410e"]]);export{te as default};