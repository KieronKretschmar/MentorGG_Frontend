<template>
  <div class="demodata-load-request">
    <div>           
      
      <p> 
        <slot></slot> 
      </p>
    </div>
    <div class="lower">
      <button
        class="accept-button"
        @click="$emit('buttonClicked')"
      >Load sample data</button>
    </div>
  </div>
</template>

<style lang="scss">
.demodata-load-request {
  text-align: center;
  padding: 10px 0;

  p {
    color: white;
    font-size: 12px;
    font-weight: 500;
    margin: 0;
  }

  .lower{
    margin-top: 5px;
  }

  .accept-button {
    border: 0;
    outline: 0;
    background: $purple;
    color: white;
    padding: 5px 10px;
    border-radius: 3px;
    transition: 0.35s;
    cursor: pointer;
    margin-top: 5px;

    &:hover {
      background: $dark-3;
    }
  }
}
</style>