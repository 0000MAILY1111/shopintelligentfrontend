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
}

export const useStore = create<Store>()(devtools((set, get) => ({
    total: 0,
    contents: [],
    coupon: {
        percentage: 0,
        name: '',
        message: '',
    },
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
        set(() => ({
            contents
        }))
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
        get().calculateTotal();

    },
    calculateTotal() {
        const total = get().contents.reduce((total, item) => total + (item.quantity * item.price), 0);
        set(() => ({
            total
        }))
        if (get().coupon.percentage) {
            get().applyDiscount()
        }
    },
    applyCoupon: async (couponName) => {
    try {
        console.log('🚀 Iniciando petición a:', 'http://localhost:3000/cupons');
        console.log('📦 Enviando datos:', { name: couponName });

        const req = await fetch('http://localhost:3000/cupons/apply-cupons', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: couponName  // Solo enviar el nombre para buscar el cupón
            })
        });

        console.log('✅ Respuesta recibida:');
        console.log('Status:', req.status);
        console.log('OK:', req.ok);

        if (!req.ok) {
            const errorData = await req.json();
            console.error('❌ Error del servidor:', errorData);
            set(() => ({
                coupon: {
                    name: '',
                    percentage: 0,
                    message: errorData.message || 'Error al aplicar el cupón'
                }
            }));
            return;
        }

        const json = await req.json();
        console.log('✅ JSON recibido:', json);

        const coupon = {
            name: json.name,
            percentage: json.percentage,
            message: 'Cupón aplicado correctamente',
        };

        set(() => ({ coupon }));

        if (coupon.percentage) {
            get().applyDiscount();
        }

    } catch (error) {
        console.error('💥 Error applying coupon:', error);
        set(() => ({
            coupon: {
                name: '',
                percentage: 0,
                message: 'Error al aplicar el cupón'
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
        }

        ))
    },
})))