<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import SwiperCore from 'swiper';
import { Pagination } from 'swiper/modules';

SwiperCore.use([Pagination]);

const images = [
	new URL('../assets/card_vertical.jpg', import.meta.url).href,
	new URL('../assets/card_front.jpg', import.meta.url).href,
	new URL('../assets/card_back.jpg', import.meta.url).href,
];

const now = ref(new Date());

const formatDate = (date: Date) => {
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');
	return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

onMounted(() => {
	setInterval(() => {
		now.value = new Date();
	}, 1000);
});
</script>

<template>
	<div class="flex flex-col items-center justify-center min-h-screen mb-8 h-screen w-screen px-4 ">
		<!-- Top gray rectangle -->
		<div class="w-full flex items-center justify-between bg-[#3c393c] text-white rounded-xl px-4 py-3 mb-4 shadow-sm">
			<div class="flex items-center">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>
				<div class="w-4 h-4 bg-[#2fc94b] rounded-full" />
				<span class="text-xs font-light rounded px-2">PLATNÝ</span>
			</div>
			<span class="text-xs">
				{{ formatDate(now) }}
			</span>
		</div>

		<div class="relative max-w-[460px] max-h-[730px] w-full">
			<div>
				
			<Swiper
				:slides-per-view="1"
				:space-between="20"
				:pagination="{ clickable: true, el: '.custom-swiper-pagination' }"
				class="w-full h-full"
			>
				<SwiperSlide v-for="(img, idx) in images" :key="idx">
					<div class="relative w-full h-full flex items-center justify-center">
						<img :src="img" class="w-full h-full object-contain rounded-2xl shadow-lg" >
						<img src="assets/watermark-new.gif" class="absolute w-full pointer-events-none" >
					</div>
				</SwiperSlide>
			</Swiper>
			<div class="custom-swiper-pagination flex justify-center mt-8"/>
			<p class="text-center mt-2 mb-16 text-gray-400">Procházení stránek</p>
		</div>
	</div>

</div></template>

<style scoped>


:deep(.swiper-pagination-bullet-active) {
	background-color: #42b7b7; /* Dark color (matching top bar) for active dot */
}
</style>
