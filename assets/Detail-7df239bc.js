import{s as S,_ as j,j as C,g as p,w as Z,v as W,o as d,c as r,b as t,n as b,F as D,d as w,t as h,x as E,p as N,q as R,u as X,y as U,z as Y,r as k,h as $,e as V,A as L,B as P,a as ee,i as te,C as ae,k as ne,D as se,E as B,f as A,H as F}from"./index-4fd5423a.js";import{S as oe}from"./Shoping-0f485bba.js";import"./order-65a2f2b1.js";function ie(a){return a&&(a=a.map(n=>n.includes("url")?n.split(/\(|\)/)[1]:n),a=a.filter(n=>{if(n!="none"&&n!=null)return n}),a=a.map(n=>n.split('"')[1])),a}function M(a){return S({url:`/detail/${a.category}/${a.id}`,method:"get"})}function ce(a){return S({url:"/detail/operation",method:"post",data:a})}function le(a){return S({url:"/userInfo/collection",method:"post",data:a})}function de(a){return S({url:"/detail/commitZan",method:"post",data:a})}function re(a){return S({url:"/detail/commitChd",method:"post",data:a})}const _e={name:"ImagesSwiper",props:{images:{type:Array,default:()=>[]}},setup(a){let n=C(()=>a.images.length),i=p(0);Z(n,(l,y)=>{i.value=l>=5?5:n.value});let e=p(""),u=p(0);const g=function(){let l=i.value-5;l<=0||(l>=4?(i.value-=4,e.value.style.transform=`translateX(${-(i.value-5)*20}%)`):(i.value-=l,e.value.style.transform=`translateX(${-(i.value-5)*20}%)`))},c=function(){let l=n.value-i.value;l<=0||(l>=4?(i.value+=4,e.value.style.transform=`translateX(${-(i.value-5)*20}%)`):(i.value+=l,e.value.style.transform=`translateX(${-(i.value-5)*20}%)`))},v=function(l){l.target!==l.currentTarget&&(u.value=l.target.dataset.index)};W(()=>{e.value=document.getElementsByClassName("img_swiper_wrapper")[0]});const f=C(()=>{var l;return(l=a.images[u.value])==null?void 0:l.replace("com/n5","com/n1")});return{preClick:g,nextClick:c,currentIndex:u,changeImg:v,getBigImg:f}}},ue={class:"wrapper"},me={class:"big_img"},ve=["src"],ge={class:"left_swiper"},fe={class:"img_swiper"},he=["src","data-index"];function pe(a,n,i,e,u,g){return d(),r("div",ue,[t("div",me,[t("img",{src:e.getBigImg,alt:""},null,8,ve)]),t("div",ge,[t("div",null,[t("i",{class:b(["iconfont","icon-shangyiyehoutuifanhui","pre"]),onClick:n[0]||(n[0]=(...c)=>e.preClick&&e.preClick(...c))})]),t("div",fe,[t("div",{class:"img_swiper_wrapper",onMouseover:n[1]||(n[1]=(...c)=>e.changeImg&&e.changeImg(...c))},[(d(!0),r(D,null,w(i.images,(c,v)=>(d(),r("img",{key:v,src:c,"data-index":v,alt:"展示图片",class:b(["img_item",v==e.currentIndex?"active":""])},null,10,he))),128))],32)]),t("div",null,[t("i",{class:b(["iconfont","icon-xiayiyeqianjinchakangengduo","next"]),onClick:n[2]||(n[2]=(...c)=>e.nextClick&&e.nextClick(...c))})])])])}const be=j(_e,[["render",pe],["__scopeId","data-v-fa636ee9"]]);const ye={name:"Price",props:{price:{type:[Number,String],default:"100"}}},T=a=>(N("data-v-a1b44867"),a=a(),R(),a),Ce={class:"wrapper"},xe={class:"price"},ke=T(()=>t("span",{class:"margin_right_10"},"校园价",-1)),De={class:"normal_price"},Ve={class:"plus"},we={class:"plus_price"},Ie=T(()=>t("span",{class:"plus_detail"},"PLUS会员专享价",-1)),Se=T(()=>t("span",{class:"plus_go"},"现在开通PLUS会员享限时特惠",-1)),je=E('<div class="compus_bean" data-v-a1b44867><span class="margin_right_10" data-v-a1b44867>校园豆</span><span class="compus_bean_" data-v-a1b44867>1000豆可以抵10元</span></div><div class="common_count" data-v-a1b44867><div class="common_count_text" data-v-a1b44867>累计评价</div><div class="common_count_bom" data-v-a1b44867>10+</div></div><div class="promotion" data-v-a1b44867><span class="margin_right_10" data-v-a1b44867>促 销</span><span class="promotion_text" data-v-a1b44867><span class="promotion_logo" data-v-a1b44867>多买优惠</span><div class="next_line" data-v-a1b44867>满2件,总价打9.50折;满3件,总价打9.0折</div></span></div>',3);function ze(a,n,i,e,u,g){return d(),r("div",Ce,[t("div",xe,[ke,t("span",De,h("￥"+i.price),1),t("div",Ve,[t("span",we,h("￥"+(i.price*.95).toFixed(2)),1),Ie,Se])]),je])}const Be=j(ye,[["render",ze],["__scopeId","data-v-a1b44867"]]);const Pe={name:"Commit",props:{commentData:{type:[Object,String],default:()=>{}},jid:{type:String,default:""},category:{type:String,defalut:""}},setup(a,{emit:n}){const i=X(),e=p(""),u=p(!1),g=C(()=>U(a.commentData.time)||"2022-01-03"),c=C(()=>{var s,m;return((m=(s=a.commentData)==null?void 0:s.children)==null?void 0:m.length)||0}),v=C(()=>{var s;return((s=a.commentData)==null?void 0:s.zanCount)||0}),f=C(()=>{var s;return((s=a.commentData)==null?void 0:s.val)||a.commentData}),l=C(()=>{var s;return((s=a.commentData)==null?void 0:s.score)||5}),y=C(()=>{var s,m;return(m=(s=a.commentData)==null?void 0:s.zanFroms)==null?void 0:m.includes(i.getters.userId)});return{time:g,commitCount:c,zanCount:v,content:f,score:l,zan:()=>{de({jid:a.jid,category:a.category,toUid:a.commentData.uid,cid:a.commentData.cid}).then(s=>{n("refresh")}).catch(s=>{console.log(s)})},isZan:y,commit:()=>{const s={jid:a.jid,cid:a.commentData.cid,category:a.category,val:e.value};re(s).then(m=>{n("refresh"),e.value=""}).catch(m=>{console.log(m)})},replyVal:e,dialogVisible:u,formatDate:U,hideName:Y}}},Ne=a=>(N("data-v-84abff49"),a=a(),R(),a),Re={class:"wrapper"},Te={class:"head_pic"},Ue={class:"star"},Ae={class:"head_pic_wrapper"},Fe={key:0,src:"",alt:""},Me={key:1,class:b(["iconfont","icon-anonymous"])},Ze={key:0,class:"head_vip"},Ee=Ne(()=>t("span",null,"超级会员",-1)),Xe=[Ee],$e={class:"content"},Le={class:"time"},qe={class:"zanCount"},He={class:"commitChild"},Oe={class:"commit_btn"},Ge={class:"child_name"},Je={class:"child_val"},Ke={class:"child_time"};function Qe(a,n,i,e,u,g){var f,l,y;const c=k("el-input"),v=k("el-button");return d(),r(D,null,[t("div",Re,[t("div",Te,[t("div",Ue,[(d(),r(D,null,w(5,_=>t("i",{key:_,class:b(["iconfont","icon-aixin","star_icon",e.score>=_?"active_star":"inactive_star"])},null,2)),64))]),t("div",Ae,[(f=i.commentData)!=null&&f.isAnonymous?(d(),r("img",Fe)):(d(),r("i",Me))]),(l=i.commentData)!=null&&l.isVip?$("",!0):(d(),r("div",Ze,Xe))]),t("div",$e,[t("div",null,h(e.content),1),t("span",Le,h(e.time),1),t("i",qe,h(e.zanCount),1),t("i",{class:b(["iconfont","icon-dianzan_kuai","zan",e.isZan?"isZan":""]),onClick:n[0]||(n[0]=(..._)=>e.zan&&e.zan(..._))},null,2),t("i",He,h(e.commitCount),1),t("i",{class:b(["iconfont","icon-pinglun","commit"]),onClick:n[1]||(n[1]=_=>e.dialogVisible=!e.dialogVisible)})])]),t("div",{class:b(["content_children",e.dialogVisible?"height_change":""])},[V(c,{modelValue:e.replyVal,"onUpdate:modelValue":n[2]||(n[2]=_=>e.replyVal=_),rows:4,type:"textarea"},null,8,["modelValue"]),t("div",Oe,[V(v,{size:"small",onClick:e.commit},{default:L(()=>[P("提交")]),_:1},8,["onClick"])]),(d(!0),r(D,null,w((y=i.commentData)==null?void 0:y.children,(_,x)=>(d(),r("div",{key:x,class:"child_wrapper"},[t("span",Ge,h(e.hideName(_.uid)+"："),1),t("span",Je,h(_.val),1),t("div",Ke,h(e.formatDate(_.time)),1)]))),128))],2)],64)}const We=j(Pe,[["render",Qe],["__scopeId","data-v-84abff49"]]);const Ye={name:"Detail",components:{ImagesSwiper:be,Price:Be,Commit:We,Shoping:oe},setup(a){const n=ee(),i=X(),e=p(!1),u=n.currentRoute.value.params.id,g=n.currentRoute.value.params.category,c=p({}),v=p(""),f=p(0),l={id:u,category:g},y=p(1),_=p([]),x=te({img:"",des:"",price:"",jid:u,count:1}),m=i.getters.receivingAddress.map(o=>({value:o.addr_id,label:o.user+" "+ae(o.receivingAddress)+" "+o.phoneNumber})),q=function(){},H=function(o){o.target!==o.currentTarget&&(f.value=o.target.dataset.index)},O=function(){e.value=!0},G=function(){const o=c.value.id;u&&ce({target:"shopBus",jid:o,count:Number(y.value),category:g}).then(z=>{F({message:"加入购物车成功",type:"success",offset:60}),B(i)})},J=function(){const o=c.value.id;u&&le({target:"collect",jid:o,category:g}).then(z=>{F({message:"收藏成功",type:"success",offset:60}),B(i)})};ne(()=>{M(l).then(o=>{c.value=o,x.img=o.images[0].replace("/n5/","/n1/"),x.des=o.productDescription,x.price=o.price;const z=c.value.id;return Promise.resolve(z)}).then(o=>se({jid:o,target:"footprint"})).then(o=>{B(i)},o=>{console.log(o)})});const K=C(()=>{var o;return`(${((o=c.value.comment)==null?void 0:o.length)>=10?"10+":""})`}),Q=C(()=>c.value.comment);return Z(()=>c.value.introductionPicture,()=>{_.value=ie(c.value.introductionPicture)}),{dialogTableVisible:e,detailData:c,count:y,address_value:v,handleChange:q,addBus:G,goodsCount:K,header_item_index:f,headerChange:H,proPic:_,shoucang:J,buy:O,detailDataComment:Q,buyData:x,jid:u,category:g,commitRefresh:()=>{M(l).then(o=>{c.value.comment=o.comment}).catch(o=>{console.log(o)})},receiveInfo:m}}},I=a=>(N("data-v-7db298ff"),a=a(),R(),a),et={class:"detail_wrapper"},tt={class:"left_swiper"},at=I(()=>t("div",{class:"middle"},null,-1)),nt={class:"right_detail"},st={class:"detail_text"},ot=I(()=>t("span",{class:""},null,-1)),it={class:"detail_price"},ct={class:"address"},lt=I(()=>t("span",{class:"margin-right-10"},"配 送 至",-1)),dt={class:"address-select"},rt=I(()=>t("span",{class:"address_count"},"80",-1)),_t={class:"count"},ut=I(()=>t("span",{class:"margin-right-10"},"数  量",-1)),mt={class:"counter"},vt=I(()=>t("div",{class:"pay_func"},[t("span",{class:"margin-right-10"},"支付方式"),t("span",{class:"func"},"微信"),t("span",null,"支付宝")],-1)),gt={class:"footer"},ft=E('<div class="service" data-v-7db298ff><span class="margin-right-10" data-v-7db298ff>服务说明</span><span data-v-7db298ff><i class="iconfont icon-kongxinduigou" data-v-7db298ff></i>1小时内发货 </span><span data-v-7db298ff><i class="iconfont icon-kongxinduigou" data-v-7db298ff></i>2天无理由退货 </span><span data-v-7db298ff><i class="iconfont icon-kongxinduigou" data-v-7db298ff></i>全校包邮 </span><br data-v-7db298ff><span class="next-line" data-v-7db298ff><i class="iconfont icon-kongxinduigou" data-v-7db298ff></i>延误必赔 </span></div>',1),ht={class:"picture_and_comment"},pt={key:0,class:"picture"},bt=["src"],yt={key:1,class:"commit"};function Ct(a,n,i,e,u,g){const c=k("ImagesSwiper"),v=k("Price"),f=k("el-option"),l=k("el-select"),y=k("el-input-number"),_=k("Commit"),x=k("Shoping");return d(),r(D,null,[t("div",et,[t("div",tt,[V(c,{images:e.detailData.images},null,8,["images"])]),at,t("div",nt,[t("div",st,[ot,P(" "+h(e.detailData.productDescription),1)]),t("div",it,[V(v,{price:e.detailData.price},null,8,["price"])]),t("div",ct,[lt,t("span",dt,[V(l,{modelValue:e.address_value,"onUpdate:modelValue":n[0]||(n[0]=s=>e.address_value=s),placeholder:"Select"},{default:L(()=>[(d(!0),r(D,null,w(e.receiveInfo,s=>(d(),A(f,{key:s.value,label:s.label,value:s.value},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),P(" 库存 "),rt]),t("div",_t,[ut,t("span",mt,[V(y,{modelValue:e.buyData.count,"onUpdate:modelValue":n[1]||(n[1]=s=>e.buyData.count=s),min:1,max:10,onChange:e.handleChange},null,8,["modelValue","onChange"])])]),vt,t("div",gt,[t("i",{class:b(["iconfont","icon-shoucang","shoucang"]),onClick:n[2]||(n[2]=(...s)=>e.shoucang&&e.shoucang(...s))}),t("div",{class:"buy",onClick:n[3]||(n[3]=(...s)=>e.buy&&e.buy(...s))},"立即购买"),t("div",{class:"bus",onClick:n[4]||(n[4]=(...s)=>e.addBus&&e.addBus(...s))},"加入购物车")]),ft])]),t("div",ht,[t("div",{class:"picture_and_comment_header",onClick:n[5]||(n[5]=(...s)=>e.headerChange&&e.headerChange(...s))},[t("div",{class:b(["header_item",e.header_item_index==0?"active_item":""]),"data-index":"0"}," 商品介绍 ",2),t("div",{class:b(["header_item",e.header_item_index==1?"active_item":""]),"data-index":"1"}," 商品评价"+h(e.goodsCount),3)]),e.header_item_index==0?(d(),r("div",pt,[(d(!0),r(D,null,w(e.proPic,(s,m)=>(d(),r("img",{key:m,src:s,alt:""},null,8,bt))),128))])):(d(),r("div",yt,[(d(!0),r(D,null,w(e.detailDataComment,(s,m)=>(d(),r("div",{key:m,class:"commit_item"},[V(_,{commentData:s,jid:e.jid,category:e.category,onRefresh:e.commitRefresh},null,8,["commentData","jid","category","onRefresh"])]))),128))]))]),e.dialogTableVisible?(d(),A(x,{key:0,dialogTableVisible:e.dialogTableVisible,buyData:e.buyData,propReceive:e.address_value,onShopClose:n[6]||(n[6]=s=>e.dialogTableVisible=!1)},null,8,["dialogTableVisible","buyData","propReceive"])):$("",!0)],64)}const wt=j(Ye,[["render",Ct],["__scopeId","data-v-7db298ff"]]);export{wt as default};
