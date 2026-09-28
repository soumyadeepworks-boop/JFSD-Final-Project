// Product imagery is intentionally kept in the React frontend because Products has no image column.
// Every product gets an image through the name-aware resolver below. The first matching product-name rule wins.
const I={
 electronics:'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1200&q=90',
 fashion:'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=90',
 home:'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=90',
 beauty:'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1200&q=90',
 gaming:'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=90',
 laptop:'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=90',
 phone:'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=90',
 headphones:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=90',
 keyboard:'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=90',
 monitor:'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=90',
 mouse:'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=90',
 camera:'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=90',
 smartwatch:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=90',
 tablet:'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1200&q=90',
 speaker:'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=90',
 printer:'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=1200&q=90',
 router:'https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&w=1200&q=90',
 shoes:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=90',
 shirt:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=90',
 jeans:'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=90',
 jacket:'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=90',
 dress:'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1200&q=90',
 bag:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=90',
 watch:'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=90',
 sunglasses:'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=90',
 furniture:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=90',
 sofa:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=90',
 chair:'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=90',
 table:'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=90',
 kitchen:'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=90',
 cookware:'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=90',
 bottle:'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=90',
 lamp:'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=90',
 bedding:'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=90',
 skincare:'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1200&q=90',
 makeup:'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=90',
 perfume:'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=90',
 hair:'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=90',
 gaming:'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1200&q=90',
 console:'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=90',
 controller:'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=1200&q=90',
 vr:'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=1200&q=90',
 gamingchair:'https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=1200&q=90'
}
export const categoryImages={'electronics':I.electronics,'fashion':I.fashion,'home and kitchen':I.home,'beauty':I.beauty,'gaming':I.gaming}
// Rules are checked top to bottom on whole words only (so 'Portable' no longer matches 'table', 'Chair' no longer matches 'hair').
// More specific phrases come first.
const rules=[
 ['gaming chair',I.gamingchair],['vr headset',I.vr],['virtual reality',I.vr],['vr',I.vr],
 ['gaming mouse',I.mouse],['gaming keyboard',I.keyboard],['gaming monitor',I.monitor],['gaming headset',I.headphones],
 ['laptop bag',I.bag],['camera bag',I.bag],['water bottle',I.bottle],['smart watch',I.smartwatch],['smartwatch',I.smartwatch],['fitness band',I.smartwatch],
 ['wireless headphones',I.headphones],['headphones',I.headphones],['headphone',I.headphones],['headset',I.headphones],['earbuds',I.headphones],['earphones',I.headphones],['airpods',I.headphones],['microphone',I.headphones],
 ['mechanical keyboard',I.keyboard],['keyboard',I.keyboard],['monitor',I.monitor],['tv',I.monitor],['television',I.monitor],['mouse',I.mouse],
 ['laptop',I.laptop],['macbook',I.laptop],['notebook',I.laptop],['iphone',I.phone],['smartphone',I.phone],['phone',I.phone],['mobile',I.phone],['tablet',I.tablet],['ipad',I.tablet],
 ['camera',I.camera],['dslr',I.camera],['lens',I.camera],['webcam',I.camera],['speaker',I.speaker],['soundbar',I.speaker],['printer',I.printer],['router',I.router],['wifi',I.router],
 ['charger',I.electronics],['power bank',I.electronics],['powerbank',I.electronics],['cable',I.electronics],['adapter',I.electronics],
 ['console',I.console],['playstation',I.console],['ps5',I.console],['ps4',I.console],['xbox',I.console],['nintendo',I.console],['controller',I.controller],['gamepad',I.controller],['joystick',I.controller],
 ['sneaker',I.shoes],['shoe',I.shoes],['boot',I.shoes],['sandal',I.shoes],['slipper',I.shoes],['footwear',I.shoes],['heel',I.shoes],
 ['t-shirt',I.shirt],['tshirt',I.shirt],['shirt',I.shirt],['hoodie',I.shirt],['sweater',I.shirt],['top',I.shirt],['jeans',I.jeans],['trouser',I.jeans],['pant',I.jeans],['jacket',I.jacket],['coat',I.jacket],['dress',I.dress],['kurta',I.dress],['saree',I.dress],['skirt',I.dress],
 ['backpack',I.bag],['handbag',I.bag],['bag',I.bag],['wallet',I.bag],['sunglasses',I.sunglasses],['sunglass',I.sunglasses],['watch',I.watch],
 ['sofa',I.sofa],['couch',I.sofa],['chair',I.chair],['stool',I.chair],['table',I.table],['desk',I.table],['furniture',I.furniture],['shelf',I.furniture],['wardrobe',I.furniture],
 ['cookware',I.cookware],['pan',I.cookware],['pot',I.cookware],['mixer',I.kitchen],['blender',I.kitchen],['toaster',I.kitchen],['kettle',I.kitchen],['microwave',I.kitchen],['oven',I.kitchen],['cooker',I.kitchen],['fryer',I.kitchen],['kitchen',I.kitchen],
 ['bottle',I.bottle],['lamp',I.lamp],['light',I.lamp],['bedding',I.bedding],['bedsheet',I.bedding],['bed',I.bedding],['pillow',I.bedding],['mattress',I.bedding],['blanket',I.bedding],['curtain',I.bedding],
 ['skincare',I.skincare],['cream',I.skincare],['serum',I.skincare],['moisturizer',I.skincare],['lotion',I.skincare],['sunscreen',I.skincare],['face wash',I.skincare],['cleanser',I.skincare],
 ['makeup',I.makeup],['lipstick',I.makeup],['foundation',I.makeup],['mascara',I.makeup],['eyeliner',I.makeup],['cosmetic',I.makeup],
 ['perfume',I.perfume],['fragrance',I.perfume],['deodorant',I.perfume],['shampoo',I.hair],['conditioner',I.hair],['hair',I.hair],['trimmer',I.hair],['razor',I.hair],['gaming',I.gaming]
]
const esc=k=>k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')
const compiled=rules.map(([k,img])=>[new RegExp('(^|[^a-z0-9])'+esc(k)+'(s|es)?($|[^a-z0-9])'),img])
export function getCategoryImage(name=''){return categoryImages[name.trim().toLowerCase()]||I.electronics}
// No rule matched: ask a keyword image service for a photo of the last word of the product name (usually the noun), then fall back to the category image on error (see ProductCard).
function keywordImage(name){const w=name.toLowerCase().replace(/[^a-z0-9 ]/g,' ').split(/\s+/).filter(Boolean);const k=w[w.length-1];if(!k)return null;let h=0;for(const c of name)h=(h*31+c.charCodeAt(0))>>>0;return `https://loremflickr.com/800/600/${encodeURIComponent(k)}?lock=${h%1000}`}
// Exact image for every product in the catalogue (by product name). A plain word is one of the curated photos above;
// 'lf:word' is a photo of that word from loremflickr.com. Products not listed here still fall back to the keyword rules above.
const lf=(k,seed)=>{let h=0;for(const c of seed)h=(h*31+c.charCodeAt(0))>>>0;return `https://loremflickr.com/800/600/${encodeURIComponent(k)}?lock=${h%1000}`}
const byName={
 'wireless headphones':'headphones','bluetooth speaker':'speaker','wireless mouse':'mouse','mechanical keyboard':'keyboard','usb-c fast charger':'lf:charger','power bank 20000mah':'lf:powerbank','smart watch':'smartwatch','true wireless earbuds':'lf:earbuds','usb-c hub':'lf:usbhub','portable ssd 500gb':'lf:harddrive',
 'webcam full hd':'lf:webcam','gaming headset':'lf:headset','wi-fi router':'router','bluetooth keyboard':'keyboard','laptop cooling pad':'laptop','led monitor 24-inch':'monitor','smartphone tripod':'lf:tripod','smart led bulb':'lf:lightbulb','hdmi cable':'lf:hdmi','laptop stand':'lf:laptopstand',
 'casual t-shirt':'shirt','slim fit jeans':'jeans','cotton shirt':'shirt','hooded sweatshirt':'lf:hoodie','denim jacket':'jacket','chino pants':'lf:chinos','polo t-shirt':'lf:poloshirt','casual shorts':'lf:shorts','formal trousers':'lf:trousers','leather belt':'lf:belt',
 'running shoes':'shoes','casual sneakers':'shoes','baseball cap':'lf:baseballcap','cotton socks pack':'lf:socks','leather wallet':'lf:wallet','sunglasses':'sunglasses','kurta':'lf:kurta','track pants':'lf:sweatpants','winter jacket':'jacket','formal blazer':'lf:blazer',
 'non-stick frying pan':'cookware','stainless steel cookware set':'cookware','electric kettle':'lf:kettle','mixer grinder':'lf:blender','air fryer':'lf:airfryer','microwave oven':'lf:microwave','dinner set':'lf:dinnerware','glass storage containers':'lf:jar','water bottle':'bottle','kitchen knife set':'lf:knife',
 'cutting board':'lf:cuttingboard','electric rice cooker':'lf:ricecooker','table lamp':'lamp','wall clock':'lf:wallclock','cushion set':'lf:cushion','bedsheet set':'bedding','bathroom organizer':'lf:bathroom','floor mat':'lf:doormat','vacuum cleaner':'lf:vacuum','storage rack':'lf:shelf',
 'face wash':'skincare','moisturizer':'skincare','sunscreen spf 50':'lf:sunscreen','vitamin c serum':'lf:serum','aloe vera gel':'lf:aloevera','lip balm':'lf:lipbalm','face scrub':'lf:facescrub','shampoo':'lf:shampoo','conditioner':'hair','hair serum':'hair',
 'hair dryer':'lf:hairdryer','electric trimmer':'lf:trimmer','body lotion':'lf:lotion','perfume':'perfume','deodorant':'lf:deodorant','makeup brush set':'lf:makeupbrush','nail polish set':'lf:nailpolish','compact powder':'makeup','eyeliner':'lf:eyeliner','makeup organizer':'makeup',
 'gaming mouse':'mouse','gaming keyboard':'keyboard','gaming monitor 27-inch':'monitor','gaming chair':'gamingchair','game controller':'controller','gaming mouse pad':'lf:mousepad','rgb gaming headset':'lf:gamingheadset','usb gaming microphone':'lf:microphone','gaming laptop stand':'lf:laptopstand','rgb led strip':'lf:ledstrip',
 'console cooling stand':'console','webcam 1080p':'lf:webcam','gaming desk':'lf:gamingdesk','controller charging dock':'controller','vr headset':'vr','steering wheel controller':'lf:steeringwheel','mechanical gaming keypad':'keyboard','rgb desk lamp':'lamp','capture card':'lf:gaming','gaming speakers':'speaker'
}
export function getProductImage(name='',category=''){const key=name.trim().toLowerCase();const v=byName[key];if(v)return v.startsWith('lf:')?lf(v.slice(3),name):I[v];const n=name.toLowerCase();const hit=compiled.find(([re])=>re.test(n));return hit?hit[1]:(keywordImage(name)||getCategoryImage(category))}
