<template>
</template>

<style lang="scss">

$trajectory-stroke: 10;
$trajectory-anim-time: 2500ms;

.trajectory {
    stroke-width: 3px;
    fill: none;
    stroke: white;
    opacity: 1;

    stroke-dasharray: $trajectory-stroke;
    stroke-linecap: round;
    animation: dash $trajectory-anim-time linear;
    animation-iteration-count: infinite;
    animation-direction: reverse;
  }

  @keyframes dash {
    to {
      // To keep the infintite animation seam-less `dashoffset` must be 2 * stroke
      stroke-dashoffset: ($trajectory-stroke * 2);
    }
  }
</style>