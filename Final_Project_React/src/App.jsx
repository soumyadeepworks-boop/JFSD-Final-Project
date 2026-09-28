import {useEffect,useMemo,useState} from 'react'
import Navbar from './components/Navbar'
import CategoryCard from './components/CategoryCard'
import ProductCard from './components/ProductCard'
import CartDrawer from './components/CartDrawer'
import AuthModal from './components/AuthModal'
import CheckoutModal from './components/CheckoutModal'
import OrdersView from './components/OrdersView'
import AdminPanel from './components/AdminPanel'
import {api,messageFromError} from './utils/api'
import {getProductImage} from './data/images'

const fallbackCategories=[
 {categoryId:1,categoryName:'Electronics'},
 {categoryId:2,categoryName:'Fashion'},
 {categoryId:3,categoryName:'Home and Kitchen'},
 {categoryId:4,categoryName:'Beauty'},
 {categoryId:5,categoryName:'Gaming'},
]

function decodeJwt(token){try{const p=token.split('.')[1];return JSON.parse(atob(p.replace(/-/g,'+').replace(/_/g,'/')))}catch{return {}}}

export default function App(){
 const [categories,setCategories]=useState([]),[products,setProducts]=useState([]),[search,setSearch]=useState(''),[activeCategory,setActiveCategory]=useState('All'),[loading,setLoading]=useState(true),[error,setError]=useState('')
 const [cart,setCart]=useState(()=>JSON.parse(localStorage.getItem('shopnest-cart')||'[]')),[cartOpen,setCartOpen]=useState(false)
 const [user,setUser]=useState(()=>JSON.parse(localStorage.getItem('shopnest-user')||'null'))
 const [authMode,setAuthMode]=useState(null),[authError,setAuthError]=useState(''),[checkoutOpen,setCheckoutOpen]=useState(false),[ordersOpen,setOrdersOpen]=useState(false),[orders,setOrders]=useState([]),[adminOpen,setAdminOpen]=useState(false)

 const loadCatalogue=()=>Promise.all([api.get('/category'),api.get('/products')]).then(([c,p])=>{setCategories(c.data?.length?c.data:fallbackCategories);setProducts(p.data||[])}).catch(e=>setError(messageFromError(e)||'Could not load catalogue. Make sure Spring Boot is running on port 8080.')).finally(()=>setLoading(false))
 useEffect(()=>{loadCatalogue()},[])
 useEffect(()=>localStorage.setItem('shopnest-cart',JSON.stringify(cart)),[cart])

 const refreshUser=async token=>{
   if(!token)return
   const payload=decodeJwt(token),email=payload.sub
   try{
     const [users,roleRes]=await Promise.all([api.get('/users'),api.get(`/users/role?email=${encodeURIComponent(email)}`)])
     const record=(users.data||[]).find(x=>x.userEmail===email)||{}
     const roleRaw=typeof roleRes.data==='string'?roleRes.data:(roleRes.data?.role||'USER')
     const role=String(roleRaw).replace('ROLE_','').toUpperCase()
     const u={id:record.userId,name:record.userName,email,role}
     setUser(u);localStorage.setItem('shopnest-user',JSON.stringify(u))
   }catch{const u={email,role:email==='soumyadeepworks@gmail.com'?'ADMIN':'USER'};setUser(u);localStorage.setItem('shopnest-user',JSON.stringify(u))}
 }
 const login=async form=>{setAuthError('');try{const r=await api.post(`/users/login?email=${encodeURIComponent(form.email)}&password=${encodeURIComponent(form.password)}`);if(typeof r.data!=='string'||!r.data.includes('.'))throw new Error(String(r.data||'Invalid Email or Password'));localStorage.setItem('shopnest-token',r.data);await refreshUser(r.data);setAuthMode(null)}catch(e){setAuthError(messageFromError(e))}}
 const register=async form=>{setAuthError('');try{await api.post('/users/register',{userName:form.name,userEmail:form.email,userPassword:form.password});setAuthMode('login');setAuthError('Account created. Please log in.')}catch(e){setAuthError(messageFromError(e))}}
 const logout=()=>{localStorage.removeItem('shopnest-token');localStorage.removeItem('shopnest-user');setUser(null);setOrders([]);setAdminOpen(false)}

 const visibleProducts=useMemo(()=>{const t=search.trim().toLowerCase();return products.filter(p=>{const c=p.category?.categoryName||'';return(activeCategory==='All'||c.toLowerCase()===activeCategory.toLowerCase())&&(!t||p.productName.toLowerCase().includes(t)||c.toLowerCase().includes(t))})},[products,search,activeCategory])
 const addToCart=product=>{if(!user){setAuthMode('login');setAuthError('Please log in before adding products to your cart.');return}setCart(c=>{const ex=c.find(i=>i.productId===product.productId);return ex?c.map(i=>i.productId===product.productId?{...i,quantity:i.quantity+1}:i):[...c,{...product,quantity:1,image:getProductImage(product.productName,product.category?.categoryName)}]});setCartOpen(true)}
 const removeFromCart=item=>setCart(c=>c.filter(i=>i.productId!==item.productId))
 const changeQty=(item,delta)=>setCart(c=>c.map(i=>i.productId===item.productId?{...i,quantity:Math.max(1,i.quantity+delta)}:i))
 const openCheckout=()=>{if(!user){setCartOpen(false);setAuthMode('login');return}setCartOpen(false);setCheckoutOpen(true)}
 const placeOrder=async()=>{try{if(!user?.id)throw new Error('Could not identify your user account. Please log in again.');for(const item of cart){await api.post('/orders',{userId:user.id,productId:item.productId,quantity:item.quantity,totalPrice:Number(item.productPrice)*item.quantity})}setCart([]);setCheckoutOpen(false);await loadOrders();setOrdersOpen(true)}catch(e){alert(messageFromError(e))}}
 const loadOrders=async()=>{if(!user?.id)return;try{const r=await api.get(`/orders/user/${user.id}`);setOrders(r.data||[])}catch(e){setOrders([])}}
 const showOrders=async()=>{await loadOrders();setOrdersOpen(true)}
 const deleteOrder=async id=>{try{await api.delete(`/orders/${id}`);loadOrders()}catch(e){alert(messageFromError(e))}}

 return <div id="top" className="min-h-screen bg-slate-50 text-slate-900">
  <Navbar search={search} setSearch={setSearch} cartCount={cart.reduce((s,i)=>s+i.quantity,0)} onCart={()=>setCartOpen(true)} user={user} onLogin={()=>{setAuthError('');setAuthMode('login')}} onRegister={()=>{setAuthError('');setAuthMode('register')}} onLogout={logout} onOrders={showOrders} onAdmin={()=>setAdminOpen(true)}/>
  <main>
   <section className="relative overflow-hidden bg-slate-950"><div className="absolute -left-24 -top-32 h-80 w-80 rounded-full bg-indigo-600/30 blur-3xl"/><div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl"/><div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-28"><div className="flex flex-col justify-center"><span className="mb-5 w-fit rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.2em] text-indigo-200">Spring Boot × React E-Commerce</span><h1 className="max-w-3xl text-5xl font-black tracking-tight text-white sm:text-6xl">Everything you want.<br/><span className="text-indigo-400">One beautiful store.</span></h1><p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">Browse 100 products across five categories, search by name, filter by category, build your cart and place orders through your Spring Boot backend.</p><div className="mt-8 flex flex-wrap gap-3"><a href="#products" className="rounded-2xl bg-white px-6 py-3.5 text-sm font-black text-slate-950 hover:bg-indigo-50">Explore products →</a>{!user&&<button onClick={()=>setAuthMode('register')} className="rounded-2xl border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-black text-white hover:bg-white/15">Create account</button>}</div></div><div className="hidden items-center justify-center lg:flex"><div className="relative h-80 w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl"><img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=90" alt="Online shopping" className="h-full w-full object-cover opacity-90"/><div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"/><div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl"><p className="text-xs font-bold uppercase tracking-widest text-indigo-200">Catalogue</p><p className="mt-1 text-lg font-black text-white">100 products · 5 categories · Cart · Orders</p></div></div></div></div></section>
   <section id="categories" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"><div className="mb-7 flex items-end justify-between"><div><p className="text-xs font-black uppercase tracking-[.2em] text-indigo-600">Browse by type</p><h2 className="mt-2 text-3xl font-black tracking-tight">Shop categories</h2></div><button onClick={()=>setActiveCategory('All')} className="text-sm font-bold text-indigo-600">View all</button></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{(categories.length?categories:fallbackCategories).map(c=><CategoryCard key={c.categoryId} category={c} active={activeCategory===c.categoryName} onClick={()=>{setActiveCategory(c.categoryName);document.getElementById('products')?.scrollIntoView({behavior:'smooth'})}}/>)}</div></section>
   <section id="products" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8"><div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-black uppercase tracking-[.2em] text-indigo-600">The catalogue</p><h2 className="mt-2 text-3xl font-black">{activeCategory==='All'?'All products':activeCategory}</h2><p className="mt-1 text-sm text-slate-500">{visibleProducts.length} products shown</p></div><div className="flex flex-wrap gap-2"><button onClick={()=>setActiveCategory('All')} className={`rounded-xl px-4 py-2 text-sm font-bold ${activeCategory==='All'?'bg-slate-950 text-white':'bg-white ring-1 ring-slate-200'}`}>All</button>{(categories.length?categories:fallbackCategories).map(c=><button key={c.categoryId} onClick={()=>setActiveCategory(c.categoryName)} className={`rounded-xl px-4 py-2 text-sm font-bold ${activeCategory===c.categoryName?'bg-slate-950 text-white':'bg-white text-slate-600 ring-1 ring-slate-200'}`}>{c.categoryName}</button>)}</div></div>{error&&<div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">{error}</div>}{loading?<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{Array.from({length:8}).map((_,i)=><div key={i} className="h-80 animate-pulse rounded-3xl bg-slate-200"/>)}</div>:visibleProducts.length?<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{visibleProducts.map(p=><ProductCard key={p.productId} product={p} onAdd={addToCart}/>)}</div>:<div className="rounded-3xl border border-dashed bg-white p-14 text-center"><p className="text-4xl">⌕</p><h3 className="mt-3 text-lg font-black">No products found</h3><p className="mt-1 text-sm text-slate-500">Try another search or category.</p></div>}</section>
  </main>
  <footer className="border-t border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"><p>© 2026 ShopNest</p><p>React + Tailwind CSS + Axios · Spring Boot + MySQL + JWT</p></div></footer>
  <CartDrawer open={cartOpen} items={cart} onClose={()=>setCartOpen(false)} onRemove={removeFromCart} onQty={changeQty} onCheckout={openCheckout}/>
  {authMode&&<AuthModal mode={authMode} onClose={()=>setAuthMode(null)} onSubmit={authMode==='login'?login:register} error={authError}/>} 
  <CheckoutModal open={checkoutOpen} onClose={()=>setCheckoutOpen(false)} total={cart.reduce((s,i)=>s+Number(i.productPrice)*i.quantity,0)} user={user} onPlace={placeOrder}/>
  {ordersOpen&&<OrdersView orders={orders} products={products} onDelete={deleteOrder} onClose={()=>setOrdersOpen(false)}/>} 
  {adminOpen&&<AdminPanel api={api} messageFromError={messageFromError} onClose={()=>{setAdminOpen(false);loadCatalogue()}}/>}
 </div>
}
