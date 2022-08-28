<script>

    import {onDestroy, onMount} from "svelte";

    let step = 0.5, progress = 0, current_progress = 0;
    let interval;

    onMount(() => {
        interval = setInterval(function () {
            current_progress += step;
            progress = Math.round(Math.atan(current_progress) / (Math.PI / 2) * 100 * 1000) / 1000
            if (progress >= 100) {
                clearInterval(interval);
            } else if (progress >= 70) {
                step = 0.1
            }
        }, 100);
    });

    onDestroy(() => {
        clearInterval(interval);
    });

</script>

<div class="api-progress-bar">
    <div class="progress-bar stripes animated reverse slower">
        <span class="progress-bar-inner" style={`width: ${progress}%`}></span>
    </div>
</div>

<style lang="scss">
  .api-progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 4;
    transition: all 0.3s ease;

    &::after {
      z-index: 3;
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      background-color: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      transition: all 0.3s ease;
    }
  }

  .progress-bar {
    position: relative;
    background-color: #1a1a1a;
    height: 5px;
    width: 100%;
    box-shadow: 0 1px 5px #000 inset, 0 1px 0 #444;
    z-index: 4;
  }

  .stripes {
    background-size: 30px 30px;
    background-image: linear-gradient(
                    135deg,
                    rgba(255, 255, 255, .35) 25%,
                    transparent 25%,
                    transparent 50%,
                    rgba(255, 255, 255, .35) 50%,
                    rgba(255, 255, 255, .35) 75%,
                    transparent 75%,
                    transparent
    );
  }

  .stripes.animated {
    animation: animate-stripes 0.6s linear infinite;
  }

  .stripes.animated.slower {
    animation-duration: 1.25s;
  }

  .stripes.reverse {
    animation-direction: reverse;
  }

  .progress-bar-inner {
    display: block;
    height: 5px;
    width: 0;
    background-color: #1cce1c;
    box-shadow: 0 -3px 10px 5px rgba(28, 206, 28, 0.27);
    position: relative;
    transition: all 0.4s var(--transition-drawer);
  }


  @keyframes animate-stripes {
    0% {
      background-position: 0 0;
    }

    100% {
      background-position: 60px 0;
    }
  }

  @keyframes auto-progress {
    0% {
      width: 0;
    }

    100% {
      width: 100%;
    }
  }
</style>