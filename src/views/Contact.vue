<template>
  <div class="view view-contact">
    <div class="fixed-width-container">
      <div class="bordered-box">
        <h2>Contact</h2>
        <p>
          <div>
            <a href="https://discord.gg/X29FEKG" target="_blank" class="discord-hint-inline">
              <img src="@/assets/Discord-Logo-Color.svg" alt="Discord Logo" title="Join us on Discord" />
              <p>Discord</p>
            </a>
          </div>

        <p>
          E-mail:
          <a href="mailto:info@mentor.gg">info@mentor.gg</a>
          <br>
          <br>Mentor.gg UG (haftungsbeschränkt)
          <br>Moorkamp 22
          <br>20357 Hamburg
          <br>Germany
          <br>
        </p>

        <h2>Disclaimer</h2>
        <p>MENTOR.GG is not associated or affiliated with Valve Corporation in any way.</p>
        <p>The radar maps are kindly provided by simpleradar.com</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.view-contact {
  .bordered-box {
    margin-top: 40px;
    color: white;

    a {
      color: $orange;
    }
  }
}
.discord-hint-inline {
  height: 54px;
  width: 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: $dark-1;
  color: white;
  padding-right: 15px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 1px solid $dark-1;
  transition: 0.35s;
  text-decoration: none;
  p {
    color: white;
  }
  img {
    width: 40px;
    margin-right: 8px;    
  }

  &:hover {
    background: $dark-2;
  }
}
</style>