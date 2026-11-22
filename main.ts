import*as F from'node:fs';
const T=`!2b%'+,0        *******&***&*** ***             AEEA!           &)              %%"%`+' '.repeat(172);
function run(p,q){
const n=p.length,A=new Int32Array(576),o=new Uint8Array(65536);
let s=0,c=0,l=0,pc=0,t=0,ip=0;
const end=x=>[o.slice(0,l),x];
for(;;){
if(t===1e6)return end(10);
if(pc<0|pc>=n)return end(9);
const op=p[pc],v=T.charCodeAt(op)-33;
if(v<0)return end(5);
const nx=pc+1+(v>>4),po=(v>>2)&3,pu=v&3;
if(nx>n)return end(9);
t++;
if(s<po)return end(2);
if(s-po+pu>256)return end(3);
pc=nx;
if(op>15&op<35&op!=23&op!=27){
const b=A[s-1],a=A[s-2];let r;
if(op<19)r=op==16?a+b:op==17?a-b:Math.imul(a,b);
else if(op<23){if(!b)return end(4);r=op==19?a/b:op==20?a%b:op==21?(a>>>0)/(b>>>0):(a>>>0)%(b>>>0);}
else if(op<27)r=op==24?a&b:op==25?a|b:a^b;
else if(op<31)r=op==28?a<<b:op==29?a>>b:a>>>b;
else r=op==32?a==b?1:0:op==33?a<b?1:0:(a>>>0)<(b>>>0)?1:0;
s-=2;A[s++]=r;continue;
}
switch(op){
case 0:return end(0);
case 1:A[s++]=p[nx-1]<<24>>24;break;
case 2:A[s++]=p[nx-4]|p[nx-3]<<8|p[nx-2]<<16|p[nx-1]<<24;break;
case 3:s--;break;
case 4:A[s]=A[s-1];s++;break;
case 5:[A[s-1],A[s-2]]=[A[s-2],A[s-1]];break;
case 6:A[s]=A[s-2];s++;break;
case 7:[A[s-3],A[s-2],A[s-1]]=[A[s-2],A[s-1],A[s-3]];break;
case 23:case 27:A[s-1]=op==23?-A[s-1]:~A[s-1];break;
case 48:case 49:case 50:{
const rel=(p[nx-2]|p[nx-1]<<8)<<16>>16;
if(op<49||(A[--s]==0)==(op==49))pc=nx+rel;
break;}
case 51:
if(c==64)return end(7);
A[512+c++]=pc;pc=p[nx-2]|p[nx-1]<<8;break;
case 52:
if(!c)return end(8);
pc=A[512+--c];break;
case 64:{
const a=A[s-1];
if(a<0|a>255)return end(6);
A[s-1]=A[a+256];break;}
case 65:{
const a=A[s-1];
if(a<0|a>255)return end(6);
s-=2;A[a+256]=A[s];break;}
case 80:{
const g=''+A[s-1];
if(l+g.length>65536)return end(11);
s--;
o.set(Buffer.from(g),l);l+=g.length;
break;}
case 81:
if(l>65535)return end(11);
o[l++]=A[--s]&255;break;
case 82:A[s++]=ip<q.length?q[ip++]:-1;break;
case 83:return end(A[--s]&255);
}
}
}
const I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output';
for(const id of F.readdirSync(I)){
let r;const d=I+'/'+id,e=O+'/'+id;
try{r=run(F.readFileSync(d+'/program.bin'),F.readFileSync(d+'/input.bin'));}
catch{r=[new Uint8Array,9];}
F.mkdirSync(e,{recursive:true});
F.writeFileSync(e+'/stdout.bin',r[0]);
F.writeFileSync(e+'/exit.txt',r[1]+'\n');
}
