import{i as N,r as D,j as R,d as i,o as h,g as w,f as b,p as n,t as V,h as k,m as l,w as r,F as x,s as y,q as F}from"./vendor.d3eff5ec.js";import{_ as U,a as C,d as E,m as T}from"./index.986d2493.js";import{d as q,b as S}from"./userHome.85656dd8.js";const B={name:"ReceiveAddr",props:{addrs:Object},setup(f){const o=N();let _=D(!1);const e=f.addrs,u=R({user:e.user||"",receivingAddress:C(e.receivingAddress)||"",phoneNumber:e.phoneNumber||"",email:e.email||"",head_add:C(e.receivingAddress).split("/")[0]||"",addr_id:e.addr_id||""});return{formData:u,addrDelete:()=>{q({target:"receivingAddress",val:{addr_id:u.addr_id}}).then(s=>{_.value=!1,E(o),y({message:"\u5220\u9664\u6210\u529F",type:"success",offset:60})},s=>{y({message:"\u5220\u9664\u5931\u8D25",type:"error",offset:60})})},dialogVisible:_}}},O={class:"addr_wrapper"},j={class:"header"},I=b("span",null,"\u662F\u5426\u79FB\u9664\u6B64\u5730\u5740",-1),M={class:"dialog-footer"};function P(f,o,_,e,u,g){const s=i("el-form-item"),v=i("el-form"),m=i("el-button"),A=i("el-dialog");return h(),w(x,null,[b("div",O,[b("div",j,[n(V(e.formData.user+" "+e.formData.head_add)+" ",1),b("i",{class:k(["iconfont","icon-guanbi","float_right"]),onClick:o[0]||(o[0]=p=>e.dialogVisible=!0)})]),l(v,{model:e.formData,class:"form"},{default:r(()=>[l(s,{label:"\u6536\u8D27\u4EBA :"},{default:r(()=>[n(V(e.formData.user),1)]),_:1}),l(s,{label:"\u6536\u8D27\u5730\u5740 :"},{default:r(()=>[n(V(e.formData.receivingAddress),1)]),_:1}),l(s,{label:"\u7535\u8BDD\u53F7\u7801 :"},{default:r(()=>[n(V(e.formData.phoneNumber),1)]),_:1}),l(s,{label:"\u90AE\u7BB1 :"},{default:r(()=>[n(V(e.formData.email),1)]),_:1})]),_:1},8,["model"])]),l(A,{modelValue:e.dialogVisible,"onUpdate:modelValue":o[2]||(o[2]=p=>e.dialogVisible=p),title:"\u786E\u5B9A\u79FB\u9664",width:"30%"},{footer:r(()=>[b("span",M,[l(m,{onClick:o[1]||(o[1]=p=>e.dialogVisible=!1)},{default:r(()=>[n("\u53D6\u6D88")]),_:1}),l(m,{type:"primary",onClick:e.addrDelete},{default:r(()=>[n("\u786E\u5B9A")]),_:1},8,["onClick"])])]),default:r(()=>[I]),_:1},8,["modelValue"])],64)}var z=U(B,[["render",P]]);const L={name:"ReceivingAddress",components:{ReceiveAddr:z},setup(){let f=D(!1),o=D("\u65B0\u589E\u6536\u8D27\u5730\u5740");const _=N(),e=T,u=D(),g=R({user:"",receivingAddress:"",phoneNumber:"",email:""});function s(){u.value.validate(c=>{if(c)g.addr_id=Date.now(),S(g).then(t=>{f.value=!1,E(_),console.log(t)},t=>{console.log(t)});else return console.log("error submit!!"),!1})}return{dialogTableVisible:f,title:o,formData:g,rules:{user:[{validator:(c,t,a)=>{t===""?a(new Error("\u8BF7\u8F93\u5165\u6536\u8D27\u4EBA")):a()},trigger:"change"}],receivingAddress:[{validator:(c,t,a)=>{t===""?a(new Error("\u8BF7\u9009\u62E9\u6536\u8D27\u5730\u5740")):a()},trigger:"change"}],phoneNumber:[{validator:(c,t,a)=>{t===""?a(new Error("\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801")):a()},trigger:"change"}],email:[{validator:(c,t,a)=>{t===""?a(new Error("\u8BF7\u8F93\u5165\u90AE\u7BB1")):a()},trigger:"change"}]},ruleFormRef:u,submitForm:s,addressSelectOptions:e,store:_}}},G={class:"wrapper_recA"},H={class:"footer"};function J(f,o,_,e,u,g){var a;const s=i("el-button"),v=i("el-input"),m=i("el-form-item"),A=i("el-cascader"),p=i("el-form"),c=i("el-dialog"),t=i("ReceiveAddr");return h(),w("div",G,[l(s,{onClick:o[0]||(o[0]=d=>e.dialogTableVisible=!0),class:"create_btn"},{default:r(()=>[n("\u65B0\u589E\u6536\u8D27\u5730\u5740")]),_:1}),l(c,{modelValue:e.dialogTableVisible,"onUpdate:modelValue":o[6]||(o[6]=d=>e.dialogTableVisible=d),title:e.title,width:490},{footer:r(()=>[b("div",H,[l(s,{onClick:o[5]||(o[5]=d=>e.dialogTableVisible=!1)},{default:r(()=>[n("\u53D6\u6D88")]),_:1}),l(s,{onClick:e.submitForm},{default:r(()=>[n("\u786E\u5B9A")]),_:1},8,["onClick"])])]),default:r(()=>[l(p,{ref:"ruleFormRef",model:e.formData,"status-icon":"",rules:e.rules,"label-width":"100px"},{default:r(()=>[l(m,{label:"\u6536\u8D27\u4EBA",required:"",prop:"user"},{default:r(()=>[l(v,{modelValue:e.formData.user,"onUpdate:modelValue":o[1]||(o[1]=d=>e.formData.user=d),placeholder:"\u7528\u6237\u540D",style:{width:"300px"}},null,8,["modelValue"])]),_:1}),l(m,{label:"\u6536\u8D27\u5730\u5740",required:"",prop:"receivingAddress"},{default:r(()=>[l(A,{modelValue:e.formData.receivingAddress,"onUpdate:modelValue":o[2]||(o[2]=d=>e.formData.receivingAddress=d),options:e.addressSelectOptions,onChange:f.handleAddress},null,8,["modelValue","options","onChange"])]),_:1}),l(m,{label:"\u624B\u673A\u53F7\u7801",required:"",prop:"phoneNumber"},{default:r(()=>[l(v,{modelValue:e.formData.phoneNumber,"onUpdate:modelValue":o[3]||(o[3]=d=>e.formData.phoneNumber=d),placeholder:"\u624B\u673A\u53F7",style:{width:"300px"}},null,8,["modelValue"])]),_:1}),l(m,{label:"\u90AE\u7BB1\u5730\u5740",required:"",prop:"email"},{default:r(()=>[l(v,{modelValue:e.formData.email,"onUpdate:modelValue":o[4]||(o[4]=d=>e.formData.email=d),style:{width:"300px"}},null,8,["modelValue"])]),_:1})]),_:1},8,["model","rules"])]),_:1},8,["modelValue","title"]),(h(!0),w(x,null,F((a=e.store.getters)==null?void 0:a.receivingAddress,d=>(h(),w("div",{key:d.addr_id},[l(t,{addrs:d},null,8,["addrs"])]))),128))])}var X=U(L,[["render",J]]);export{X as default};
