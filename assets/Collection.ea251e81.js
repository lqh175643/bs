import{r as b,u as D,i as x,y as j,d as f,o as _,g as p,m as s,w as n,F as v,s as C,f as i,t as B,q as N,l as U,p as w}from"./vendor.d3eff5ec.js";import{_ as A,d as E}from"./index.986d2493.js";import{g as R,d as S}from"./userHome.85656dd8.js";const F={name:"Collection",setup(V){const l=b([]),y=b(""),t=D(),u=b(!1),g=x(),a=e=>{l.value=[],R({ids:e}).then(r=>{Array.isArray(r)&&r.length>0&&r.forEach((d,G)=>{l.value.push({goods:{img:d.imgUrl,des:d.detail,category:d.category},jid:d.id,price:d.price.split("\uFFE5")[1],operation:["delete"]})})},r=>{console.log(r)})},h=e=>e.jid,m=e=>{u.value=!0,y.value=e.jid},k=()=>{S({val:y.value,target:"collect"}).then(async e=>{C({message:"\u5220\u9664\u6210\u529F",type:"success",offset:60}),await E(g),a(g.getters.collection)},e=>{C({message:"\u5220\u9664\u5931\u8D25",type:"error",offset:60})}).finally(()=>{u.value=!1})},o=e=>{var c;t.push({path:`/detail/${(c=e==null?void 0:e.goods)==null?void 0:c.category}/${e.jid}`})};return j(()=>{a(g.getters.collection)}),{getRowKeys:h,tableData:l,btnDelete:m,shoucangDelete:k,dialogVisible:u,goodClick:o}}},I=["onClick"],K=["src"],M={class:"operation_wrapper"},q=["onClick"],L={key:1},T=i("span",null,"\u662F\u5426\u79FB\u9664\u6B64\u5546\u54C1",-1),$={class:"dialog-footer"};function z(V,l,y,t,u,g){const a=f("el-table-column"),h=f("el-table"),m=f("el-button"),k=f("el-dialog");return _(),p(v,null,[s(h,{data:t.tableData,"row-key":t.getRowKeys},{default:n(()=>[s(a,{type:"selection","reserve-selection":!0,"row-key":"jid",width:"55"}),s(a,{label:"\u5546\u54C1",width:"600"},{default:n(o=>[i("div",{class:"goods_wrapper",onClick:e=>t.goodClick(o.row)},[i("img",{src:o.row.goods.img,alt:""},null,8,K),i("div",null,B(o.row.goods.des),1)],8,I)]),_:1}),s(a,{prop:"price",label:"\u5355\u4EF7(\u5143)",width:"120"}),s(a,{prop:"operation",label:"\u64CD\u4F5C"},{default:n(o=>[i("div",M,[(_(!0),p(v,null,N(o.row.operation,(e,c)=>(_(),p(v,{key:c},[e=="delete"?(_(),p("div",{key:0,onClick:r=>t.btnDelete(o.row)},"\u5220\u9664",8,q)):e=="check"?(_(),p("div",L,"\u67E5\u770B")):U("",!0)],64))),128))])]),_:1})]),_:1},8,["data","row-key"]),s(k,{modelValue:t.dialogVisible,"onUpdate:modelValue":l[1]||(l[1]=o=>t.dialogVisible=o),title:"\u786E\u5B9A\u79FB\u9664",width:"30%"},{footer:n(()=>[i("span",$,[s(m,{onClick:l[0]||(l[0]=o=>t.dialogVisible=!1)},{default:n(()=>[w("\u53D6\u6D88")]),_:1}),s(m,{type:"primary",onClick:t.shoucangDelete},{default:n(()=>[w("\u786E\u5B9A")]),_:1},8,["onClick"])])]),default:n(()=>[T]),_:1},8,["modelValue"])],64)}var P=A(F,[["render",z]]);export{P as default};