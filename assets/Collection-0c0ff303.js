import{_ as D,g as k,a as x,u as B,k as j,r as f,o as d,c as _,e as s,A as n,F as b,H as C,E as A,b as i,t as E,d as N,h as U,B as v}from"./index-0598f3a8.js";import{g as R,d as S}from"./userHome-42eda77e.js";const F={name:"Collection",setup(V){const l=k([]),m=k(""),t=x(),u=k(!1),p=B(),a=e=>{l.value=[],R({ids:e}).then(r=>{Array.isArray(r)&&r.length>0&&r.forEach((c,z)=>{l.value.push({goods:{img:c.imgUrl,des:c.detail,category:c.category},jid:c.id,price:c.price.split("￥")[1],operation:["delete"]})})},r=>{console.log(r)})},y=e=>e.jid,g=e=>{u.value=!0,m.value=e.jid},h=()=>{S({val:m.value,target:"collect"}).then(async e=>{C({message:"删除成功",type:"success",offset:60}),await A(p),a(p.getters.collection)},e=>{C({message:"删除失败",type:"error",offset:60})}).finally(()=>{u.value=!1})},o=e=>{t.push({path:`/detail/${e?.goods?.category}/${e.jid}`})};return j(()=>{a(p.getters.collection)}),{getRowKeys:y,tableData:l,btnDelete:g,shoucangDelete:h,dialogVisible:u,goodClick:o}}},I=["onClick"],K=["src"],M={class:"operation_wrapper"},H=["onClick"],L={key:1},T=i("span",null,"是否移除此商品",-1),$={class:"dialog-footer"};function q(V,l,m,t,u,p){const a=f("el-table-column"),y=f("el-table"),g=f("el-button"),h=f("el-dialog");return d(),_(b,null,[s(y,{data:t.tableData,"row-key":t.getRowKeys},{default:n(()=>[s(a,{type:"selection","reserve-selection":!0,"row-key":"jid",width:"55"}),s(a,{label:"商品",width:"600"},{default:n(o=>[i("div",{class:"goods_wrapper",onClick:e=>t.goodClick(o.row)},[i("img",{src:o.row.goods.img,alt:""},null,8,K),i("div",null,E(o.row.goods.des),1)],8,I)]),_:1}),s(a,{prop:"price",label:"单价(元)",width:"120"}),s(a,{prop:"operation",label:"操作"},{default:n(o=>[i("div",M,[(d(!0),_(b,null,N(o.row.operation,(e,w)=>(d(),_(b,{key:w},[e=="delete"?(d(),_("div",{key:0,onClick:r=>t.btnDelete(o.row)},"删除",8,H)):e=="check"?(d(),_("div",L,"查看")):U("",!0)],64))),128))])]),_:1})]),_:1},8,["data","row-key"]),s(h,{modelValue:t.dialogVisible,"onUpdate:modelValue":l[1]||(l[1]=o=>t.dialogVisible=o),title:"确定移除",width:"30%"},{footer:n(()=>[i("span",$,[s(g,{onClick:l[0]||(l[0]=o=>t.dialogVisible=!1)},{default:n(()=>[v("取消")]),_:1}),s(g,{type:"primary",onClick:t.shoucangDelete},{default:n(()=>[v("确定")]),_:1},8,["onClick"])])]),default:n(()=>[T]),_:1},8,["modelValue"])],64)}const O=D(F,[["render",q]]);export{O as default};
