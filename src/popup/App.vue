<template>
	<div class="font-sans relative w-popup">
		<tabs v-if="!$root.$data.egg.active">
			<tab label="Task ID">
				<task-id :url="$root.$data.clients" />
			</tab>

			<tab label="Asana brief">
				<brief :url="$root.$data.briefs" />
			</tab>
		</tabs>

		<clipboard />

		<egg v-if="$root.$data.egg.active" />
	</div>
</template>

<script>
import Tabs from '@/components/Tabs.vue'
import Tab from '@/components/Tab.vue'
import TaskId from '@/components/TaskId.vue'
import Brief from '@/components/Brief.vue'
import Clipboard from '@/components/Clipboard.vue'

export default {
	name: 'App',
	components: {
		Tabs,
		Tab,
		TaskId,
		Brief,
		Clipboard,
		Egg: () => import('@/components/Egg.vue'),
	},
}
</script>