import{_ as x,u as B,j as C,g,y as R,r as p,o as d,c as n,b as o,e as a,A as l,F as m,E as D,d as w,t as f,B as y,p as I,q as S}from"./index-0598f3a8.js";import{r as O}from"./order-9b975a2b.js";const N={name:"Order",setup(r){const s=B(),h=C(()=>s.getters.shopHistory.filter(c=>c.isReceive==!1)),e=g(!1),u=g("");return{tableData:h,formatDate:R,receiveBtn:c=>{e.value=!0,u.value=c.row.did},dialogVisible:e,determineReceive:()=>{O({did:u.value}).then(()=>{D(s)}).finally(()=>{e.value=!1})}}}},T=r=>(I("data-v-3da18442"),r=r(),S(),r),E={class:"table_wrapper"},F={class:"goods_wrapper"},U=["src"],j={class:"middle"},q={class:"middle"},A={class:"operation_wrapper"},H=["onClick"],L={key:1},P=T(()=>o("span",null,"是否确定收货",-1)),z={class:"dialog-footer"};function G(r,s,h,e,u,k){const i=p("el-table-column"),c=p("el-table"),b=p("el-button"),V=p("el-dialog");return d(),n(m,null,[o("div",E,[a(c,{data:e.tableData,style:{width:"100%"},"max-height":"700",stripe:""},{default:l(()=>[a(i,{fixed:"",label:"商品信息",width:"320"},{default:l(t=>[(d(!0),n(m,null,w(t.row.goods,(_,v)=>(d(),n("div",{key:v},[o("div",F,[o("img",{src:_.img,alt:"商品图片"},null,8,U),o("div",null,f(_.des),1)])]))),128))]),_:1}),a(i,{prop:"count",label:"数量",width:"60"},{default:l(t=>[(d(!0),n(m,null,w(t.row.goods,(_,v)=>(d(),n("div",{key:v},[o("div",j,[o("div",null,f(_.count),1)])]))),128))]),_:1}),a(i,{prop:"finalPrice",label:"实付金额",width:"100"}),a(i,{prop:"did",label:"订单号",width:"200"}),a(i,{prop:"generateTime",label:"创建时间",width:"120"},{default:l(t=>[o("div",q,[o("div",null,f(e.formatDate(t.row.generateTime)),1)])]),_:1}),a(i,{label:"操作"},{default:l(t=>[o("div",A,[t.row.isReceive?(d(),n("div",L,"已收货")):(d(),n("div",{key:0,onClick:_=>e.receiveBtn(t)}," 确定收货 ",8,H))])]),_:1})]),_:1},8,["data"])]),a(V,{modelValue:e.dialogVisible,"onUpdate:modelValue":s[1]||(s[1]=t=>e.dialogVisible=t),title:"确定收货",width:"30%"},{footer:l(()=>[o("span",z,[a(b,{onClick:s[0]||(s[0]=t=>e.dialogVisible=!1)},{default:l(()=>[y("取消")]),_:1}),a(b,{type:"primary",onClick:e.determineReceive},{default:l(()=>[y("确定")]),_:1},8,["onClick"])])]),default:l(()=>[P]),_:1},8,["modelValue"])],64)}const M=x(N,[["render",G],["__scopeId","data-v-3da18442"]]);export{M as default};
