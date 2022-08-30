<div class="container">
    <div class="swal2-icon swal2-success swal2-icon-show" style="display: flex;">
        <div class="swal2-success-circular-line-left circle-line-left"></div>
        <span class="swal2-success-line-tip success-line-tip"></span>
        <span class="swal2-success-line-long success-line-long" style=""></span>
        <div class="swal2-success-ring"></div>
        <div class="swal2-success-fix success-fix"></div>
        <div class="swal2-success-circular-line-right circular-line-right"></div>
    </div>
</div>

<style lang="scss">
  .container {
    position: relative;
    box-sizing: border-box;
    width: 32em;

    .circle-line-left {
      background-color: rgb(255, 255, 255);
      top: -0.4375em;
      left: -2.0635em;
      transform: rotate(-45deg);
      transform-origin: 3.75em 3.75em;
      border-radius: 7.5em 0 0 7.5em;
    }

    .success-line-tip {
      top: 2.875em;
      left: 0.8125em;
      width: 1.5625em;
      transform: rotate(45deg);
    }

    .success-line-long {
      top: 2.375em;
      right: 0.5em;
      width: 2.9375em;
      transform: rotate(-45deg);
    }

    .success-fix {
      background-color: rgb(255, 255, 255);
      position: absolute;
      z-index: 1;
      top: 0.5em;
      left: 1.625em;
      width: 0.4375em;
      height: 5.625em;
      transform: rotate(-45deg);
    }

    .circular-line-right {
      background-color: rgb(255, 255, 255);top: -0.6875em;
      left: 1.875em;
      transform: rotate(-45deg);
      transform-origin: 0 3.75em;
      border-radius: 0 7.5em 7.5em 0;
    }
  }
</style>