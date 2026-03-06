<script setup lang="ts">
import { ref, onMounted, inject, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEventStore } from '../store/eventStore';
import { useTicketStore } from '../store/ticketStore';
import { useUserStore } from '../store/userStore';
import { CreditCard, ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-vue-next';
import Toast from '../components/Toast.vue';

/**
 * Checkout page for reserving tickets.
 */
const t = inject<any>('t');
const locale = inject<any>('locale');
const route = useRoute();
const router = useRouter();
const eventStore = useEventStore();
const ticketStore = useTicketStore();
const userStore = useUserStore();

const event = ref<any>(null);
const quantity = ref(1);
const showToast = ref(false);
const success = ref(false);

onMounted(async () => {
  if (!userStore.isAuthenticated) {
    router.push('/login');
    return;
  }
  
  const found = eventStore.events.find(e => e.id === route.params.id);
  if (found) {
    event.value = found;
  } else {
    router.push('/events');
  }
});

const totalPrice = computed(() => {
  if (!event.value) return 0;
  return event.value.price * quantity.value;
});

const handleCheckout = async () => {
  try {
    await ticketStore.buyTickets({
      eventId: event.value.id,
      userId: userStore.user.id,
      quantity: quantity.value,
      totalPrice: totalPrice.value
    });
    success.value = true;
  } catch (err) {
    showToast.value = true;
  }
};
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <div v-if="!success && event" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-6">
        <button @click="router.back()" class="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft :size="18" /> {{ t.common.back }}
        </button>
        
        <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h1 class="text-3xl font-bold text-slate-900 mb-8">{{ locale === 'en' ? 'Checkout' : (locale === 'ar' ? 'الدفع' : 'پارەدان') }}</h1>
          
          <div class="space-y-6">
            <div class="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
              <img :src="event.image" class="w-20 h-20 rounded-xl object-cover" referrerPolicy="no-referrer" />
              <div>
                <h3 class="font-bold text-slate-900">{{ event.title }}</h3>
                <p class="text-sm text-slate-500">{{ event.venue }}, {{ event.city }}</p>
                <p class="text-sm font-bold text-emerald-600 mt-1">{{ event.price === 0 ? t.event.free : `${event.price.toLocaleString()} IQD` }}</p>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 border border-slate-100 rounded-2xl">
              <span class="font-bold text-slate-700">{{ locale === 'en' ? 'Quantity' : (locale === 'ar' ? 'الكمية' : 'بڕ') }}</span>
              <div class="flex items-center gap-4">
                <button @click="quantity > 1 && quantity--" class="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">-</button>
                <span class="font-bold w-4 text-center">{{ quantity }}</span>
                <button @click="quantity++" class="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50">+</button>
              </div>
            </div>

            <div class="space-y-4 pt-6 border-t border-slate-100">
              <h3 class="font-bold text-slate-900">{{ locale === 'en' ? 'Payment Method' : (locale === 'ar' ? 'طريقة الدفع' : 'شێوازی پارەدان') }}</h3>
              <div class="grid grid-cols-2 gap-4">
                <div class="p-4 border-2 border-emerald-500 bg-emerald-50 rounded-2xl flex items-center gap-3">
                  <CreditCard class="text-emerald-600" />
                  <span class="text-sm font-bold">ZainCash</span>
                </div>
                <div class="p-4 border border-slate-200 rounded-2xl flex items-center gap-3 opacity-50 cursor-not-allowed">
                  <CreditCard class="text-slate-400" />
                  <span class="text-sm font-bold">AsiaPay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm sticky top-24">
          <h3 class="font-bold text-slate-900 mb-6">{{ locale === 'en' ? 'Order Summary' : (locale === 'ar' ? 'ملخص الطلب' : 'کورتەی داواکاری') }}</h3>
          <div class="space-y-4 mb-6">
            <div class="flex justify-between text-sm">
              <span class="text-slate-500">{{ locale === 'en' ? 'Subtotal' : (locale === 'ar' ? 'المجموع الفرعي' : 'کۆی گشتی') }}</span>
              <span class="font-medium">{{ totalPrice.toLocaleString() }} IQD</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-slate-500">{{ locale === 'en' ? 'Service Fee' : (locale === 'ar' ? 'رسوم الخدمة' : 'کرێی خزمەتگوزاری') }}</span>
              <span class="font-medium">0 IQD</span>
            </div>
            <div class="pt-4 border-t border-slate-100 flex justify-between">
              <span class="font-bold text-slate-900">{{ locale === 'en' ? 'Total' : (locale === 'ar' ? 'الإجمالي' : 'کۆی گشتی') }}</span>
              <span class="font-black text-emerald-600 text-xl">{{ totalPrice.toLocaleString() }} IQD</span>
            </div>
          </div>

          <button 
            @click="handleCheckout"
            :disabled="ticketStore.loading"
            class="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-900/20 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
          >
            <ShieldCheck :size="20" />
            {{ ticketStore.loading ? t.common.loading : (locale === 'en' ? 'Pay Now' : (locale === 'ar' ? 'ادفع الآن' : 'ئێستا پارە بدە')) }}
          </button>
          
          <p class="text-[10px] text-slate-400 text-center mt-4 uppercase tracking-widest font-bold">
            Secure Payment Powered by ZainCash
          </p>
        </div>
      </div>
    </div>

    <div v-else-if="success" class="max-w-md mx-auto text-center py-20">
      <div class="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
        <CheckCircle2 :size="64" />
      </div>
      <h1 class="text-4xl font-black text-slate-900 mb-4">{{ locale === 'en' ? 'Payment Successful!' : (locale === 'ar' ? 'تم الدفع بنجاح!' : 'پارەدان سەرکەوتوو بوو!') }}</h1>
      <p class="text-slate-500 mb-10">{{ locale === 'en' ? 'Your tickets are now available in your account. A confirmation email has been sent.' : (locale === 'ar' ? 'تذاكرك متاحة الآن في حسابك. تم إرسال بريد إلكتروني للتأكيد.' : 'تیکتەکانت ئێستا لە هەژمارەکەتدا بەردەستن. ئیمەیڵێکی پشتڕاستکردنەوە نێردراوە.') }}</p>
      
      <div class="flex flex-col gap-4">
        <router-link to="/tickets" class="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl">
          {{ locale === 'en' ? 'View My Tickets' : (locale === 'ar' ? 'عرض تذاكري' : 'بینینی تیکتەکانم') }}
        </router-link>
        <router-link to="/" class="w-full py-4 text-slate-600 font-bold hover:bg-slate-100 rounded-2xl transition-all">
          {{ locale === 'en' ? 'Back to Home' : (locale === 'ar' ? 'العودة للرئيسية' : 'گەڕانەوە بۆ سەرەکی') }}
        </router-link>
      </div>
    </div>

    <Toast :show="showToast" :message="ticketStore.error || 'Payment failed'" type="error" @close="showToast = false" />
  </div>
</template>
