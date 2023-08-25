import{_ as q,u as z,a as H,g,k as L,r as h,o as f,c as v,e as r,A as u,b as a,B as S,t as B,f as O,h as E,F as R,H as D,j as G,E as I,d as J,p as Q,q as W}from"./index-8ec311e0.js";import{S as X}from"./Shoping-5b044796.js";import{a as Y,g as Z}from"./userHome-97f96ce9.js";import"./order-73abe36f.js";const $={name:"ShopBus",components:{Shoping:X},setup(m){const l=z(),x=H(),e=g();let C=g("0"),w=g("0.00"),c=g([]),b=g(!1),k=g(!1),y=g(""),V=[];const p=g([]),o=()=>{if(p.value.length<=0){D({message:"至少选择一种商品",type:"warning",offset:60});return}k.value=!0},_=t=>{V=t;let s=0,n=0,d=p.value.length;t.forEach(i=>{s+=i.count,n+=i.count*i.price}),C.value=s,w.value=n.toFixed(2),p.value.splice(0,d),t.forEach(i=>{p.value.push({jid:i.jid,img:i.goods.img,des:i.goods.des,price:i.price,count:G(()=>i.count),category:i.goods.category})})},T=t=>{e.value.toggleAllSelection()},A=t=>{t?t.forEach(s=>{e.value.toggleRowSelection(s,void 0)}):e.value.clearSelection()},N=t=>{let s=0,n=0;V.forEach(d=>{s+=d.count,n+=d.count*d.price}),C.value=s,w.value=n.toFixed(2)},U=()=>{D({message:"收藏成功",type:"success",offset:60})},F=t=>t.jid,M=()=>{Y({Ptarget:"shopBus",target:"jid",val:[y.value]}).then(async t=>{D({message:"删除成功",type:"success",offset:60}),await I(l),j(l.getters.shopBus)},t=>{D({message:"删除失败",type:"error",offset:60})}).finally(()=>{b.value=!1})},P=t=>{b.value=!0,y.value=t.jid},j=t=>{c.value=[];const s={ids:t.map(n=>n.jid)};Z(s).then(n=>{Array.isArray(n)&&n.length>0&&n.forEach((d,i)=>{c.value.push({goods:{img:d.imgUrl,des:d.detail,category:t[i].category},jid:d.id,price:d.price.split("￥")[1],count:1,operation:["delete"],curprice:0})})},n=>{console.log(n)})},K=t=>{var s;x.push({path:`/detail/${(s=t==null?void 0:t.goods)==null?void 0:s.category}/${t.jid}`})};return L(()=>{j(l.getters.shopBus)}),{multipleTableRef:e,handleSelectionChange:_,toggleSelection:A,handtoggleAllSelection:T,handleNumChange:N,moveToCol:U,tableData:c,totleCount:C,totlePrice:w,getRowKeys:F,shopBusDelete:M,dialogVisible:b,btnDelete:P,buyBtn:o,buyData:p,dialogTableVisible:k,myrefresh:async()=>{e.value.clearSelection(),await I(l),j(l.getters.shopBus)},goodClick:K}}},ee=m=>(Q("data-v-4a761463"),m=m(),W(),m),oe=["onClick"],te=["src"],le={class:"count_wrapper"},ae={class:"operation_wrapper"},ne={class:"operation_wrapper"},se=["onClick"],ie={key:1},re={class:"bottom_bar"},ce={class:"totle_count"},de={class:"totle_price"},ue=ee(()=>a("span",null,"是否移除此商品",-1)),ge={class:"dialog-footer"};function pe(m,l,x,e,C,w){const c=h("el-table-column"),b=h("el-input-number"),k=h("el-table"),y=h("el-button"),V=h("el-dialog"),p=h("Shoping");return f(),v(R,null,[r(k,{ref:"multipleTableRef",data:e.tableData,"row-key":e.getRowKeys,onSelectAll:e.handleSelectionChange,onSelect:e.handleSelectionChange},{default:u(()=>[r(c,{type:"selection","reserve-selection":!0,"row-key":"jid",width:"55"}),r(c,{label:"商品",width:"450"},{default:u(o=>[a("div",{class:"goods_wrapper",onClick:_=>e.goodClick(o.row)},[a("img",{src:o.row.goods.img,alt:""},null,8,te),a("div",null,B(o.row.goods.des),1)],8,oe)]),_:1}),r(c,{prop:"price",label:"单价(元)",width:"120"}),r(c,{prop:"count",label:"数量",width:"150"},{default:u(o=>[a("div",le,[r(b,{modelValue:o.row.count,"onUpdate:modelValue":_=>o.row.count=_,min:1,max:100,size:"small",onChange:e.handleNumChange},null,8,["modelValue","onUpdate:modelValue","onChange"])])]),_:1}),r(c,{prop:"curprice",label:"小计(元)",width:"120"},{default:u(o=>[a("div",ae,B((o.row.count*o.row.price).toFixed(2)),1)]),_:1}),r(c,{prop:"operation",label:"操作"},{default:u(o=>[a("div",ne,[(f(!0),v(R,null,J(o.row.operation,(_,T)=>(f(),v("div",{key:T},[_=="delete"?(f(),v("div",{key:0,onClick:A=>e.btnDelete(o.row)}," 删除 ",8,se)):_=="check"?(f(),v("div",ie,"查看")):E("",!0)]))),128))])]),_:1})]),_:1},8,["data","row-key","onSelectAll","onSelect"]),a("div",re,[a("span",{class:"margin_right_10",onClick:l[0]||(l[0]=(...o)=>e.handtoggleAllSelection&&e.handtoggleAllSelection(...o))},"全选"),a("span",{class:"margin_right_10",onClick:l[1]||(l[1]=o=>e.toggleSelection())},"取消选项"),a("span",{onClick:l[2]||(l[2]=(...o)=>e.moveToCol&&e.moveToCol(...o))},"移入收藏夹"),a("span",ce,[S(" 共有 "),a("i",null,B(e.totleCount),1),S(" 件商品 ")]),a("span",de,[S(" 总计 "),a("i",null,B(e.totlePrice),1)]),a("span",{class:"go_pay",onClick:l[3]||(l[3]=(...o)=>e.buyBtn&&e.buyBtn(...o))},"去支付")]),r(V,{modelValue:e.dialogVisible,"onUpdate:modelValue":l[5]||(l[5]=o=>e.dialogVisible=o),title:"确定移除",width:"30%"},{footer:u(()=>[a("span",ge,[r(y,{onClick:l[4]||(l[4]=o=>e.dialogVisible=!1)},{default:u(()=>[S("取消")]),_:1}),r(y,{type:"primary",onClick:e.shopBusDelete},{default:u(()=>[S("确定")]),_:1},8,["onClick"])])]),default:u(()=>[ue]),_:1},8,["modelValue"]),e.dialogTableVisible?(f(),O(p,{key:0,dialogTableVisible:e.dialogTableVisible,buyData:e.buyData,onMyrefresh:e.myrefresh,onShopClose:l[6]||(l[6]=o=>e.dialogTableVisible=!1)},null,8,["dialogTableVisible","buyData","onMyrefresh"])):E("",!0)],64)}const ye=q($,[["render",pe],["__scopeId","data-v-4a761463"]]);export{ye as default};