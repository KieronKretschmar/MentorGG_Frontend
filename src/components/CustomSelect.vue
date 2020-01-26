<template>
  <div class="custom-select">
    <div @click="optionsVisible = !optionsVisible">{{ options[value] }}</div>
    <ul v-if="optionsVisible">
      <li v-for="(value, key) in options" :key="key" @click="SelectOption(key)">{{ value }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    value: null,
    options: Object
  },
  mounted() {
    if (this.options[this.value] == undefined) {
      throw "SelectValueNotFoundException";
    }
  },
  data() {
    return {
      optionsVisible: false
    };
  },
  methods: {
    SelectOption: function(key) {
      this.optionsVisible = false;
      this.$emit("input", key);
    }
  }
};
</script>

<style lang="scss">
.custom-select {
  background: $dark-4;
  position: relative;
  padding: 8px 20px;
  cursor: pointer;
  border-radius: 4px;
  color: white;
  font-size: 14px;

  ul {
    z-index: 45;
    list-style-type: none;
    padding: 0;
    margin: 0;
    position: absolute;
    width: 100%;
    top: calc(100% - 2px);
    left: 0;
    background: $dark-1;

    li {
      background: $dark-4;
      color: white;
      margin-bottom: 1px;
      padding: 5px 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: 0.35s;

      &:hover {
        background: $dark-1;
      }

      &:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
  }
}
</style>