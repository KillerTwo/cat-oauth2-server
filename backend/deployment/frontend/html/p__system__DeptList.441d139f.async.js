(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[52],{31199:function(G,b,e){"use strict";var g=e(22122),p=e(28991),O=e(81253),a=e(67294),Z=e(97676),d=["fieldProps","min","proFieldProps","max"],P=function(l,h){var E=l.fieldProps,n=l.min,o=l.proFieldProps,f=l.max,u=(0,O.Z)(l,d);return a.createElement(Z.Z,(0,g.Z)({mode:"edit",valueType:"digit",fieldProps:(0,p.Z)({min:n,max:f},E),ref:h,filedConfig:{defaultProps:{width:"100%"}},proFieldProps:o},u))};b.Z=a.forwardRef(P)},86615:function(G,b,e){"use strict";var g=e(88983),p=e(47933),O=e(22122),a=e(28991),Z=e(81253),d=e(67294),P=e(97676),c=e(22270),l=e(64893),h=["fieldProps","options","radioType","layout","proFieldProps","valueEnum"],E=d.forwardRef(function(u,s){var D=u.fieldProps,F=u.options,i=u.radioType,x=u.layout,Y=u.proFieldProps,H=u.valueEnum,I=(0,Z.Z)(u,h);return d.createElement(P.Z,(0,O.Z)({mode:"edit",valueType:i==="button"?"radioButton":"radio",ref:s,valueEnum:(0,c.h)(H,void 0)},I,{fieldProps:(0,a.Z)({options:F,layout:x},D),proFieldProps:Y,filedConfig:{customLightMode:!0}}))}),n=d.forwardRef(function(u,s){var D=u.fieldProps,F=u.children;return d.createElement(p.ZP,(0,O.Z)({},D,{ref:s}),F)}),o=(0,l.G)(n,{valuePropName:"checked",ignoreWidth:!0}),f=o;f.Group=E,f.Button=p.ZP.Button,f.displayName="ProFormComponent",b.Z=f},5966:function(G,b,e){"use strict";var g=e(22122),p=e(81253),O=e(67294),a=e(97676),Z=["fieldProps","proFieldProps"],d=["fieldProps","proFieldProps"],P="text",c=function(n){var o=n.fieldProps,f=n.proFieldProps,u=(0,p.Z)(n,Z);return O.createElement(a.Z,(0,g.Z)({mode:"edit",valueType:P,fieldProps:o,filedConfig:{valueType:P},proFieldProps:f},u))},l=function(n){var o=n.fieldProps,f=n.proFieldProps,u=(0,p.Z)(n,d);return O.createElement(a.Z,(0,g.Z)({mode:"edit",valueType:"password",fieldProps:o,proFieldProps:f,filedConfig:{valueType:P}},u))},h=c;h.Password=l,h.displayName="ProFormComponent",b.Z=h},19054:function(G,b,e){"use strict";var g=e(22122),p=e(81253),O=e(67294),a=e(97676),Z=["fieldProps","request","params","proFieldProps"],d=function(l,h){var E=l.fieldProps,n=l.request,o=l.params,f=l.proFieldProps,u=(0,p.Z)(l,Z);return O.createElement(a.Z,(0,g.Z)({mode:"edit",valueType:"treeSelect",fieldProps:E,ref:h,request:n,params:o,proFieldProps:f},u))},P=O.forwardRef(d);b.Z=P},84757:function(G,b,e){"use strict";e.r(b),e.d(b,{default:function(){return Ce}});var g=e(57338),p=e(25084),O=e(62999),a=e(54680),Z=e(66456),d=e(14246),P=e(58024),c=e(39144),l=e(57663),h=e(71577),E=e(43358),n=e(34041),o=e(47673),f=e(4107),u=e(9715),s=e(22712),D=e(49111),F=e(19650),i=e(62350),x=e(75443),Y=e(71153),H=e(60331),I=e(2824),T=e(8870),J=e(34792),W=e(48086),B=e(3182),q=e(94043),M=e.n(q),L=e(67294),fe=e(80853),re=e(37476),w=e(5894),te=e(19054),K=e(5966),ae=e(31199),ne=e(86615),ve=e(96459),V=e(37113),r=e(85893),he=function(v){return(0,r.jsxs)(re.Y,{modalProps:{destroyOnClose:!0},title:"\u4FEE\u6539\u83DC\u5355",width:"60%",visible:v.updateModalVisible,onVisibleChange:v.onCancel,onFinish:v.onSubmit,children:[(0,r.jsx)(w.A.Group,{children:(0,r.jsx)(te.Z,{initialValue:v.values.parentId,width:"md",label:"\u4E0A\u7EA7\u90E8\u95E8",request:(0,B.Z)(M().mark(function A(){var C;return M().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,V.mD)();case 2:return C=t.sent,t.abrupt("return",C.data);case 4:case"end":return t.stop()}},A)})),fieldProps:{fieldNames:{label:"label",value:"id",children:"children"},showCheckedStrategy:a.Z.SHOW_PARENT},rules:[{required:!0,message:"\u4E0A\u7EA7\u90E8\u95E8\u4E0D\u80FD\u4E3A\u7A7A"}],name:"parentId"})}),(0,r.jsxs)(w.A.Group,{children:[(0,r.jsx)(K.Z,{initialValue:v.values.deptName,rules:[{required:!0,message:"\u90E8\u95E8\u540D\u79F0\u5FC5\u586B"}],width:"md",name:"deptName",label:"\u90E8\u95E8\u540D\u79F0"}),(0,r.jsx)(ae.Z,{initialValue:v.values.orderNum,rules:[{required:!0,message:"\u663E\u793A\u6392\u5E8F\u5FC5\u586B"}],width:"md",name:"orderNum",label:"\u663E\u793A\u6392\u5E8F",min:0,max:999})]}),(0,r.jsxs)(w.A.Group,{children:[(0,r.jsx)(K.Z,{initialValue:v.values.leader,width:"md",name:"leader",label:"\u8D1F\u8D23\u4EBA"}),(0,r.jsx)(K.Z,{initialValue:v.values.phone,width:"md",name:"phone",label:"\u8054\u7CFB\u7535\u8BDD"})]}),(0,r.jsxs)(w.A.Group,{children:[(0,r.jsx)(K.Z,{initialValue:v.values.email,width:"md",name:"email",label:"\u90AE\u7BB1"}),(0,r.jsx)(ne.Z.Group,{initialValue:v.values.status,width:"md",name:"status",label:"\u90E8\u95E8\u72B6\u6001",options:[{label:"\u6B63\u5E38",value:"0"},{label:"\u505C\u7528",value:"1"}]})]})]})},Pe=he,Ee=e(83693),ye=e(8212),Ze=e(49101),De=e(73171),Me=function(){var _=(0,B.Z)(M().mark(function v(A){var C;return M().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return C=W.default.loading("\u6B63\u5728\u6DFB\u52A0"),t.prev=1,t.next=4,(0,V.Mj)((0,T.Z)({},A));case 4:return C(),W.default.success("Added successfully"),t.abrupt("return",!0);case 9:return t.prev=9,t.t0=t.catch(1),C(),W.default.error("Adding failed, please try again!"),t.abrupt("return",!1);case 14:case"end":return t.stop()}},v,null,[[1,9]])}));return function(A){return _.apply(this,arguments)}}(),ge=function(){var _=(0,B.Z)(M().mark(function v(A){var C;return M().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return C=W.default.loading("Configuring"),t.prev=1,t.next=4,(0,V.rT)((0,T.Z)({},A));case 4:return C(),W.default.success("Configuration is successful"),t.abrupt("return",!0);case 9:return t.prev=9,t.t0=t.catch(1),C(),W.default.error("Configuration failed, please try again!"),t.abrupt("return",!1);case 14:case"end":return t.stop()}},v,null,[[1,9]])}));return function(A){return _.apply(this,arguments)}}(),je=function(){var _=(0,B.Z)(M().mark(function v(A){var C;return M().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(C=W.default.loading("\u6B63\u5728\u5220\u9664"),A){t.next=3;break}return t.abrupt("return",!0);case 3:return t.prev=3,t.next=6,(0,V.HU)(A.map(function(Q){return Q.deptId}));case 6:return C(),W.default.success("\u5220\u9664\u6210\u529F"),t.abrupt("return",!0);case 11:return t.prev=11,t.t0=t.catch(3),C(),W.default.error("\u5220\u9664\u5931\u8D25, \u8BF7\u7A0D\u540E\u91CD\u8BD5"),t.abrupt("return",!1);case 16:case"end":return t.stop()}},v,null,[[3,11]])}));return function(A){return _.apply(this,arguments)}}(),Te=function(){var v=(0,L.useState)(!1),A=(0,I.Z)(v,2),C=A[0],N=A[1],t=(0,L.useState)(!1),Q=(0,I.Z)(t,2),Oe=Q[0],ee=Q[1],be=(0,L.useState)(!1),se=(0,I.Z)(be,2),le=se[0],Fe=se[1],Ae=(0,L.useState)(),ue=(0,I.Z)(Ae,2),R=ue[0],X=ue[1],Se=(0,L.useState)(0),ie=(0,I.Z)(Se,2),Ie=ie[0],xe=ie[1],We=(0,L.useState)([]),de=(0,I.Z)(We,2),Re=de[0],Ue=de[1],Be=(0,L.useState)(!1),oe=(0,I.Z)(Be,2),Le=oe[0],me=oe[1],$=function(y){me(!0),(0,V.kN)((0,T.Z)({},y)).then(function(j){me(!1);var m=(0,Ee.W)(j.data,"deptId");console.log("treeMenu: ",m),Ue(m)})},pe=[{title:"\u90E8\u95E8\u540D\u79F0",dataIndex:"deptName",key:"deptName"},{title:"\u6392\u5E8F",dataIndex:"orderNum",key:"orderNum"},{title:"\u72B6\u6001",dataIndex:"status",key:"status",render:function(y){var j=y==="0"?"green":"red",m=y==="0"?"\u6B63\u5E38":"\u505C\u7528";return(0,r.jsx)(H.Z,{color:j,children:m})}},{title:"\u521B\u5EFA\u65F6\u95F4",dataIndex:"createTime",key:"createTime"},{title:"\u64CD\u4F5C",dataIndex:"options",key:"options",render:function(y,j){return(0,r.jsxs)(F.Z,{size:"middle",children:[(0,r.jsxs)("a",{onClick:function(){X(j),ee(!0)},children:[(0,r.jsx)(ye.Z,{}),"\u4FEE\u6539"]}),(0,r.jsxs)("a",{onClick:function(){xe(j.deptId||0),N(!0)},children:[(0,r.jsx)(Ze.Z,{}),"\u65B0\u589E"]}),(0,r.jsx)(x.Z,{title:"\u786E\u5B9A\u8981\u5220\u9664\u83DC\u5355?",onConfirm:(0,B.Z)(M().mark(function m(){var k;return M().wrap(function(z){for(;;)switch(z.prev=z.next){case 0:return z.next=2,je([j]);case 2:k=z.sent,k&&$({});case 4:case"end":return z.stop()}},m)})),onCancel:function(){},okText:"\u786E\u5B9A",cancelText:"\u53D6\u6D88",children:(0,r.jsxs)("a",{children:[(0,r.jsx)(De.Z,{}),"\u5220\u9664"]})})]})}}];(0,L.useEffect)(function(){$({})},[]);var we=s.Z.useForm(),Ke=(0,I.Z)(we,1),ce=Ke[0];return(0,r.jsx)(fe.ZP,{children:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(c.Z,{bordered:!1,style:{width:"100%",marginBottom:20},children:(0,r.jsxs)(s.Z,{form:ce,name:"horizontal_login",layout:"inline",onFinish:function(y){$((0,T.Z)({},y))},children:[(0,r.jsx)(s.Z.Item,{name:"deptName",label:"\u90E8\u95E8\u540D\u79F0",children:(0,r.jsx)(f.Z,{placeholder:"\u90E8\u95E8\u540D\u79F0"})}),(0,r.jsx)(s.Z.Item,{label:"\u72B6\u6001",name:"status",children:(0,r.jsxs)(n.Z,{style:{width:200},children:[(0,r.jsx)(n.Z.Option,{value:"0",children:"\u6B63\u5E38"},0),(0,r.jsx)(n.Z.Option,{value:"1",children:"\u505C\u7528"},1)]})}),(0,r.jsx)(s.Z.Item,{shouldUpdate:!0,children:(0,r.jsx)(h.Z,{type:"primary",htmlType:"submit",children:"\u67E5\u8BE2"})}),(0,r.jsx)(s.Z.Item,{shouldUpdate:!0,children:(0,r.jsx)(h.Z,{type:"primary",htmlType:"button",onClick:function(){ce.resetFields(),$({})},children:"\u91CD\u7F6E"})})]})}),(0,r.jsx)(d.Z,{rowKey:"deptId",columns:pe,dataSource:Re,pagination:!1,loading:Le}),(0,r.jsxs)(re.Y,{modalProps:{destroyOnClose:!0},title:"\u6DFB\u52A0\u83DC\u5355",width:"70%",visible:C,onVisibleChange:N,onFinish:function(){var S=(0,B.Z)(M().mark(function y(j){var m;return M().wrap(function(U){for(;;)switch(U.prev=U.next){case 0:return U.next=2,Me(j);case 2:m=U.sent,m&&(N(!1),$({}));case 4:case"end":return U.stop()}},y)}));return function(y){return S.apply(this,arguments)}}(),children:[(0,r.jsx)(w.A.Group,{children:(0,r.jsx)(te.Z,{initialValue:Ie,width:"md",label:"\u4E0A\u7EA7\u90E8\u95E8",request:(0,B.Z)(M().mark(function S(){var y;return M().wrap(function(m){for(;;)switch(m.prev=m.next){case 0:return m.next=2,(0,V.mD)();case 2:return y=m.sent,m.abrupt("return",y.data);case 4:case"end":return m.stop()}},S)})),fieldProps:{fieldNames:{label:"label",value:"id",children:"children"},showCheckedStrategy:a.Z.SHOW_PARENT},rules:[{required:!0,message:"\u4E0A\u7EA7\u90E8\u95E8\u4E0D\u80FD\u4E3A\u7A7A"}],name:"parentId"})}),(0,r.jsxs)(w.A.Group,{children:[(0,r.jsx)(K.Z,{rules:[{required:!0,message:"\u90E8\u95E8\u540D\u79F0\u5FC5\u586B"}],width:"md",name:"deptName",label:"\u90E8\u95E8\u540D\u79F0"}),(0,r.jsx)(ae.Z,{rules:[{required:!0,message:"\u663E\u793A\u6392\u5E8F\u5FC5\u586B"}],width:"md",name:"orderNum",label:"\u663E\u793A\u6392\u5E8F",min:0,max:999})]}),(0,r.jsxs)(w.A.Group,{children:[(0,r.jsx)(K.Z,{width:"md",name:"leader",label:"\u8D1F\u8D23\u4EBA"}),(0,r.jsx)(K.Z,{width:"md",name:"phone",label:"\u8054\u7CFB\u7535\u8BDD"})]}),(0,r.jsxs)(w.A.Group,{children:[(0,r.jsx)(K.Z,{width:"md",name:"email",label:"\u90AE\u7BB1"}),(0,r.jsx)(ne.Z.Group,{initialValue:"0",width:"md",name:"status",label:"\u90E8\u95E8\u72B6\u6001",options:[{label:"\u6B63\u5E38",value:"0"},{label:"\u505C\u7528",value:"1"}]})]})]}),(0,r.jsx)(Pe,{onSubmit:function(){var S=(0,B.Z)(M().mark(function y(j){var m;return M().wrap(function(U){for(;;)switch(U.prev=U.next){case 0:return U.next=2,ge((0,T.Z)((0,T.Z)({},R),j));case 2:m=U.sent,m&&(ee(!1),X(void 0),$({}));case 4:case"end":return U.stop()}},y)}));return function(y){return S.apply(this,arguments)}}(),onCancel:function(y){y||(ee(!1),le||X(void 0))},updateModalVisible:Oe,values:R||{}}),(0,r.jsx)(p.Z,{width:600,visible:le,onClose:function(){X(void 0),Fe(!1)},closable:!1,children:(R==null?void 0:R.deptName)&&(0,r.jsx)(ve.Z,{column:2,title:R==null?void 0:R.deptName,request:(0,B.Z)(M().mark(function S(){return M().wrap(function(j){for(;;)switch(j.prev=j.next){case 0:return j.abrupt("return",{data:R||{}});case 1:case"end":return j.stop()}},S)})),params:{id:R==null?void 0:R.deptName},columns:pe})})]})})},Ce=Te},37113:function(G,b,e){"use strict";e.d(b,{mD:function(){return d},kN:function(){return c},Mj:function(){return h},rT:function(){return n},HU:function(){return f}});var g=e(8870),p=e(3182),O=e(94043),a=e.n(O),Z=e(55168);function d(s){return P.apply(this,arguments)}function P(){return P=(0,p.Z)(a().mark(function s(D){return a().wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.abrupt("return",(0,Z.WY)("/api/system/dept/treeselect",(0,g.Z)({method:"GET"},D||{})));case 1:case"end":return i.stop()}},s)})),P.apply(this,arguments)}function c(s,D){return l.apply(this,arguments)}function l(){return l=(0,p.Z)(a().mark(function s(D,F){return a().wrap(function(x){for(;;)switch(x.prev=x.next){case 0:return x.abrupt("return",(0,Z.WY)("/api/system/dept/list",(0,g.Z)({method:"GET",params:(0,g.Z)({},D)},F)));case 1:case"end":return x.stop()}},s)})),l.apply(this,arguments)}function h(s){return E.apply(this,arguments)}function E(){return E=(0,p.Z)(a().mark(function s(D){return a().wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.abrupt("return",(0,Z.WY)("/api/system/dept",{method:"POST",data:(0,g.Z)((0,g.Z)({},D),{},{status:0})}));case 1:case"end":return i.stop()}},s)})),E.apply(this,arguments)}function n(s){return o.apply(this,arguments)}function o(){return o=(0,p.Z)(a().mark(function s(D){return a().wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.abrupt("return",(0,Z.WY)("/api/system/dept",{method:"PUT",data:(0,g.Z)({},D)}));case 1:case"end":return i.stop()}},s)})),o.apply(this,arguments)}function f(s){return u.apply(this,arguments)}function u(){return u=(0,p.Z)(a().mark(function s(D){return a().wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return i.abrupt("return",(0,Z.WY)("/api/system/dept/".concat(D),{method:"DELETE"}));case 1:case"end":return i.stop()}},s)})),u.apply(this,arguments)}},83693:function(G,b,e){"use strict";e.d(b,{W:function(){return O}});var g=e(64254);function p(a,Z){var d;if(typeof Symbol=="undefined"||a[Symbol.iterator]==null){if(Array.isArray(a)||(d=(0,g.Z)(a))||Z&&a&&typeof a.length=="number"){d&&(a=d);var P=0,c=function(){};return{s:c,n:function(){return P>=a.length?{done:!0}:{done:!1,value:a[P++]}},e:function(o){throw o},f:c}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var l=!0,h=!1,E;return{s:function(){d=a[Symbol.iterator]()},n:function(){var o=d.next();return l=o.done,o},e:function(o){h=!0,E=o},f:function(){try{!l&&d.return!=null&&d.return()}finally{if(h)throw E}}}}function O(a,Z,d,P){var c={id:Z||"id",parentId:d||"parentId",children:P||"children"},l={},h={},E=[],n=p(a),o;try{for(n.s();!(o=n.n()).done;){var f=o.value,u=f[c.parentId];l[u]==null&&(l[u]=[]),h[f[c.id]]=f,l[u].push(f)}}catch(T){n.e(T)}finally{n.f()}var s=p(a),D;try{for(s.s();!(D=s.n()).done;){var F=D.value,i=F[c.parentId];h[i]==null&&E.push(F)}}catch(T){s.e(T)}finally{s.f()}for(var x=0,Y=E;x<Y.length;x++){var H=Y[x];I(H)}function I(T){if(l[T[c.id]]!==null&&(T[c.children]=l[T[c.id]]),T[c.children]){var J=p(T[c.children]),W;try{for(J.s();!(W=J.n()).done;){var B=W.value;I(B)}}catch(q){J.e(q)}finally{J.f()}}}return E}}}]);
