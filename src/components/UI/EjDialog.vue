<template>
    <div class="dialog" v-if="show" @click="hideDialog">
        <div class="dialog__content" @click.stop>
            <slot />
        </div>
    </div>
</template>

<script>
import toggleMixin from '@/mixins/toggleMixin';

export default {
    name: 'EjDialog',
    mixins: [toggleMixin],
    mounted() {
        console.log('dialog mounted')
    }
};
</script>

<style lang="scss" scoped>
.dialog {
    inset: 0;
    background: rgba(#000, 0.5);
    position: fixed;
    display: flex;
}

.dialog__content {
    margin: auto;
    background: white;
    border-radius: 12px;
    min-height: 50px;
    min-width: 300px;
    padding: 20px;
}
</style>
