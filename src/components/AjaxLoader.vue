<template>
  <div class="--ajax-loader">
    <!-- <img src="@/assets/loader.svg"> -->
    <div class="__mgg-loader">
      <div class="__mgg-loader-anim">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <p>
      <slot></slot>
    </p>
  </div>
</template>

<style lang="scss">
.--ajax-loader {
  text-align: center;
  padding: 10px 0;

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

  .__mgg-loader {
      margin-bottom: 10px;
  }

  .__mgg-loader-anim {
    display: inline-block;
    position: relative;
    width: 64px;
    height: 11px;
  }
  .__mgg-loader-anim div {
    position: absolute;
    top: 0px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #fff;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  .__mgg-loader-anim div:nth-child(1) {
    left: 6px;
    animation: __mgg-loader-anim1 0.6s infinite;
  }
  .__mgg-loader-anim div:nth-child(2) {
    left: 6px;
    animation: __mgg-loader-anim2 0.6s infinite;
    background: #ff4800;
  }
  .__mgg-loader-anim div:nth-child(3) {
    left: 26px;
    animation: __mgg-loader-anim2 0.6s infinite;
  }
  .__mgg-loader-anim div:nth-child(4) {
    left: 45px;
    animation: __mgg-loader-anim3 0.6s infinite;
  }
  @keyframes __mgg-loader-anim1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes __mgg-loader-anim3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes __mgg-loader-anim2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(19px, 0);
    }
  }
}
</style>