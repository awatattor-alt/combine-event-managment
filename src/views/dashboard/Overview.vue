<script setup lang="ts">
import { ref, onMounted, inject } from 'vue';
import { Calendar, Users, TrendingUp } from 'lucide-vue-next';
import * as d3 from 'd3';

const t = inject<any>('t');
const locale = inject<any>('locale');
const chartRef = ref<HTMLElement | null>(null);

const stats = [
  { label: t.value.dashboard.stats.totalEvents, value: '12', icon: Calendar, color: 'bg-emerald-100 text-emerald-600' },
  { label: t.value.dashboard.stats.totalAttendees, value: '1,240', icon: Users, color: 'bg-blue-100 text-blue-600' },
  { label: t.value.dashboard.stats.revenue, value: '4.5M IQD', icon: TrendingUp, color: 'bg-amber-100 text-amber-600' },
];

onMounted(() => {
  if (chartRef.value) {
    renderChart();
  }
});

const renderChart = () => {
  interface SalesData {
    date: string;
    sales: number;
  }

  const data: SalesData[] = [
    { date: 'Jan', sales: 400 },
    { date: 'Feb', sales: 300 },
    { date: 'Mar', sales: 600 },
    { date: 'Apr', sales: 800 },
    { date: 'May', sales: 500 },
    { date: 'Jun', sales: 900 },
  ];

  const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  const width = chartRef.value!.clientWidth - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const svg = d3.select(chartRef.value)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const x = d3.scalePoint<string>()
    .domain(data.map(d => d.date))
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.sales) as number])
    .range([height, 0]);

  svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x).tickSize(0).tickPadding(10))
    .select('.domain').remove();

  svg.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', '#10b981')
    .attr('stroke-width', 3)
    .attr('d', d3.line<SalesData>()
      .x(d => x(d.date)!)
      .y(d => y(d.sales))
      .curve(d3.curveStep)
    );

  svg.selectAll('.dot')
    .data(data)
    .enter().append('circle')
    .attr('class', 'dot')
    .attr('cx', d => x(d.date)!)
    .attr('cy', d => y(d.sales))
    .attr('r', 4)
    .attr('fill', '#10b981');
};
</script>

<template>
  <div>
    <div class="mb-10">
      <h1 class="text-3xl font-bold text-slate-900 mb-2">{{ t.dashboard.overview }}</h1>
      <p class="text-slate-500">{{ locale === 'en' ? 'Welcome back! Here\'s what\'s happening with your events.' : (locale === 'ar' ? 'مرحباً بعودتك! إليك ما يحدث في فعالياتك.' : 'بەخێربێیتەوە! ئەوەی لە چالاکییەکانتدا ڕوودەدات لێرەیە.') }}</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div v-for="stat in stats" :key="stat.label" class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-6">
        <div :class="['w-14 h-14 rounded-2xl flex items-center justify-center', stat.color]">
          <component :is="stat.icon" :size="28" />
        </div>
        <div>
          <p class="text-sm text-slate-500">{{ stat.label }}</p>
          <p class="text-2xl font-black text-slate-900">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <!-- Sales Chart -->
    <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
      <h3 class="text-xl font-bold text-slate-900 mb-6">{{ locale === 'en' ? 'Ticket Sales Performance' : (locale === 'ar' ? 'أداء مبيعات التذاكر' : 'ئەدای فرۆشتنی تیکت') }}</h3>
      <div ref="chartRef" class="w-full h-[300px]"></div>
    </div>
  </div>
</template>
