<template>
</template>

<script>
export default {
  props: [
    "situationCollection"
  ],

  data() {
    return {
      "isVisible" : false,
    }
  },
  
  methods: {
    ToggleMisplayVisibility: function() {
      console.log("toggled " + this.isVisible)
      this.isVisible = !this.isVisible;
      this.$forceUpdate();
    },
  }
}
</script>

<style lang="scss">

.misplay {
  border-bottom: 1px solid $purple;
  margin-top: 10px;

  .header {
    display: flex;
    color: white;
    font-size: 14px;
    font-weight: 500;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;
      width: 80%;

      .misplay-title {
        width: 20%;
        margin-left: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      
      .misplay-explanation {
        font-weight: 200;
        width: 70%;
        margin-left: 20px;
        // white-space: nowrap;
        // overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .right {
      display: flex;
      align-items: center;
    }
  }

  .body {
    hr {
      border: 1px solid $purple;
      border-bottom: none;
      margin: 15px 0;
    }

    .subtitle{        
      color: $orange;
      text-transform: uppercase;
      font-size: 12px;
    }

    .row {
      display: flex;
      padding: 10px 0;
      border-bottom: 1px solid $purple;

      &:first-child,
      &:last-child {
        border-bottom: none;
      }        

      &:first-of-type {
        .col {
          color: $orange;
          text-transform: uppercase;
          font-size: 12px;
        }
      }
      
      .col {
        color: white;
        font-size: 14px;
        font-weight: 500;
        display: flex;
        align-items: center;
        
        &.centered {
          justify-content: center;
        }

        img {
          margin-right: 5px;
        }
        width:(1/5)*100%;

        .map-thumbnail {
        height: 55px;
        width: 135px;
        border-radius: 5px;
        overflow: hidden;
        border-left-style: solid;

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
          width: 100%;
          // padding: 0 25px;
          // border-right: 1px solid $purple;

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

        .link {
          display: flex;
          align-items: center;
          background: $dark-1;
          color: white;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          border: 1px solid $dark-1;
          transition: 0.35s;
          text-decoration: none;
          cursor: pointer;

          &:hover {
            color: $orange;
          }
        }
      }
    }
  }
}
</style>