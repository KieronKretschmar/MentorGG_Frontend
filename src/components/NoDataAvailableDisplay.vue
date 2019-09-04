<template>
  <div class="no-data-available">
    <div>           
      <p> 
        <slot></slot> 
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.no-data-available {
  text-align: center;
  padding: 10px 0;

  p {
    color: white;
    font-size: 12px;
    font-weight: 500;
    margin: 0;
  }
}
</style>