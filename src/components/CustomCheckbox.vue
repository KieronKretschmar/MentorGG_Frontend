<template>
    <div class="custom-checkbox" @click="Toggle">
        <span :class="{visible: this.value}">✓</span>
    </div>
</template>

<script>
export default {
    props: {
        value: null
    },
    methods: {
        Toggle() {
            this.$emit('input', !this.value);
        }
    }
}
</script>

<style lang="scss">
.custom-checkbox {
    background: $dark-3;
    width: 30px;
    height: 30px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .35s;
    border: 1px solid transparent;
    user-select: none;
    border-radius: 4px;

    &:hover {
        border: 1px solid $purple;
    }

    span {
        font-size: 24px;
        font-weight: bold;
        color: $orange;
        margin-bottom: 2px;
        transition: .35s;
        opacity: 0;

        &.visible {
            opacity: 1;
        }
    }
}
</style>