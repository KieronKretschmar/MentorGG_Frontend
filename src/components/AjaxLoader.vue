<template>
    <div class="--ajax-loader">
        <img src="@/assets/loader.svg">
        <p><slot></slot></p>
    </div>
</template>

<style lang="scss">
    .--ajax-loader {
        text-align: center;

        img {
            width: 64px;
            height: 64px;
            margin-top: -10px;
        }

        p {
            color: white;
            font-size: 12px;
            font-weight: 500;
            margin: 0;
        }
    }
</style>