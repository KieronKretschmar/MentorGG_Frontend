<template>
    <div class="input-block">
        <img src="@/assets/logo_white.svg" />
        <AjaxLoader><slot/></AjaxLoader>
    </div>
</template>

<style lang="scss">
.input-block {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    background: $dark-1;
    z-index: 99999;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
        max-width: 400px;
        margin-bottom: 30px;
        padding-bottom: 30px;
        border-bottom: 1px solid $purple;
    }
}
</style>