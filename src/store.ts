import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { Coupon, CouponResponseSchema, Product, ShoppingCart } from "./schemas";


interface Store {
  total: number
  discount: number
  contents: ShoppingCart
  coupon: Coupon
  addToCart: (product: Product) => void
  updateQuantity: (id: Product['id'], quantity: number) => void
  removeFromCart: (id: Product['id']) => void
  calculateTotal: () => void
  applyCoupon: (couponName: string) => Promise<void>
  applyDiscount: () => void
  clearOrder: () => void
}

const initialState = {
  total: 0,
  discount: 0,
  contents: [],
  coupon: {
    percentage: 0,
    name: '',
    message: '',
  },
}

export const useStore = create<Store>()(devtools((set, get) => ({
  ...initialState,
  
  addToCart: (product) => {
    const { id: productId, categoryId, ...data } = product;
    let contents: ShoppingCart = []
    const duplicated = get().contents.findIndex(item => item.productId === productId)
    
    if (duplicated >= 0) {
      if (get().contents[duplicated].quantity >= get().contents[duplicated].inventory) return
      contents = get().contents.map(item => item.productId === productId ? {
        ...item,
        quantity: item.quantity + 1
      } : item)
    } else {
      contents = [...get().contents, {
        ...data,
        quantity: 1,
        productId
      }]
    }
    
    set(() => ({ contents }))
    get().calculateTotal();
  },
  
  updateQuantity: (id, quantity) => {
    set((state) => ({
      contents: state.contents.map(item => item.productId === id ? { ...item, quantity } : item)
    }))
    get().calculateTotal();
  },
  
  removeFromCart: (id) => {
    set((state) => ({
      contents: state.contents.filter(item => item.productId !== id)
    }))
    if (!get().contents.length) {
      get().clearOrder()
    }
    get().calculateTotal();
  },
  
  calculateTotal() {
    const total = get().contents.reduce((total, item) => total + (item.quantity * item.price), 0);
    set(() => ({ total }))
    if (get().coupon.percentage) {
      get().applyDiscount()
    }
  },
  
  applyCoupon: async (couponName) => {
    try {
      console.log('Enviando cupón al backend:', couponName);
      
      const req = await fetch('http://localhost:3001/api/cupons/apply-cupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // ✅ CAMBIO PRINCIPAL: 'cuponname' en lugar de 'name'
        body: JSON.stringify({ cuponname: couponName })
      });
      
      console.log('Response status:', req.status);
      const data = await req.json();
      console.log('Response data:', data);
      
      if (!req.ok) {
        console.error('Error servidor:', data);
        const errorMessage = Array.isArray(data.message) ? data.message.join(', ') : 
                           data.message || 'Error desconocido';
        
        set(() => ({ 
          coupon: { 
            name: '', 
            percentage: 0, 
            message: errorMessage 
          } 
        }));
        return;
      }
      
      // Éxito - aplicar cupón
      set(() => ({ 
        coupon: { 
          name: data.name, 
          percentage: data.percentage, 
          message: `Cupón "${data.name}" aplicado - ${data.percentage}% descuento` 
        } 
      }));
      
      if (data.percentage) {
        get().applyDiscount();
      }
      
    } catch (error) {
      console.error('Error de red:', error);
      set(() => ({ 
        coupon: { 
          name: '', 
          percentage: 0, 
          message: 'Error de conexión. Verifica que el servidor esté funcionando.' 
        } 
      }));
    }
  },
  
  
  applyDiscount: () => {
    const subtotalAmount = get().contents.reduce((total, item) => total + (item.quantity * item.price), 0);
    const discount = (get().coupon.percentage / 100) * subtotalAmount
    const total = subtotalAmount - discount
    
    set(() => ({
      discount,
      total
    }))
  },
  
  clearOrder: () => {
    set(() => ({
      ...initialState
    }))
  }
})))