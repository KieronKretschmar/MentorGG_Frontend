<template>
  <div class="match-header">
    <div class="map-thumbnail">
      <img
        :src="this.$helpers.resolveMapPreview(map)"
        :alt="map + ' Thumbnail'"
        :title="map"
      />
    </div>
    <div class="map-and-datetime">
      <span class="map">{{ map }}</span>
      <span class="datetime">{{ matchDate|formatDateAndTime }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "map",
    "matchDate",
    "source"
  ]
}
</script>

<style lang="scss">
.match-header{
  display: flex;

  .map-thumbnail {
    height: 55px;
    width: 135px;
    border-radius: 5px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .map-and-datetime {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 25px;

    .map {
      color: white;
      font-size: 16px;
      font-weight: 500;
    }

    .datetime {
      font-size: 12px;
      color: $dark-4;
      margin-top: 5px;
    }
  }
}

</style>