<template>
    <a href="https://discord.gg/pE32tF" target="_blank" class="discord-hint">
        <img src="@/assets/Discord-Logo-Color.svg" alt="Discord Logo" title="Join us on Discord">
        <p>Join us!</p>
    </a>
</template>

<style lang="scss">
    .discord-hint {
        height: 54px;
        position: fixed;
        left: -1px;
        top: 50%;
        margin-top: -27px;
        display: flex;
        align-items: center;
        background: $dark-1;
        color: white;
        padding-right: 15px;
        padding-left: 5px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border: 1px solid $dark-1;
        transition: 0.35s;
        text-decoration: none;

        img {
            width: 40px;
            margin-right: 8px;
        }

        &:hover {
            background: $dark-2;
        }
    }
</style>