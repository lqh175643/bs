System.register(["./index-legacy-168a0bef.js","./userHome-legacy-4c4fcf31.js"],(function(e,t){"use strict";var l,o,i,a,r,d,n,p,s,c,g,u,y,b,h,w,f,_,m,k,v=document.createElement("style");return v.textContent=":deep(.table_wrapper) .el-table{opacity:.7}:deep(.el-table){opacity:.7;border-radius:10px}:deep(.content_left_bar){opacity:.7}:deep(.content_left_bar) .el-menu{border-radius:10px;overflow:hidden}:deep(.el-input__inner){opacity:.7}:deep(.el-textarea__inner){opacity:.7}:deep(.el-radio__inner){opacity:.7}:deep(.el-button){opacity:.7}:deep(.dialog_wrapper) .el-dialog__footer{height:70px}.goods_wrapper{display:flex;padding-right:60px}.goods_wrapper img{width:100px;height:100px;border-radius:5px}.goods_wrapper div{height:100px;margin-left:10px;font-size:20px;line-height:32px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:3}\n",document.head.appendChild(v),{setters:[e=>{l=e._,o=e.g,i=e.a,a=e.u,r=e.k,d=e.r,n=e.o,p=e.c,s=e.e,c=e.A,g=e.F,u=e.H,y=e.E,b=e.b,h=e.t,w=e.d,f=e.h,_=e.B},e=>{m=e.g,k=e.d}],execute:function(){const t={name:"Collection",setup(e){const t=o([]),l=o(""),d=i(),n=o(!1),p=a(),s=e=>{t.value=[],m({ids:e}).then((e=>{Array.isArray(e)&&e.length>0&&e.forEach(((e,l)=>{t.value.push({goods:{img:e.imgUrl,des:e.detail,category:e.category},jid:e.id,price:e.price.split("￥")[1],operation:["delete"]})}))}),(e=>{console.log(e)}))};return r((()=>{s(p.getters.collection)})),{getRowKeys:e=>e.jid,tableData:t,btnDelete:e=>{n.value=!0,l.value=e.jid},shoucangDelete:()=>{k({val:l.value,target:"collect"}).then((async e=>{u({message:"删除成功",type:"success",offset:60}),await y(p),s(p.getters.collection)}),(e=>{u({message:"删除失败",type:"error",offset:60})})).finally((()=>{n.value=!1}))},dialogVisible:n,goodClick:e=>{d.push({path:`/detail/${e?.goods?.category}/${e.jid}`})}}}},v=["onClick"],x=["src"],C={class:"operation_wrapper"},j=["onClick"],V={key:1},D=b("span",null,"是否移除此商品",-1),A={class:"dialog-footer"};e("default",l(t,[["render",function(e,t,l,o,i,a){const r=d("el-table-column"),u=d("el-table"),y=d("el-button"),m=d("el-dialog");return n(),p(g,null,[s(u,{data:o.tableData,"row-key":o.getRowKeys},{default:c((()=>[s(r,{type:"selection","reserve-selection":!0,"row-key":"jid",width:"55"}),s(r,{label:"商品",width:"600"},{default:c((e=>[b("div",{class:"goods_wrapper",onClick:t=>o.goodClick(e.row)},[b("img",{src:e.row.goods.img,alt:""},null,8,x),b("div",null,h(e.row.goods.des),1)],8,v)])),_:1}),s(r,{prop:"price",label:"单价(元)",width:"120"}),s(r,{prop:"operation",label:"操作"},{default:c((e=>[b("div",C,[(n(!0),p(g,null,w(e.row.operation,((t,l)=>(n(),p(g,{key:l},["delete"==t?(n(),p("div",{key:0,onClick:t=>o.btnDelete(e.row)},"删除",8,j)):"check"==t?(n(),p("div",V,"查看")):f("",!0)],64)))),128))])])),_:1})])),_:1},8,["data","row-key"]),s(m,{modelValue:o.dialogVisible,"onUpdate:modelValue":t[1]||(t[1]=e=>o.dialogVisible=e),title:"确定移除",width:"30%"},{footer:c((()=>[b("span",A,[s(y,{onClick:t[0]||(t[0]=e=>o.dialogVisible=!1)},{default:c((()=>[_("取消")])),_:1}),s(y,{type:"primary",onClick:o.shoucangDelete},{default:c((()=>[_("确定")])),_:1},8,["onClick"])])])),default:c((()=>[D])),_:1},8,["modelValue"])],64)}]]))}}}));
